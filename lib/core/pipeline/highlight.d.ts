/**
 * highlight.js 集成
 *
 * 模块顶层注册少量常用语言（见下方 hljs.registerLanguage 列表），未知语言走 escText fallback，
 * 不抛错也不留 `<code class="language-xxx">` 残留，让粘贴到公众号后样式收敛。
 * 代码主题 CSS 直接内嵌（已剔除 font-family，符合 wxPatch 硬约束）。
 *
 * 主题感知配色（让代码块配色跟随当前主题的 codeBlock variant，而不是固定 Atom One Dark）
 * 是已知未完成项——见 CONTRIBUTING.md "已知未完成模块"。
 */
export interface HighlightResult {
    html: string;
    language: string;
}
export declare function highlightCode(code: string, lang?: string): HighlightResult;
/**
 * Atom One Dark 代码主题 CSS（已剔除 font-family）
 * 来源：highlight.js/styles/atom-one-dark.css，精简后内嵌
 */
export declare const atomOneDarkCss = "\n.hljs { color: #abb2bf; background: #282c34; }\n.hljs-comment, .hljs-quote { color: #5c6370; font-style: italic; }\n.hljs-doctag, .hljs-keyword, .hljs-formula { color: #c678dd; }\n.hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst { color: #e06c75; }\n.hljs-literal { color: #56b6c2; }\n.hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string { color: #98c379; }\n.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number { color: #d19a66; }\n.hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title { color: #61aeee; }\n.hljs-built_in, .hljs-title.class_, .hljs-class .hljs-title { color: #e6c07b; }\n.hljs-emphasis { font-style: italic; }\n.hljs-strong { font-weight: bold; }\n";
