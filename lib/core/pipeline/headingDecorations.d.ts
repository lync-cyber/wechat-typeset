/**
 * 标题前缀装饰：theme.decorations.headingPrefix 的统一实现
 *
 * 抽出动机：markdown.ts 原本把约 200 行的 autoNumber / pattern 投影代码与
 * createMarkdown 主流程混在一起，导致主入口超 440 行难以浏览。本文件聚合所有
 * "heading 前缀" 相关的辅助：CSS 构造、计数器、数字格式化、占位替换、Token
 * 注入。导出唯一公开入口 applyHeadingPrefixDecorations(md, theme)。
 *
 * 设计纪律：本文件是"声明式 → 渲染"的唯一投影。新增任何标题前缀类视觉签名都应
 * 通过 PersonaSpec.decorations.headingPrefix 声明，不应在本文件之外添加 if 分支。
 * 如果一个主题想要无法用此结构表达的视觉，先评估能否扩展 HeadingPrefixDecoration
 * 的字段（如新增 underline / fontFamily 这类选项），保证共享层只动一处。
 */
import type MarkdownIt from 'markdown-it';
import type { Theme } from '../themes/types';
export declare function applyHeadingPrefixDecorations(md: MarkdownIt, theme: Theme): void;
