/**
 * admonition · accent-bar（v2 · 五态差异化皮肤）
 *
 * 旧实现：左 3px 色条 + soft 底——四态同骨架只换色，是 AI slop 的典型。
 * 现在改为：同一 variant 内按 kind 产出四种**形态差异化**皮肤，摆脱
 * "左竖条 + 浅底方框"的工业矩阵：
 *
 *   - tip     → 气泡式不对称圆角 + 纯 soft 底，轻盈引导
 *   - warning → 顶虚线 + 底实线（双层警戒带）+ 斜切圆角，警觉但不刺眼
 *   - info    → 1px 全边框 + 顶端 2px inset accent + 柔阴影，知识卡片浮起
 *   - danger  → 顶端 8px accent 实条 + 全边框 + 零圆角，强迫性紧迫
 *
 * 为什么不拆成四个独立 variant：
 *   variant 选择是**主题级**决定（theme.variants.admonition: 'accent-bar'）。
 *   一个主题声明 variant 后，四态要在这一个 variant 内都能工作。拆开等于
 *   强迫主题作者为每 kind 单独选皮肤，违反"主题一次性签名"的设计。
 *   差异化交给 render 分支——同一 variant id，四种形态。
 *
 * 仍然是 DEFAULT_VARIANTS.admonition 的兜底：主题不声明 variants 时即用此。
 */
import type { VariantDef, AdmonitionRenderArgs, TokenSchema } from '../_core';
/**
 * tokens 暴露：accent-color + soft-bg 两枚通用变量。
 *
 * 为什么只暴露这两个、而不是 padding / radius / 边框样式：
 *   - 主题作者已经在 theme.tokens.colors.status[kind] 决定了"四态各自的色对"，
 *     用户态想做的最常见动作是"把 tip 的浅绿换成我的品牌色"——只覆盖颜色就够
 *   - 分支内的 box-shadow / border-top:8px / 圆角不对称布局是 variant 的"形态身份"，
 *     若也开放为 token 等于让用户把 danger 改成 tip 形态，破坏 variant 的差异化承诺
 *
 * default 用 'inherit' 占位（UI 显示"跟随主题"）；实际渲染 fallback 是 render() 里
 * 按 kind 动态读 status[kind].accent / .soft，所以 fallback 段不能用静态字面量——
 * 这是与 giant-mark 等"颜色 default 同样占位 inherit"的对齐。
 */
export declare const tokenSchema: TokenSchema;
declare const accentBar: VariantDef<AdmonitionRenderArgs>;
export default accentBar;
