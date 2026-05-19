import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="1" fill="${accent}" opacity="0.7"/>` +
      `<rect x="8" y="60" width="59" height="1" fill="${accent}" opacity="0.7"/>` +
      `<rect x="8" y="24" width="44" height="3" fill="${text}" opacity="0.7"/>` +
      `<rect x="8" y="33" width="40" height="3" fill="${text}" opacity="0.7"/>` +
      `<rect x="55" y="22" width="10" height="2" fill="${accent}" opacity="0.6"/>` +
      `<rect x="55" y="30" width="10" height="2" fill="${accent}" opacity="0.6"/>` +
      `<rect x="55" y="38" width="10" height="2" fill="${accent}" opacity="0.6"/>` +
      `<rect x="55" y="46" width="10" height="2" fill="${accent}" opacity="0.4"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'with-gloss',
    kind: 'pullQuote',
    name: '夹注式拉引',
    description: '双行夹注 + 上下朱色细线（宋本 v2）',
    designedFor: ['literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-with-gloss',
      name: '夹注式拉引',
      description: '大字拉引 + 右侧竖排夹注 + 朱色细线',
      markdown:
        '::: pull-quote variant=with-gloss\n花 未 全 开\n月 未 圆\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const accentClassical = c.accentClassical ?? c.accent
    // 双行夹注：上下朱色细线，引文主体 flex:1，右侧竖排注文 writing-mode:vertical-rl。
    // writing-mode 在公众号 inline style 中可用（不是 CSS class，不被剥）。
    const glossSlot =
      `<section style="display:table;width:100%;margin-bottom:0">` +
      `<section style="display:table-cell;vertical-align:top">` +
      `</section>` +
      `<section style="display:table-cell;vertical-align:top;width:22px;` +
      `padding-top:4px;writing-mode:vertical-rl;font-size:10px;` +
      `line-height:1.7;color:${accentClassical};letter-spacing:0.12em">` +
      `曾国藩家书有此句言事不可过盛` +
      `</section>` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `border-top:1px solid ${accentClassical}`,
        `border-bottom:1px solid ${accentClassical}`,
        'padding:16px 0',
        `background:${c.bg}`,
      ].join(';'),
      bodyCSS: [
        'display:table-cell',
        'vertical-align:top',
        'text-align:left',
      ].join(';'),
      quoteCSS: [
        `color:${c.text}`,
        'font-size:28px',
        'line-height:1.4',
        'font-weight:500',
        'letter-spacing:0.04em',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
        `font-family:'Noto Serif SC',serif`,
      ].join(';'),
      bylineCSS: [
        `color:${c.textMuted}`,
        'font-size:12px',
        'line-height:1.6',
        'margin-top:10px',
        'text-align:left',
        'letter-spacing:0.2em',
      ].join(';'),
      svgSlot: glossSlot,
    }
  },
}

export default variantDef
