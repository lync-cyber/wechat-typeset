/**
 * 签名容器渲染器
 *
 * 补齐 SUPPORTED_SIGNATURE_CONTAINERS 里有条目但注册表缺实现的容器：
 *   - note：第五态提示。视觉逻辑与 tip/info/warning/danger 同骨架，但颜色走 textMuted
 *           （不抢色），图标用 motifs.noteIcon。容器层不依赖 status 四态 palette。
 *   - abstract：文章头部 tl;dr 摘要块。bgSoft 底 + 左竖条 + 小字号 kicker "Abstract / 摘要"。
 *   - key-number：大字号数字 + 说明。attrs.value 放数字本体，info 放 kicker，body 放详解。
 *                 business-finance / industry-observer 的数据栏专用。
 *   - see-also：相关阅读链接列表。academic-frontier / tech-explainer 的"参考 / 扩展阅读"专用。
 *
 * 为什么不接 admonition 的 variant 分派：
 *   这四个是"带内容结构约定"的容器（abstract 有 kicker、key-number 有 value 显示层级），
 *   而 admonition variants 是"同内容不同骨架"的皮肤；硬塞进去会把 variant 模块污染成模板引擎。
 *   这里走最简单的固定外框 + token 驱动颜色。
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
// note · 第五态
//
// 主题驱动：先读 ctx.containers.note，主题没声明（空对象）时回到"克制兜底"——
// 顶端 1px 短分隔线 + textMuted 标题 + 缩进，无背景无左条，规避反复出现的
// "border-left + bg-soft" AI slop 模板。主题需要更"框感"可在 spec.containers.note
// 里自行声明（见 default 主题）。
// ============================================================

export const noteContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '补注'
    const icon = (ctx.assets.noteIcon as string | undefined) ?? ''
    const c = ctx.tokens.colors
    const themeStyle = inline(ctx.containers.note)
    // 兜底：完全无装饰——只留呼吸 margin。主题想要"框感/左条"在 spec.containers.note
    // 里自行声明；不在通用渲染器里塞默认背景或左条，避免反复出现的视觉同质化。
    const fallback = 'margin:16px 0;padding:0'
    const wrapperCSS = themeStyle || fallback
    const titleCSS = [
      `color:${c.textMuted}`,
      'font-weight:600',
      'font-size:13px',
      'margin-bottom:4px',
      'letter-spacing:0.3px',
    ].join(';')
    return (
      `<section class="container-note" style="${wrapperCSS}">\n` +
      `<section class="container-note__title" style="${titleCSS}">${icon}${escText(title)}</section>\n`
    )
  },
  close: '</section>\n',
}

// ============================================================
// abstract · 文首 tl;dr
// ============================================================

export const abstractContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '摘要'
    const c = ctx.tokens.colors
    const wrapperCSS = [
      `background-color:${c.bgSoft}`,
      `border-left:4px solid ${c.primary}`,
      'padding:14px 16px 14px 18px',
      'margin:18px 0 24px',
      'border-radius:4px',
    ].join(';')
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
// ============================================================

export const keyNumberContainer: ContainerRenderer = {
  open: (ctx) => {
    const kicker = ctx.info.trim()
    const value = ctx.attrs.value ?? '0'
    const c = ctx.tokens.colors
    const wrapperCSS = [
      `background-color:${c.bgSoft}`,
      'padding:16px 18px',
      'margin:18px 0',
      'border-radius:6px',
      `border-top:3px solid ${c.primary}`,
    ].join(';')
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
// ============================================================

export const seeAlsoContainer: ContainerRenderer = {
  open: (ctx) => {
    const title = ctx.info.trim() || '延伸阅读'
    const c = ctx.tokens.colors
    const wrapperCSS = [
      `background-color:${c.bgSoft}`,
      'padding:14px 16px',
      'margin:20px 0',
      'border-radius:6px',
      `border-left:3px solid ${c.secondary}`,
    ].join(';')
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
