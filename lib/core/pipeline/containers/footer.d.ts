/**
 * 文末引导类容器：footerCTA / recommend / qrcode
 *
 * - footerCTA：文末关注卡。info 作为主文案；attrs.cta 作为按钮文字（以 span 样式渲染）。
 * - recommend：推荐阅读块（variantKind=recommend，card-list / academic-refs）。
 * - qrcode：二维码卡（variantKind=qrcode，bare 默认 / follow-card 刊物订阅卡）。
 *
 * 所有色值从 ctx.tokens.colors 读取，确保 4 套主题下的按钮/说明色都跟着主色走。
 */
import type { ContainerRenderer } from './types';
export declare const footerCTAContainer: ContainerRenderer;
/**
 * recommend · 两态 variant 容器：
 *   - card-list（默认）= 面向读者的"延伸阅读"，粗体大标题 + bullet 链接
 *   - academic-refs    = 面向论证的"参考引用"，uppercase 小字 kicker + textMuted 列表
 *
 * info 优先（作者写 `::: recommend 自定义标题`），缺省走 ctx.kickers.recommend。
 * variant 切骨架；主题级 voice（ctx.containers.recommend）仍由 themeCSS 注入。
 */
export declare const recommendContainer: ContainerRenderer;
/**
 * qrcode 容器：variant 分派 bare（默认，居中 QR + caption）/ follow-card（横向订阅卡：
 * 左 QR + 右三行）/ qr-stack（垂直堆叠：上 QR + 下三行）。
 * 主题 voice 由 ctx.containers.qrcode 注入 wrapper 装饰（边框 / 底色 / 边距）。
 * 设计纪律：layout 走 display:table 或 text-align:center（避开 flex 被微信剥）；
 * font-family 仅在 renderer inline 出现（主题层 elements/containers CSS 禁 font-family）。
 */
export declare const qrcodeContainer: ContainerRenderer;
