import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="42" font-size="16" font-weight="500" fill="${accent}" font-family="serif">注</text>` +
      `<rect x="28" y="28" width="37" height="2" fill="${text}" opacity="0.6"/>` +
      `<rect x="28" y="36" width="37" height="2" fill="#c0c6cf"/>` +
      `<rect x="28" y="44" width="30" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'vermilion-gloss',
    kind: 'note',
    name: '朱字小注',
    description: '左大字「注」+ 右朱褐正文（宋本 v2）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-vermilion-gloss',
      name: '朱字小注',
      description: '左大字「注」+ 右朱褐正文（宋本 v2）',
      markdown: '::: note variant=vermilion-gloss\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const accent = c.accentClassical ?? c.accent
    const label = [
      `<div style="font-family:'Noto Serif SC',serif;color:${accent};`,
      `font-size:22px;font-weight:500;line-height:1;margin-bottom:4px;">注</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: label,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.95`,
        `color:${c.textMuted}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`,
      ].join(';'),
    }
  },
}

export default variantDef
