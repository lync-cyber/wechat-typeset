/**
 * compare · paired-shape（包豪斯圆方对照）
 *
 * 圆=描边 inline-block 徽章 vs 方=实心 inline-block 色块，通过 svgSlot 注入几何标识。
 * titleCSS='' 抑制默认 title 行，由 svgSlot 内联渲染标题。
 * 降级自设计稿 04·A：aspect-ratio 改为显式 width/height，clip-path 改为 border-radius:50%。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const pairedShape: VariantDef<CompareRenderArgs>;
export default pairedShape;
