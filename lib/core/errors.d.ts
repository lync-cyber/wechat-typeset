/**
 * 统一错误模型。SDK / CLI / 未来 MCP 任一边界处可读 e.code 程序化分支；
 * 错误码与 CLI 退出码一一对应，避免每个脚本重复发明退出码表。
 *
 * 分类原则：
 *   - 抛 WtException 的场景：调用方传错了 / 资源不存在 / spec 不合规 等可恢复输入错
 *   - 不抛 WtException：内部 invariant 违反（_lru max≤0 / 注册表冲突）仍用裸 Error
 */
/**
 * 错误码 + 一行说明 + CLI 退出码。下游通过 capabilities.json.errorCodes 读到同一份。
 * 退出码手写而非自增：约定值跨工具稳定（CI / agent 据此分支）。
 */
export declare const WT_ERROR_INFO: Readonly<{
    readonly CONTRACT_VIOLATION: {
        readonly exitCode: 4;
        readonly description: "markdown 容器/语法/嵌套错（fence_not_closed 等）";
    };
    readonly SPEC_INVALID: {
        readonly exitCode: 3;
        readonly description: "PersonaSpec 校验失败";
    };
    readonly INPUT_AMBIGUOUS: {
        readonly exitCode: 1;
        readonly description: "render 同时给 persona/theme/spec";
    };
    readonly RESOURCE_NOT_FOUND: {
        readonly exitCode: 2;
        readonly description: "未知 persona / 容器 / variant id";
    };
    readonly PLATFORM_UNSUPPORTED: {
        readonly exitCode: 5;
        readonly description: "未知 publish 平台 id";
    };
    readonly RENDER_FAILED: {
        readonly exitCode: 6;
        readonly description: "管线内部异常（未归类，兜底）。与 CONTRACT_VIOLATION 区分，便于 CI 程序化分支";
    };
}>;
export type WtErrorCode = keyof typeof WT_ERROR_INFO;
export declare const WT_ERROR_CODES: readonly ("CONTRACT_VIOLATION" | "SPEC_INVALID" | "INPUT_AMBIGUOUS" | "RESOURCE_NOT_FOUND" | "PLATFORM_UNSUPPORTED" | "RENDER_FAILED")[];
/**
 * 结构化错误条目。`severity: 'warning'` 也走 WtError —— 同一形状，
 * 让 validate.warnings / render.frontmatterIssues 等可处理流共享类型。
 */
export interface WtError {
    message: string;
    severity: 'error' | 'warning';
    /** 路径定位：spec 字段（`palette.primary`）或 markdown 行号（`line 12`）。 */
    path?: string;
    /** 修复建议（LLM/作者直接消费）。 */
    hint?: string;
}
export declare class WtException extends Error {
    readonly code: WtErrorCode;
    readonly errors: readonly WtError[];
    readonly warnings: readonly WtError[];
    constructor(code: WtErrorCode, errors: readonly WtError[], warnings?: readonly WtError[]);
}
export declare const EXIT_CODES: Readonly<Record<WtErrorCode, number>>;
/** 单错快捷构造：抛"一个 error + 可选 hint"的常见路径。 */
export declare function fail(code: WtErrorCode, message: string, opts?: {
    path?: string;
    hint?: string;
}): never;
