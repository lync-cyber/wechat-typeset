/**
 * note · side-bar
 *
 * 视觉：左 2px 实线 + 左缩进，经典"此处有补充"批注式。
 * 与 admonition/accent-bar 区别：色彩走 border / textMuted（中性），不情绪。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="16" width="2" height="42" fill="${text}"/>` +
      `<rect x="18" y="22" width="20" height="2" fill="${text}"/>` +
      `<rect x="18" y="32" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="40" width="38" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="48" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const sideBar: VariantDef = {
  meta: {
    id: 'side-bar',
    kind: 'note',
    name: '左侧标线',
    description: '左 2px 中性线 + 左缩进，经典批注式',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-side-bar',
      name: '左侧标线 Note',
      description: '中性左条 + 缩进，"此处有补充"批注感',
      markdown: '::: note variant=side-bar 旁注\n附属说明 …\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `border-left:2px solid ${c.border}`,
        'padding:4px 0 4px 12px',
        'margin:16px 0',
      ].join(';'),
      titleCSS: [
        `color:${c.textMuted}`,
        'font-weight:600',
        'font-size:13px',
        'margin-bottom:4px',
        'letter-spacing:0.3px',
      ].join(';'),
    }
  },
}

export default sideBar
