/**
 * tech-explainer · 白昼课堂技术文档 · PersonaSpec
 *
 * 定位（规范 §0）：这不是"程序员博客皮肤"，是"一份可以逐字跟做的技术产品文档"。
 * 参照坐标：Stripe Docs / Tailwind Docs / MDN / Linear changelog / Vercel 官方文档。
 * 气质关键词：白昼、课堂、友好、引导。
 *
 * 与 tech-geek 的硬边界（规范 §0）：
 *   - 色系 180° 反向（琥珀暖暗 vs 文档蓝清凉白）
 *   - motif 语系完全隔离（manpage vs kbd / $ / 文件路径胶囊 / copyIcon）
 *   - 读者关系完全不同（已懂工程师的冷静随笔 vs 手把手带你做的产品文档）
 *
 * 三条不可妥协决策（规范 §4）：
 *   1. primary = #0066cc Stripe 文档蓝（非紫 SaaS 味、非绿 success 冲突）
 *   2. codeBlock variant = 'header-bar'（Stripe Docs 的 signature）
 *   3. 与 tech-geek 三条硬边界不可破
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
