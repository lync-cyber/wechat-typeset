/**
 * 主题 SVG 资产的共享小工具。
 *
 * strip(): 主题作者写多行 SVG 方便阅读，过一遍 strip() 变单行字符串，便于拼进 HTML。
 *          wxPatch 会再做一次 id/url 清洗，但主题层先自觉不要写 id / 不加 url 引号，
 *          让 wxPatch 层保持"幂等断言"语义。
 *
 * StatusPalette / BasePalette / ExtendedPalette: 四套内置主题的 Palette 形状高度重合，
 *          只在"是否需要 secondary / textInverse"这两点分化。抽成共享类型，让新主题的
 *          assets 工厂可以按需选形，而不是各写一份几乎相同的 interface。
 */

export const strip = (s: string): string => s.replace(/\s+/g, ' ').trim()

/**
 * 整数 → 罗马数字（1..50 覆盖杂志特稿章节 / 人生阶段 的上限情形）。
 * people-story 的 h2RomanNumerals 行为 + stepBadge 罗马徽章共用此函数。
 */
export function toRoman(n: number): string {
  const map: Array<[number, string]> = [
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let out = ''
  let x = n
  for (const [v, r] of map) {
    while (x >= v) {
      out += r
      x -= v
    }
  }
  return out || 'I'
}

/** 四条语义状态色（tip / warning / info / danger），4 套主题 assets 工厂都要。 */
export interface StatusPalette {
  tipAccent: string
  warningAccent: string
  infoAccent: string
  dangerAccent: string
}

/** 最小 assets 工厂入参：品牌三色 + 边界 + 四状态色。tech-geek 等冷色主题用这份。 */
export interface BasePalette extends StatusPalette {
  primary: string
  accent: string
  border: string
}

/** 加 secondary / textInverse —— business-finance / literary-humanism 这类报告 / 书卷主题用。 */
export interface ExtendedPalette extends BasePalette {
  secondary: string
  textInverse: string
}
