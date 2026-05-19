/**
 * table-card · rule-grid（default · 全网格规格清单）
 *
 * 人格：数据库 / 规格清单。每格 1px 实线边框，header 行 bgMuted + accent 色加粗。
 * 视觉骨架：wrapper 外框 1px solid border + 圆角 4px；row/cell 边框由 tableRowContainer
 *   按 variantId 分派注入。本文件仅产 wrapperCSS。
 */
import type { VariantDef } from '../_core';
declare const ruleGrid: VariantDef;
export default ruleGrid;
