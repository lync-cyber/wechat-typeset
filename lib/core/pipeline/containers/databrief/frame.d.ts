/**
 * data-brief 家族 · 刊物结构外框（frame）
 *
 * 承担"页码 / 目录 / 栏目标签 / 刊物收束"这类"非数据、非编辑文案"的版面骨架。
 *
 * 包含 5 个容器：
 *   - masthead       刊头（刊名 + monospace 期号·日期）
 *   - section-tag    小栏目标签（黑底白字胶囊）
 *   - toc            目录外壳 + kicker
 *   - toc-item       单条目录（序号 · 标题 · 页码 三栏 grid）
 *   - colophon       刊物收束栏（上分割线 + "下期 / 卷·期"双栏 monospace）
 *
 * 设计纪律（与 metrics / editorial / cta 共通）：
 *   1. 多列布局走 display:table + table-cell，不用 grid（rules.ts FORBIDDEN_DISPLAY_VALUES）
 *   2. wrapper 装饰（padding/border/bg/margin）由 ctx.containers.<slot> 决定
 *   3. monospace 字体仅在 renderer inline 出现（主题 elements/containers CSS 禁 font-family）
 */
import type { ContainerRenderer } from '../types';
export declare const mastheadContainer: ContainerRenderer;
export declare const sectionTagContainer: ContainerRenderer;
export declare const bylineContainer: ContainerRenderer;
export declare const editorialHeaderContainer: ContainerRenderer;
export declare const tocContainer: ContainerRenderer;
/**
 * toc-item · 单条
 *
 * 三栏 table（序号 monospace 主色 / 标题 / 页码 monospace 灰）。
 * info 为条目标题；attrs.no = 序号，attrs.page = 页码。body 内容忽略。
 */
export declare const tocItemContainer: ContainerRenderer;
export declare const colophonContainer: ContainerRenderer;
