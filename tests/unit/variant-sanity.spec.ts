/**
 * variant-sanity（默认主题快照 + 枚举完整性）
 *
 * 拆分边界（为了并行）：
 *   - 本文件：默认主题下每 variant 的 wrapper HTML 片段快照 + CASES 总数校验
 *   - variant-sanity-matrix.spec.ts：14 主题 × 全 variant 的渲染契约矩阵
 *   - variant-sanity-codeblock.spec.ts：14 主题 × 5 codeBlock variant 的高亮 hook 矩阵
 *
 * 三者由 tests/helpers/variantCases.ts 共享 CASES / 断言原语，避免拆完之后漂移。
 * 快照文件 __snapshots__/variant-sanity.spec.ts.snap 与本文件名绑定，故不可改名。
 *
 * 补录快照：npx vitest run tests/unit/variant-sanity.spec.ts -u
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList, themeRegistry } from '../../src/core/themes'
const defaultTheme = themeRegistry.default
import { VARIANT_IDS } from '../../src/core/themes/types'
import { __setCompatSilentForTest } from '../../src/core/pipeline/containers/_shared/themeCompatGuard'
import { CASES, isCompatBlocked } from '../helpers/variantCases'

describe('枚举完整性', () => {
  it('11 kind × N variant 全部进入容器测试矩阵（codeBlock / note / footnotes 走独立组）', () => {
    const totals: Record<string, number> = {}
    for (const c of CASES) totals[c.kind] = (totals[c.kind] ?? 0) + 1
    expect(totals).toEqual({
      admonition: 20, // +1: news-row (data-brief) +1: news-underline (swiss-grid) +1: mook-tag (editorial-mook) +1: slab-corner (brutalist)
      quote: 7,
      compare: 4,
      steps: 5,
      divider: 6,
      sectionTitle: 5,
      pullQuote: 4,
      announcement: 4,
      tableCard: 4,
      gallery: 4,
      dialogue: 4,
    })
  })

  it('codeBlock 的 5 个 variant 全部在 VARIANT_IDS 登记', () => {
    expect([...VARIANT_IDS.codeBlock]).toEqual([
      'bare',
      'header-bar',
      'line-numbers',
      'terminal-frame',
      'inline-card',
    ])
  })

  it('全部已注册主题都进入矩阵', () => {
    expect(themeList.map((t) => t.id)).toEqual([
      'default',
      'tech-geek',
      'tech-explainer',
      'business-finance',
      'data-brief',
      'industry-observer',
      'commerce-pulse',
      'literary-humanism',
      'people-story',
      'editorial-mook',
      'late-night-vinyl',
      'life-aesthetic',
      'edu-classroom',
      'academic-frontier',
      'official-gazette',
      'swiss-grid',
      'brutalist',
      'youth-zine',
    ])
  })
})

/**
 * variant wrapperCSS / svgSlot / titleCSS 的任何意外改动都要被显式捕获，避免被
 * "不抛错"和"含 class"放行。取定位到 variant wrapper 的 section 段做快照，
 * 不吸整篇 html 与大段主题 CSS。
 *
 * themeCompat 限定 variant 在默认主题下会被守卫降级到 fallback，section 段
 * class 不再是 container-X--{id}——这种情况下快照不要求精确命中，仍允许过测试。
 */
function sliceVariantChunk(html: string, containerName: string, variantId: string): string {
  const re = new RegExp(`<section[^>]*container-${containerName}--${variantId}[^>]*>`)
  const m = html.match(re)
  if (!m || m.index === undefined) return '<no-match>'
  // 深度计数：variant 内部可能再嵌 <section>（如 classic 的左/右括号 block 包裹），
  // 非贪婪 regex 会停在第一个 </section> 漏内容；这里手动跟 open/close 对齐。
  const start = m.index
  let depth = 1
  let i = start + m[0].length
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<section', i)
    const nextClose = html.indexOf('</section>', i)
    if (nextClose === -1) break
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++
      i = nextOpen + '<section'.length
    } else {
      depth--
      i = nextClose + '</section>'.length
    }
  }
  return html.slice(start, i)
}

describe('默认主题 · 每 variant 渲染片段快照', () => {
  // 故意穿越 themeCompat fallback 给 default 主题取快照；静音 warn 避免日志噪声
  beforeAll(() => __setCompatSilentForTest(true))
  afterAll(() => __setCompatSilentForTest(false))

  for (const c of CASES) {
    it(`${c.kind}:${c.id}`, () => {
      const { html } = render({ md: c.md, theme: defaultTheme })
      // themeCompat 守卫降级时 wrapper class 已被换成 fallback id，本断言会
      // 抓不到原 variantId 的片段，跳过快照（matrix spec 仍跑基础 class 校验）
      if (isCompatBlocked(defaultTheme.id, c.id)) return
      const chunk = sliceVariantChunk(html, c.containerName, c.id)
      expect(chunk).not.toBe('<no-match>')
      expect(chunk).toMatchSnapshot()
    })
  }
})
