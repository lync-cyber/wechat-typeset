/**
 * table-card 目录聚合器。新增 table-card variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 TABLE_CARD_ORDER 决定，此处只做收集。
 */

import ruleGrid from './rule-grid'
import zebraRows from './zebra-rows'
import keyValue from './key-value'
import priceTier from './price-tier'
import threeLineTable from './three-line-table'
import indexTable from './index-table'
import vermillionGrid from './vermillion-grid'

export default [ruleGrid, zebraRows, keyValue, priceTier, threeLineTable, indexTable, vermillionGrid]
