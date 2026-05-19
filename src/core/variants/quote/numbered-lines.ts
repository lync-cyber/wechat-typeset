import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="3" fill="${soft}"/>` +
      `<rect x="18" y="22" width="1" height="31" fill="${text}" opacity="0.2"/>` +
      `<text x="10" y="32" font-size="7" fill="${text}" opacity="0.4" font-family="monospace">01</text>` +
      `<text x="10" y="44" font-size="7" fill="${text}" opacity="0.4" font-family="monospace">02</text>` +
      `<rect x="22" y="26" width="32" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="22" y="34" width="36" height="2" fill="${text}" opacity="0.3"/>` +
      `<rect x="22" y="42" width="28" height="2" fill="${text}" opacity="0.3"/>`,
  )
}

const HEADER_SLOT =
  `<section style="font-family:'IBM Plex Mono',monospace;font-size:9px;` +
  `letter-spacing:.24em;margin-bottom:10px;">` +
  `— EXCERPT 003 —` +
  `</section>`

const variantDef: VariantDef = {
  meta: {
    id: 'numbered-lines',
    kind: 'quote',
    name: '编号竖列',
    description: '左 IBM Plex 编号竖列 + 1px 竖分隔（编辑部 v2）',
    designedFor: ['editorial-mook', 'data-brief'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-numbered-lines',
      name: '编号竖列',
      description: '左行号列 + 引文分行（编辑部 v2）',
      markdown: '::: quote-card 黑塞·《德米安》 variant=numbered-lines\n我们终其一生，是为了摆脱\n\n他人的期待，找到真正的自己。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS: [
        `background-color:${c.bg ?? '#fbfaf7'}`,
        `padding:${pad - 2}px ${pad}px ${pad}px`,
        `margin:20px 0`,
      ].join(';'),
      bodyCSS: [
        `font-family:'Lora','Noto Serif SC',serif`,
        `font-size:18px`,
        `line-height:1.75`,
        `color:${c.text}`,
      ].join(';'),
      svgSlot: HEADER_SLOT,
      bylineCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:12px`,
        `color:${c.textMuted}`,
        `margin-top:14px`,
        `letter-spacing:.06em`,
      ].join(';'),
      bylinePrefix: '— ',
    }
  },
}

export default variantDef
