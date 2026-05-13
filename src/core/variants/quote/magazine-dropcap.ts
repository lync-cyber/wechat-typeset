/**
 * quote · magazine-dropcap（杂志风格）
 *
 * 实话：CSS ::first-letter 被公众号剥离，真 dropcap 做不到。这里的 "dropcap" 指"杂志
 * 气质"——上下双粗线 + 超大斜体引号前缀 + 右对齐署名。读者识别为"杂志/评论"家族。
 *
 * italic 只用在 svgSlot 的装饰引号字符，避免影响 body 所有文字。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const DROPCAP_QUOTE =
  '<span style="display:inline-block;font-size:48px;line-height:1;color:inherit;opacity:0.25;margin-right:8px;font-style:italic">&ldquo;</span>'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="16" width="59" height="2" fill="${accent}"/>` +
      `<rect x="8" y="20" width="59" height="2" fill="${accent}"/>` +
      `<rect x="8" y="58" width="59" height="2" fill="${accent}"/>` +
      `<rect x="8" y="62" width="59" height="2" fill="${accent}"/>` +
      `<text x="16" y="42" font-size="20" font-style="italic" fill="${accent}" opacity="0.3">A</text>` +
      `<rect x="28" y="32" width="32" height="2" fill="#c0c6cf"/>` +
      `<rect x="28" y="40" width="26" height="2" fill="#c0c6cf"/>` +
      `<rect x="28" y="48" width="30" height="2" fill="#c0c6cf"/>`,
  )
}

const magazineDropcap: VariantDef = {
  meta: {
    id: 'magazine-dropcap',
    kind: 'quote',
    name: '杂志风金句',
    description: '上下双粗线 + 大号斜体引号',
    themeCompat: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-magazine',
      name: '杂志风金句',
      description: '上下双粗线 + 大号斜体引号',
      themeCompat: ['literary-humanism'],
      markdown:
        '::: quote-card 出处 variant=magazine-dropcap\n此处填写金句正文\n:::\n',
    },
    {
      presetId: 'q-magazine-2',
      name: '杂志风无署名',
      description: '杂志气质极简版',
      themeCompat: ['literary-humanism'],
      markdown:
        '::: quote-card variant=magazine-dropcap\n此处填写金句正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const pad = ctx.tokens.spacing.containerPadding
    const accent = ctx.tokens.colors.primary
    return {
      wrapperCSS:
        `background-color:${ctx.tokens.colors.bg};` +
        `padding:${pad + 6}px ${pad + 2}px;` +
        `margin:24px 0;` +
        `border-top:3px double ${accent};` +
        `border-bottom:3px double ${accent}`,
      bodyCSS: `font-size:17px;line-height:1.85;color:${ctx.tokens.colors.text}`,
      svgSlot: DROPCAP_QUOTE,
    }
  },
}

export default magazineDropcap
