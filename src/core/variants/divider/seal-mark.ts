/**
 * divider · seal-mark（大色块印章右对齐）
 *
 * 消费 theme.assets.sealMark；右对齐 "全文收束" 签名印。
 * 与设计稿 02 swiss-grid signoff（20×20 红方块右对齐）一致。
 * 缺 assets.sealMark 时退化为纯色 12×12 主色方块（DOM 上自渲染，不依赖资产）。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(args?: { accent?: string }): string {
  const accent = args?.accent ?? '#e30613'
  return svg(
    `<rect x="48" y="48" width="20" height="20" fill="${accent}"/>` +
      `<line x1="6" y1="58" x2="42" y2="58" stroke="#c0c6cf" stroke-width="1"/>`,
  )
}

const sealMark: VariantDef = {
  meta: {
    id: 'seal-mark',
    kind: 'divider',
    name: '收束印章',
    description: '右对齐大色块印章 · 全文收束签名',
    designedFor: ['swiss-grid'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dv-seal-mark',
      name: '收束印章',
      description: '右对齐大色块（消费 sealMark motif）',
      markdown: '::: divider variant=seal-mark\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const fallback = `<span style="display:inline-block;width:12px;height:12px;background-color:${c.primary}">&nbsp;</span>`
    return {
      wrapperCSS: `text-align:right;margin:32px 0 20px`,
      svgSlot: ctx.assets.sealMark ?? fallback,
    }
  },
}

export default sealMark
