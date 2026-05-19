import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<text x="8" y="56" font-size="44" font-weight="400" fill="${text}" opacity="0.8" font-family="serif">凡</text>` +
      `<rect x="28" y="20" width="40" height="2.5" fill="${text}" opacity="0.35"/>` +
      `<rect x="28" y="28" width="42" height="2.5" fill="${text}" opacity="0.35"/>` +
      `<rect x="28" y="36" width="36" height="2.5" fill="${text}" opacity="0.35"/>` +
      `<rect x="28" y="44" width="30" height="2.5" fill="${text}" opacity="0.35"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'drop-capital',
    kind: 'pullQuote',
    name: '首字下沉',
    description: 'drop capital + 段右 Cormorant italic（编辑部 v2）',
    designedFor: ['people-story'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-drop-capital',
      name: '首字下沉',
      description: '段首大号衬线 capital + Lora 衬线拉引',
      markdown:
        '::: pull-quote variant=drop-capital\n凡人生大半的烦恼，都来自把别人的剧本当成自己的人生。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    // drop capital 妥协方案:微信粘贴层 stripForbiddenAttrs 会剥 float:*, 真正的 drop
    // cap 环绕排版无法在公众号生效。改为段首独立大号衬线字符块,与下方 italic 段落上下
    // 排布;视觉签名(大写首字 + 衬线)保留,环绕降级为顺序。「凡」hardcode (baseline 同)。
    const dropCapSlot =
      `<section style="line-height:0.85;margin:0 0 6px;text-align:left">` +
      `<span style="font-family:'Lora','Noto Serif SC',serif;` +
      `font-size:64px;font-weight:400;color:${c.text};display:inline-block">凡</span>` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `background:${c.bg}`,
        'padding:14px 0',
      ].join(';'),
      bodyCSS: 'text-align:left',
      quoteCSS: [
        `color:${c.text}`,
        'font-size:20px',
        'line-height:1.6',
        'font-weight:500',
        'letter-spacing:0.02em',
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
        'letter-spacing:0.3px',
      ].join(';'),
      svgSlot: dropCapSlot,
    }
  },
}

export default variantDef
