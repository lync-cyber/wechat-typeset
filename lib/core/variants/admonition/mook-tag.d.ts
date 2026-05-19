/**
 * admonition · mook-tag（編集附注 · 単字 CJK 标签）
 *
 * 专为 editorial-mook 主题设计：参照 POPEYE / BRUTUS 系 mook 刊"編集メモ"
 * 的母语形态——四态用**单字 CJK 标签** + 米卡纸底 + 主色左竖条 + 标签同色：
 *
 *   - tip     → 参 （参考；推荐做法）
 *   - info    → 編 （編集メモ；编辑注解）
 *   - warning → 注 （注意；轻度提醒）
 *   - danger  → 禁 （禁忌；明确不可做）
 *
 * 视觉与 ledger-cell / marginalia 的差异：
 *   - ledger-cell 走"深色表头条 + 数据感"，强调金融正式；
 *   - marginalia 走"无框墨色一色"，文人手稿气；
 *   - mook-tag 走"米卡纸底 + 单字 inline 标签"，编辑栏目刊感；
 *     用单字而非缩写词 / 大写徽章，承袭日系 mook 编集所附注的紧凑语义。
 *
 * 渲染纪律：
 *   - 用 display:table + display:table-cell 实现"标签 + 正文"横向贴齐
 *     （public-account 不剥 table，剥 flex）
 *   - 标签格 24px 固定宽 + 主色加粗；正文格自适应宽
 *   - titleCSS='' 暗号：renderer 跳过默认标题行，由 svgSlot 承担 label
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const mookTag: VariantDef<AdmonitionRenderArgs>;
export default mookTag;
