/**
 * compare 目录聚合器。新增 compare variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 COMPARE_ORDER 决定，此处只做收集。
 */

import columnCard from './column-card'
import stackedRow from './stacked-row'
import ledger from './ledger'

export default [columnCard, stackedRow, ledger]
