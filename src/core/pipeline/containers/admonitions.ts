/**
 * 四色提示容器：tip / warning / info / danger。走 makeVariantContainer 工厂：
 *   1. 决定用哪个 variant（attrs.variant > theme.variants.admonition > 'accent-bar' 兜底）
 *   2. 组装 open/close HTML：wrapper + svgSlot + title? + body?
 *   3. titleCSS==='' 是约定的"跳过默认 title 行"暗号，title 由 svgSlot 承担
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
