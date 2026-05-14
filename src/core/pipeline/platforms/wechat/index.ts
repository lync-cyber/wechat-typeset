/**
 * wechat 平台 adapter
 *
 * 把现有 applyWxPatches / inspectPatchTargets 包成 PlatformAdapter，让 registry 能统一派发。
 * 直接 export 也保留——pipeline / public API / 测试以前从 wxPatch 包导入的所有名字
 * 经 src/core/pipeline/wxPatch/index.ts 与 inspect.ts 两个 shim 继续可用。
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
