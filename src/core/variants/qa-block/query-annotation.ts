/**
 * qa-block · query-annotation（宋本批注 设问 + 注）
 *
 * 设计稿 02·B：设问行夹在上下两条 1px 主色实线之间，前置 letter-spaced CJK
 * kicker "設・問"；注解行无框、左侧 hanging 缩进 20px 内嵌"註" kicker。
 * 注：原稿 position:absolute 在公众号被剥，降级为 display:table + 首列固定宽。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="64" height="1" fill="${text}"/>` +
      `<rect x="8" y="20" width="24" height="2" fill="${accent}"/>` +
      `<rect x="8" y="28" width="56" height="2" fill="${text}"/>` +
      `<rect x="6" y="34" width="64" height="1" fill="${text}"/>` +
      `<rect x="14" y="48" width="6" height="2" fill="${accent}"/>` +
      `<rect x="22" y="48" width="42" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="22" y="54" width="36" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="22" y="60" width="40" height="2" fill="${text}" opacity="0.7"/>`,
  )
}

const queryAnnotation: VariantDef = {
  meta: {
    id: 'query-annotation',
    kind: 'qaBlock',
    name: '设问注',
    description: '上下夹线设问 + 左 hanging 注解，宋本批注体',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-query-annotation',
      name: '问答 · 设问注',
      description: '設・問 上下夹线 + 註 hanging 缩进，文言批注感',
      markdown:
        '::: qa-block 读者问答 variant=query-annotation q="何谓\\"诗境\\"？"\n' +
        '境者，意中之境也。情景交融而非情景相加，所谓"以我观物，物皆著我之色彩"。\n' +
        ':::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:18px 0;padding:6px 0;background-color:transparent',
  }),
}

export default queryAnnotation
