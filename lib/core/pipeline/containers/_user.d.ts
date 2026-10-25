/**
 * UserVariantCustom 渲染器——独立 L3 通路，不复用 makeVariantContainer。
 * custom.base === null，没有基底 render 可叠加，硬塞进 svgSlot/wrapperCSS 三段骨架
 * 会限制用户的"自由 HTML"语义。
 *
 * 安全模型：单一可信输入（用户编辑自己的变体），仅做正则替换。XSS 防御依赖
 * lintTemplateHTML 在保存期拦截事件属性 / javascript: / 禁用标签。
 */
import type { ParsedInfo } from './types';
import type { UserVariantCustom } from '../../variants/userVariant';
export interface SplitTemplate {
    open: string;
    close: string;
}
/**
 * `{{body}}` 必须恰好 1 个（lintTemplateHTML 已硬闸）。运行期兜底：缺失 → open 全段
 * + 空 close；多于 1 个 → 第一处切分，其余原样保留。不抛错，保持 markdown-it 渲染
 * 链不被单条坏数据打断。
 */
export declare function splitTemplateOnBody(template: string): SplitTemplate;
export declare function renderUserCustomOpen(uv: UserVariantCustom, info: ParsedInfo): string;
export declare function renderUserCustomClose(uv: UserVariantCustom, info: ParsedInfo): string;
/** `uc-` 前缀与内置 fence 名互斥，保证用户变体不会覆盖内置渲染器。 */
export declare function customFenceName(uvId: string): string;
