import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="55" height="38" fill="${soft}"/>` +
      `<rect x="14" y="28" width="47" height="2" fill="${text}"/>` +
      `<rect x="14" y="36" width="43" height="2" fill="${text}" opacity="0.55"/>` +
      `<rect x="14" y="44" width="34" height="2" fill="${text}" opacity="0.55"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'wash-ground',
    kind: 'highlight',
    name: '米黄色块底',
    description: '整段米黄色块底色 + 略大行高，博物笔记观察段',
    signatureOf: 'academic-frontier',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'highlight-wash-ground',
      name: '米黄色块底',
      description: '整段米黄底 + 大行高，博物笔记',
      markdown: '::: highlight\n强调短句\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const washBg = c.highlightBg ?? c.bgSoft
    return {
      wrapperCSS: [
        `background-color:${washBg}`,
        `color:${c.text}`,
        'padding:12px 14px',
        'margin:16px 0',
        'line-height:2',
        'font-size:14.5px',
      ].join(';'),
    }
  },
}

export default variantDef
