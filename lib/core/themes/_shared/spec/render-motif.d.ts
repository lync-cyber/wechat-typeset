/**
 * motif AST → SVG 字符串
 *
 * gallery 和 renderer 共用同一条渲染路径，消除"gallery 长这样、生产长那样"drift。
 * 输出的 SVG 省略 xmlns（调用方按需自行包裹）；属性用双引号，便于嵌入 HTML。
 *
 * Token 引用：`fill` / `stroke` 字段支持 `'token:<key>'` 语法（key ∈ ThemeTokens.colors）。
 * 调用方传入 `tokens` 时由 resolveMotifColors 预处理为具体 hex；未传 tokens 则保留原值,
 * 与旧裸-hex 主题完全兼容。详见 ThemeTokens.colors 与 MotifPrimitive 注释。
 */
import type { ThemeTokens } from '../../types';
import type { MotifPrimitive, MotifShape, MotifTemplate, SvgInlineStyle, ViewBox } from './types';
/**
 * 把 motif AST 中的 `'token:<key>'` 颜色引用预解析为具体 hex。
 *
 * 设计纪律：spec.motifs 保持 JSON-serializable（无函数 / 无 tokens 上下文），
 * tokens 流动只发生在 specToTheme 投影时——本函数是这一步的唯一收口。
 */
export declare function resolveMotifPrimitives(primitives: readonly MotifPrimitive[], tokens: ThemeTokens): MotifPrimitive[];
export declare function renderPrimitive(p: MotifPrimitive): string;
/** `<svg>` 外层包装属性（不含 primitive 内容）。 */
export interface SvgWrapperAttrs {
    width?: number;
    height?: number;
    inlineStyle?: SvgInlineStyle;
}
/**
 * 将 viewBox + primitives 渲染为 `<svg>...</svg>` 字符串。
 *
 * 始终输出 xmlns——WeChat 的 HTML→SVG 粘贴管道对 xmlns 有依赖，省略会被平台解析器判作
 * 非 SVG 并回退成纯文本。
 */
export declare function primitivesToSvg(viewBox: ViewBox, primitives: readonly MotifPrimitive[], wrapper?: SvgWrapperAttrs): string;
export declare function shapeToSvg(shape: MotifShape, tokens?: ThemeTokens): string;
/**
 * 模板渲染：`{name}` 占位符替换后再产出 SVG。
 * 只替换 primitive 里的 string 字段（content / d / fill / stroke / dashes 等）——
 * 数值字段不参与替换（占位符必然是字符串量）。
 */
export declare function renderMotifTemplate(template: MotifTemplate, values: Record<string, string | number>, tokens?: ThemeTokens): string;
