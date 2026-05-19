import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.05"/>` +
      `<rect x="14" y="28" width="47" height="2" fill="${text}"/>` +
      `<rect x="14" y="36" width="42" height="2" fill="${text}" opacity="0.45"/>` +
      `<rect x="14" y="44" width="30" height="2" fill="${text}" opacity="0.45"/>` +
      `<rect x="10" y="56" width="55" height="3" fill="${accent}"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'single-stroke',
    kind: 'highlight',
    name: '单划重笔',
    description: '整段底部 3px accent 实线 + 浅底，包豪斯克制感',
    signatureOf: 'swiss-grid',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-single-stroke',
      name: '单划重笔',
      description: '整段底部 3px accent 线，包豪斯风',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-bottom:3px solid ${c.accent}`,
        'padding:10px 0 8px',
        'margin:16px 0',
        'font-weight:500',
      ].join(';'),
    }
  },
}

export default variantDef
