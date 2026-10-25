/**
 * specToTheme：PersonaSpec → Theme 的投影函数（spec 分支的包装器）。
 *
 * 分层定位：本文件是 `buildTheme` 工厂的**包装器之一**——负责把 PersonaSpec 翻译为
 * BuildThemeOptions。另一包装器是 `src/color/applyPalette.ts`，走 palette delta 路径。
 * 两者共享同一份 buildTheme（深合并 + DEFAULT_VARIANTS 兜底），接缝只在"输入域不同"。
 *
 * 这是 spec-first 架构的核心：一份 PersonaSpec 通过这条函数产出运行时 Theme，
 * gallery HTML 也从同一份 spec 派生，conformance 测试据此断言 specToTheme(spec) = Theme。
 *
 * 纯函数、无副作用；不做 spec 合法性检查（校验走 validateSpec）。
 */
import type { Theme, ThemeAssets, ThemeTokens } from '../../types';
import type { MotifSpec, PersonaSpec } from './types';
/**
 * PersonaSpec.palette + status + typography + spacing + radius → ThemeTokens。
 *
 * 导出供下游 motif 消费方（gallery / showcase / cover-placeholder / UI 导出）调用——
 * 它们直接读 spec.motifs 渲染时需要 tokens 来解析 `'token:<key>'` 引用，但没有
 * 完整 specToTheme 流程，本函数让它们能拿到等价 tokens 实例。
 */
export declare function toThemeTokens(spec: PersonaSpec): ThemeTokens;
/**
 * MotifSpec → ThemeAssets（AST 渲染为 SVG 字符串 / 带参模板渲染为函数）。
 *
 * `tokens` 用于解析 motif fill/stroke 中的 `'token:<key>'` 引用（详见 render-motif）。
 * 老主题写裸 hex 不受影响；缺省 tokens 时所有 token 引用会被原样写入 SVG（开发期可见）。
 */
export declare function motifsToAssets(motifs: MotifSpec, tokens?: ThemeTokens): ThemeAssets;
/**
 * PersonaSpec → Theme 的投影函数。内部委托给已扁平化的 buildTheme。
 *
 * 顺序：tokens → assets（由 motifs AST 渲染）→ buildTheme 负责 elements/containers/inline
 * 的属性级深合并 + DEFAULT_VARIANTS 补全。
 *
 * capabilities：spec 未声明时由 deriveCapabilities 派生（让运行时 Theme.capabilities 始终非空，
 * LLM / 推荐 API 不需在调用点再做"未声明则全集"的兜底分支）。
 */
export declare function specToTheme(spec: PersonaSpec): Theme;
