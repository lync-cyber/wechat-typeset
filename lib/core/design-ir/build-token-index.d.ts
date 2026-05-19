/**
 * 18 主题 palette → hex 反查表。
 *
 * 设计动机：[literal-to-token.ts] 原本手抄了 4 个设计稿主题（t1-t4）的字面色映射；
 * 随着项目集成 18 主题，手抄路线无法跟上 palette 演进。本模块从 [ORDERED_SPECS]
 * 反向派生 `hex → [{themeId, paletteKey}, ...]`，让"字面色 → ctx.tokens 路径"
 * 查询永远与主题 spec 一致。
 *
 * 派生范围（每主题贡献 ≈ 25 条）：
 *   - `palette.*` 11 必填 + 9 可选语义槽（preBg/preText/textCaption/highlightBg/
 *     codeBg/quoteCardBg/noteBorder/accentClassical/accentNaturalist）
 *   - `status.{tip|warning|info|danger}.{accent|soft}` 8 字面
 *
 * 不派生：noteBorderStyle / noteBorderWidth（非 hex）；motifs 颜色（已是 'token:*'
 * 引用，不引入新字面）；inline / containers / elements 内的 hex（按 token-flow lint
 * 契约必须等于 palette 内某项，否则 spec 自身已经测试失败）。
 *
 * 性能：模块级 lazy build + freeze。首次调用建索引（~50ms），后续 O(1)。
 */
/**
 * 单条反查命中：一个字面 hex 在某主题的某个 palette key 上出现。
 *
 *   - `themeId`：18 主题之一的 id（如 `'literary-humanism'`）
 *   - `paletteKey`：palette 字段路径。一级 = palette 直字段（`'primary'`）；
 *     二级 = status 路径（`'status.tip.accent'`）
 *   - `ctxPath`：variant render 里直接可用的字面（如 `'tokens.colors.primary'`）—— 让
 *     LLM 写 `${ctx.tokens.colors.primary}` 时只读一字段即可
 */
export interface TokenHit {
    themeId: string;
    paletteKey: string;
    ctxPath: string;
}
export type TokenIndex = ReadonlyMap<string, readonly TokenHit[]>;
/**
 * 从 18 主题派生完整反查表。模块级缓存：第一次调用建索引，后续返回同一实例。
 *
 * 重建路径：项目重新打包 / 测试重启即重建——主题 spec 是编译期常量，运行期不会变。
 */
export declare function buildTokenIndex(): TokenIndex;
/** 仅测试用：清缓存（让单测可在 spec mock 后重建）。 */
export declare function __clearTokenIndexCacheForTest(): void;
export interface LookupTokenResult {
    /** 查询本身的归一化字面。 */
    literal: string;
    /** 优先匹配（preferredThemeId 指定且命中）—— null = 该主题 palette 内没有此色。 */
    preferred: TokenHit | null;
    /**
     * 全局所有命中。`preferred` 指定时排在最前；其余按主题 id 字典序。
     * 一个 hex 可能出现在多个主题（如 `#1f1b14` 在多个"墨黑"主题）—— 给 LLM 完整信息，
     * 由调用方决定如何挑（一般取 preferred；无 preferred 时取 hits[0]）。
     */
    hits: readonly TokenHit[];
}
/**
 * 字面色查询的主入口。
 *
 *   - 命中 + 指定 `preferredThemeId` → `preferred` 字段为该主题的 hit
 *   - 命中 + 未指定 preferred → `preferred` 为 null，调用方走 `hits[0]`
 *   - 未命中 → `hits` 为空数组，`preferred` 为 null
 *
 * 永不抛错：未命中是合法状态（设计稿可能用了未在任何主题登记的色，提示 LLM 补
 * palette 语义槽即可）。
 */
export declare function lookupToken(literal: string, preferredThemeId?: string): LookupTokenResult;
