/**
 * quote · classic（默认）
 *
 * 视觉：浅底卡 + 大号装饰引号（theme.assets.quoteMark 或回退字符）+ 居中排布。
 * byline（ctx.info）由 container renderer 在 close 时拼 "— 作者"。
 */

import type { VariantDef, TokenSchema } from '../_core'
import { mergeThumb, svg } from '../_thumb'

/**
 * tokens 暴露：金句卡的浅底色 + 正文字号——这两个最常被作者要求"调一格"。
 * mark 颜色不开放（主题 assets.quoteMark 是整段 HTML，没有单独颜色变量可抽）。
 * bgSoft default 用 'inherit' 占位（实际 fallback 由 render() 内的 ctx.tokens.colors.bgSoft 承担）。
 */
export const tokenSchema: TokenSchema = {
  'quote-bg': {
    type: 'color',
    label: '卡片底色',
    default: 'inherit',
    hint: '默认跟随主题的 bgSoft',
  },
  'quote-size': {
    type: 'size',
    label: '正文字号',
    default: '16px',
  },
}

const FALLBACK_OPEN_MARK =
  `<span style="display:inline-block;font-size:28px;line-height:1;opacity:0.35;margin-right:4px">「</span>`

// fallback 路径下的对称闭合标记。主题声明 assets.quoteMark 时不强行配对——
// 信任主题作者自带的引号 SVG 自洽（多数主题就是不要闭合括号）。
const FALLBACK_CLOSE_MARK =
  `<span style="display:inline-block;font-size:28px;line-height:1;opacity:0.35;margin-left:4px">」</span>`

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
  tokenSchema,
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
    const themeMark = ctx.assets.quoteMark
    const mark = themeMark ?? FALLBACK_OPEN_MARK
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:var(--uv-quote-bg, ${ctx.tokens.colors.bgSoft});` +
        `padding:${pad + 2}px ${pad}px;` +
        `margin:20px 0;` +
        `border-radius:8px`,
      bodyCSS: `font-size:var(--uv-quote-size, 16px);line-height:1.7;text-align:center`,
      svgSlot: mark,
      // 仅 fallback 字符路径配对闭合；主题自带 SVG 引号时不强行加。
      closeSlot: themeMark ? undefined : FALLBACK_CLOSE_MARK,
    }
  },
}

export default classic
