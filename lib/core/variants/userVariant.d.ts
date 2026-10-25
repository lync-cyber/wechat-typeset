/**
 * 用户态变体（UserVariant）—— 让 SPI 在不改源码的前提下接受用户存的 JSON。
 *
 * 三档自由度，共用同一 SPI 出口（makeVariantContainer 的 resolveVariant 在
 * `attrs.variant=uv_*` 命中时分派到这里）：
 *
 *   level='tokens'    在内置 variant 基底上做 `var(--name)` 占位替换
 *                     （前置：基底 variant 把硬编码值改为 var()，由步骤 4 配套迁移）
 *   level='patch'     在内置 variant 输出的 wrapperCSS / titleCSS / bodyCSS 末尾追加片段
 *                     （cascade 自然覆盖）
 *   level='custom'    完全自定义 HTML 骨架 + CSS，不挂任何基底
 *                     （由步骤 7 才接到 markdown-it 容器渲染器）
 *
 * 与 VariantKind 的关系：tokens / patch 必须有合法基底，base.kind 落在
 * `keyof ThemeVariants`（不含 'none'——自由组件 intro/cover/author 没有 render 可 patch）。
 *
 * id 形态：`uv_<base36 timestamp>_<6 char base36 rand>`（与 _kv.ts:genId('uv') 一致），
 * 借用 `uv_` 前缀让 makeVariantContainer 的 resolveVariant 一眼区分用户变体 vs 内置变体。
 */
import type { VariantKind } from '../themes/types';
export type UserVariantLevel = 'tokens' | 'patch' | 'custom';
export type UserVariantCssSlot = 'wrapperCSS' | 'titleCSS' | 'bodyCSS';
interface UserVariantCommon {
    /** 'uv_<time36>_<rnd6>'；持久 id，跨会话稳定。 */
    id: string;
    /** 用户给变体的短名（≤20 字）。 */
    name: string;
    /** ≤30 字说明，可空。 */
    description?: string;
    /** 创建时间戳（ms）。 */
    createdAt: number;
    /** 上次更新时间戳（ms）。update 时由仓自动写入。 */
    updatedAt: number;
}
/**
 * tokens 档：覆盖基底 variant 在 render() 里暴露的命名变量。
 * tokens 字段形如 `{ accentColor: '#ff5a00', titleSize: '22px' }`——
 * 基底 render() 必须事先把硬编码值改为 `var(--<name>, <default>)`，渲染时通过
 * inline `style` 注入 `--<name>: <value>`，cascade 把默认值替换掉。
 *
 * 哪些 token 可用、默认值是什么，由基底 variant 自己的 `tokenSchema` 元数据声明
 * （步骤 4 与 L1 UI 联动时实装）。仓只持有"用户填了什么"，不做 schema 校验——
 * 校验在保存期由调用方完成。
 */
export interface UserVariantTokens extends UserVariantCommon {
    level: 'tokens';
    base: {
        kind: VariantKind;
        variantId: string;
    };
    tokens: Record<string, string>;
}
/**
 * patch 档：在基底 variant 输出的 inline CSS 末尾"追加片段"。
 * 不做语义合并（如 padding 单字段覆盖），只做字符串拼接——cascade 自然让靠后的覆盖靠前的。
 * 追加内容必须先过 lintInlineCSS（步骤 1）；这里仅持有数据。
 */
export interface UserVariantPatch extends UserVariantCommon {
    level: 'patch';
    base: {
        kind: VariantKind;
        variantId: string;
    };
    cssPatch: Partial<Record<UserVariantCssSlot, string>>;
}
/**
 * custom 档：完全自定义骨架，不挂基底。
 *
 * template 含占位符 `{{title}}` / `{{body}}` / `{{svgSlot}}`，渲染器（步骤 7）
 * 简单正则替换即可——这是单一可信输入场景（用户编辑的是自己的变体），不上
 * 模板引擎也不需要防 XSS（XSS 路径在白名单 HTML lint 处拦截）。
 *
 * css.titleCSS 空串保留 SPI 暗号契约：'我自己在 svgSlot 里画了标题，请 renderer
 * 跳过默认 title 行'。与 `_core.ts:VariantRenderResult` 注释逐字对应。
 *
 * tokens 与 UserVariantTokens 同语义——custom 也可以暴露命名变量，未来 UI 给
 * 用户调色用。
 */
export interface UserVariantCustom extends UserVariantCommon {
    level: 'custom';
    base: null;
    template: string;
    css: {
        wrapperCSS: string;
        titleCSS?: string;
        bodyCSS?: string;
        svgSlot?: string;
    };
    tokens?: Record<string, string>;
}
export type UserVariant = UserVariantTokens | UserVariantPatch | UserVariantCustom;
export {};
