/**
 * compare 目录聚合器。新增 compare variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 COMPARE_ORDER 决定，此处只做收集。
 */

import columnCard from './column-card'
import stackedRow from './stacked-row'
import ledger from './ledger'
import dataCard from './data-card'
import pairedSpecimen from './paired-specimen'
import measurementTable from './measurement-table'
import pairedShape from './paired-shape'
import axisDiagram from './axis-diagram'

export default [columnCard, stackedRow, ledger, dataCard, pairedSpecimen, measurementTable, pairedShape, axisDiagram]
