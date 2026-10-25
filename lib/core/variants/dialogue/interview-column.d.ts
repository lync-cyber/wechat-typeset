/**
 * dialogue · interview-column（New Yorker 长访谈杂志栏）
 *
 * 人格：New Yorker / Harper's 长访谈——左列固定姓名 + 右列长答 + hairline 沟槽。
 * 视觉骨架：每轮 display:table 双栏（90px 姓名 / 自动正文）。
 *   左：全大写 + letter-spacing 0.15em + textMuted + 顶/右对齐。
 *   右：17px + line-height 1.8 + 左 1px 沟槽 + padding-left 16px。
 */
import type { VariantDef } from '../_core';
declare const interviewColumn: VariantDef;
export default interviewColumn;
