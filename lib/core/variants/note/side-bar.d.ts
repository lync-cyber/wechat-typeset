/**
 * note · side-bar
 *
 * 视觉：左侧标线 + 左缩进，经典"此处有补充"批注式。
 * 与 admonition/accent-bar 区别：色彩走 border / textMuted（中性），不情绪。
 *
 * 6 主题共用此 variant 的差异化点（同骨架不同笔触）走 token：
 *   - 颜色  ← tokens.colors.noteBorder ?? tokens.colors.border
 *   - 线型  ← tokens.colors.noteBorderStyle ?? 'solid'
 *   - 线宽  ← tokens.colors.noteBorderWidth ?? 2（double 强制 ≥ 3 才能看到双线）
 *
 * 主题作者不需再去 `spec.containers.note` 写 `border-left:...` —— 该写法被
 * 变体的 inline wrapperCSS 屏蔽（inline > stylesheet），过去 4 个主题里"以为生效
 * 实则被覆盖"的设置由此次重构修正。
 */
import type { VariantDef } from '../_core';
declare const sideBar: VariantDef;
export default sideBar;
