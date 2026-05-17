/**
 * announcement 变体目录聚合器。文章级强警示横幅家族（与 tone 正交）。
 *
 * 新增 announcement variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 ANNOUNCEMENT_ORDER 控制）
 */

import dangerBar from './danger-bar'
import monoDisclaimer from './mono-disclaimer'
import aiNotice from './ai-notice'
import stampedBanner from './stamped-banner'

export default [dangerBar, monoDisclaimer, aiNotice, stampedBanner]
