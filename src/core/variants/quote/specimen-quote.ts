import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<rect x="10" y="20" width="8" height="1" fill="${text}" opacity="0.5"/>` +
      `<rect x="57" y="20" width="8" height="1" fill="${text}" opacity="0.5"/>` +
      `<text x="37" y="20" font-size="6" fill="${text}" opacity="0.5" text-anchor="middle" font-family="monospace">SPEC.</text>` +
      `<rect x="12" y="28" width="51" height="2" fill="${text}" opacity="0.25"/>` +
      `<rect x="12" y="35" width="45" height="2" fill="${text}" opacity="0.25"/>` +
      `<rect x="12" y="42" width="36" height="2" fill="${text}" opacity="0.25"/>` +
      `<rect x="12" y="52" width="22" height="2" fill="${accent}" opacity="0.6"/>`,
  )
}

const SPEC_SLOT =
  `<section style="display:flex;align-items:stretch;gap:8px;">`

const variantDef: VariantDef = {
  meta: {
    id: 'specimen-quote',
    kind: 'quote',
    name: '标本引文',
    description: 'SPEC.NO 测量括弧 + 学名样 byline（博物 v1）',
    themeCompat: ['academic-frontier', 'tech-explainer'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-specimen-quote',
      name: '标本引文',
      description: '测量括弧 + 引文 + 学名样出处（博物 v1）',
      markdown: '::: quote-card Fragment IX variant=specimen-quote\n所有过往的失败，都是为了让今天的失败显得不那么不可承受。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const accent = (c as unknown as Record<string, string>).accentNaturalist ?? c.accent
    const bg = c.bg
    const borderColor = c.text
    const leftBracket =
      `<section style="width:8px;border-top:1px solid ${borderColor};border-bottom:1px solid ${borderColor};border-left:1px solid ${borderColor};flex-shrink:0;"></section>`
    const rightBracket =
      `<section style="width:8px;border-top:1px solid ${borderColor};border-bottom:1px solid ${borderColor};border-right:1px solid ${borderColor};flex-shrink:0;"></section>`
    const bracketWrapper =
      SPEC_SLOT +
      leftBracket +
      `<section style="flex:1;padding:6px 0 8px;">`
    const closeSlot =
      `</section>` +
      rightBracket +
      `</section>`
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:${pad - 2}px ${pad}px ${pad}px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-size:17px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `margin:0`,
        `font-weight:500`,
      ].join(';'),
      svgSlot: bracketWrapper,
      bylineCSS: [
        `display:flex`,
        `justify-content:space-between`,
        `align-items:baseline`,
        `margin-top:10px`,
        `font-size:12px`,
      ].join(';'),
      bylinePrefix: `<span style="font-family:'Lora',serif;font-style:italic;color:${accent};">— </span>`,
      closeSlot,
    }
  },
}

export default variantDef
