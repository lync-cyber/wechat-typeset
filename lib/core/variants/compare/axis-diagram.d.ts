/**
 * compare · axis-diagram（包豪斯轴线图）
 *
 * svgSlot 注入水平轴线 SVG（实线 + 中点 accent 圆 + 左右端标题）+ 下方双栏正文。
 * titleCSS='' 抑制默认 title，轴线图自承担"标题区"语意。
 * 适合"现代主义 vs 后现代主义"这类对立位置的概念对比。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const axisDiagram: VariantDef<CompareRenderArgs>;
export default axisDiagram;
