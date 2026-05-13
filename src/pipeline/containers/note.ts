/**
 * note 容器（第五态补注 · R8 独立变体类）
 *
 * 走 NOTE_VARIANTS 分派：minimal-callout / box-callout / side-bar。
 * 解析优先级（与 admonition/quote/compare 同模式）：
 *   attrs.variant > ctx.variants.note > 'minimal-callout' 兜底
 *
 * 与 admonition 4 态的关键差异：
 *   - 色彩走 textMuted / border，不读 tokens.colors.status.*（不情绪化）
 *   - 可选 noteIcon（主题 assets.noteIcon 提供则注入；否则跳过）
 *   - titleCSS 由 variant 提供；与 admonition 同 4 字段契约
 *
 * 主题 voice 接入：先读 ctx.containers.note，主题没声明（或仅声明 margin）时
 * 走 variant 的 wrapperCSS——variants 已是 token 驱动的中性兜底，不再需要
 * renderer 内 substring 检测。
 */

import type { NoteVariantId, ThemeAssets } from '../../themes/types'
import type { ContainerRenderer, ContainerRenderContext } from './types'
import { escText } from './types'
import { NOTE_VARIANTS } from '../../variants/registry'

function resolveVariantId(ctx: ContainerRenderContext): NoteVariantId {
  const override = ctx.attrs.variant
  if (override && override in NOTE_VARIANTS) {
    return override as NoteVariantId
  }
  return ctx.variants.note ?? 'minimal-callout'
}

export const noteContainer: ContainerRenderer = {
  open: (ctx) => {
    const id = resolveVariantId(ctx)
    const result = NOTE_VARIANTS[id].render(ctx)
    const title = ctx.info.trim() || '补注'
    const icon = (ctx.assets.noteIcon as ThemeAssets['noteIcon']) ?? ''
    const parts: string[] = []
    parts.push(
      `<section class="container-note container-note--${id}" style="${result.wrapperCSS}">`,
    )
    if (result.svgSlot) parts.push(result.svgSlot)
    if (result.titleCSS !== '') {
      const titleStyle = result.titleCSS ?? 'font-weight:600;font-size:13px'
      parts.push(
        `<section class="container-note__title" style="${titleStyle}">${icon}${escText(title)}</section>`,
      )
    }
    if (result.bodyCSS) {
      parts.push(`<section class="container-note__body" style="${result.bodyCSS}">`)
    }
    return parts.join('\n') + '\n'
  },
  close: (ctx) => {
    const id = resolveVariantId(ctx)
    const result = NOTE_VARIANTS[id].render(ctx)
    return (result.bodyCSS ? '</section>\n' : '') + '</section>\n'
  },
}
