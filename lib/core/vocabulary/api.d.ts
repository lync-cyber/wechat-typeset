/**
 * Container Vocabulary 运行时查询 API
 *
 * 面向 LLM / 外部集成方的"上游作者视角"入口：回答三类问题：
 *   1. 这个项目能用哪些 `:::` 容器？（getContainerVocabulary）
 *   2. 某个容器能切换什么骨架？（getVariantsForContainer）
 *   3. 某个主题默认给每个 variant slot 选了什么？（getThemeDefaultVariants）
 *   4. 给我一个最小可插入的 markdown 示例。（getContainerSnippet）
 *
 * 这些函数是 capabilities.json 的运行时对应物 —— 任何一处改了词汇表或 variant 注册表，
 * 这些查询会实时反映（不需要重跑 build-capabilities）。
 *
 * 零副作用；纯函数；Node / Vite 两种运行时都能跑（不依赖 import.meta.glob）。
 */
import { type ContainerSpec, type ContainerPack, type PackNamespace } from './vocabulary';
import type { VariantKind, ThemeVariants } from '../themes/types';
/** 返回所有合法容器的权威描述列表（主题无关）。 */
export declare function getContainerVocabulary(): readonly ContainerSpec[];
/** 按 markdown fence 名查单个容器描述；未知名返回 undefined。 */
export declare function getContainerSpec(name: string): ContainerSpec | undefined;
/**
 * 某 variant kind 的所有可用 id + 元信息（name / description / designedFor）。
 * 用于 UI 做骨架切换面板，或 LLM 推荐「这个主题用哪个骨架最合适」。
 */
export interface VariantDescriptor {
    id: string;
    kind: VariantKind | 'codeBlock';
    name: string;
    description: string;
    /** 设计起源主题白名单（软推荐）。空/缺省 = 通用。 */
    designedFor?: readonly string[];
}
/**
 * 某容器支持的所有 variant 描述。
 *   - 不支持 variant 切换的容器（styleKey=null / 无 variantKind）返回 []
 *   - codeBlock 不是容器 —— 它通过 ``` fence 触发，不在本 API 范围
 */
export declare function getVariantsForContainer(containerName: string): VariantDescriptor[];
/**
 * 主题对每个 variant slot 的默认选择。
 * 委托给 public/personas —— 不直接 import 避免循环；调用方自备 ThemeVariants。
 *
 * 常见用法：
 *   import { getPersona } from './public'
 *   const v = getPersona('tech-geek').variants  // ThemeVariants
 *   getThemeDefaultVariants(v)                  // 解包成 VariantDescriptor[]
 */
export declare function getThemeDefaultVariants(variants: ThemeVariants): VariantDescriptor[];
export interface SnippetOptions {
    /** 覆盖容器 variant（写入 open 行的 variant=xxx 属性） */
    variantId?: string;
    /** 若为 admonition 且需要指定 kind（tip/warning/info/danger/note） */
    admonitionKind?: 'tip' | 'warning' | 'info' | 'danger' | 'note';
}
/**
 * 为指定容器生成最小可用 markdown snippet。
 *
 *   - 不传 options：返回 ContainerSpec.example 的原样复制（已含起止 fence）
 *   - variantId：在 open 行末尾追加 `variant=xxx`
 *
 * 不会校验 variantId 是否合法；调用方可先用 getVariantsForContainer 确认。
 */
export declare function getContainerSnippet(containerName: string, options?: SnippetOptions): string;
/**
 * 主题能力快照：把 spec.capabilities + signatureContainers + ContainerPack namespace
 * + variants + variant.designedFor 反向索引 join 起来的复合视图。
 *
 * 设计意图：让 LLM / 集成方一次拿"swiss-grid 主题下我能用什么、推荐什么"，
 * 而不是自己 join 4-5 个查询函数。
 */
export interface ThemeCapabilitiesView {
    /** 主题 id（kebab） */
    themeId: string;
    /** 主题在每个 variant slot 的当前默认选择 */
    defaultVariants: Record<VariantKind, string>;
    /** 主题在每个 slot 的"额外推荐"——来自 spec.capabilities.variantOverrides */
    recommendedVariantOverrides: Partial<Record<VariantKind, string>>;
    /** 每个容器在本主题下的能力描述（available / signature / namespace） */
    containers: ReadonlyArray<{
        /** fence 名（kebab） */
        id: string;
        /** 命名空间分类 */
        namespace: PackNamespace;
        /** 完整 pack 值（'base' / 'pack:editorial' / 'theme:data-brief'） */
        pack: ContainerPack;
        /** 是否在本主题下"启用"：
         *   - base / pack:* 任何主题都启用
         *   - theme:<id> 仅 themeId === id 启用
         *   - 同时考虑 spec.capabilities.excluded（排除黑名单）
         *   - 若 spec.capabilities.containers 声明了白名单，未列入 = 未启用 */
        available: boolean;
        /** 是否在 spec.signatureContainers 内（"主题承诺签名"） */
        signature: boolean;
        /** 是否被 spec.capabilities.excluded 显式排除 */
        excluded: boolean;
    }>;
}
/**
 * 复合查询：聚合 vocabulary + theme + spec.capabilities + signatureContainers 给出
 * 本主题下"哪些容器可用 / 推荐 / 排除"的一站式视图。
 *
 * 调用方需要传入主题侧三件源数据（按 src/public 的成熟 API 风格，不让本模块反向依赖 personas）：
 *   - themeId / variants：来自 Theme.id / Theme.variants
 *   - capabilities：来自 spec.capabilities（缺省 → 兜底全集）
 *   - signatureContainers：来自 spec.signatureContainers（styleKey 集合，camelCase）
 */
export declare function getThemeCapabilitiesView(args: {
    themeId: string;
    variants: ThemeVariants;
    capabilities?: {
        containers?: readonly string[];
        variantOverrides?: Partial<ThemeVariants>;
        excluded?: readonly string[];
    };
    signatureContainers?: readonly string[];
}): ThemeCapabilitiesView;
/**
 * 反向索引：列出 `designedFor` 包含 themeId 的全部 variant id（按 kind 分组）。
 *
 * 与 getVariantsForContainer 的差别：本函数从主题视角枚举所有"为本主题设计"的 variant，
 * 用于"作者切到 swiss-grid 后，admonition 类除了主题默认还推荐用什么"这类查询。
 *
 * `spec.capabilities.variantOverrides` 中显式推荐的 id 会被排在该 kind 列表最前。
 */
export declare function getRecommendedVariantsFor(args: {
    themeId: string;
    capabilities?: {
        variantOverrides?: Partial<ThemeVariants>;
    };
}): Record<VariantKind, string[]>;
