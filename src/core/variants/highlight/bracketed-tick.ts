import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${soft}"/>` +
      `<rect x="10" y="18" width="55" height="2" fill="${text}" opacity="0.5"/>` +
      `<rect x="10" y="54" width="55" height="2" fill="${text}" opacity="0.5"/>` +
      `<text x="13" y="33" font-size="9" font-family="monospace" fill="${text}">〔</text>` +
      `<text x="56" y="33" font-size="9" font-family="monospace" fill="${text}">〕</text>` +
      `<rect x="22" y="30" width="30" height="2" fill="${text}"/>` +
      `<rect x="22" y="38" width="26" height="2" fill="${text}" opacity="0.5"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'bracketed-tick',
    kind: 'highlight',
    name: '方括号刻度',
    description: '整段上下细线框 + 博物学名 monospace 风，博物笔记',
    themeCompat: ['naturalist-journal'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-bracketed-tick',
      name: '方括号刻度',
      description: '整段上下细线框，博物标本标注感',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const natColor = c.accentNaturalist ?? c.textMuted
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        `color:${c.text}`,
        `border-top:1px solid ${natColor}`,
        `border-bottom:1px solid ${natColor}`,
        'padding:10px 12px',
        'margin:16px 0',
        'font-size:14px',
      ].join(';'),
    }
  },
}

export default variantDef
