/**
 * data-brief 家族 · 编辑文案块（editorial）
 *
 * 承担"读者互动 / 编辑发声 / 数据口径 / 引用脚注"这类文字向的支撑容器。
 *
 * 包含 4 个容器：
 *   - qa-block       读者问答（Q/A 头像方块）
 *   - footnotes      脚注块（上分割线 + 编号引用）
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

// ============================================================
// qa-block · 读者问答（Q方块/A方块 头像）
// ============================================================

export const qaBlockContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || ctx.kickers.qaBlock
    const q = ctx.attrs.q ?? ''
    const c = ctx.tokens.colors
    // R4：wrapper 完全由 ctx.containers.qaBlock 决定。
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
// footnotes · 脚注块
// ============================================================

export const footnotesContainer: ContainerRenderer = {
  open: (ctx) => {
    // R4：wrapper 完全由 ctx.containers.footnotes 决定（含小字号 / muted 色由
    // baseContainers 提供，主题可在 spec.containers.footnotes 覆盖）。
    const wrapperCSS = inline(ctx.containers.footnotes)
    return `<section class="container-footnotes" style="${wrapperCSS}">\n`
  },
  close: '</section>\n',
}

// ============================================================
// refs · 流式参考文献块（footnotes 的「inline run-on」版）
//
// 与 footnotes 的取舍：footnotes 一条一行（hanging indent），refs 让所有条目同段流式
// 排列——参考学术期刊和新闻周刊的 references 段落写法（条目间作者自行用 `·` / `／`
// 分隔）。同样的纵向高度可以装下 2~3 倍条目，适合"长文献列表 + 公众号沙箱不支持
// 滚动"的现实约束。
//
// 渲染只负责外壳；body 的"流式感"靠作者把内容写成单段落（无空行）+ markdown-it 把
// 短软换行折成一段达成。也可写成有空行分段，每段一组——视觉密度由作者决定。
//
// kicker（参考文献标签头）：与 editorNote / qaBlock 同源——`ctx.info` 非空时按 primary
// 色 + letter-spacing 渲染；缺省不渲染（保持向后兼容：未指定 info 的现有内容渲染不变）。
// 作者写法：`::: refs 参考文献` 或 `::: refs REFERENCES`。
// ============================================================

export const refsContainer: ContainerRenderer = {
  open: (ctx) => {
    const wrapperCSS = inline(ctx.containers.refs)
    const kicker = ctx.info.trim()
    if (!kicker) {
      return `<section class="container-refs" style="${wrapperCSS}">\n`
    }
    const c = ctx.tokens.colors
    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:10px',
      'font-weight:700',
      'letter-spacing:0.15em',
      'margin-bottom:6px',
      'text-indent:0',
    ].join(';')
    return (
      `<section class="container-refs" style="${wrapperCSS}">\n` +
      `<section class="container-refs__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// editor-note · 编辑部注 callout
//
// 设计稿原型（sample-data-brief.md 旧版 inline `<section>` 三层嵌套）：
//   主色左竖条 + kicker（标签头，info 文字）+ body（作者写的 markdown）。
// 区别于通用 note：note 走 textMuted 中性色调，editor-note 是"被点名"
// 的栏目编辑发声块，主色调介入。
// ============================================================

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
    // R8 风格：kicker CSS 由 ctx.innerStyles.editorNoteKicker 决定（baseInnerStyles 兜底 +
    // spec.innerStyles 深合并）。允许主题作者重塑 kicker 形态而无需改 renderer：
    //   - swiss-grid: "全幅黑底白字 header bar"
    //   - brutalist: editor-note 整块荧光黄底 + kicker 走 textInverse 反色（避免色/底同色不可见）
    // 与 abstractKicker / keyNumberKicker 同构。
    const kickerCSS = inline(ctx.innerStyles.editorNoteKicker)
    return (
      `<section class="container-editor-note" style="${wrapperCSS}">\n` +
      `<section class="container-editor-note__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// methodology · 方法论小字注释
//
// 设计稿原型（旧版 inline `<section style="font-size:10px;color:#5a6068">`）：
//   浅底 + 粗体标签头（info 文字）+ 紧凑小字正文。
// 体感上是"图注 / 调研口径"的脚注栏——与 note 的差别：methodology 排印更
// 紧密（10px、padding 10px 12px），note 是叙事性补注（13px、行距更松）。
// ============================================================

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
