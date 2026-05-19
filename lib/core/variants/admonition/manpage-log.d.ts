/**
 * admonition · manpage-log（manpage 日志输出块）
 *
 * 专为 tech-geek 主题设计：不再"左竖线+浅底的软卡片"，而是**终端/manpage 输出块**：
 *   - 全宽深底 + 顶部 1px accent 实线（像 `======` manpage 分隔条）
 *   - 标题条独立成行：更深底、左对齐、全大写 + 强字距，无图标，
 *     用 `:: NOTE ::` 括号语法承载"日志标签"的语义重量
 *   - 正文紧贴标题条，inset shadow 制造"输出从这里流出"的终端纵深感
 *   - 零圆角：CRT / manpage 从来不圆
 *
 * 区别于 terminal variant：terminal 是"命令窗"（三色圆点 + 标题栏），
 * manpage-log 是"日志输出块"（无窗口 chrome，只有分隔线 + 状态标签 + 流式正文）。
 */
import type { VariantDef, AdmonitionRenderArgs } from '../_core';
declare const manpageLog: VariantDef<AdmonitionRenderArgs>;
export default manpageLog;
