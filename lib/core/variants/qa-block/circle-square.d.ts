/**
 * qa-block · circle-square（包豪斯 圆 vs 方）
 *
 * 设计稿 04·A：24×24 圆环徽章承载 Q（border 2px + border-radius:50%，文字色）+
 * 24×24 实心方块徽章承载 A（accent 底 textInverse 字）。圆描问、方答 = 包豪斯几何对照。
 * 与 compare.paired-shape 同形不同 kind：compare 是两栏内容比对，qa-block 是单 Q 单 A。
 */
import type { VariantDef } from '../_core';
declare const circleSquare: VariantDef;
export default circleSquare;
