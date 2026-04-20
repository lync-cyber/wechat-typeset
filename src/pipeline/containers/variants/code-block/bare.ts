/**
 * codeBlock · bare（v1 默认行为的等价实现）
 *
 * 直接产出 `<pre><code class="language-xxx hljs">...</code></pre>`，无外层 wrapper。
 * 现有 5 套主题都走此 variant，产物与 v1 一致——升级到 v2 codeBlock 骨架后零回归。
 */

import { defineCodeBlock } from '../registry'

export const bare = defineCodeBlock('bare', (_theme, { language, codeInnerHtml }) => {
  const langClass = language ? `language-${language} hljs` : 'hljs'
  return `<pre><code class="${langClass}">${codeInnerHtml}</code></pre>`
})
