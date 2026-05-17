/**
 * PersonaSpec 平台硬约束（单一真源）。
 *
 * 设计为依赖图叶子：本文件只 export 常量，不 import 任何项目内模块。
 * - validate.ts / typography-rules.ts 共同消费这些常量并构建校验逻辑
 * - schema.ts 直接消费生成 JSON Schema
 * - scripts/build-capabilities.ts 消费生成 capabilities.json 的 hardRules 段
 *
 * 改阈值 = 改本文件一处，下游（validator / schema / capabilities）自动跟进。
 */

/** hex 颜色匹配（#RGB / #RGBA / #RRGGBB / #RRGGBBAA）。 */
export const HEX_RE = /^#[0-9a-fA-F]{3,8}$/

/** WeChat 客户端 < 14px 触发模糊光栅化，正文 / motif 字号下限。 */
export const MIN_FONT_SIZE = 14

/** motif 线宽下限：< 1px 在公众号客户端的二次缩放下消失。 */
export const MIN_STROKE_WIDTH = 1

/** 平台允许的 font-family 白名单（其余值在 motif primitive 上一律 reject）。 */
export const ALLOWED_FONT_FAMILIES: ReadonlySet<string> = new Set([
  'serif',
  'sans-serif',
  'monospace',
])
