/**
 * literary-humanism · 人文札记 · PersonaSpec
 *
 * 定位（规范 §0 / 结语）：**出版物**，不是"新中式"。参照坐标：三联书店毛边本、
 * 中华书局竖排集、《读库》正文页、岩波文库奶白封皮。气质关键词：克制、藏锋、留白、纸感。
 *
 * 落地三根红线（规范结语 §"落地时四件事最重要"）：
 *   1. primary = #5a4a3a 宋椠褐（不是驼棕 #7a5c3a —— 书斋而非茶馆）
 *   2. accent = #9a3b2e 藏经朱（仅在 quoteCard 首字 + footer 钤印出现，稀缺即贵气）
 *   3. 四种 admonition 必须是**四种不同 variant**（minimal-underline / accent-bar /
 *      pill-tag / ticket-notch）——此处 theme.variants.admonition 只能选一个代表，
 *      另三个靠 markdown 层 `variant=` 覆盖（见 Templates / tests/fixtures/all-containers.md）
 *   4. stepBadge 数字色 = primary 墨褐（不用朱砂）
 *   5. 所有容器 radius = 0（方版心是书，圆角是卡片）
 *   6. SVG strokeWidth 全员 ≥ 1（validator 硬下限，公众号光栅化友好）
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
