/**
 * divider · wave（波浪线）
 *
 * 优先用主题自带 assets.dividerWave；未提供时回退到单色几何波浪。
 */

import type { VariantDef, TokenSchema } from '../_core'
import { svg } from '../_thumb'

/**
 * tokens 暴露：仅 gap-y（纵向留白）。
 *
 * divider 的 CSS 表面就只有 margin 一项；fill/stroke 是 SVG attribute，
 * 不能通过 CSS var() 注入（attr 上 var() 不生效），那条路要走 patch 档而非 tokens。
 * 单 token 也值得加：换场节奏（24px vs 40px）是作者最常想微调的尺度。
 */
export const tokenSchema: TokenSchema = {
  'gap-y': {
    type: 'size',
    label: '上下留白',
    default: '24px',
    hint: '换场前后的节奏间距',
  },
}

const FALLBACK =
  '<svg viewBox="0 0 120 12" width="120" height="12" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6" fill="none" stroke="#c0c6cf" stroke-width="1.5"/>' +
  '</svg>'

function thumb(): string {
  return svg(
    `<path d="M4,38 Q12,30 22,38 T40,38 T58,38 T72,38" fill="none" stroke="#c0c6cf" stroke-width="1.5"/>`,
  )
}

const wave: VariantDef = {
  meta: {
    id: 'wave',
    kind: 'divider',
    name: '波浪线',
    description: '柔和波形，叙事换场',
  },
  thumbnail: thumb,
  tokenSchema,
  snippets: [
    {
      presetId: 'dv-wave',
      name: '波浪线',
      description: '柔和波形，叙事换场',
      markdown: '::: divider variant=wave\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS: `text-align:center;margin:var(--uv-gap-y, 24px) 0`,
    svgSlot: ctx.assets.dividerWave ?? FALLBACK,
  }),
}

export default wave
