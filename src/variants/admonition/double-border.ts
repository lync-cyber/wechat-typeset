/**
 * admonition · double-border
 *
 * 视觉：左侧 4px 双线（CSS `border: double`）+ 透明底 + 紧凑 padding。
 * 双线语义：交叉引用（RFC/manpage/ACM 论文"参见他节"的排版传统）。
 * 透明底故意保留：仅靠边框与正文区分，不拉读者注意力。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="5" y="14" width="2" height="47" fill="${accent}"/>` +
      `<rect x="9" y="14" width="2" height="47" fill="${accent}"/>` +
      `<rect x="18" y="22" width="30" height="3" fill="${accent}"/>` +
      `<rect x="18" y="32" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="39" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="18" y="46" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const doubleBorder: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'double-border',
    kind: 'admonition',
    name: '双线框',
    description: '左 4px 双线 + 透明底，"交叉引用"manpage 风',
    themeCompat: ['tech-geek'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-info-double-border',
      name: '双线框 Info',
      description: '左 4px 双线 + 透明底，"交叉引用"manpage 风',
      admonitionKind: 'info',
      thumbArgs: { accent: '#7a9cb8' },
      markdown: '::: info // REF §2.3 variant=double-border\n参见另一节。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padY = Math.max(10, Math.round(ctx.tokens.spacing.containerPadding * 0.75))
    const padX = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `border-left:4px double ${pair.accent};` +
        `padding:${padY}px ${padX}px;` +
        `margin:16px 0`,
      titleCSS:
        `font-size:14px;font-weight:600;color:${pair.accent};margin-bottom:6px;letter-spacing:1px`,
    }
  },
}

export default doubleBorder
