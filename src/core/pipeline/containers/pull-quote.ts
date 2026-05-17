/**
 * pull-quote 容器：正文中段把已写过的句子放大重申。
 * 与 quote-card（外部话语）/ highlight（bgMuted 强调段）正交：
 *   - info 是引文本体（默认大字 600 weight）
 *   - body 可选副说明 / 出处行
 * 主题 voice：ctx.variants.pullQuote；attrs.variant 可覆盖。
 */

import type { ContainerRenderer } from './types'
import { PULL_QUOTE_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'

export const pullQuoteContainer: ContainerRenderer = makeVariantContainer({
  name: 'pull-quote',
  themeSlot: 'pullQuote',
  table: PULL_QUOTE_VARIANTS,
  fallbackId: 'giant-mark',
  title: {
    defaultCSS: 'font-size:18px;line-height:1.7;font-weight:600',
  },
  body: { mode: 'optional' },
})
