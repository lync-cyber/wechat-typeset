import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="18" width="8" height="8" fill="${accent}"/>` +
      `<rect x="18" y="20" width="18" height="4" fill="${text}"/>` +
      `<rect x="40" y="21" width="20" height="1" fill="${text}"/>` +
      `<rect x="6" y="34" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="42" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="50" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'filled-square',
    kind: 'admonition',
    name: '实心方块',
    description: '左 18×18 accent 方块 + flex 横线（包豪斯 v1）',
    themeCompat: ['brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-filled-square',
      name: '实心方块',
      description: '左 18×18 accent 方块 + flex 横线（包豪斯 v1）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#c8412e', soft: '#efece5', text: '#111' },
      markdown: '::: tip 告示 variant=filled-square\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    const accent = c.accent
    return {
      wrapperCSS: [
        `font-family:'Noto Sans SC',sans-serif`,
        `background-color:${bg}`,
        `padding:4px 0`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        `<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">` +
        `<span style="width:18px;height:18px;background:${accent};` +
        `display:inline-block;flex-shrink:0;"></span>` +
        `<span style="font-size:14px;font-weight:700;letter-spacing:.3em;color:${text};">告　示</span>` +
        `<span style="flex:1;height:1px;background:${text};"></span>` +
        `<span style="font-family:'IBM Plex Mono',monospace;font-size:10px;` +
        `color:${textMuted};letter-spacing:.16em;">N° 01</span>` +
        `</div>`,
      bodyCSS: [
        `font-family:'Noto Serif SC',serif`,
        `font-size:15px`,
        `line-height:1.95`,
        `color:${text}`,
        `margin:0`,
      ].join(';'),
      suppressIcon: true,
    }
  },
}

export default variantDef
