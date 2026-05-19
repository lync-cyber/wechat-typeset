/**
 * swiss-grid · 苏黎世栅格 · PersonaSpec
 *
 * 视觉灵魂：Josef Müller-Brockmann 在 Neue Grafik 04 内页上画红色辅助线的那支铅笔。
 *   - 12 栏铁律 · 1958 苏黎世对开页 · 国际红 #e30613 + 黑 + 白 + hairline
 *   - 直角硬边（radius 全 0）· 大量短分隔线 · 网格化栏位
 *
 * 视觉 ground truth：docs/themes-specs/themes/02-swiss-grid.html
 *
 * 三条不可妥协决策：
 *   1. radius 全 0（圆角即"软"，Swiss 现代主义即"硬"——半径 ≥ 1 直接破气质）
 *   2. primary = #e30613（瑞士国旗红，Neue Grafik 04 期号底色；不是 Bootstrap 红）
 *   3. H2 章节序号用红色方块徽章（"01" / "02" / "03"）—— 通过
 *      decorations.headingPrefix.style.backgroundColor=primary + paddingX/paddingY 撑开,
 *      整套主题最强烈的版面节奏锚点。
 *
 * 与 data-brief（数据简报）的边界：
 *   - data-brief：数据蓝 #1756d1 + monospace + 数据卡 + sparkline——"数字是论点"
 *   - swiss-grid：国际红 + 大字章号 + 红章 H2 + pull-quote 栏偏移——"栅格是结构"
 *   两者共享 data-brief 家族签名容器（masthead 略弃用 / qa-block / footnotes
 *   / colophon / bar-chart / key-number）,
 *   仅在 tokens / variants / innerStyles 上分叉视觉个性。
 *
 * 复用策略：
 *   - admonition variant 走 `news-underline`（实色徽章 + 1px 黑竖分隔 + 1px 黑底线）——
 *     设计稿 multi-callout 母本；四态独立 ::: 块连续罗列时下划线自然贴合成一栏
 *   - 期号横幅（issue-banner）走 `key-number` 容器 —— kicker / value / body 三段
 *     vertical stack 适配 375px 移动端，比强行 2 栏 layout 更稳
 *   - 编辑部按走 `note variant=editorial-stripe`（主色左条 + bgSoft）；
 *     调研口径栏走 `note variant=research-dense`（10px 紧凑 + 粗体 label）
 *   - 脚注 NOTES 走 `footnotes variant=inline-flow`（自带 kicker info 槽，长引用列表内滚动）
 *   - pull-quote 通过 `elements.blockquote` __reset 表达"左 12px 红条 + 25% 左偏移"
 *
 * 不新增容器/变体——所有视觉签名通过 spec 配置实现。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
