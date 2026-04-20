/**
 * sectionTitle · bordered（默认）
 *
 * 下方一道 2px 主色线；最克制的小节大标题。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="20" width="30" height="5" fill="${accent}"/>` +
      `<rect x="10" y="30" width="55" height="2" fill="${accent}"/>` +
      `<rect x="10" y="40" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="48" width="48" height="2" fill="#c0c6cf"/>`,
  )
}

const bordered: VariantDef = {
  meta: {
    id: 'bordered',
    kind: 'sectionTitle',
    name: '下划线章标题',
    description: '2px 主色底线 + 角饰（默认）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'sec-bordered',
      name: '下划线章标题',
      description: '2px 主色底线 + 角饰（默认）',
      markdown: '::: section-title 第一章\n:::\n',
    },
    {
      presetId: 'sec-bordered-long',
      name: '下划线 · 长标题',
      description: '多字章标题下划线节奏',
      markdown: '::: section-title 第二部分 · 深入骨架\n:::\n',
    },
  ],
  render: (ctx) => ({
    wrapperCSS:
      `margin:24px 0 12px;padding-bottom:6px;` +
      `border-bottom:2px solid ${ctx.tokens.colors.primary}`,
    titleCSS: `font-weight:700;font-size:20px;color:${ctx.tokens.colors.text}`,
    svgSlot: ctx.assets.sectionCorner ?? undefined,
  }),
}

export default bordered
