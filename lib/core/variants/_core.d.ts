/**
 * 统一 Variant 注册表契约（VariantDef 目标形状）
 *
 * 一个 variant = 一个目录下的单文件，default-export 一个 `VariantDef`：
 *   - meta：id / kind / 中文短名 / 描述 / designedFor（设计起源主题白名单，软推荐）
 *   - thumbnail：75×75 inline SVG 工厂（接 ThumbArgs）
 *   - snippets：该 variant 对外产出的"预设"条目（同一 variant 可有多条：
 *     不同 kind / 不同文案 / 不同 thumbArgs），组件库 UI 聚合时摊平
 *   - render：容器渲染逻辑（kind='none' 的自由组件 render 可省略）
 *
 * codeBlock variant 的 render 签名异质（theme, args）；保留独立 CodeBlockDef
 *   类型避免在 VariantDef 里塞断言/any。参见 codeBlock/_shared 的设计注释。
 */
import type { ContainerRenderContext } from '../pipeline/containers/types';
import type { Theme, VariantKind } from '../themes/types';
import type { ThumbArgs } from './_thumb';
export interface VariantRenderResult {
    wrapperCSS: string;
    /**
     * 标题行 inline style。
     *   - undefined  → renderer 用默认 title 样式（bold + accent 色）
     *   - 非空字符串 → renderer 用此样式渲染 title section
     *   - 空字符串   → renderer **跳过** 默认 title 行，标题文字由 svgSlot 自行承担
     *                  （仅在 variant 需要特殊 title 结构，如 terminal 的"圆点条 + 文字"时使用）
     */
    titleCSS?: string;
    bodyCSS?: string;
    svgSlot?: string;
    /**
     * 抑制 renderer 默认注入的 icon（来自 title.iconKey）。
     * 用于"标题本体是实色徽章/胶囊，icon 与底色同色不可见反而占位"的场景——典型如
     * admonition.pill-tag：accent 底胶囊上的同色 icon 不可见，却把文字向右挤偏。
     * undefined / false = 沿用默认（注入 ctx.assets[iconKey]）；true = 不渲染 icon。
     */
    suppressIcon?: boolean;
    /**
     * quote-card 容器在 body 关闭后、byline 前注入的 HTML 片段。仅 quote.ts 消费,
     * 其余容器忽略。给"开/闭引号成对"的 variant 一个挂载点——典型如 classic 在 svgSlot
     * 输出 `「`、在 closeSlot 输出对称的 `」`，闭合成对。undefined = 不注入。
     */
    closeSlot?: string;
    /**
     * quote-card byline 行 inline style。仅 quote.ts 消费,其余容器忽略。
     * undefined = 走默认（居中 textMuted 13px）;非空 = 变体自定义。
     * 给印刷体 pull-quote / editorial 风格变体一个手柄,让 byline 字号/字距/对齐能跟主视一致。
     */
    bylineCSS?: string;
    /**
     * quote-card byline 前缀字符。仅 quote.ts 消费。
     * undefined = 走默认 "— "（U+2014 + 空格）。常见替换:"—— "(中文双破折号) / ""(无前缀)。
     */
    bylinePrefix?: string;
    /**
     * pull-quote 容器在 body 内部 `<p>` 上注入的 inline style。仅 pull-quote.ts 消费。
     *
     * 为什么需要独立槽位：body 内容由 markdown-it 渲染为 `<p>`，theme.elements.p 通过
     * juice 内联到 `<p style="font-size:14px;...">`，直接设 bodyCSS 不会改变内层 p 的字号。
     * pull-quote 容器把本字段挂到 `.container-pull-quote--{id} > .__body > p` 选择器，
     * juice 按 specificity (0,3,1) 覆盖 theme.p 的 (0,0,1)，从而把引文做大。
     */
    quoteCSS?: string;
    /**
     * qa-block 容器专用四段插槽（仅 qa-block 容器消费）。
     *
     * qa-block 的内部结构（kicker / Q 行 / A 行 + markdown body）跨 8 个 variant 形态差异
     * 大（朱印徽章 vs 大号斜体 vs 圆方代号 vs 反白分栏 ...），不适合 4 段通用 SPI；
     * 改让每个 variant 自行拼装 HTML 字符串。renderer 只把 wrapper 外壳与 close 标签套上。
     *
     * 节点序：
     *   `<section class="container-qa-block container-qa-block--{id}" style="{wrapperCSS}">`
     *      {kickerHtml}     // 空串 = 不渲染
     *      {qHtml}          // 空串 = 不渲染问行（仅答）
     *      {aOpenHtml}      // 答行 open + body wrapper open
     *      ...markdown body 流...
     *      {aCloseHtml}     // body wrapper close + 答行 close
     *   `</section>`
     *
     * 约束：所有 HTML 必须满足公众号粘贴白名单（display:table/table-cell/inline-block；
     * 禁 grid/flex/gap/position:absolute）。attrs.q 用 escText 强制 escape。
     */
    qaBlock?: QaBlockSlots;
}
export interface QaBlockSlots {
    /** kicker 行完整 HTML。空串 = 不渲染 kicker。 */
    kickerHtml: string;
    /** 问行完整 HTML（attrs.q 已 escape 嵌入；renderer 不再追加任何内容）。空串 = 不渲染问行。 */
    qHtml: string;
    /** 答行 open 段；renderer 在此后流式注入 markdown body。 */
    aOpenHtml: string;
    /** 答行 close 段；与 aOpenHtml 配对（open 几层 tag，close 闭几层）。 */
    aCloseHtml: string;
}
export type AdmonitionKind = 'tip' | 'warning' | 'info' | 'danger';
export interface AdmonitionRenderArgs {
    kind: AdmonitionKind;
}
export interface CompareRenderArgs {
    slot: 'wrapper' | 'pros' | 'cons';
    title?: string;
}
export interface CodeBlockRenderArgs {
    /** 已识别的语言 id（'javascript' / 'python' / ''），空串 = 无法识别或未指定 */
    language: string;
    /** hljs 产出的 <code> 内层 HTML（已 escape，已 span 着色） */
    codeInnerHtml: string;
}
export type VariantRender<Args = void> = Args extends void ? (ctx: ContainerRenderContext) => VariantRenderResult : (ctx: ContainerRenderContext, args: Args) => VariantRenderResult;
export type CodeBlockRender = (theme: Theme, args: CodeBlockRenderArgs) => string;
/** 预设条目（派生 BUILTIN_COMPONENTS 的原子）。 */
export interface VariantSnippet {
    /** 全局稳定 id（如 'ad-tip-accent-bar'） */
    presetId: string;
    /** UI 展示短名 */
    name: string;
    /** 一句话描述（≤30 字） */
    description: string;
    /** admonition kind；非 admonition 忽略 */
    admonitionKind?: AdmonitionKind;
    /**
     * 缩略图调色覆盖。不同 kind / 不同主题想要的缩略图配色通常不同，
     * 走这里避免每个 snippet 重复写完整 thumbnail 函数。
     */
    thumbArgs?: ThumbArgs;
    /** 可直接插入编辑器的 markdown fence（自带末尾 \n） */
    markdown: string;
    /**
     * 设计起源主题 id 列表（**软推荐**）。snippet 级覆盖 meta.designedFor，
     * 用于"同 variant 不同 snippet 推荐不同主题"的细粒度（如 terminal info 专推 tech-geek）。
     *
     * 不参与运行时回退：渲染管线对作者级 `variant=xxx` override 一律忠实渲染，
     * 不在不兼容时偷换骨架。本字段仅供面板 badge / lint 提示等 UI 层消费。
     */
    designedFor?: readonly string[];
}
export interface VariantMeta {
    /** 全局唯一 id（如 'accent-bar' / 'terminal' / 'column-card'） */
    id: string;
    /** 所属分类（决定 renderer 分派与 UI tab） */
    kind: VariantKind | 'none';
    /** UI 展示短名（中文，给组件库 UI） */
    name: string;
    /** ≤30 字说明 */
    description: string;
    /**
     * 设计起源主题 id 列表（**软推荐**，不参与运行时回退）。
     *
     * 语义：variant 的视觉签名是为哪些主题设计的——`['literary-humanism']` 表示
     * 单主题专属签名，`['tech-geek', 'tech-explainer']` 表示多主题共享。空/缺省 = 通用。
     *
     * 不影响渲染：作者写 `variant=xxx` 时引擎总是忠实渲染，绝不偷换。本字段仅供：
     *   - 组件面板 cell badge（不兼容主题下灰色提示"为 XX 主题设计"）
     *   - 编辑器 lint info-level 提示
     *   - 主题作者推荐排序（getRecommendedVariantsFor）
     *   - usage 分析 (实证采用率)
     *
     * 取等效白名单一律走 `getEffectiveCompat(meta)`，不直接读字段。
     */
    designedFor?: readonly string[];
    /**
     * 实验性变体：当前无任何主题以默认骨架使用、也无 designedFor 关联。
     * 出现在 VARIANT_IDS 主表里是为了"骨架已就绪、等首个采用方"；
     * `getRecommendedVariantsFor` 会把它们排到列表末尾且不算"推荐"。
     *
     * conformance: 每个 VARIANT_IDS 成员必须满足 "≥1 主题采用" OR "designedFor 非空" OR "experimental === true"。
     * 移除流程：让某主题把它升级为默认骨架，或加入 designedFor → 删 experimental 标。
     */
    experimental?: boolean;
    /**
     * 实验性 variant 进入 main 的日期（ISO 8601，YYYY-MM-DD）。
     * 与 experimental: true 配套：让 orphan 倒计时可机器化检测，避免静默积累。
     * conformance 守卫：experimental === true ⇒ experimentalSince 必填。
     */
    experimentalSince?: string;
    /**
     * 视觉手法标签（kebab-case 单词数组）。跨 kind 共享词表，
     * 用于新增 variant 时检测"是否已有同手法近邻"。
     * 渐进登记，缺省不影响 conformance。
     */
    motif?: readonly string[];
}
/**
 * 取 meta 的"等效设计起源白名单"——variant 是为哪些主题设计的（软推荐）。
 *
 * 字段 `designedFor` 形态：
 *   - `designedFor: ['literary-humanism']`          单主题签名
 *   - `designedFor: ['tech-geek', 'tech-explainer']` 多主题共享
 *   - 空/缺省                                       通用、无主题偏好
 *
 * 所有消费方（usage / api / 组件库 / 面板 badge）一律走本 helper，避免漂移。
 * 渲染管线不消费本字段——作者 `variant=xxx` override 总是忠实渲染，不偷换。
 */
export declare function getEffectiveCompat(meta: VariantMeta | undefined): readonly string[];
/**
 * 用户态变体 token 字段元数据。
 *
 * 一个 variant 想暴露给用户调的字段（颜色 / 字号 / 边距等），声明一条 TokenField；
 * UI（TokensPanel）按 type 渲染对应控件，用户填写后写回 UserVariantTokens.tokens。
 * variant render() 在 CSS 字符串里用 `var(--uv-<key>, <fallback>)` 占位，由
 * applyUserVariant 在 wrapperCSS 末尾注入 `--uv-<key>: <value>`。
 *
 * 与 VariantMeta 解耦：tokenSchema 是 variant 文件 default-export 之外的命名导出
 * （`export const tokenSchema`），让"未 token 化的 variant"零侵入，渐进迁移。
 *
 * 取值口径：
 *   - color：合法 CSS 颜色字符串（#rrggbb / rgba(...) / 命名色）
 *   - size：长度值（"16px" / "1.2em" / "12px 18px"），简单透传
 *   - text：任意字符串（罕用，先留口）
 *
 * 不在此处校验：lintInlineCSS 在保存期统一兜（步骤 1 已就绪）。
 */
export type TokenFieldType = 'color' | 'size' | 'text';
export interface TokenField {
    /** 字段类型，决定 UI 控件 */
    type: TokenFieldType;
    /** UI 展示短标签（中文） */
    label: string;
    /** 默认值——variant render() 里 `var(--uv-<key>, <default>)` 的 fallback 段必须用同一值 */
    default: string;
    /** 可选：≤30 字辅助说明 */
    hint?: string;
}
/**
 * 一个 variant 的 token schema：key → TokenField。
 * key 是 CSS 自定义属性名片段（kebab-case 友好，不要包含 `--` 前缀，由 injectTokens 补）。
 * 例：'quote-color' → 渲染到 DOM 为 `--uv-quote-color`。
 */
export type TokenSchema = Readonly<Record<string, TokenField>>;
/**
 * 标准容器 variant（kind ∈ admonition/quote/compare/steps/divider/sectionTitle/none）。
 * kind='none' 表示自由组件（intro/author/cover 等），render 可省略。
 */
export interface VariantDef<Args = void> {
    meta: VariantMeta;
    /** 75×75 缩略图工厂。接 ThumbArgs 返回 inline SVG 字符串。 */
    thumbnail: (args?: ThumbArgs) => string;
    /** 该 variant 在组件库里曝光的预设条目（≥1 条）。 */
    snippets: ReadonlyArray<VariantSnippet>;
    /** 容器渲染函数；kind='none' 的自由组件可省略。 */
    render?: VariantRender<Args>;
    /**
     * 可选：暴露给用户调的命名 token。命名导出（`export const tokenSchema`）+ default
     * export 上挂同一引用，让外部既能 `import { tokenSchema } from '<id>.ts'` 拿单文件
     * schema，也能从 VariantDef 实例上读到。无 schema 的 variant 不参与 L1 tokens 面板。
     */
    tokenSchema?: TokenSchema;
}
/**
 * codeBlock 独立类型：render 签名为 (theme, args)，与容器栈无关。
 * 为什么不统一进 VariantDef<CodeBlockRenderArgs>：render 第一个参数不是 ctx，
 * 强行统一会引入断言。见旧 registry.ts 设计注释。
 */
export interface CodeBlockDef {
    meta: VariantMeta & {
        kind: 'codeBlock';
    };
    thumbnail?: (args?: ThumbArgs) => string;
    snippets: ReadonlyArray<VariantSnippet>;
    render: CodeBlockRender;
    /** 与 VariantDef.tokenSchema 同语义；codeBlock 当前未启用，留口让形态对齐。 */
    tokenSchema?: TokenSchema;
}
/**
 * 按 kind 过滤后按 ORDER 数组重排 defs，未在 ORDER 中的 def 按 id 字典序追加到末尾。
 *
 * 用于把 variant 集合按"展示顺序常量表"做稳定排序——既不丢漏新增项（避免改 ORDER
 * 时静默丢失），也不让显式列出的乱序。registry.ts 用它派生运行时 render 表，
 * domain/components-lib/sources/builtin-source.ts 用它派生面板 UI 顺序——
 * 两个 ORDER 常量可独立，但算法共享。
 */
export declare function orderDefsByKind<T extends {
    meta: {
        id: string;
        kind: string;
    };
}>(defs: readonly T[], kind: string, order: readonly string[]): T[];
