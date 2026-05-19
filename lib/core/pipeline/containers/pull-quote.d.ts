/**
 * pull-quote 容器：正文中段把"金句"放大重申。
 *
 * 与 quote-card（外部话语 + 多变体引号装饰）/ highlight（bgMuted 强调段）正交：
 *   - body：引文本体（markdown-it 渲染为 `<p>`；样式由 variant.quoteCSS 通过
 *     `.container-pull-quote--{id} > .__body > p` 选择器盖过 theme.elements.p）
 *   - info：可选 byline（出处 / 落款），close 时单独渲染在 body 末尾
 *
 * 节点序：[style 块] > wrapper > [svgSlot] > body wrapper > [body content] > [byline] > /body wrapper > /wrapper。
 *
 * 为什么 byline 放进 body section 内（而非 wrapper 内、body 之外）：
 *   margin-pull 等 variant 把 wrapper 设为 display:table，svgSlot 与 body section
 *   是两个 table-cell。byline 若作为 wrapper 直接子节点会变成"第三列"破坏双栏布局；
 *   放进 body cell 内则自然在引文下方堆叠。
 *
 * className 用 uv.id（不走 resolveVariantWithUv 的 base id 选择）：
 *   pull-quote 用户态变体的命名稳定性优先于"形态身份锚点"——作者保存的金句样式
 *   通常带署名 / 多颜色 token 微调，回看时按 uv.id 一眼定位比 base id 直观。
 */
import type { ContainerRenderer } from './types';
export declare const pullQuoteContainer: ContainerRenderer;
