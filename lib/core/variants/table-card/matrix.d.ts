/**
 * table-card · matrix（包豪斯热力矩阵）
 *
 * 人格：数据可视化 / 包豪斯风。行列标签 + 固定尺寸色块网格。
 * 热力梯度简化：所有数值 cells 统一用 primary 底色 + textInverse 字，不做数值→深浅映射。
 * 降级约定（BC-4）：不用 aspect-ratio:1 / display:grid；改用 display:table + width/height 显式像素。
 */
import type { VariantDef } from '../_core';
declare const matrix: VariantDef;
export default matrix;
