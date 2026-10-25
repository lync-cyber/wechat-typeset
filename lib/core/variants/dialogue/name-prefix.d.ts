/**
 * dialogue · name-prefix（剧本 / inline 对谈）
 *
 * 人格：剧本 / 谈话录排版——"**名字**：内容..." 一段 inline 流式。
 * 视觉骨架：每轮一段 p；name 加粗 accent 色 + monospace + "：" + 紧接 body 文字。
 *   无方框、无头像、无装饰 SVG——dense 信息密度最高的对话形态。
 *
 * 多主题软推荐（designedFor）：dense inline 排版与"文字密度优先"的主题最适配——
 * tech-explainer / academic-frontier / literary-humanism 三家具有"长篇深度对谈"
 * 出场需求；其它主题作者也能用 attrs.variant=name-prefix 显式切换。
 */
import type { VariantDef } from '../_core';
declare const namePrefix: VariantDef;
export default namePrefix;
