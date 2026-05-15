/**
 * 签名容器渲染器（abstract / key-number / see-also）—— 这三个容器**有内容
 * 结构约定**（abstract 有 kicker、key-number 有 value 显示层级），不走
 * admonition 的 variant 分派（避免把 variant 模块污染成模板引擎），改读
 * ctx.containers.<x>（主题 CSS 槽位）+ ctx.innerStyles.<x>（内层 inline style，
 * 主题可深合并接管，如把 keyNumber 数字字号从 32px 调到 28px）。
 *   - abstract：文章头部 tl;dr。kicker（"Abstract / 摘要"）+ body markdown。
 *   - key-number：大字号数字 + 说明。attrs.value 放数字本体，info 放 kicker，body 放详解。
 *   - see-also：相关阅读链接列表（academic-frontier / tech-explainer 等专用）。
 */

import type { ContainerRenderer } from './types'
import { escText } from './types'
import { inlineCss as inline } from './_shared/cssInline'

// abstract · 文首 tl;dr。renderer 只负责结构（section + kicker），样式全由
// ctx.containers.abstract / ctx.innerStyles.abstractKicker 决定。

export const abstractContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '摘要'
    const wrapperCSS = inline(ctx.containers.abstract)
    const kickerCSS = inline(ctx.innerStyles.abstractKicker)
    return (
      `<section class="container-abstract" style="${wrapperCSS}">\n` +
      `<section class="container-abstract__kicker" style="${kickerCSS}">${escText(title)}</section>\n`
    )
  },
  close: '</section>\n',
}

// key-number · 大数字 + 说明。wrapper / value / kicker 样式全由
// ctx.containers.keyNumber / ctx.innerStyles.keyNumber{Value,Kicker} 接管。
//
// 两种布局（由 attrs.meta 切换）：
//   - 默认：vertical stack（kicker → value → body）
//   - meta 非空：display:table 双栏——左 cell 主视（kicker+value），右 cell monospace 元信息底对齐
//     条目用 ` / ` 分隔（与 editorial-header 同源约定）。issue-banner 形态由此承担。

export const keyNumberContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim()
    const value = ctx.attrs.value ?? '0'
    const meta = ctx.attrs.meta ?? ''
    const wrapperCSS = inline(ctx.containers.keyNumber)
    const valueCSS = inline(ctx.innerStyles.keyNumberValue)
    const kickerCSS = inline(ctx.innerStyles.keyNumberKicker)
    const kickerRow = kicker
      ? `<section class="container-key-number__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
      : ''
    const valueRow = `<section class="container-key-number__value" style="${valueCSS}">${escText(value)}</section>\n`

    if (meta) {
      const lines = meta.split(' / ').map((s) => s.trim()).filter(Boolean)
      const tableCSS = `display:table;width:100%;table-layout:auto`
      const leftCellCSS = `display:table-cell;vertical-align:bottom`
      const rightCellCSS = [
        'display:table-cell',
        'vertical-align:bottom',
        'text-align:right',
        'font-family:Menlo,Monaco,monospace',
        'font-size:9px',
        'line-height:1.6',
        'letter-spacing:0.1em',
        'white-space:nowrap',
        'padding-left:10px',
      ].join(';')
      const metaInner = lines.map((s) => `<span style="display:block">${escText(s)}</span>`).join('')
      return (
        `<section class="container-key-number" style="${wrapperCSS}">\n` +
        `<section class="container-key-number__row" style="${tableCSS}">` +
        `<span style="${leftCellCSS}">${kickerRow}${valueRow}</span>` +
        `<span class="container-key-number__meta" style="${rightCellCSS}">${metaInner}</span>` +
        `</section>\n`
      )
    }

    return (
      `<section class="container-key-number" style="${wrapperCSS}">\n` +
      kickerRow +
      valueRow
    )
  },
  close: '</section>\n',
}

// see-also · 相关阅读。wrapper / title 样式由 ctx.containers.seeAlso /
// ctx.innerStyles.seeAlsoTitle 接管。

export const seeAlsoContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '延伸阅读'
    const wrapperCSS = inline(ctx.containers.seeAlso)
    const titleCSS = inline(ctx.innerStyles.seeAlsoTitle)
    return (
      `<section class="container-see-also" style="${wrapperCSS}">\n` +
      `<section class="container-see-also__title" style="${titleCSS}">${escText(title)}</section>\n`
    )
  },
  close: '</section>\n',
}
