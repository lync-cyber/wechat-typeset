import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="8" width="22" height="5" fill="${accent}"/>` +
      `<rect x="8" y="19" width="20" height="20" fill="none" stroke="${text}" stroke-width="1" opacity="0.5"/>` +
      `<rect x="9" y="20" width="18" height="18" fill="${text}" opacity="0.06"/>` +
      `<text x="18" y="33" font-size="9" text-anchor="middle" fill="${text}" opacity="0.7" font-weight="600">少</text>` +
      `<rect x="33" y="19" width="34" height="3.5" fill="${text}" opacity="0.7"/>` +
      `<rect x="33" y="28" width="34" height="3.5" fill="${text}" opacity="0.7"/>` +
      `<rect x="33" y="39" width="26" height="2.5" fill="${text}" opacity="0.4"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'grid-block',
    kind: 'pullQuote',
    name: '网格拉引',
    description: '左编号方格 + 右大字 sans + 顶 accent 条（包豪斯 v2）',
    designedFor: ['brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-grid-block',
      name: '网格拉引',
      description: '顶 accent 短条 + 左方格 + 右大字 sans',
      markdown:
        '::: pull-quote variant=grid-block\n少即多\n:::\nL. MIES VAN DER ROHE\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    // 顶部 accent 短条通过 svgSlot 注入，wrapper 使用 display:table 双列布局：
    // 左列：带边框的方格 + 汉字（table-cell，fixed width）
    // 右列：大字 sans 引文 body（table-cell，flex:1）
    const accentBar =
      `<section style="height:5px;background:${c.accent};` +
      `width:22px;margin-bottom:12px"></section>`
    const numberCell =
      `<section style="display:table-cell;vertical-align:top;width:48px;` +
      `padding-right:12px;padding-top:2px">` +
      `<section style="width:40px;height:40px;border:1px solid ${c.text};` +
      `display:flex;align-items:center;justify-content:center;` +
      `font-size:22px;color:${c.text};font-weight:500;` +
      `font-family:'Noto Serif SC',serif">` +
      `少` +
      `</section>` +
      `</section>`
    const layoutSlot = accentBar +
      `<section style="display:table;width:100%;table-layout:fixed">` +
      numberCell
    return {
      wrapperCSS: [
        'margin:28px 0',
        `background:${c.bg}`,
        'padding:14px 0 14px 0',
        'text-align:left',
      ].join(';'),
      bodyCSS: [
        'display:table-cell',
        'vertical-align:top',
        'text-align:left',
      ].join(';'),
      quoteCSS: [
        `color:${c.text}`,
        'font-size:26px',
        'line-height:1.4',
        'font-weight:500',
        'letter-spacing:0.01em',
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
        'letter-spacing:0.22em',
        'text-align:right',
      ].join(';'),
      bylinePrefix: '— ',
      svgSlot: layoutSlot,
    }
  },
}

export default variantDef
