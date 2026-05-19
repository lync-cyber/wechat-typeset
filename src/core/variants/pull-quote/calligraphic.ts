import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="62" width="59" height="1.5" fill="${accent}" opacity="0.6"/>` +
      `<path d="M10 20 Q14 10 18 18" stroke="${accent}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
      `<path d="M14 14 L22 30" stroke="${accent}" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
      `<rect x="20" y="18" width="46" height="3" fill="${text}" opacity="0.7"/>` +
      `<rect x="20" y="28" width="42" height="3" fill="${text}" opacity="0.7"/>` +
      `<rect x="20" y="38" width="38" height="2.5" fill="${text}" opacity="0.5"/>` +
      `<rect x="20" y="47" width="34" height="2.5" fill="${text}" opacity="0.5"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'calligraphic',
    kind: 'pullQuote',
    name: '楷草装饰',
    description: 'Cormorant italic 大字 + 朱色撇捺装饰（宋本 v1）',
    designedFor: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-calligraphic',
      name: '楷草装饰',
      description: 'Cormorant italic 大字 + 朱色撇捺 SVG',
      markdown:
        '::: pull-quote variant=calligraphic\n行 到 水 穷 处\n坐 看 云 起 时\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const accentClassical = c.accentClassical ?? c.accent
    // 朱色撇捺：两笔 SVG path 模拟书法撇捺，公众号 inline SVG 安全。
    const brushSlot =
      `<section style="line-height:0;margin-bottom:6px">` +
      `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" ` +
      `fill="none" stroke="${accentClassical}" stroke-width="2" stroke-linecap="round">` +
      `<path d="M6 6 Q10 4 16 20"/>` +
      `<path d="M18 6 Q14 4 8 20"/>` +
      `</svg>` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `background:${c.bg}`,
        'padding:14px 0',
        'text-align:left',
      ].join(';'),
      bodyCSS: 'text-align:left',
      quoteCSS: [
        `color:${c.text}`,
        'font-size:28px',
        'line-height:1.5',
        'font-weight:500',
        'letter-spacing:0.06em',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
        `font-family:'Noto Serif SC',serif`,
      ].join(';'),
      bylineCSS: [
        `color:${c.textCaption ?? c.textMuted}`,
        'font-size:12px',
        'line-height:1.6',
        'margin-top:12px',
        'text-align:left',
        'letter-spacing:0.3em',
      ].join(';'),
      svgSlot: brushSlot,
    }
  },
}

export default variantDef
