/**
 * divider · glyph（单字符装饰）
 *
 * 居中放一个装饰字符（❦ / § / ◆），前后各一根短横线。适合文学/诗歌类栏目。
 * 默认字符 ❦（fleuron）；主题可通过 attrs.glyph 在 markdown 端临时覆盖。
 */
import type { VariantDef } from '../_core';
declare const glyph: VariantDef;
export default glyph;
