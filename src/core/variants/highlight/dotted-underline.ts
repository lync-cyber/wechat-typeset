import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.06"/>` +
      `<rect x="14" y="30" width="47" height="2" fill="${text}"/>` +
      `<rect x="14" y="38" width="40" height="2" fill="${text}" opacity="0.45"/>` +
      `<rect x="14" y="46" width="28" height="2" fill="${text}" opacity="0.45"/>` +
      `<line x1="10" y1="56" x2="65" y2="56" stroke="${text}" stroke-width="1.5" stroke-dasharray="2 2"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'dotted-underline',
    kind: 'highlight',
    name: '点状下划线',
    description: '整段底部点状线 + 中性底色，编辑部轻强调',
    signatureOf: 'editorial-mook',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-dotted-underline',
      name: '点状下划线',
      description: '整段底部点状线 + 中性底色',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `background-color:${c.bg}`,
        `color:${c.text}`,
        `border-bottom:2px dotted ${c.text}`,
        'padding:10px 0 8px',
        'margin:16px 0',
      ].join(';'),
    }
  },
}

export default variantDef
