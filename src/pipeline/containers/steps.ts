/**
 * steps 容器
 *
 * R3 重构：走 makeVariantContainer 工厂。
 * variant 只管 wrapper + 标题行样式；内部 h3 仍由用户自行编号或由主题 assets.stepBadge(n)
 * 在 writer 阶段注入。renderer 不做 h3 级联。
 *
 * 与 admonition 的差异（通过 title.defaultText 缺省表达）：
 *   不传 defaultText → 仅 ctx.info 非空才渲染标题（保持 v2 行为）。
 */

import type { ContainerRenderer } from './types'
import { STEPS_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'

export const stepsContainer: ContainerRenderer = makeVariantContainer({
  name: 'steps',
  themeSlot: 'steps',
  table: STEPS_VARIANTS,
  fallbackId: 'number-circle',
  title: {
    // 无 defaultText：steps 标题仅在 markdown info 写了内容时才出现
    defaultCSS: 'font-weight:700;margin-bottom:12px',
  },
})
