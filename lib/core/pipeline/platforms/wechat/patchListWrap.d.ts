/**
 * patchListWrap：把每个 ul/ol 外层包一层 <section>，并把列表级行间样式复制到 section。
 *
 * 为什么：
 *   微信编辑器的后处理会吞掉 ul/ol 上的若干 margin / padding 声明，
 *   导致列表与上下段落贴死。标准 workaround 是外包一个 section，
 *   在 section 上承载 margin，让列表节点本身只承载内部排版。
 *
 * 幂等：
 *   如果 ul/ol 的 parentElement 已经是"我们加上"的 section（标记 data-wx-list-wrap=""），
 *   则跳过。这样重复调用或和编辑器已经处理过的产物共存不会层层嵌套。
 *
 * 附加：嵌套列表自愈
 *   ≥ 3 层嵌套 (ancestor <ul>/<ol> ≥ 2) 的列表在公众号里缩进会把正文压到右半边，
 *   读起来灾难。这里把深层列表递归扁平化为 `<p>· content</p>` 段落序列，
 *   保留语义顺序，再交给下游 section-wrap。diagnose.ts 侧会在 markdown 源码层
 *   提前给作者红线，这里是兜底。
 */
export declare function patchListWrap(html: string): string;
