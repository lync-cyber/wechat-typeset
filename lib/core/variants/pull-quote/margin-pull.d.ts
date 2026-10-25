/**
 * pull-quote · margin-pull（悬挂拉引）
 *
 * 人格：NYT Sunday / Texas Monthly 报刊体悬挂 pull-quote。
 * 视觉骨架：wrapper 自身 display:table（左 56px 竖向 kicker cell + 右 body cell）。
 *   左 cell 一枚 24×72 inline SVG 竖向 monospace kicker（`<text transform="rotate(-90)">QUOTE</text>`）；
 *   旋转走 SVG `<text transform>`，CSS transform 在公众号被剥。
 *   右 cell 承载 markdown-it 渲染的 `<p>`，pull-quote 容器把 quoteCSS（17px / 600 weight）
 *   通过 `.container-pull-quote--margin-pull > .__body > p` 选择器盖到 p 上。
 * 与 stamp-quote 的差异：装饰在左不在右，竖向 kicker rather than 印章。
 */
import type { VariantDef } from '../_core';
declare const marginPull: VariantDef;
export default marginPull;
