/**
 * steps · timeline-dot
 *
 * 视觉：wrapper 左侧用 2px 点线，标题前插一个主色小圆点（inline SVG），"时间轴"感。
 * 点线样式 border-left:2px dotted 在公众号稳定；真正的"连线+圆点"用 inline SVG 最可靠。
 */
import type { VariantDef } from '../_core';
declare const timelineDot: VariantDef;
export default timelineDot;
