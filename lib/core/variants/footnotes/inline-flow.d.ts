/**
 * footnotes · inline-flow。
 * 视觉：所有条目同段流式排列（条目间作者用 `·` / `／` 分隔），
 * 加 max-height + overflow-y 让内部滚动而非顶版。
 * 适合 20+ 条长文献列表；公众号 inline overflow 实测保留（参 mdnice .multiquote-1）。
 */
import type { VariantDef } from '../_core';
declare const inlineFlow: VariantDef;
export default inlineFlow;
