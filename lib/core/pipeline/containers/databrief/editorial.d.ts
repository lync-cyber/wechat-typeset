/**
 * data-brief 家族 · 编辑文案块（editorial）
 *
 * 承担"读者互动 + 脚注引用"两个文字向的支撑容器。
 *
 * 包含 2 个容器：
 *   - qa-block       读者问答（Q/A 头像方块）
 *   - footnotes      脚注 / 参考文献块（variantKind=footnotes：lined / inline-flow）
 *
 * 与 metrics 的差异：本组容器**有 body 内容**（markdown-it 渲染的内文），
 * 渲染器 open 留段 wrapper 给 markdown 流式注入；metrics 多为"声明型"
 * （attrs 决定全部，body 忽略）。
 */
import type { ContainerRenderer } from '../types';
export declare const qaBlockContainer: ContainerRenderer;
export declare const footnotesContainer: ContainerRenderer;
