import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="28" width="55" height="2" fill="${text}" opacity="0.8"/>` +
      `<rect x="26" y="20" width="1" height="16" fill="${accent}" opacity="0.5"/>` +
      `<rect x="10" y="36" width="16" height="2" fill="#c0c6cf"/>` +
      `<rect x="30" y="36" width="35" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="44" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="52" width="44" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'interlinear-gloss',
    kind: 'note',
    name: '双行夹注',
    description: '上下 1px border + 朱色双行小字（宋本 v1）',
    designedFor: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-interlinear-gloss',
      name: '双行夹注',
      description: '上下 1px border + 朱色双行小字（宋本 v1）',
      markdown: '::: note variant=interlinear-gloss\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const accent = c.accentClassical ?? c.accent
    const muted = c.textMuted
    const gloss = [
      `<div style="margin-bottom:6px;text-align:center;">`,
      `<span style="display:inline-block;vertical-align:middle;font-size:10px;`,
      `line-height:1.2;color:${accent};padding:0 6px;text-align:center;`,
      `border-top:1px solid ${muted};border-bottom:1px solid ${muted};">`,
      `黄庭坚《寄黄几复》<br>之颔联也`,
      `</span>`,
      `</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: gloss,
      bodyCSS: [
        `font-size:15px`,
        `line-height:2`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`,
      ].join(';'),
    }
  },
}

export default variantDef
