/**
 * compare · paired-specimen（博物笔记标本卡）
 *
 * 两栏 table-cell + 列内 border-bottom 分割线：学术标本卡气质，斜体学名感。
 * titleCSS 走 textMuted 小号字 + letter-spacing + uppercase 模拟 "SPEC. A" 标签。
 */
import type { VariantDef, CompareRenderArgs } from '../_core';
declare const pairedSpecimen: VariantDef<CompareRenderArgs>;
export default pairedSpecimen;
