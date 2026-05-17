/**
 * gallery · duo（默认）
 *
 * 人格：左右对比双联（before/after / 草图-成品 / 两幅相关画面）。
 * 骨架：display:table 50/50 两 cell，border-spacing 吸收 8px gap，比例自由。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="29" height="47" rx="2" fill="${soft}"/>` +
      `<rect x="40" y="14" width="29" height="47" rx="2" fill="${soft}"/>` +
      `<circle cx="14" cy="24" r="3" fill="${accent}"/>` +
      `<circle cx="48" cy="24" r="3" fill="${accent}"/>`,
  )
}

const duo: VariantDef = {
  meta: {
    id: 'duo',
    kind: 'gallery',
    name: '双联',
    description: '左右双图对照（默认）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'gallery-duo',
      name: '相册 · 双联',
      description: '左右双图对照（before/after）',
      markdown:
        ':::: gallery 春夏 variant=duo\n' +
        '::: image-item src="https://placehold.co/400" alt="春" 春\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="夏" 夏\n:::\n' +
        '::::\n',
    },
  ],
  render: () => {
    return {
      wrapperCSS: '',
      bodyCSS:
        'display:table;width:100%;table-layout:fixed;border-spacing:8px 0;border-collapse:separate',
    }
  },
}

export default duo
