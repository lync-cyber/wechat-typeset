/**
 * people-story · 人物特稿 · PersonaSpec
 *
 * 定位（规范 §0）：**《人物》杂志 / GQ 特稿 / New Yorker Profiles** 的公众号呈现。
 * 气质关键词：**肖像感、克制、冷米、瘦细线、巨大引号、一个人物色**。
 *
 * 三条签名动作（规范 §结语）：
 *   1. primary #1b2330 深墨靛 + accent #8a3f2b 深铁锈 + bg #f2efe7 冷米（三锚点不许动）
 *   2. Drop cap：intro 首段首字 48px / 700 / accent / inline-block（decorations.introDropcap）
 *   3. quoteCard = 巨号 serif 引号 SVG + 25px 金句 + byline attribution
 *
 * accent 稀缺纪律：每篇最多三处 —— drop cap + pull-quote 引号 + 罗马数字。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
