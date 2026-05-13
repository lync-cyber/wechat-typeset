/**
 * 文末引导类容器：footerCTA / recommend / qrcode
 *
 * - footerCTA：文末关注卡。info 作为主文案；attrs.cta 作为按钮文字（以 span 样式渲染）。
 * - recommend：推荐阅读块。内容为列表项，每项 [标题](链接)；markdown-it 正常渲染。
 * - qrcode：二维码卡。info 作为说明文字；内容通常是一张图（![](url)）。
 *
 * 所有色值从 ctx.tokens.colors 读取，确保 4 套主题下的按钮/说明色都跟着主色走。
 */

import type { ContainerRenderer } from './types'
import { escAttr, escText } from './types'

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

export const footerCTAContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '关注我'
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
      `<section class="container-footer-cta" style="text-align:center">\n` +
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
  close: (ctx) => {
    const seal = ctx.assets.sealMark
      ? `<section class="container-footer-cta__seal" style="text-align:center;margin-top:18px;line-height:0">${ctx.assets.sealMark}</section>\n`
      : ''
    return seal + '</section>\n'
  },
}

export const recommendContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '推荐阅读'
    return (
      `<section class="container-recommend">\n` +
      `<section class="container-recommend__title" style="font-weight:700;margin-bottom:10px">${escText(title)}</section>\n`
    )
  },
  close: '</section>\n',
}

export const qrcodeContainer: ContainerRenderer = {
  open: (ctx) => {
    const caption = ctx.info.trim()
    const cap = caption
      ? `<section class="container-qrcode__caption" style="text-align:center;color:${ctx.tokens.colors.textMuted};margin-bottom:8px">${escText(caption)}</section>`
      : ''
    return `<section class="container-qrcode" style="text-align:center">\n${cap}\n`
  },
  close: '</section>\n',
}
