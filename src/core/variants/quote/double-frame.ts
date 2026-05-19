import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="12" width="63" height="51" rx="2" fill="${soft}" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="11" y="17" width="53" height="41" rx="1" fill="none" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="16" y="26" width="38" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="16" y="33" width="33" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="33" y="44" width="18" height="2" fill="${accent}" opacity="0.6"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'double-frame',
    kind: 'quote',
    name: '双层边框',
    description: '双层朱字边框 + 引文 italic Lora + 朱色 byline（宋本 v2）',
    themeCompat: ['literary-humanism', 'life-aesthetic'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-double-frame',
      name: '双层边框',
      description: '双层朱字边框 + italic 正文（宋本 v2）',
      markdown: '::: quote-card 黄庭坚 variant=double-frame\n念念不忘，必有回响；\n\n有灯，就有人。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const accent = (c as unknown as Record<string, string>).accentClassical ?? c.accent
    const bg = c.bg
    const borderMuted = c.textMuted
    const innerSlot =
      `<section style="border:1px solid ${borderMuted};padding:18px ${pad - 2}px 16px;">`
    const closeSlot = `</section>`
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:10px`,
        `margin:20px 0`,
        `border:1px solid ${borderMuted}`,
      ].join(';'),
      bodyCSS: [
        `font-family:'Lora','Noto Serif SC',serif`,
        `font-size:18px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `margin:0 0 12px`,
        `font-weight:500`,
      ].join(';'),
      svgSlot: innerSlot,
      bylineCSS: [
        `display:flex`,
        `justify-content:flex-end`,
        `align-items:center`,
        `gap:8px`,
        `font-family:'Noto Serif SC',serif`,
        `font-size:11px`,
        `color:${accent}`,
        `letter-spacing:.2em`,
      ].join(';'),
      bylinePrefix: '',
      closeSlot,
    }
  },
}

export default variantDef
