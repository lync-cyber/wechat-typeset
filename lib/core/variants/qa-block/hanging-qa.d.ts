/**
 * qa-block · hanging-qa（编辑部 悬挂 Q./A.）
 *
 * 设计稿 01·B：左侧 32px 列承载大号斜体 Q. / A. 字符，右侧设问与回答；
 * A 行顶部 1px 实线分隔。display:grid 在公众号粘贴时降级为 display:table + 双
 * table-cell，hanging indent 由 width:32px 的首列承担。
 */
import type { VariantDef } from '../_core';
declare const hangingQa: VariantDef;
export default hangingQa;
