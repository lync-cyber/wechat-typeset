/**
 * data-brief 家族 · 编辑文案块（editorial）
 *
 * 承担"读者互动 + 脚注引用"两个文字向的支撑容器。
 *
 * 包含 2 个容器：
 *   - qa-block       读者问答（Q/A 头像方块）
 *   - footnotes      脚注 / 参考文献块（variantKind=footnotes：lined / inline-flow）
 *
 * 与 metrics 的差异：本组容器**有 body 内容**（markdown-it 渲染的内文），
 * 渲染器 open 留段 wrapper 给 markdown 流式注入；metrics 多为"声明型"
 * （attrs 决定全部，body 忽略）。
 */

import type { ContainerRenderer } from '../types'
import { escText } from '../_shared/escape'
import { inlineCss as inline } from '../_shared/cssInline'
import { makeVariantContainer } from '../_shared/makeVariantContainer'
import { FOOTNOTES_VARIANTS } from '../../../variants/registry'

// ============================================================
// qa-block · 读者问答（Q方块/A方块 头像）
// ============================================================

export const qaBlockContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || ctx.kickers.qaBlock
    const q = ctx.attrs.q ?? ''
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.qaBlock)
    const kickerCSS = [
      'font-size:11px',
      'font-weight:700',
      `color:${c.primary}`,
      'letter-spacing:0.1em',
      'margin-bottom:10px',
    ].join(';')
    const rowCSS = [
      'display:grid',
      'grid-template-columns:22px 1fr',
      'gap:10px',
      'align-items:start',
      'font-size:13px',
      'line-height:1.65',
      `color:${c.text}`,
      'margin-bottom:8px',
    ].join(';')
    const qBadgeCSS = [
      'display:inline-block',
      'width:22px',
      'height:22px',
      `background-color:${c.primary}`,
      `color:${c.textInverse}`,
      'text-align:center',
      'line-height:22px',
      'font-size:11px',
      'font-weight:700',
    ].join(';')
    const aBadgeCSS = [
      'display:inline-block',
      'width:22px',
      'height:22px',
      `background-color:${c.text}`,
      `color:${c.textInverse}`,
      'text-align:center',
      'line-height:22px',
      'font-size:11px',
      'font-weight:700',
    ].join(';')
    const qRow = q
      ? `<section class="container-qa-block__q" style="${rowCSS}"><span style="${qBadgeCSS}">Q</span><span>${escText(q)}</span></section>\n`
      : ''
    // A 头像 + 内容容器。内容由 markdown-it 渲染（在 close 之前的 body tokens 输出）。
    // 我们把 A badge + 一个 grid 行 wrapper 写在 open 尾部；close 关 wrapper 再关 section。
    return (
      `<section class="container-qa-block" style="${wrapperCSS}">\n` +
      `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n` +
      qRow +
      `<section class="container-qa-block__a" style="${rowCSS}"><span style="${aBadgeCSS}">A</span><span class="container-qa-block__answer">\n`
    )
  },
  close: '</span></section>\n</section>\n',
}

// ============================================================
// footnotes · 脚注 / 参考文献块（variantKind=footnotes）
//
// 两骨架共用一个容器，作者用 `variant=lined / inline-flow` 切换；info 非空时
// 渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。
//
// 主题 voice：spec.containers.footnotes 承担两骨架共用的色 / 字号 / 边框；
// layout 维度（padding-left / text-indent / max-height）由 variant inline 注入。
// ============================================================

export const footnotesContainer: ContainerRenderer = makeVariantContainer({
  name: 'footnotes',
  themeSlot: 'footnotes',
  table: FOOTNOTES_VARIANTS,
  fallbackId: 'lined',
  title: {
    // 不设 defaultText：info 为空时不渲染 kicker。
    defaultCSS: (ctx) =>
      [
        `color:${ctx.tokens.colors.primary}`,
        'font-size:10px',
        'font-weight:700',
        'letter-spacing:0.15em',
        'margin-bottom:6px',
        'text-indent:0',
      ].join(';'),
  },
})

