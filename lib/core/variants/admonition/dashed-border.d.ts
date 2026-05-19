/**
 * admonition · dashed-border
 *
 * 视觉：左侧 2px 虚线 + soft 底。虚线语义：附注性、临时性（书边"NB"标记）。
 * 与 accent-bar / double-border 的硬边界：
 *   - accent-bar:    左 3px 实线 + 浅底（"正式"备注）
 *   - dashed-border: 左 2px 虚线 + 浅底（"附注"，铅笔感）
 *   - double-border: 左 4px 双线 + 透明底（"交叉引用"）
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const dashedBorder: VariantDef<AdmonitionRenderArgs>;
export default dashedBorder;
