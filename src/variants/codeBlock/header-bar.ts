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
 *   - 语言名走白名单大写映射；未识别语言降级为空 header-bar（保留 wrapper + 空标签）
 *   - <pre> 本体保留原 class/结构，themeCSS 的 `.markdown-body pre` 规则仍命中
 */

import type { CodeBlockDef } from '../_core'
import type { Theme } from '../../themes/types'

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
  const copy = `margin-left:8px;vertical-align:middle`
  return { wrapper, header, lang, copy }
}

const headerBar: CodeBlockDef = {
  meta: {
    id: 'header-bar',
    kind: 'codeBlock',
    name: '带头部代码块',
    description: '顶栏显示语言 + copy 图标',
  },
  snippets: [],
  render: (theme, { language, codeInnerHtml }) => {
    const label = labelFor(language)
    const { wrapper, header, lang, copy } = styles(theme)
    const copyIconHtml = theme.assets.copyIcon
      ? `<span class="wx-code-block__copy" style="${copy}">${theme.assets.copyIcon}</span>`
      : ''
    const langClass = language ? `language-${language} hljs` : 'hljs'
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
  },
}

export default headerBar
