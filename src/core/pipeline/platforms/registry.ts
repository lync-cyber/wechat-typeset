/**
 * 平台 adapter 注册表
 *
 * pipeline 渲染管线按 RenderInput.platform 查表派发 patch。
 * 默认 platform='wechat'——历史用法不带该字段时与 R10 之前行为一致。
 *
 * 新增平台流程：
 *   1. 在 platforms/<id>/ 下新建 patch.ts + index.ts（参考 zhihu/xhs 占位）
 *   2. 把 adapter 注册到本 PLATFORMS 表
 *   3. （可选）scripts/build-capabilities.ts 自动派生 capabilities.platforms[]
 *
 * 不暴露按 id 直查的内部 record—统一走 getPlatform()，未知 id 显式抛错而非
 * 静默回退，让调用方早失败（避免拼写错误造成"看似 wechat 实际跑 xhs identity"）。
 */

import type { PlatformAdapter } from './types'
import { wechatAdapter } from './wechat'
import { zhihuAdapter } from './zhihu'
import { xhsAdapter } from './xhs'

const ALL: readonly PlatformAdapter[] = [wechatAdapter, zhihuAdapter, xhsAdapter]

const BY_ID: Record<string, PlatformAdapter> = Object.fromEntries(
  ALL.map((a) => [a.id, a]),
)

export const DEFAULT_PLATFORM_ID = 'wechat'

/** 列出所有已注册 adapter（顺序稳定：wechat / zhihu / xhs / 后续）。 */
export function listPlatforms(): readonly PlatformAdapter[] {
  return ALL
}

/**
 * 按 id 取 adapter。未知 id 抛 Error——不要静默回退到 wechat，会掩盖配置错误。
 */
export function getPlatform(id: string): PlatformAdapter {
  const adapter = BY_ID[id]
  if (!adapter) {
    throw new Error(
      `Unknown platform id: "${id}". Known: ${ALL.map((a) => a.id).join(', ')}`,
    )
  }
  return adapter
}
