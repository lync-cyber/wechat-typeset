import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${accent}" opacity="0.12"/>` +
      `<rect x="10" y="18" width="3" height="38" fill="${accent}" opacity="0.7"/>` +
      `<rect x="18" y="28" width="42" height="2" fill="${accent}"/>` +
      `<rect x="18" y="36" width="36" height="2" fill="${text}" opacity="0.5"/>` +
      `<rect x="18" y="44" width="28" height="2" fill="${text}" opacity="0.5"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'vermilion-inline',
    kind: 'highlight',
    name: '朱色强调',
    description: '整段朱色文字 + 朱色左侧点线，宋本批注语境',
    designedFor: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-vermilion-inline',
      name: '朱色强调',
      description: '整段朱字 + 朱色左侧线，宋本批注',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const vermilion = c.accentClassical ?? c.accent
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${vermilion}`,
        `border-left:3px dotted ${vermilion}`,
        'padding:8px 0 8px 12px',
        'margin:16px 0',
        'font-weight:500',
      ].join(';'),
    }
  },
}

export default variantDef
