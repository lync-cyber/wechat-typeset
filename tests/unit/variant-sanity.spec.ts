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

import { describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { defaultTheme, themeList } from '../../src/core/themes'
import { VARIANT_IDS } from '../../src/core/themes/types'
import { CASES } from '../helpers/variantCases'

describe('枚举完整性', () => {
  it('11 kind × N variant 全部进入容器测试矩阵（codeBlock / note / footnotes 走独立组）', () => {
    const totals: Record<string, number> = {}
    for (const c of CASES) totals[c.kind] = (totals[c.kind] ?? 0) + 1
    expect(totals).toEqual({
      admonition: 19,
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
 */
function sliceVariantChunk(html: string, containerName: string, variantId: string): string {
  const re = new RegExp(
    `<section[^>]*container-${containerName}--${variantId}[\\s\\S]*?</section>`,
  )
  const m = html.match(re)
  return m?.[0] ?? '<no-match>'
}

describe('默认主题 · 每 variant 渲染片段快照', () => {
  for (const c of CASES) {
    it(`${c.kind}:${c.id}`, () => {
      const { html } = render({ md: c.md, theme: defaultTheme })
      const chunk = sliceVariantChunk(html, c.containerName, c.id)
      expect(chunk).not.toBe('<no-match>')
      expect(chunk).toMatchSnapshot()
    })
  }
})
