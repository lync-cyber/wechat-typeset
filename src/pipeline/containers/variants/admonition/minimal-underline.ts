/**
 * admonition · minimal-underline
 *
 * 视觉：无底色、无外框；仅标题下一道 2px 主色线 + 正文缩进。
 * 最克制的骨架，配合极简主题或大量提示密集场景使用（省视觉预算）。
 */

import type { AdmonitionVariant } from '../registry'

export const minimalUnderline: AdmonitionVariant = {
  id: 'minimal-underline',
  kind: 'admonition',
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
