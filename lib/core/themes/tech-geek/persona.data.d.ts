/**
 * tech-geek · 极客夜行 · PersonaSpec
 *
 * 定位（规范 §0）：**工程师写作**，不是"程序员皮肤"。参照 Plan 9 的 manpage、
 * Phrack 的 ASCII zine 骨架、ACM Queue 的白皮字距、Fabien Sanglard 暗底复古印刷、
 * Knuth 的 TAOCP 章节号与脚注。气质关键词：**成年、克制、琥珀、脚注**。
 *
 * 落地四根红线（规范 §4）：
 *   1. primary = #c89759 VT220 琥珀（**不再是** #4ec9b0 VSCode 青绿）—— 彻底脱离 IDE 皮肤污名
 *   2. 四态 admonition 靠**注释前缀 + 边框样式 + 图标形状**四重冗余区分，不靠色差：
 *      tip=dashed-border / warning=accent-bar / info=double-border / danger=top-bottom-rule
 *   3. 删除 dividerFlower 频谱条 & 原 sectionCorner 窗口装饰，motif 语汇从
 *      "VSCode 装饰"迁到"manpage 印刷"（§ / ¶ / ⁂ / `[n]`）
 *   4. 深底字重纪律：正文 500（非 400 —— 深底光晕效应会让 400 发虚），
 *      强调 600，严禁 700/800 在大字号主色位（会变"塑料硬边"霓虹招牌）
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
