/**
 * quote-card / highlight 容器
 *
 * quote-card 走 variant registry（classic / magazine-dropcap / column-rule / frame-brackets / ...）；
 * highlight 是简单高亮块，无骨架切换。
 *
 * byline（ctx.info）作为署名，close 时单独渲染一行。样式四级回退：
 *   variant.bylineCSS > 容器默认（居中 textMuted 13px）。前缀同理（默认 "— "）。
 *
 * 节点序：wrapper > [svgSlot] > body > [byline] > [closeSlot] > /wrapper。
 * closeSlot 落在 byline 之后、wrapper 之内，是给"开/闭引号成对"的 variant（典型 classic
 * 的 「」）用的——闭引号必须把 byline 也包进去，才符合"作者落款在引号内"的中文排版直觉。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import { escText } from './_shared/escape'
import { QUOTE_VARIANTS } from '../../variants/registry'
import { resolveVariantWithUv } from './_shared/resolveVariant'

// margin-top 取 2px：主题 elements.p 给 body 末段注入了 margin-bottom:18px,加上 byline
// 自身高度,实际视觉间距已落在 ~20px。再加 10px 会让 byline 与正文脱节。
function defaultBylineCSS(ctx: ContainerRenderContext): string {
  return `text-align:center;color:${ctx.tokens.colors.textMuted};margin-top:2px;font-size:13px`
}

export const quoteCardContainer: ContainerRenderer = {
  open: (ctx) => {
    const { id, result } = resolveVariantWithUv(ctx, 'quote', QUOTE_VARIANTS, 'classic')
    const parts: string[] = []
    parts.push(`<section class="container-quote-card container-quote-card--${id}" style="${result.wrapperCSS}">`)
    if (result.svgSlot) parts.push(result.svgSlot)
    parts.push(`<section class="container-quote-card__body" style="${result.bodyCSS ?? ''}">`)
    return parts.join('\n') + '\n'
  },
  close: (ctx) => {
    const { result } = resolveVariantWithUv(ctx, 'quote', QUOTE_VARIANTS, 'classic')
    const closeSlot = result.closeSlot ?? ''
    const byline = ctx.info.trim()
    if (!byline) return `</section>\n${closeSlot}</section>\n`
    const css = result.bylineCSS ?? defaultBylineCSS(ctx)
    const prefix = result.bylinePrefix ?? '— '
    const sig = `<section class="container-quote-card__byline" style="${css}">${escText(prefix)}${escText(byline)}</section>`
    return `</section>\n${sig}\n${closeSlot}</section>\n`
  },
}

export const highlightContainer: ContainerRenderer = {
  open: () => `<section class="container-highlight">\n`,
  close: '</section>\n',
}
