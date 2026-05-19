import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<text x="10" y="48" font-size="34" fill="${accent}" opacity="0.85" font-style="italic" font-family="serif">07</text>` +
      `<rect x="36" y="26" width="27" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="36" y="33" width="23" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="36" y="43" width="27" height="1" fill="${text}" opacity="0.5"/>` +
      `<rect x="36" y="49" width="22" height="2" fill="${text}" opacity="0.2"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'huge-numeral',
    kind: 'quote',
    name: '巨号编号',
    description: '左 Lora 72px 编号 + 右大字 sans 引文 + accent 短线 byline（包豪斯 v1）',
    themeCompat: ['swiss-grid', 'brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-huge-numeral',
      name: '巨号编号',
      description: '左 Lora 巨号 + 右引文 + monospace byline（包豪斯 v1）',
      markdown: '::: quote-card SHAKESPEARE · TEMPEST variant=huge-numeral\n凡是过往，皆为序章。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const accent = c.accent
    const bg = c.bg
    const numeralSlot =
      `<section style="display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;">` +
      `<section style="font-family:'Lora',serif;font-size:72px;line-height:.85;` +
      `color:${accent};font-weight:400;letter-spacing:-.04em;">07</section>` +
      `<section style="padding-top:6px;">`
    const closeSlot = `</section></section>`
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:${pad - 2}px ${pad}px ${pad}px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:16.5px`,
        `line-height:1.75`,
        `color:${c.text}`,
        `margin:0 0 10px`,
        `font-weight:500`,
      ].join(';'),
      svgSlot: numeralSlot,
      bylineCSS: [
        `font-family:'IBM Plex Mono',monospace`,
        `font-size:10px`,
        `color:${c.textMuted}`,
        `letter-spacing:.16em`,
        `border-top:1px solid ${c.text}`,
        `padding-top:6px`,
        `margin-top:0`,
      ].join(';'),
      bylinePrefix: '',
      closeSlot,
    }
  },
}

export default variantDef
