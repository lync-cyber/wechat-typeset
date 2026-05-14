/**
 * 知乎平台 adapter（占位）
 *
 * status='placeholder'：UI 暂不暴露 select，避免诱导作者走 no-op 流程。
 * fork / 社区 PR 补完 patch.ts 后，将 status 升为 'beta' / 'stable' 即可开启 UI。
 */

import { applyZhihuPatches, type ZhihuPatchOptions } from './patch'
import type { PlatformAdapter } from '../types'

export const zhihuAdapter: PlatformAdapter = {
  id: 'zhihu',
  name: '知乎专栏',
  status: 'placeholder',
  patch: (html, opts) => applyZhihuPatches(html, (opts ?? {}) as ZhihuPatchOptions),
}

export { applyZhihuPatches }
export type { ZhihuPatchOptions } from './patch'
