/**
 * qrcode · follow-card
 *
 * 视觉：左 64×64 QR + 右 kicker/title/desc 三行 newspaper 订阅卡，刊物收尾专用。
 * 与 bare 的边界：bare 是无装饰扫码块（任意 QR 场景），follow-card 是订阅栏排版。
 *
 * QR：attrs.text 走内置 SVG 编码（renderer 处理）；attrs.qr 是外链图 URL。
 * 文字段：attrs.kicker（兜底 ctx.kickers.qrFollowKicker "SUBSCRIBE"）/ info（兜底
 * ctx.kickers.qrFollowTitle）/ attrs.desc。所有 layout 走 display:table + table-cell
 * （避开 flex 被微信粘贴剥）。
 */
import type { VariantDef } from '../_core';
declare const followCard: VariantDef;
export default followCard;
