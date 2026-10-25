/**
 * Variant 主题协调性检查（信息层 helper）。
 *
 * **不参与运行时回退**——作者 `variant=xxx` override 由 makeVariantContainer 忠实渲染。
 * 本模块只为 UI badge / 编辑器 lint 等消费方提供"当前主题是否在 variant.designedFor
 * 白名单内"的判别，方便消费方决定要不要给作者打个"为 XX 主题设计"的软提示。
 */
import { type VariantMeta } from '../../../variants/_core';
export interface CompatCheckResult {
    /** 当前主题是否在 variant.designedFor 白名单内。
     *  - designedFor 空/缺省 → ok=true（通用 variant）
     *  - designedFor 含 themeId → ok=true
     *  - 其它 → ok=false（"为别的主题设计的"，UI 应给提示） */
    ok: boolean;
}
export declare function checkVariantCompat(themeId: string, meta: VariantMeta | undefined): CompatCheckResult;
