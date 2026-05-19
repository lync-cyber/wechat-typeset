/**
 * codeBlock · header-bar（Stripe Docs / MDN 家族 signature）
 *
 * 结构：
 *   <section class="wx-code-block wx-code-block--header-bar" style="…">
 *     <section class="wx-code-block__header" style="…">
 *       <span class="wx-code-block__lang" style="…">JAVASCRIPT</span>
 *       {copyIcon?}
 *     </section>
 *     <pre><code class="language-xxx hljs">…</code></pre>
 *   </section>
 *
 * 纪律：
 *   - 整段样式 inline（不依赖 themeCSS 外部类），让 juice 内联后粘贴到公众号依然稳定
 *   - copyIcon 从 theme.assets.copyIcon 读取，主题未提供则整段省略（不硬塞 fallback）
 *   - 语言名走白名单大写映射；未识别语言降级为空 header-bar（保留 wrapper + 空标签）
 *   - <pre> 本体保留原 class/结构，themeCSS 的 `.markdown-body pre` 规则仍命中
 */
import type { CodeBlockDef } from '../_core';
declare const headerBar: CodeBlockDef;
export default headerBar;
