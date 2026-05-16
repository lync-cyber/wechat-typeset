/**
 * footnotes 变体目录聚合器。脚注 / 参考文献骨架池：
 *   - lined        一条一行 + hanging indent（默认）
 *   - inline-flow  同段流式排列 + 内滚动
 *
 * 新增 footnotes variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 FOOTNOTES_ORDER 控制）
 */

import lined from './lined'
import inlineFlow from './inline-flow'

export default [lined, inlineFlow]
