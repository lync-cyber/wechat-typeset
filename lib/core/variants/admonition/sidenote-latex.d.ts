/**
 * admonition · sidenote-latex（学术旁注 / LaTeX 定理框）
 *
 * 专为 academic-frontier 主题设计：摆脱"Web 卡片"气质，取 LaTeX
 * `\begin{theorem}` / `\begin{remark}` 的细边框 + 小型大写标题语汇：
 *   - 1px 细实线四面框（accent 色），无圆角，无浅底填充——论文里定理框不会涂色
 *   - 标题为**内嵌小型大写**（text-transform uppercase + 字距 2px），
 *     行首如 `Definition.` `Remark.` 的 inline 起始，与正文共处一行
 *   - 正文字号略小（13-14px），紧凑行高，克制如同学报脚注栏
 *   - danger 态**不报警**：学术语境里"谬误提示"是灰色存疑而非红色交通灯
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const sidenoteLatex: VariantDef<AdmonitionRenderArgs>;
export default sidenoteLatex;
