/**
 * admonition · news-underline（苏黎世栅格 multi-callout）
 *
 * swiss-grid 家族签名：每态实色徽章（INFO/TIP/WARN/STOP）+ 1px 黑竖线分隔 +
 * 1px 黑底线下划线。区别于 news-row 的"左 3px 色条 + 紧凑罗列"——
 * news-underline 把视觉权交给徽章本身（设计稿 02-swiss-grid.html `multi-callout`
 * 母本）：每条独立 ::: 块在视觉上自然成一条数据栏，下划线串起四态而无需 :::: 外框。
 *
 * 实现纪律：
 *   - 布局 `display:table` + `display:table-cell`（不用 flex —— wxPatch 会 flex→block）
 *   - 徽章 padding 4px 8px / font-size 9px / letter-spacing 0.15em（设计稿值）
 *   - 正文 padding 4px 10px / font-size 12px / line-height 1.45（line-height 不大于 1.5
 *     才能让徽章 cell 不被 stretch 拉成"过高的药丸"）
 *   - WARN 用黑字（橙底配黑字，对比度），其余三态走 textInverse 白字
 *   - 行底 border-bottom:1px solid c.text 提供下划线 —— 四态独立 ::: 块连续罗列时
 *     视觉自然贴合成 multi-callout 列
 *   - 不渲染主题 icon：信号靠色相 + 大写徽章字
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const newsUnderline: VariantDef<AdmonitionRenderArgs>;
export default newsUnderline;
