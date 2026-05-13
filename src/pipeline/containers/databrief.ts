/**
 * data-brief 家族容器渲染器（数据简报：晚点 / 财新数据 / Morning Brew 感）
 *
 * 10 个签名 + 3 个嵌套子项，覆盖 11-data-brief 设计稿专属版面动作：
 *   - masthead         刊头（刊名 + monospace 期号·日期）
 *   - section-tag      小栏目标签（黑底白字胶囊）
 *   - toc / toc-item   目录三栏（序号 · 标题 · 页码）
 *   - kpi-dashboard / kpi-item   三指标 + SVG sparkline
 *   - bar-chart / bar  横向条形图（div 宽度，无 SVG）
 *   - qa-block         读者问答（Q/A 头像方块）
 *   - footnotes        脚注块（上分割线 + 编号引用）
 *   - editor-note      编辑部注 callout（主色左条 + kicker + 正文）
 *   - methodology      方法论小字注释（浅底 + 粗体标签 + 10px 紧凑正文）
 *   - colophon         刊物收束栏（上分割线 + "下期 / 卷·期"双栏 monospace）
 *
 * 设计纪律：
 *   1. **不依赖 flex 关键布局**——wxPatch 会把 display:flex → block。需要"行内贴边"
 *      的地方走 inline-block + vertical-align；需要多列等宽走 display:grid
 *      （WeChat 不剥 grid，flex gap 才剥）。
 *   2. **inline SVG 走 motif 同等纪律**——sparkline strokeWidth ≥ 1，端点 ≥ 1.4 半径，
 *      polyline 用单根线段而非多 line（粘贴稳定）。
 *   3. **monospace 字体仅在 renderer inline 出现**——主题 elements/containers CSS 禁
 *      font-family（themeCSS 会 throw）；这里是渲染时刻的 raw HTML，规则不适用。
 *   4. **嵌套容器（kpi-item / bar / toc-item）的 styleKey:null**——它们的视觉由父容器
 *      渲染纪律决定，不参与主题 voice 微调，避免 ThemeContainers 类型膨胀。
 */

import type { ContainerRenderer, ContainerRenderContext } from './types'
import { escText } from './types'
import { inlineCss as inline } from './_shared/cssInline'

// ============================================================
// 公共工具
// ============================================================
//
// inlineCss 已抽到 _shared/cssInline.ts（R2）。本文件内仍以 `inline` 局部别名引用，
// 减少 diff 噪声 —— 14 处调用点无需逐一改名。

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
// masthead · 刊头
// ============================================================

export const mastheadContainer: ContainerRenderer = {
  open: (ctx) => {
    const name = ctx.info.trim() || '简报'
    const issue = ctx.attrs.issue ?? ''
    const date = ctx.attrs.date ?? ''
    const c = ctx.tokens.colors
    // R4：装饰位（padding / border / bg / margin）由 ctx.containers.masthead 决定。
    // 结构性 display:grid 是本容器的视觉契约（左 1fr 右 auto），由 renderer 强制——
    // 不进 ThemeContainers 槽位（themeCSS guard 会拒绝 display:grid）。
    const wrapperCSS =
      `display:grid;grid-template-columns:1fr auto;align-items:baseline;` +
      inline(ctx.containers.masthead)
    const nameCSS = [
      `color:${c.text}`,
      'font-size:13px',
      'font-weight:700',
      'letter-spacing:-0.01em',
    ].join(';')
    const metaCSS = [
      `color:${c.textMuted}`,
      'font-family:Menlo,Monaco,monospace',
      'font-size:11px',
      'text-align:right',
    ].join(';')
    const metaText =
      issue || date
        ? `${issue ? `第 ${escText(issue)} 期` : ''}${issue && date ? ' · ' : ''}${date ? escText(date) : ''}`
        : ''
    return (
      `<section class="container-masthead" style="${wrapperCSS}">\n` +
      `<span class="container-masthead__name" style="${nameCSS}">${escText(name)}</span>` +
      (metaText
        ? `<span class="container-masthead__meta" style="${metaCSS}">${metaText}</span>`
        : '<span></span>') +
      `\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// section-tag · 黑底白字小栏目标签
// ============================================================

export const sectionTagContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.info.trim() || '标签'
    const c = ctx.tokens.colors
    // R4：外壳 section 仅承载 margin；标签本体走 inline-block 胶囊。
    const wrapperCSS = inline(ctx.containers.sectionTag)
    const pillCSS = [
      'display:inline-block',
      `background-color:${c.text}`,
      `color:${c.textInverse}`,
      'font-size:10px',
      'letter-spacing:0.15em',
      'padding:3px 8px',
    ].join(';')
    return (
      `<section class="container-section-tag" style="${wrapperCSS}">` +
      `<span class="container-section-tag__pill" style="${pillCSS}">${escText(label)}</span>` +
      `</section>\n`
    )
  },
  close: '',
}

// ============================================================
// toc · 目录（外壳 + kicker）
// ============================================================

export const tocContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || '目录 · CONTENTS'
    const c = ctx.tokens.colors
    // R4：wrapper 完全由 ctx.containers.toc 决定。
    const wrapperCSS = inline(ctx.containers.toc)
    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:10px',
      'font-weight:700',
      'letter-spacing:0.15em',
      'margin-bottom:6px',
    ].join(';')
    return (
      `<section class="container-toc" style="${wrapperCSS}">\n` +
      `<section class="container-toc__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
    )
  },
  close: '</section>\n',
}

/**
 * toc-item · 单条
 *
 * 三栏 grid（序号 monospace 主色 / 标题 / 页码 monospace 灰）。
 * info 为条目标题；attrs.no = 序号，attrs.page = 页码。body 内容忽略。
 */
export const tocItemContainer: ContainerRenderer = {
  open: (ctx) => {
    const no = ctx.attrs.no ?? ''
    const page = ctx.attrs.page ?? ''
    const title = ctx.info.trim()
    const c = ctx.tokens.colors
    const wrapperCSS = [
      'display:grid',
      'grid-template-columns:30px 1fr auto',
      'gap:0 10px',
      'align-items:baseline',
      'font-size:12px',
      'line-height:1.75',
      'padding:1px 0',
    ].join(';')
    const noCSS = [
      'font-family:Menlo,Monaco,monospace',
      `color:${c.primary}`,
      'font-size:11px',
    ].join(';')
    const titleCSS = `color:${c.text}`
    const pageCSS = [
      'font-family:Menlo,Monaco,monospace',
      `color:${c.textMuted}`,
      'font-size:11px',
      'text-align:right',
    ].join(';')
    return (
      `<section class="container-toc-item" style="${wrapperCSS}">` +
      `<span style="${noCSS}">${escText(no)}</span>` +
      `<span style="${titleCSS}">${escText(title)}</span>` +
      `<span style="${pageCSS}">${escText(page)}</span>` +
      `</section>\n`
    )
  },
  close: '',
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

// ============================================================
// qa-block · 读者问答（Q方块/A方块 头像）
// ============================================================

export const qaBlockContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || '读者问答 · Q&A'
    const q = ctx.attrs.q ?? ''
    const c = ctx.tokens.colors
    // R4：wrapper 完全由 ctx.containers.qaBlock 决定。
    const wrapperCSS = inline(ctx.containers.qaBlock)
    const kickerCSS = [
      'font-size:11px',
      'font-weight:700',
      `color:${c.primary}`,
      'letter-spacing:0.1em',
      'margin-bottom:10px',
    ].join(';')
    const rowCSS = [
      'display:grid',
      'grid-template-columns:22px 1fr',
      'gap:10px',
      'align-items:start',
      'font-size:13px',
      'line-height:1.65',
      `color:${c.text}`,
      'margin-bottom:8px',
    ].join(';')
    const qBadgeCSS = [
      'display:inline-block',
      'width:22px',
      'height:22px',
      `background-color:${c.primary}`,
      `color:${c.textInverse}`,
      'text-align:center',
      'line-height:22px',
      'font-size:11px',
      'font-weight:700',
    ].join(';')
    const aBadgeCSS = [
      'display:inline-block',
      'width:22px',
      'height:22px',
      `background-color:${c.text}`,
      `color:${c.textInverse}`,
      'text-align:center',
      'line-height:22px',
      'font-size:11px',
      'font-weight:700',
    ].join(';')
    const qRow = q
      ? `<section class="container-qa-block__q" style="${rowCSS}"><span style="${qBadgeCSS}">Q</span><span>${escText(q)}</span></section>\n`
      : ''
    // A 头像 + 内容容器。内容由 markdown-it 渲染（在 close 之前的 body tokens 输出）。
    // 我们把 A badge + 一个 grid 行 wrapper 写在 open 尾部；close 关 wrapper 再关 section。
    return (
      `<section class="container-qa-block" style="${wrapperCSS}">\n` +
      `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n` +
      qRow +
      `<section class="container-qa-block__a" style="${rowCSS}"><span style="${aBadgeCSS}">A</span><span class="container-qa-block__answer">\n`
    )
  },
  close: '</span></section>\n</section>\n',
}

// ============================================================
// footnotes · 脚注块
// ============================================================

export const footnotesContainer: ContainerRenderer = {
  open: (ctx) => {
    // R4：wrapper 完全由 ctx.containers.footnotes 决定（含小字号 / muted 色由
    // baseContainers 提供，主题可在 spec.containers.footnotes 覆盖）。
    const wrapperCSS = inline(ctx.containers.footnotes)
    return `<section class="container-footnotes" style="${wrapperCSS}">\n`
  },
  close: '</section>\n',
}

// ============================================================
// cta-bar · 三栏 CTA（赞同 / 收藏 / 转发）
// ============================================================

/**
 * 设计稿 cta-bar：等宽三栏，左/右描边格 + 中实色格。
 * 公众号粘贴期 display:grid 不被剥（与 KPI dashboard 同一族结论），但本容器尺寸小，
 * 改走 display:table + table-cell 更稳——cells 在窄屏渲染时仍可控。
 *
 * body 内容忽略：本容器是"声明型"的——三格文字由 attrs 决定，作者不需写 markdown 正文。
 */
export const ctaBarContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const like = ctx.attrs.like ?? '♡ 赞同'
    const star = ctx.attrs.star ?? '★ 收藏'
    const share = ctx.attrs.share ?? '↗ 转发'
    // R4：wrapper margin / 主题装饰由 ctx.containers.ctaBar 决定；display:table 等
    // 排版骨架由 renderer 强制保证（不可主题化——是 ctaBar 的视觉契约本身）。
    const wrapperCSS =
      `display:table;width:100%;table-layout:fixed;border-spacing:6px 0;border-collapse:separate;` +
      inline(ctx.containers.ctaBar)
    const outlineCell = [
      'display:table-cell',
      'padding:10px 0',
      'text-align:center',
      `border:1px solid ${c.text}`,
      'font-size:12px',
      `color:${c.text}`,
      'box-sizing:border-box',
    ].join(';')
    const fillCell = [
      'display:table-cell',
      'padding:10px 0',
      'text-align:center',
      `background-color:${c.primary}`,
      'font-size:12px',
      `color:${c.textInverse}`,
      'font-weight:500',
      'box-sizing:border-box',
    ].join(';')
    return (
      `<section class="container-cta-bar" style="${wrapperCSS}">` +
      `<span style="${outlineCell}">${escText(like)}</span>` +
      `<span style="${fillCell}">${escText(star)}</span>` +
      `<span style="${outlineCell}">${escText(share)}</span>` +
      `</section>\n`
    )
  },
  close: '',
}

// ============================================================
// qr-follow · 二维码订阅卡（左 QR + 右 SUBSCRIBE / 标题 / 说明）
// ============================================================

/**
 * 设计稿 qr-follow：左 60×60 QR + 右三行文字（SUBSCRIBE kicker / 标题 / 说明）。
 * 走 display:table + table-cell 实现"图左文右"两栏——避开 flex 被剥的风险。
 *
 * QR 图：
 *   - 作者提供 attrs.qr=url 时走 <img>
 *   - 缺省时画占位 SVG（与设计稿一致的"角眼 + 散点"方块阵），保证肉眼可识但不带二维码功能
 *
 * body 内容忽略。文字段由 attrs.kicker / info / attrs.desc 三段组成。
 */
export const qrFollowContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const kicker = ctx.attrs.kicker ?? 'SUBSCRIBE'
    const title = ctx.info.trim() || '订阅本刊'
    const desc = ctx.attrs.desc ?? ''
    const qrUrl = ctx.attrs.qr ?? ''
    // R4：wrapper 装饰由 ctx.containers.qrFollow 决定；display:table 排版骨架由
    // renderer 保证（"左 QR 右文字"是本容器的视觉契约）。
    const wrapperCSS =
      `display:table;width:100%;table-layout:auto;border-collapse:separate;` +
      inline(ctx.containers.qrFollow)
    // 左格：QR
    const qrCellCSS = 'display:table-cell;vertical-align:middle;width:60px;padding-right:14px'
    const qrImgCSS = 'display:block;width:60px;height:60px;background-color:#fff'
    // 占位 QR SVG：仿真三角眼 + 数据点
    const qrSvg =
      `<svg viewBox="0 0 60 60" width="60" height="60" style="${qrImgCSS}">` +
      `<g fill="${c.text}">` +
      `<rect x="3" y="3" width="16" height="16"/><rect x="6" y="6" width="10" height="10" fill="#fff"/><rect x="9" y="9" width="4" height="4"/>` +
      `<rect x="41" y="3" width="16" height="16"/><rect x="44" y="6" width="10" height="10" fill="#fff"/><rect x="47" y="9" width="4" height="4"/>` +
      `<rect x="3" y="41" width="16" height="16"/><rect x="6" y="44" width="10" height="10" fill="#fff"/><rect x="9" y="47" width="4" height="4"/>` +
      `<rect x="24" y="24" width="3" height="3"/><rect x="30" y="24" width="3" height="3"/><rect x="36" y="27" width="3" height="3"/>` +
      `<rect x="24" y="30" width="3" height="3"/><rect x="33" y="30" width="3" height="3"/><rect x="27" y="36" width="3" height="3"/>` +
      `<rect x="36" y="36" width="3" height="3"/><rect x="42" y="39" width="3" height="3"/><rect x="24" y="42" width="3" height="3"/>` +
      `<rect x="39" y="45" width="3" height="3"/><rect x="27" y="48" width="3" height="3"/>` +
      `</g></svg>`
    const qrEl = qrUrl
      ? `<img src="${escText(qrUrl)}" alt="QR" style="${qrImgCSS}"/>`
      : qrSvg
    // 右格：三行文字
    const textCellCSS = 'display:table-cell;vertical-align:middle'
    const kickerCSS = [
      'font-family:Menlo,Monaco,monospace',
      'font-size:10px',
      'font-weight:700',
      `color:${c.primary}`,
      'letter-spacing:0.15em',
    ].join(';')
    const titleCSS = [
      'font-size:14px',
      'font-weight:700',
      `color:${c.text}`,
      'margin-top:3px',
      'letter-spacing:-0.01em',
    ].join(';')
    const descCSS = [
      'font-size:11px',
      `color:${c.textMuted}`,
      'margin-top:3px',
    ].join(';')
    const descEl = desc
      ? `<section style="${descCSS}">${escText(desc)}</section>`
      : ''
    return (
      `<section class="container-qr-follow" style="${wrapperCSS}">` +
      `<span style="${qrCellCSS}">${qrEl}</span>` +
      `<span style="${textCellCSS}">` +
      `<section style="${kickerCSS}">${escText(kicker)}</section>` +
      `<section style="${titleCSS}">${escText(title)}</section>` +
      descEl +
      `</span>` +
      `</section>\n`
    )
  },
  close: '',
}

// ============================================================
// editor-note · 编辑部注 callout
//
// 设计稿原型（sample-data-brief.md 旧版 inline `<section>` 三层嵌套）：
//   主色左竖条 + kicker（标签头，info 文字）+ body（作者写的 markdown）。
// 区别于通用 note：note 走 textMuted 中性色调，editor-note 是"被点名"
// 的栏目编辑发声块，主色调介入。
// ============================================================

export const editorNoteContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || '编 者 按'
    const c = ctx.tokens.colors
    const themeStyle = inline(ctx.containers.editorNote)
    const fallback = [
      `background-color:${c.bgSoft}`,
      `border-left:3px solid ${c.primary}`,
      'padding:14px 16px',
      'margin:22px 0',
    ].join(';')
    const wrapperCSS = themeStyle || fallback
    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:11px',
      'font-weight:700',
      'letter-spacing:0.1em',
      'margin-bottom:6px',
    ].join(';')
    return (
      `<section class="container-editor-note" style="${wrapperCSS}">\n` +
      `<section class="container-editor-note__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// methodology · 方法论小字注释
//
// 设计稿原型（旧版 inline `<section style="font-size:10px;color:#5a6068">`）：
//   浅底 + 粗体标签头（info 文字）+ 紧凑小字正文。
// 体感上是"图注 / 调研口径"的脚注栏——与 note 的差别：methodology 排印更
// 紧密（10px、padding 10px 12px），note 是叙事性补注（13px、行距更松）。
// ============================================================

export const methodologyContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.info.trim() || '方法论'
    const c = ctx.tokens.colors
    const themeStyle = inline(ctx.containers.methodology)
    const fallback = [
      `background-color:${c.bgSoft}`,
      'padding:10px 12px',
      'margin:16px 0',
      'font-size:10px',
      'line-height:1.7',
      `color:${c.textMuted}`,
    ].join(';')
    const wrapperCSS = themeStyle || fallback
    // 标签头与正文同行——renderer 在 open 末尾闭合 b 之前留一个空格，让正文紧贴在后面
    const labelCSS = [
      `color:${c.text}`,
      'font-weight:700',
      'margin-right:6px',
    ].join(';')
    return (
      `<section class="container-methodology" style="${wrapperCSS}">` +
      `<b class="container-methodology__label" style="${labelCSS}">${escText(label)}</b>`
    )
  },
  close: '</section>\n',
}

// ============================================================
// colophon · 刊物收束栏（"下期 / 卷·期"双栏）
//
// 设计稿原型（旧版 inline `<section style="display:table">` + 双 table-cell）：
//   上分割线（1px 实线，比 footnotes 的 border 更重，标记"全文结束"）+
//   左右两栏 monospace 元数据。kicker（小字大写）+ value（normal）双行。
// body 内容忽略；左栏数据走 attrs.next，右栏走 attrs.issue。
// ============================================================

export const colophonContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const nextLine = ctx.attrs.next ?? ''
    const issueLine = ctx.attrs.issue ?? ''
    const themeStyle = inline(ctx.containers.colophon)
    const fallback = [
      `border-top:1px solid ${c.text}`,
      'margin-top:20px',
      'padding-top:12px',
    ].join(';')
    const wrapperCSS =
      `display:table;width:100%;table-layout:fixed;` +
      `font-size:11px;line-height:1.6;color:${c.text};` +
      `${themeStyle || fallback}`
    const cellLeftCSS = 'display:table-cell;vertical-align:top'
    const cellRightCSS = 'display:table-cell;vertical-align:top;text-align:right'
    const kickerCSS = [
      'display:block',
      `color:${c.textMuted}`,
      'font-size:10px',
      'letter-spacing:0.1em',
      'margin-bottom:3px',
    ].join(';')
    return (
      `<section class="container-colophon" style="${wrapperCSS}">` +
      `<span style="${cellLeftCSS}">` +
      `<span style="${kickerCSS}">下 期</span>${escText(nextLine)}` +
      `</span>` +
      `<span style="${cellRightCSS}">` +
      `<span style="${kickerCSS}">卷 · 期</span>${escText(issueLine)}` +
      `</span>` +
      `</section>\n`
    )
  },
  close: '',
}
