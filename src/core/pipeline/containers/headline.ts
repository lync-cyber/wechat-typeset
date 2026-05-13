/**
 * 头部/节点叙事容器：intro / cover / author / sectionTitle
 *
 * - intro：文章开头"引子"卡；承载背景+立意。外框 section，内部自由排版。
 * - cover：封面卡，通常内含一张图 + 一行描述。不做 aspect-ratio 强制。
 * - author：作者栏，placeholder 版本。info 作为作者名。
 * - sectionTitle：小节大标题 —— 不靠 Markdown ## 表达的"强力分章线"，
 *   由 theme.assets.sectionCorner 装饰（Step 5）。此处先出标题行。
 */

import type { SectionTitleVariantId } from '../../themes/types'
import type { ContainerRenderer, ContainerRenderContext } from './types'
import { escText } from './types'
import { SECTION_TITLE_VARIANTS } from '../../variants/registry'

export const introContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim()
    const head = title
      ? `<section class="container-intro__title" style="font-weight:700;margin-bottom:10px">${escText(title)}</section>`
      : ''
    return `<section class="container-intro">\n${head}`
  },
  close: '</section>\n',
}

/**
 * 若主题提供 issueStamp 资产 + 容器声明了 issue/date/kind 任一 attr，
 * 返回该主题的期号戳 SVG；否则空串。用于 cover / author / footerCTA 三个容器共享。
 */
function resolveIssueStamp(ctx: ContainerRenderContext): string {
  const stamp = ctx.assets.issueStamp
  if (!stamp) return ''
  const issue = ctx.attrs.issue ?? ''
  const date = ctx.attrs.date ?? ''
  const kind = ctx.attrs.kind ?? ''
  if (!issue && !date && !kind) return ''
  return stamp(issue, date, kind)
}

export const coverContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim()
    const head = title
      ? `<section class="container-cover__title" style="text-align:center;font-weight:700;font-size:18px;margin-bottom:10px">${escText(title)}</section>`
      : ''
    const stamp = resolveIssueStamp(ctx)
    const stampEl = stamp
      ? `<section class="container-cover__stamp" style="margin-top:12px">${stamp}</section>`
      : ''
    return `<section class="container-cover">\n${head}${stampEl}`
  },
  close: '</section>\n',
}

export const authorContainer: ContainerRenderer = {
  open: (ctx) => {
    const name = ctx.info.trim() || '作者'
    const role = ctx.attrs.role
      ? `<span style="color:${ctx.tokens.colors.textMuted};margin-left:8px">${escText(ctx.attrs.role)}</span>`
      : ''
    const stamp = resolveIssueStamp(ctx)
    const stampEl = stamp
      ? `<span class="container-author__stamp" style="margin-left:10px;vertical-align:middle">${stamp}</span>`
      : ''
    return (
      `<section class="container-author">\n` +
      `<section class="container-author__header" style="margin-bottom:8px">` +
      `<strong>${escText(name)}</strong>${role}${stampEl}` +
      `</section>\n`
    )
  },
  close: '</section>\n',
}

function resolveSectionTitleVariantId(ctx: ContainerRenderContext): SectionTitleVariantId {
  const override = ctx.attrs.variant
  if (override && override in SECTION_TITLE_VARIANTS) {
    return override as SectionTitleVariantId
  }
  return ctx.variants.sectionTitle ?? 'bordered'
}

export const sectionTitleContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim()
    const id = resolveSectionTitleVariantId(ctx)
    const result = SECTION_TITLE_VARIANTS[id].render(ctx)
    const parts: string[] = []
    parts.push(`<section class="container-section-title container-section-title--${id}" style="${result.wrapperCSS}">`)
    if (title) {
      const corner = result.svgSlot ?? ''
      const ts = result.titleCSS ?? 'font-weight:700;font-size:20px'
      parts.push(`<section class="container-section-title__label" style="${ts}">${corner}${escText(title)}</section>`)
    }
    return parts.join('\n') + '\n'
  },
  close: '</section>\n',
}
