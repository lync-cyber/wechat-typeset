import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="10" width="8" height="1.5" fill="${accent}" opacity="0.7"/>` +
      `<rect x="13.5" y="10" width="1.5" height="55" fill="${accent}" opacity="0.7"/>` +
      `<rect x="10" y="63.5" width="8" height="1.5" fill="${accent}" opacity="0.7"/>` +
      `<rect x="57" y="10" width="8" height="1.5" fill="${accent}" opacity="0.7"/>` +
      `<rect x="60.5" y="10" width="1.5" height="55" fill="${accent}" opacity="0.7"/>` +
      `<rect x="57" y="63.5" width="8" height="1.5" fill="${accent}" opacity="0.7"/>` +
      `<rect x="22" y="24" width="31" height="3" fill="${text}" opacity="0.7"/>` +
      `<rect x="22" y="33" width="31" height="3" fill="${text}" opacity="0.7"/>` +
      `<rect x="22" y="44" width="24" height="2" fill="${text}" opacity="0.4"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'caliper-mark',
    kind: 'pullQuote',
    name: '卡尺拉引',
    description: '左右测量卡尺刻度 + 居中拉引（博物 v2）',
    signatureOf: 'naturalist-notes',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-caliper-mark',
      name: '卡尺拉引',
      description: '左侧卡尺 SVG 竖线 + 引文 + mono attribution',
      markdown:
        '::: pull-quote variant=caliper-mark\n山是凝固的水，\n水是流动的山。\n:::\nFIELD JOURNAL, FOL.211\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const accentNaturalist = c.accentNaturalist ?? c.accent
    // 左侧卡尺：table-cell 形式（同 margin-pull 方案），wrapper display:table。
    // 左 cell 是 SVG 卡尺（上横线 + 竖线 + 下横线），body cell 承载引文。
    const caliperCell =
      `<section style="display:table-cell;vertical-align:top;width:22px;padding-top:4px;padding-right:10px">` +
      `<svg width="14" height="72" viewBox="0 0 14 72" xmlns="http://www.w3.org/2000/svg">` +
      `<rect x="0" y="0" width="14" height="1.5" fill="${accentNaturalist}"/>` +
      `<rect x="6.5" y="0" width="1" height="72" fill="${accentNaturalist}"/>` +
      `<rect x="0" y="70.5" width="14" height="1.5" fill="${accentNaturalist}"/>` +
      `</svg>` +
      `</section>`
    return {
      wrapperCSS: [
        'display:table',
        'width:100%',
        'table-layout:fixed',
        'margin:28px 0',
        `background:${c.bg}`,
        'padding:14px 0',
      ].join(';'),
      bodyCSS: [
        'display:table-cell',
        'vertical-align:top',
        'text-align:left',
      ].join(';'),
      quoteCSS: [
        `color:${c.text}`,
        'font-size:24px',
        'line-height:1.5',
        'font-weight:500',
        'letter-spacing:0.02em',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
        `font-family:'Noto Serif SC',serif`,
      ].join(';'),
      bylineCSS: [
        `color:${c.textMuted}`,
        `font-family:'IBM Plex Mono',monospace`,
        'font-size:10px',
        'line-height:1.6',
        'margin-top:8px',
        'letter-spacing:0.18em',
        'text-align:left',
      ].join(';'),
      bylinePrefix: '— ',
      svgSlot: caliperCell,
    }
  },
}

export default variantDef
