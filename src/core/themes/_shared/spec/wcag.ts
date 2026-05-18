/**
 * WCAG 对比度计算（纯数学）。
 *
 * 边界：本文件不知道 PersonaSpec、不知道 palette 字段名；只接受 hex 字符串。
 * 业务侧"哪两对该比对、哪个阈值适用"放在 a11y.ts；本文件只负责"给定两色得比值"。
 *
 * 公式参考 WCAG 2.1 §1.4.3 Relative luminance：
 *   L = 0.2126 R + 0.7152 G + 0.0722 B
 *   contrast = (L_light + 0.05) / (L_dark + 0.05)
 */

/** WCAG AA 正文（< 18px 或 < 14px 加粗）阈值。 */
export const WCAG_AA_NORMAL = 4.5
/** WCAG AA 大字（≥ 18px 或 ≥ 14px 加粗）/ 非文字图形阈值。 */
export const WCAG_AA_LARGE = 3.0
/** WCAG AAA 正文阈值（仅作为 warning 提示，不作 error）。 */
export const WCAG_AAA_NORMAL = 7.0

interface Rgb {
  r: number
  g: number
  b: number
}

function parseHex(hex: string): Rgb | null {
  if (typeof hex !== 'string') return null
  const m = /^#([0-9a-fA-F]{3,8})$/.exec(hex.trim())
  if (!m) return null
  const body = m[1]
  let r: number, g: number, b: number
  if (body.length === 3) {
    r = parseInt(body[0] + body[0], 16)
    g = parseInt(body[1] + body[1], 16)
    b = parseInt(body[2] + body[2], 16)
  } else if (body.length === 6 || body.length === 8) {
    // length 8 = #RRGGBBAA；alpha 不参与对比计算
    r = parseInt(body.slice(0, 2), 16)
    g = parseInt(body.slice(2, 4), 16)
    b = parseInt(body.slice(4, 6), 16)
  } else {
    return null
  }
  return { r, g, b }
}

function channelLuminance(c8: number): number {
  const c = c8 / 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function relativeLuminance(hex: string): number | null {
  const rgb = parseHex(hex)
  if (!rgb) return null
  return (
    0.2126 * channelLuminance(rgb.r) +
    0.7152 * channelLuminance(rgb.g) +
    0.0722 * channelLuminance(rgb.b)
  )
}

/**
 * 计算两色 WCAG 对比比值（>= 1）。任一参数非法 hex 时返回 NaN，调用方自行处置。
 */
export function wcagRatio(fg: string, bg: string): number {
  const lf = relativeLuminance(fg)
  const lb = relativeLuminance(bg)
  if (lf === null || lb === null) return NaN
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf]
  return (hi + 0.05) / (lo + 0.05)
}
