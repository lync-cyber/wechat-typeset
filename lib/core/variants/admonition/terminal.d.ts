/**
 * admonition · terminal（终端窗口）
 *
 * 视觉：黑底 + 顶部灰色标题栏 + 三色圆点（红/黄/绿）。等宽字体无法指定
 *（禁 font-family）——"终端感"靠配色 + 圆点 + 标题栏承担。
 *
 * wrapperCSS padding=0：让 svgSlot 圆点行贴 wrapper 顶边不露缝。
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const terminal: VariantDef<AdmonitionRenderArgs>;
export default terminal;
