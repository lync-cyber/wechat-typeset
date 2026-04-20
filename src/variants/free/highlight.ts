/**
 * free · highlight（重点高亮块）：整段荧光底色。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/>` +
      `<rect x="14" y="30" width="46" height="2" fill="#856404"/>` +
      `<rect x="14" y="38" width="38" height="2" fill="#856404"/>`,
  )
}

const highlight: VariantDef = {
  meta: {
    id: 'highlight',
    kind: 'none',
    name: '重点高亮块',
    description: '整段荧光底色',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-highlight',
      name: '重点高亮块',
      description: '整段荧光底色',
      markdown: '::: highlight\n这一段将被整段高亮，用来压重点。\n:::\n',
    },
  ],
}

export default highlight
