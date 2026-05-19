import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="20" width="10" height="2" fill="${text}" opacity="0.5"/>` +
      `<rect x="22" y="21" width="28" height="1" fill="${text}" opacity="0.3" stroke-dasharray="2,2"/>` +
      `<rect x="52" y="19" width="13" height="3" fill="${accent}" opacity="0.5"/>` +
      `<rect x="10" y="32" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="40" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="48" width="40" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'ruler-note',
    kind: 'note',
    name: '测量条注',
    description: 'NOTE + 虚线测量条 + ed. 2025（博物 v1）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-ruler-note',
      name: '测量条注',
      description: 'NOTE + 虚线测量条 + ed. 2025（博物 v1）',
      markdown: '::: note variant=ruler-note\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const naturalist = c.accentNaturalist ?? c.textMuted
    const header = [
      `<div style="display:flex;align-items:flex-end;gap:6px;margin-bottom:6px;">`,
      `<div style="font-family:'IBM Plex Mono',monospace;font-size:9px;`,
      `color:${c.textMuted};letter-spacing:.16em;">NOTE</div>`,
      `<div style="flex:1;border-bottom:1px dashed ${c.textMuted};height:8px;"></div>`,
      `<div style="font-family:'Lora',serif;font-style:italic;font-size:11px;color:${naturalist};">ed. 2025</div>`,
      `</div>`,
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
