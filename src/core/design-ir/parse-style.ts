/**
 * inline `style="..."` 字符串 → IRBox。
 *
 * 不依赖 jsdom 的 CSSOM（jsdom 解析 inline style 在 ESM 下偶有别字段名兼容问题），
 * 直接走字符串切分。设计稿的 inline style 都是手写规整的 `prop:value;prop:value;`
 * 形态，正则切分稳定。
 */

import type { IRBox, IRColor } from './types'
import { suggestToken } from './literal-to-token'
import type { DesignTheme } from './types'

/** 'a:1;b:2' → { a: '1', b: '2' } —— 容忍尾分号缺失 / 空格 / 引号内分号（如 font-family）。 */
export function parseInlineStyle(raw: string): Record<string, string> {
  if (!raw) return {}
  const out: Record<string, string> = {}
  let i = 0
  const len = raw.length
  while (i < len) {
    // skip leading whitespace / separators
    while (i < len && (raw[i] === ' ' || raw[i] === ';' || raw[i] === '\n' || raw[i] === '\r' || raw[i] === '\t')) i++
    if (i >= len) break
    // parse key up to ':'
    const keyStart = i
    while (i < len && raw[i] !== ':' && raw[i] !== ';') i++
    if (i >= len || raw[i] === ';') {
      i++
      continue
    }
    const key = raw.slice(keyStart, i).trim().toLowerCase()
    i++ // skip ':'
    // parse value up to ';' but respect quotes
    const valStart = i
    let quote: string | null = null
    while (i < len) {
      const ch = raw[i]
      if (quote) {
        if (ch === quote) quote = null
      } else {
        if (ch === '"' || ch === "'") quote = ch
        else if (ch === ';') break
      }
      i++
    }
    const value = raw.slice(valStart, i).trim()
    if (key) out[key] = value
    i++ // skip ';' or end
  }
  return out
}

/** kebab → camel（'background-color' → 'backgroundColor'）。 */
function kebabToCamel(k: string): string {
  return k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
}

const COLOR_BEARING_PROPS = new Set([
  'background',
  'background-color',
  'color',
])

/**
 * 抽 IRBox 中"对几何/装饰有意义"的字段。
 *
 * 没在白名单里的属性放进 unrecognized，让 LLM 看见但 diff 跳过。font-family 在
 * variant 实现侧禁用，但设计稿大量使用——故保留到 unrecognized 而非吃掉，方便
 * 调试时溯源（"这个字距是不是只在 Lora italic 下成立？"）。
 */
const RECOGNIZED_PROPS = new Set([
  'display',
  'table-layout',
  'width',
  'height',
  'min-width',
  'max-width',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-collapse',
  'border-spacing',
  'border-radius',
  'flex',
  'flex-shrink',
  'flex-grow',
  'flex-basis',
  'gap',
  'grid-template-columns',
  'grid-template-rows',
  'justify-content',
  'align-items',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'text-align',
  'text-decoration',
  'text-transform',
  'writing-mode',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'transform',
  'box-sizing',
  'background',
  'background-color',
  'color',
])

/** 把 'padding-top'/'right' 三类拆分压回 padding 单值字符串（4 值简化）。 */
function maybeMergeShorthand(styles: Record<string, string>, base: 'padding' | 'margin'): void {
  const four = ['top', 'right', 'bottom', 'left'].map((d) => styles[`${base}-${d}`])
  if (four.every((v) => v !== undefined)) {
    styles[base] = four.join(' ')
    for (const d of ['top', 'right', 'bottom', 'left']) delete styles[`${base}-${d}`]
  }
}

/**
 * inline style → IRBox。color/background 字面同时携带 token 建议。
 */
export function styleToBox(rawStyle: string, designTheme: DesignTheme): IRBox {
  const styles = parseInlineStyle(rawStyle)
  maybeMergeShorthand(styles, 'padding')
  maybeMergeShorthand(styles, 'margin')

  const box: IRBox = {}
  const unrecognized: Record<string, string> = {}

  for (const [key, value] of Object.entries(styles)) {
    if (COLOR_BEARING_PROPS.has(key)) {
      const color: IRColor = {
        literal: value,
        tokenSuggestion: suggestToken(value, designTheme),
      }
      if (key === 'color') box.color = color
      else box.background = color
      continue
    }
    if (!RECOGNIZED_PROPS.has(key)) {
      unrecognized[key] = value
      continue
    }
    // 一般属性：kebab → camel 写入 box
    const prop = kebabToCamel(key) as keyof IRBox
    ;(box as Record<string, unknown>)[prop] = value
  }

  if (Object.keys(unrecognized).length > 0) box.unrecognized = unrecognized
  return box
}
