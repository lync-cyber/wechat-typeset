/**
 * 小红书平台 adapter（占位）
 *
 * 见 ./patch.ts 注释：实际适配方向可能是图片导出而非 HTML 复制；本 adapter 仅
 * 维持 platforms registry 的形状完整，方便未来根据真实需求落地。
 */

import { applyXhsPatches, type XhsPatchOptions } from './patch'
import type { PlatformAdapter } from '../types'

export const xhsAdapter: PlatformAdapter = {
  id: 'xhs',
  name: '小红书',
  status: 'placeholder',
  patch: (html, opts) => applyXhsPatches(html, (opts ?? {}) as XhsPatchOptions),
}

export { applyXhsPatches }
export type { XhsPatchOptions } from './patch'
