/**
 * 主题工厂：给 tokens 就能得到完整 Theme。
 *
 * 分层（两个包装器共用同一底层工厂）：
 *   - buildTheme（本文件）——底层：tokens + 补丁 → Theme。不感知 spec / palette
 *   - specToTheme（./spec/spec-to-theme.ts）——PersonaSpec → buildTheme args
 *   - applyPalette（../../color/applyPalette.ts）——既有 Theme + 新 palette → buildTheme args
 *   两条路径共享同一份 mergeStyle 与 DEFAULT_VARIANTS 兜底逻辑；applyPalette 的 delta
 *   路径须与 spec 语义严格隔离，因此不能把 buildTheme 内联进 specToTheme。
 *
 * 深合并语义（element/container/inline 三者一致）：
 *   patch[key] 不存在 → 保留 base[key] 原样
 *   patch[key] 存在 → 默认"属性级合并"：{ ...base[key], ...patch[key] }
 *   patch[key].__reset === true → 切换为"整段替换"：仅保留 patch[key] 自身属性
 *
 * assets 是扁平 key → string/function 的映射，无嵌套 CSS，故走浅合并即可。
 */
import type { Decorations, SvgVariant, Theme, ThemeAssets, ThemeContainers, ThemeElements, ThemeInline, ThemeInnerStyles, ThemeKickers, ThemeTemplates, ThemeTokens, ThemeVariants } from '../types';
/**
 * 单 key 样式补丁值：宽于 CSSObject 以容纳 `__reset: true` sentinel。
 * 非 `__reset` key 的值仍应是 `string | number`；类型由消费方通过 CSSObject 收窄。
 */
export type CSSObjectPatch = {
    __reset?: true;
    [prop: string]: string | number | true | undefined;
};
/**
 * 样式补丁类型：每个 key 是 CSSObjectPatch，可选追加 `__reset: true` 触发整段替换。
 * 运行时从对象上剥离 `__reset` 再做合并。
 */
export type StylePatch<T> = {
    [K in keyof T]?: CSSObjectPatch;
};
/**
 * 主题基线选择：
 *   - `'light'`（默认）  浅底主题的"软底色卡片 + 圆角"兜底。Medium / Notion / Substack 家族。
 *   - `'dark'`           暗底主题的"hairline 边 + 透明底 + 直角"兜底。brutalist /
 *                        late-night-vinyl 等。让暗底主题作者免去整段 `__reset` 容器底色。
 *
 * 设计纪律：dark 基线只针对"会撞背景"的卡片型容器（intro / quoteCard / highlight /
 * footerCTA / recommend / authorBio / toc / kpiDashboard / barChart / abstract /
 * keyNumber）改 transparent + hairline，其它结构性容器（compare / steps / cover）
 * 与元素色（h1-h6 / p / ul / a 等）依旧走 tokens 自动跟随，不需要分两套。
 */
export type BaseTheme = 'light' | 'dark';
export interface BuildThemeOptions {
    id: string;
    name: string;
    description: string;
    author?: string;
    preview?: string;
    tokens: ThemeTokens;
    /**
     * 基线主题（light / dark）。缺省 = `'light'`。
     *
     * 切到 `'dark'` 时 baseContainers / baseElements 的"软底卡片"兜底改为"hairline 边 +
     * 透明底 + 直角"，让暗底主题（brutalist / late-night-vinyl）作者免去把每个软底容器
     * 都写一遍 `__reset: true, background-color: transparent`。
     *
     * 切基线 != 切色板：主题色仍由 palette 控制；基线只控制"软底卡 vs hairline 边"这条结构轴。
     */
    baseTheme?: BaseTheme;
    /**
     * 参数化 SVG 工厂变体。声明则触发 `buildAssets({tokens, variant})` 生成基线 assets,
     * 再由 `assets` 字段（如提供）做浅合并。**用于 applyPalette 的 runtime 路径**。
     *
     * 与 `svgVariant` 的关系：
     *   - `variant` 显式声明 = "调工厂生成 assets" + "写入 Theme.svgVariant" 双重副作用
     *   - `svgVariant` 仅写入 Theme.svgVariant（metadata-only）；用于 spec-to-theme 路径,
     *     该路径 assets 直接来自 motifs AST 渲染, 不需要触发工厂
     *   - 两者并存且 `variant` 优先（同时透出到 Theme.svgVariant）
     */
    variant?: SvgVariant;
    /**
     * 仅作为 Theme.svgVariant 的 metadata 透传, 不触发 buildAssets。spec-to-theme 在此
     * 字段透传 spec.svgVariant；applyPalette 不读此字段（它显式传 variant）。
     */
    svgVariant?: SvgVariant;
    /**
     * 元素级样式：属性级深合并到 baseElements(tokens) 之上。
     * `__reset: true` sentinel 可在某 key 上切换为整段替换。
     * 包含 pre / code。
     */
    elements?: StylePatch<ThemeElements>;
    /** 容器级样式（同 elements 语义） */
    containers?: StylePatch<ThemeContainers>;
    /**
     * 容器内层元素样式（同 elements 语义）。承载 abstract kicker / key-number 数字 /
     * 大数字 kicker 等"renderer 内部子元素"样式槽位; renderer 通过 ctx.innerStyles 消费,
     * 不进 themeCSS 生成器。
     */
    innerStyles?: StylePatch<ThemeInnerStyles>;
    /** 内联级样式（同 elements 语义） */
    inline?: StylePatch<ThemeInline>;
    /**
     * SVG 资产补丁：与工厂产物（buildAssets({variant})）做浅合并。
     * ThemeAssets 是扁平 string/function，无需深合并。
     */
    assets?: Partial<ThemeAssets>;
    /** 模板片段（封面卡 / 作者栏 / CTA / 推荐） */
    templates?: ThemeTemplates;
    /**
     * 骨架变体。未声明时用 DEFAULT_VARIANTS。
     * Partial 支持"只换一项骨架" —— 比如某主题想 admonition 走 terminal、其余默认。
     */
    variants?: Partial<ThemeVariants>;
    /**
     * Renderer 默认 kicker 文案的主题级覆盖。未声明时用 DEFAULT_KICKERS。
     * Partial 支持"只换一项" —— 比如某主题只想覆盖 qaBlock kicker、其余保持默认。
     */
    kickers?: Partial<ThemeKickers>;
    /**
     * 声明式装饰规则。所有主题专属视觉签名（标题前缀编号 / intro 首字下沉等）
     * 都通过本字段承载，共享层只实现一次"按声明执行"。
     */
    decorations?: Decorations;
    /**
     * 主题能力自描述（PersonaSpec.capabilities 的运行时透传）。
     * 仅作为 metadata 写到 Theme.capabilities；不参与渲染。
     */
    capabilities?: {
        containers?: readonly string[];
        variantOverrides?: Partial<ThemeVariants>;
        excluded?: readonly string[];
    };
}
export declare function baseElements(tokens: ThemeTokens): ThemeElements;
export declare function baseContainers(tokens: ThemeTokens): ThemeContainers;
export declare function baseInline(tokens: ThemeTokens): ThemeInline;
/**
 * 容器内层元素 inline-style 兜底。主题作者通过 spec.innerStyles 深合并接管
 * （如把 keyNumber 数字字号从 32px 调到 28px）。
 */
export declare function baseInnerStyles(tokens: ThemeTokens): ThemeInnerStyles;
export declare function buildTheme(opts: BuildThemeOptions): Theme;
