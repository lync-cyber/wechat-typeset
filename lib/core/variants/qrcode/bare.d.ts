/**
 * qrcode · bare（默认）
 *
 * 视觉：居中 QR + 居中 caption。"任意场景的 QR"——赞赏码 / 活动链接 / 小程序码，
 * 布局极简。与 follow-card 的边界：follow-card 是刊物订阅卡的左 QR + 右三行版式，
 * bare 是无装饰的扫码块。
 *
 * QR 渲染逻辑在容器 renderer 里（attrs.text 走内置编码；外链图回退正文 ![](url)）；
 * variant 只决定 wrapper / caption 排印。
 */
import type { VariantDef } from '../_core';
declare const bare: VariantDef;
export default bare;
