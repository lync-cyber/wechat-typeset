/**
 * table-card / table-row · 结构化表格容器
 *
 * 弥补 markdown 原生 table 在公众号"字号小 / 列宽不可控"的缺陷。外层 4 冒号 table-card
 * 是骨架外壳，内嵌的 table-row 通过 attrs.cells（管道分隔）声明本行内容、body 被忽略。
 *
 * variant 在 parent 上，child 渲染要查 parent 的 variantId：模仿 KPI_DASHBOARD_STACK
 * 模式——tableCardContainer.open 把 variantId 推栈，tableRowContainer 查栈顶分派到 4 个
 * renderXxxRow。row 级 CSS（cell border / bg / padding）都在本文件按 variantId 分派，
 * variant 文件只产 wrapperCSS。
 *
 * cells 解析：管道 `|` 分隔，trim 后入数组。
 *
 * price-tier 推荐列约定：单元格首字符 `*` 标记当列为推荐列——首行（header）扫描记下列号，
 * 后续每行同列顶条着 accent 色。**转义**：写 `\*` 表示字面星号，不触发推荐标记
 * （如 cell `"\*会员"` 渲染为 `"*会员"`，不进 highlightCols）。这是为了允许真实数据
 * 含 `*` 字面（如脚注引用、注解符号）。
 *
 * key-value 列数约定：必须 2 列。非 header 行 cells.length ≠ 2 时按 dev warn 提示
 * （生产渲染仍走 fallback：少列补空、多列截断），不阻断；warn 去重，测试可静音
 * （__setTableCardWarnSilentForTest）。
 *
 * markdown-it-container 模式：tableRowContainer.open 一次性产出完整 row HTML（含 cells），
 * close=''。这样 body 被吞、attrs 全权决定渲染——同 kpi-item / timeline-item 模式。
 */
import type { ContainerRenderer } from './types';
/**
 * 测试钩子：静音 warn 输出。table-card variant 全矩阵 / 快照 spec 会刻意穿越
 * 异常列数 / 转义边界（warn 路径正是被测对象），生产期 warn 在测试日志里变成
 * 数百行噪声。spec 在 beforeAll 打开、afterAll 关掉。生产代码勿用。
 */
export declare function __setTableCardWarnSilentForTest(v: boolean): void;
export declare const tableCardContainer: ContainerRenderer;
export declare const tableRowContainer: ContainerRenderer;
