/**
 * business-finance · 硬核财经 · PersonaSpec
 *
 * 定位（规范 §0）：**研究所内参**（FT 中文 / 财新周刊 / Bloomberg Terminal / HBR pull-quote）。
 * 不是券商研报 PPT，不是 A 股直播间。气质关键词：报告、数据、分栏、纪律。
 *
 * 落地五根红线（规范结语）：
 *   1. primary = #2a1a14 深栗墨（**不再是红** —— 旧值 #b1252b 与 danger 同色相撞色）
 *      红色彻底让给 danger 与 K 线"涨柱" —— 稀缺即贵气
 *   2. warning = #7e5a12 琥珀（脱离红系，与 primary 色相拉开 60°+）
 *   3. 四态 admonition 靠**四种形状** 而非色差区分：
 *      tip=accent-bar / info=minimal-underline / warning=pill-tag / danger=ticket-notch
 *   4. `<strong>` 字重 600（不是 800）—— 全页 800 = 没有重点
 *   5. 所有容器 radius ≤ 2（报告直角；radius ≥ 6 直接打回）
 *
 * 视觉细节：dividerWave 底部基线 stroke-width 1.0（< 1 平台光栅化失真，validator 硬下限）。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
