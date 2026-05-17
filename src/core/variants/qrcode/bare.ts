/**
 * qrcode · bare（默认）
 *
 * 视觉：居中 QR + 居中 caption。"任意场景的 QR"——赞赏码 / 活动链接 / 小程序码，
 * 布局极简。与 follow-card 的边界：follow-card 是刊物订阅卡的左 QR + 右三行版式，
 * bare 是无装饰的扫码块。
 *
 * QR 渲染逻辑在容器 renderer 里（attrs.text 走内置编码；外链图回退正文 ![](url)）；
 * variant 只决定 wrapper / caption 排印。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="22" y="14" width="32" height="32" fill="${text}"/>` +
      `<rect x="26" y="18" width="8" height="8" fill="#fefefe"/>` +
      `<rect x="42" y="18" width="8" height="8" fill="#fefefe"/>` +
      `<rect x="26" y="34" width="8" height="8" fill="#fefefe"/>` +
      `<rect x="38" y="34" width="4" height="4" fill="#fefefe"/>` +
      `<rect x="16" y="54" width="44" height="2" fill="#a0a8b3"/>` +
      `<rect x="22" y="60" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const bare: VariantDef = {
  meta: {
    id: 'bare',
    kind: 'qrcode',
    name: '居中 QR',
    description: '居中 QR + 下方 caption（默认）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qr-bare',
      name: '居中 QR',
      description: '通用扫码块：居中 QR + 说明文案',
      markdown: '::: qrcode text="https://mp.weixin.qq.com/s/xxx"\n扫码关注\n:::\n',
    },
  ],
  // bare 不接管 wrapper / caption layout；qrcode renderer 自己处理。
  render: () => ({ wrapperCSS: '' }),
}

export default bare
