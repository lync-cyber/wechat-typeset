/**
 * sectionTitle · ribbon-stamp
 *
 * 视觉：标题左侧 inline-block 实色印章（containing 1-2 个 CJK 字 or "§"）+ 标题文字。
 * 印章背景走 primary，文字走 textInverse；attrs.stamp 覆盖默认字符。
 * 与 cornered（svg corner）区别：印章是矩形戳记，更"刊物章"；cornered 是 L-bracket 装饰。
 */
import type { VariantDef } from '../_core';
declare const ribbonStamp: VariantDef;
export default ribbonStamp;
