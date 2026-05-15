/**
 * data-brief 家族 · 召唤行动块（cta）
 *
 * 2 个容器：文末"赞同/收藏/转发"三栏 CTA + 二维码订阅卡。
 *   - cta-bar    三栏 CTA（左/右描边格 + 中实色格）
 *   - qr-follow  二维码订阅卡（左 QR + 右 SUBSCRIBE/标题/说明）
 *
 * 设计纪律：
 *   - 两者都不依赖 flex，走 display:table + table-cell（公众号粘贴稳定）
 *   - body 内容忽略：CTA 是"声明型"的——文字由 attrs 决定，作者不需写 markdown 正文
 *   - qr-follow 缺省时画占位 SVG（角眼 + 散点的视觉伪二维码），保证肉眼可识但不承诺扫描功能
 */

import type { ContainerRenderer } from '../types'
import { escText } from '../types'
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
    // kicker 缺省 = 经典三栏，与 R10 前行为字节等价。
    const wrapperCSS = kicker
      ? inline(ctx.containers.ctaBar)
      : `display:table;width:100%;table-layout:fixed;border-spacing:6px 0;border-collapse:separate;` +
        inline(ctx.containers.ctaBar)
    const outlineCell = [
      'display:table-cell',
      'padding:10px 0',
      'text-align:center',
      `border:1px solid ${c.text}`,
      'font-size:12px',
      `color:${c.text}`,
      'box-sizing:border-box',
    ].join(';')
    const fillCell = [
      'display:table-cell',
      'padding:10px 0',
      'text-align:center',
      `background-color:${c.primary}`,
      'font-size:12px',
      `color:${c.textInverse}`,
      'font-weight:500',
      'box-sizing:border-box',
    ].join(';')
    const cellsCSS =
      `display:table;width:100%;table-layout:fixed;border-spacing:6px 0;border-collapse:separate`
    const cells =
      `<span style="${outlineCell}">${escText(like)}</span>` +
      `<span style="${fillCell}">${escText(star)}</span>` +
      `<span style="${outlineCell}">${escText(share)}</span>`
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

// ============================================================
// qr-follow · 二维码订阅卡（左 QR + 右 SUBSCRIBE / 标题 / 说明）
// ============================================================

/**
 * 设计稿 qr-follow：左 60×60 QR + 右三行文字（SUBSCRIBE kicker / 标题 / 说明）。
 * 走 display:table + table-cell 实现"图左文右"两栏——避开 flex 被剥的风险。
 *
 * QR 图：
 *   - 作者提供 attrs.qr=url 时走 <img>
 *   - 缺省时画占位 SVG（与设计稿一致的"角眼 + 散点"方块阵），保证肉眼可识但不带二维码功能
 *
 * body 内容忽略。文字段由 attrs.kicker / info / attrs.desc 三段组成。
 */
export const qrFollowContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const kicker = ctx.attrs.kicker ?? ctx.kickers.qrFollowKicker
    const title = ctx.info.trim() || ctx.kickers.qrFollowTitle
    const desc = ctx.attrs.desc ?? ''
    const qrUrl = ctx.attrs.qr ?? ''
    // wrapper 装饰由 ctx.containers.qrFollow 决定；display:table 排版骨架由
    // renderer 保证（"左 QR 右文字"是本容器的视觉契约）。
    const wrapperCSS =
      `display:table;width:100%;table-layout:auto;border-collapse:separate;` +
      inline(ctx.containers.qrFollow)
    // 左格：QR
    const qrCellCSS = 'display:table-cell;vertical-align:middle;width:60px;padding-right:14px'
    const qrImgCSS = 'display:block;width:60px;height:60px;background-color:#fff'
    // 占位 QR SVG：仿真三角眼 + 数据点
    const qrSvg =
      `<svg viewBox="0 0 60 60" width="60" height="60" style="${qrImgCSS}">` +
      `<g fill="${c.text}">` +
      `<rect x="3" y="3" width="16" height="16"/><rect x="6" y="6" width="10" height="10" fill="#fff"/><rect x="9" y="9" width="4" height="4"/>` +
      `<rect x="41" y="3" width="16" height="16"/><rect x="44" y="6" width="10" height="10" fill="#fff"/><rect x="47" y="9" width="4" height="4"/>` +
      `<rect x="3" y="41" width="16" height="16"/><rect x="6" y="44" width="10" height="10" fill="#fff"/><rect x="9" y="47" width="4" height="4"/>` +
      `<rect x="24" y="24" width="3" height="3"/><rect x="30" y="24" width="3" height="3"/><rect x="36" y="27" width="3" height="3"/>` +
      `<rect x="24" y="30" width="3" height="3"/><rect x="33" y="30" width="3" height="3"/><rect x="27" y="36" width="3" height="3"/>` +
      `<rect x="36" y="36" width="3" height="3"/><rect x="42" y="39" width="3" height="3"/><rect x="24" y="42" width="3" height="3"/>` +
      `<rect x="39" y="45" width="3" height="3"/><rect x="27" y="48" width="3" height="3"/>` +
      `</g></svg>`
    const qrEl = qrUrl
      ? `<img src="${escText(qrUrl)}" alt="QR" style="${qrImgCSS}"/>`
      : qrSvg
    // 右格：三行文字
    const textCellCSS = 'display:table-cell;vertical-align:middle'
    const kickerCSS = [
      'font-family:Menlo,Monaco,monospace',
      'font-size:10px',
      'font-weight:700',
      `color:${c.primary}`,
      'letter-spacing:0.15em',
    ].join(';')
    const titleCSS = [
      'font-size:14px',
      'font-weight:700',
      `color:${c.text}`,
      'margin-top:3px',
      'letter-spacing:-0.01em',
    ].join(';')
    const descCSS = [
      'font-size:11px',
      `color:${c.textMuted}`,
      'margin-top:3px',
    ].join(';')
    const descEl = desc
      ? `<section style="${descCSS}">${escText(desc)}</section>`
      : ''
    return (
      `<section class="container-qr-follow" style="${wrapperCSS}">` +
      `<span style="${qrCellCSS}">${qrEl}</span>` +
      `<span style="${textCellCSS}">` +
      `<section style="${kickerCSS}">${escText(kicker)}</section>` +
      `<section style="${titleCSS}">${escText(title)}</section>` +
      descEl +
      `</span>` +
      `</section>\n`
    )
  },
  close: '',
}
