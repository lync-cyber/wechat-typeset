/**
 * note · hanging-indent
 *
 * 视觉：悬挂缩进 + textMuted 标题（uppercase letter-spaced），适合学术 / 论文风格的
 * 旁批与注释。和 footnotes 的 lined 同源排印语汇——但 note 用于"作者的 sidebar 想法"，
 * footnotes 是文献条目。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="22" font-size="6" font-weight="700" letter-spacing="1" fill="${accent}">REMARK</text>` +
      `<rect x="10" y="30" width="55" height="2" fill="${text}"/>` +
      `<rect x="22" y="40" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="48" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="56" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const hangingIndent: VariantDef = {
  meta: {
    id: 'hanging-indent',
    kind: 'note',
    name: '悬挂缩进',
    description: 'uppercase 小标题 + 悬挂缩进，学术风',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-hanging-indent',
      name: '悬挂缩进 Note',
      description: 'uppercase letter-spaced 小标题 + 缩进，论文旁批',
      markdown: '::: note variant=hanging-indent REMARK\n附属说明，多行内容会以悬挂缩进展开。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:16px 0',
        'padding:8px 0 4px 12px',
        'text-indent:-12px',
      ].join(';'),
      titleCSS: [
        `color:${c.primary}`,
        'font-weight:700',
        'font-size:11px',
        'letter-spacing:1.5px',
        'text-transform:uppercase',
        'margin-bottom:6px',
        'display:inline-block',
        'margin-right:6px',
      ].join(';'),
    }
  },
}

export default hangingIndent
