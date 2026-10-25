/**
 * codeBlock · line-numbers（IDE / 技术书 line gutter）
 *
 * 设计语言：技术参考书 / IDE 编辑器（K&R、SICP、O'Reilly、VS Code）。
 *   - 左侧固定窄列：行号（右对齐 + 单色 muted）+ 垂直分隔线
 *   - 右侧主区：标准 <pre><code> 高亮
 *   - 不放语言徽章——这条 variant 的语义是"可以按行号引用的代码"，不是"代码段落"
 *   - 表现稳定：display:table（wxPatch 不剥），与 header-bar 同源结构防回归
 *
 * 适合主题：tech-explainer / academic-frontier / swiss-grid / business-finance
 * ——任何会在正文里写"见第 7 行……"的稿件家族。
 *
 * 行号生成纪律：
 *   - 行号串就在 <pre> 里，与正文 pre 共享同一 line-height —— 两列基线对齐
 *   - hljs 跨行 span 不会触发——我们不拆 codeInnerHtml，只在邻列再印一份行号
 *   - 源末尾的孤立换行去掉一个，避免行号列末尾比代码多出一格
 */
import type { CodeBlockDef } from '../_core';
declare const lineNumbers: CodeBlockDef;
export default lineNumbers;
