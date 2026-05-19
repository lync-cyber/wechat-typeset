import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="18" width="63" height="47" fill="${soft}" stroke="${text}" stroke-width="1"/>` +
      `<polygon points="20,18 29,9 38,18" fill="${accent}"/>` +
      `<rect x="6" y="28" width="55" height="2" fill="${text}" opacity="0.4"/>` +
      `<rect x="6" y="38" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="46" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="54" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const variantDef: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'triangle-top',
    kind: 'admonition',
    name: '三角顶',
    description: '顶 -9px 三角徽 + 1px 边框（包豪斯 v2）',
    themeCompat: ['brutalist'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-triangle-top',
      name: '三角顶',
      description: '顶 -9px 三角徽 + 1px 边框（包豪斯 v2）',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#c8412e', soft: '#efece5', text: '#111' },
      markdown: '::: tip 告示 variant=triangle-top\n正文示例\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const bg = c.bg
    const text = c.text
    const textMuted = c.textMuted
    const accent = c.accent
    // 三角徽：baseline 用 position:absolute top:-9px，公众号剥离 absolute。
    // 改为在 svgSlot 里插入 inline SVG 三角，视觉效果相近，无需绝对定位。
    const triangleSvg =
      `<svg width="18" height="9" viewBox="0 0 18 9" xmlns="http://www.w3.org/2000/svg" ` +
      `style="display:block;margin-bottom:-1px;">` +
      `<polygon points="0,9 9,0 18,9" fill="${accent}"/>` +
      `<polygon points="1.4,9 9,1.4 16.6,9" fill="${bg}"/>` +
      `</svg>`
    return {
      wrapperCSS: [
        `font-family:'Noto Sans SC',sans-serif`,
        `background-color:${bg}`,
        `padding:14px 14px 16px`,
        `border:1px solid ${text}`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        triangleSvg +
        `<div style="font-family:'IBM Plex Mono',monospace;font-size:10px;` +
        `letter-spacing:.24em;color:${textMuted};margin-bottom:8px;">` +
        `ADMONITION · 告示</div>`,
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
