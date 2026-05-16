/**
 * data-brief 家族 · 编辑文案块（editorial）
 *
 * 承担"读者互动 / 编辑发声 / 数据口径 / 引用脚注"这类文字向的支撑容器。
 *
 * 包含 4 个容器：
 *   - qa-block       读者问答（Q/A 头像方块）
 *   - footnotes      脚注 / 参考文献块（variantKind=footnotes：lined / inline-flow）
 *   - editor-note    编辑部注 callout（主色左条 + kicker + 正文）
 *   - methodology    方法论小字注释（浅底 + 粗体标签 + 10px 紧凑正文）
 *
 * 与 metrics 的差异：本组容器**有 body 内容**（markdown-it 渲染的内文），
 * 渲染器 open 留段 wrapper 给 markdown 流式注入；metrics 多为"声明型"
 * （attrs 决定全部，body 忽略）。
 */

import type { ContainerRenderer } from '../types'
import { escText } from '../types'
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
    // 不设 defaultText：info 为空时不渲染 kicker（保留旧 ::: footnotes 行为）。
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

// editor-note · 编辑部注 callout：主色左竖条 + kicker（标签头）+ body。
// 区别于通用 note——note 走 textMuted 中性色调；editor-note 是"被点名"
// 的栏目编辑发声块，主色调介入。

export const editorNoteContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || ctx.kickers.editorNote
    const c = ctx.tokens.colors
    const themeStyle = inline(ctx.containers.editorNote)
    const fallback = [
      `background-color:${c.bgSoft}`,
      `border-left:3px solid ${c.primary}`,
      'padding:14px 16px',
      'margin:22px 0',
    ].join(';')
    const wrapperCSS = themeStyle || fallback
    // kicker CSS 由主题 innerStyles.editorNoteKicker 决定（baseInnerStyles 兜底 +
    // spec.innerStyles 深合并），允许主题作者重塑 kicker 形态而无需改 renderer。
    const kickerCSS = inline(ctx.innerStyles.editorNoteKicker)
    // 主题声明 assets.editorNoteKickerIcon 时，在 kicker 文字前 prepend 装饰图标。
    // 不声明则仅渲染文本——保持现有主题（data-brief / industry-observer 等）兼容。
    const icon = ctx.assets.editorNoteKickerIcon
    const iconSpan = icon
      ? `<span style="display:inline-block;vertical-align:middle;margin-right:6px;">${icon}</span>`
      : ''
    return (
      `<section class="container-editor-note" style="${wrapperCSS}">\n` +
      `<section class="container-editor-note__kicker" style="${kickerCSS}">${iconSpan}${escText(kicker)}</section>\n`
    )
  },
  close: '</section>\n',
}

// methodology · 方法论小字注释：浅底 + 粗体标签头 + 紧凑小字正文。
// 是"图注 / 调研口径"的脚注栏——与 note 的差别：methodology 排印更紧密
// （10px、padding 10px 12px），note 是叙事性补注（13px、行距更松）。

export const methodologyContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.info.trim() || ctx.kickers.methodology
    const c = ctx.tokens.colors
    const themeStyle = inline(ctx.containers.methodology)
    const fallback = [
      `background-color:${c.bgSoft}`,
      'padding:10px 12px',
      'margin:16px 0',
      'font-size:10px',
      'line-height:1.7',
      `color:${c.textMuted}`,
    ].join(';')
    const wrapperCSS = themeStyle || fallback
    // 标签头与正文同行——renderer 在 open 末尾闭合 b 之前留一个空格，让正文紧贴在后面
    const labelCSS = [
      `color:${c.text}`,
      'font-weight:700',
      'margin-right:6px',
    ].join(';')
    return (
      `<section class="container-methodology" style="${wrapperCSS}">` +
      `<b class="container-methodology__label" style="${labelCSS}">${escText(label)}</b>`
    )
  },
  close: '</section>\n',
}
