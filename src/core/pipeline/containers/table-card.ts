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
 * cells 解析：管道 `|` 分隔，trim 后入数组。
 *
 * price-tier 推荐列约定：单元格首字符 `*` 标记当列为推荐列——首行（header）扫描记下列号，
 * 后续每行同列顶条着 accent 色。**转义**：写 `\*` 表示字面星号，不触发推荐标记
 * （如 cell `"\*会员"` 渲染为 `"*会员"`，不进 highlightCols）。这是为了允许真实数据
 * 含 `*` 字面（如脚注引用、注解符号）。
 *
 * key-value 列数约定：必须 2 列。非 header 行 cells.length ≠ 2 时按 dev warn 提示
 * （生产渲染仍走 fallback：少列补空、多列截断），不阻断；warn 去重，测试可静音
 * （__setTableCardWarnSilentForTest）。
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

/**
 * price-tier 推荐列前缀解读。
 *   - `*xxx`   → { recommend: true,  text: 'xxx' }  推荐列，渲染时剥掉星号
 *   - `\*xxx`  → { recommend: false, text: '*xxx' } 字面星号转义
 *   - 其它     → { recommend: false, text: 原值 }
 */
function interpretStarPrefix(raw: string): { recommend: boolean; text: string } {
  if (raw.startsWith('\\*')) return { recommend: false, text: raw.slice(1) }
  if (raw.startsWith('*')) return { recommend: true, text: raw.slice(1).trim() }
  return { recommend: false, text: raw }
}

// ─────────────────────────────────────────────────────────────
// dev warn：cells 列数 / 形状不合约定时一次性提示，不阻断渲染
// 仿 themeCompatGuard：(variantId, kind) 去重；测试钩子可静音。
// ─────────────────────────────────────────────────────────────

const warnedShapes = new Set<string>()
let warnSilent = false

function warnCellShape(variantId: string, kind: string, msg: string): void {
  if (warnSilent) return
  const key = `${variantId}::${kind}`
  if (warnedShapes.has(key)) return
  warnedShapes.add(key)
  console.warn(`[wechat-typeset] table-card[${variantId}] ${msg}`)
}

/**
 * 测试钩子：静音 warn 输出。table-card variant 全矩阵 / 快照 spec 会刻意穿越
 * 异常列数 / 转义边界（warn 路径正是被测对象），生产期 warn 在测试日志里变成
 * 数百行噪声。spec 在 beforeAll 打开、afterAll 关掉。生产代码勿用。
 */
export function __setTableCardWarnSilentForTest(v: boolean): void {
  warnSilent = v
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
      // price-tier：首行扫描 `*` 前缀确定推荐列（`\*` 转义不算）；后续行复用
      if (top.variantId === 'price-tier') {
        cells.forEach((cell, i) => {
          if (interpretStarPrefix(cell).recommend) top.highlightCols.add(i)
        })
      }
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
      case 'three-line-table':
        return renderThreeLineRow(ctx, cells, isHeader)
      case 'index-table':
        return renderIndexTableRow(ctx, cells, isHeader)
      case 'vermillion-grid':
        return renderVermillionGridRow(ctx, cells, isHeader)
      case 'matrix':
        return renderMatrixRow(ctx, cells, isHeader)
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

/** 剥 price-tier 推荐列的 `*` 前缀（`\*` 转义降为字面星号），让渲染文本不带星号 */
function stripStar(s: string): string {
  return interpretStarPrefix(s).text
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
  if (cells.length !== 2) {
    warnCellShape(
      'key-value',
      'row-arity',
      `row cells.length=${cells.length}，应为 2（左 key / 右 value）；少列补空、多列截断`,
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

function renderThreeLineRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
): string {
  const c = ctx.tokens.colors
  const n = cells.length || 1
  const w = (100 / n).toFixed(2)
  const rowCSS = 'display:table-row'
  // header 行下方 1px 实线；body 行无任何水平/垂直分隔——纯三线骨架
  const color = isHeader ? c.textMuted : c.text
  const weight = isHeader ? 600 : 400
  const fontSize = isHeader ? '11px' : '13px'
  const letterSpacing = isHeader ? '0.08em' : 'normal'
  const textTransform = isHeader ? 'uppercase' : 'none'
  const cellHtml = cells
    .map((cell) => {
      const cellCSS = [
        'display:table-cell',
        `width:${w}%`,
        'vertical-align:middle',
        `color:${color}`,
        `font-weight:${weight}`,
        `font-size:${fontSize}`,
        `letter-spacing:${letterSpacing}`,
        `text-transform:${textTransform}`,
        'line-height:1.5',
        'padding:10px 12px',
        isHeader ? `border-bottom:1px solid ${c.text}` : '',
      ]
        .filter(Boolean)
        .join(';')
      return `<span style="${cellCSS}">${escText(cell)}</span>`
    })
    .join('')
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
}

function renderIndexTableRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
): string {
  const c = ctx.tokens.colors
  const n = cells.length || 1
  const w = (100 / n).toFixed(2)
  const rowCSS = 'display:table-row'
  // header 行：小号全大写 + 下方 1px 实线
  // body 行：行间 dashed 分隔；按列索引区分 monospace（i==0,2）/ 正常（i==1）
  const headerWeight = 600
  const cellHtml = cells
    .map((cell, i) => {
      const isMonoCol = i === 0 || i === n - 1
      const isLastCol = i === cells.length - 1
      const bg = 'transparent'
      const color = isHeader ? c.textMuted : isMonoCol ? c.textMuted : c.text
      const weight = isHeader ? headerWeight : isMonoCol ? 400 : 400
      const fontSize = isHeader ? '11px' : isMonoCol ? '12px' : '13px'
      const fontFamily = !isHeader && isMonoCol ? 'font-family:Menlo,Monaco,monospace' : ''
      const textAlign = !isHeader && isLastCol ? 'text-align:right' : 'text-align:left'
      const borderBottom = isHeader
        ? `border-bottom:1px solid ${c.text}`
        : `border-bottom:1px dashed ${c.border}`
      const cellCSS = [
        'display:table-cell',
        `width:${w}%`,
        'vertical-align:middle',
        `background-color:${bg}`,
        `color:${color}`,
        `font-weight:${weight}`,
        `font-size:${fontSize}`,
        fontFamily,
        isHeader ? 'letter-spacing:0.08em' : '',
        isHeader ? 'text-transform:uppercase' : '',
        textAlign,
        'line-height:1.5',
        'padding:10px 12px',
        borderBottom,
      ]
        .filter(Boolean)
        .join(';')
      return `<span style="${cellCSS}">${escText(cell)}</span>`
    })
    .join('')
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
}

function renderVermillionGridRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
): string {
  const c = ctx.tokens.colors
  const n = cells.length || 1
  const w = (100 / n).toFixed(2)
  const rowCSS = 'display:table-row'
  // header 行：primary 底色 + textInverse 字色（朱印感降级实现）
  // body 行：全网格 1px solid border，小号字
  const bg = isHeader ? c.primary : c.bg
  const color = isHeader ? c.textInverse : c.text
  const weight = isHeader ? 700 : 400
  const fontSize = isHeader ? '12px' : '12px'
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
        `font-size:${fontSize}`,
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

function renderMatrixRow(
  ctx: ContainerRenderContext,
  cells: string[],
  isHeader: boolean,
): string {
  const c = ctx.tokens.colors
  const CELL_SIZE = 36
  const LABEL_WIDTH = 50
  const rowCSS = 'display:table-row'

  if (isHeader) {
    const labelCSS = [
      'display:table-cell',
      `width:${LABEL_WIDTH}px`,
      `height:${CELL_SIZE}px`,
      'vertical-align:middle',
      'text-align:right',
      'padding-right:8px',
      `color:${c.textMuted}`,
      'font-size:10px',
      'letter-spacing:0.1em',
      'text-transform:uppercase',
      'font-weight:600',
    ].join(';')
    const headCellCSS = [
      'display:table-cell',
      `width:${CELL_SIZE}px`,
      `height:${CELL_SIZE}px`,
      'vertical-align:middle',
      'text-align:center',
      `color:${c.textMuted}`,
      'font-size:10px',
      'letter-spacing:0.1em',
      'text-transform:uppercase',
      'font-weight:600',
    ].join(';')
    const cellHtml = cells
      .map((cell, i) =>
        i === 0
          ? `<span style="${labelCSS}">${escText(cell)}</span>`
          : `<span style="${headCellCSS}">${escText(cell)}</span>`,
      )
      .join('')
    return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
  }

  const labelCSS = [
    'display:table-cell',
    `width:${LABEL_WIDTH}px`,
    `height:${CELL_SIZE}px`,
    'vertical-align:middle',
    'text-align:right',
    'padding-right:8px',
    `color:${c.text}`,
    'font-size:11px',
    'font-weight:600',
  ].join(';')
  const valueCSS = [
    'display:table-cell',
    `width:${CELL_SIZE}px`,
    `height:${CELL_SIZE}px`,
    'vertical-align:middle',
    'text-align:center',
    `background-color:${c.primary}`,
    `color:${c.textInverse}`,
    'font-size:11px',
    'font-weight:700',
    `border:1px solid ${c.bg}`,
  ].join(';')
  const cellHtml = cells
    .map((cell, i) =>
      i === 0
        ? `<span style="${labelCSS}">${escText(cell)}</span>`
        : `<span style="${valueCSS}">${escText(cell)}</span>`,
    )
    .join('')
  return `<section class="container-table-row" style="${rowCSS}">${cellHtml}</section>\n`
}
