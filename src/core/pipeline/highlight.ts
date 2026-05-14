/**
 * highlight.js 集成
 *
 * 模块顶层注册少量常用语言（见下方 hljs.registerLanguage 列表），未知语言走 escapeHtml fallback，
 * 不抛错也不留 `<code class="language-xxx">` 残留，让粘贴到公众号后样式收敛。
 * 代码主题 CSS 直接内嵌（已剔除 font-family，符合 wxPatch 硬约束）。
 *
 * 主题感知配色（让代码块配色跟随当前主题的 codeBlock variant，而不是固定 Atom One Dark）
 * 是已知未完成项——见 CONTRIBUTING.md "已知未完成模块"。
 */

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('json', json)

export interface HighlightResult {
  html: string
  language: string
}

export function highlightCode(code: string, lang?: string): HighlightResult {
  const language = lang && hljs.getLanguage(lang) ? lang : ''
  if (!language) {
    return { html: escapeHtml(code), language: '' }
  }
  try {
    const result = hljs.highlight(code, { language, ignoreIllegals: true })
    return { html: result.value, language }
  } catch {
    return { html: escapeHtml(code), language: '' }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Atom One Dark 代码主题 CSS（已剔除 font-family）
 * 来源：highlight.js/styles/atom-one-dark.css，精简后内嵌
 */
export const atomOneDarkCss = `
.hljs { color: #abb2bf; background: #282c34; }
.hljs-comment, .hljs-quote { color: #5c6370; font-style: italic; }
.hljs-doctag, .hljs-keyword, .hljs-formula { color: #c678dd; }
.hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst { color: #e06c75; }
.hljs-literal { color: #56b6c2; }
.hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string { color: #98c379; }
.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number { color: #d19a66; }
.hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title { color: #61aeee; }
.hljs-built_in, .hljs-title.class_, .hljs-class .hljs-title { color: #e6c07b; }
.hljs-emphasis { font-style: italic; }
.hljs-strong { font-weight: bold; }
`
