import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="24" font-size="7" font-style="italic" fill="${accent}" font-family="serif">Annotatio</text>` +
      `<text x="10" y="34" font-size="6" letter-spacing="3" fill="${text}" opacity="0.5">编 者 按</text>` +
      `<rect x="10" y="44" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="52" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="60" width="40" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'latin-subhead',
    kind: 'note',
    name: '学名上标',
    description: 'Annotatio redactoris 拉丁 italic（博物 v2）',
    signatureOf: 'academic-frontier',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-latin-subhead',
      name: '学名上标',
      description: 'Annotatio redactoris 拉丁 italic（博物 v2）',
      markdown: '::: note variant=latin-subhead\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const naturalist = c.accentNaturalist ?? c.textMuted
    const header = [
      `<div style="font-family:'Lora',serif;font-style:italic;font-size:12px;`,
      `color:${naturalist};letter-spacing:.04em;line-height:1.2;">Annotatio redactoris</div>`,
      `<div style="font-family:'Noto Serif SC',serif;font-size:11px;color:${c.textMuted};`,
      `letter-spacing:.3em;margin-top:1px;margin-bottom:10px;">编 者 按 语</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`,
      ].join(';'),
    }
  },
}

export default variantDef
