/**
 * admonition · dashed-border
 *
 * 视觉：左侧 2px 虚线 + soft 底。虚线语义：附注性、临时性（书边"NB"标记）。
 * 与 accent-bar / double-border 的硬边界：
 *   - accent-bar:    左 3px 实线 + 浅底（"正式"备注）
 *   - dashed-border: 左 2px 虚线 + 浅底（"附注"，铅笔感）
 *   - double-border: 左 4px 双线 + 透明底（"交叉引用"）
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<line x1="7" y1="15" x2="7" y2="60" stroke="${accent}" stroke-width="2" stroke-dasharray="3 2"/>` +
      `<rect x="16" y="22" width="30" height="3" fill="${accent}"/>` +
      `<rect x="16" y="32" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="39" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="46" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const dashedBorder: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'dashed-border',
    kind: 'admonition',
    name: '虚线框',
    description: '左 2px 虚线 + 浅底，工程写作"附注"感',
    themeCompat: ['tech-geek'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-dashed-border',
      name: '虚线框 Tip',
      description: '左 2px 虚线 + 浅底，工程写作"附注"感',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#a8c08a', soft: '#1e1f16' },
      markdown: '::: tip // NOTE variant=dashed-border\n这是一条工程附注。\n:::\n',
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
        `border-left:2px dashed ${pair.accent};` +
        `padding:${padY}px ${padX}px;` +
        `border-radius:0 ${radius}px ${radius}px 0;` +
        `margin:16px 0`,
      titleCSS:
        `font-size:14px;font-weight:600;color:${pair.accent};margin-bottom:6px;letter-spacing:1px`,
    }
  },
}

export default dashedBorder
