/**
 * admonition · top-bottom-rule
 *
 * 视觉：顶部 + 底部 各一根 1px 实线（无左右边）+ soft 底 + 稍大 padding。
 * 上下通栏的语义：重要且稀缺（manpage DEPRECATED / 报纸 errata 勘误条）。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="16" width="63" height="43" fill="${soft}"/>` +
      `<rect x="6" y="16" width="63" height="1.5" fill="${accent}"/>` +
      `<rect x="6" y="57.5" width="63" height="1.5" fill="${accent}"/>` +
      `<rect x="14" y="24" width="30" height="3" fill="${accent}"/>` +
      `<rect x="14" y="34" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="42" width="38" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="50" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const topBottomRule: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'top-bottom-rule',
    kind: 'admonition',
    name: '上下线',
    description: '顶底 1px 实线，像报纸 errata 勘误条',
    themeCompat: ['tech-geek'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-danger-top-bottom-rule',
      name: '上下线 Danger',
      description: '顶底 1px 实线，像报纸 errata 勘误条',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#c85a3a', soft: '#1f1612' },
      markdown: '::: danger // PITFALL variant=top-bottom-rule\n这是一个典型陷阱。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border-top:1px solid ${pair.accent};` +
        `border-bottom:1px solid ${pair.accent};` +
        `padding:14px ${padX}px;` +
        `margin:18px 0`,
      titleCSS:
        `font-size:14px;font-weight:600;color:${pair.accent};margin-bottom:8px;letter-spacing:1.2px`,
    }
  },
}

export default topBottomRule
