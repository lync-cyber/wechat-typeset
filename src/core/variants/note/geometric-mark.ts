import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<polygon points="10,28 18,22 18,34" fill="${text}"/>` +
      `<rect x="22" y="25" width="33" height="2" fill="${text}"/>` +
      `<rect x="10" y="42" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="50" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="58" width="40" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'geometric-mark',
    kind: 'note',
    name: '几何引号',
    description: '三角引号 + EDITORIAL·NOTE 标题（包豪斯 v2）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-geometric-mark',
      name: '几何引号',
      description: '三角引号 + EDITORIAL·NOTE 标题（包豪斯 v2）',
      markdown: '::: note variant=geometric-mark\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const header = [
      `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">`,
      `<span style="width:0;height:0;border-top:6px solid transparent;`,
      `border-bottom:6px solid transparent;border-left:9px solid ${c.text};`,
      `display:inline-block;"></span>`,
      `<span style="font-family:'IBM Plex Mono',monospace;font-size:10px;`,
      `letter-spacing:.24em;color:${c.text};font-weight:600;">EDITORIAL · NOTE</span>`,
      `</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.9`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`,
        `padding-left:17px`,
      ].join(';'),
    }
  },
}

export default variantDef
