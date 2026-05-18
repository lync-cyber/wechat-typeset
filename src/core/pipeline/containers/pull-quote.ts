/**
 * pull-quote 容器：正文中段把"金句"放大重申。
 *
 * 与 quote-card（外部话语 + 多变体引号装饰）/ highlight（bgMuted 强调段）正交：
 *   - body：引文本体（markdown-it 渲染为 `<p>`；样式由 variant.quoteCSS 通过
 *     `.container-pull-quote--{id} > .__body > p` 选择器盖过 theme.elements.p）
 *   - info：可选 byline（出处 / 落款），close 时单独渲染在 body 末尾
 *
 * 节点序：[style 块] > wrapper > [svgSlot] > body wrapper > [body content] > [byline] > /body wrapper > /wrapper。
 *
 * 为什么 byline 放进 body section 内（而非 wrapper 内、body 之外）：
 *   margin-pull 等 variant 把 wrapper 设为 display:table，svgSlot 与 body section
 *   是两个 table-cell。byline 若作为 wrapper 直接子节点会变成"第三列"破坏双栏布局；
 *   放进 body cell 内则自然在引文下方堆叠。
 *
 * className 用 uv.id（不走 resolveVariantWithUv 的 base id 选择）：
 *   pull-quote 用户态变体的命名稳定性优先于"形态身份锚点"——作者保存的金句样式
 *   通常带署名 / 多颜色 token 微调，回看时按 uv.id 一眼定位比 base id 直观。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import type { VariantRenderResult } from '../../variants/_core'
import { PULL_QUOTE_VARIANTS } from '../../variants/registry'
import { resolveVariantId } from './_shared/resolveVariant'
import { applyUserVariant, isAppliableUserVariant } from './_shared/userVariantApply'
import { escText } from './_shared/escape'

function defaultQuoteCSS(ctx: ContainerRenderContext): string {
  return [
    `color:${ctx.tokens.colors.text}`,
    'font-size:18px',
    'font-weight:600',
    'line-height:1.7',
    'letter-spacing:0.2px',
    'margin-top:0',
    'margin-bottom:0',
  ].join(';')
}

function defaultBylineCSS(ctx: ContainerRenderContext): string {
  return [
    `color:${ctx.tokens.colors.textMuted}`,
    'font-size:13px',
    'line-height:1.6',
    'margin-top:10px',
    'text-align:left',
  ].join(';')
}

function resolve(ctx: ContainerRenderContext): { id: string; result: VariantRenderResult } {
  const table = PULL_QUOTE_VARIANTS as Record<string, (typeof PULL_QUOTE_VARIANTS)[keyof typeof PULL_QUOTE_VARIANTS]>
  const raw = ctx.attrs.variant
  if (raw) {
    const normalized = raw.toLowerCase().trim()
    if (normalized.startsWith('uv_')) {
      const uv = ctx.userVariants?.get(normalized)
      if (uv && isAppliableUserVariant(uv) && uv.base.kind === 'pullQuote') {
        const baseEntry = table[uv.base.variantId]
        if (baseEntry?.render) {
          return { id: uv.id, result: applyUserVariant(uv, baseEntry.render(ctx)) }
        }
      }
    }
  }
  const id = resolveVariantId(ctx, 'pullQuote', table, 'giant-mark')
  return { id, result: table[id].render(ctx) }
}

export const pullQuoteContainer: ContainerRenderer = {
  open: (ctx) => {
    const { id, result } = resolve(ctx)
    const quoteCSS = result.quoteCSS ?? defaultQuoteCSS(ctx)
    const styleTag =
      `<style>.container-pull-quote--${id} > .container-pull-quote__body > p {${quoteCSS}}</style>`
    const parts: string[] = [
      styleTag,
      `<section class="container-pull-quote container-pull-quote--${id}" style="${result.wrapperCSS}">`,
    ]
    if (result.svgSlot) parts.push(result.svgSlot)
    parts.push(`<section class="container-pull-quote__body" style="${result.bodyCSS ?? ''}">`)
    return parts.join('\n') + '\n'
  },
  close: (ctx) => {
    const { result } = resolve(ctx)
    const byline = ctx.info.trim()
    if (!byline) return `</section>\n</section>\n`
    const bylineCSS = result.bylineCSS ?? defaultBylineCSS(ctx)
    const prefix = result.bylinePrefix ?? '— '
    const sig =
      `<section class="container-pull-quote__byline" style="${bylineCSS}">${escText(prefix)}${escText(byline)}</section>`
    return `${sig}\n</section>\n</section>\n`
  },
}
