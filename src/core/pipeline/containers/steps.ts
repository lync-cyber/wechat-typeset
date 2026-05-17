/**
 * steps 容器。variant 只管 wrapper + 标题行样式；内部 h3 由用户编号或主题
 * assets.stepBadge(n) 在 writer 阶段注入，renderer 不做 h3 级联。
 * 与 admonition 的差异：未传 defaultText 时仅 ctx.info 非空才渲染标题。
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
  // bodyCSS truthy 时（如 step-card 的浅底卡片）包一层 body；其余 variant 留空 bodyCSS 即跳过。
  body: { mode: 'optional' },
})
