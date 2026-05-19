/**
 * admonition · pill-tag
 *
 * 视觉：外框四边 1px accent + 浅底；标题以 inline-block 胶囊形式悬在顶边（负 margin-top）。
 * 为什么不是 position:absolute：公众号剥离 absolute，只能靠 margin 负值制造"悬出"。
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const pillTag: VariantDef<AdmonitionRenderArgs>;
export default pillTag;
