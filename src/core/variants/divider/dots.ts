/**
 * divider · dots（点阵）
 *
 * 优先用主题自带 assets.dividerDots；回退到单色圆点序列。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

const FALLBACK =
  '<svg viewBox="0 0 120 8" width="120" height="8" xmlns="http://www.w3.org/2000/svg">' +
  [20, 40, 60, 80, 100].map((cx) => `<circle cx="${cx}" cy="4" r="2" fill="#c0c6cf"/>`).join('') +
  '</svg>'

function thumb(): string {
  return svg(
    [18, 30, 42, 54]
      .map((cx) => `<circle cx="${cx}" cy="37" r="2" fill="#c0c6cf"/>`)
      .join(''),
  )
}

const dots: VariantDef = {
  meta: {
    id: 'dots',
    kind: 'divider',
    name: '点阵',
    description: '等距 4 点，现代克制',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dv-dots',
      name: '点阵',
      description: '等距 4 点，现代克制',
      markdown: '::: divider variant=dots\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS: `text-align:center;margin:24px 0`,
    svgSlot: ctx.assets.dividerDots ?? FALLBACK,
  }),
}

export default dots
