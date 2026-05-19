/**
 * divider · seal-mark（大色块印章右对齐）
 *
 * 消费 theme.assets.sealMark；右对齐 "全文收束" 签名印。
 * 与设计稿 02 swiss-grid signoff（20×20 红方块右对齐）一致。
 * 缺 assets.sealMark 时退化为纯色 12×12 主色方块（DOM 上自渲染，不依赖资产）。
 */
import type { VariantDef } from '../_core';
declare const sealMark: VariantDef;
export default sealMark;
