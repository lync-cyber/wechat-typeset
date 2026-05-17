/**
 * gallery · ribbon-strip
 *
 * 人格：横向滚动条带（移动端 carousel / 旅行账号封面）。
 * 骨架：wrapper overflow-x:auto + white-space:nowrap；项 inline-block 64% 大尺寸；
 *      右侧 inset box-shadow 提示可滑（同 <pre> 横滑工艺，buildTheme.ts:240-249）。
 *
 * `-webkit-overflow-scrolling:touch` 是 iOS 微信 webview 原生触摸惯性的暗号；
 * 同 footnotes/inline-flow 已用先例（rules.ts FORBIDDEN 正则不扫属性值）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="20" width="28" height="35" rx="2" fill="${soft}"/>` +
      `<rect x="38" y="20" width="28" height="35" rx="2" fill="${soft}"/>` +
      `<rect x="70" y="20" width="20" height="35" rx="2" fill="${soft}"/>` +
      `<circle cx="20" cy="37" r="3" fill="${accent}"/>` +
      `<circle cx="52" cy="37" r="3" fill="${accent}"/>` +
      `<rect x="60" y="20" width="15" height="35" fill="#000" opacity="0.18"/>`,
  )
}

const ribbonStrip: VariantDef = {
  meta: {
    id: 'ribbon-strip',
    kind: 'gallery',
    name: '横滚条带',
    description: '横向滚动 + 滑动提示阴影',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'gallery-ribbon-strip',
      name: '相册 · 横滚条带',
      description: '移动端 carousel / 封面组合',
      markdown:
        ':::: gallery 封面组合 variant=ribbon-strip\n' +
        '::: image-item src="https://placehold.co/600x400" alt="封面 1" 一\n:::\n' +
        '::: image-item src="https://placehold.co/600x400" alt="封面 2" 二\n:::\n' +
        '::: image-item src="https://placehold.co/600x400" alt="封面 3" 三\n:::\n' +
        '::: image-item src="https://placehold.co/600x400" alt="封面 4" 四\n:::\n' +
        '::::\n',
    },
  ],
  render: () => {
    return {
      wrapperCSS:
        'overflow-x:auto;white-space:nowrap;' +
        '-webkit-overflow-scrolling:touch;' +
        'box-shadow:inset -14px 0 10px -10px rgba(0,0,0,0.28);border-radius:4px',
      bodyCSS: 'display:block;font-size:0;line-height:0;white-space:nowrap',
    }
  },
}

export default ribbonStrip
