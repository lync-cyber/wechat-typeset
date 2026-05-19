import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="18" height="47" fill="none" stroke="${text}" stroke-width="1"/>` +
      `<rect x="8" y="22" width="14" height="2" fill="${text}" opacity="0.4"/>` +
      `<rect x="10" y="28" width="10" height="5" fill="${text}"/>` +
      `<rect x="11" y="38" width="8" height="2" fill="${accent}"/>` +
      `<rect x="28" y="22" width="36" height="2" fill="#5a6068"/>` +
      `<rect x="28" y="30" width="36" height="2" fill="#5a6068"/>` +
      `<rect x="28" y="38" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="28" y="46" width="30" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'specimen-box',
    kind: 'admonition',
    name: '编号方格',
    description: '左 1px border 方格 N°（博物 v2）',
    themeCompat: ['life-aesthetic'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-specimen-box',
      name: '编号方格',
      description: '左 1px border 方格 N°（博物 v2）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#8b4a3a', soft: '#ece4d2', text: '#1f2a2a' },
      markdown: '::: tip 告示 variant=specimen-box\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    const warm = c.accentNaturalist ?? c.textMuted
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `display:grid`,
        `grid-template-columns:48px 1fr`,
        `gap:0`,
        `padding:4px 0`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        `<div style="border:1px solid ${text};padding:6px 0;text-align:center;">` +
        `<div style="font-family:'IBM Plex Mono',monospace;font-size:9px;` +
        `color:${textMuted};letter-spacing:.16em;">N°</div>` +
        `<div style="font-family:'Lora',serif;font-size:22px;color:${text};` +
        `font-weight:500;line-height:1;margin-top:2px;">04</div>` +
        `<div style="font-size:9px;color:${warm};letter-spacing:.18em;` +
        `margin-top:4px;font-weight:500;">告示</div>` +
        `</div>`,
      bodyCSS: [
        `padding:0 0 0 14px`,
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
