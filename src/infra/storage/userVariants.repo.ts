/**
 * 用户态变体 Repo —— 纯 localStorage CRUD，零业务逻辑。
 *
 * 模式：单 key JSON 数组（与 userComponents.repo 同形）。
 *   - key: 'wechat-typeset:user-variants'
 *   - value: JSON.stringify(UserVariant[])
 *
 * 设计纪律（与 userComponents 对齐）：
 *   - 不做 schema 校验（CSS / template lint 由调用方在保存期跑 lintInlineCSS 等）
 *   - 不做 transfer（exportJSON / importJSON 归 userVariants.transfer.ts）
 *   - 不持有展示资产（缩略图由步骤 4-5 的 UI 层各自管）
 *
 * 写入失败语义沿用 _kv.safeWriteJson：返回 false，console.warn，不抛错。
 * 调用方（mutations 层 / UI Save 按钮）按需向用户反馈"存储已满"。
 */

import type { UserVariant, UserVariantLevel } from '../../core/variants/userVariant'
import { genId as genKvId, safeReadJson, safeWriteJson } from './_kv'

const STORAGE_KEY = 'wechat-typeset:user-variants'

const genId = (): string => genKvId('uv')

const VALID_LEVELS: ReadonlySet<UserVariantLevel> = new Set(['tokens', 'patch', 'custom'])

/**
 * 类型守卫：从 localStorage 读出来的 unknown[] 过出真正的 UserVariant。
 * 每档单独校验自己的必备字段，少一个就丢弃整条——比"补默认值"更安全，
 * 因为旧格式与新格式混在一起时，补默认会把脏数据洗成"看似合法"的脏数据。
 */
function isUserVariant(v: unknown): v is UserVariant {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  if (typeof o.id !== 'string' || !o.id) return false
  if (typeof o.name !== 'string') return false
  if (typeof o.createdAt !== 'number' || typeof o.updatedAt !== 'number') return false
  if (typeof o.level !== 'string' || !VALID_LEVELS.has(o.level as UserVariantLevel)) return false

  if (o.level === 'custom') {
    if (o.base !== null) return false
    if (typeof o.template !== 'string') return false
    if (!o.css || typeof o.css !== 'object') return false
    if (typeof (o.css as Record<string, unknown>).wrapperCSS !== 'string') return false
    return true
  }

  // tokens / patch：base 必须是 { kind, variantId } 对
  const b = o.base as Record<string, unknown> | null
  if (!b || typeof b !== 'object') return false
  if (typeof b.kind !== 'string' || typeof b.variantId !== 'string') return false

  if (o.level === 'tokens') {
    return !!o.tokens && typeof o.tokens === 'object'
  }
  if (o.level === 'patch') {
    return !!o.cssPatch && typeof o.cssPatch === 'object'
  }
  return false
}

/**
 * 读列表的原始访问点。
 * 非数组 / parse 失败 / 单条不合法都被过滤掉——调用方拿到的永远是合法 UserVariant[]。
 *
 * 导出而非保持私有：transfer 层 import 时复用同一份过滤逻辑。
 */
export function readList(): UserVariant[] {
  const arr = safeReadJson<unknown>(STORAGE_KEY, [])
  if (!Array.isArray(arr)) return []
  return arr.filter(isUserVariant)
}

/**
 * 写列表的原始访问点。返回值同 safeWriteJson（false = quota / stringify 失败）。
 * 暴露给 transfer 层做 import 落盘。
 */
export function writeList(list: UserVariant[]): boolean {
  return safeWriteJson(STORAGE_KEY, list)
}

/** 列表读：按 updatedAt 降序，最近改的排前面（编辑场景比创建顺序更有用）。 */
export function listUserVariants(): UserVariant[] {
  return [...readList()].sort((a, b) => b.updatedAt - a.updatedAt)
}

/** 按 id 单条查询。未命中返回 undefined。 */
export function getUserVariant(id: string): UserVariant | undefined {
  return readList().find((v) => v.id === id)
}

/**
 * 分布式 Omit —— `Omit<DiscriminatedUnion, K>` 在 TS 里会塌成"各分支公共字段并集"，
 * 把 level-specific 的 tokens / cssPatch / template / css 字段丢掉；条件类型 `T extends any`
 * 触发分布式语义，让 Omit 在每个分支上单独走一次，保留判别联合。
 */
type DistributedOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never

export type CreateUserVariantInput = DistributedOmit<
  UserVariant,
  'id' | 'createdAt' | 'updatedAt'
>

/**
 * 创建一条 UserVariant 并落盘。id / 时间戳由仓生成。
 *
 * 返回完整记录；如果写盘失败（quota 满），仍返回组装好的 record（让 UI 拿去显示），
 * 但调用方需要查 listUserVariants 确认是否真落地——这与 userComponents 行为一致。
 */
export function createUserVariant(input: CreateUserVariantInput): UserVariant {
  const now = Date.now()
  // 显式按 level 重建对象，避免 input 里夹带 id/createdAt 等被 Omit 排除的字段
  // 通过 spread 漏进来（即便类型层禁了，运行时输入仍可能脏）。
  const record = {
    ...input,
    id: genId(),
    createdAt: now,
    updatedAt: now,
  } as UserVariant
  const list = readList()
  list.unshift(record)
  writeList(list)
  return record
}

/**
 * 可修改字段白名单。
 *   - id / createdAt：不可变
 *   - level / base：换 level 等于换品种，应该走 delete + create 而非 patch
 *   - updatedAt：仓自己写
 * 其余按 level 各自的内容字段：tokens / cssPatch / template / css。
 *
 * 传入与当前 level 不匹配的字段（如对 'patch' 记录传 tokens）会被静默忽略。
 */
export interface UpdateUserVariantPatch {
  name?: string
  description?: string
  tokens?: Record<string, string>
  cssPatch?: Partial<Record<'wrapperCSS' | 'titleCSS' | 'bodyCSS', string>>
  template?: string
  css?: {
    wrapperCSS?: string
    titleCSS?: string
    bodyCSS?: string
    svgSlot?: string
  }
}

export function updateUserVariant(
  id: string,
  patch: UpdateUserVariantPatch,
): UserVariant | undefined {
  const list = readList()
  const idx = list.findIndex((v) => v.id === id)
  if (idx === -1) return undefined
  const cur = list[idx]
  const next = applyPatch(cur, patch)
  list[idx] = next
  writeList(list)
  return next
}

/**
 * 按 level 分派合并，确保结果仍是合法的 UserVariant 联合分支
 * （TS 联合 spread 会塌成 any-ish，手写分派让类型保真）。
 */
function applyPatch(cur: UserVariant, patch: UpdateUserVariantPatch): UserVariant {
  const baseFields = {
    name: patch.name ?? cur.name,
    description: patch.description ?? cur.description,
    updatedAt: Date.now(),
  }
  if (cur.level === 'tokens') {
    return {
      ...cur,
      ...baseFields,
      tokens: patch.tokens ?? cur.tokens,
    }
  }
  if (cur.level === 'patch') {
    return {
      ...cur,
      ...baseFields,
      cssPatch: patch.cssPatch ?? cur.cssPatch,
    }
  }
  // custom
  return {
    ...cur,
    ...baseFields,
    template: patch.template ?? cur.template,
    css: patch.css
      ? {
          wrapperCSS: patch.css.wrapperCSS ?? cur.css.wrapperCSS,
          titleCSS: patch.css.titleCSS ?? cur.css.titleCSS,
          bodyCSS: patch.css.bodyCSS ?? cur.css.bodyCSS,
          svgSlot: patch.css.svgSlot ?? cur.css.svgSlot,
        }
      : cur.css,
  }
}

/** 删除一条；命中返回 true，未命中返回 false。 */
export function deleteUserVariant(id: string): boolean {
  const list = readList()
  const next = list.filter((v) => v.id !== id)
  if (next.length === list.length) return false
  writeList(next)
  return true
}
