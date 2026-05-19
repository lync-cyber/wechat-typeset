/**
 * 几何 diff：baseline IR （从设计稿提取） vs actual IRBox （从 variant render 输出解析）。
 *
 * 输出形态：`GeometryDiff[]`，每条带 prop / baseline / actual / severity / hint。
 *
 *   - severity: 'error' = 几何根本错（width 差 ≥ 4px、display 完全不一致）
 *   - severity: 'warning' = 容差边缘 / 颜色字面对不上但 token 一致
 *   - severity: 'info' = 设计稿用了被禁的 modern CSS（flex/grid），实现侧应当走 table 降级
 *
 * 不对设计稿 baseline 做"修正"——baseline 里的 `display:flex` 会触发一条 info 提示
 * "实现侧应改 display:table"，而不是悄悄改 baseline。让 LLM / 开发者看到完整链路。
 */
import type { IRBox } from './types';
export type GeometryDiffSeverity = 'error' | 'warning' | 'info';
export interface GeometryDiff {
    /** 'wrapper' | 'slot[0]' | 'slot[1].badge' 等定位字符串。 */
    path: string;
    /** 属性名（驼峰，与 IRBox 字段一致）。 */
    prop: string;
    baseline: string | null;
    actual: string | null;
    severity: GeometryDiffSeverity;
    hint?: string;
}
/**
 * baseline vs actual 比对单个 IRBox。path 用于在嵌套结构里报错时定位（如 'slot[0]'）。
 *
 * 比对策略：
 *   - display 严格相等（modern CSS 在设计稿 / 兼容子集在 actual 触发 info）
 *   - 长度字段（width/padding/...）按像素 + 容差 ±2px
 *   - lineHeight 按数值 ±0.1
 *   - 颜色严格 literal 字面相等
 *   - 其它字符串字段严格相等
 *   - actual 缺字段而 baseline 有 → error（漏写）
 *   - baseline 缺字段而 actual 有 → info（多写，可能没必要但不致命）
 */
export declare function compareGeometry(baseline: IRBox, actual: IRBox, path?: string): GeometryDiff[];
