/**
 * data-brief 家族 · 数值与图表（metrics）
 *
 * 4 个容器 + 4 个 sparkline / 趋势着色 helper + 1 个 KPI dashboard 内部栈：
 *   - kpi-dashboard  三指标卡面板外壳（带 source / period 头脚）
 *   - kpi-item       单指标卡（label / delta / value+unit / sparkline / foot）
 *   - bar-chart      横向条形图外壳
 *   - bar            单条（div 宽度，无 SVG）
 *
 * 为什么 helpers 不进 databrief/_shared.ts：
 *   parseSeries / pointsFromSeries / deltaTone / trendStroke 全部仅服务 kpi-item 的 sparkline 渲染；
 *   KPI_DASHBOARD_STACK 也仅在 kpi-dashboard / kpi-item 配对使用。本文件就是它们的天然归属。
 *   一旦未来出现"frame 也要画 sparkline"的诉求，再升提到 databrief/_shared.ts 不迟（YAGNI）。
 *
 * 设计纪律：
 *   - kpi-item 不对称 padding/border 用栈深度推断"是否首项"（markdown-it-container
 *     是流式 open/close，无法前瞻"是否末项"，详见 kpiItemContainer 注释）
 *   - sparkline strokeWidth ≥ 1，端点 ≥ 1.4 半径，polyline 用单根线段（公众号粘贴稳定）
 *   - bar 走 div 宽度，避免 SVG width 在被粘贴时丢失（双重保险）
 */

import type { ContainerRenderer, ContainerRenderContext } from '../types'
import { escText } from '../types'
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
 * 把一串 y 值（约定 0–13 视域）映射为 polyline points="..."。
 * 横向等分 viewBox 宽 110，纵向直接取原值（与设计稿 viewBox 0 0 110 14 一致）。
 */
function pointsFromSeries(series: number[], width = 110): string {
  if (series.length === 0) return ''
  if (series.length === 1) return `0,${series[0]} ${width},${series[0]}`
  const step = width / (series.length - 1)
  return series.map((y, i) => `${(i * step).toFixed(1)},${y}`).join(' ')
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

/**
 * 内部缓存：当一个 kpi-dashboard 打开时，把 source / itemCount 暂存。
 *   - source：close 时挂底部 SOURCE 行
 *   - itemCount：kpi-item.open 期间递增，让子项决定 padding/border 的不对称分配
 *     （第 1 项无左 padding，最后一项无右 padding + 无 border-right）。
 *
 * markdown-it-container 的回调是顺序流，open/close 一一对应；嵌套同名容器不允许，
 * 栈深度恒为 0/1。close 时栈顶元素的 itemCount 给出最终子项个数。
 */
const KPI_DASHBOARD_STACK: Array<{ source: string; itemCount: number }> = []

export const kpiDashboardContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || 'KEY METRICS'
    const period = ctx.attrs.period ?? ''
    const source = ctx.attrs.source ?? ''
    KPI_DASHBOARD_STACK.push({ source, itemCount: 0 })
    const c = ctx.tokens.colors
    // R4：wrapper 完全由 ctx.containers.kpiDashboard 决定。
    const wrapperCSS = inline(ctx.containers.kpiDashboard)
    const headerCSS = [
      'display:grid',
      'grid-template-columns:1fr auto',
      'align-items:baseline',
      'margin-bottom:14px',
      'padding-bottom:8px',
      `border-bottom:1px solid ${c.border}`,
    ].join(';')
    const titleCSS = [
      'font-family:Menlo,Monaco,monospace',
      `color:${c.text}`,
      'font-size:10px',
      'letter-spacing:0.15em',
    ].join(';')
    const periodCSS = [
      'font-family:Menlo,Monaco,monospace',
      `color:${c.textMuted}`,
      'font-size:9px',
      'letter-spacing:0.05em',
      'text-align:right',
    ].join(';')
    const gridCSS = ['display:grid', 'grid-template-columns:1fr 1fr 1fr', 'gap:0'].join(';')
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
 * 一切以 attrs 驱动。body 内容忽略（markdown-it 仍会渲染为空段落 fragment，但视觉上
 * 不影响——为减少 noise，作者应保持 body 空）。
 *
 * 不对称 padding / border：通过父容器（KPI_DASHBOARD_STACK 栈顶）的 itemCount 计数
 * 推断本 item 是第 1 / 中间 / 最后一项。
 *   - 第 1 项：padding-left:0，padding-right:14px，border-right:1px
 *   - 中间项：padding:0 14px，border-right:1px
 *   - 末项约定：渲染期我们不知"是否是最后"——markdown-it-container 流式 open/close
 *     没法前瞻。变通：所有项渲染时按"中间项"对待，dashboard close 时**不修剪末项**——
 *     视觉上多出的 14px 右 padding 被 dashboard 自身的 padding-right 吃掉；
 *     border-right 在末项视觉上紧贴 dashboard 内框，可接受。
 *   即：第 1 项 padding-left=0 是唯一被特殊处理的位置；这就够把"3 项中宽度被吃掉
 *   84px"的硬伤降到 28px，让"12 分钟"等值一行能放下。
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
    const padLeft = isFirst ? 0 : 12
    const padRight = 12
    const wrapperCSS = [
      `padding:0 ${padRight}px 0 ${padLeft}px`,
      `border-right:1px solid ${c.border}`,
    ].join(';')
    const headerCSS = [
      'display:grid',
      'grid-template-columns:1fr auto',
      'align-items:baseline',
      'margin-bottom:12px',
    ].join(';')
    const labelCSS = [
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${c.textMuted}`,
    ].join(';')
    const deltaCSS = [
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${deltaTone(delta, c)}`,
      'text-align:right',
    ].join(';')
    const captionCSS = ['font-size:10px', `color:${c.textMuted}`, 'margin-bottom:2px'].join(';')
    // value-row 加 white-space:nowrap：列宽紧时 "12 分钟" / "138 次" 不再被
    // 中文断字规则拆到第二行。inline-block + nowrap 保证整组（大数字 + 单位）
    // 作为原子排版单元。
    const valueRowCSS = [
      'display:inline-block',
      'margin-bottom:10px',
      'vertical-align:baseline',
      'white-space:nowrap',
    ].join(';')
    const valueCSS = [
      'font-size:34px',
      'font-weight:700',
      'line-height:0.9',
      `color:${c.text}`,
      'letter-spacing:-0.03em',
    ].join(';')
    const unitCSS = [
      'font-size:12px',
      'font-weight:500',
      `color:${c.textMuted}`,
      'margin-left:4px',
    ].join(';')
    const footCSS = [
      'display:grid',
      'grid-template-columns:1fr auto',
      'font-family:Menlo,Monaco,monospace',
      'font-size:9px',
      `color:${c.textMuted}`,
      'margin-top:4px',
      'white-space:nowrap',
    ].join(';')
    // sparkline SVG
    const stroke = trendStroke(trend, c)
    const pts = pointsFromSeries(series)
    const lastY = series.length > 0 ? series[series.length - 1] : 7
    const svg =
      pts.length > 0
        ? `<svg viewBox="0 0 110 14" width="100%" height="14" preserveAspectRatio="none" style="display:block">` +
          `<line x1="0" y1="7" x2="110" y2="7" stroke="${c.border}" stroke-width="1"/>` +
          `<polyline points="${pts}" fill="none" stroke="${stroke}" stroke-width="1.2"/>` +
          `<circle cx="110" cy="${lastY}" r="2" fill="${stroke}"/>` +
          `</svg>`
        : ''
    // foot 拆 "lhs → rhs"
    const [lhs, rhs] = foot.includes('→') ? foot.split('→').map((s) => s.trim()) : [foot, '']
    const footEl =
      lhs || rhs
        ? `<section style="${footCSS}"><span>${escText(lhs)}</span><span style="text-align:right">${escText(rhs)}</span></section>`
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

export const barChartContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || ''
    const subtitle = ctx.attrs.subtitle ?? ''
    const c = ctx.tokens.colors
    // R4：wrapper 完全由 ctx.containers.barChart 决定。
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
  close: '</section>\n',
}

/** bar · 单条（attrs: label / pct / value / tone=normal|warn） */
export const barContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.attrs.label ?? ''
    const pctRaw = Number(ctx.attrs.pct ?? '0')
    const pct = Number.isFinite(pctRaw) ? Math.max(0, Math.min(100, pctRaw)) : 0
    const value = ctx.attrs.value ?? ''
    const tone = ctx.attrs.tone ?? 'normal'
    const c = ctx.tokens.colors
    const barColor = tone === 'warn' ? c.status.danger.accent : c.primary
    const wrapperCSS = [
      'display:grid',
      'grid-template-columns:40px 1fr 42px',
      'gap:6px',
      'align-items:center',
      'font-family:Menlo,Monaco,monospace',
      'font-size:11px',
      'margin-bottom:6px',
    ].join(';')
    const labelCSS = `color:${c.text}`
    const trackCSS = [`background-color:${c.border}`, 'height:10px'].join(';')
    const fillCSS = [`background-color:${barColor}`, 'height:10px', `width:${pct}%`].join(';')
    const valueCSS = [`color:${c.text}`, 'text-align:right'].join(';')
    return (
      `<section class="container-bar" style="${wrapperCSS}">` +
      `<span style="${labelCSS}">${escText(label)}</span>` +
      `<span style="${trackCSS}"><span style="display:block;${fillCSS}"></span></span>` +
      `<span style="${valueCSS}">${escText(value)}</span>` +
      `</section>\n`
    )
  },
  close: '',
}
