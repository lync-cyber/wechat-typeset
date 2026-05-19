/**
 * Container Vocabulary —— 容器词汇表（权威单一真相来源）
 *
 * 这是 "Headless 组件契约 + 主题化渲染" 的契约层：
 *   - 主题无关：不含任何 CSS，不引用具体主题
 *   - 覆盖全集：枚举所有合法 `:::` markdown fence 名（覆盖 CONTAINER_REGISTRY 全部 24 个）
 *   - 派生数据：ThemeContainerStyles 类型、capabilities.json、运行时查询 API 都从这里派生
 *
 * 术语：
 *   - name        markdown fence 名（kebab-case；如 'quote-card' / 'section-title'）
 *   - styleKey    ThemeContainers 的 JS 字段名（camelCase；如 'quoteCard' / 'sectionTitle'）。
 *                 为 `null` 表示该容器**不参与 token 驱动 CSS**（如 free escape-hatch、pros/cons
 *                 嵌套子容器的样式由 compare 外层承担）。
 *   - variantKind 绑定到哪个 variant slot（无则该容器没有"骨架切换"能力，固定渲染）
 *   - category    作者心智分组：用于组件库 UI tab 与挑选建议
 *
 * 新增容器流程：
 *   1. 在本文件的 CONTAINER_VOCABULARY 末尾追加 ContainerSpec 条目
 *   2. 若 styleKey 非 null，同步在 themes/types.ts:ThemeContainers 里补字段
 *      + buildTheme.baseContainers() 里补默认值（可以是 `{}`）
 *   3. 在 pipeline/containers 里加 renderer，登记到 pipeline/containers/index.ts
 *   4. 若需要 signatureContainer 支持，只需补 SUPPORTED_SIGNATURE_CONTAINERS；
 *      fence 名映射由本文件末尾 STYLE_KEY_TO_CONTAINER_NAME 自动派生
 *
 * 本文件不 import renderer 实现，避免循环依赖 —— renderer 在独立层消费本词汇表。
 */
import type { VariantKind } from '../themes/types';
/**
 * 作者心智分组。组件库 UI 按此分 tab；LLM 做"推荐容器"时也按此聚合。
 */
export type ContainerCategory = 'structure' | 'admonition' | 'content' | 'navigation' | 'media' | 'signature' | 'data' | 'free';
/**
 * 契约扩展包 namespace（三层）：
 *   - `'base'`              基础契约，所有主题渲染（核心通用组件）
 *   - `pack:<domain>`       领域扩展包，多主题可借用（如 `pack:editorial` 刊物出版）
 *   - `theme:<themeId>`     主题专属扩展，只有该主题渲染时启用（如 `theme:data-brief`）
 *
 * 同一容器只能属于一个 namespace。pack 是契约文档分组手段，也是 capabilities.json
 * 与 build-writer-docs 的派生输入；理论上`theme:` 容器在其他主题中渲染会回退到 free 兜底。
 *
 * 新增 namespace 流程：
 *   1. 直接给容器 spec 写 `pack: 'pack:<domain>'` 或 `pack: 'theme:<id>'`（无须改 union）
 *   2. 在 scripts/build-writer-docs.ts:PACK_TARGETS 追加文档目标
 *   3. 在目标文档里放置 `<!-- generated:container-quick-ref:<pack>:start/end -->` 标记对
 */
export type ContainerPack = 'base' | `pack:${string}` | `theme:${string}`;
/**
 * open 行允许声明的 `key=value` attr。attrs 是**额外**语义，不是 variant 切换。
 *   - variant=xxx 是全容器共享的，不在这里声明。
 *   - 未声明的 attr 仍会被 parseInfo 收集，但没有契约保证 renderer 会消费。
 */
export interface AttrSpec {
    key: string;
    description: string;
    /** 示例值，用于 snippet 生成 */
    example?: string;
    /** 若为枚举型，列出合法值 */
    enum?: readonly string[];
}
export interface ContainerSpec {
    /** markdown fence 名（kebab-case）—— 作者直接写 `::: {name}`. */
    name: string;
    /**
     * ThemeContainers 的对应 JS 字段名（camelCase）。
     * `null` 表示该容器不参与 token-driven CSS（free / pros / cons）。
     */
    styleKey: string | null;
    category: ContainerCategory;
    /**
     * 所属契约扩展包。缺省（未声明）= 'base'。
     * 设计为可选：base 容器**不需要**显式标注 pack，减少日常新增 base 容器的样板；
     * 仅扩展包（如 'data-brief'）成员需要主动声明。
     */
    pack?: ContainerPack;
    /** 绑定的 variant slot；无 variantKind = 固定骨架，渲染器不读 theme.variants。 */
    variantKind?: VariantKind;
    /** 是否可嵌套（pros/cons 嵌在 compare 内） */
    nestable?: boolean;
    /** 允许的 key=value attr 声明（白名单，非强制） */
    attrs?: readonly AttrSpec[];
    /** 允许的子容器名（仅嵌套型使用；compare → pros/cons） */
    children?: readonly string[];
    /** 若本容器必须嵌在某父容器内，填父容器 name */
    parent?: string;
    /** markdown-it-container fence 长度（compare 外层 4 个冒号，其他 3 个） */
    fenceLength: 3 | 4;
    /**
     * 叙述强度梯度（1 ≤ x ≤ 5）。docs/wechat-typeset-container/persona-contracts.md
     * 规则 1 / 4 / 5 派生:LLM 写作时选容器按强度从弱到强递进。
     *   1 = highlight（段内关键短句）
     *   2 = note（中性补注）
     *   3 = admonition 四态 (tip/warning/info/danger) / abstract（提请注意、文首总览）
     *   4 = quote-card / announcement（独立块，整版级强调）
     *   5 = pull-quote / key-number（视觉重心，独占段位）
     * 未声明 = 该容器不在叙述强度梯度内（结构 / 索引 / 元数据类容器）。
     */
    narrativeStrength?: 1 | 2 | 3 | 4 | 5;
    /** 一句话描述 —— 作者视角"这个容器是做什么的" */
    description: string;
    /** 最小可用 markdown 示例（含起止 fence，自带末尾 \n） */
    example: string;
}
/** 单一真相来源：所有合法容器的权威词汇表（只读）。 */
export declare const CONTAINER_VOCABULARY: readonly ContainerSpec[];
export declare function lookupContainerSpec(name: string): ContainerSpec | undefined;
/** 所有容器 markdown 名 fence 的 kebab 清单。 */
export declare const CONTAINER_NAMES: readonly string[];
/** styleKey 非 null 的容器 list（用于 ThemeContainerStyles 类型派生与 themeCSS 迭代）。 */
export declare const STYLED_CONTAINERS: ReadonlyArray<ContainerSpec & {
    styleKey: string;
}>;
/** 所有 styled 容器的 styleKey 清单（camelCase；ThemeContainers 的必备字段集）。 */
export declare const CONTAINER_STYLE_KEYS: readonly string[];
/** kebab → camel 映射（markdown fence → ThemeContainers 字段）。 */
export declare const CONTAINER_NAME_TO_STYLE_KEY: Readonly<Record<string, string>>;
/** camel → kebab 映射（spec.signatureContainers 用 camelCase，markdown fence 用 kebab）。 */
export declare const STYLE_KEY_TO_CONTAINER_NAME: Readonly<Record<string, string>>;
/**
 * 取容器所属 pack。缺省（spec.pack 未声明）= 'base'。
 * 这是 pack 字段对外消费的唯一入口——build-writer-docs / capabilities.json /
 * 文档生成器都从这里读，避免重复内嵌 'pack === undefined ? base' 三元判断。
 */
export declare function packOf(spec: ContainerSpec): ContainerPack;
/** 某 pack 包含的所有容器 spec。 */
export declare function containersInPack(pack: ContainerPack): ContainerSpec[];
/** Namespace 分类：base / 领域扩展（pack:*）/ 主题专属（theme:*） */
export type PackNamespace = 'base' | 'pack' | 'theme';
/** 从 pack 值取 namespace 类别。`'base'` → `'base'`；`'pack:X'` → `'pack'`；`'theme:X'` → `'theme'`。 */
export declare function namespaceOf(pack: ContainerPack): PackNamespace;
/** 取 namespace 后的部分。`'pack:editorial'` → `'editorial'`；`'theme:data-brief'` → `'data-brief'`；`'base'` → `''`。 */
export declare function namespaceIdOf(pack: ContainerPack): string;
/** 列出词汇表中出现过的所有 pack 值（去重，稳定排序：base 在前，pack:* 中间，theme:* 在后）。 */
export declare function listPacks(): readonly ContainerPack[];
/**
 * 判定容器在给定主题语境下"是否启用"。
 *   - base / pack:* 任何主题都启用
 *   - theme:<id> 只在 themeId === id 时启用
 *
 * Renderer 不直接读本函数（兼容期内 markdown 仍可写 theme:* 容器，会得到 token 兜底）。
 * capabilities / lint / 推荐 API 用本函数决定"该不该曝光给作者"。
 */
export declare function isContainerEnabledForTheme(spec: ContainerSpec, themeId: string): boolean;
/**
 * 渲染行为维度（对 category 的归纳，独立于作者心智分组）。
 *   - variantized：有 variant slot 可切骨架
 *   - admonition：四态 tip/warning/info/danger 共享 variant 清单
 *   - nested：必须嵌在父容器内
 *   - fixed：固定骨架 + 主题化 CSS 槽位
 *   - free：兜底 escape-hatch，无主题样式
 */
export type ContainerKind = 'variantized' | 'admonition' | 'nested' | 'fixed' | 'free';
export declare function kindOf(spec: ContainerSpec): ContainerKind;
/** capabilities.json `notes` 字段派生：给作者解释容器的特殊约束。 */
export declare function notesFor(spec: ContainerSpec): string | undefined;
