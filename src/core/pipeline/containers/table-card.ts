/**
 * table-card / table-row · 结构化表格容器
 *
 * 弥补 markdown 原生 table 在公众号"字号小 / 列宽不可控"的缺陷。外层 4 冒号 table-card
 * 是骨架外壳，内嵌的 table-row 通过 attrs.cells（管道分隔）声明本行内容、body 被忽略。
 *
 * variant 在 parent 上，child 渲染要查 parent 的 variantId：模仿 KPI_DASHBOARD_STACK
 * 模式——tableCardContainer.open 把 variantId 推栈，tableRowContainer 查栈顶分派到 4 个
 * renderXxxRow。row 级 CSS（cell border / bg / padding）都在本文件按 variantId 分派，
 * variant 文件只产 wrapperCSS。
 *
 * cells 解析：管道 `|` 分隔，trim 后入数组。price-tier 额外约定单元格首字符 `*` 标记
 * 推荐列——首行（header）记下列号，后续每行同列顶条着 accent 色。
 *
 * markdown-it-container 模式：tableRowContainer.open 一次性产出完整 row HTML（含 cells），
 * close=''。这样 body 被吞、attrs 全权决定渲染——同 kpi-item / timeline-item 模式。
 */

import type { TableCardVariantId } from '../../themes/types'
import type { ContainerRenderer, ContainerRenderContext } from './types'
import { TABLE_CARD_VARIANTS } from '../../variants/registry'
import { resolveVariantId } from './_shared/resolveVariant'
import { escText } from './_shared/escape'
import { inlineCss as inline } from './_shared/cssInline'
import { devWarn } from './_shared/devWarn'

// ─────────────────────────────────────────────────────────────
// 栈：父容器 open 推入、子容器查栈顶、父容器 close pop
// ─────────────────────────────────────────────────────────────

interface TableCardStackEntry {
  variantId: TableCardVariantId
  rowCount: number
  columnsCount: number
  /** price-tier 推荐列索引集（cell 文本以 `*` 开头），首行记录、后续行复用 */
  highlightCols: Set<number>
  /** 已渲染的 body 行数（price-tier 用：第 1 条 body 行加粗放大作"价格主数字"） */
  bodyRowsRendered: number
}

const TABLE_CARD_STACK: TableCardStackEntry[] = []

function parseCells(raw: string | undefined): string[] {
  if (!raw) return []
  return raw.split('|').map((s) => s.trim())
}

// ─────────────────────────────────────────────────────────────
// table-card · 外层容器
// ─────────────────────────────────────────────────────────────

export const tableCardContainer: ContainerRenderer = {
  open: (ctx) => {
    const variantId = resolveVariantId<TableCardVariantId>(
      ctx,
      'tableCard',
      TABLE_CARD_VARIANTS,
      'rule-grid',
    )
    TABLE_CARD_STACK.push({
      variantId,
      rowCount: 0,
      columnsCount: 0,
      highlightCols: new Set(),
      bodyRowsRendered: 0,
    })

    const themeCSS = inline(ctx.containers.tableCard)
    const variantResult = TABLE_CARD_VARIANTS[variantId].render(ctx)
    const wrapperCSS = [themeCSS, variantResult.wrapperCSS].filter(Boolean).join(';')

    const title = ctx.info.trim()
    const c = ctx.tokens.colors
    const titleCSS = [
      'font-weight:700',
      'font-size:13px',
      `color:${c.text}`,
      'letter-spacing:0.5px',
      'margin-bottom:8px',
    ].join(';')
    const titleEl = title
      ? `<section class="container-table-card__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''

    // price-tier 用 border-spacing 撑出列间隙；其余 variant collapse
    const gridSpacing = variantId === 'price-tier' ? '3px 0' : '0'
    const gridCSS = [
      'display:table',
      'width:100%',
      'table-layout:fixed',
      'border-collapse:separate',
      `border-spacing:${gridSpacing}`,
    ].join(';')

    return (
      `<section class="container-table-card container-table-card--${variantId}" style="${wrapperCSS}">\n` +
      titleEl +
      `<section class="container-table-card__grid" style="${gridCSS}">\n`
    )
  },
  close: () => {
    TABLE_CARD_STACK.pop()
    return `</section>\n</section>\n`
  },
}

// ─────────────────────────────────────────────────────────────
// table-row · 子容器：按 parent 的 variantId 分派
// ─────────────────────────────────────────────────────────────

export const tableRowContainer: ContainerRenderer = {
  open: (ctx) => {
    const top = TABLE_CARD_STACK[TABLE_CARD_STACK.length - 1]
    if (!top) return ''
    const isHeader = ctx.attrs.header === 'true'
    const cells = parseCells(ctx.attrs.cells)
    if (top.rowCount === 0) {
      top.columnsCount = cells.length
      // price-tier：首行扫描 `*` 前缀确定推荐列；后续行复用
      if (top.variantId === 'price-tier') {
        cells.forEach((cell, i) => {
          if (cell.startsWith('*')) top.highlightCols.add(i)
        })
      }
    } else if (cells.length !== top.columnsCount) {
      // 列数由首行决定；不齐时多余列被截断 / 缺失列留空。静默丢弃对作者不友好——dev 提示一次
      devWarn(
        'table-card:cells',
        `第 ${top.rowCount + 1} 行 cells 列数 ${cells.length} 与首行 ${top.columnsCount} 不一致：多余列被截断、缺失列留空。检查 attrs.cells 的 "|" 分隔符是否漏写或多写。`,
      )
    }
    top.rowCount += 1
    const bodyIdx = isHeader ? -1 : top.bodyRowsRendered
    if (!isHeader) top.bodyRowsRendered += 1

    switch (top.variantId) {
      case 'zebra-rows':
        return renderZebraRow(ctx, cells, isHeader, bodyIdx)
      case 'key-value':
        return renderKeyValueRow(ctx, cells, isHeader)
      case 'price-tier':
        return renderPriceTierRow(ctx, cells, isHeader, bodyIdx, top.highlightCols)
      case 'rule-grid':
      default:
        return renderRuleGridRow(ctx, cells, isHeader)
    }
  },
  close: '',
}

// ─────────────────────────────────────────────────────────────
// 4 个 row 渲染器
// ─────────────────────────────────────────────────────────────

/** 剥 price-tier 推荐列的 `*` 前缀，让渲染文本不带星号 */
function stripStar(s: string): string {
  return s.startsWith('*') ? s.slice(1).trim() : s
}

function renderRuleGridRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
): string {
  const c = ctx.tokens.colors
  const n = cells.length || 1
  const w = (100 / n).toFixed(2)
  const rowCSS = 'display:table-row'
  const bg = isHeader ? c.bgMuted : c.bg
  const color = isHeader ? c.accent : c.text
  const weight = isHeader ? 700 : 400
  const cellHtml = cells
    .map((cell, i) => {
      const isLastCol = i === cells.length - 1
      const cellCSS = [
        'display:table-cell',
        `width:${w}%`,
        'vertical-align:middle',
        `background-color:${bg}`,
        `color:${color}`,
        `font-weight:${weight}`,
        'font-size:13px',
        'line-height:1.5',
        'padding:8px 10px',
        `border-bottom:1px solid ${c.border}`,
        isLastCol ? '' : `border-right:1px solid ${c.border}`,
      ]
        .filter(Boolean)
        .join(';')
      return `<span style="${cellCSS}">${escText(cell)}</span>`
    })
    .join('')
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
}

function renderZebraRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
  bodyIdx: number,
): string {
  const c = ctx.tokens.colors
  const n = cells.length || 1
  const w = (100 / n).toFixed(2)
  const rowCSS = 'display:table-row'
  // 第 0 条 body 行（紧贴 header）走 bgSoft，奇偶相间
  const bg = isHeader ? 'transparent' : bodyIdx % 2 === 0 ? c.bgSoft : c.bg
  const color = isHeader ? c.textMuted : c.text
  const weight = isHeader ? 700 : 400
  const fontSize = isHeader ? '11px' : '13px'
  const letterSpacing = isHeader ? '0.1em' : 'normal'
  const textTransform = isHeader ? 'uppercase' : 'none'
  const cellHtml = cells
    .map((cell) => {
      const cellCSS = [
        'display:table-cell',
        `width:${w}%`,
        'vertical-align:middle',
        `background-color:${bg}`,
        `color:${color}`,
        `font-weight:${weight}`,
        `font-size:${fontSize}`,
        `letter-spacing:${letterSpacing}`,
        `text-transform:${textTransform}`,
        'line-height:1.5',
        'padding:10px 12px',
        isHeader ? `border-bottom:1px solid ${c.border}` : '',
      ]
        .filter(Boolean)
        .join(';')
      return `<span style="${cellCSS}">${escText(cell)}</span>`
    })
    .join('')
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
}

function renderKeyValueRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
): string {
  const c = ctx.tokens.colors
  const rowCSS = 'display:table-row'
  if (isHeader) {
    // header 单 cell 居中，宽度撑满（display:table 行内 cell 少时空列留空，
    // 视觉上 header 单格 100% 宽看起来"跨列"——无需 HTML colspan，省了 span 不支持的坑）
    const headerText = cells.join(' · ')
    const cellCSS = [
      'display:table-cell',
      'width:100%',
      'vertical-align:middle',
      `background-color:${c.bgSoft}`,
      `color:${c.text}`,
      'font-weight:700',
      'font-size:12px',
      'letter-spacing:0.1em',
      'text-transform:uppercase',
      'text-align:center',
      'padding:10px 12px',
      `border-bottom:1px solid ${c.border}`,
    ].join(';')
    return (
      `<section class="container-table-row" style="${rowCSS}">` +
      `<span style="${cellCSS}">${escText(headerText)}</span>` +
      `</section>\n`
    )
  }
  const key = cells[0] ?? ''
  const value = cells[1] ?? ''
  const keyCSS = [
    'display:table-cell',
    'width:35%',
    'vertical-align:middle',
    `background-color:${c.bgSoft}`,
    `color:${c.textMuted}`,
    'font-weight:600',
    'font-family:Menlo,Monaco,monospace',
    'font-size:12px',
    'text-align:right',
    'padding:10px 12px',
    `border-bottom:1px solid ${c.border}`,
  ].join(';')
  const valueCSS = [
    'display:table-cell',
    'width:65%',
    'vertical-align:middle',
    `color:${c.text}`,
    'font-size:13px',
    'line-height:1.5',
    'text-align:left',
    'padding:10px 14px',
    `border-bottom:1px solid ${c.border}`,
  ].join(';')
  return (
    `<section class="container-table-row" style="${rowCSS}">` +
    `<span style="${keyCSS}">${escText(key)}</span>` +
    `<span style="${valueCSS}">${escText(value)}</span>` +
    `</section>\n`
  )
}

function renderPriceTierRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
  bodyIdx: number,
  highlightCols: Set<number>,
): string {
  const c = ctx.tokens.colors
  const n = cells.length || 1
  const w = (100 / n).toFixed(2)
  const rowCSS = 'display:table-row'
  // 第 0 条 body 行视作"价格主数字"——加粗放大；其余 body 行小字描述
  const isFirstBodyRow = !isHeader && bodyIdx === 0
  const cellHtml = cells
    .map((cellRaw, i) => {
      const cell = stripStar(cellRaw)
      const isHighlight = highlightCols.has(i)
      const topColor = isHighlight ? c.accent : c.primary
      const bg = isHeader ? c.bgSoft : c.bg
      const color = c.text
      const weight = isHeader || isFirstBodyRow ? 700 : 400
      const fontSize = isHeader ? '14px' : isFirstBodyRow ? '16px' : '12px'
      const padY = isHeader ? '12px' : '10px'
      // 顶 3px 色条仅 header 行承担——body 行不再重复，避免每行都画
      const borderTop = isHeader ? `border-top:3px solid ${topColor}` : ''
      const cellCSS = [
        'display:table-cell',
        `width:${w}%`,
        'vertical-align:middle',
        `background-color:${bg}`,
        `color:${color}`,
        `font-weight:${weight}`,
        `font-size:${fontSize}`,
        'line-height:1.4',
        'text-align:center',
        `padding:${padY} 8px`,
        borderTop,
        `border-bottom:1px solid ${c.border}`,
      ]
        .filter(Boolean)
        .join(';')
      return `<span style="${cellCSS}">${escText(cell)}</span>`
    })
    .join('')
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
}
