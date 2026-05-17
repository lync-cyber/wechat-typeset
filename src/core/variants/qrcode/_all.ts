/**
 * qrcode 变体目录聚合器。
 *
 * 新增 qrcode variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 QRCODE_ORDER 控制）
 */

import bare from './bare'
import followCard from './follow-card'
import qrStack from './qr-stack'

export default [bare, followCard, qrStack]
