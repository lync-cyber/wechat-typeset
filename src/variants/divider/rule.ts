/**
 * divider · rule（纯 hr，最克制）
 *
 * 对应 v1 'line' 行为。wrapper 自带 margin，svgSlot 用 inline hr 避免块级 hr 的多余上下 margin。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(`<rect x="6" y="36" width="63" height="1" fill="#c0c6cf"/>`)
}

const rule: VariantDef = {
  meta: {
    id: 'rule',
    kind: 'divider',
    name: '细线',
    description: '最克制的 1px 灰线',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dv-rule',
      name: '细线',
      description: '最克制的 1px 灰线',
      markdown: '::: divider\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS: `margin:24px 0`,
    svgSlot: `<hr style="border:none;height:1px;background-color:${ctx.tokens.colors.border};margin:0"/>`,
  }),
}

export default rule
