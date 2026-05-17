/**
 * admonition · pill-tag
 *
 * 视觉：外框四边 1px accent + 浅底；标题以 inline-block 胶囊形式悬在顶边（负 margin-top）。
 * 为什么不是 position:absolute：公众号剥离 absolute，只能靠 margin 负值制造"悬出"。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="20" width="63" height="45" rx="4" fill="${soft}" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="14" y="14" width="28" height="14" rx="7" fill="${accent}"/>` +
      `<rect x="14" y="38" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="46" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="54" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const pillTag: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'pill-tag',
    kind: 'admonition',
    name: '悬浮胶囊',
    description: '顶部胶囊标签 + 外框，文字有视觉重心',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-pill-tag',
      name: '悬浮胶囊 Tip',
      description: '顶部胶囊标签，文字有视觉重心',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1a8450', soft: '#eef7f0' },
      markdown: '::: tip 核心提示 variant=pill-tag\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-info-pill-tag',
      name: '悬浮胶囊 Info',
      description: '浅底 + 深色描边，告示板感',
      admonitionKind: 'info',
      thumbArgs: { accent: '#1a73e8', soft: '#eef4ff' },
      markdown: '::: info 背景说明 variant=pill-tag\n正文内容\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padY = ctx.tokens.spacing.containerPadding
    const padX = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border:1px solid ${pair.accent};` +
        `padding:${padY + 8}px ${padX}px ${padY}px;` +
        `border-radius:6px;` +
        `margin:24px 0 16px`,
      titleCSS:
        `display:inline-block;` +
        `padding:3px 12px;` +
        `background-color:${pair.accent};` +
        `color:${ctx.tokens.colors.textInverse};` +
        `border-radius:12px;` +
        `font-size:13px;` +
        `font-weight:700;` +
        `margin-top:-${padY + 18}px;` +
        `margin-bottom:10px;` +
        `letter-spacing:0.4px`,
    }
  },
}

export default pillTag
