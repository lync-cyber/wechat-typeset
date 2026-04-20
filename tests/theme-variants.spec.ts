/**
 * 4 套主题 · 专属 SVG 合规性契约
 *
 * 覆盖（每套主题单独校验）：
 *  - 11 个资产齐备（h2Prefix、3 个 divider、quoteMark、sectionCorner、4 个 icon、stepBadge）
 *  - SVG 字符串无 id / 无 url 引号 / 无 font-family 属性 / 无纯白 #fff 填充（作为硬底）
 *  - stepBadge 的 font-size ≥ 14（经 640→375 缩放后仍满足 svg.min_font_size）
 *  - 四套主题间相互有差异（viewBox 或路径字符不雷同）
 */

import { describe, expect, it } from 'vitest'
import { applyPalette } from '../src/color/applyPalette'
import { businessFinanceTheme } from '../src/themes/business-finance'
import { defaultTheme } from '../src/themes/default'
import { industryObserverTheme } from '../src/themes/industry-observer'
import { lifeAestheticTheme } from '../src/themes/life-aesthetic'
import { literaryHumanismTheme } from '../src/themes/literary-humanism'
import { peopleStoryTheme } from '../src/themes/people-story'
import { techGeekTheme } from '../src/themes/tech-geek'
import type { Theme } from '../src/themes/types'

const themes: Theme[] = [
  defaultTheme,
  techGeekTheme,
  lifeAestheticTheme,
  businessFinanceTheme,
  literaryHumanismTheme,
  industryObserverTheme,
  peopleStoryTheme,
]

function collectSvgs(t: Theme): string[] {
  const a = t.assets
  return [
    a.h2Prefix,
    a.dividerWave,
    a.dividerDots,
    a.dividerFlower,
    a.quoteMark,
    a.sectionCorner,
    a.tipIcon,
    a.warningIcon,
    a.infoIcon,
    a.dangerIcon,
    a.stepBadge?.(1),
    a.stepBadge?.(12),
  ].filter((s): s is string => typeof s === 'string')
}

describe.each(themes)('$name · 资产齐备', (t) => {
  it('资产都给值（default / literary-humanism 10 件：规范 §1.4 / §2.6 删 quoteMark；其他主题 11 件）', () => {
    const a = t.assets
    expect(a.h2Prefix).toBeTypeOf('string')
    expect(a.dividerWave).toBeTypeOf('string')
    expect(a.dividerDots).toBeTypeOf('string')
    expect(a.dividerFlower).toBeTypeOf('string')
    // default / literary-humanism 故意不导出 quoteMark：
    //   - default 规范 §1.4 / §2.6："故意留白"
    //   - literary-humanism personas/literary-humanism.md §2.6 第 253 行：
    //     "**不用** quoteMark SVG —— 首字本身已经是装饰，再加引号就太满"
    //     magazine-dropcap variant 的首字 + accent 色 dropcap 替代引号 SVG
    if (t.id !== 'default' && t.id !== 'literary-humanism') {
      expect(a.quoteMark).toBeTypeOf('string')
    }
    expect(a.sectionCorner).toBeTypeOf('string')
    expect(a.tipIcon).toBeTypeOf('string')
    expect(a.warningIcon).toBeTypeOf('string')
    expect(a.infoIcon).toBeTypeOf('string')
    expect(a.dangerIcon).toBeTypeOf('string')
    expect(a.stepBadge?.(1)).toMatch(/<svg/)
  })

  it('SVG 符合微信合规：无 id / url 引号 / font-family 属性', () => {
    for (const svg of collectSvgs(t)) {
      expect(svg).not.toMatch(/\sid="/)
      expect(svg).not.toMatch(/url\(['"]/)
      expect(svg).not.toMatch(/\sfont-family=/i)
    }
  })

  it('无纯白 #fff / #ffffff 填充（白底主题不需要、深底主题会刺眼）', () => {
    for (const svg of collectSvgs(t)) {
      // 允许 stroke 但不能 fill="#fff"
      expect(svg).not.toMatch(/fill="#fff"/i)
      expect(svg).not.toMatch(/fill="#ffffff"/i)
    }
  })

  it('stepBadge <text> font-size ≥ 14（经 0.586 缩放后仍 ≥ 8.2，满足 svg.min_font_size）', () => {
    const svg = t.assets.stepBadge?.(5) ?? ''
    const m = svg.match(/font-size="(\d+)"/)
    expect(m).not.toBeNull()
    const size = Number(m?.[1] ?? 0)
    expect(size).toBeGreaterThanOrEqual(14)
  })

  it('3 个以上模板片段就绪', () => {
    const tpl = t.templates
    const count = [tpl.cover, tpl.authorBar, tpl.footerCTA, tpl.recommend].filter(Boolean).length
    expect(count).toBeGreaterThanOrEqual(3)
  })
})

describe('5 套主题相互有视觉差异', () => {
  it('quoteMark 字符串不雷同（default / literary-humanism 显式不导出，走字符回退）', () => {
    // default（规范 §2.6）和 literary-humanism（personas/literary-humanism.md §2.6
    // 第 253 行）都**刻意不导出** quoteMark —— quoteCard 走 magazine-dropcap variant
    // 的首字装饰替代引号 SVG。参与差异性校验的只有导出 quoteMark 的主题。
    const marks = themes
      .filter((t) => t.id !== 'default' && t.id !== 'literary-humanism')
      .map((t) => t.assets.quoteMark ?? '')
    const unique = new Set(marks)
    expect(unique.size).toBe(marks.length)
  })

  it('h2Prefix 字符串不雷同', () => {
    const arr = themes.map((t) => t.assets.h2Prefix ?? '')
    const unique = new Set(arr)
    expect(unique.size).toBe(arr.length)
  })
})

describe.each(themes)('applyPalette($name) · 自定义配色后产物仍合规', (base) => {
  const customized = applyPalette({
    base,
    seed: { primary: '#2d6fdd', secondary: '#1f3b70', accent: '#4ec9b0' },
  })

  it('仍然 5 段式接口齐备', () => {
    expect(customized.tokens.colors.primary.toLowerCase()).toBe('#2d6fdd')
    expect(customized.assets.h2Prefix).toBeTypeOf('string')
    expect(customized.elements.h2).toBeDefined()
    expect(customized.containers.quoteCard).toBeDefined()
    expect(customized.inline.highlight).toBeDefined()
  })

  it('SVG 仍无 id / 无 url 引号 / 无 font-family', () => {
    const a = customized.assets
    const svgs = [
      a.h2Prefix,
      a.dividerWave,
      a.dividerDots,
      a.dividerFlower,
      a.quoteMark,
      a.sectionCorner,
      a.tipIcon,
      a.warningIcon,
      a.infoIcon,
      a.dangerIcon,
      a.stepBadge?.(3),
    ].filter((s): s is string => typeof s === 'string')
    for (const svg of svgs) {
      expect(svg).not.toMatch(/\sid="/)
      expect(svg).not.toMatch(/url\(['"]/)
      expect(svg).not.toMatch(/\sfont-family=/i)
    }
  })
})
