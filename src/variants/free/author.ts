/**
 * free · author（作者栏）
 *
 * kind='none' 自由组件。render 由 containers/media.ts 路由。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="22" width="63" height="32" rx="4" fill="#f7f8fa"/>` +
      `<circle cx="16" cy="38" r="6" fill="#c0c6cf"/>` +
      `<rect x="28" y="32" width="24" height="3" fill="#1f2328"/>` +
      `<rect x="28" y="40" width="34" height="2" fill="#c0c6cf"/>`,
  )
}

const author: VariantDef = {
  meta: {
    id: 'author',
    kind: 'none',
    name: '作者栏',
    description: '姓名 + 角色 + 一句话',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-author',
      name: '作者栏',
      description: '姓名 + 角色 + 一句话',
      markdown: '::: author 张三 role=主笔\n一段作者自述或背景。\n:::\n',
    },
  ],
}

export default author
