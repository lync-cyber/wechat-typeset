import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="22" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="30" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="38" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="32" y="52" width="33" height="1" fill="${text}" opacity="0.4"/>` +
      `<rect x="32" y="58" width="20" height="2" fill="${text}" opacity="0.3"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'ed-signoff',
    kind: 'note',
    name: 'ed. 落款',
    description: '右下 ed. + 首字母 monospace（编辑部 v1）',
    signatureOf: 'editorial-mook',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-ed-signoff',
      name: 'ed. 落款',
      description: '右下 ed. + 首字母 monospace（编辑部 v1）',
      markdown: '::: note variant=ed-signoff\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const footer = [
      `<div style="display:flex;justify-content:flex-end;align-items:center;`,
      `gap:8px;border-top:1px solid ${c.text};padding-top:6px;`,
      `width:62%;margin-left:38%;margin-bottom:8px;">`,
      `<span style="font-family:'Lora',serif;font-style:italic;font-size:12px;color:${c.textMuted};">— ed.</span>`,
      `<span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:${c.textMuted};letter-spacing:.16em;">L.Z.</span>`,
      `</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: footer,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-style:italic`,
        `font-family:'Lora','Noto Serif SC',serif`,
      ].join(';'),
    }
  },
}

export default variantDef
