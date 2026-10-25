/**
 * dialogue · qa-rows（default · 访谈整理稿）
 *
 * 人格：访谈整理稿。Q 强 / A 弱纵向交替——左侧 24px 方块徽章 + 右侧 name kicker + 多段 body。
 * 视觉骨架：每轮 display:table 双栏（24px 徽章 + 自动正文）；Q=主色实心方块白字，
 *   A=textMuted 描边方块。轮间 18px 纵向间距。Q/A 视觉权重严格不对称。
 */
import type { VariantDef } from '../_core';
declare const qaRows: VariantDef;
export default qaRows;
