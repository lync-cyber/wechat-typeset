/**
 * qa-block · numbered-faq（编辑部 编号 FAQ）
 *
 * 设计稿 01·A：Q.NN mono 序号 + 加粗设问 + 底线分隔 + 下方多段答复。
 * 默认骨架：DEFAULT_VARIANTS.qaBlock 指向本 id；renderer 在未声明 attrs.variant
 * 且主题 spec.variants.qaBlock 缺省时回退到此。
 */
import type { VariantDef } from '../_core';
declare const numberedFaq: VariantDef;
export default numberedFaq;
