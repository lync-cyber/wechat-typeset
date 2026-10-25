/**
 * dialogue · chat-bubbles（聊天 app 气泡）
 *
 * 人格：IM 聊天界面——左右交替气泡 + 头像圆 + 内联 SVG 三角尾巴。
 * 视觉骨架：display:table 三栏（32px 头像槽 + 自动气泡 + 32px 头像槽，按 side 占其一）。
 *   气泡：bgSoft / primarySoft 底 + 圆角 12px + padding 10px 14px。尾巴用 inline SVG path 画三角，
 *   禁用 ::before/::after（公众号后台会剥）。
 */
import type { VariantDef } from '../_core';
declare const chatBubbles: VariantDef;
export default chatBubbles;
