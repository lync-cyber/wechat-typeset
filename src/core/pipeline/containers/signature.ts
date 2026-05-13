/**
 * 签名容器渲染器（abstract / key-number / see-also）
 *
 * 三个"带内容结构约定"的签名容器：
 *   - abstract：文章头部 tl;dr 摘要块。kicker（"Abstract / 摘要"）+ body markdown。
 *   - key-number：大字号数字 + 说明。attrs.value 放数字本体，info 放 kicker，body 放详解。
 *                 business-finance / industry-observer 的数据栏专用。
 *   - see-also：相关阅读链接列表。academic-frontier / tech-explainer 的"参考 / 扩展阅读"专用。
 *
 * 为什么不接 admonition 的 variant 分派：
 *   这三个容器**有内容结构约定**（abstract 有 kicker、key-number 有 value 显示层级），
 *   而 admonition variants 是"同内容不同骨架"的皮肤；硬塞进去会把 variant 模块污染成模板引擎。
 *   这里走"读 ctx.containers.<x> 主题 CSS 槽位 + ctx.innerStyles.<x> 内层 inline style"模式。
 *
 * R8 后子元素样式（kicker / value / title）走 ctx.innerStyles 而非 hardcoded inline——
 *   主题作者可通过 spec.innerStyles 深合并接管（如把 keyNumber 数字字号从 32px 调到 28px）。
 *   兜底值在 buildTheme.baseInnerStyles 维护,与 R8 前 hardcoded 字面值字节等价。
 *
 * 第五态 note 不在本文件——它已通过 variantKind:'note' 接入独立变体系统，
 * renderer 在 pipeline/containers/note.ts。
 */

import type { ContainerRenderer } from './types'
import { escText } from './types'
import { inlineCss as inline } from './_shared/cssInline'

// ============================================================
// abstract · 文首 tl;dr
//
// R3+R4：wrapper CSS 完全由 ctx.containers.abstract（baseContainers 兜底 + spec.containers
// 深合并）决定；renderer 只负责结构（section + kicker）。
// R8: kicker CSS 由 ctx.innerStyles.abstractKicker 决定（baseInnerStyles 兜底 + spec.innerStyles
// 深合并），renderer 不再 hardcoded。
// ============================================================

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

// ============================================================
// key-number · 大数字 + 说明
//
// R3：从 baseContainers.keyNumber 读 wrapper CSS——主题 voice 通过 spec.containers.keyNumber
// 深合并接管。renderer 不再硬涂底色。
// R8: value / kicker 子元素 CSS 走 ctx.innerStyles —— 主题作者可调整数字字号 / 字距 /
// kicker 颜色等,无需改 renderer。
// ============================================================

export const keyNumberContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim()
    const value = ctx.attrs.value ?? '0'
    const wrapperCSS = inline(ctx.containers.keyNumber)
    const valueCSS = inline(ctx.innerStyles.keyNumberValue)
    const kickerCSS = inline(ctx.innerStyles.keyNumberKicker)
    const kickerRow = kicker
      ? `<section class="container-key-number__kicker" style="${kickerCSS}">${escText(kicker)}</section>\n`
      : ''
    return (
      `<section class="container-key-number" style="${wrapperCSS}">\n` +
      kickerRow +
      `<section class="container-key-number__value" style="${valueCSS}">${escText(value)}</section>\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// see-also · 相关阅读
//
// R3：从 baseContainers.seeAlso 读 wrapper CSS——主题 voice 通过 spec.containers.seeAlso
// 深合并接管。renderer 不再硬涂底色。
// R8: title 子元素 CSS 走 ctx.innerStyles.seeAlsoTitle —— 主题作者可调整字距 / 颜色等。
// ============================================================

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
