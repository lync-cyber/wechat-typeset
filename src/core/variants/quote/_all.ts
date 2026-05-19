/**
 * quote 目录聚合器。新增 quote variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 QUOTE_ORDER 决定，此处只做收集。
 */

import classic from './classic'
import magazineDropcap from './magazine-dropcap'
import columnRule from './column-rule'
import frameBrackets from './frame-brackets'
import tiltedSticker from './tilted-sticker'
import editorialBlock from './editorial-block'
import oversizedMark from './oversized-mark'
import numberedLines from './numbered-lines'
import sealKai from './seal-kai'
import doubleFrame from './double-frame'
import specimenQuote from './specimen-quote'
import binomialAttrib from './binomial-attrib'
import hugeNumeral from './huge-numeral'
import ringDevice from './ring-device'

export default [
  classic,
  magazineDropcap,
  columnRule,
  frameBrackets,
  tiltedSticker,
  editorialBlock,
  oversizedMark,
  numberedLines,
  sealKai,
  doubleFrame,
  specimenQuote,
  binomialAttrib,
  hugeNumeral,
  ringDevice,
]
