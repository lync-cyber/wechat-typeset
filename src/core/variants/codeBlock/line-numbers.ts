/**
 * codeBlock · line-numbers（IDE / 技术书 line gutter）
 *
 * 设计语言：技术参考书 / IDE 编辑器（K&R、SICP、O'Reilly、VS Code）。
 *   - 左侧固定窄列：行号（右对齐 + 单色 muted）+ 垂直分隔线
 *   - 右侧主区：标准 <pre><code> 高亮
 *   - 不放语言徽章——这条 variant 的语义是"可以按行号引用的代码"，不是"代码段落"
 *   - 表现稳定：display:table（wxPatch 不剥），与 header-bar 同源结构防回归
 *
 * 适合主题：tech-explainer / academic-frontier / swiss-grid / business-finance
 * ——任何会在正文里写"见第 7 行……"的稿件家族。
 *
 * 行号生成纪律：
 *   - 行号串就在 <pre> 里，与正文 pre 共享同一 line-height —— 两列基线对齐
 *   - hljs 跨行 span 不会触发——我们不拆 codeInnerHtml，只在邻列再印一份行号
 *   - 源末尾的孤立换行去掉一个，避免行号列末尾比代码多出一格
 */

import type { CodeBlockDef } from '../_core'
import type { Theme } from '../../themes/types'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="#fff" stroke="#d0d4da"/>` +
      `<rect x="6" y="14" width="14" height="47" rx="3 0 0 3" fill="#f5f5f3"/>` +
      `<rect x="20" y="14" width="0.7" height="47" fill="#d0d4da"/>` +
      `<text x="16" y="24" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">1</text>` +
      `<text x="16" y="33" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">2</text>` +
      `<text x="16" y="42" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">3</text>` +
      `<text x="16" y="51" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">4</text>` +
      `<text x="16" y="60" font-size="6" fill="#9aa1aa" font-family="monospace" text-anchor="end">5</text>` +
      `<rect x="26" y="22" width="34" height="2" fill="#c678dd"/>` +
      `<rect x="26" y="30" width="40" height="2" fill="#abb2bf"/>` +
      `<rect x="26" y="38" width="22" height="2" fill="#98c379"/>` +
      `<rect x="26" y="46" width="38" height="2" fill="#abb2bf"/>` +
      `<rect x="26" y="54" width="28" height="2" fill="#56b6c2"/>`,
  )
}

interface Styles {
  wrapper: string
  gutter: string
  gutterPre: string
  codeCell: string
  preReset: string
}

function styles(theme: Theme): Styles {
  const { colors, radius } = theme.tokens
  const wrapper = [
    `margin:20px 0`,
    `border-radius:${radius.md}px`,
    `overflow:hidden`,
    `border:1px solid ${colors.border}`,
    `background-color:${colors.preBg ?? '#2a2d32'}`,
  ].join(';')
  // display:table + table-cell 是 wxPatch 兜底白名单内的布局原语
  // gutter width:1% 配 white-space:nowrap 让左列自然收缩到内容宽度
  const gutter = [
    `display:table-cell`,
    `vertical-align:top`,
    `width:1%`,
    `white-space:nowrap`,
    `padding:14px 12px 14px 14px`,
    `border-right:1px solid ${colors.border}`,
    `text-align:right`,
  ].join(';')
  const gutterPre = [
    `margin:0`,
    `padding:0`,
    `background:transparent`,
    `border:none`,
    `font-family:Menlo,Monaco,Consolas,monospace`,
    `font-size:12px`,
    `line-height:1.55`,
    `color:${colors.textMuted}`,
  ].join(';')
  const codeCell = [
    `display:table-cell`,
    `vertical-align:top`,
  ].join(';')
  // pre 重置：覆盖 themeCSS 默认 margin 与 border-radius，让代码与 gutter 对齐
  const preReset = [
    `margin:0`,
    `border-radius:0`,
    `border:none`,
    `font-size:12px`,
    `line-height:1.55`,
  ].join(';')
  return { wrapper, gutter, gutterPre, codeCell, preReset }
}

const lineNumbers: CodeBlockDef = {
  meta: {
    id: 'line-numbers',
    kind: 'codeBlock',
    name: '行号代码块',
    description: '左侧行号列 + 分隔线，IDE / 技术书风',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cb-line-numbers',
      name: '行号代码块',
      description: '左 gutter 行号 + 分隔线，可在正文按行号引用',
      markdown:
        '```python variant=line-numbers\n' +
        'def fib(n):\n' +
        '    if n < 2:\n' +
        '        return n\n' +
        '    return fib(n - 1) + fib(n - 2)\n' +
        '```\n',
    },
  ],
  render: (theme, { language, codeInnerHtml }) => {
    const { wrapper, gutter, gutterPre, codeCell, preReset } = styles(theme)
    // 行号串：去掉尾随空行避免比代码多出一格
    const parts = codeInnerHtml.split('\n')
    if (parts.length > 1 && parts[parts.length - 1] === '') parts.pop()
    const totalLines = Math.max(parts.length, 1)
    const nums = Array.from({ length: totalLines }, (_, i) => String(i + 1)).join('\n')
    const langClass = language ? `language-${language} hljs` : 'hljs'
    return [
      `<section class="wx-code-block wx-code-block--line-numbers" style="${wrapper}">`,
      `<section style="display:table;width:100%;table-layout:auto">`,
      `<section class="wx-code-block__gutter" style="${gutter}">`,
      `<pre style="${gutterPre}">${nums}</pre>`,
      `</section>`,
      `<section class="wx-code-block__code" style="${codeCell}">`,
      `<pre class="wx-code-block__pre" style="${preReset}"><code class="${langClass}">${codeInnerHtml}</code></pre>`,
      `</section>`,
      `</section>`,
      `</section>`,
    ].join('')
  },
}

export default lineNumbers
