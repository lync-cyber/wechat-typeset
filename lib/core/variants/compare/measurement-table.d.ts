/**
 * compare · measurement-table（测量数据对照）
 *
 * 纵向双行 block 模拟"对照表"：pros/cons 各占全宽一行，border-top 分割，
 * 标题固定 80px inline-block 作列标签，右侧正文 inline-block 跟排。
 * 降级自设计稿 03·B 四列 table-row 网格：compare slot 只有 pros/cons 两路，
 * 无法表达四列，采用纵向双行布局模拟"测量数据并列"语意。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const measurementTable: VariantDef<CompareRenderArgs>;
export default measurementTable;
