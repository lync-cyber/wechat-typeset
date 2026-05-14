/**
 * 向后兼容 shim
 *
 * R10 把 wxPatch 实现搬到 src/core/pipeline/platforms/wechat/，本文件保留是因为：
 *   - tests/unit/wxPatch.spec.ts 直接 import 自此路径
 *   - 外部脚本（skills/、docs/ 示例）可能引用此路径
 *   - 公开 API（src/public/index.ts）的 WxPatchOptions 类型曾从此处导出
 *
 * 新代码请直接从 ../platforms/wechat 引入。本 shim 可在确认所有消费者迁移后删除。
 */

export {
  wechatAdapter,
  applyWxPatches,
  inspectPatchTargets,
  patchListWrap,
  stripForbiddenAttrs,
  stripForbiddenTags,
  stripFontFamily,
  patchSvgUrlQuotes,
  patchSvgIds,
  patchFlexToFallback,
  patchSvgWhiteBg,
} from '../platforms/wechat'
export type { WxPatchOptions, PatchLog, PatchLogEntry } from '../platforms/wechat'
