/**
 * admonition · news-row（数据新闻紧凑单行）
 *
 * data-brief 家族签名：每态左 3px 色条 + 实色徽章（INFO/TIP/WARN/STOP）+ 紧凑单行正文。
 * 区别于 accent-bar 的"四态各自皮肤"——news-row 是"四态同骨架，仅徽章字 + 色不同"，
 * 让作者能在同一栏目里横向罗列多条数据说明（晚点 / 财新数据 / Bloomberg Terminal 惯例）。
 *
 * 实现纪律：
 *   - 布局走 `display:table` + `display:table-cell`，**不用 flex**——wxPatch 会把 flex→block
 *   - titleCSS=''：让 renderer 跳过默认 title 行；徽章直接走 svgSlot 渲染
 *   - 默认徽章文字：tip→TIP / info→INFO / warning→WARN / danger→STOP（采用数据新闻惯例
 *     STOP 而非 DANGER）；作者写 `::: info INFO\n...` 直接覆盖
 *   - 不渲染主题 icon：news-row 的语义信号靠**色相 + 大写徽章字**，icon 反而成噪音
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const newsRow: VariantDef<AdmonitionRenderArgs>;
export default newsRow;
