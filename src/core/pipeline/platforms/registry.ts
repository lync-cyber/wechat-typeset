/**
 * 平台 adapter 注册表。pipeline 按 RenderInput.platform 查表派发 patch；
 * 默认 platform='wechat'。
 *
 * 新增平台：
 *   1. 在 platforms/<id>/ 下新建 patch.ts + index.ts（参考 zhihu/xhs 占位）
 *   2. 把 adapter 注册到本表
 *   3. （可选）scripts/build-capabilities.ts 自动派生 capabilities.platforms[]
 *
 * 未知 id 显式抛错而非静默回退，避免拼写错误造成"看似 wechat 实际跑 xhs identity"。
 */

import type { PlatformAdapter } from './types'
import { wechatAdapter } from './wechat'
import { zhihuAdapter } from './zhihu'
import { xhsAdapter } from './xhs'
import { fail } from '../../errors'

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
 * 按 id 取 adapter。未知 id 抛 `WtException(PLATFORM_UNSUPPORTED)`——不静默回退，
 * 避免拼写错误造成"看似 wechat 实际跑 xhs identity"。
 */
export function getPlatform(id: string): PlatformAdapter {
  const adapter = BY_ID[id]
  if (!adapter) {
    fail('PLATFORM_UNSUPPORTED', `Unknown platform id: "${id}"`, {
      hint: `Known: ${ALL.map((a) => a.id).join(', ')}`,
    })
  }
  return adapter
}
