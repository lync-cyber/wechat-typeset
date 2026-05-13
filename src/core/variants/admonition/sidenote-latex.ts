/**
 * admonition · sidenote-latex（学术旁注 / LaTeX 定理框）
 *
 * 专为 academic-frontier 主题设计：摆脱"Web 卡片"气质，取 LaTeX
 * `\begin{theorem}` / `\begin{remark}` 的细边框 + 小型大写标题语汇：
 *   - 1px 细实线四面框（accent 色），无圆角，无浅底填充——论文里定理框不会涂色
 *   - 标题为**内嵌小型大写**（text-transform uppercase + 字距 2px），
 *     行首如 `Definition.` `Remark.` 的 inline 起始，与正文共处一行
 *   - 正文字号略小（13-14px），紧凑行高，克制如同学报脚注栏
 *   - danger 态**不报警**：学术语境里"谬误提示"是灰色存疑而非红色交通灯
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { mergeThumb, svg } from '../_thumb'

const KIND_LABEL: Record<string, string> = {
  tip: 'DEFINITION',
  warning: 'REMARK',
  info: 'LEMMA',
  danger: 'CAVEAT',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="none" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="12" y="20" width="34" height="3" fill="${accent}"/>` +
      `<rect x="12" y="30" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="37" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="44" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="51" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const sidenoteLatex: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'sidenote-latex',
    kind: 'admonition',
    name: 'LaTeX 旁注',
    description: '细边框 + 小型大写标题，LaTeX 定理框语汇',
    themeCompat: ['academic-frontier'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-sidenote-latex',
      name: '旁注 Definition',
      description: '\\begin{definition} 风格',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1e2c4a', soft: '#f3f4f7' },
      markdown: '::: tip 最小生成树 variant=sidenote-latex\n连通图中权和最小的生成子树。\n:::\n',
    },
    {
      presetId: 'ad-info-sidenote-latex',
      name: '旁注 Lemma',
      description: '\\begin{lemma} 风格',
      admonitionKind: 'info',
      thumbArgs: { accent: '#4a5670', soft: '#f1f2f4' },
      markdown: '::: info 引理 variant=sidenote-latex\n若 A 则 B。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding
    const label = KIND_LABEL[kind] ?? kind.toUpperCase()
    const title = ctx.info.trim()
    // 标题行：inline 小型大写 "LABEL." + 可选后续文案，视觉嵌在正文起始处
    // 故意不用 flex/table——纯 inline-block 让它与下一行段首字天然续接
    const labelHtml =
      `<section style="padding:10px ${padX}px 0;font-size:13px;` +
      `color:${pair.accent};letter-spacing:2px;font-weight:700;` +
      `text-transform:uppercase;line-height:1.6">` +
      escText(label) + '.' +
      (title ? `<span style="color:${ctx.tokens.colors.text};` +
        `text-transform:none;letter-spacing:0.3px;font-weight:600;` +
        `margin-left:10px">` + escText(title) + '</span>' : '') +
      '</section>'
    return {
      wrapperCSS:
        `border:1px solid ${pair.accent};` +
        `padding:0 0 10px;` +
        `margin:18px 0;` +
        `border-radius:0;` +
        `background-color:transparent`,
      titleCSS: '',
      bodyCSS:
        `padding:6px ${padX}px 0;` +
        `color:${ctx.tokens.colors.text};` +
        `font-size:14px;line-height:1.75`,
      svgSlot: labelHtml,
    }
  },
}

export default sidenoteLatex
