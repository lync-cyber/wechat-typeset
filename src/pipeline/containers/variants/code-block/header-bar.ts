/**
 * codeBlock · header-bar（Stripe Docs / MDN 家族 signature）
 *
 * 结构：
 *   <section class="wx-code-block wx-code-block--header-bar" style="…">
 *     <section class="wx-code-block__header" style="…">
 *       <span class="wx-code-block__lang" style="…">JAVASCRIPT</span>
 *       {copyIcon?}
 *     </section>
 *     <pre><code class="language-xxx hljs">…</code></pre>
 *   </section>
 *
 * 纪律：
 *   - 整段样式 inline（不依赖 themeCSS 外部类），让 juice 内联后粘贴到公众号依然稳定
 *   - copyIcon 从 theme.assets.copyIcon 读取，主题未提供则整段省略（不硬塞 fallback）
 *   - 语言名走白名单大写映射；未识别语言降级为空 header-bar（保留 wrapper + 空标签，避免错位）
 *   - <pre> 本体保留原 class/结构，themeCSS 的 `.markdown-body pre` / `pre code` 规则仍命中
 */

import type { Theme } from '../../../../themes/types'
import { defineCodeBlock } from '../registry'

/**
 * 语言 id → 大写展示名。
 * hljs 的 language id 本身是小写（'javascript'/'typescript'/'python'/'bash'/'json'），
 * 但标签带里要展示 "JAVASCRIPT · " 这样的大写风格，为了避免依赖运行时 toUpperCase 的
 * locale 差异（土耳其语 i 问题），显式列举；未列举的走 toUpperCase() 兜底。
 */
const LANG_LABEL: Record<string, string> = {
  javascript: 'JAVASCRIPT',
  js: 'JAVASCRIPT',
  typescript: 'TYPESCRIPT',
  ts: 'TYPESCRIPT',
  python: 'PYTHON',
  py: 'PYTHON',
  bash: 'BASH',
  sh: 'BASH',
  shell: 'BASH',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  xml: 'XML',
  markdown: 'MARKDOWN',
  md: 'MARKDOWN',
}

function labelFor(language: string): string {
  if (!language) return ''
  return LANG_LABEL[language.toLowerCase()] ?? language.toUpperCase()
}

/**
 * 根据 theme tokens 产出 wrapper/header/lang 三段 inline style。
 * 独立成函数让后续调优可在单处改动，避免散在 render 里。
 */
function styles(theme: Theme): { wrapper: string; header: string; lang: string; copy: string } {
  const { colors, radius } = theme.tokens
  const wrapper = [
    `margin:20px 0`,
    `border-radius:${radius.md}px`,
    `overflow:hidden`,
    `border:1px solid ${colors.border}`,
  ].join(';')
  const header = [
    `background-color:${colors.bgSoft}`,
    `color:${colors.textMuted}`,
    `padding:8px 14px`,
    `font-size:11px`,
    `font-weight:500`,
    `letter-spacing:0.5px`,
    `line-height:1.4`,
    `border-bottom:1px solid ${colors.border}`,
  ].join(';')
  const lang = `text-transform:uppercase`
  // 右端 copy icon 右对齐：不用 flex，用 float 也被禁；最稳是 text-align:right 的
  // 子包装块。但那会把 lang 和 copy 分到两行。折衷：copy 用 inline 节点跟在 lang 末尾，
  // 视觉上靠右对齐用 margin-left:auto 是 flex only——这里保留 copyIcon 的 style 由
  // asset SVG 自带（tech-explainer 的 copyIcon 会在 SVG 上写 style="float:right"？不行，float 被禁）。
  // 最终策略：header 内放一个"文字（左）+ copy icon（紧邻其后）"的极简结构，不强求右端对齐。
  // 视觉上仍然清楚，且粘贴稳定。
  const copy = `margin-left:8px;vertical-align:middle`
  return { wrapper, header, lang, copy }
}

export const headerBar = defineCodeBlock('header-bar', (theme, { language, codeInnerHtml }) => {
  const label = labelFor(language)
  const { wrapper, header, lang, copy } = styles(theme)
  const copyIconHtml = theme.assets.copyIcon
    ? `<span class="wx-code-block__copy" style="${copy}">${theme.assets.copyIcon}</span>`
    : ''
  const langClass = language ? `language-${language} hljs` : 'hljs'
  // <pre> 外层去掉自身 margin（margin 交给 wrapper），保留 padding/background 等由 themeCSS 给出。
  // 这里通过 inline style 把 margin/border-radius 清零，防止 pre 自己的圆角透出 wrapper。
  const preInlineReset = `margin:0;border-radius:0`
  return [
    `<section class="wx-code-block wx-code-block--header-bar" style="${wrapper}">`,
    `<section class="wx-code-block__header" style="${header}">`,
    `<span class="wx-code-block__lang" style="${lang}">${label}</span>`,
    copyIconHtml,
    `</section>`,
    `<pre class="wx-code-block__pre" style="${preInlineReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
    `</section>`,
  ].join('')
})
