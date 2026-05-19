/**
 * highlight 变体目录聚合器。新增 highlight variant 两步:
 *   1. 本目录下新建 `<id>.ts`,default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组(顺序由 variants/registry.ts 的 HIGHLIGHT_ORDER 控制)
 */

import plain from './plain'

export default [plain]
