/**
 * data-brief · 数据简报 · PersonaSpec
 *
 * 定位：晚点 LatePost / 财新数据 / 机器之心 / Morning Brew 式简报——
 * "数字是论点，图表是句子"。报告版面 + 数据蓝 + 黑底代码 + 直角硬边。
 *
 * 视觉 ground truth：docs/themes-specs/themes/11-data-brief.html。本 spec 把那份设计稿
 * 的 token / 字号 / 间距 / 容器骨架投影为 PersonaSpec，再由 specToTheme 投影为 Theme。
 *
 * 三条不可妥协决策：
 *   1. radius 全部为 0（直角硬边）—— 简报感的核心，圆角即"软"，软即"软文"
 *   2. primary = #1756d1 数据蓝（IBM Data 家族；不是 Bootstrap #007bff）
 *   3. 代码块黑底 #111418 + 浅字 #e5e7eb —— 与正文白底形成"终端 vs 报告"对照
 *
 * 签名容器 10 件：masthead / sectionTag / toc / kpiDashboard / barChart / qaBlock /
 *                  footnotes / colophon
 * 这些 renderer 在 src/pipeline/containers/databrief.ts 实现。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
