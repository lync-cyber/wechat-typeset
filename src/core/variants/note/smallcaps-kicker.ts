/**
 * note · smallcaps-kicker
 *
 * 视觉：上 letter-spaced uppercase 小字 kicker + hairline + 正文。
 * 粗野主义 / 数据简报骨架——比 minimal-callout 更"模块化"，标题与正文之间有一道
 * 主色 hairline 分隔，但整体仍走 textMuted 中性色调。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="22" font-size="6" font-weight="700" letter-spacing="2" fill="${accent}">NOTE</text>` +
      `<rect x="10" y="28" width="55" height="2" fill="${accent}"/>` +
      `<rect x="10" y="38" width="48" height="2" fill="${text}"/>` +
      `<rect x="10" y="46" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="54" width="42" height="2" fill="#c0c6cf"/>`,
  )
}

const smallcapsKicker: VariantDef = {
  meta: {
    id: 'smallcaps-kicker',
    kind: 'note',
    name: '小字 kicker + hairline',
    description: 'letter-spaced kicker + 主色 hairline',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-smallcaps-kicker',
      name: '小字 kicker Note',
      description: 'uppercase 小字 kicker + 主色 hairline',
      markdown: '::: note variant=smallcaps-kicker NOTE\n模块化短注，适配数据简报与栏目化深度文。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:16px 0',
        'padding:6px 0 0',
        `border-top:2px solid ${c.primary}`,
      ].join(';'),
      titleCSS: [
        `color:${c.primary}`,
        'font-weight:700',
        'font-size:11px',
        'letter-spacing:2px',
        'text-transform:uppercase',
        'margin:8px 0 6px',
      ].join(';'),
    }
  },
}

export default smallcapsKicker
