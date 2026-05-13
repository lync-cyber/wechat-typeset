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
 *   这里走"读 ctx.containers.<x> 主题 CSS 槽位 + token 驱动内部小元素 inline style"模式。
 *
 * 第五态 note 不在本文件——它已通过 variantKind:'note' 接入独立变体系统，
 * renderer 在 pipeline/containers/note.ts。
 */

import type { CSSObject } from '../../themes/types'
import type { ContainerRenderer } from './types'
import { escText } from './types'

/**
 * 把 CSSObject 转成 inline style 字符串。
 * 数字按 px 处理（与 themeCSS 同语义），空值剔除。
 */
function inline(obj: CSSObject | undefined): string {
  if (!obj) return ''
  const decls: string[] = []
  for (const [k, raw] of Object.entries(obj)) {
    if (raw === undefined || raw === null || raw === '') continue
    const v = typeof raw === 'number' ? `${raw}px` : String(raw).trim()
    if (!v) continue
    decls.push(`${k.trim()}:${v}`)
  }
  return decls.join(';')
}

// ============================================================
// abstract · 文首 tl;dr
//
// R3+R4：wrapper CSS 完全由 ctx.containers.abstract（baseContainers 兜底 + spec.containers
// 深合并）决定；renderer 只负责结构（section + kicker）+ 内部小元素 inline style。
// ============================================================

export const abstractContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '摘要'
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.abstract)
    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:11px',
      'font-weight:700',
      'letter-spacing:2px',
      'text-transform:uppercase',
      'margin-bottom:6px',
    ].join(';')
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
// ============================================================

export const keyNumberContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim()
    const value = ctx.attrs.value ?? '0'
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.keyNumber)
    const valueCSS = [
      `color:${c.primary}`,
      'font-size:32px',
      'font-weight:700',
      'line-height:1.1',
      'letter-spacing:-0.5px',
      'margin-bottom:4px',
    ].join(';')
    const kickerCSS = [
      `color:${c.textMuted}`,
      'font-size:12px',
      'font-weight:600',
      'letter-spacing:1px',
      'text-transform:uppercase',
      'margin-bottom:8px',
    ].join(';')
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
// ============================================================

export const seeAlsoContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '延伸阅读'
    const c = ctx.tokens.colors
    const wrapperCSS = inline(ctx.containers.seeAlso)
    const titleCSS = [
      `color:${c.textMuted}`,
      'font-size:11px',
      'font-weight:700',
      'letter-spacing:2px',
      'text-transform:uppercase',
      'margin-bottom:8px',
    ].join(';')
    return (
      `<section class="container-see-also" style="${wrapperCSS}">\n` +
      `<section class="container-see-also__title" style="${titleCSS}">${escText(title)}</section>\n`
    )
  },
  close: '</section>\n',
}
