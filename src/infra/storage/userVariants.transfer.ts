/**
 * 用户态变体 JSON 导入 / 导出。
 *
 * 与 repo 解耦：transfer 仅依赖 readList / writeList，不重复处理 createdAt / 默认值
 * 等业务字段——repo 的 isUserVariant 守卫在 readList 路径上已经过滤了脏数据，
 * import 走 readList → push → writeList 即可享受同一份守卫。
 *
 * 文件格式 v1：
 *   { "version": 1, "userVariants": UserVariant[] }
 *
 * 导入策略：
 *   - id 冲突跳过（保留现有，不覆盖）—— 避免 import 误覆盖用户当前变体
 *   - 缺 version 字段时也接受裸数组，让"手搓 JSON"场景能用
 *   - 非数组 / 解析失败 / 单条不合法 → 跳过
 *   - 返回成功 import 的条数
 */

import type { UserVariant } from '../../core/variants/userVariant'
import { readList, writeList } from './userVariants.repo'

const FILE_VERSION = 1

/** 与 repo.isUserVariant 同形，本地化避免循环依赖（repo 不需要导出守卫给外部用）。 */
function isUserVariant(v: unknown): v is UserVariant {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  if (typeof o.id !== 'string' || !o.id) return false
  if (typeof o.name !== 'string') return false
  if (typeof o.createdAt !== 'number' || typeof o.updatedAt !== 'number') return false
  if (o.level === 'custom') {
    return (
      o.base === null &&
      typeof o.template === 'string' &&
      !!o.css &&
      typeof o.css === 'object' &&
      typeof (o.css as Record<string, unknown>).wrapperCSS === 'string'
    )
  }
  const b = o.base as Record<string, unknown> | null
  if (!b || typeof b !== 'object') return false
  if (typeof b.kind !== 'string' || typeof b.variantId !== 'string') return false
  if (o.level === 'tokens') return !!o.tokens && typeof o.tokens === 'object'
  if (o.level === 'patch') return !!o.cssPatch && typeof o.cssPatch === 'object'
  return false
}

export function exportUserVariantsJSON(): string {
  return JSON.stringify({ version: FILE_VERSION, userVariants: readList() }, null, 2)
}

export function importUserVariantsJSON(json: string): number {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return 0
  }
  const arr =
    parsed && typeof parsed === 'object' && 'userVariants' in parsed
      ? (parsed as { userVariants: unknown }).userVariants
      : parsed
  if (!Array.isArray(arr)) return 0
  const list = readList()
  let added = 0
  for (const raw of arr) {
    if (!isUserVariant(raw)) continue
    if (list.some((v) => v.id === raw.id)) continue
    list.push(raw)
    added += 1
  }
  writeList(list)
  return added
}
