/**
 * gallery · triptych
 *
 * 人格：三联横排（panorama / 三联画 / 旅行三幕）。
 * 骨架：display:table 33/33/33 三 cell，border-spacing 6px；
 *      每图强制 height:140px + object-fit:cover —— 与 duo 的关键差异（强制等高）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="4" y="20" width="20" height="35" rx="2" fill="${soft}"/>` +
      `<rect x="27" y="20" width="20" height="35" rx="2" fill="${soft}"/>` +
      `<rect x="50" y="20" width="20" height="35" rx="2" fill="${soft}"/>` +
      `<circle cx="14" cy="30" r="2.5" fill="${accent}"/>` +
      `<circle cx="37" cy="30" r="2.5" fill="${accent}"/>` +
      `<circle cx="60" cy="30" r="2.5" fill="${accent}"/>`,
  )
}

const triptych: VariantDef = {
  meta: {
    id: 'triptych',
    kind: 'gallery',
    name: '三联',
    description: '三联横排等高（panorama）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'gallery-triptych',
      name: '相册 · 三联',
      description: '三联横排等高（panorama / 三幕）',
      markdown:
        ':::: gallery 旅行三幕 variant=triptych\n' +
        '::: image-item src="https://placehold.co/400" alt="晨" 晨\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="午" 午\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="夜" 夜\n:::\n' +
        '::::\n',
    },
  ],
  render: () => {
    return {
      wrapperCSS: '',
      bodyCSS:
        'display:table;width:100%;table-layout:fixed;border-spacing:6px 0;border-collapse:separate',
    }
  },
}

export default triptych
