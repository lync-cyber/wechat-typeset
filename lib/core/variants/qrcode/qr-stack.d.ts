/**
 * qrcode · qr-stack（垂直堆叠 · QR 上 / 文字下）
 *
 * 与 follow-card 的边界：follow-card 是"左 QR + 右三行"水平栏目卡（NYT 订阅条母语）；
 * qr-stack 是"QR 居中上 + kicker/title/desc 居中下"垂直栈（数据简报 / Neue Grafik 收尾
 * 抓眼语序：先视觉锚再说明）。两者各取一种刊物收束惯例。
 *
 * 实际渲染逻辑在 footer.ts qrcodeContainer.open 分支里——variant 文件只提供 meta /
 * snippet / thumbnail（与 follow-card 同模式：layout 走 renderer 强制，wrapper 装饰
 * 由主题 voice ctx.containers.qrcode 决定）。
 */
import type { VariantDef } from '../_core';
declare const qrStack: VariantDef;
export default qrStack;
