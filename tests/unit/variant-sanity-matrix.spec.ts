/**
 * variant-sanity 主矩阵 · 前半主题（themeList[0..8]）
 *
 * 对半切原因：单文件 14 主题共 ~17s，是整套测试的并行下限。切成
 * matrix（前半 9 主题）+ matrix-tail（后半 9 主题）两份后两个 worker 同时跑，
 * 单文件 ~8s 不再是阻塞。
 *
 * 渲染契约（每组容器 render 必须满足）：
 *   ① 零抛错（variant / themeCSS / juice / wxPatch 全程不炸）
 *   ② 输出含 `container-{kindName}--{variantId}` 双 class
 *   ③ 不含被微信剥离的 CSS（position / float / @media / @keyframes / :hover / -webkit-）
 *   ④ 内嵌 SVG 不含 id 属性 / url('…')
 *   ⑤ juice 后无 <style> 残留
 *
 * 与 variant-sanity-matrix-tail.spec.ts 共享 helpers/variantCases.ts 的 CASES /
 * assertNoForbiddenCss / assertSvgSafe；新增主题时务必两份都跟着切分点更新。
 */

import { describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import { CASES, assertNoForbiddenCss, assertSvgSafe, isCompatBlocked } from '../helpers/variantCases'

const HALF = Math.ceil(themeList.length / 2)
const HEAD = themeList.slice(0, HALF)

describe('variant sanity · 主矩阵（前半）', () => {
  for (const theme of HEAD) {
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
