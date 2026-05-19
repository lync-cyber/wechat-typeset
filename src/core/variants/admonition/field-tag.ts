import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="34" width="63" height="1" fill="${text}"/>` +
      `<rect x="6" y="20" width="28" height="2" fill="${text}" opacity="0.5"/>` +
      `<rect x="6" y="26" width="22" height="2" fill="${accent}" opacity="0.7"/>` +
      `<rect x="50" y="26" width="1" height="6" fill="${text}" opacity="0.5"/>` +
      `<rect x="54" y="24" width="1" height="10" fill="${text}" opacity="0.5"/>` +
      `<rect x="58" y="26" width="1" height="6" fill="${text}" opacity="0.5"/>` +
      `<rect x="62" y="24" width="1" height="10" fill="${text}" opacity="0.5"/>` +
      `<rect x="66" y="26" width="1" height="6" fill="${text}" opacity="0.5"/>` +
      `<rect x="6" y="42" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="50" width="48" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'field-tag',
    kind: 'admonition',
    name: '刻度学名',
    description: 'FIG.CAVE + Notabene + 短刻度（博物 v1）',
    themeCompat: ['life-aesthetic'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-field-tag',
      name: '刻度学名',
      description: 'FIG.CAVE + Notabene + 短刻度（博物 v1）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#5e6f6a', soft: '#ece4d2', text: '#1f2a2a' },
      markdown: '::: tip 告示 variant=field-tag\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `padding:4px 0`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        `<div style="display:flex;align-items:flex-end;justify-content:space-between;` +
        `border-bottom:1px solid ${text};padding-bottom:6px;margin-bottom:14px;">` +
        `<div>` +
        `<div style="font-family:'IBM Plex Mono',monospace;font-size:10px;` +
        `letter-spacing:.2em;color:${textMuted};">FIG. CAVE — 04</div>` +
        `<div style="font-family:'Lora',serif;font-style:italic;font-size:13px;` +
        `color:${text};margin-top:2px;">Notabene · 告示</div>` +
        `</div>` +
        `<div style="font-family:'IBM Plex Mono',monospace;font-size:9px;` +
        `color:${textMuted};letter-spacing:.2em;line-height:1;">` +
        `<span style="display:inline-block;border-left:1px solid ${textMuted};height:6px;margin-right:3px;vertical-align:bottom;"></span>` +
        `<span style="display:inline-block;border-left:1px solid ${textMuted};height:10px;margin-right:3px;vertical-align:bottom;"></span>` +
        `<span style="display:inline-block;border-left:1px solid ${textMuted};height:6px;margin-right:3px;vertical-align:bottom;"></span>` +
        `<span style="display:inline-block;border-left:1px solid ${textMuted};height:10px;margin-right:3px;vertical-align:bottom;"></span>` +
        `<span style="display:inline-block;border-left:1px solid ${textMuted};height:6px;margin-right:3px;vertical-align:bottom;"></span>` +
        `</div>` +
        `</div>`,
      bodyCSS: [
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
