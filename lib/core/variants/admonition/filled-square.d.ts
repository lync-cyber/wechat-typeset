/**
 * admonition · filled-square（包豪斯 v1 — 实心方块）
 *
 * content-1.html 设计稿 04·A FILLED SQUARE 的实现。顶端一行 header：
 *   [18×18 accent 实心方块] [告 示 大字距标题] [─ 横线 ─] [N° 01 mono 编号]
 * 下面接用户正文段落。signature 是"实心色方块 + 告示文字 + 中线 + 编号"四件并排
 * 单行——与同主题的 triangle-top（包豪斯 v2，框 + 三角顶徽）形成"无边框 vs 有边框"
 * 二分。
 *
 * 实现纪律：
 *   - header 走 display:table —— flex 在 wxPatch 阶段被剥成 block，四件会塌成四行
 *   - "中线"用第三个 table-cell 包一根 height:1px 横线实现，flex 的 `flex:1` 撑伸
 *     在 table-cell 里靠 width:60% + 内部 div 占满；wxPatch 友好
 *   - titleCSS=''：让 renderer 跳过默认 title 行；header 由 svgSlot 自接管
 *   - suppressIcon：本变体的视觉信号是实心方块，icon 反而成噪音
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const variantDef: VariantDef<AdmonitionRenderArgs>;
export default variantDef;
