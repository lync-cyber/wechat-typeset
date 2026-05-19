/**
 * 行级 lint —— 把 themeCSS 的"throw on forbidden"重写为"返回 Diagnostic[]"。
 *
 * 与 themeCSS.ts:assertSafeProp 共享 rules.ts 黑名单：assertSafeProp 现在就是
 * 这里的 lintProp 加一层 throw wrapper。新增使用者：
 *   - 用户态变体编辑（高级用户编辑 inline CSS）的 CodeMirror linter
 *   - UserVariant 保存期硬闸（落库前最后一次扫描）
 *
 * 优先级与短路：lintProp 按 forbidden-prop > forbidden-display > forbidden-value-pattern
 * 顺序检查，**返回最先命中的那一条**（最多 1 条）。这与重构前 assertSafeProp 的
 * 三段 if/throw 完全等价——assertSafeProp 只读 [0] 抛错，文案逐字一致。
 *
 * lintInlineCSS 按 ';' 切 decl、按首个 ':' 切 prop/value，对每条 decl 调一次 lintProp，
 * **聚合所有命中**（多条 decl 各自一条 diagnostic）。这是为了让 linter UI 一次性把
 * 所有问题都画出来，避免"修一条又冒一条"的体验。
 */
export type DiagnosticCode = 'forbidden-prop' | 'forbidden-display' | 'forbidden-value-pattern' | 'forbidden-tag' | 'forbidden-attr' | 'unknown-placeholder' | 'missing-body-placeholder' | 'duplicate-body-placeholder' | 'iframe-src-not-allowed';
export interface Diagnostic {
    severity: 'error' | 'warning';
    code: DiagnosticCode;
    prop: string;
    value: string;
    /** 调用方上下文。来源既可能是 themeCSS 的 'elements.p' 这种点路径，也可能是
     *  用户变体编辑场景的 'wrapperCSS' / 'titleCSS' 这种槽位名。 */
    path: string;
    /** 与 ThemeAuthoringError 文案逐字一致（重构前 assertSafeProp 的 throw message）。 */
    message: string;
}
/**
 * 检查单条 CSS 声明。优先级与原 assertSafeProp 一致，命中第一条即返回。
 */
export declare function lintProp(prop: string, value: string, path: string): Diagnostic[];
/**
 * 切 inline CSS 字符串（variant render() 实际产出格式：`'a:b;c:d'`），逐条 lintProp。
 *
 * 解析容忍：
 *   - 末尾 / 中间的空 decl（连续分号、尾分号）静默跳过
 *   - 缺 ':' 或 prop/value 为空的 decl 静默跳过（不视为 lint 错——格式问题留给 CSS parser）
 *   - value 内的额外 ':'（如 `background: url(http://...)`）按首个 ':' 切，余下整体为 value
 *
 * 不处理：带分号的字符串字面量 / url() 内分号——variant CSS 历来没有，真碰上再升级。
 */
export declare function lintInlineCSS(css: string, path: string): Diagnostic[];
/**
 * 校验 UserVariantCustom.template 的 HTML 与占位符。聚合所有命中（不短路），
 * 让 UI 一次性把全部问题画出来。不构造 DOM（Node 环境无 happy-dom 依赖），仅诊断
 * 不修复。
 */
export declare function lintTemplateHTML(template: string, path: string): Diagnostic[];
