import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.06"/>` +
      `<rect x="10" y="18" width="4" height="38" fill="${text}"/>` +
      `<rect x="61" y="18" width="4" height="38" fill="${text}"/>` +
      `<rect x="18" y="29" width="39" height="2" fill="${text}"/>` +
      `<rect x="18" y="37" width="34" height="2" fill="${accent}" opacity="0.7"/>` +
      `<rect x="18" y="45" width="24" height="2" fill="${text}" opacity="0.4"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'geometric-flag',
    kind: 'highlight',
    name: '几何旗标',
    description: '整段左右实色方块旗 + 大字距，包豪斯构成感',
    themeCompat: ['bauhaus-digest'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-geometric-flag',
      name: '几何旗标',
      description: '整段左右方块旗 + 大字距，包豪斯风',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-left:5px solid ${c.text}`,
        `border-right:5px solid ${c.text}`,
        'padding:8px 14px',
        'margin:16px 0',
        'letter-spacing:0.15em',
      ].join(';'),
    }
  },
}

export default variantDef
