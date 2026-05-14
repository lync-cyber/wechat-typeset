/**
 * wechat 平台 adapter
 *
 * 把现有 applyWxPatches / inspectPatchTargets 包成 PlatformAdapter，让 registry 能统一派发。
 * 直接 export 也保留——pipeline / public API / 测试统一从此处 import。
 *
 * R7-A 重构：原 src/core/pipeline/wxPatch/{index,inspect}.ts 两个 shim 已删除；
 * 所有消费者直接 import 自此目录。
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
