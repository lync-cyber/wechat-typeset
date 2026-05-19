/**
 * patchFlexToFallback：display:flex → display:block。
 *
 * 为什么：
 *   公众号粘贴后会把 display:flex 吞掉，但保留子项原本的"flex 假设"样式
 *   （如 flex:1），导致布局错位。把 flex 容器改回 block，让其子元素依赖
 *   inline-block + width% / table / vertical-align 等经典布局兜底——
 *   这也是为什么容器渲染器（Step 4 起）统一不用 flex 做关键布局。
 *
 * 例外：
 *   节点自己加 data-wx-keep-flex 属性的，保留 display:flex（高级用例：
 *   明确测过在公众号里没被剥掉的场景，例如某些主题主动依赖）。
 *   这个出口仅作为调试 / 验证通道，不建议生产使用。
 */
export declare function patchFlexToFallback(html: string): string;
