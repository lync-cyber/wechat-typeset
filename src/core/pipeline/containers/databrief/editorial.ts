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
      'display:table',
      'width:100%',
      'table-layout:auto',
      'font-size:13px',
      'line-height:1.65',
      `color:${c.text}`,
      'margin-bottom:8px',
    ].join(';')
    const badgeCellCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:22px',
      'padding-right:10px',
    ].join(';')
    const textCellCSS = ['display:table-cell', 'vertical-align:top'].join(';')
    const badgeBase = [
      'display:inline-block',
      'width:22px',
      'height:22px',
      'text-align:center',
      'line-height:22px',
      'font-size:11px',
      'font-weight:700',
      `color:${c.textInverse}`,
    ].join(';')
    const qBadgeCSS = `${badgeBase};background-color:${c.primary}`
    const aBadgeCSS = `${badgeBase};background-color:${c.text}`
    const qRow = q
      ? `<section class="container-qa-block__q" style="${rowCSS}"><span style="${badgeCellCSS}"><span style="${qBadgeCSS}">Q</span></span><span style="${textCellCSS}">${escText(q)}</span></section>\n`
      : ''
    // A 头像 + 内容容器。内容由 markdown-it 渲染（在 close 之前的 body tokens 输出）。
    // close 关 answer span + table-cell + row section + outer section。
    return (
      `<section class="container-qa-block" style="${wrapperCSS}">\n` +
      `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n` +
      qRow +
      `<section class="container-qa-block__a" style="${rowCSS}"><span style="${badgeCellCSS}"><span style="${aBadgeCSS}">A</span></span><span style="${textCellCSS}"><span class="container-qa-block__answer">\n`
    )
  },
  close: '</span></span></section>\n</section>\n',
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

