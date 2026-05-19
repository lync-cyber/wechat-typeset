import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<rect x="29" y="20" width="17" height="17" fill="${accent}"/>` +
      `<text x="37" y="32" font-size="10" fill="${soft}" text-anchor="middle" font-weight="600">引</text>` +
      `<rect x="14" y="44" width="47" height="2" fill="${text}" opacity="0.2"/>` +
      `<rect x="18" y="50" width="39" height="2" fill="${text}" opacity="0.2"/>`,
  )
}

function buildSealSlot(accentColor: string, bgColor: string): string {
  return (
    `<section style="display:flex;justify-content:center;margin-bottom:14px;">` +
    `<span style="width:30px;height:30px;background:${accentColor};color:${bgColor};` +
    `font-family:'Noto Serif SC',serif;font-size:14px;font-weight:600;` +
    `display:flex;align-items:center;justify-content:center;letter-spacing:0;">句</span>` +
    `</section>`
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'seal-kai',
    kind: 'quote',
    name: '楷字朱印',
    description: '居中朱印楷字 + 引文居中 + 朱破折号 byline（宋本 v1）',
    themeCompat: ['literary-humanism', 'life-aesthetic'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-seal-kai',
      name: '楷字朱印',
      description: '居中朱印 + 楷体引文（宋本 v1）',
      markdown: '::: quote-card 纳兰性德 variant=seal-kai\n人生若只如初见，何事秋风悲画扇。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const accent = (c as unknown as Record<string, string>).accentClassical ?? c.accent
    const bg = c.bg
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:18px ${pad}px 14px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-size:19px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `text-align:center`,
        `font-weight:500`,
        `margin:0 0 14px`,
        `letter-spacing:.04em`,
      ].join(';'),
      svgSlot: buildSealSlot(accent, bg),
      bylineCSS: [
        `text-align:center`,
        `font-size:12px`,
        `color:${accent}`,
        `letter-spacing:.2em`,
      ].join(';'),
      bylinePrefix: '— ',
    }
  },
}

export default variantDef
