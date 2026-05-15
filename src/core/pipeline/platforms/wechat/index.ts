/**
 * wechat 平台 adapter：把 applyWxPatches / inspectPatchTargets 包成 PlatformAdapter
 * 供 registry 统一派发；同时直接 export，pipeline / public API / 测试从此 import。
 */

import { applyWxPatches, type WxPatchOptions } from './patch'
import { inspectPatchTargets } from './inspect'
import type { PlatformAdapter } from '../types'

export const wechatAdapter: PlatformAdapter = {
  id: 'wechat',
  name: '微信公众号',
  status: 'stable',
  patch: (html, opts) => applyWxPatches(html, (opts ?? {}) as WxPatchOptions),
  inspect: inspectPatchTargets,
}

export { applyWxPatches, inspectPatchTargets }
export type { WxPatchOptions } from './patch'
export type { PatchLog, PatchLogEntry } from './inspect'
export {
  patchListWrap,
  stripForbiddenAttrs,
  stripForbiddenTags,
  stripFontFamily,
  patchSvgUrlQuotes,
  patchSvgIds,
  patchFlexToFallback,
  patchSvgWhiteBg,
} from './patch'
