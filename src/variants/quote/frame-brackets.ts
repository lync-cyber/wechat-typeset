/**
 * quote · frame-brackets（四角 L 形装饰框）
 *
 * 视觉：四个角用 SVG 画 L 形短角，中间完全留白，正文居中。
 * 实现：svgSlot 放一个全宽 SVG 作为视觉兜底；wrapper 只管间距，不画任何边。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function bracketsSvg(accent: string): string {
  return (
    '<svg viewBox="0 0 320 120" width="100%" height="120"' +
    ' xmlns="http://www.w3.org/2000/svg"' +
    ' preserveAspectRatio="none"' +
    ' style="display:block;margin-bottom:-120px">' +
    `<path d="M0,20 L0,0 L20,0 M300,0 L320,0 L320,20 M0,100 L0,120 L20,120 M300,120 L320,120 L320,100" stroke="${accent}" stroke-width="2" fill="none"/>` +
    '</svg>'
  )
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<path d="M10,14 L10,10 L16,10 M59,10 L65,10 L65,14 M10,61 L10,65 L16,65 M59,65 L65,65 L65,61" stroke="${accent}" stroke-width="1.5" fill="none"/>` +
      `<rect x="22" y="30" width="32" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="38" width="30" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="46" width="26" height="2" fill="#c0c6cf"/>`,
  )
}

const frameBrackets: VariantDef = {
  meta: {
    id: 'frame-brackets',
    kind: 'quote',
    name: '四角括号框',
    description: '四角 L 形装饰，中间全留白',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-brackets',
      name: '四角括号框',
      description: '四角 L 形装饰，中间全留白',
      markdown: '::: quote-card 作者 variant=frame-brackets\n此处填写正文\n:::\n',
    },
    {
      presetId: 'q-brackets-2',
      name: '四角括号无署名',
      description: '最克制的引用',
      markdown: '::: quote-card variant=frame-brackets\n此处填写正文\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS: `padding:26px 22px;margin:22px 0`,
    bodyCSS: `font-size:16px;line-height:1.85;text-align:center;color:${ctx.tokens.colors.text}`,
    svgSlot: bracketsSvg(ctx.tokens.colors.primary),
  }),
}

export default frameBrackets
