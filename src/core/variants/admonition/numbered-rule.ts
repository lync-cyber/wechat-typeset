import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="63" height="2" fill="${text}"/>` +
      `<rect x="6" y="60" width="63" height="1" fill="${text}" opacity="0.5"/>` +
      `<rect x="6" y="24" width="24" height="2" fill="${text}"/>` +
      `<rect x="6" y="32" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="40" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="48" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="46" y="21" width="23" height="2" fill="${accent}" opacity="0.7"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'numbered-rule',
    kind: 'admonition',
    name: '编号横线',
    description: '顶2px+底1px大字距 NOTICE·N°（编辑部 v1）',
    themeCompat: ['official-gazette'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-numbered-rule',
      name: '编号横线',
      description: '顶2px+底1px大字距 NOTICE·N°（编辑部 v1）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#0a0a0a', soft: '#fbfaf7', text: '#0a0a0a' },
      markdown: '::: tip 告示 variant=numbered-rule\n正文示例\n:::\n',
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
        `<div style="border-top:2px solid ${text};border-bottom:1px solid ${text};` +
        `padding:14px 0 12px;margin-bottom:14px;display:flex;` +
        `justify-content:space-between;align-items:baseline;">` +
        `<span style="font-size:13px;font-weight:600;letter-spacing:.3em;color:${text};">告　示</span>` +
        `<span style="font-family:'IBM Plex Mono',monospace;font-size:10px;` +
        `letter-spacing:.18em;color:${textMuted};">NOTICE · N°01</span>` +
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
