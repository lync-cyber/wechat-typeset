/**
 * admonition · ledger-cell（账本单元格）
 *
 * 专为 business-finance 主题设计：从 Bloomberg Terminal、FT Markets 表格
 * 吸取视觉语言——**零圆角、硬边框、深色表头条**。
 *
 * 结构：
 *   - 全 1px 实线边框（accent 色），无圆角
 *   - 顶部整条 accent 填充的"表头行"：textInverse 白字 + 全大写 + 高字距
 *     （仿 Bloomberg 蓝色条 / 财报 disclosure 章头）
 *   - 正文在 soft 底上，字号略小，letter-spacing 稍紧，强调数据密度
 *   - 标题行本身就是数据表的列头，不另起 icon/title section
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { mergeThumb, svg } from '../_thumb'

const KIND_LABEL: Record<string, string> = {
  tip: '要点 · KEY',
  warning: '风险 · RISK',
  info: '披露 · DISCLOSURE',
  danger: '异常 · ALERT',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="5" y="14" width="65" height="47" fill="${soft}" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="5" y="14" width="65" height="11" fill="${accent}"/>` +
      `<rect x="11" y="18" width="24" height="3" fill="#fefefe"/>` +
      `<rect x="44" y="18" width="20" height="3" fill="#fefefe"/>` +
      `<rect x="11" y="32" width="52" height="2" fill="#4a5a6a"/>` +
      `<rect x="11" y="39" width="44" height="2" fill="#4a5a6a"/>` +
      `<rect x="11" y="46" width="50" height="2" fill="#4a5a6a"/>` +
      `<rect x="11" y="53" width="38" height="2" fill="#4a5a6a"/>`,
  )
}

const ledgerCell: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'ledger-cell',
    kind: 'admonition',
    name: '账本单元',
    description: '深色表头条 + 硬边框，Bloomberg Terminal 数据感',
    themeCompat: ['business-finance'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-ledger-cell',
      name: '账本 · 要点',
      description: '研究所 KEY 行',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1f4f6b', soft: '#dfe8ee' },
      markdown: '::: tip Q3 净利同比 +18% variant=ledger-cell\n主要由高端机型 ASP 抬升驱动。\n:::\n',
    },
    {
      presetId: 'ad-warning-ledger-cell',
      name: '账本 · 风险',
      description: '研究所 RISK 行',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#8a6416', soft: '#f1e8d1' },
      markdown: '::: warning 供应链集中度 variant=ledger-cell\n前五大供应商占比超 60%。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding
    const labelPrefix = KIND_LABEL[kind] ?? kind.toUpperCase()
    const title = ctx.info.trim()
    // 表头条：accent 底 + 白字 + 全大写 + 高字距；右端显示用户 title（如有）
    const headerHtml =
      `<section style="background-color:${pair.accent};` +
      `color:${ctx.tokens.colors.textInverse};` +
      `padding:6px ${padX}px;` +
      `font-size:12px;font-weight:700;letter-spacing:2px;` +
      `text-transform:uppercase;line-height:1.4">` +
      escText(labelPrefix) +
      (title ? `<span style="margin-left:10px;` +
        `letter-spacing:0.4px;text-transform:none;font-weight:600;` +
        `opacity:0.92">· ` + escText(title) + '</span>' : '') +
      '</section>'
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border:1px solid ${pair.accent};` +
        `padding:0;` +
        `margin:20px 0;` +
        `border-radius:0`,
      titleCSS: '',
      bodyCSS:
        `color:${ctx.tokens.colors.text};` +
        `padding:10px ${padX}px 12px;` +
        `font-size:14px;line-height:1.7;letter-spacing:0.3px`,
      svgSlot: headerHtml,
    }
  },
}

export default ledgerCell
