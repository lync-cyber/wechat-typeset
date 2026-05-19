import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<rect x="10" y="25" width="55" height="1" fill="${text}" opacity="0.4"/>` +
      `<text x="10" y="23" font-size="7" fill="${accent}" opacity="0.8" font-style="italic" font-family="serif">Sententia · 句</text>` +
      `<rect x="10" y="32" width="50" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="10" y="39" width="44" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="10" y="52" width="30" height="2" fill="${text}" opacity="0.2"/>` +
      `<rect x="43" y="52" width="23" height="2" fill="${text}" opacity="0.2"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'binomial-attrib',
    kind: 'quote',
    name: '双名法 byline',
    description: '学名 + 命名人式 byline + 朱字 italic（博物 v2）',
    designedFor: ['academic-frontier', 'tech-explainer'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-binomial-attrib',
      name: '双名法 byline',
      description: '学名分隔线 + 引文 + 双名法出处（博物 v2）',
      markdown: '::: quote-card M. PROUST · 1923 variant=binomial-attrib\n真正的旅行不在于看到新的风景，而在于换一双新的眼睛。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const accent = (c as unknown as Record<string, string>).accentNaturalist ?? c.accent
    const bg = c.bg
    const headerSlot =
      `<section style="font-family:'Lora',serif;font-style:italic;font-size:13px;` +
      `color:${accent};letter-spacing:.02em;border-bottom:1px solid ${c.text};` +
      `padding-bottom:4px;margin-bottom:14px;">Sententia · 句</section>`
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:8px ${pad}px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-size:18px`,
        `line-height:1.78`,
        `color:${c.text}`,
        `margin:0 0 16px`,
        `font-weight:500`,
      ].join(';'),
      svgSlot: headerSlot,
      bylineCSS: [
        `display:flex`,
        `justify-content:space-between`,
        `align-items:baseline`,
        `font-size:11px`,
        `font-family:'IBM Plex Mono',monospace`,
        `color:${c.textMuted}`,
        `letter-spacing:.16em`,
      ].join(';'),
      bylinePrefix: '',
    }
  },
}

export default variantDef
