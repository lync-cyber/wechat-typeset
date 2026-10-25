/**
 * dev 模式控制台提示工具。生产构建 / vitest 测试环境静默。
 *
 * 用途：作者在 markdown 里写出"语法合法但语义可疑"的内容时（如 dialogue side
 * attr 传给非 chat-bubbles 骨架、table-card 行间列数不齐），在 dev 控制台留一条
 * 提示，让作者及时发现，但不影响渲染输出。
 *
 * 三档环境识别：
 *   - 生产构建：import.meta.env.DEV !== true → 静默
 *   - vitest：import.meta.env.MODE === 'test' → 静默（避免污染 fixture 渲染断言）
 *   - dev server：DEV=true && MODE!=='test' → console.warn
 *
 * Node 端 e2e（verify-sample-full.ts）无 import.meta.env，typeof 检查保护下静默。
 */
/**
 * @param scope 来源标签（如 'table-card:cells'），出现在 `[scope]` 前缀
 * @param message 描述性信息（建议含作者可执行的修复建议）
 */
export declare function devWarn(scope: string, message: string): void;
