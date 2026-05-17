/**
 * gallery + image-item · 多图组合（4 个空间布局 variant）
 *
 * 弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。
 *
 * 栈契约（同 KPI_DASHBOARD_STACK）：
 *   gallery.open 推 { variantId, itemCount } 入栈；image-item.open 查栈顶 variantId
 *   分派到 4 个 cell 渲染器；image-item.close 为空（cell 完整 HTML 在 open 一次性吐出）。
 *
 * 为什么 image-item.close 为空：duo / triptych 是 table-cell 的兄弟节点，
 *   nine-grid / ribbon-strip 是 inline-block 的兄弟节点——两种形态都没有"半开 cell"概念。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import { GALLERY_VARIANTS } from '../../variants/registry'
import { resolveVariantId } from './_shared/resolveVariant'
import { escAttr, escText } from './_shared/escape'
import { inlineCss as inline } from './_shared/cssInline'

interface GalleryStackEntry {
  variantId: string
  itemCount: number
}
const GALLERY_STACK: GalleryStackEntry[] = []

export const galleryContainer: ContainerRenderer = {
  open: (ctx) => {
    const variantId = resolveVariantId(ctx, 'gallery', GALLERY_VARIANTS, 'duo')
    GALLERY_STACK.push({ variantId, itemCount: 0 })
    const entry = GALLERY_VARIANTS[variantId] ?? GALLERY_VARIANTS['duo']
    const result = entry.render(ctx)
    const themeWrap = inline(ctx.containers.gallery)
    const wrapperCSS = [themeWrap, result.wrapperCSS].filter(Boolean).join(';')
    const gridCSS =
      result.bodyCSS ?? 'display:table;width:100%;table-layout:fixed;border-spacing:8px 0'

    const title = ctx.info.trim()
    const titleCSS = [
      'font-weight:700',
      `color:${ctx.tokens.colors.text}`,
      'font-size:13px',
      'letter-spacing:0.5px',
      'margin-bottom:8px',
    ].join(';')
    const titleEl = title
      ? `<section class="container-gallery__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''

    return (
      `<section class="container-gallery container-gallery--${variantId}" style="${wrapperCSS}">\n` +
      titleEl +
      `<section class="container-gallery__grid" style="${gridCSS}">\n`
    )
  },
  close: () => {
    GALLERY_STACK.pop()
    return `</section>\n</section>\n`
  },
}

export const imageItemContainer: ContainerRenderer = {
  open: (ctx) => {
    const top = GALLERY_STACK[GALLERY_STACK.length - 1]
    if (!top) return ''
    const src = ctx.attrs.src ?? ''
    const alt = ctx.attrs.alt ?? ctx.info.trim()
    const caption = ctx.info.trim()
    top.itemCount += 1
    switch (top.variantId) {
      case 'triptych':
        return renderTriptychItem(ctx, src, alt, caption)
      case 'nine-grid':
        return renderNineGridItem(ctx, src, alt, caption)
      case 'ribbon-strip':
        return renderRibbonStripItem(ctx, src, alt, caption)
      case 'duo':
      default:
        return renderDuoItem(ctx, src, alt, caption)
    }
  },
  close: '',
}

// ─────────────────────────────────────────────────────────────
// cell 渲染器（按 variantId 分派）
// ─────────────────────────────────────────────────────────────

function renderDuoItem(
  ctx: ContainerRenderContext,
  src: string,
  alt: string,
  caption: string,
): string {
  const cellCSS = 'display:table-cell;width:50%;vertical-align:top'
  const imgCSS = 'max-width:100%;display:block;border-radius:4px;margin:0 auto'
  const capCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`
  return cellHtml('duo', cellCSS, src, alt, caption, imgCSS, capCSS)
}

function renderTriptychItem(
  ctx: ContainerRenderContext,
  src: string,
  alt: string,
  caption: string,
): string {
  const cellCSS = 'display:table-cell;width:33.33%;vertical-align:top'
  // 强制等高 140px + cover：与 duo 的关键差异
  const imgCSS = 'width:100%;height:140px;object-fit:cover;display:block;border-radius:4px'
  const capCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`
  return cellHtml('triptych', cellCSS, src, alt, caption, imgCSS, capCSS)
}

function renderNineGridItem(
  ctx: ContainerRenderContext,
  src: string,
  alt: string,
  caption: string,
): string {
  // inline-block 32% + margin 拼出 3 列；font-size:0 在 grid 父元素吃掉 inline 空白。
  const cellCSS =
    'display:inline-block;width:32%;margin-right:1%;margin-bottom:1%;vertical-align:top'
  // aspect-ratio:1 强制 1:1：与 duo / triptych 的关键差异
  const imgCSS = 'width:100%;aspect-ratio:1;object-fit:cover;display:block;border-radius:2px'
  const capCSS = `font-size:9px;color:${ctx.tokens.colors.textMuted};text-align:center;margin-top:2px;line-height:1.3`
  return cellHtml('nine-grid', cellCSS, src, alt, caption, imgCSS, capCSS)
}

function renderRibbonStripItem(
  ctx: ContainerRenderContext,
  src: string,
  alt: string,
  caption: string,
): string {
  // inline-block 64% 大尺寸 + nowrap 父级保证横滚不换行；
  // white-space:normal 让 caption 文字内部能正常排版。
  const cellCSS =
    'display:inline-block;width:64%;margin-right:8px;vertical-align:top;white-space:normal'
  const imgCSS = 'max-width:100%;height:180px;object-fit:cover;display:block;border-radius:4px'
  const capCSS = `font-size:12px;color:${ctx.tokens.colors.textMuted};text-align:left;margin-top:6px;line-height:1.5`
  return cellHtml('ribbon-strip', cellCSS, src, alt, caption, imgCSS, capCSS)
}

function cellHtml(
  variantId: string,
  cellCSS: string,
  src: string,
  alt: string,
  caption: string,
  imgCSS: string,
  capCSS: string,
): string {
  const imgEl = src
    ? `<img src="${escAttr(src)}" alt="${escAttr(alt)}" style="${imgCSS}" />`
    : ''
  const capEl = caption ? `<section style="${capCSS}">${escText(caption)}</section>` : ''
  return `<section class="container-image-item container-image-item--${variantId}" style="${cellCSS}">${imgEl}${capEl}</section>\n`
}
