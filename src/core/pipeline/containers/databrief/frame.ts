/**
 * data-brief 家族 · 刊物结构外框（frame）
 *
 * 承担"页码 / 目录 / 栏目标签 / 刊物收束"这类"非数据、非编辑文案"的版面骨架。
 *
 * 包含 5 个容器：
 *   - masthead       刊头（刊名 + monospace 期号·日期）
 *   - section-tag    小栏目标签（黑底白字胶囊）
 *   - toc            目录外壳 + kicker
 *   - toc-item       单条目录（序号 · 标题 · 页码 三栏 grid）
 *   - colophon       刊物收束栏（上分割线 + "下期 / 卷·期"双栏 monospace）
 *
 * 设计纪律（与 metrics / editorial / cta 共通）：
 *   1. 结构性布局（display:grid/table）由 renderer 强制，不进 ThemeContainers 槽位
 *   2. wrapper 装饰（padding/border/bg/margin）由 ctx.containers.<slot> 决定
 *   3. monospace 字体仅在 renderer inline 出现（主题 elements/containers CSS 禁 font-family）
 */

import type { ContainerRenderer } from '../types'
import { escText } from '../types'
import { inlineCss as inline } from '../_shared/cssInline'

// ============================================================
// masthead · 刊头
// ============================================================

export const mastheadContainer: ContainerRenderer = {
  open: (ctx) => {
    const name = ctx.info.trim() || ctx.kickers.mastheadName
    const issue = ctx.attrs.issue ?? ''
    const date = ctx.attrs.date ?? ''
    const kicker = ctx.attrs.kicker ?? ''
    const c = ctx.tokens.colors
    // R4：装饰位（padding / border / bg / margin）由 ctx.containers.masthead 决定。
    // 结构性 display:grid 是本容器的视觉契约，由 renderer 强制——
    // 不进 ThemeContainers 槽位（themeCSS guard 会拒绝 display:grid）。
    //
    // 两种布局模式（由 attrs.kicker 切换）：
    //   - 默认（无 kicker）：左 1fr 名 / 右 auto 期号·日期 —— data-brief 经典刊头
    //   - ribbon（有 kicker）：三栏等宽，左 kicker / 中 name（accent 色） / 右 date
    //     —— 报刊"期次条"骨架（粗野主义 / 杂志编辑系常用），date 直接走 attrs.date
    //     不再前缀"第 N 期"（前缀语义由 kicker 承担：例 kicker="第 04 期"）。
    const isRibbon = kicker !== ''
    const wrapperCSS = isRibbon
      ? `display:grid;grid-template-columns:1fr 1fr 1fr;align-items:baseline;` +
        inline(ctx.containers.masthead)
      : `display:grid;grid-template-columns:1fr auto;align-items:baseline;` +
        inline(ctx.containers.masthead)
    if (isRibbon) {
      // ribbon 模式：三栏等宽 monospace，中间 name 走 primary（accent）色突出
      const sideCSS = [
        `color:${c.text}`,
        'font-family:Menlo,Monaco,monospace',
        'font-size:10px',
        'letter-spacing:0.1em',
      ].join(';')
      const sideRightCSS = sideCSS + ';text-align:right'
      const nameCSS = [
        `color:${c.primary}`,
        'font-family:Menlo,Monaco,monospace',
        'font-size:10px',
        'font-weight:700',
        'letter-spacing:0.1em',
        'text-align:center',
      ].join(';')
      return (
        `<section class="container-masthead container-masthead--ribbon" style="${wrapperCSS}">\n` +
        `<span class="container-masthead__kicker" style="${sideCSS}">${escText(kicker)}</span>` +
        `<span class="container-masthead__name" style="${nameCSS}">${escText(name)}</span>` +
        `<span class="container-masthead__date" style="${sideRightCSS}">${escText(date)}</span>` +
        `\n`
      )
    }
    const nameCSS = [
      `color:${c.text}`,
      'font-size:13px',
      'font-weight:700',
      'letter-spacing:-0.01em',
    ].join(';')
    const metaCSS = [
      `color:${c.textMuted}`,
      'font-family:Menlo,Monaco,monospace',
      'font-size:11px',
      'text-align:right',
    ].join(';')
    const metaText =
      issue || date
        ? `${issue ? `第 ${escText(issue)} 期` : ''}${issue && date ? ' · ' : ''}${date ? escText(date) : ''}`
        : ''
    return (
      `<section class="container-masthead" style="${wrapperCSS}">\n` +
      `<span class="container-masthead__name" style="${nameCSS}">${escText(name)}</span>` +
      (metaText
        ? `<span class="container-masthead__meta" style="${metaCSS}">${metaText}</span>`
        : '<span></span>') +
      `\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// section-tag · 黑底白字小栏目标签
// ============================================================

export const sectionTagContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.info.trim() || '标签'
    const c = ctx.tokens.colors
    // R4：外壳 section 仅承载 margin；标签本体走 inline-block 胶囊。
    const wrapperCSS = inline(ctx.containers.sectionTag)
    const pillCSS = [
      'display:inline-block',
      `background-color:${c.text}`,
      `color:${c.textInverse}`,
      'font-size:10px',
      'letter-spacing:0.15em',
      'padding:3px 8px',
    ].join(';')
    return (
      `<section class="container-section-tag" style="${wrapperCSS}">` +
      `<span class="container-section-tag__pill" style="${pillCSS}">${escText(label)}</span>` +
      `</section>\n`
    )
  },
  close: '',
}

// ============================================================
// toc · 目录（外壳 + kicker）
// ============================================================

export const tocContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || ctx.kickers.toc
    const c = ctx.tokens.colors
    // R4：wrapper 完全由 ctx.containers.toc 决定。
    const wrapperCSS = inline(ctx.containers.toc)
    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:10px',
      'font-weight:700',
      'letter-spacing:0.15em',
      'margin-bottom:6px',
    ].join(';')
    return (
      `<section class="container-toc" style="${wrapperCSS}">\n` +
      `<section class="container-toc__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
    )
  },
  close: '</section>\n',
}

/**
 * toc-item · 单条
 *
 * 三栏 grid（序号 monospace 主色 / 标题 / 页码 monospace 灰）。
 * info 为条目标题；attrs.no = 序号，attrs.page = 页码。body 内容忽略。
 */
export const tocItemContainer: ContainerRenderer = {
  open: (ctx) => {
    const no = ctx.attrs.no ?? ''
    const page = ctx.attrs.page ?? ''
    const title = ctx.info.trim()
    const c = ctx.tokens.colors
    const wrapperCSS = [
      'display:grid',
      'grid-template-columns:30px 1fr auto',
      'gap:0 10px',
      'align-items:baseline',
      'font-size:12px',
      'line-height:1.75',
      'padding:1px 0',
    ].join(';')
    const noCSS = [
      'font-family:Menlo,Monaco,monospace',
      `color:${c.primary}`,
      'font-size:11px',
    ].join(';')
    const titleCSS = `color:${c.text}`
    const pageCSS = [
      'font-family:Menlo,Monaco,monospace',
      `color:${c.textMuted}`,
      'font-size:11px',
      'text-align:right',
    ].join(';')
    return (
      `<section class="container-toc-item" style="${wrapperCSS}">` +
      `<span style="${noCSS}">${escText(no)}</span>` +
      `<span style="${titleCSS}">${escText(title)}</span>` +
      `<span style="${pageCSS}">${escText(page)}</span>` +
      `</section>\n`
    )
  },
  close: '',
}

// ============================================================
// colophon · 刊物收束栏（"下期 / 卷·期"双栏）
//
// 设计稿原型（旧版 inline `<section style="display:table">` + 双 table-cell）：
//   上分割线（1px 实线，比 footnotes 的 border 更重，标记"全文结束"）+
//   左右两栏 monospace 元数据。kicker（小字大写）+ value（normal）双行。
// body 内容忽略；左栏数据走 attrs.next，右栏走 attrs.issue。
// ============================================================

export const colophonContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const nextLine = ctx.attrs.next ?? ''
    const issueLine = ctx.attrs.issue ?? ''
    const themeStyle = inline(ctx.containers.colophon)
    const fallback = [
      `border-top:1px solid ${c.text}`,
      'margin-top:20px',
      'padding-top:12px',
    ].join(';')
    const wrapperCSS =
      `display:table;width:100%;table-layout:fixed;` +
      `font-size:11px;line-height:1.6;color:${c.text};` +
      `${themeStyle || fallback}`
    const cellLeftCSS = 'display:table-cell;vertical-align:top'
    const cellRightCSS = 'display:table-cell;vertical-align:top;text-align:right'
    const kickerCSS = [
      'display:block',
      `color:${c.textMuted}`,
      'font-size:10px',
      'letter-spacing:0.1em',
      'margin-bottom:3px',
    ].join(';')
    return (
      `<section class="container-colophon" style="${wrapperCSS}">` +
      `<span style="${cellLeftCSS}">` +
      `<span style="${kickerCSS}">${escText(ctx.kickers.colophonNextLabel)}</span>${escText(nextLine)}` +
      `</span>` +
      `<span style="${cellRightCSS}">` +
      `<span style="${kickerCSS}">${escText(ctx.kickers.colophonIssueLabel)}</span>${escText(issueLine)}` +
      `</span>` +
      `</section>\n`
    )
  },
  close: '',
}
