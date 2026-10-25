/**
 * quote · editorial-block（设计磁砖）
 *
 * 视觉：左侧 6px primary 实色色条 + 浅底 + 大号粗体左对齐正文 + 大写字距 byline。
 * 适用：editorial / data-brief 风格刊物——抽离"pull-quote"做版面节奏，与 column-rule
 * 的"克制双线"成对（编辑部"重点段落 vs 直接引述"区分）。
 *
 * byline 走 uppercase + letter-spacing + 12px：印刷体大字距小字感（"— J. L. BORGES · 1960"）。
 * font-family 不写——wxPatch 会剥；视觉差异由 weight/size/transform/letter-spacing 承担。
 */
import type { VariantDef } from '../_core';
declare const editorialBlock: VariantDef;
export default editorialBlock;
