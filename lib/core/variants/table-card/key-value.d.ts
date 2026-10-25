/**
 * table-card · key-value（双栏规格 spec sheet）
 *
 * 人格：spec sheet / `<dl>` 风。强制 2 列：左 key 35% 右 value 65%。
 * 视觉骨架：每行下 1px hairline；左列 bgSoft + monospace + 右对齐 + textMuted 加粗；
 *   右列透明底 + 左对齐 + text 色。header 行（如有）跨两列居中。
 *
 * cells 解析约定：作者写 `cells="key | value"`——非 header 行 cells.length ≠ 2 时
 *   触发一次 dev warn（renderer 仍按 fallback 渲染：少列补空、多列截断）；
 *   header=true 时整行 join 后跨两列居中（少见，key-value 通常无 header）。
 */
import type { VariantDef } from '../_core';
declare const keyValue: VariantDef;
export default keyValue;
