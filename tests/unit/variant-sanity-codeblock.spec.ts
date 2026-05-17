/**
 * codeBlock variant 矩阵：14 主题 × 5 variant
 *
 * codeBlock 不走 markdown-it-container 的 `:::` 容器栈，而是经
 * md.options.highlight 的 fence hook 注入 wrapper，所以从主矩阵剥离单独测试。
 * 每个 variant 必须产出 wx-code-block--{id} 双 class wrapper（bare 除外），
 * 并按 variant 设计语言保持各自的签名特征（header label / gutter / chrome / traffic-light）。
 */

import { describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import { VARIANT_IDS } from '../../src/core/themes/types'
import { assertNoForbiddenCss, assertSvgSafe } from '../helpers/variantCases'

const CODE_BLOCK_MD = ['```javascript', "const x = 1", "console.log('hi')", '```', ''].join('\n')

describe('codeBlock variant · 主矩阵', () => {
  for (const theme of themeList) {
    it(`${theme.id}`, () => {
      for (const id of VARIANT_IDS.codeBlock) {
        const label = `${theme.id} · codeBlock:${id}`
        // getMarkdown 按 theme.id 缓存 MD 实例，fence rule 闭包绑死首次创建时的 theme；
        // 覆写 variants 不改 id 会让缓存返回旧实例（variants.codeBlock 被冻结）。
        // 测试里显式拼后缀 id 绕开缓存。
        const themed = {
          ...theme,
          id: `${theme.id}--cb-${id}`,
          variants: { ...theme.variants, codeBlock: id },
        }
        const { html } = render({ md: CODE_BLOCK_MD, theme: themed })

        expect(html, `${label} 缺 <pre><code>`).toMatch(/<pre[^>]*>[\s\S]*<code[^>]*>/)

        if (id === 'bare') {
          expect(html, `${label} bare 不应出现 wrapper`).not.toMatch(/wx-code-block/)
        } else {
          const wrapperRe = new RegExp(`class="wx-code-block wx-code-block--${id}"`)
          expect(html, `${label} 缺 wrapper`).toMatch(wrapperRe)
        }

        if (id === 'header-bar') {
          expect(html, `${label} header-bar 缺语言标签`).toMatch(/>JAVASCRIPT</)
        } else if (id === 'line-numbers') {
          expect(html, `${label} line-numbers 缺 gutter`).toMatch(/wx-code-block__gutter/)
        } else if (id === 'terminal-frame') {
          expect(html, `${label} terminal-frame 缺窗口腔`).toMatch(/wx-code-block__chrome/)
          expect(html, `${label} terminal-frame 缺 traffic-light`).toMatch(/<circle[^>]*r="6"/)
        }

        assertNoForbiddenCss(html, label)
        assertSvgSafe(html, label)
        expect(html, `${label} 残留 <style>`).not.toMatch(/<style\b/i)
      }
    })
  }
})
