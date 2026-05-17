/**
 * note · editorial-stripe
 *
 * 视觉：bgSoft 底 + 左 3px 主色实线 + kicker 小标题 + 正文。
 * 编辑部按语气——主色介入的栏目编辑发声块，与中性 minimal-callout /
 * side-bar 区分：editorial-stripe 不走 textMuted，kicker 用主色 letter-spaced 上印。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="${soft}"/>` +
      `<rect x="8" y="14" width="3" height="47" fill="${accent}"/>` +
      `<text x="16" y="24" font-size="6" font-weight="700" letter-spacing="1" fill="${accent}">编 者 按</text>` +
      `<rect x="16" y="32" width="48" height="2" fill="${text}"/>` +
      `<rect x="16" y="40" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="48" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="56" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const editorialStripe: VariantDef = {
  meta: {
    id: 'editorial-stripe',
    kind: 'note',
    name: '编辑部按',
    description: '左 3px 主色条 + bgSoft + kicker',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-editorial-stripe',
      name: '编辑部按',
      description: '主色左竖条 + 浅底 + kicker，编辑部发声块',
      markdown: '::: note variant=editorial-stripe 编 者 按\n本期编辑部就读者反馈做几点说明 …\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `border-left:3px solid ${c.primary}`,
        'padding:14px 16px',
        'margin:22px 0',
      ].join(';'),
      titleCSS: [
        `color:${c.primary}`,
        'font-weight:700',
        'font-size:13px',
        'letter-spacing:0.1em',
        'margin-bottom:8px',
      ].join(';'),
    }
  },
}

export default editorialStripe
