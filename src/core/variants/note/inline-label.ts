import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="22" width="22" height="10" rx="1" fill="${text}"/>` +
      `<rect x="36" y="24" width="30" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="38" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="46" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="54" width="40" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'inline-label',
    kind: 'note',
    name: '段首胶囊',
    description: '段首反白胶囊编者按 + inline 流（编辑部 v2）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-inline-label',
      name: '段首胶囊',
      description: '段首反白胶囊编者按 + inline 流（编辑部 v2）',
      markdown: '::: note variant=inline-label\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const capsule = [
      `<div style="margin-bottom:4px;">`,
      `<span style="display:inline-block;font-family:'IBM Plex Mono',monospace;`,
      `font-size:10px;letter-spacing:.2em;background:${c.text};color:${c.bg};`,
      `padding:2px 8px;vertical-align:1px;margin-right:8px;">编者按</span>`,
      `</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: capsule,
      bodyCSS: [
        `font-size:15px`,
        `line-height:1.95`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `text-indent:0`,
        `margin:0`,
      ].join(';'),
    }
  },
}

export default variantDef
