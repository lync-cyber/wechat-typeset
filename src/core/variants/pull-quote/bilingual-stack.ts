import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="16" width="44" height="2" fill="${accent}" opacity="0.5"/>` +
      `<rect x="8" y="24" width="52" height="2" fill="${accent}" opacity="0.5"/>` +
      `<rect x="8" y="35" width="59" height="1" fill="${text}" opacity="0.25"/>` +
      `<rect x="8" y="43" width="52" height="3.5" fill="${text}" opacity="0.7"/>` +
      `<rect x="8" y="53" width="48" height="3.5" fill="${text}" opacity="0.7"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'bilingual-stack',
    kind: 'pullQuote',
    name: '双语堆叠',
    description: '中英双语堆叠：上拉丁 italic + 下中文大字（博物 v1）',
    designedFor: ['academic-frontier'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-bilingual-stack',
      name: '双语堆叠',
      description: '上 Lora italic 英文 + 下中文大字 + mono 分隔',
      markdown:
        '::: pull-quote variant=bilingual-stack\n荒野之中，\n蕴藏世界。\n:::\nIn wildness is the preservation of the world.\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const accentNaturalist = c.accentNaturalist ?? c.accent
    // 上方 Lora italic 拉丁引文通过 svgSlot 注入，作为装饰头部。
    // body 承载中文大字主体。底部分割线 + attribution 通过 byline 机制输出。
    const latinSlot =
      `<section style="font-family:'Lora',serif;font-style:italic;` +
      `font-size:13px;color:${accentNaturalist};letter-spacing:0.04em;` +
      `line-height:1.5;margin-bottom:8px">` +
      `In wildness is the preservation of the world.` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `background:${c.bg}`,
        'padding:14px 0',
        'text-align:left',
      ].join(';'),
      bodyCSS: 'text-align:left',
      quoteCSS: [
        `color:${c.text}`,
        'font-size:26px',
        'line-height:1.45',
        'font-weight:500',
        'letter-spacing:0.02em',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
        `font-family:'Noto Serif SC',serif`,
      ].join(';'),
      bylineCSS: [
        `color:${c.textMuted}`,
        `border-top:1px solid ${c.text}`,
        'padding-top:8px',
        'margin-top:10px',
        'font-size:10px',
        'line-height:1.6',
        'letter-spacing:0.16em',
        `font-family:'IBM Plex Mono',monospace`,
        'text-align:left',
        'display:block',
      ].join(';'),
      svgSlot: latinSlot,
    }
  },
}

export default variantDef
