/**
 * admonition · report-section（研究报告 §）
 *
 * 专为 industry-observer 主题设计：在 pill-tag 基础上加强"内参/周刊"气质——
 *   - 顶部 3px accent 实线 + 底部 1px accent 实线（报告章节双规格线）
 *   - 标题前置条款编号 `§` + 可选用户文案（像研究报告的 §01 / §2.3 结构）
 *   - 胶囊标签从 pill-tag 的圆角胶囊 → **方角 tag**（更"报告"而非"Web"）
 *   - 无圆角，数据感
 *   - 标题使用 accent 色填充背景 + textInverse 文字 + 全大写 + 明确的章节序号符
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const reportSection: VariantDef<AdmonitionRenderArgs>;
export default reportSection;
