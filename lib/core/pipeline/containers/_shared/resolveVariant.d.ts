/**
 * variant id 三段解析（attrs.variant > theme.variants[slot] > fallback）。
 *
 * 抽自 quote / compare / headline 三个不走 makeVariantContainer 工厂的容器——
 * 它们各自手写过一遍同样的 3 行逻辑。makeVariantContainer 内部的 resolveVariant
 * 是更复杂的版本（带 alias、调 render 拿 result），不能复用，所以另开一个最小 helper。
 *
 * 不做 alias 归一化：divider 这类需要 alias 的容器都已收口到 makeVariantContainer。
 * 不调 .render：留给调用方自己拼，因为各容器外层 HTML 形态不同。
 */
import type { ContainerRenderContext } from '../types';
import type { ThemeVariants } from '../../../themes/types';
import type { VariantRenderResult } from '../../../variants/_core';
export declare function resolveVariantId<Id extends string>(ctx: ContainerRenderContext, slot: keyof ThemeVariants, table: Record<string, unknown>, fallback: Id): Id;
/**
 * UV-aware 解析 + 渲染结果。
 *
 * 给"自行管 HTML 形态"的容器（quote-card / compare / headline / ...）一条共用通道
 * 接入用户态变体：与 makeVariantContainer 内部的 uv_ 前缀分支语义一致——
 *   - attrs.variant 以 uv_ 开头 + 仓命中 + level ∈ {tokens, patch} + base.kind === slot
 *     → 拿基底 render 输出 + applyUserVariant 叠加，返回 id 用基底 id（让 className 稳定）
 *   - 任何环节失败：静默退化到原 3 级 resolveVariantId 解析
 *
 * className 用 base id（不是 uv id）：CSS class 是 variant"形态身份"的稳定锚点，
 * 让"分享了用 UV 装饰的容器"复制到无 UV 仓的页面时，className 仍能匹配主题预设样式。
 * 与 makeVariantContainer 里 `id: uv.id` 的选择不同（工厂版用 uv.id 给透明度面板溯源）；
 * 此处容器外壳不进透明度，稳定 className 收益更大。
 */
export declare function resolveVariantWithUv<Args = void>(ctx: ContainerRenderContext, slot: keyof ThemeVariants, table: Record<string, {
    render: Args extends void ? (ctx: ContainerRenderContext) => VariantRenderResult : (ctx: ContainerRenderContext, args: Args) => VariantRenderResult;
}>, fallback: string, args?: (ctx: ContainerRenderContext) => Args): {
    id: string;
    result: VariantRenderResult;
};
