/**
 * compare · column-card（默认）
 *
 * 两栏 CSS table 等高卡片：display:table + table-cell。flex 不行、inline-block 阶梯，
 * table 是微信粘贴后唯一稳定的等高多栏。border-spacing 吸收列间隙。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const columnCard: VariantDef<CompareRenderArgs>;
export default columnCard;
