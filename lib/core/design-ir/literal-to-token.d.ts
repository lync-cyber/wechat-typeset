/**
 * 字面色 → ctx.tokens 路径反查（设计稿主题维度）。
 *
 * 本模块的对外契约：
 *
 *   1. `DESIGN_THEME_TO_RECOMMENDED_THEME` —— 设计稿主题 t1/t2/t3/t4 → 推荐实现主题 id
 *      （4 张画稿切片 → 18 主题里"气质最接近"的一档）。此映射是手维的、稳定快照。
 *
 *   2. `DESIGN_THEME_LABELS` —— 同上，中文展示名。
 *
 *   3. `suggestToken(literal, designTheme)` —— IR 提取时给每个字面色配 `tokenSuggestion`。
 *      实现走两段查找：
 *        (a) 推荐主题 palette 命中（来自 [build-token-index]）→ 优先
 *        (b) 跨主题命中 → 退而求其次
 *        (c) 未命中 → null（让 LLM 显式补主题 palette 语义槽）
 *
 * 历史：旧版本手抄了 4 张 t1-t4 字面色字典（共 ~30 条）。集成 18 主题后字典已升级为
 * 从 [ORDERED_SPECS] 派生的 [build-token-index]——一份 ground truth，自动跟随 spec
 * 演进，不再手抄。
 */
import type { DesignTheme } from './types';
/** 设计稿主题 → 实现主题候选（取 [docs/design-to-impl-mapping.md] §4 表）。 */
export declare const DESIGN_THEME_TO_RECOMMENDED_THEME: Record<DesignTheme, string>;
/** 设计稿主题 → 中文展示名（debug / IR header / lookup-token 输出装饰）。 */
export declare const DESIGN_THEME_LABELS: Record<DesignTheme, string>;
/**
 * 字面 → ctx.tokens 路径建议（四级查找）。
 *
 *   1. 18 主题 palette · 推荐主题命中  → `'tokens.colors.<key>'`（最优：主题/字面双对齐）
 *   2. 画稿原型字典命中（设计稿主题切片）→ `'tokens.colors.<key>'`（次优：保留画稿快照映射）
 *   3. 18 主题 palette · 跨主题命中     → `'tokens.colors.<key>'`（兜底：让 LLM 知道该色在其它主题叫啥）
 *   4. 中性常量 / 未命中                 → null
 *
 * 不抛错——IR 阶段只标注建议。lint / diff 工具看到 null 时按需 warn。
 */
export declare function suggestToken(literal: string, designTheme: DesignTheme): string | null;
