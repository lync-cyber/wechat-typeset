/**
 * 四色提示容器：tip / warning / info / danger
 *
 * R3 重构：从 38 行手写 makeAdmonition + resolveVariantId 收拢到 makeVariantContainer 工厂调用。
 * 行为保持与重构前完全一致——SPI 暗号（titleCSS===''）、双 className（v1 兼容 + variant 后缀）、
 * icon 注入位置、titleCSS 默认值都由工厂统一表达。
 *
 * v2 的容器层职责（在工厂里实现）：
 *   1. 决定用哪个 variant（attrs.variant > theme.variants.admonition > 'accent-bar' 兜底）
 *   2. 组装 open/close HTML：wrapper + svgSlot + title? + body?
 *   3. 处理 title 显示约定（titleCSS==='' 跳过默认 title 行，由 svgSlot 承担）
 */

import type { ContainerRenderer } from './types'
import type { AdmonitionKind, AdmonitionRenderArgs } from '../../variants/_core'
import { ADMONITION_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'

const DEFAULT_TITLES: Record<AdmonitionKind, string> = {
  tip: '小贴士',
  warning: '注意',
  info: '说明',
  danger: '警告',
}

function build(kind: AdmonitionKind): ContainerRenderer {
  return makeVariantContainer<AdmonitionRenderArgs>({
    name: kind,
    themeSlot: 'admonition',
    table: ADMONITION_VARIANTS,
    fallbackId: 'accent-bar',
    args: () => ({ kind }),
    title: {
      defaultText: DEFAULT_TITLES[kind],
      defaultCSS: (ctx) =>
        `font-weight:700;color:${ctx.tokens.colors.status[kind].accent};margin-bottom:6px;letter-spacing:0.3px`,
      iconKey: `${kind}Icon` as 'tipIcon' | 'warningIcon' | 'infoIcon' | 'dangerIcon',
    },
    body: { mode: 'optional' },
  })
}

export const tipContainer = build('tip')
export const warningContainer = build('warning')
export const infoContainer = build('info')
export const dangerContainer = build('danger')
