/**
 * gallery · ribbon-strip
 *
 * 人格：横向滚动条带（移动端 carousel / 旅行账号封面）。
 * 骨架：wrapper overflow-x:auto + white-space:nowrap；项 inline-block 64% 大尺寸；
 *      右侧 inset box-shadow 提示可滑（同 <pre> 横滑工艺，buildTheme.ts:240-249）。
 *
 * `-webkit-overflow-scrolling:touch` 是 iOS 微信 webview 原生触摸惯性的暗号；
 * 同 footnotes/inline-flow 已用先例（rules.ts FORBIDDEN 正则不扫属性值）。
 */
import type { VariantDef } from '../_core';
declare const ribbonStrip: VariantDef;
export default ribbonStrip;
