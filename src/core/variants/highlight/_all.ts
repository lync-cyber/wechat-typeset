/**
 * highlight 变体目录聚合器。新增 highlight variant 两步:
 *   1. 本目录下新建 `<id>.ts`,default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组(顺序由 variants/registry.ts 的 HIGHLIGHT_ORDER 控制)
 */

import plain from './plain'
// content-1.html 阶段 2 落地 — 4 主题 × 2 签名骨架（高亮强调）
import dottedUnderline from './dotted-underline'
import trackedEmphasis from './tracked-emphasis'
import vermilionInline from './vermilion-inline'
import sideDots from './side-dots'
import washGround from './wash-ground'
import bracketedTick from './bracketed-tick'
import geometricFlag from './geometric-flag'
import singleStroke from './single-stroke'

export default [
  plain,
  dottedUnderline,
  trackedEmphasis,
  vermilionInline,
  sideDots,
  washGround,
  bracketedTick,
  geometricFlag,
  singleStroke,
]
