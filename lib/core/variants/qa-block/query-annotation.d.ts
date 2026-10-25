/**
 * qa-block · query-annotation（宋本批注 设问 + 注）
 *
 * 设计稿 02·B：设问行夹在上下两条 1px 主色实线之间，前置 letter-spaced CJK
 * kicker "設・問"；注解行无框、左侧 hanging 缩进 20px 内嵌"註" kicker。
 * 注：原稿 position:absolute 在公众号被剥，降级为 display:table + 首列固定宽。
 */
import type { VariantDef } from '../_core';
declare const queryAnnotation: VariantDef;
export default queryAnnotation;
