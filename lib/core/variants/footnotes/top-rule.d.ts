/**
 * footnotes · top-rule（报纸尾注 / 财经简报底栏）
 *
 * 设计语言：印刷报纸 / WSJ / 财新简报的"END NOTES"栏。
 *   - 单根 hairline 横线 above 收束正文
 *   - 字号 11px、行高 1.55、灰度文字——把信息密度推到顶
 *   - kicker 走 uppercase wide-letter-spacing 的"小标题"模板，靠右压住分隔线
 *   - 无背景、无边框、无圆角——克制到只剩"信息载体"
 *
 * 适合主题：tech-explainer / swiss-grid / business-finance / industry-observer
 * ——任何"事实索引压在文末"的内参 / 简报家族。
 *
 * 与 boxed-aside / dense-academic 的分工：
 *   - boxed-aside    = 卡片化"narrative aside"
 *   - dense-academic = 论文 bibliography 级深 hanging
 *   - top-rule       = 报纸尾注（**本文件**）—— 视觉上最克制的一档
 */
import type { VariantDef } from '../_core';
declare const topRule: VariantDef;
export default topRule;
