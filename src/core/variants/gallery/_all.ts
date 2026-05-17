/**
 * gallery 变体目录聚合器。多图组合骨架池：
 *   - duo           左右 50/50 table（默认）
 *   - triptych      三联 33/33/33 table 等高
 *   - nine-grid     3×3 强制方形 inline-block 流式
 *   - ribbon-strip  横滚 64% 大图 + inset shadow 滑动提示
 *
 * 新增 gallery variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 GALLERY_ORDER 控制）
 */

import duo from './duo'
import triptych from './triptych'
import nineGrid from './nine-grid'
import ribbonStrip from './ribbon-strip'

export default [duo, triptych, nineGrid, ribbonStrip]
