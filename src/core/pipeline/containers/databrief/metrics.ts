/**
 * data-brief 家族 · 数值与图表（metrics）
 *
 * 4 个容器 + sparkline helpers + KPI dashboard 内部栈：
 *   - kpi-dashboard  三指标卡面板外壳（带 source / period 头脚）
 *   - kpi-item       单指标卡（label / delta / value+unit / sparkline / foot）
 *   - bar-chart      横向条形图外壳
 *   - bar            单条
 *
 * 布局纪律（与 bar 容器一致 · rules.ts FORBIDDEN_DISPLAY_VALUES）：
 *   多列等宽走 display:table + table-cell，**不用 grid**——公众号粘贴后 grid 被剥成
 *   空值，子项塌成顺排。table-layout:fixed 保证三栏等宽不被长内容拉宽。
 */

import type { ContainerRenderer, ContainerRenderContext } from '../types'
import { escText } from '../_shared/escape'
import { inlineCss as inline } from '../_shared/cssInline'

// ============================================================
// sparkline / 趋势着色 helpers（kpi-item 专用）
// ============================================================

/**
 * 解析 series="2,4,5,6,8,9,10,11" → [2,4,5,6,8,9,10,11]。
 * 空 / 不合法值跳过。无有效点返回空数组（调用方决定是否回退）。
 */
function parseSeries(raw: string | undefined): number[] {
  if (!raw) return []
  const out: number[] = []
  for (const seg of raw.split(',')) {
    const n = Number(seg.trim())
    if (Number.isFinite(n)) out.push(n)
  }
  return out
}

/**
 * 把任意数值序列按 min/max 自动缩放到 sparkline viewBox（0 0 110 14）的可视区。
 *
 * 为什么自动缩放：原约定"作者写 0–13 SVG y 坐标"反直觉（SVG y 轴反转：值越大越靠下），
 * 且任何超出 [0,13] 的真实数据都会渲染到 viewBox 外完全不可见（例如电子书渗透率
 * 48–61% 写入后 polyline 在 y=48..61 全部超出可视区，作者看到的是空白）。
 *
 * 现在作者直接写真实值（百分比 / 分钟 / 任意单位），渲染器算 min→y=12（视觉最低）/
 * max→y=2（视觉最高），上下各留 2px 边距。所有值相等时画水平线 y=7（mid）。
 * 返回 lastY 让圆点端标用同一刻度。
 */
function pointsFromSeries(
  series: number[],
  width = 110,
): { points: string; lastY: number } {
  if (series.length === 0) return { points: '', lastY: 7 }
  if (series.length === 1) return { points: `0,7 ${width},7`, lastY: 7 }
  const min = Math.min(...series)
  const max = Math.max(...series)
  const range = max - min
  const step = width / (series.length - 1)
  const yMin = 2
  const ySpan = 10
  const toY = (v: number) => (range === 0 ? 7 : yMin + ((max - v) / range) * ySpan)
  const points = series.map((v, i) => `${(i * step).toFixed(1)},${toY(v).toFixed(2)}`).join(' ')
  return { points, lastY: toY(series[series.length - 1]) }
}

/**
 * delta 文字色：以 '-' 开头视作下降（danger 红）、'+' 开头视作上升（在数据简报里上升≠好，
 * 仍走 danger 提示"异常"——参考晚点/财新 KPI 排版传统；非定数趋势走 textMuted。
 *
 * 调用方覆盖：传 `tone='success'` 可显式走 status.tip.accent；预留以备产品类主题接入。
 */
function deltaTone(delta: string | undefined, c: ContainerRenderContext['tokens']['colors']): string {
  if (!delta) return c.textMuted
  const t = delta.trim()
  if (t.startsWith('-') || t.startsWith('−')) return c.status.danger.accent
  if (t.startsWith('+')) return c.status.danger.accent
  return c.textMuted
}

/** sparkline 颜色：trend=up/down 走 danger；flat 走 textMuted。 */
function trendStroke(trend: string | undefined, c: ContainerRenderContext['tokens']['colors']): string {
  if (trend === 'flat') return c.textMuted
  if (trend === 'up' || trend === 'down') return c.status.danger.accent
  return c.textMuted
}

// ============================================================
// kpi-dashboard · 三指标 + sparkline（外壳）
// ============================================================

// KPI_DASHBOARD_STACK：kpi-item 的不对称 padding 通过递增 itemCount 推断"是否首项"
// （markdown-it-container 流式 open/close 无法前瞻末项，详见 kpiItemContainer）。
// 栈深度恒为 0/1：dashboard 不允许嵌套同名容器。
const KPI_DASHBOARD_STACK: Array<{ source: string; itemCount: number }> = []

export const kpiDashboardContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || 'KEY METRICS'
    const period = ctx.attrs.period ?? ''
    const source = ctx.attrs.source ?? ''
    KPI_DASHBOARD_STACK.push({ source, itemCount: 0 })
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.kpiDashboard)
    const headerCSS = [
      'display:table',
      'width:100%',
      'table-layout:auto',
      'margin-bottom:14px',
      'padding-bottom:8px',
      `border-bottom:1px solid ${c.border}`,
    ].join(';')
    const titleCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'font-family:Menlo,Monaco,monospace',
      `color:${c.text}`,
      'font-size:10px',
      'letter-spacing:0.15em',
    ].join(';')
    // period 走显式像素宽——公众号剥 white-space:nowrap 而保留 width:1%，
    // 原"shrink-to-content"技巧会把 period 塌成单字符竖排。160px 容下
    // "2026Q1 / YoY+QoQ"（≈16 字 monospace 9px）。
    const periodCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'width:160px',
      'font-family:Menlo,Monaco,monospace',
      `color:${c.textMuted}`,
      'font-size:9px',
      'letter-spacing:0.05em',
      'text-align:right',
    ].join(';')
    const gridCSS = ['display:table', 'width:100%', 'table-layout:fixed'].join(';')
    return (
      `<section class="container-kpi-dashboard" style="${wrapperCSS}">\n` +
      `<section class="container-kpi-dashboard__header" style="${headerCSS}">` +
      `<span style="${titleCSS}">${escText(title)}</span>` +
      `<span style="${periodCSS}">${escText(period)}</span>` +
      `</section>\n` +
      `<section class="container-kpi-dashboard__grid" style="${gridCSS}">\n`
    )
  },
  close: (ctx) => {
    const entry = KPI_DASHBOARD_STACK.pop()
    const source = entry?.source ?? ''
    const c = ctx.tokens.colors
    const footCSS = [
      'margin-top:12px',
      'padding-top:8px',
      `border-top:1px solid ${c.border}`,
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${c.textMuted}`,
      'letter-spacing:0.05em',
    ].join(';')
    const footEl = source
      ? `<section class="container-kpi-dashboard__source" style="${footCSS}">SOURCE · ${escText(source)}</section>\n`
      : ''
    return `</section>\n${footEl}</section>\n`
  },
}

/**
 * kpi-item · 单指标卡（label / delta / caption / value+unit / sparkline / foot）
 *
 * 一切以 attrs 驱动；body 内容忽略。
 *
 * 不对称 padding：第 1 项 padding-left:0，其余项左右各 8px。markdown-it-container 流式
 * open/close 无法前瞻末项，所以全部按"非末项"渲染——多出的右 padding 被 dashboard 自
 * 身的 padding-right 吃掉。
 */
export const kpiItemContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.attrs.label ?? ''
    const caption = ctx.attrs.caption ?? ''
    const value = ctx.attrs.value ?? '0'
    const unit = ctx.attrs.unit ?? ''
    const delta = ctx.attrs.delta ?? ''
    const trend = ctx.attrs.trend ?? 'flat'
    const series = parseSeries(ctx.attrs.series)
    const foot = ctx.attrs.foot ?? ''
    const c = ctx.tokens.colors
    const top = KPI_DASHBOARD_STACK[KPI_DASHBOARD_STACK.length - 1]
    const idx = top ? top.itemCount : 0
    if (top) top.itemCount = idx + 1
    const isFirst = idx === 0
    const padLeft = isFirst ? 0 : 8
    const padRight = 8
    const wrapperCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:33.33%',
      `padding:0 ${padRight}px 0 ${padLeft}px`,
      `border-right:1px solid ${c.border}`,
    ].join(';')
    const headerCSS = [
      'display:table',
      'width:100%',
      'table-layout:auto',
      'margin-bottom:12px',
    ].join(';')
    const labelCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${c.textMuted}`,
    ].join(';')
    const deltaCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'width:60px',
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${deltaTone(delta, c)}`,
      'text-align:right',
    ].join(';')
    const captionCSS = ['font-size:10px', `color:${c.textMuted}`, 'margin-bottom:2px'].join(';')
    // value-row nowrap：保证大数字 + 单位作为原子单元，列宽紧时不被中文断字规则拆行。
    const valueRowCSS = [
      'display:inline-block',
      'margin-bottom:10px',
      'vertical-align:baseline',
      'white-space:nowrap',
    ].join(';')
    const valueCSS = [
      'font-size:30px',
      'font-weight:700',
      'line-height:0.9',
      `color:${c.text}`,
      'letter-spacing:-0.03em',
    ].join(';')
    const unitCSS = [
      'font-size:11px',
      'font-weight:500',
      `color:${c.textMuted}`,
      'margin-left:3px',
    ].join(';')
    const footCSS = [
      'display:table',
      'width:100%',
      'table-layout:auto',
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${c.textMuted}`,
      'line-height:1.4',
      'margin-top:4px',
    ].join(';')
    const footLhsCSS = 'display:table-cell;vertical-align:top;word-break:break-all'
    const footRhsCSS =
      'display:table-cell;vertical-align:top;text-align:right;padding-left:4px;word-break:break-all'
    const stroke = trendStroke(trend, c)
    const { points: pts, lastY } = pointsFromSeries(series)
    const svg = pts
      ? `<svg viewBox="0 0 110 14" width="100%" height="14" preserveAspectRatio="none" style="display:block">` +
        `<line x1="0" y1="7" x2="110" y2="7" stroke="${c.border}" stroke-width="1"/>` +
        `<polyline points="${pts}" fill="none" stroke="${stroke}" stroke-width="1.2"/>` +
        `<circle cx="110" cy="${lastY.toFixed(2)}" r="2" fill="${stroke}"/>` +
        `</svg>`
      : ''
    const [lhs, rhs] = foot.includes('→') ? foot.split('→').map((s) => s.trim()) : [foot, '']
    const footEl =
      lhs || rhs
        ? `<section style="${footCSS}"><span style="${footLhsCSS}">${escText(lhs)}</span><span style="${footRhsCSS}">${escText(rhs)}</span></section>`
        : ''
    return (
      `<section class="container-kpi-item" style="${wrapperCSS}">\n` +
      `<section style="${headerCSS}"><span style="${labelCSS}">${escText(label)}</span><span style="${deltaCSS}">${escText(delta)}</span></section>\n` +
      `<section style="${captionCSS}">${escText(caption)}</section>\n` +
      `<section style="${valueRowCSS}"><span style="${valueCSS}">${escText(value)}</span><span style="${unitCSS}">${escText(unit)}</span></section>\n` +
      svg +
      '\n' +
      footEl +
      `\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// bar-chart · 横向条形图（外壳）
// ============================================================

// BAR_CHART_STACK：让 bar 子项读父 chart 的 labelWidth / valueWidth attrs。
// 不用上下文穿透（ctx 没有"父容器栈"槽位），栈深度恒为 0/1：bar-chart 不嵌套。
const BAR_CHART_STACK: Array<{ labelWidth: string; valueWidth: string }> = []

const DEFAULT_BAR_LABEL_WIDTH = '72px' // 容下 5 字中文 / 短英文标签
const DEFAULT_BAR_VALUE_WIDTH = '48px' // 容下 "9 分钟" / "100%" 等 4 字数值

// 接受 `80` / `80px` / `25%` / `5em` / `5rem` 形态；其它（含未配置）落到 fallback。
// 纯数字按 px 处理；带单位则原样回传。inline style 注入前强约束以防 CSS 注入。
const CSS_LENGTH_RE = /^\d+(?:px|%|em|rem|ch)?$/
function sanitizeLength(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback
  const trimmed = raw.trim()
  if (!CSS_LENGTH_RE.test(trimmed)) return fallback
  return /^\d+$/.test(trimmed) ? `${trimmed}px` : trimmed
}

export const barChartContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || ''
    const subtitle = ctx.attrs.subtitle ?? ''
    const labelWidth = sanitizeLength(ctx.attrs.labelWidth, DEFAULT_BAR_LABEL_WIDTH)
    const valueWidth = sanitizeLength(ctx.attrs.valueWidth, DEFAULT_BAR_VALUE_WIDTH)
    BAR_CHART_STACK.push({ labelWidth, valueWidth })
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.barChart)
    const titleCSS = ['font-size:12px', 'font-weight:700', `color:${c.text}`, 'margin-bottom:4px'].join(';')
    const subtitleCSS = ['font-size:10px', `color:${c.textMuted}`, 'margin-bottom:14px'].join(';')
    const titleEl = title
      ? `<section class="container-bar-chart__title" style="${titleCSS}">${escText(title)}</section>\n`
      : ''
    const subEl = subtitle
      ? `<section class="container-bar-chart__subtitle" style="${subtitleCSS}">${escText(subtitle)}</section>\n`
      : ''
    return `<section class="container-bar-chart" style="${wrapperCSS}">\n${titleEl}${subEl}`
  },
  close: () => {
    BAR_CHART_STACK.pop()
    return '</section>\n'
  },
}

/**
 * bar · 单条
 *
 * 必填 attrs：pct（0–100，超界 clamp）。可选：label / value / tone=normal|warn /
 *   labelWidth / valueWidth（per-bar 覆盖父 bar-chart 的同名设置，CSS length 字面量）。
 *
 * 公众号兼容性纪律：
 *   - 行布局走 `display:table` + `display:table-cell`，不用 grid（rules.ts
 *     FORBIDDEN_DISPLAY_VALUES 明文禁 grid，粘贴后被剥成空值）。
 *   - 轨道/填充走块级 `<section>` 而非 `<span>`——inline 元素的 height/width/
 *     background-color 在公众号粘贴后会被无视（inline 不接受块级尺寸）。
 *   - 填充的 `width:${pct}%` 以轨道宽为参照——轨道是 cell 内的块元素 width:100%。
 */
export const barContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.attrs.label ?? ''
    const pctRaw = Number(ctx.attrs.pct ?? '0')
    const pct = Number.isFinite(pctRaw) ? Math.max(0, Math.min(100, pctRaw)) : 0
    const value = ctx.attrs.value ?? ''
    const tone = ctx.attrs.tone ?? 'normal'
    const c = ctx.tokens.colors
    const barColor = tone === 'warn' ? c.status.danger.accent : c.primary
    // 优先级：per-bar attrs > 父 bar-chart attrs > 默认值
    const parent = BAR_CHART_STACK[BAR_CHART_STACK.length - 1]
    const labelWidth = sanitizeLength(
      ctx.attrs.labelWidth,
      parent?.labelWidth ?? DEFAULT_BAR_LABEL_WIDTH,
    )
    const valueWidth = sanitizeLength(
      ctx.attrs.valueWidth,
      parent?.valueWidth ?? DEFAULT_BAR_VALUE_WIDTH,
    )
    const wrapperCSS = [
      'display:table',
      'width:100%',
      'table-layout:fixed',
      'font-family:Menlo,Monaco,monospace',
      'font-size:11px',
      'margin-bottom:6px',
    ].join(';')
    const labelCellCSS = [
      'display:table-cell',
      `width:${labelWidth}`,
      'vertical-align:middle',
      `color:${c.text}`,
    ].join(';')
    const trackCellCSS = [
      'display:table-cell',
      'padding:0 6px',
      'vertical-align:middle',
    ].join(';')
    const valueCellCSS = [
      'display:table-cell',
      `width:${valueWidth}`,
      'vertical-align:middle',
      'text-align:right',
      `color:${c.text}`,
    ].join(';')
    const trackCSS = [
      'display:block',
      'width:100%',
      `background-color:${c.border}`,
      'height:10px',
    ].join(';')
    const fillCSS = [
      'display:block',
      `background-color:${barColor}`,
      'height:10px',
      `width:${pct}%`,
    ].join(';')
    return (
      `<section class="container-bar" style="${wrapperCSS}">` +
      `<span style="${labelCellCSS}">${escText(label)}</span>` +
      `<span style="${trackCellCSS}">` +
      `<section style="${trackCSS}"><section style="${fillCSS}"></section></section>` +
      `</span>` +
      `<span style="${valueCellCSS}">${escText(value)}</span>` +
      `</section>\n`
    )
  },
  close: '',
}
