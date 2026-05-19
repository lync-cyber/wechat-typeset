/**
 * variant-sanity 主矩阵 · 后半主题（themeList[9..17]）
 *
 * 切分动机见 variant-sanity-matrix.spec.ts。本文件覆盖 themeList 的后半，
 * 与 matrix（前半）共同构成全主题矩阵。
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import { __setTableCardWarnSilentForTest } from '../../src/core/pipeline/containers/table-card'
import { CASES, assertNoForbiddenCss, assertSvgSafe } from '../helpers/variantCases'

const HALF = Math.ceil(themeList.length / 2)
const TAIL = themeList.slice(HALF)

describe('variant sanity · 主矩阵（后半）', () => {
  // 同 matrix（前半）的静音口径——variant 主题协调 silent fallback 已删除,全笛卡尔积下
  // variant class 总会出现。table-card 列数告警保持静音避免日志噪声。
  beforeAll(() => {
    __setTableCardWarnSilentForTest(true)
  })
  afterAll(() => {
    __setTableCardWarnSilentForTest(false)
  })

  for (const theme of TAIL) {
    it(`${theme.id}`, () => {
      for (const c of CASES) {
        const label = `${theme.id} · ${c.kind}:${c.id}`
        const { html } = render({ md: c.md, theme })

        expect(html.length, label).toBeGreaterThan(0)

        const baseRe = new RegExp(`class="[^"]*container-${c.containerName}(\\s|--|")`)
        expect(html, `${label} 缺基础 class`).toMatch(baseRe)

        // 作者 `variant=xxx` override 命中合法 id 必产出对应 class,引擎不偷换骨架。
        const variantRe = new RegExp(`container-${c.containerName}--${c.id}\\b`)
        expect(html, `${label} 缺 variant class`).toMatch(variantRe)

        assertNoForbiddenCss(html, label)
        assertSvgSafe(html, label)
        expect(html, `${label} 残留 <style>`).not.toMatch(/<style\b/i)
      }
    })
  }
})
