/**
 * motif 文本溢出 viewBox 自适应扩展。
 *
 * 独立于 render-motif.ts 与 spec-to-theme.ts：前者负责 AST→SVG 字符串渲染，后者负责
 * spec→Theme 对象翻译，本模块只做"占位符替换后文本测量 + viewBox 宽度修复"这一件事。
 * 仅扩宽度，不扩高度——issueStamp / stepBadge 都是横排单行，高度固定。
 * 唯一外部依赖：types.ts 的类型（零运行时依赖）。
 */
import type { MotifTemplate } from './types';
/**
 * 估算 SVG text 元素的渲染宽度（px），偏保守估计（避免裁字）。
 *
 * 启发式（font-weight 500–700 sans-serif 平均值）：
 *   - CJK / 全角：1.0em
 *   - 拉丁大写（含 W/M 较宽的字母）：0.7em
 *   - 拉丁小写 / `#@%`：0.6em / 0.65em
 *   - 数字：0.62em
 *   - 其余半角（`·` `-` `空格`）：0.4em
 * 字距：letterSpacing × 字符数（与浏览器对齐 —— 多数实现尾字也累加字距）。
 *
 * 历史教训：之前用 0.55em (拉丁) / 0.35em (其他) / `× (chars-1)`，对加粗
 * 拉丁大写 + letterSpacing 1.5px 的内容（如 industry-observer 的
 * `ISSUE #023 · 2025-04-20 · 周刊`）低估约 25–30px，导致 "周刊" 被 SVG 边界裁切。
 */
export declare function measureTextWidth(content: string, fontSize: number, letterSpacing?: number): number;
/**
 * 占位符替换后估算 MotifTemplate 中所有 text primitive 的右沿，若超出 viewBox 宽度
 * + 安全边距，返回扩了 viewBox[2] / width 的克隆模板（外框 rect 同步扩 w）；
 * 否则原样返回，避免不必要的克隆。
 *
 * 当 needed - origW < EXPAND_THRESHOLD 时也视为不需要扩张：这种小幅 ceil
 * 误差通常只是启发式估算的副产物，不代表真实裁切风险。
 */
export declare function fitTemplateToText(template: MotifTemplate, values: Readonly<Record<string, string | number>>): MotifTemplate;
