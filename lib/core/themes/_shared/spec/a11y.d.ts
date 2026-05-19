/**
 * Palette 对比度校验（PersonaSpec 视角）。
 *
 * 与 validate.ts 的边界：
 *   - validate：结构合规（hex 格式、字段齐全、variant id ∈ 白名单）
 *   - a11y：语义合规（"渲染出来的颜色对人眼可读"）
 *
 * 覆盖范围纪律——只检查 baseElements 与各 admonition variant **真实使用**的色对，
 * 不做"穷举所有 N×N 组合"那种伪覆盖；伪覆盖会冒出"textMuted on preBg"之类
 * 永远不会渲染的假阳性。每加一对都要能在 buildTheme.baseElements 或 variant 模块
 * 找到对应渲染代码。
 */
import type { WtError } from '../../../errors';
import type { PersonaSpec } from './types';
/**
 * "无障碍债务"显式登记表。与 LOW_VOICE_TEMPORARY_GRACE 同模式：
 * 把"暂时拗不过设计原型/品牌色"的违例摆到明面，便于后续逐条清账。
 *
 * 键格式：`<themeId>:<fg>/<bg>` 或 `<themeId>:status.<key>`。
 * 登记后该违例从 error 降级为 warning（不阻断 validateSpec），但仍在 issues 中可见。
 *
 * 移除流程：调整 palette 让对应色对达到 4.5:1（正文）/ 3.0:1（大字/状态），删本条。
 */
export declare const A11Y_TEMPORARY_GRACE: ReadonlySet<string>;
/**
 * 校验 spec 全部色对的 WCAG 对比度。返回 `{ errors, warnings }`,
 * 由 validateSpec 合并进总结果。
 *
 * 未声明的可选字段（preBg/preText 等）按 buildTheme 兜底值参与计算——这样
 * 即便主题作者没显式声明 preBg，仍会校验 `<pre>` 真实渲染的对比度。
 */
export declare function analyzeContrast(spec: PersonaSpec): {
    errors: WtError[];
    warnings: WtError[];
};
