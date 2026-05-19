/**
 * pull-quote · centered-rule（居中夹线）
 *
 * 人格：杂志正文中段"金句框" / 美术馆铭牌 / gallery placard。
 * 视觉骨架：wrapper 仅上下 1px primary 实线（无左右），引文居中 + uppercase
 *   小字 kicker（HTML span，不是 SVG），克制对称、内边距宽。
 * 与 giant-mark 的差异：无大型 SVG、居中对称、靠留白与夹线承担分量。
 */
import type { VariantDef } from '../_core';
declare const centeredRule: VariantDef;
export default centeredRule;
