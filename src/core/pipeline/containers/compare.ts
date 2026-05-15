/**
 * compare / pros / cons 容器。wrapper 与列共用同一套 variant 模块，通过 slot
 * 参数分派：compare→'wrapper'，pros→'pros'，cons→'cons'。所有 variant 都避开
 * flex，改用 table / block + margin 组合——公众号粘贴后样式稳定。
 *
 * variant：column-card（display:table 等高两栏）/ stacked-row（小屏堆叠）/
 *           ledger（账本双色 tip.soft / danger.soft）。
 */

import type { CompareVariantId } from '../../themes/types'
import type { ContainerRenderer } from './types'
import type { CompareRenderArgs } from '../../variants/_core'
import { COMPARE_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'
import { resolveVariantId } from './_shared/resolveVariant'

export const compareContainer: ContainerRenderer = {
  open: (ctx) => {
    const id = resolveVariantId<CompareVariantId>(ctx, 'compare', COMPARE_VARIANTS, 'column-card')
    const result = COMPARE_VARIANTS[id].render(ctx, { slot: 'wrapper' })
    return `<section class="container-compare container-compare--${id}" style="${result.wrapperCSS}">\n`
  },
  close: '</section>\n',
}

function makeColumn(slot: 'pros' | 'cons', defaultTitle: string): ContainerRenderer {
  return makeVariantContainer<CompareRenderArgs>({
    name: slot,
    themeSlot: 'compare',
    table: COMPARE_VARIANTS,
    fallbackId: 'column-card',
    args: () => ({ slot }),
    title: {
      defaultText: defaultTitle,
      defaultCSS: 'font-weight:700;margin-bottom:6px',
    },
  })
}

export const prosContainer = makeColumn('pros', '优点')
export const consContainer = makeColumn('cons', '缺点')
