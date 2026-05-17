/**
 * Palette 对比度校验（PersonaSpec 视角）。
 *
 * 与 validate.ts 的边界：
 *   - validate：结构合规（hex 格式、字段齐全、variant id ∈ 白名单）
 *   - a11y：语义合规（"渲染出来的颜色对人眼可读"）
 *
 * 覆盖范围纪律——只检查 baseElements 与各 admonition variant **真实使用**的色对，
 * 不做"穷举所有 N×N 组合"那种伪覆盖；伪覆盖会冒出"textMuted on preBg"之类
 * 永远不会渲染的假阳性。每加一对都要能在 buildTheme.baseElements 或 variant 模块
 * 找到对应渲染代码。
 */

import type { WtError } from '../../../errors'
import type { Palette, PersonaSpec, StatusKey } from './types'
import { WCAG_AA_LARGE, WCAG_AA_NORMAL, WCAG_AAA_NORMAL, wcagRatio } from './wcag'

type PaletteKey = keyof Palette

interface PaletteContrastPair {
  fg: PaletteKey
  bg: PaletteKey
  /** 该色对实际渲染位置（用于 error message） */
  where: string
  /** 大字 (≥18px) 或装饰图形适用 3.0:1；正文适用 4.5:1 */
  largeText?: boolean
}

/**
 * baseElements 真实落地的"文字 on 底色"组合。每对都要能指回 buildTheme.baseElements 实现。
 * 增减时连同 buildTheme.ts 的对应行号检查，避免出现"validator 还在校验已删元素"。
 */
const PALETTE_CONTRAST_PAIRS: readonly PaletteContrastPair[] = [
  { fg: 'text', bg: 'bg', where: 'p / h1-h5 (baseElements.p)' },
  { fg: 'textMuted', bg: 'bg', where: 'h6 弱标题 (baseElements.h6)' },
  { fg: 'textMuted', bg: 'bgSoft', where: 'blockquote (baseElements.blockquote)' },
  { fg: 'text', bg: 'bgSoft', where: 'kbd 键帽 (baseElements.kbd)' },
  { fg: 'code', bg: 'bgMuted', where: 'inline <code> (baseElements.code)' },
  { fg: 'preText', bg: 'preBg', where: '<pre> 代码块 (baseElements.pre)' },
  // 大字/装饰：链接、h2 底边、accent strip
  { fg: 'primary', bg: 'bg', where: '链接 / h2 border / accent strip', largeText: true },
]

/**
 * "无障碍债务"显式登记表。与 LOW_VOICE_TEMPORARY_GRACE 同模式：
 * 把"暂时拗不过设计原型/品牌色"的违例摆到明面，便于后续逐条清账。
 *
 * 键格式：`<themeId>:<fg>/<bg>` 或 `<themeId>:status.<key>`。
 * 登记后该违例从 error 降级为 warning（不阻断 validateSpec），但仍在 issues 中可见。
 *
 * 移除流程：调整 palette 让对应色对达到 4.5:1（正文）/ 3.0:1（大字/状态），删本条。
 */
export const A11Y_TEMPORARY_GRACE: ReadonlySet<string> = new Set([
  // ── swiss-grid · WARN 设计黄 #f9a825 是 swiss-grid 招牌签名色，1.80:1。
  //    Phase 1.5 协商：要么换"WARN 文字色 + soft 强对比"，要么品牌让步加深一档。
  'swiss-grid:status.warning',

  // ── editorial-mook · POPEYE 朱橙 #e85a3c + Japanese mook 整套低反差配色是主题灵魂。
  //    全 7 处入 grace，Phase 1.5 与设计 owner 协商：要么改主题视觉语言，要么接受
  //    "mook 主题不为正文 a11y 兜底，只为大字 / 标题对比"的弱契约。
  'editorial-mook:textMuted/bg',
  'editorial-mook:textMuted/bgSoft',
  'editorial-mook:code/bgMuted',
  'editorial-mook:status.tip',
  'editorial-mook:status.info',
  'editorial-mook:status.warning',
  'editorial-mook:status.danger',

  // ── life-aesthetic · 暖米卡纸"做旧标签纸"配色：饱和度低、明度近，整套是品牌纹理。
  //    7 处入 grace；preText/preBg 已通过修色解决，textMuted / code / primary / 4 态状态色保留。
  'life-aesthetic:textMuted/bgSoft',
  'life-aesthetic:code/bgMuted',
  'life-aesthetic:primary/bg',
  'life-aesthetic:status.tip',
  'life-aesthetic:status.info',
  'life-aesthetic:status.warning',
  'life-aesthetic:status.danger',

  // ── late-night-vinyl · danger 4.20:1（临界 0.3）。暗底主题红色加深会进一步丢失"霓虹"质感,
  //    与 swiss-grid 设计黄同模式：留 grace，Phase 1.5 协商保留度。
  'late-night-vinyl:status.danger',
])

interface IssueSink {
  errors: WtError[]
  warnings: WtError[]
}

function emit(
  sink: IssueSink,
  path: string,
  message: string,
  inGrace: boolean,
): void {
  const entry: WtError = {
    path,
    message: inGrace ? `${message} [已登记 A11Y_TEMPORARY_GRACE]` : message,
    severity: inGrace ? 'warning' : 'error',
  }
  ;(inGrace ? sink.warnings : sink.errors).push(entry)
}

function checkPair(
  spec: PersonaSpec,
  effectivePalette: Palette,
  pair: PaletteContrastPair,
  sink: IssueSink,
): void {
  const fg = effectivePalette[pair.fg]
  const bg = effectivePalette[pair.bg]
  if (typeof fg !== 'string' || typeof bg !== 'string') return
  const ratio = wcagRatio(fg, bg)
  if (!Number.isFinite(ratio)) return
  const min = pair.largeText ? WCAG_AA_LARGE : WCAG_AA_NORMAL
  const path = `palette.${pair.fg}|${pair.bg}`
  if (ratio < min) {
    const graceKey = `${spec.id}:${pair.fg}/${pair.bg}`
    emit(
      sink,
      path,
      `${pair.where}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1 < ${min}:1 (WCAG AA ${pair.largeText ? '大字/装饰' : '正文'})`,
      A11Y_TEMPORARY_GRACE.has(graceKey),
    )
  } else if (!pair.largeText && ratio < WCAG_AAA_NORMAL) {
    sink.warnings.push({
      path,
      message: `${pair.where}: ${ratio.toFixed(2)}:1 通过 AA 未达 AAA (${WCAG_AAA_NORMAL}:1)`,
      severity: 'warning',
    })
  }
}

function checkStatusPairs(spec: PersonaSpec, sink: IssueSink): void {
  if (!spec.status) return
  for (const key of ['tip', 'info', 'warning', 'danger'] as StatusKey[]) {
    const pair = spec.status[key]
    if (!pair) continue
    const ratio = wcagRatio(pair.accent, pair.soft)
    if (!Number.isFinite(ratio)) continue
    if (ratio < WCAG_AA_NORMAL) {
      const graceKey = `${spec.id}:status.${key}`
      emit(
        sink,
        `status.${key}`,
        `admonition.${key} accent on soft: ${pair.accent} on ${pair.soft} = ${ratio.toFixed(2)}:1 < ${WCAG_AA_NORMAL}:1`,
        A11Y_TEMPORARY_GRACE.has(graceKey),
      )
    }
  }
}

/**
 * 校验 spec 全部色对的 WCAG 对比度。返回 `{ errors, warnings }`,
 * 由 validateSpec 合并进总结果。
 *
 * 未声明的可选字段（preBg/preText 等）按 buildTheme 兜底值参与计算——这样
 * 即便主题作者没显式声明 preBg，仍会校验 `<pre>` 真实渲染的对比度。
 */
export function analyzeContrast(spec: PersonaSpec): {
  errors: WtError[]
  warnings: WtError[]
} {
  const sink: IssueSink = { errors: [], warnings: [] }
  if (!spec.palette) return sink
  // 与 buildTheme.ts 兜底常量保持一致；改那边时同步这里。
  const effectivePalette: Palette = {
    ...spec.palette,
    preBg: spec.palette.preBg ?? '#2a2d32',
    preText: spec.palette.preText ?? '#d8d8d4',
  }
  for (const p of PALETTE_CONTRAST_PAIRS) checkPair(spec, effectivePalette, p, sink)
  checkStatusPairs(spec, sink)
  return sink
}
