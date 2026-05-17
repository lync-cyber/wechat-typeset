/**
 * variant-sanity 主矩阵 · 后半主题（themeList[9..17]）
 *
 * 切分动机见 variant-sanity-matrix.spec.ts。本文件覆盖 themeList 的后半，
 * 与 matrix（前半）共同构成全主题矩阵。
 */

import { describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import { CASES, assertNoForbiddenCss, assertSvgSafe } from '../helpers/variantCases'

const HALF = Math.ceil(themeList.length / 2)
const TAIL = themeList.slice(HALF)

describe('variant sanity · 主矩阵（后半）', () => {
  for (const theme of TAIL) {
    it(`${theme.id}`, () => {
      for (const c of CASES) {
        const label = `${theme.id} · ${c.kind}:${c.id}`
        const { html } = render({ md: c.md, theme })

        expect(html.length, label).toBeGreaterThan(0)

        const baseRe = new RegExp(`class="[^"]*container-${c.containerName}(\\s|--|")`)
        const variantRe = new RegExp(`container-${c.containerName}--${c.id}\\b`)
        expect(html, `${label} 缺基础 class`).toMatch(baseRe)
        expect(html, `${label} 缺 variant class`).toMatch(variantRe)

        assertNoForbiddenCss(html, label)
        assertSvgSafe(html, label)
        expect(html, `${label} 残留 <style>`).not.toMatch(/<style\b/i)
      }
    })
  }
})
