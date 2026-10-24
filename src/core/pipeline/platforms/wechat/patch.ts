/**
 * applyWxPatches：微信公众号 patch 链主入口。
 *
 * 由 platforms/wechat/index.ts 包装为 PlatformAdapter，供 pipeline 通过 registry 调用。
 * 公开 export（applyWxPatches / inspectPatchTargets / PatchLog / 8 个具名 patch）
 * 集中在 platforms/wechat/index.ts。
 *
 * 顺序（组合链共享 DOM；具名字符串入口仍各自解析、序列化）：
 *   1. patchListWrap            外包 section，保住列表外边距
 *   2. stripForbiddenAttrs      全局删 id + 定位声明
 *   3. stripForbiddenTags       删 <style>/<script>/<noscript>/<link>/<meta>/非白名单 iframe
 *   4. stripFontFamily          剥所有 inline font-family
 *   5. patchSvgUrlQuotes        SVG 子树内 url("x") → url(x)
 *   6. patchSvgIds              SVG 子树内删所有 id（冗余保险）
 *   7. patchFlexToFallback      display:flex → display:block（data-wx-keep-flex 例外）
 *   8. patchSvgWhiteBg          opts.svgWhiteBg 开启时生效（默认开）
 *
 * 幂等：每个 patch 内部都具备"看到已处理标记则跳过"或"目标集合为空则无改动"
 *       的性质。连续两次 applyWxPatches 不应改变结果。
 */

import { patchListWrap, patchListWrapInPlace } from './patchListWrap'
import { stripForbiddenAttrs, stripForbiddenAttrsInPlace } from './stripForbiddenAttrs'
import { stripForbiddenTags, stripForbiddenTagsInPlace } from './stripForbiddenTags'
import { stripFontFamily, stripFontFamilyInPlace } from './stripFontFamily'
import { patchSvgUrlQuotes, patchSvgUrlQuotesInPlace } from './patchSvgUrlQuotes'
import { patchSvgIds, patchSvgIdsInPlace } from './patchSvgIds'
import { patchFlexToFallback, patchFlexToFallbackInPlace } from './patchFlexToFallback'
import { patchSvgWhiteBg, patchSvgWhiteBgInPlace } from './patchSvgWhiteBg'
import { inspectContainer, type PatchLog } from './inspect'
import { parseFragment, serializeFragment } from './utils'

export interface WxPatchOptions {
  /**
   * SVG 纯白填充替换为 #fefefe（规避公众号把 #fff 光栅化为透明的问题）。
   * 默认开启：主题作者即便漏掉也能兜住；显式传 false 可关闭（如主题预览纸需要纯白对比）。
   */
  svgWhiteBg?: boolean
}

export function applyWxPatches(html: string, opts: WxPatchOptions = {}): string {
  return patchContainer(parseFragment(html).container, opts)
}

/** 与日志共用初始 DOM；日志仍描述原输入目标，不改为实际变更计数。 */
export function applyWxPatchesWithLog(
  html: string,
  opts: WxPatchOptions = {},
): { html: string; patchLog: PatchLog } {
  const { container } = parseFragment(html)
  const patchLog = inspectContainer(container)
  return { html: patchContainer(container, opts), patchLog }
}

function patchContainer(container: HTMLElement, opts: WxPatchOptions): string {
  const flattened = patchListWrapInPlace(container)
  if (flattened) {
    // 深层 li 可能含 div/table 等块元素，旧链在下一步解析时会修复新建 p 的嵌套。
    // 保留这一处兼容重解析，不在补丁里重写 HTML 解析器的结构修复规则。
    container = parseFragment(serializeFragment(container)).container
  }
  stripForbiddenAttrsInPlace(container)
  stripForbiddenTagsInPlace(container)
  stripFontFamilyInPlace(container)
  patchSvgUrlQuotesInPlace(container)
  patchSvgIdsInPlace(container)
  patchFlexToFallbackInPlace(container)
  if (opts.svgWhiteBg !== false) patchSvgWhiteBgInPlace(container)
  return serializeFragment(container)
}

export {
  patchListWrap,
  stripForbiddenAttrs,
  stripForbiddenTags,
  stripFontFamily,
  patchSvgUrlQuotes,
  patchSvgIds,
  patchFlexToFallback,
  patchSvgWhiteBg,
}
export { inspectPatchTargets, type PatchLog, type PatchLogEntry } from './inspect'
