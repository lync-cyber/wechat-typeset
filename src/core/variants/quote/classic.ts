/**
 * quote · classic（默认）
 *
 * 视觉：浅底卡 + 大号装饰引号（theme.assets.quoteMark 或回退字符）+ 居中排布。
 * byline（ctx.info）由 container renderer 在 close 时拼 "— 作者"。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const FALLBACK_OPEN_MARK =
  `<span style="display:inline-block;font-size:28px;line-height:1;opacity:0.35;margin-right:4px">「</span>`

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="5" fill="${soft}"/>` +
      `<text x="14" y="35" font-size="22" fill="${accent}" opacity="0.4">&#8220;</text>` +
      `<rect x="16" y="40" width="42" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="48" width="34" height="2" fill="#c0c6cf"/>`,
  )
}

const classic: VariantDef = {
  meta: {
    id: 'classic',
    kind: 'quote',
    name: '大引号金句',
    description: '浅底 + 装饰引号，居中大号',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-classic',
      name: '大引号金句',
      description: '浅底 + 装饰引号，居中大号',
      markdown: '::: quote-card 作者名\n此处填写金句正文\n:::\n',
    },
    {
      presetId: 'q-classic-no-byline',
      name: '无署名金句',
      description: '纯金句不署名',
      markdown: '::: quote-card\n此处填写金句正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const mark = ctx.assets.quoteMark ?? FALLBACK_OPEN_MARK
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:${ctx.tokens.colors.bgSoft};` +
        `padding:${pad + 2}px ${pad}px;` +
        `margin:20px 0;` +
        `border-radius:8px`,
      bodyCSS: `font-size:16px;line-height:1.7;text-align:center`,
      svgSlot: mark,
    }
  },
}

export default classic
