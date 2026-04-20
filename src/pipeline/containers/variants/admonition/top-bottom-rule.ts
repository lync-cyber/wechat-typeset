/**
 * admonition · top-bottom-rule
 *
 * 视觉：顶部 + 底部 各一根 1px 实线（无左右边）+ soft 底 + 稍大 padding。
 * 上下通栏的语义：**重要且稀缺**——像 manpage 里 DEPRECATED 标注、
 * 报纸版框底部的 errata 勘误条，两道水平线把一段内容"夹出来"。
 *
 * 为什么新增：tech-geek 规范 §2.13 要求 `// PITFALL`（danger）走顶部+底部
 * 双横线而非左边框。左边框在 tip/warning/info 都有用到，再叠一层无法区分；
 * 上下线是**视觉结构性差异**，打印黑白也能立刻辨认这段"被夹起来了"。
 *
 * 与左边框 variant 家族的硬边界：
 *   - accent-bar / dashed-border / double-border: 左边框（三种样式）
 *   - top-bottom-rule: 上下线（第四种方向）—— 完全不同的边界位置
 *
 * 适用：任何"严重但稀缺"的警报位——tech-geek danger / literary-humanism 的"异文"卡
 * / business-finance 尚未用到但可选。
 */

import { defineAdmonition } from '../registry'

export const topBottomRule = defineAdmonition('top-bottom-rule', (ctx, { kind }) => {
  const pair = ctx.tokens.colors.status[kind]
  const padX = ctx.tokens.spacing.containerPadding
  return {
    wrapperCSS:
      `background-color:${pair.soft};` +
      `border-top:1px solid ${pair.accent};` +
      `border-bottom:1px solid ${pair.accent};` +
      `padding:14px ${padX}px;` +
      `margin:18px 0`,
    titleCSS:
      `font-size:14px;font-weight:600;color:${pair.accent};margin-bottom:8px;letter-spacing:1.2px`,
  }
})
