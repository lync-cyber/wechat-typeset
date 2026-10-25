/**
 * pull-quote · stamp-quote（印章压字）
 *
 * 人格：粗野 brutalist · 印章压字。装饰由 SVG 印章承担，正文粗壮。
 * 视觉骨架：印章 ≈52×52 inline SVG（accent 描线 + 旋转方框），右对齐挂在引文上方；
 *   下方 body 段（markdown-it 渲染为 `<p>`，pull-quote 容器通过 quoteCSS 把 p 字号
 *   提到 19px / 700 weight）。wrapper 上下 2px text 色实线收紧整体重量。
 *   印章旋转走 inline SVG `<g transform="rotate(...)">`，CSS transform 在公众号会被剥。
 * 与 giant-mark 的差异：装饰更"重"（旋转印章 rather than 装饰引号），引文整体粗壮。
 */
import type { VariantDef } from '../_core';
declare const stampQuote: VariantDef;
export default stampQuote;
