/**
 * compare · stacked-row（上下堆叠）
 *
 * 375px 小屏上，两栏挤到每栏 ~120px 本就勉强。stacked-row 放弃"并列"的视觉，
 * 改为上下两卡片各占全宽，可读性显著提升。用边 color 区分 pros / cons。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const stackedRow: VariantDef<CompareRenderArgs>;
export default stackedRow;
