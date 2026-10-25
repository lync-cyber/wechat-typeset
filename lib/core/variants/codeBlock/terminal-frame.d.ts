/**
 * codeBlock · terminal-frame（macOS Terminal 窗口腔）
 *
 * 设计语言：终端会话 / SSH / REPL（macOS Terminal、iTerm、tmux）。
 *   - 顶部窗口腔：3 个红/黄/绿圆点（traffic-light）+ 紧贴圆点右侧的等宽语言名（左对齐，模拟 iTerm/tmux 标签栏）
 *   - 下方暗色代码区：固定深底 #1d1f23，hljs Atom One Dark 配色直接生效
 *   - 即使在浅色主题下也保持暗腔——"终端"语义胜于"页面 voice"
 *
 * 适合主题：tech-geek（签名）/ brutalist / late-night-vinyl
 * ——任何主打"这段代码是被 run 起来的"的稿件家族。
 *
 * 公众号兼容：
 *   - 3 圆点用 inline SVG 而非 CSS border-radius div（border-radius 在 traffic-light
 *     这种"形状即语义"的位置上 wxPatch 风险更大；SVG 永远是字节级稳定）
 *   - 整段不依赖 flex；用 display:table 横向排列窗口腔
 *   - 标题区写 font-family inline——pipeline 渲染层允许（仅 themeCSS 禁），文档见
 *     databrief/frame.ts 注释
 */
import type { CodeBlockDef } from '../_core';
declare const terminalFrame: CodeBlockDef;
export default terminalFrame;
