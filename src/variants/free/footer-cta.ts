/**
 * free · footer-cta（文末 CTA）：标题 + 描述 + 按钮胶囊。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="16" width="63" height="43" rx="4" fill="#f7f8fa"/>` +
      `<rect x="20" y="24" width="34" height="3" fill="#1f2328"/>` +
      `<rect x="20" y="32" width="34" height="2" fill="#c0c6cf"/>` +
      `<rect x="26" y="42" width="22" height="10" rx="5" fill="#2d6fdd"/>`,
  )
}

const footerCta: VariantDef = {
  meta: {
    id: 'footer-cta',
    kind: 'none',
    name: '文末 CTA',
    description: '标题 + 描述 + 按钮胶囊',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-footer-cta',
      name: '文末 CTA',
      description: '标题 + 描述 + 按钮胶囊',
      markdown:
        '::: footer-cta 觉得有用？ cta=点此关注\n如果这篇对你有启发，欢迎关注。\n:::\n',
    },
  ],
}

export default footerCta
