/**
 * data-brief 家族 · 数值与图表（metrics）
 *
 * 4 个容器 + sparkline helpers + KPI dashboard 内部栈：
 *   - kpi-dashboard  三指标卡面板外壳（带 source / period 头脚）
 *   - kpi-item       单指标卡（label / delta / value+unit / sparkline / foot）
 *   - bar-chart      横向条形图外壳
 *   - bar            单条
 *
 * 布局纪律（与 bar 容器一致 · rules.ts FORBIDDEN_DISPLAY_VALUES）：
 *   多列等宽走 display:table + table-cell，**不用 grid**——公众号粘贴后 grid 被剥成
 *   空值，子项塌成顺排。table-layout:fixed 保证三栏等宽不被长内容拉宽。
 */
import type { ContainerRenderer } from '../types';
export declare const kpiDashboardContainer: ContainerRenderer;
/**
 * kpi-item · 单指标卡（label / delta / caption / value+unit / sparkline / foot）
 *
 * 一切以 attrs 驱动；body 内容忽略。
 *
 * 不对称 padding：第 1 项 padding-left:0，其余项左右各 8px。markdown-it-container 流式
 * open/close 无法前瞻末项，所以全部按"非末项"渲染——多出的右 padding 被 dashboard 自
 * 身的 padding-right 吃掉。
 */
export declare const kpiItemContainer: ContainerRenderer;
export declare const barChartContainer: ContainerRenderer;
/**
 * bar · 单条
 *
 * 必填 attrs：pct（0–100，超界 clamp）。可选：label / value / tone=normal|warn /
 *   labelWidth / valueWidth（per-bar 覆盖父 bar-chart 的同名设置，CSS length 字面量）。
 *
 * 公众号兼容性纪律：
 *   - 行布局走 `display:table` + `display:table-cell`，不用 grid（rules.ts
 *     FORBIDDEN_DISPLAY_VALUES 明文禁 grid，粘贴后被剥成空值）。
 *   - 轨道/填充走块级 `<section>` 而非 `<span>`——inline 元素的 height/width/
 *     background-color 在公众号粘贴后会被无视（inline 不接受块级尺寸）。
 *   - 填充的 `width:${pct}%` 以轨道宽为参照——轨道是 cell 内的块元素 width:100%。
 */
export declare const barContainer: ContainerRenderer;
