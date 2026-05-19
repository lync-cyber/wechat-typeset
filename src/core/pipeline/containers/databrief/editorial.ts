/**
 * data-brief 家族 · 编辑文案块（editorial）
 *
 * 承担"读者互动 + 脚注引用"两个文字向的支撑容器。
 *
 * 包含 2 个容器：
 *   - qa-block       读者问答（Q/A 头像方块）
 *   - footnotes      脚注 / 参考文献块（variantKind=footnotes：lined / inline-flow）
 *
 * 与 metrics 的差异：本组容器**有 body 内容**（markdown-it 渲染的内文），
 * 渲染器 open 留段 wrapper 给 markdown 流式注入；metrics 多为"声明型"
 * （attrs 决定全部，body 忽略）。
 */

import type { ContainerRenderer } from '../types'
import { makeVariantContainer } from '../_shared/makeVariantContainer'
import { resolveVariantWithUv } from '../_shared/resolveVariant'
import { FOOTNOTES_VARIANTS, QA_BLOCK_VARIANTS } from '../../../variants/registry'

// ============================================================
// qa-block · 读者问答（variant 派发：8 个骨架）
//
// 与其他 variant 容器的差异：qa-block 内部结构（kicker / Q 行 / A 行 + markdown
// body）跨 8 个 variant 形态差异大（朱印徽章 vs 大号斜体 vs 圆方代号 vs 反白分栏），
// 不适合 makeVariantContainer 4 段通用 SPI；改让每个 variant 自行拼装 HTML 字符串，
// renderer 只套外壳。详见 VariantRenderResult.qaBlock / QaBlockSlots 注释。
// ============================================================

export const qaBlockContainer: ContainerRenderer = {
  open: (ctx) => {
    const { id, result } = resolveVariantWithUv(ctx, 'qaBlock', QA_BLOCK_VARIANTS, 'numbered-faq')
    const slots = result.qaBlock ?? { kickerHtml: '', qHtml: '', aOpenHtml: '', aCloseHtml: '' }
    return (
      `<section class="container-qa-block container-qa-block--${id}" style="${result.wrapperCSS}">\n` +
      slots.kickerHtml +
      slots.qHtml +
      slots.aOpenHtml
    )
  },
  close: (ctx) => {
    const { result } = resolveVariantWithUv(ctx, 'qaBlock', QA_BLOCK_VARIANTS, 'numbered-faq')
    const slots = result.qaBlock ?? { kickerHtml: '', qHtml: '', aOpenHtml: '', aCloseHtml: '' }
    return slots.aCloseHtml + '</section>\n'
  },
}

// ============================================================
// footnotes · 脚注 / 参考文献块（variantKind=footnotes）
//
// 两骨架共用一个容器，作者用 `variant=lined / inline-flow` 切换；info 非空时
// 渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。
//
// 主题 voice：spec.containers.footnotes 承担两骨架共用的色 / 字号 / 边框；
// layout 维度（padding-left / text-indent / max-height）由 variant inline 注入。
// ============================================================

export const footnotesContainer: ContainerRenderer = makeVariantContainer({
  name: 'footnotes',
  themeSlot: 'footnotes',
  table: FOOTNOTES_VARIANTS,
  fallbackId: 'lined',
  title: {
    // 不设 defaultText：info 为空时不渲染 kicker。
    defaultCSS: (ctx) =>
      [
        `color:${ctx.tokens.colors.primary}`,
        'font-size:10px',
        'font-weight:700',
        'letter-spacing:0.15em',
        'margin-bottom:6px',
        'text-indent:0',
      ].join(';'),
  },
})

