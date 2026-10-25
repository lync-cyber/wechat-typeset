/**
 * 作者编辑期诊断 —— "在作者离开编辑器之前告诉他会塌"。
 *
 * 现状：塌版反馈链过长——作者写错容器名 / 错层级 / 错 variant，必须
 *   1) 复制 → 2) 粘到公众号 → 3) 肉眼看塌 → 4) 回来找错。
 * 目标：把可静态确定的违规翻译成行号 + 消息，接入 CodeMirror lintSource，
 *       作者在编辑器里直接看到红波浪线。
 *
 * 本文件**仅做静态分析，不执行 markdown 渲染**——pipeline 的渲染期告警保留
 * （比如 variantized 容器的主题缺 variant 实现），两层互补：
 *   - diagnose.ts：语法级、容器契约级（离线可判）
 *   - pipeline + wxPatch：渲染期、DOM 级（需真 HTML 才判得出）
 *
 * Stage 1 覆盖（按 writer-contract 的作者 API 全集反向打点）：
 *   - 未知容器名（vocabulary 反查）
 *   - fence 长度错误（compare 需要 ::::；pros/cons 只能 :::）
 *   - pros/cons 写在 compare 之外
 *   - 未知 variant 值（按 container.variantKind 查 VARIANT_IDS）
 *   - 未闭合 fence
 *   - open 行写 YAML 风格 `key: v`（应为 key=v）
 *
 * Stage 2 覆盖（追加）：
 *   - 列表嵌套 ≥ 3 层（list-too-deep）——配合 wxPatch/patchListWrap 的扁平化兜底，
 *     在编辑期提前告诉作者"这一行会在公众号里被改写为段落"。
 *
 * Stage 3 覆盖（追加）：
 *   - 中文排版四类（zhTypo 模块）：中英空格 / 全半角 / 直引号 / 省略号破折号。
 *     规则实现沉到 zhTypo.ts，diagnose 只做翻译层。
 */
import { type ZhTypoCode } from './zhTypo';
export type DiagnosticSeverity = 'error' | 'warning' | 'info';
/**
 * 单点 quick-fix：一组确定性的文本编辑。
 *
 * 设计取舍：用 edits 数组而不是单 (from/to/insert) 三元组，是为了让"在原位修 + 文末追加"
 * 这种跨段编辑（典型如 unclosed-fence 在文末插入闭合 fence）也能用同一个数据结构表达，
 * linter 翻译层只需照搬 edits 即可，不必为每种 code 单独写 quick-fix 闭包。
 */
export interface DiagnosticFix {
    /** action 标题（CodeMirror 在诊断浮层里渲染为按钮文字） */
    title: string;
    /** 编辑列表；按文档原偏移给出。半开区间 [from, to)，insert 为新文本（可空串 = 删除）。 */
    edits: ReadonlyArray<{
        from: number;
        to: number;
        insert: string;
    }>;
}
export interface Diagnostic {
    /** 源码绝对字符偏移（含起始字符） */
    from: number;
    /** 源码绝对字符偏移（不含终止字符，半开区间） */
    to: number;
    severity: DiagnosticSeverity;
    /** 人读消息（中文，面向作者） */
    message: string;
    /** 稳定错误码，供自动化 / i18n / 未来快速修复使用 */
    code: DiagnosticCode;
    /** 可机械修复时附带；linter 据此暴露 quick-fix action。 */
    fix?: DiagnosticFix;
}
export type DiagnosticCode = 'unknown-container' | 'fence-length-wrong' | 'nested-misplaced' | 'unknown-variant' | 'unclosed-fence' | 'yaml-style-attr' | 'list-too-deep' | 'footer-cta-outlink' | ZhTypoCode;
/**
 * 扫描 markdown 源码，返回按 from 升序的诊断列表。
 *
 * 不抛异常：任何解析失败走 Diagnostic 返回（severity=error）。
 * 不改源码，不做 side-effect；可在 debounce 后随意调用。
 */
export declare function diagnose(source: string): Diagnostic[];
