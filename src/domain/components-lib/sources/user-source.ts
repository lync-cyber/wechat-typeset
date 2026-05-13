/**
 * User 组件源 —— 非响应式同步读 user list 的薄包装。
 *
 * 为什么不把这层直接合进 useUserComponents.ts：useUserComponents 走 Vue ref / computed,
 * 只能在 setup 上下文消费；aggregator / 测试 / Node 脚本需要一次性同步读，与 Vue 无关。
 * 本文件提供"无副作用 snapshot"的纯函数入口。
 */

import { listUserComponents } from '../../../infra/storage/userComponents'
import type { UserComponent } from '../types'

/**
 * 同步快照——读当前 localStorage 里的 user list,不订阅变化。
 * Vue 响应式入口仍是 useUserComponents()。
 */
export function listUserEntries(): UserComponent[] {
  return listUserComponents()
}
