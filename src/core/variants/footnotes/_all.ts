/**
 * footnotes 变体目录聚合器。脚注 / 参考文献骨架池：
 *   - lined          一条一行 + hanging indent（默认）
 *   - inline-flow    同段流式排列 + 内滚动
 *   - boxed-aside    软底卡 + pill kicker（narrative aside）
 *   - top-rule       顶部 hairline + 11px 灰字密栏（报纸尾注）
 *   - dense-academic 2px 章节杆 + 2.4em 深 hanging（论文 bibliography）
 *
 * 新增 footnotes variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 FOOTNOTES_ORDER 控制）
 */

import lined from './lined'
import inlineFlow from './inline-flow'
import boxedAside from './boxed-aside'
import topRule from './top-rule'
import denseAcademic from './dense-academic'

export default [lined, inlineFlow, boxedAside, topRule, denseAcademic]
