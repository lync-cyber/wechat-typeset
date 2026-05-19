import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="0" y="0" width="75" height="75" fill="${text}" opacity="0.85"/>` +
      `<rect x="8" y="12" width="28" height="2" fill="#ffffff" opacity="0.35"/>` +
      `<rect x="8" y="28" width="59" height="3.5" fill="#ffffff" opacity="0.8"/>` +
      `<rect x="8" y="38" width="52" height="3.5" fill="#ffffff" opacity="0.8"/>` +
      `<rect x="8" y="50" width="44" height="2.5" fill="#ffffff" opacity="0.45"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'inverted-plate',
    kind: 'pullQuote',
    name: '反色板块',
    description: '反色板块 #111 底白字 + 大号 sans 拉引（包豪斯 v1）',
    designedFor: ['brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-inverted-plate',
      name: '反色板块',
      description: '深底白字 + mono kicker + 大字 sans 引文',
      markdown:
        '::: pull-quote variant=inverted-plate\n形式追随功能，\n而功能追随真诚。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    // 反色：底色用 text（#111），字色用 bg（#efece5）。
    // textInverse 兜底确保在 token 流动场景下白字正确。
    const bgColor = c.text
    const fgColor = c.textInverse
    const mutedColor = c.textMuted
    const kickerSlot =
      `<section style="font-family:'IBM Plex Mono',monospace;` +
      `font-size:10px;color:${mutedColor};letter-spacing:0.24em;` +
      `margin-bottom:10px;text-transform:uppercase">PULL · 06</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `background:${bgColor}`,
        'padding:22px 18px',
        'border-radius:0',
      ].join(';'),
      bodyCSS: 'text-align:left',
      quoteCSS: [
        `color:${fgColor}`,
        'font-size:24px',
        'line-height:1.45',
        'font-weight:500',
        'letter-spacing:0.01em',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
        `font-family:'Noto Serif SC',serif`,
      ].join(';'),
      bylineCSS: [
        `color:${mutedColor}`,
        'font-size:11px',
        'line-height:1.6',
        'margin-top:12px',
        'text-align:right',
        'letter-spacing:0.2em',
        `font-family:'IBM Plex Mono',monospace`,
      ].join(';'),
      svgSlot: kickerSlot,
    }
  },
}

export default variantDef
