/**
 * 自定义行内扩展：
 *   [.着重文本.]  → <span class="wx-emphasis">着重文本</span>
 *   [~波浪文本~] → <span class="wx-wavy">波浪文本</span>
 *
 * 为什么不用 markdown-it-sub/sup 之类的现成插件：
 *   中文社区里 `[.x.]` 和 `[~x~]` 是约定俗成的着重/波浪写法（而不是上下标），
 *   语义含义冲突；写自己的 inline rule 可以精准命中 token 形态。
 *
 * markdown-it 的 inline rule 契约：
 *   state.src 是整个 inline 文本；state.pos 是扫描游标。我们在当前位置
 *   尝试匹配 `[.` / `[~`，找到结束 `.]` / `~]` 后 push token 推进 pos。
 *   silent 模式下只做 lookahead，不 push token——必须尊重。
 */
import type MarkdownIt from 'markdown-it';
export declare function registerInlineExtensions(md: MarkdownIt): void;
