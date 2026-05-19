import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${text}" opacity="0.06"/>` +
      `<text x="14" y="34" font-size="7" font-weight="700" letter-spacing="4" fill="${text}">字 距 强 调</text>` +
      `<rect x="14" y="42" width="44" height="1.5" fill="${text}" opacity="0.35"/>` +
      `<rect x="14" y="49" width="32" height="1.5" fill="${text}" opacity="0.35"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'tracked-emphasis',
    kind: 'highlight',
    name: '字距强调',
    description: '整段 letter-spacing 加大 + bold + textMuted，编辑部印刷感',
    themeCompat: ['editorial-classic'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-tracked-emphasis',
      name: '字距强调',
      description: '整段 letter-spacing + bold + textMuted 底色',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `background-color:${c.bg}`,
        `color:${c.text}`,
        'letter-spacing:0.12em',
        'font-weight:600',
        `border-left:2px solid ${c.textMuted}`,
        `padding:8px 0 8px 12px`,
        'margin:16px 0',
      ].join(';'),
    }
  },
}

export default variantDef
