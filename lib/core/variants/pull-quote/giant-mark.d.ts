/**
 * pull-quote · giant-mark（装饰巨号 · default）
 *
 * 人格：人物特稿杂志的 pull-quote 母本。装饰巨号 SVG 引号统领，大字左对齐。
 * 视觉骨架：上方 64×48 inline SVG 引号字符（path 描线，accent 色，stroke 2px），
 *   下方 body 段（markdown-it 渲染为 `<p>`，pull-quote 容器通过 quoteCSS 把 p 字号
 *   提到 19px / 600 weight 左对齐）。无边框无填充，留白与字号承担分量。
 *
 * tokens 暴露：title/body 的颜色与字号——这四个字段是用户最常想调的"金句重音"控制点。
 * SVG 引号颜色不开放：stroke 是 SVG 属性而非 CSS 属性，var() 在 attr 上不生效；
 * 想换引号色得走 patch 档（直接覆盖 svgSlot），不是 L1 tokens 能解决的范围。
 */
import type { VariantDef, TokenSchema } from '../_core';
export declare const tokenSchema: TokenSchema;
declare const giantMark: VariantDef;
export default giantMark;
