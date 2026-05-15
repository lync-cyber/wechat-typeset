/**
 * voice-card（音频占位）。粘贴后微信识别为 mpvoice 节点。
 */

import type { VariantDef } from '../../../core/variants/_core'
import { svg } from '../../../core/variants/_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/>` +
      `<rect x="14" y="30" width="46" height="2" fill="#856404"/>` +
      `<rect x="14" y="38" width="38" height="2" fill="#856404"/>`,
  )
}

const voiceCard: VariantDef = {
  meta: {
    id: 'voice-card',
    kind: 'none',
    name: '音频占位',
    description: '粘贴后微信识别为 mpvoice 真节点',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-voice-card',
      name: '音频占位',
      description: '粘贴后微信识别为 mpvoice 真节点',
      markdown:
        '::: voice-card 本期播客\n粘贴后在公众号后台从素材库重新插入。\n:::\n',
    },
  ],
}

export default voiceCard
