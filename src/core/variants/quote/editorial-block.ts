/**
 * quote · editorial-block（设计磁砖）
 *
 * 视觉：左侧 6px primary 实色色条 + 浅底 + 大号粗体左对齐正文 + 大写字距 byline。
 * 适用：editorial / data-brief 风格刊物——抽离"pull-quote"做版面节奏，与 column-rule
 * 的"克制双线"成对（编辑部"重点段落 vs 直接引述"区分）。
 *
 * byline 走 uppercase + letter-spacing + 12px：印刷体大字距小字感（"— J. L. BORGES · 1960"）。
 * font-family 不写——wxPatch 会剥；视觉差异由 weight/size/transform/letter-spacing 承担。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="5" height="47" fill="${accent}"/>` +
      `<rect x="16" y="22" width="38" height="4" fill="#1a1a1a"/>` +
      `<rect x="16" y="30" width="34" height="4" fill="#1a1a1a"/>` +
      `<rect x="16" y="48" width="22" height="2" fill="#9aa0a6"/>`,
  )
}

const editorialBlock: VariantDef = {
  meta: {
    id: 'editorial-block',
    kind: 'quote',
    name: '编辑部磁砖引用',
    description: '左 6px 实色条 + 浅底 + 大写字距 byline',
    themeCompat: ['data-brief', 'editorial-mook', 'business-finance', 'industry-observer'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-editorial-block',
      name: '编辑部磁砖引用',
      description: '左色条 + 大号粗体 + 印刷体 byline',
      themeCompat: ['data-brief', 'editorial-mook', 'business-finance', 'industry-observer'],
      markdown:
        '::: quote-card J. L. BORGES · 1960 variant=editorial-block\n凡我所是，皆因我读。\n:::\n',
    },
    {
      presetId: 'q-editorial-block-no-byline',
      name: '磁砖引用无署名',
      description: '纯重点段落，作版面节奏',
      themeCompat: ['data-brief', 'editorial-mook', 'business-finance', 'industry-observer'],
      markdown: '::: quote-card variant=editorial-block\n此处填写重点段落正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding
    const accent = ctx.tokens.colors.primary
    return {
      wrapperCSS:
        `background-color:${ctx.tokens.colors.bgSoft};` +
        `padding:${pad + 2}px ${pad + 4}px;` +
        `margin:22px 0;` +
        `border-left:6px solid ${accent}`,
      bodyCSS:
        `font-size:20px;font-weight:700;line-height:1.45;` +
        `text-align:left;color:${ctx.tokens.colors.text};` +
        `letter-spacing:-0.005em`,
      bylineCSS:
        `text-align:left;color:${ctx.tokens.colors.textMuted};` +
        `margin-top:14px;font-size:12px;` +
        `letter-spacing:0.08em;text-transform:uppercase`,
      bylinePrefix: '— ',
    }
  },
}

export default editorialBlock
