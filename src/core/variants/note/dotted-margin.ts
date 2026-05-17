/**
 * note · dotted-margin
 *
 * 视觉：左侧 dotted rule（2px dotted border-left）+ 缩进，与 side-bar 的实线相对。
 * 人文札记 / 散文式旁批语汇：dotted 比 solid 更轻，像"作者在页边手写一段补充"。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<circle cx="11" cy="20" r="1" fill="${text}"/>` +
      `<circle cx="11" cy="28" r="1" fill="${text}"/>` +
      `<circle cx="11" cy="36" r="1" fill="${text}"/>` +
      `<circle cx="11" cy="44" r="1" fill="${text}"/>` +
      `<circle cx="11" cy="52" r="1" fill="${text}"/>` +
      `<rect x="18" y="22" width="22" height="2" fill="${text}"/>` +
      `<rect x="18" y="32" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="40" width="38" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="48" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const dottedMargin: VariantDef = {
  meta: {
    id: 'dotted-margin',
    kind: 'note',
    name: '左侧虚点',
    description: '左 dotted rule + 缩进，散文页边批注',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-dotted-margin',
      name: '左侧虚点 Note',
      description: '左 dotted rule + 缩进，比 side-bar 更轻',
      markdown: '::: note variant=dotted-margin 旁批\n这里是页边的手记，作者随文补一句。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:16px 0',
        'padding:4px 0 4px 14px',
        `border-left:2px dotted ${c.border}`,
      ].join(';'),
      titleCSS: [
        `color:${c.textMuted}`,
        'font-weight:600',
        'font-size:13px',
        'font-style:italic',
        'margin-bottom:4px',
      ].join(';'),
    }
  },
}

export default dottedMargin
