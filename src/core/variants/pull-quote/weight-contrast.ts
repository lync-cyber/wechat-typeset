import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="16" width="59" height="1" fill="${text}" opacity="0.4"/>` +
      `<rect x="8" y="58" width="59" height="1" fill="${text}" opacity="0.4"/>` +
      `<rect x="8" y="26" width="59" height="4" fill="${text}" opacity="0.7" font-weight="800"/>` +
      `<rect x="8" y="35" width="50" height="2.5" fill="${text}" opacity="0.25"/>` +
      `<rect x="8" y="44" width="44" height="4" fill="${text}" opacity="0.7"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'weight-contrast',
    kind: 'pullQuote',
    name: '字重对比',
    description: '100/400 字重对比 + 上下 hairline（编辑部 v1）',
    signatureOf: 'people-story',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-weight-contrast',
      name: '字重对比',
      description: '100/400 字重对比 + 上下 hairline',
      markdown:
        '::: pull-quote variant=weight-contrast\n我们活在一个越来越快，却越来越慢的时代。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:28px 0',
        `border-top:1px solid ${c.text}`,
        `border-bottom:1px solid ${c.text}`,
        'padding:18px 0',
        'text-align:center',
        'background-color:transparent',
      ].join(';'),
      bodyCSS: 'text-align:center',
      quoteCSS: [
        `color:${c.text}`,
        'font-size:22px',
        'line-height:1.55',
        'font-weight:600',
        'letter-spacing:0.01em',
        'text-align:center',
        'margin-top:0',
        'margin-bottom:0',
        `font-family:'Noto Serif SC',serif`,
      ].join(';'),
      bylineCSS: [
        `color:${c.textMuted}`,
        'font-size:12px',
        'line-height:1.6',
        'margin-top:10px',
        'text-align:center',
        'letter-spacing:0.3px',
      ].join(';'),
    }
  },
}

export default variantDef
