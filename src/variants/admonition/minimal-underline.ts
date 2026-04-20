/**
 * admonition · minimal-underline
 *
 * 视觉：无底色、无外框；仅标题下一道 2px 主色线 + 正文缩进。
 * 最克制的骨架，配合极简主题或大量提示密集场景使用。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="14" y="20" width="24" height="3" fill="${accent}"/>` +
      `<rect x="14" y="26" width="2" height="30" fill="${accent}"/>` +
      `<rect x="20" y="32" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="20" y="40" width="34" height="2" fill="#c0c6cf"/>` +
      `<rect x="20" y="48" width="28" height="2" fill="#c0c6cf"/>`,
  )
}

const minimalUnderline: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'minimal-underline',
    kind: 'admonition',
    name: '极简',
    description: '无底色仅标题下划线，省视觉预算',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-minimal',
      name: '极简 Tip',
      description: '无底色，仅标题下划线，省视觉预算',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1a8450' },
      markdown: '::: tip 小提醒 variant=minimal-underline\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-info-minimal',
      name: '极简 Info',
      description: '配合大量提示密集使用',
      admonitionKind: 'info',
      thumbArgs: { accent: '#1a73e8' },
      markdown: '::: info 说明 variant=minimal-underline\n正文内容\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    return {
      wrapperCSS:
        `padding:4px 0 4px 12px;` +
        `margin:14px 0;` +
        `border-left:2px solid ${pair.accent}`,
      titleCSS:
        `display:inline-block;` +
        `font-size:14px;` +
        `color:${pair.accent};` +
        `font-weight:700;` +
        `padding-bottom:2px;` +
        `border-bottom:1px solid ${pair.accent};` +
        `margin-bottom:8px;` +
        `letter-spacing:0.5px`,
    }
  },
}

export default minimalUnderline
