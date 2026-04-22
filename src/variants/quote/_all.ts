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

export default [classic, magazineDropcap, columnRule, frameBrackets]
