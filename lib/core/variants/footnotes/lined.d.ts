/**
 * footnotes · lined（默认骨架）。
 * 视觉：一条一行 + hanging indent（padding-left + 负 text-indent）。
 * 适合 5~10 条短引用；编号悬挂在外、正文左缘对齐。
 * DEFAULT_VARIANTS.footnotes 兜底——主题不声明 variants.footnotes 时即此。
 */
import type { VariantDef } from '../_core';
declare const lined: VariantDef;
export default lined;
