/**
 * quote · magazine-dropcap（杂志风格）
 *
 * 实话：CSS ::first-letter 被公众号剥离，真 dropcap 做不到。这里的 "dropcap" 指"杂志
 * 气质"——上下双粗线 + 超大斜体引号前缀 + 右对齐署名。读者识别为"杂志/评论"家族。
 *
 * italic 只用在 svgSlot 的装饰引号字符，避免影响 body 所有文字。
 */
import type { VariantDef } from '../_core';
declare const magazineDropcap: VariantDef;
export default magazineDropcap;
