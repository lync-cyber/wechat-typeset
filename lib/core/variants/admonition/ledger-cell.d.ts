/**
 * admonition · ledger-cell（账本单元格）
 *
 * 专为 business-finance 主题设计：从 Bloomberg Terminal、FT Markets 表格
 * 吸取视觉语言——**零圆角、硬边框、深色表头条**。
 *
 * 结构：
 *   - 全 1px 实线边框（accent 色），无圆角
 *   - 顶部整条 accent 填充的"表头行"：textInverse 白字 + 全大写 + 高字距
 *     （仿 Bloomberg 蓝色条 / 财报 disclosure 章头）
 *   - 正文在 soft 底上，字号略小，letter-spacing 稍紧，强调数据密度
 *   - 标题行本身就是数据表的列头，不另起 icon/title section
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const ledgerCell: VariantDef<AdmonitionRenderArgs>;
export default ledgerCell;
