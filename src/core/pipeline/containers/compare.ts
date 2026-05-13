/**
 * compare / pros / cons 容器
 *
 * R3 重构：pros / cons 走 makeVariantContainer 工厂（slot 通过 args 注入）；
 * compareContainer 保留手写——它只是 wrapper + 关闭，套用工厂反而徒增配置噪声。
 *
 * wrapper 与列共用同一套 variant 模块，通过 slot 参数分派：
 *   - compare → slot:'wrapper' → 外壳样式
 *   - pros    → slot:'pros'    → 左/上列样式
 *   - cons    → slot:'cons'    → 右/下列样式
 *
 * column-card：display:table 等高两栏（v1 行为）
 * stacked-row：上下堆叠（小屏友好）
 * ledger：账本双色（tip.soft / danger.soft 底）
 *
 * 所有 variant 都避开 flex，改用 table / block + margin 组合——公众号粘贴后稳定。
 */

import type { CompareVariantId } from '../../themes/types'
import type { ContainerRenderer, ContainerRenderContext } from './types'
import type { CompareRenderArgs } from '../../variants/_core'
import { COMPARE_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'

function resolveVariantId(ctx: ContainerRenderContext): CompareVariantId {
  const override = ctx.attrs.variant
  if (override && override in COMPARE_VARIANTS) {
    return override as CompareVariantId
  }
  return ctx.variants.compare ?? 'column-card'
}

export const compareContainer: ContainerRenderer = {
  open: (ctx) => {
    const id = resolveVariantId(ctx)
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
