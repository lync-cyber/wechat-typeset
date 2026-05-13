/**
 * codeBlock · bare（默认）
 *
 * 直接产出 `<pre><code class="language-xxx hljs">...</code></pre>`，无外层 wrapper。
 * 与 v1 产物一致——升级到 v2 codeBlock 骨架后零回归。
 */

import type { CodeBlockDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#282c34"/>` +
      `<rect x="12" y="22" width="32" height="2" fill="#98c379"/>` +
      `<rect x="12" y="30" width="44" height="2" fill="#abb2bf"/>` +
      `<rect x="12" y="38" width="26" height="2" fill="#c678dd"/>` +
      `<rect x="12" y="46" width="40" height="2" fill="#abb2bf"/>` +
      `<rect x="12" y="54" width="18" height="2" fill="#56b6c2"/>`,
  )
}

const bare: CodeBlockDef = {
  meta: {
    id: 'bare',
    kind: 'codeBlock',
    name: '默认代码块',
    description: '无外框，纯 pre/code',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cb-bare',
      name: '默认代码块',
      description: '无外框，纯 pre/code 高亮',
      markdown:
        '```javascript variant=bare\n' +
        "const greet = (name) => `Hello, ${name}`\n" +
        "console.log(greet('world'))\n" +
        '```\n',
    },
  ],
  render: (_theme, { language, codeInnerHtml }) => {
    const langClass = language ? `language-${language} hljs` : 'hljs'
    return `<pre><code class="${langClass}">${codeInnerHtml}</code></pre>`
  },
}

export default bare
