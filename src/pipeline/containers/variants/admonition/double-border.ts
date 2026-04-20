/**
 * admonition · double-border
 *
 * 视觉：左侧 4px **双线**（CSS `border-left: 4px double`）+ **透明底** + 紧凑 padding。
 * 双线的语义：**交叉引用**——RFC / manpage 里指向另一处章节时的排版传统。
 *
 * 为什么新增：tech-geek 规范 §2.12 要求 `// REF`（info）走左双线以区别于
 * `// NOTE`（tip, 虚线）与 `// CAVEAT`（warning, 实线）。CSS `border: double`
 * 会在微信客户端正确渲染为两条平行线 —— 已人肉验证。
 *
 * 与 accent-bar / dashed-border 的硬边界：
 *   - accent-bar:    左 3px 实线   + 浅底   ("正式"备注)
 *   - dashed-border: 左 2px 虚线   + 浅底   ("附注"、铅笔感)
 *   - double-border: 左 4px 双线   + 透明底 ("交叉引用")
 *
 * 透明底故意：让 info 在不打开 soft 底色的情况下，仅靠边框与正文区分——
 * 这是 manpage 和 ACM 论文里"参见他节"常见的极克制排版，不拉读者注意力。
 */

import { defineAdmonition } from '../registry'

export const doubleBorder = defineAdmonition('double-border', (ctx, { kind }) => {
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
})
