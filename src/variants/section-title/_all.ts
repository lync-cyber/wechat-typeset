/**
 * section-title 目录聚合器。新增 section-title variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 SECTION_TITLE_ORDER 决定，此处只做收集。
 */

import bordered from './bordered'
import cornered from './cornered'

export default [bordered, cornered]
