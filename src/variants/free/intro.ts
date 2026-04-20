/**
 * free · intro（开场导语）
 *
 * kind='none' 自由组件：无 variant 分派，纯 preset 条目；render 由 containers/media.ts
 * 按容器 name 路由，不走 variants.kind 分派。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/>` +
      `<rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/>` +
      `<rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>`,
  )
}

const intro: VariantDef = {
  meta: {
    id: 'intro',
    kind: 'none',
    name: '开场导语',
    description: '文章开头的引子卡，独立视觉',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-intro',
      name: '开场导语',
      description: '文章开头的引子卡，独立视觉',
      markdown: '::: intro\n一段用来承载"本文将讨论什么"的导语。\n:::\n',
    },
  ],
}

export default intro
