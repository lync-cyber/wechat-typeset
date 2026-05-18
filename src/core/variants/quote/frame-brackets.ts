/**
 * quote · frame-brackets（四角 L 形装饰框）
 *
 * 视觉：四个角用 SVG 画 L 形短角，中间完全留白，正文居中。
 *
 * 实现要点：顶/底两段独立 SVG（各 20px 高）分别走 svgSlot 与 closeSlot —— 不能用单个
 * 全高 SVG + 负 margin 假覆盖，否则正文超过 SVG 固定高度时底部 L 角会被锚死在中段。
 * 微信公众号粘贴禁用 position:absolute 与伪元素，这是当前布局下唯一稳妥的"贴顶/贴底"方案。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function topBracketsSvg(accent: string): string {
  return (
    '<svg viewBox="0 0 320 20" width="100%" height="20"' +
    ' xmlns="http://www.w3.org/2000/svg"' +
    ' preserveAspectRatio="none"' +
    ' style="display:block;margin-bottom:-20px">' +
    `<path d="M0,20 L0,0 L20,0 M300,0 L320,0 L320,20" stroke="${accent}" stroke-width="2" fill="none"/>` +
    '</svg>'
  )
}

function bottomBracketsSvg(accent: string): string {
  return (
    '<svg viewBox="0 0 320 20" width="100%" height="20"' +
    ' xmlns="http://www.w3.org/2000/svg"' +
    ' preserveAspectRatio="none"' +
    ' style="display:block;margin-top:-20px">' +
    `<path d="M0,0 L0,20 L20,20 M300,20 L320,20 L320,0" stroke="${accent}" stroke-width="2" fill="none"/>` +
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
  render: (ctx) => {
    const accent = ctx.tokens.colors.primary
    return {
      // 几何：top/bottom SVG 用 margin-bottom:-20 / margin-top:-20 "悬浮"不占布局流，
      // body 流仍从 wrapper 顶 / 底起——这意味着 **wrapper padding 控制不了 L 角到正文的距离**，
      // 只控制 L 角到 wrapper 边的距离。早期版本误把 padding-y 当净空，正文首行仍被 L 竖边压。
      // 正确分工：wrapper padding-y = L 角与 wrapper 边的小间距（16）；body 自己加 padding
      // 让正文与 L 角保持视觉净空（36 = 20 SVG 高 + 16 净空）。
      wrapperCSS: `padding:16px 24px;margin:22px 0`,
      bodyCSS: `padding:36px 0;font-size:16px;line-height:1.85;text-align:center;color:${ctx.tokens.colors.text}`,
      svgSlot: topBracketsSvg(accent),
      closeSlot: bottomBracketsSvg(accent),
    }
  },
}

export default frameBrackets
