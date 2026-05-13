/**
 * codeBlock · bare（默认）
 *
 * 直接产出 `<pre><code class="language-xxx hljs">...</code></pre>`，无外层 wrapper。
 * 与 v1 产物一致——升级到 v2 codeBlock 骨架后零回归。
 */

import type { CodeBlockDef } from '../_core'

const bare: CodeBlockDef = {
  meta: {
    id: 'bare',
    kind: 'codeBlock',
    name: '默认代码块',
    description: '无外框，纯 pre/code',
  },
  snippets: [],
  render: (_theme, { language, codeInnerHtml }) => {
    const langClass = language ? `language-${language} hljs` : 'hljs'
    return `<pre><code class="${langClass}">${codeInnerHtml}</code></pre>`
  },
}

export default bare
