/**
 * admonition · dashed-border
 *
 * 视觉：左侧 2px **虚线**（dashed）+ soft 底 + 正文区紧凑 padding。
 * 虚线的语义：附注性、临时性——像铅笔划在书边的"NB"标记。
 *
 * 为什么新增：tech-geek 规范 §2.10 / §2.13 "四重冗余"要求
 * `// NOTE`（tip）走左虚线以区别于 `// CAVEAT`（warning）的左实线。
 * 现有 accent-bar 只做实线，没有虚线表达——缺一个骨架。
 *
 * 与 accent-bar 的硬边界：
 *   - accent-bar: 左 3px 实线 + 浅底（最默认、最"正式"）
 *   - dashed-border: 左 2px 虚线 + 浅底（"附注"，分量更轻）
 */

import { defineAdmonition } from '../registry'

export const dashedBorder = defineAdmonition('dashed-border', (ctx, { kind }) => {
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
      `font-weight:600;color:${pair.accent};margin-bottom:6px;letter-spacing:1px`,
  }
})
