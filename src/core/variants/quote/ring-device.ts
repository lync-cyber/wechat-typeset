import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<circle cx="16" cy="24" r="5" fill="none" stroke="${text}" stroke-width="1.5"/>` +
      `<circle cx="38" cy="24" r="4" fill="${accent}"/>` +
      `<polygon points="58,20 68,20 63,28" fill="${text}"/>` +
      `<rect x="10" y="35" width="55" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="10" y="42" width="47" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="10" y="54" width="32" height="2" fill="${text}" opacity="0.2"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'ring-device',
    kind: 'quote',
    name: '圆环 device',
    description: '上方圆环 device + 大字 sans 引文 + Plex Mono byline（包豪斯 v2）',
    designedFor: ['swiss-grid', 'brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-ring-device',
      name: '圆环 device',
      description: '几何 device + 引文 + mono byline（包豪斯 v2）',
      markdown: '::: quote-card D. RAMS, 1976 variant=ring-device\n设计不是装饰，而是某种秩序的可视化。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const accent = c.accent
    const bg = c.bg
    const deviceSlot =
      `<section style="display:flex;gap:10px;align-items:center;margin-bottom:14px;color:${c.text};">` +
      `<span style="width:22px;height:22px;border:2px solid ${c.text};border-radius:50%;display:inline-block;flex-shrink:0;"></span>` +
      `<span style="flex:1;height:1px;background:${c.text};"></span>` +
      `<span style="width:14px;height:14px;background:${accent};border-radius:50%;display:inline-block;flex-shrink:0;"></span>` +
      `<span style="flex:1;height:1px;background:${c.text};"></span>` +
      `<span style="width:0;height:0;border-left:11px solid transparent;border-right:11px solid transparent;border-bottom:18px solid ${c.text};display:inline-block;flex-shrink:0;"></span>` +
      `</section>`
    return {
      wrapperCSS: [
        `background-color:${bg}`,
        `padding:14px ${pad}px ${pad}px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:18px`,
        `line-height:1.7`,
        `color:${c.text}`,
        `margin:0 0 8px`,
        `font-weight:500`,
        `letter-spacing:.01em`,
      ].join(';'),
      svgSlot: deviceSlot,
      bylineCSS: [
        `font-family:'IBM Plex Mono',monospace`,
        `font-size:10px`,
        `color:${c.textMuted}`,
        `letter-spacing:.2em`,
        `text-transform:uppercase`,
      ].join(';'),
      bylinePrefix: '— ',
    }
  },
}

export default variantDef
