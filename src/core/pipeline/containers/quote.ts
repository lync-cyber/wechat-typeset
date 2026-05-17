/**
 * quote-card / highlight 容器
 *
 * quote-card 走 variant registry（classic / magazine-dropcap / column-rule / frame-brackets / ...）；
 * highlight 是简单高亮块，无骨架切换。
 *
 * byline（ctx.info）作为署名，close 时单独渲染一行。样式四级回退：
 *   variant.bylineCSS > 容器默认（居中 textMuted 13px）。前缀同理（默认 "— "）。
 * close 二次调 render 与 makeVariantContainer 同模式（render 是纯函数,O(1) 无副作用）。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import { escText } from './_shared/escape'
import { QUOTE_VARIANTS } from '../../variants/registry'
import { resolveVariantWithUv } from './_shared/resolveVariant'

function defaultBylineCSS(ctx: ContainerRenderContext): string {
  return `text-align:center;color:${ctx.tokens.colors.textMuted};margin-top:10px;font-size:13px`
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
    if (!byline) return `${closeSlot}</section>\n</section>\n`
    const css = result.bylineCSS ?? defaultBylineCSS(ctx)
    const prefix = result.bylinePrefix ?? '— '
    const sig = `<section class="container-quote-card__byline" style="${css}">${escText(prefix)}${escText(byline)}</section>`
    return `${closeSlot}</section>\n${sig}\n</section>\n`
  },
}

export const highlightContainer: ContainerRenderer = {
  open: () => `<section class="container-highlight">\n`,
  close: '</section>\n',
}
