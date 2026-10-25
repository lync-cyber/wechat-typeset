/**
 * admonition · bubble-organic（有机气泡）
 *
 * 专为 life-aesthetic 主题设计：彻底摆脱"左 3px 竖线"的工业矩阵语法。
 * 视觉语汇取自手绘笔记、信笺边栏、杂志页边空白的"柔物"：
 *   - 大圆角（18px），手绘式的气泡轮廓
 *   - 无硬边框；改用 `box-shadow` 的**横向软阴影**作边缘提示
 *     （单侧 inset + 单层柔阴影 = 悬浮轻盈感，不像 Material Card 的卡片化）
 *   - warm soft bg + 可选 accent 色 inset shadow 打侧边
 *   - 大 padding，字号略暖
 *   - 标题前的图标保留（生活主题图标有圆点/对勾/叶子形的有机轮廓）
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const bubbleOrganic: VariantDef<AdmonitionRenderArgs>;
export default bubbleOrganic;
