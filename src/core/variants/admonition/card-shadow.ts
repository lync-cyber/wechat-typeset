/**
 * admonition · card-shadow
 *
 * 视觉：纯白底 + 圆角 + 单层柔和阴影 + 顶部 2px accent 色条。
 * 不用 border-left，改 border-top —— 悬浮感更像"卡片漂起"而非"档案栏"。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="16" width="59" height="47" rx="4" fill="#fafafa"/>` +
      `<rect x="8" y="16" width="59" height="2" fill="${accent}"/>` +
      `<rect x="8" y="63" width="59" height="2" fill="rgba(0,0,0,0.08)"/>` +
      `<rect x="16" y="26" width="30" height="3" fill="${accent}"/>` +
      `<rect x="16" y="36" width="42" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="44" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const cardShadow: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'card-shadow',
    kind: 'admonition',
    name: '悬浮卡',
    description: '白底 + 顶部色条 + 单层柔和阴影',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-info-card-shadow',
      name: '悬浮卡 Info',
      description: '白底 + 顶部色条 + 柔阴影',
      admonitionKind: 'info',
      thumbArgs: { accent: '#1a73e8' },
      markdown: '::: info 提示 variant=card-shadow\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-tip-card-shadow',
      name: '悬浮卡 Tip',
      description: '卡片化，适合重点提示',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1a8450' },
      markdown: '::: tip 核心观点 variant=card-shadow\n正文内容\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:${ctx.tokens.colors.bg};` +
        `border-top:2px solid ${pair.accent};` +
        `padding:${pad}px;` +
        `margin:18px 0;` +
        `border-radius:8px;` +
        `box-shadow:0 2px 10px rgba(0,0,0,0.06)`,
      titleCSS: `font-weight:700;color:${pair.accent};margin-bottom:8px;font-size:15px`,
    }
  },
}

export default cardShadow
