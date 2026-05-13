/**
 * divider · flower（菱形纹章）
 *
 * 优先用主题自带 assets.dividerFlower；回退到短线 + 中央菱形。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

const FALLBACK =
  '<svg viewBox="0 0 120 16" width="120" height="16" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M0,8 L50,8" stroke="#c0c6cf" stroke-width="1"/>' +
  '<path d="M70,8 L120,8" stroke="#c0c6cf" stroke-width="1"/>' +
  '<path d="M60,2 L63,8 L60,14 L57,8 Z" fill="#c0c6cf"/>' +
  '</svg>'

function thumb(): string {
  return svg(
    `<line x1="6" y1="37" x2="28" y2="37" stroke="#c0c6cf"/>` +
      `<line x1="46" y1="37" x2="68" y2="37" stroke="#c0c6cf"/>` +
      `<path d="M37,30 L41,37 L37,44 L33,37 Z" fill="#c0c6cf"/>`,
  )
}

const flower: VariantDef = {
  meta: {
    id: 'flower',
    kind: 'divider',
    name: '菱形纹章',
    description: '中央菱形 + 两侧短线',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dv-flower',
      name: '菱形纹章',
      description: '中央菱形 + 两侧短线',
      markdown: '::: divider variant=flower\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS: `text-align:center;margin:24px 0`,
    svgSlot: ctx.assets.dividerFlower ?? FALLBACK,
  }),
}

export default flower
