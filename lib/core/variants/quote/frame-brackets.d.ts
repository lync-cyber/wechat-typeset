/**
 * quote · frame-brackets（四角 L 形装饰框）
 *
 * 视觉：四个角用 SVG 画 L 形短角，中间完全留白，正文居中。
 *
 * 实现要点：顶/底两段独立 SVG（各 20px 高）分别走 svgSlot 与 closeSlot —— 不能用单个
 * 全高 SVG + 负 margin 假覆盖，否则正文超过 SVG 固定高度时底部 L 角会被锚死在中段。
 * 微信公众号粘贴禁用 position:absolute 与伪元素，这是当前布局下唯一稳妥的"贴顶/贴底"方案。
 */
import type { VariantDef } from '../_core';
declare const frameBrackets: VariantDef;
export default frameBrackets;
