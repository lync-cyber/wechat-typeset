/**
 * gallery · triptych
 *
 * 人格：三联横排（panorama / 三联画 / 旅行三幕）。
 * 骨架：display:table 33/33/33 三 cell，border-spacing 6px；
 *      每图强制 height:140px + object-fit:cover —— 与 duo 的关键差异（强制等高）。
 */
import type { VariantDef } from '../_core';
declare const triptych: VariantDef;
export default triptych;
