/**
 * admonition · marginalia（无框书页批注）
 *
 * 专为 literary-humanism 主题设计：**真正无框**——无背景、无边线、无圆角。
 * 承袭宋版书"墨围、天头、地脚"的批注传统：靠字体处理 + CJK 标点符号区分类型，
 * 而非交通灯色彩语言。
 *
 * 四态的视觉区分**不靠颜色**，而靠**符号**：
 *   - tip     → 【按】 按语（作者点评、延伸想法）
 *   - warning → 【疑】 存疑（存而待考、提醒读者）
 *   - info    → 【注】 注释（背景知识、出处交代）
 *   - danger  → 【辨】 辨误（纠正常见误解）
 *
 * 颜色统一为 secondary 墨色，不做 accent/soft 配对。差异化责任交给符号与语序。
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const marginalia: VariantDef<AdmonitionRenderArgs>;
export default marginalia;
