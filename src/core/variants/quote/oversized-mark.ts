import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<text x="10" y="38" font-size="28" fill="${text}" opacity="0.5" font-style="italic">&#8220;</text>` +
      `<rect x="18" y="42" width="38" height="2" fill="${text}" opacity="0.25"/>` +
      `<rect x="28" y="50" width="28" height="2" fill="${text}" opacity="0.18"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'oversized-mark',
    kind: 'quote',
    name: '巨号引号',
    description: '左上巨号 Cormorant " + italic Lora 正文 + 右下编辑部署名',
    themeCompat: ['editorial-mook', 'data-brief'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-oversized-mark',
      name: '巨号引号',
      description: '左上巨号引号 + italic Lora 正文（编辑部 v1）',
      markdown: '::: quote-card 韩少功《马桥词典》 variant=oversized-mark\n沉默是一种回答，只是我们经常听不见。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    const svgSlot =
      `<section style="line-height:.8;padding:${pad - 2}px ${pad}px 0">` +
      `<span style="font-family:'Cormorant Garamond',serif;font-size:72px;color:${c.text};font-weight:500;font-style:italic;display:block;height:36px;overflow:hidden;">&#8220;</span>` +
      `</section>`
    return {
      wrapperCSS: [
        `background-color:${c.bg}`,
        `padding:0 0 ${pad}px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-family:'Lora','Noto Serif SC',serif`,
        `font-size:21px`,
        `font-style:italic`,
        `line-height:1.6`,
        `color:${c.text}`,
        `font-weight:500`,
        `margin:6px 0 12px`,
        `padding:0 ${pad}px`,
        `letter-spacing:.01em`,
      ].join(';'),
      svgSlot,
      bylineCSS: [
        `display:flex`,
        `justify-content:space-between`,
        `align-items:baseline`,
        `border-top:1px solid ${c.text}`,
        `padding:8px ${pad}px 0`,
        `font-size:12px`,
        `color:${c.textMuted}`,
      ].join(';'),
      bylinePrefix: '',
    }
  },
}

export default variantDef
