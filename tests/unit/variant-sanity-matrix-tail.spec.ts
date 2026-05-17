/**
 * variant-sanity 主矩阵 · 后半主题（themeList[9..17]）
 *
 * 切分动机见 variant-sanity-matrix.spec.ts。本文件覆盖 themeList 的后半，
 * 与 matrix（前半）共同构成全主题矩阵。
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import { __setCompatSilentForTest } from '../../src/core/pipeline/containers/_shared/themeCompatGuard'
import { CASES, assertNoForbiddenCss, assertSvgSafe, isCompatBlocked } from '../helpers/variantCases'

const HALF = Math.ceil(themeList.length / 2)
const TAIL = themeList.slice(HALF)

describe('variant sanity · 主矩阵（后半）', () => {
  // 全笛卡尔积故意穿越 themeCompat fallback；静音 warn 避免 ~250 行日志噪声
  beforeAll(() => __setCompatSilentForTest(true))
  afterAll(() => __setCompatSilentForTest(false))

  for (const theme of TAIL) {
    it(`${theme.id}`, () => {
      for (const c of CASES) {
        const label = `${theme.id} · ${c.kind}:${c.id}`
        const { html } = render({ md: c.md, theme })

        expect(html.length, label).toBeGreaterThan(0)

        const baseRe = new RegExp(`class="[^"]*container-${c.containerName}(\\s|--|")`)
        expect(html, `${label} 缺基础 class`).toMatch(baseRe)

        // variant class 断言：themeCompat 守卫降级时 id 已换，跳过此断言
        if (!isCompatBlocked(theme.id, c.id)) {
          const variantRe = new RegExp(`container-${c.containerName}--${c.id}\\b`)
          expect(html, `${label} 缺 variant class`).toMatch(variantRe)
        }

        assertNoForbiddenCss(html, label)
        assertSvgSafe(html, label)
        expect(html, `${label} 残留 <style>`).not.toMatch(/<style\b/i)
      }
    })
  }
})
