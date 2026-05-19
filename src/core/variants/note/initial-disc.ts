import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<circle cx="22" cy="32" r="12" fill="${text}"/>` +
      `<text x="22" y="37" font-size="10" font-weight="500" fill="#ffffff" ` +
      `text-anchor="middle" font-family="serif">L</text>` +
      `<rect x="40" y="20" width="25" height="2" fill="${text}" opacity="0.4"/>` +
      `<rect x="40" y="28" width="25" height="2" fill="#c0c6cf"/>` +
      `<rect x="40" y="36" width="25" height="2" fill="#c0c6cf"/>` +
      `<rect x="40" y="44" width="20" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef = {
  meta: {
    id: 'initial-disc',
    kind: 'note',
    name: '首字母圆盘',
    description: '左 34×34 圆形深底 + EDITOR monospace（包豪斯 v1）',
    designedFor: ['swiss-grid'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-initial-disc',
      name: '首字母圆盘',
      description: '左 34×34 圆形深底 + EDITOR monospace（包豪斯 v1）',
      markdown: '::: note variant=initial-disc\n按语正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const header = [
      `<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:4px;">`,
      `<div style="flex-shrink:0;width:34px;height:34px;border-radius:50%;`,
      `background:${c.text};color:${c.bg};display:flex;align-items:center;`,
      `justify-content:center;font-family:'Lora',serif;font-size:15px;font-weight:500;">L</div>`,
      `<div style="padding-top:4px;font-family:'IBM Plex Mono',monospace;font-size:9px;`,
      `letter-spacing:.2em;color:${c.textMuted};">EDITOR · 刘震</div>`,
      `</div>`,
    ].join('')
    return {
      wrapperCSS: [`background:${c.bg}`, 'padding:6px 0'].join(';'),
      titleCSS: '',
      suppressIcon: true,
      svgSlot: header,
      bodyCSS: [
        `font-size:14.5px`,
        `line-height:1.85`,
        `color:${c.text}`,
        `font-family:'Noto Serif SC',serif`,
        `margin:0`,
      ].join(';'),
    }
  },
}

export default variantDef
