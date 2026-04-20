/**
 * admonition · accent-bar
 *
 * 视觉：左侧 3px 色条 + 浅底 + 右侧轻圆角。最克制的 admonition 骨架，
 * 对任何主题都不过火，是 DEFAULT_VARIANTS.admonition 的兜底。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<rect x="6" y="14" width="3" height="47" fill="${accent}"/>` +
      `<rect x="16" y="22" width="30" height="3" fill="${accent}"/>` +
      `<rect x="16" y="32" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="39" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="46" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const accentBar: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'accent-bar',
    kind: 'admonition',
    name: '左条',
    description: '左 3px 色条 + 浅底，最克制的默认骨架',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-accent-bar',
      name: '左条 Tip',
      description: '左 3px 色条 + 浅底，最克制',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1a8450', soft: '#eef7f0' },
      markdown: '::: tip 小贴士 variant=accent-bar\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-warning-accent-bar',
      name: '左条 Warning',
      description: '提示读者谨慎的克制骨架',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#b7791f', soft: '#fdf6e3' },
      markdown: '::: warning 注意 variant=accent-bar\n正文内容\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const radius = ctx.tokens.radius.sm
    const padY = Math.max(10, Math.round(ctx.tokens.spacing.containerPadding * 0.75))
    const padX = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border-left:3px solid ${pair.accent};` +
        `padding:${padY}px ${padX}px;` +
        `border-radius:0 ${radius}px ${radius}px 0;` +
        `margin:16px 0`,
      titleCSS: `font-size:14px;font-weight:700;color:${pair.accent};margin-bottom:6px;letter-spacing:0.3px`,
    }
  },
}

export default accentBar
