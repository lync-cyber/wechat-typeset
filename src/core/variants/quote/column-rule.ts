/**
 * quote · column-rule
 *
 * 视觉：左右两侧各一根 3px 主色竖线夹住段落，无底色；正文居中、气息开阔。
 * 适合文学/人文主题；极简且辨识度高（不是典型 admonition 左条）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="12" y="18" width="2" height="40" fill="${accent}"/>` +
      `<rect x="61" y="18" width="2" height="40" fill="${accent}"/>` +
      `<rect x="22" y="30" width="32" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="38" width="30" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="46" width="26" height="2" fill="#c0c6cf"/>`,
  )
}

const columnRule: VariantDef = {
  meta: {
    id: 'column-rule',
    kind: 'quote',
    name: '双竖线引用',
    description: '左右各一根细竖线夹正文',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-column',
      name: '双竖线引用',
      description: '左右各一根细竖线夹正文',
      markdown: '::: quote-card 作者 variant=column-rule\n此处填写正文\n:::\n',
    },
    {
      presetId: 'q-column-2',
      name: '双竖线精简',
      description: '留白多，正文呼吸感强',
      markdown: '::: quote-card variant=column-rule\n此处填写正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const accent = ctx.tokens.colors.primary
    return {
      wrapperCSS:
        `padding:18px 28px;` +
        `margin:22px 12px;` +
        `border-left:3px solid ${accent};` +
        `border-right:3px solid ${accent}`,
      bodyCSS: `font-size:16px;line-height:1.85;text-align:center;color:${ctx.tokens.colors.text}`,
    }
  },
}

export default columnRule
