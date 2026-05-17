/**
 * data-brief 家族 · 刊物结构外框（frame）
 *
 * 承担"页码 / 目录 / 栏目标签 / 刊物收束"这类"非数据、非编辑文案"的版面骨架。
 *
 * 包含 5 个容器：
 *   - masthead       刊头（刊名 + monospace 期号·日期）
 *   - section-tag    小栏目标签（黑底白字胶囊）
 *   - toc            目录外壳 + kicker
 *   - toc-item       单条目录（序号 · 标题 · 页码 三栏 grid）
 *   - colophon       刊物收束栏（上分割线 + "下期 / 卷·期"双栏 monospace）
 *
 * 设计纪律（与 metrics / editorial / cta 共通）：
 *   1. 结构性布局（display:grid/table）由 renderer 强制，不进 ThemeContainers 槽位
 *   2. wrapper 装饰（padding/border/bg/margin）由 ctx.containers.<slot> 决定
 *   3. monospace 字体仅在 renderer inline 出现（主题 elements/containers CSS 禁 font-family）
 */

import type { ContainerRenderer } from '../types'
import { escText } from '../_shared/escape'
import { inlineCss as inline } from '../_shared/cssInline'

// ============================================================
// masthead · 刊头
// ============================================================

export const mastheadContainer: ContainerRenderer = {
  open: (ctx) => {
    const name = ctx.info.trim() || ctx.kickers.mastheadName
    const issue = ctx.attrs.issue ?? ''
    const date = ctx.attrs.date ?? ''
    const kicker = ctx.attrs.kicker ?? ''
    const c = ctx.tokens.colors
    // 装饰位（padding / border / bg / margin）由 ctx.containers.masthead 决定。
    // 结构性 display:grid 是本容器的视觉契约，由 renderer 强制——
    // 不进 ThemeContainers 槽位（themeCSS guard 会拒绝 display:grid）。
    //
    // 两种布局模式（由 attrs.kicker 切换）：
    //   - 默认（无 kicker）：左 1fr 名 / 右 auto 期号·日期 —— data-brief 经典刊头
    //   - ribbon（有 kicker）：三栏等宽，左 kicker / 中 name（accent 色） / 右 date
    //     —— 报刊"期次条"骨架（粗野主义 / 杂志编辑系常用），date 直接走 attrs.date
    //     不再前缀"第 N 期"（前缀语义由 kicker 承担：例 kicker="第 04 期"）。
    const isRibbon = kicker !== ''
    const wrapperCSS = isRibbon
      ? `display:grid;grid-template-columns:1fr 1fr 1fr;align-items:baseline;` +
        inline(ctx.containers.masthead)
      : `display:grid;grid-template-columns:1fr auto;align-items:baseline;` +
        inline(ctx.containers.masthead)
    if (isRibbon) {
      // ribbon 模式：三栏等宽 monospace，中间 name 走 primary（accent）色突出
      const sideCSS = [
        `color:${c.text}`,
        'font-family:Menlo,Monaco,monospace',
        'font-size:10px',
        'letter-spacing:0.1em',
      ].join(';')
      const sideRightCSS = sideCSS + ';text-align:right'
      const nameCSS = [
        `color:${c.primary}`,
        'font-family:Menlo,Monaco,monospace',
        'font-size:10px',
        'font-weight:700',
        'letter-spacing:0.1em',
        'text-align:center',
      ].join(';')
      return (
        `<section class="container-masthead container-masthead--ribbon" style="${wrapperCSS}">\n` +
        `<span class="container-masthead__kicker" style="${sideCSS}">${escText(kicker)}</span>` +
        `<span class="container-masthead__name" style="${nameCSS}">${escText(name)}</span>` +
        `<span class="container-masthead__date" style="${sideRightCSS}">${escText(date)}</span>` +
        `\n`
      )
    }
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
// section-tag · 主题色胶囊小栏目标签
// ============================================================

export const sectionTagContainer: ContainerRenderer = {
  open: (ctx) => {
    const label = ctx.info.trim() || '标签'
    const c = ctx.tokens.colors
    // 外壳 section 仅承载 margin；标签本体走 inline-block 胶囊。
    // 底色用 primary 而非 text——section-tag 语义是"刊物章节标签"，要与
    // editorial-header.chip 视觉同源（同样的 primary 底 + textInverse 字），
    // 而不是 text 黑色（与正文同色，丢失主题签名）。textInverse 在每个主题已被
    // 配置为"primary 底色上的反白字色"，无需额外对比度护栏。
    const wrapperCSS = inline(ctx.containers.sectionTag)
    const pillCSS = [
      'display:inline-block',
      `background-color:${c.primary}`,
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
// byline · 署名条（N 栏分隔，AUTHOR / EDITOR / SET）
//
// attrs.cells 格式：`KICKER:VALUE | KICKER:VALUE | ...`。竖线 `|` 分隔每格，
// 半角冒号分隔 kicker（9px muted 小字）与 value（12px 700 主视）。
// 末格可声明 monospaceLast=true，让"SET"期次走 monospace 字体（与设计稿对位）。
// 与 author（单作者签名）正交：author 是"name + role"两段，byline 是"N 栏 newspaper 形态"。
// ============================================================

export const bylineContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const cellsRaw = ctx.attrs.cells ?? ''
    const monospaceLast = ctx.attrs.monospaceLast === 'true'
    const wrapperCSS = inline(ctx.containers.byline)

    if (!cellsRaw) {
      // cells 缺省 → 输出空 wrapper（理论上不会发生；作者侧 sample 必填 cells）
      return `<section class="container-byline" style="${wrapperCSS}">`
    }

    const cells = cellsRaw
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((seg) => {
        const idx = seg.indexOf(':')
        if (idx < 0) return { kicker: '', value: seg }
        return { kicker: seg.slice(0, idx).trim(), value: seg.slice(idx + 1).trim() }
      })

    const tableCSS = `display:table;width:100%;table-layout:fixed`
    const baseCellCSS = `display:table-cell;vertical-align:top`
    const kickerCSS = [
      'display:block',
      'font-size:9px',
      'letter-spacing:0.15em',
      `color:${c.textMuted}`,
      'margin-bottom:2px',
    ].join(';')
    const valueCSS = [
      'display:block',
      'font-size:12px',
      'font-weight:700',
      `color:${c.text}`,
    ].join(';')
    const monoValueCSS = valueCSS + ';font-family:Menlo,Monaco,monospace'

    const cellHtml = cells
      .map((cell, i) => {
        const isFirst = i === 0
        const isLast = i === cells.length - 1
        // 等宽内边距 + 列间细黑分隔线（最后一格无右 padding/border）
        const padLeft = isFirst ? '0' : '12px'
        const padRight = isLast ? '0' : '12px'
        const borderRight = isLast ? '' : `;border-right:1px solid ${c.text}`
        const cellCSS = `${baseCellCSS};padding:6px ${padRight} 6px ${padLeft}${borderRight}`
        const vCSS = monospaceLast && isLast ? monoValueCSS : valueCSS
        const kickerEl = cell.kicker
          ? `<span style="${kickerCSS}">${escText(cell.kicker)}</span>`
          : ''
        return (
          `<span class="container-byline__cell" style="${cellCSS}">` +
          kickerEl +
          `<span style="${vCSS}">${escText(cell.value)}</span>` +
          `</span>`
        )
      })
      .join('')

    return (
      `<section class="container-byline" style="${wrapperCSS}">` +
      `<section class="container-byline__row" style="${tableCSS}">${cellHtml}</section>` +
      `</section>\n`
    )
  },
  close: '',
}

// ============================================================
// editorial-header · 装饰性副刊头
//
// 跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。
// 与 cover（图卡封面）正交：cover 管"封面图 + 期号戳"，editorial-header 管"红章 + 大字 + 副标题"。
// 输出 <section> 不抢平台 H1 语义（公众号已自动渲染原生标题在主题输出之上）。
// ============================================================

const TITLE_DOT_KEYS: ReadonlySet<string> = new Set(['primary', 'accent', 'secondary'])

export const editorialHeaderContainer: ContainerRenderer = {
  open: (ctx) => {
    const c = ctx.tokens.colors
    const chip = ctx.attrs.chip ?? ''
    const pp = ctx.attrs.pp ?? ''
    const subtitle = ctx.attrs.subtitle ?? ''
    const titleDotKey = ctx.attrs.titleDot ?? ''
    const br = ctx.attrs.br ?? ' / '
    const topRulePx = Number(ctx.attrs.topRule ?? '0')
    const topRule = Number.isFinite(topRulePx) && topRulePx > 0 ? Math.floor(topRulePx) : 0

    const dotColor = TITLE_DOT_KEYS.has(titleDotKey)
      ? (c as unknown as Record<string, string>)[titleDotKey]
      : ''

    const wrapperCSS = inline(ctx.containers.editorialHeader)

    // 顶部装饰色条：6px 黑（Swiss）/ 0 = 不渲染
    const topRuleEl = topRule > 0
      ? `<section class="container-editorial-header__top-rule" style="border-top:${topRule}px solid ${c.text};margin-bottom:12px"></section>\n`
      : ''

    // chip 行：chip 红章 + hairline 横条 + PP 右对齐 monospace。三栏 display:table。
    let chipRow = ''
    if (chip) {
      const chipRowCSS = `display:table;width:100%;table-layout:auto;margin-bottom:12px`
      const chipCellCSS = 'display:table-cell;vertical-align:middle;width:1%;white-space:nowrap'
      const chipPillCSS = [
        'display:inline-block',
        `background-color:${c.primary}`,
        `color:${c.textInverse}`,
        'font-size:10px',
        'font-weight:700',
        'padding:3px 8px',
        'line-height:1',
        'letter-spacing:0.05em',
      ].join(';')
      const ruleCellCSS = `display:table-cell;vertical-align:middle;padding:0 10px`
      const ruleInnerCSS = `border-top:1px solid ${c.text};height:1px;font-size:0;line-height:0`
      const ppCellCSS = [
        'display:table-cell',
        'vertical-align:middle',
        'width:1%',
        'white-space:nowrap',
        'font-family:Menlo,Monaco,monospace',
        'font-size:9px',
        'letter-spacing:0.2em',
        `color:${c.text}`,
      ].join(';')
      const ppCell = pp
        ? `<span style="${ppCellCSS}">${escText(pp)}</span>`
        : ''
      chipRow =
        `<section class="container-editorial-header__chip-row" style="${chipRowCSS}">` +
        `<span style="${chipCellCSS}"><span style="${chipPillCSS}">${escText(chip)}</span></span>` +
        `<span style="${ruleCellCSS}"><span style="${ruleInnerCSS}">&nbsp;</span></span>` +
        ppCell +
        `</section>\n`
    }

    // 大标题：info split by `br` sentinel → 多行 <br>。末段追加 titleDot 实心点（如 primary 红）。
    const segments = ctx.info.split(br).map((s) => s.trim()).filter(Boolean)
    const titleCSS = [
      'font-size:32px',
      'font-weight:700',
      'line-height:1.08',
      `color:${c.text}`,
      'letter-spacing:-0.03em',
      'margin:0 0 12px 0',
    ].join(';')
    const escapedSegments = segments.map(escText)
    const dotSuffix = dotColor
      ? `<span style="color:${dotColor}">.</span>`
      : ''
    const titleInner = escapedSegments.length > 0
      ? escapedSegments.join('<br>') + dotSuffix
      : dotSuffix
    const titleEl = titleInner
      ? `<section class="container-editorial-header__title" style="${titleCSS}">${titleInner}</section>\n`
      : ''

    const subtitleCSS = [
      'font-size:13px',
      'font-weight:500',
      'line-height:1.4',
      `color:${c.text}`,
      'margin:0 0 14px 0',
    ].join(';')
    const subtitleEl = subtitle
      ? `<section class="container-editorial-header__subtitle" style="${subtitleCSS}">${escText(subtitle)}</section>\n`
      : ''

    return (
      `<section class="container-editorial-header" style="${wrapperCSS}">\n` +
      topRuleEl +
      chipRow +
      titleEl +
      subtitleEl
    )
  },
  close: '</section>\n',
}

// ============================================================
// toc · 目录（外壳 + kicker）
// ============================================================

export const tocContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim() || ctx.kickers.toc
    const layout = ctx.attrs.layout ?? 'default'
    const meta = ctx.attrs.meta ?? ''
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.toc)
    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:10px',
      'font-weight:700',
      'letter-spacing:0.15em',
      'margin-bottom:6px',
    ].join(';')

    if (layout === 'split') {
      // 双栏：display:table + 左 1fr / 右 2fr（4:8 = Swiss 12 栏铁律的 1/3:2/3）。
      // close 时要补关 right-cell + row + outer wrapper。
      const tableCSS = `display:table;width:100%;table-layout:fixed`
      const leftCellCSS = [
        'display:table-cell',
        'vertical-align:top',
        'width:33%',
        'padding:12px 14px 12px 0',
        `border-right:1px solid ${c.text}`,
      ].join(';')
      const rightCellCSS = [
        'display:table-cell',
        'vertical-align:top',
        'padding:12px 0 12px 14px',
        'font-size:11px',
        'line-height:1.85',
      ].join(';')
      const metaLines = meta
        .split(' / ')
        .map((s) => s.trim())
        .filter(Boolean)
      const metaInner = metaLines
        .map((s) => `<span style="display:block">${escText(s)}</span>`)
        .join('')
      const metaCSS = [
        'font-size:9px',
        `color:${c.text}`,
        'line-height:1.7',
      ].join(';')
      const metaEl = metaLines.length
        ? `<section class="container-toc__meta" style="${metaCSS}">${metaInner}</section>`
        : ''
      return (
        `<section class="container-toc container-toc--split" style="${wrapperCSS}">` +
        `<section class="container-toc__row" style="${tableCSS}">` +
        `<span class="container-toc__left" style="${leftCellCSS}">` +
        `<section class="container-toc__kicker" style="${kickerCSS}">${escText(kicker)}</section>` +
        metaEl +
        `</span>` +
        `<span class="container-toc__right" style="${rightCellCSS}">\n`
      )
    }

    return (
      `<section class="container-toc" style="${wrapperCSS}">\n` +
      `<section class="container-toc__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
    )
  },
  close: (ctx) => {
    if ((ctx.attrs.layout ?? 'default') === 'split') {
      return `</span></section></section>\n`
    }
    return `</section>\n`
  },
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

// colophon · 刊物收束栏（"下期 / 卷·期"双栏）：
// 上分割线 + 左右两栏 monospace 元数据，kicker（小字大写）+ value（normal）双行。
// body 内容忽略；左栏数据走 attrs.next，右栏走 attrs.issue。

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
      `<span style="${kickerCSS}">${escText(ctx.kickers.colophonNextLabel)}</span>${escText(nextLine)}` +
      `</span>` +
      `<span style="${cellRightCSS}">` +
      `<span style="${kickerCSS}">${escText(ctx.kickers.colophonIssueLabel)}</span>${escText(issueLine)}` +
      `</span>` +
      `</section>\n`
    )
  },
  close: '',
}
