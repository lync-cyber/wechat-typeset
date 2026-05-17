/**
 * 文末引导类容器：footerCTA / recommend / qrcode
 *
 * - footerCTA：文末关注卡。info 作为主文案；attrs.cta 作为按钮文字（以 span 样式渲染）。
 * - recommend：推荐阅读块（variantKind=recommend，card-list / academic-refs）。
 * - qrcode：二维码卡（variantKind=qrcode，bare 默认 / follow-card 刊物订阅卡）。
 *
 * 所有色值从 ctx.tokens.colors 读取，确保 4 套主题下的按钮/说明色都跟着主色走。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import { escAttr, escText } from './_shared/escape'
import { encodeQrSvg } from '../qr/encodeQrSvg'
import { RECOMMEND_VARIANTS, QRCODE_VARIANTS, FOOTER_CTA_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'
import { resolveVariantId } from './_shared/resolveVariant'
import type { QrcodeVariantId, FooterCTAVariantId } from '../../themes/types'

// 期号戳共享解析（与 headline.ts resolveIssueStamp 同契约；复制避免跨文件依赖升级）
function resolveIssueStampForFooter(
  ctx: Parameters<ContainerRenderer['open']>[0],
): string {
  const stamp = ctx.assets.issueStamp
  if (!stamp) return ''
  const issue = ctx.attrs.issue ?? ''
  const date = ctx.attrs.date ?? ''
  const kind = ctx.attrs.kind ?? ''
  if (!issue && !date && !kind) return ''
  return stamp(issue, date, kind)
}

/**
 * footer-cta · variant 分派：
 *   - button-led（默认）= 居中标题 + issueStamp + 主色胶囊按钮 + 可选 sealMark 收束印
 *   - triptych-actions = display:table 三栏 CTA（赞同 / 收藏 / 转发），info 触发顶部 header bar
 *
 * 主题 voice 由 ctx.containers.footerCTA 注入；variant 决定布局骨架。
 * 设计纪律：layout 走 display:table 或 inline-flex（按钮 tap target ≥ 44×44 iOS HIG）。
 */
function renderTriptychActions(ctx: ContainerRenderContext): string {
  const c = ctx.tokens.colors
  const like = ctx.attrs.like ?? '♡ 赞同'
  const star = ctx.attrs.star ?? '★ 收藏'
  const share = ctx.attrs.share ?? '↗ 转发'
  const kicker = ctx.info.trim()
  const wrapperLayoutCSS = kicker
    ? ''
    : `display:table;width:100%;table-layout:fixed;border-collapse:collapse;`
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
  const cellsCSS = `display:table;width:100%;table-layout:fixed;border-collapse:collapse`
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
      `<section class="container-footer-cta container-footer-cta--triptych-actions">` +
      `<section class="container-footer-cta__kicker" style="${headerCSS}">${escText(kicker)}</section>` +
      `<section class="container-footer-cta__cells" style="${cellsCSS}">${cells}</section>` +
      `</section>\n`
    )
  }
  return (
    `<section class="container-footer-cta container-footer-cta--triptych-actions" style="${wrapperLayoutCSS}">${cells}</section>\n`
  )
}

export const footerCTAContainer: ContainerRenderer = {
  open: (ctx) => {
    const id = resolveVariantId<FooterCTAVariantId>(
      ctx,
      'footerCTA',
      FOOTER_CTA_VARIANTS,
      'button-led',
    )
    if (id === 'triptych-actions') {
      return renderTriptychActions(ctx)
    }
    const title = ctx.info.trim() || ctx.kickers.footerCTATitle
    const cta = ctx.attrs.cta ? escText(ctx.attrs.cta) : ''
    const href = ctx.attrs.href ?? ''
    // 按钮胶囊样式（span / a 共用）；color + bg 走主题 primary。
    // 有 href 时渲染为 <a>，打 data-wx-footer-cta 标记让 outlinkDegrade 绕过——
    // footer-cta 是作者核心转化入口，不参与 keep/tail-list/drop 三策略。
    // inline-flex + min-height:44px 保证移动端 tap target 达到 iOS HIG 最低建议（44×44）；
    // 短 cta 文字（2 字）时不至于高度缩到 ~28px 难点。桌面端视觉等价（文字居中）。
    const pill = `display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:6px 18px;box-sizing:border-box;border-radius:${ctx.tokens.radius.lg}px;background-color:${ctx.tokens.colors.primary};color:${ctx.tokens.colors.textInverse};text-decoration:none`
    const ctaInner = cta
      ? href
        ? `<a href="${escAttr(href)}" data-wx-footer-cta="" style="${pill}">${cta}</a>`
        : `<span style="${pill}">${cta}</span>`
      : ''
    const ctaEl = ctaInner
      ? `<section class="container-footer-cta__cta" style="text-align:center;margin-top:10px">${ctaInner}</section>`
      : ''
    const stamp = resolveIssueStampForFooter(ctx)
    const stampEl = stamp
      ? `<section class="container-footer-cta__stamp" style="text-align:center;margin-bottom:10px">${stamp}</section>`
      : ''
    return (
      `<section class="container-footer-cta container-footer-cta--button-led" style="text-align:center">\n` +
      stampEl +
      `<section class="container-footer-cta__title" style="font-weight:700;font-size:16px;margin-bottom:8px">${escText(title)}</section>\n` +
      ctaEl +
      `\n`
    )
  },
  // sealMark 可选注入（literary-humanism 等"稀缺色"主题专用）。
  // 主题不提供时保持原行为；提供时在容器末尾追加一个**居中**的收束印——
  // 朱砂作为文章 closure 的视觉焦点，居中比右下更稳：移动端窄屏右对齐易被
  // 边距裁切；居中又恰好对齐 footer 内的标题/按钮居中节律。
  // triptych-actions variant 已在 open 闭合自身 section，close 返回空串。
  close: (ctx) => {
    const id = resolveVariantId<FooterCTAVariantId>(
      ctx,
      'footerCTA',
      FOOTER_CTA_VARIANTS,
      'button-led',
    )
    if (id === 'triptych-actions') return ''
    const seal = ctx.assets.sealMark
      ? `<section class="container-footer-cta__seal" style="text-align:center;margin-top:18px;line-height:0">${ctx.assets.sealMark}</section>\n`
      : ''
    return seal + '</section>\n'
  },
}

/**
 * recommend · 两态 variant 容器：
 *   - card-list（默认）= 面向读者的"延伸阅读"，粗体大标题 + bullet 链接
 *   - academic-refs    = 面向论证的"参考引用"，uppercase 小字 kicker + textMuted 列表
 *
 * info 优先（作者写 `::: recommend 自定义标题`），缺省走 ctx.kickers.recommend。
 * variant 切骨架；主题级 voice（ctx.containers.recommend）仍由 themeCSS 注入。
 */
export const recommendContainer: ContainerRenderer = makeVariantContainer({
  name: 'recommend',
  themeSlot: 'recommend',
  table: RECOMMEND_VARIANTS,
  fallbackId: 'card-list',
  title: {
    defaultText: (ctx) => ctx.kickers.recommend,
    defaultCSS: 'font-weight:700;margin-bottom:10px',
  },
})

/**
 * QR 码内联渲染：attrs.text 提供时直接生成 SVG，避免外链。
 *
 * fg/bg 取自主题 ctx.tokens.colors —— text 作前景，bg 作背景，主题切换时码本身
 * 也跟着换色（暗底主题给出"反相 QR"，符合视觉系统的色彩律）。size 默认 160px。
 * 缺省 ecc=M（约 15% 容错；中间常常会叠 logo 时再调到 H）。
 *
 * 不带 text 时退化为原"caption + 用户自带图片"形态，保留向后兼容。
 */
function renderInlineQr(
  ctx: Parameters<ContainerRenderer['open']>[0],
): string {
  const text = ctx.attrs.text
  if (!text) return ''
  const ecc = (ctx.attrs.ecc ?? 'M').toUpperCase() as 'L' | 'M' | 'Q' | 'H'
  const allowedEcc: ReadonlyArray<string> = ['L', 'M', 'Q', 'H']
  const eccSafe = allowedEcc.includes(ecc) ? ecc : 'M'
  const sizePx = Number(ctx.attrs.size ?? '') || 160
  let svg: string
  try {
    svg = encodeQrSvg(text, {
      ecc: eccSafe,
      fg: ctx.tokens.colors.text,
      bg: ctx.tokens.colors.bg,
      size: sizePx,
    })
  } catch (err) {
    // text 太长或编码失败 → 退化为可读的提示，不让整篇渲染崩
    return `<section class="container-qrcode__error" style="color:${ctx.tokens.colors.textMuted};font-size:12px">[QR 编码失败：${escText(String(err))}]</section>\n`
  }
  return `<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${svg}</section>\n`
}

/**
 * follow-card variant 的 left QR + right kicker/title/desc layout。
 * 走 display:table + table-cell，避开 flex 被微信粘贴剥。占位 QR：作者提供 attrs.text
 * 时复用 renderInlineQr 内置编码；attrs.qr=URL 时走 <img>；都没有则画占位 SVG。
 */
function renderFollowCardQr(ctx: ContainerRenderContext): string {
  const c = ctx.tokens.colors
  const qrUrl = ctx.attrs.qr ?? ''
  const qrImgCSS = 'display:block;width:64px;height:64px'
  if (ctx.attrs.text) {
    return renderInlineQr(ctx).replace(/margin-bottom:8px/, qrImgCSS)
  }
  if (qrUrl) {
    return `<img src="${escAttr(qrUrl)}" alt="QR" style="${qrImgCSS}"/>`
  }
  // 占位 QR SVG：仿真三角眼 + 数据点（不承诺扫码功能，仅占位）
  return (
    `<svg viewBox="0 0 60 60" width="64" height="64" style="${qrImgCSS}">` +
    `<g fill="${c.text}">` +
    `<rect x="3" y="3" width="16" height="16"/><rect x="6" y="6" width="10" height="10" fill="#fff"/><rect x="9" y="9" width="4" height="4"/>` +
    `<rect x="41" y="3" width="16" height="16"/><rect x="44" y="6" width="10" height="10" fill="#fff"/><rect x="47" y="9" width="4" height="4"/>` +
    `<rect x="3" y="41" width="16" height="16"/><rect x="6" y="44" width="10" height="10" fill="#fff"/><rect x="9" y="47" width="4" height="4"/>` +
    `<rect x="24" y="24" width="3" height="3"/><rect x="30" y="24" width="3" height="3"/><rect x="36" y="27" width="3" height="3"/>` +
    `<rect x="24" y="30" width="3" height="3"/><rect x="33" y="30" width="3" height="3"/><rect x="27" y="36" width="3" height="3"/>` +
    `<rect x="36" y="36" width="3" height="3"/><rect x="42" y="39" width="3" height="3"/><rect x="24" y="42" width="3" height="3"/>` +
    `<rect x="39" y="45" width="3" height="3"/><rect x="27" y="48" width="3" height="3"/>` +
    `</g></svg>`
  )
}

/**
 * qrcode 容器：variant 分派 bare（默认，居中 QR + caption）与 follow-card
 * （刊物订阅卡：左 QR + 右 kicker/title/desc 三行）。
 * 主题 voice 由 ctx.containers.qrcode 注入 wrapper 装饰（边框 / 底色 / 边距）。
 * 设计纪律：layout 走 display:table（避开 flex 被微信剥）；font-family 仅在 renderer
 * inline 出现（主题层 elements/containers CSS 禁 font-family）。
 */
export const qrcodeContainer: ContainerRenderer = {
  open: (ctx) => {
    const id = resolveVariantId<QrcodeVariantId>(ctx, 'qrcode', QRCODE_VARIANTS, 'bare')
    if (id === 'follow-card') {
      const c = ctx.tokens.colors
      const kicker = ctx.attrs.kicker ?? ctx.kickers.qrFollowKicker
      const title = ctx.info.trim() || ctx.kickers.qrFollowTitle
      const desc = ctx.attrs.desc ?? ''
      const wrapperCSS = `display:table;width:100%;table-layout:auto;border-collapse:collapse`
      const qrCellCSS = [
        'display:table-cell',
        'vertical-align:middle',
        'padding:12px',
        `border-right:1px solid ${c.text}`,
        `background-color:${c.bg}`,
      ].join(';')
      const textCellCSS = 'display:table-cell;vertical-align:middle;padding:10px 14px'
      const kickerCSS = [
        'font-family:Menlo,Monaco,monospace',
        'font-size:9px',
        'font-weight:700',
        `color:${c.primary}`,
        'letter-spacing:0.2em',
      ].join(';')
      const titleCSS = [
        'font-size:14px',
        'font-weight:700',
        `color:${c.text}`,
        'margin-top:4px',
        'letter-spacing:-0.01em',
      ].join(';')
      const descCSS = [
        'font-size:10px',
        `color:${c.textMuted}`,
        'margin-top:4px',
        'line-height:1.5',
      ].join(';')
      const descEl = desc
        ? `<section style="${descCSS}">${escText(desc)}</section>`
        : ''
      const qrEl = renderFollowCardQr(ctx)
      return (
        `<section class="container-qrcode container-qrcode--follow-card" style="${wrapperCSS}">` +
        `<span style="${qrCellCSS}">${qrEl}</span>` +
        `<span style="${textCellCSS}">` +
        `<section style="${kickerCSS}">${escText(kicker)}</section>` +
        `<section style="${titleCSS}">${escText(title)}</section>` +
        descEl +
        `</span>` +
        `</section>\n`
      )
    }
    // bare variant：居中 QR + 居中 caption（默认形态）
    const caption = ctx.info.trim()
    const cap = caption
      ? `<section class="container-qrcode__caption" style="text-align:center;color:${ctx.tokens.colors.textMuted};margin-bottom:8px">${escText(caption)}</section>`
      : ''
    const qr = renderInlineQr(ctx)
    return `<section class="container-qrcode container-qrcode--bare" style="text-align:center">\n${qr}${cap}\n`
  },
  close: (ctx) => {
    // follow-card 已经在 open 里自闭合；bare 走标准 close
    const id = resolveVariantId<QrcodeVariantId>(ctx, 'qrcode', QRCODE_VARIANTS, 'bare')
    return id === 'follow-card' ? '' : '</section>\n'
  },
}
