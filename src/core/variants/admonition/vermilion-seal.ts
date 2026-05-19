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
    designedFor: ['literary-humanism'],
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
    // 朱印不能走 position:absolute —— wxPatch 会剥 position/top/right。
    // 改为"顶端独占一行"：包一层 text-align:right line-height:0 让 42×42 inline-block
    // 印章贴右上；下面是「示」副字 + 用户正文。失去"印章浮在文字之上"的层叠感，
    // 换来"印章 + 示 + 正文"三段堆叠的可粘贴版本，签名元素（朱红方框 告 字）保留。
    return {
      wrapperCSS: [
        `font-family:'Noto Serif SC',serif`,
        `background-color:${bg}`,
        `padding:6px 4px`,
      ].join(';'),
      titleCSS: '',
      svgSlot:
        `<div style="text-align:right;line-height:0;margin-bottom:6px;">` +
        `<span style="display:inline-block;width:42px;height:42px;` +
        `border:2.5px solid ${seal};color:${seal};font-size:22px;font-weight:600;` +
        `text-align:center;line-height:38px;font-family:'Noto Serif SC',serif;` +
        `transform:rotate(-3deg);">告</span>` +
        `</div>` +
        `<div style="font-family:'Noto Serif SC',serif;font-size:11px;` +
        `letter-spacing:.4em;color:${seal};font-weight:500;margin-bottom:8px;">　示</div>`,
      bodyCSS: [
        `font-size:15px`,
        `line-height:2`,
        `color:${text}`,
        `margin:0`,
      ].join(';'),
      suppressIcon: true,
    }
  },
}

export default variantDef
