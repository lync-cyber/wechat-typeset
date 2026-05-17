/**
 * data-brief 家族 · 召唤行动块（cta）
 *
 * 1 个容器：文末"赞同/收藏/转发"三栏 CTA。
 *   - cta-bar  三栏 CTA（左/右描边格 + 中实色格）
 *
 * 设计纪律：
 *   - 不依赖 flex，走 display:table + table-cell（公众号粘贴稳定）
 *   - body 内容忽略：CTA 是"声明型"的——文字由 attrs 决定，作者不需写 markdown 正文
 */

import type { ContainerRenderer } from '../types'
import { escText } from '../_shared/escape'
import { inlineCss as inline } from '../_shared/cssInline'

// ============================================================
// cta-bar · 三栏 CTA（赞同 / 收藏 / 转发）
// ============================================================

/**
 * 设计稿 cta-bar：等宽三栏，左/右描边格 + 中实色格。
 * 公众号粘贴期 display:grid 不被剥（与 KPI dashboard 同一族结论），但本容器尺寸小，
 * 改走 display:table + table-cell 更稳——cells 在窄屏渲染时仍可控。
 *
 * body 内容忽略：本容器是"声明型"的——三格文字由 attrs 决定，作者不需写 markdown 正文。
 */
export const ctaBarContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const like = ctx.attrs.like ?? '♡ 赞同'
    const star = ctx.attrs.star ?? '★ 收藏'
    const share = ctx.attrs.share ?? '↗ 转发'
    const kicker = ctx.info.trim()
    // wrapper margin / 装饰由 ctx.containers.ctaBar 决定；display:table 排版骨架
    // 由 renderer 强制保证（不可主题化——是 ctaBar 的视觉契约本身）。
    //
    // kicker（info）声明时：渲染顶部黑底白字 header bar（与 editor-note innerStyles 同源审美），
    // 三栏 cta 落在 header 下方，整体被 ctx.containers.ctaBar 的外框 wrap。
    // kicker 缺省 = 经典三栏。
    //
    // 单元格之间的分隔走"左/中格的 border-right"——共享 1px 黑线，
    // 不再用 border-spacing 留白缝（设计稿的三栏是 flush 的）。
    const wrapperCSS = kicker
      ? inline(ctx.containers.ctaBar)
      : `display:table;width:100%;table-layout:fixed;border-collapse:collapse;` +
        inline(ctx.containers.ctaBar)
    const baseCell = [
      'display:table-cell',
      'padding:12px 0',
      'text-align:center',
      'font-size:11px',
      'letter-spacing:0.1em',
      'box-sizing:border-box',
    ]
    const outlineCellLeftMid = [
      ...baseCell,
      `color:${c.text}`,
      `border-right:1px solid ${c.text}`,
    ].join(';')
    const outlineCellRight = [...baseCell, `color:${c.text}`].join(';')
    const fillCell = [
      ...baseCell,
      `background-color:${c.primary}`,
      `color:${c.textInverse}`,
      'font-weight:500',
      `border-right:1px solid ${c.text}`,
    ].join(';')
    const cellsCSS =
      `display:table;width:100%;table-layout:fixed;border-collapse:collapse`
    const cells =
      `<span style="${outlineCellLeftMid}">${escText(like)}</span>` +
      `<span style="${fillCell}">${escText(star)}</span>` +
      `<span style="${outlineCellRight}">${escText(share)}</span>`
    if (kicker) {
      const headerCSS = [
        'display:block',
        `background-color:${c.text}`,
        `color:${c.textInverse}`,
        'padding:5px 10px',
        'font-size:10px',
        'letter-spacing:0.2em',
        'font-weight:700',
      ].join(';')
      return (
        `<section class="container-cta-bar" style="${wrapperCSS}">` +
        `<section class="container-cta-bar__kicker" style="${headerCSS}">${escText(kicker)}</section>` +
        `<section class="container-cta-bar__cells" style="${cellsCSS}">${cells}</section>` +
        `</section>\n`
      )
    }
    return (
      `<section class="container-cta-bar" style="${wrapperCSS}">${cells}</section>\n`
    )
  },
  close: '',
}

