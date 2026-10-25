/**
 * steps · step-card
 *
 * 视觉：每个 h3 = 一张浅底卡片（bgSoft + padding + 边角），适合长说明步骤 / SOP。
 * wrapper 仅外框，h3 与 p 的卡片化由主题 elements.h3 / elements.p 承担——这里只
 * 给 wrapper 一个"容器内统一基线节奏"的 padding + 行距。
 *
 * 与 number-circle 的差别：number-circle 期望作者手写编号；step-card 让"卡片本身"
 * 承担分步视觉，编号变得可选。
 */
import type { VariantDef } from '../_core';
declare const stepCard: VariantDef;
export default stepCard;
