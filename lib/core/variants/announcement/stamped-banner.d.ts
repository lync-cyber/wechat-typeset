/**
 * announcement · stamped-banner（盖章公告）
 *
 * 人格：官方盖章公告——左大字 title + 右侧 inline SVG 印章戳，下方正文，威权感最重。
 * 视觉骨架：顶部 display:table 双栏（左 78% title 16px bold accent / 右 22% 64×64 圆印），
 *   下方 body 14px line-height 1.7 全宽；wrapper bgSoft + 顶部 3px solid accent。
 *   印章正立——实物公章亦以"端正落章"为正式语义，不做倾斜。
 */
import type { VariantDef } from '../_core';
declare const stampedBanner: VariantDef;
export default stampedBanner;
