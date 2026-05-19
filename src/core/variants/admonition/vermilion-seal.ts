import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="48" y="16" width="18" height="18" fill="none" stroke="${accent}" stroke-width="1.5" transform="rotate(-3 57 25)"/>` +
      `<rect x="10" y="22" width="34" height="2" fill="#5a6068" opacity="0.5"/>` +
      `<rect x="10" y="32" width="34" height="2" fill="#5a6068"/>` +
      `<rect x="10" y="40" width="32" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="48" width="28" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'vermilion-seal',
    kind: 'admonition',
    name: '朱印告示',
    description: '右上 -3° 旋转方框朱印（宋本 v1）',
    themeCompat: ['republican-era'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-vermilion-seal',
      name: '朱印告示',
      description: '右上 -3° 旋转方框朱印（宋本 v1）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#a03a2a', soft: '#f3eada' },
      markdown: '::: tip 告示 variant=vermilion-seal\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const seal = c.accentClassical ?? c.accent
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `padding:18px 4px`,
        `position:relative`,
      ].join(';'),
      titleCSS: '',
      // 朱印方框绝对定位右上角；副字「示」作为 svgSlot 里的普通流文字在印章下方
      svgSlot:
        `<div style="position:absolute;top:4px;right:6px;width:42px;height:42px;` +
        `border:2.5px solid ${seal};color:${seal};font-size:22px;font-weight:600;` +
        `text-align:center;line-height:38px;font-family:'Noto Serif SC',serif;` +
        `transform:rotate(-3deg);">告</div>` +
        `<div style="font-family:'Noto Serif SC',serif;font-size:11px;` +
        `letter-spacing:.4em;color:${seal};font-weight:500;margin-bottom:8px;">　示</div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:2`,
        `color:${text}`,
        `margin:0`,
        `padding-right:60px`,
      ].join(';'),
      suppressIcon: true,
    }
  },
}

export default variantDef
