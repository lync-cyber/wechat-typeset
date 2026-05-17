/**
 * Typography 硬约束（PersonaSpec.typography 级）。
 *
 * 与 validate.ts 的边界：
 *   - validate.MIN_FONT_SIZE 守 SVG primitive 字号（motif 文字光栅化下限）
 *   - 本文件守 typography.baseSize（正文最小字号）+ 行高 / 字距 健康区间
 *
 * 两处共用 14px 下限（同一物理原因：微信公众号客户端 < 14px 会触发模糊光栅化），
 * 故直接复用 MIN_FONT_SIZE，不另立常量。
 */

import type { WtError } from '../../../errors'
import type { PersonaSpec } from './types'
import { MIN_FONT_SIZE } from './validate'

/** 行高合理区间 —— 低于 1.4 紧到挤、高于 2.0 散到失焦。 */
export const LINE_HEIGHT_MIN = 1.4
export const LINE_HEIGHT_MAX = 2.0

/** 字距上限（px）—— 大于 1px 在中文段落会拆词感太重。 */
export const LETTER_SPACING_MAX = 1.0

/**
 * 暂时容忍清单。键 = `themeId:field`：
 *   - `themeId:baseSize`        —— 设计原稿 13px 不愿改字号的主题
 *   - `themeId:lineHeight`      —— 故意拉到 2.0+ 的"夜读慢"主题
 *   - `themeId:letterSpacing`   —— 排版稿原值字距
 *
 * 同 LOW_VOICE_TEMPORARY_GRACE 模式：登记后 error → warning，但仍在 issues 中保持可见。
 */
export const TYPOGRAPHY_TEMPORARY_GRACE: ReadonlySet<string> = new Set([
  // 设计稿正文 13px：刻意保留风格，待与作者协商提升到 14px 的稿酬空间
  'editorial-mook:baseSize',
  'swiss-grid:baseSize',
  'brutalist:baseSize',
  // 故意拉宽行高（晚间慢读 / 散文呼吸感）
  'late-night-vinyl:lineHeight',
])

interface IssueSink {
  errors: WtError[]
  warnings: WtError[]
}

function emit(sink: IssueSink, themeId: string, field: string, path: string, message: string): void {
  const inGrace = TYPOGRAPHY_TEMPORARY_GRACE.has(`${themeId}:${field}`)
  const entry: WtError = {
    path,
    message: inGrace ? `${message} [已登记 TYPOGRAPHY_TEMPORARY_GRACE]` : message,
    severity: inGrace ? 'warning' : 'error',
  }
  ;(inGrace ? sink.warnings : sink.errors).push(entry)
}

export function validateTypography(spec: PersonaSpec): { errors: WtError[]; warnings: WtError[] } {
  const sink: IssueSink = { errors: [], warnings: [] }
  const t = spec.typography
  if (!t) return sink

  if (typeof t.baseSize === 'number' && t.baseSize < MIN_FONT_SIZE) {
    emit(
      sink,
      spec.id,
      'baseSize',
      'typography.baseSize',
      `${t.baseSize}px < ${MIN_FONT_SIZE}px (WeChat 客户端 < 14px 触发模糊光栅化)`,
    )
  }
  if (typeof t.lineHeight === 'number' && (t.lineHeight < LINE_HEIGHT_MIN || t.lineHeight > LINE_HEIGHT_MAX)) {
    emit(
      sink,
      spec.id,
      'lineHeight',
      'typography.lineHeight',
      `${t.lineHeight} ∉ [${LINE_HEIGHT_MIN}, ${LINE_HEIGHT_MAX}] (过紧/过散均损正文可读性)`,
    )
  }
  if (typeof t.letterSpacing === 'number' && t.letterSpacing > LETTER_SPACING_MAX) {
    emit(
      sink,
      spec.id,
      'letterSpacing',
      'typography.letterSpacing',
      `${t.letterSpacing}px > ${LETTER_SPACING_MAX}px (中文段落字距 > 1px 拆词感过重)`,
    )
  }

  return sink
}
