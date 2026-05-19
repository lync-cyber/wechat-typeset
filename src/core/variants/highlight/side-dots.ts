import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${accent}" opacity="0.1"/>` +
      `<rect x="18" y="28" width="42" height="2" fill="${text}"/>` +
      `<circle cx="15" cy="29" r="2" fill="${accent}"/>` +
      `<rect x="18" y="36" width="38" height="2" fill="${text}" opacity="0.5"/>` +
      `<circle cx="15" cy="37" r="2" fill="${accent}" opacity="0.6"/>` +
      `<rect x="18" y="44" width="28" height="2" fill="${text}" opacity="0.5"/>` +
      `<circle cx="15" cy="45" r="2" fill="${accent}" opacity="0.6"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'side-dots',
    kind: 'highlight',
    name: '字旁着重点',
    description: '整段左侧朱色圆点列（中文着重号传统），宋本批注',
    designedFor: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-side-dots',
      name: '字旁着重点',
      description: '整段左侧朱色圆点 + 古典底色',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const vermilion = c.accentClassical ?? c.accent
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-left:4px solid ${vermilion}`,
        'padding:8px 0 8px 14px',
        'margin:16px 0',
        'line-height:2.1',
      ].join(';'),
    }
  },
}

export default variantDef
