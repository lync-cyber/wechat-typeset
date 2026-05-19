/**
 * pull-quote 变体目录聚合器。正文中段"放大重申已写过的句子"的四种骨架：
 *   - giant-mark    巨号 inline-SVG 引号 + 大字左对齐（人物特稿母本，default）
 *   - centered-rule 上下 1px 实线居中夹 + uppercase kicker（gallery placard）
 *   - stamp-quote   左大字粗体 + 右旋转印章 SVG（brutalist 压字）
 *   - margin-pull   左侧竖向 monospace QUOTE + 右大字（NYT Sunday 悬挂）
 *
 * 新增 pull-quote variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组（顺序由 variants/registry.ts 的 PULL_QUOTE_ORDER 控制）
 */
declare const _default: import("../_core").VariantDef<void>[];
export default _default;
