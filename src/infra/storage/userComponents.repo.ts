/**
 * 用户自创组件 Repo —— 纯 localStorage CRUD，零业务逻辑。
 *
 * 模式：单 key JSON 数组（组件片段短，不像草稿正文会很大，无需拆 body key）。
 *   - key: 'wechat-typeset:user-components'
 *   - value: JSON.stringify(UserComponent[])
 *
 * 设计纪律：
 *   - 不做 markdown 校验（那是 domain/components-lib/mutations.ts 的职责）
 *   - 不做 transfer（exportJSON / importJSON 归 userComponents.transfer.ts）
 *   - 不持有展示资产（defaultThumb 归 userComponents.defaults.ts）
 *
 * 调用方：
 *   - domain/components-lib/mutations.ts：包装 create/update + validate
 *   - domain/components-lib/sources/user-source.ts：同步读快照
 *   - tests：可绕过 mutations 直接构造测试 fixture
 */

import type { UserComponent, ComponentKind } from '../../domain/components-lib/types'
import { genId as genKvId, safeReadJson, safeWriteJson } from './_kv'
import { defaultThumb } from './userComponents.defaults'

const STORAGE_KEY = 'wechat-typeset:user-components'

const genId = () => genKvId('uc')

function isUserComponent(v: unknown): v is UserComponent {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.markdownSnippet === 'string' &&
    typeof o.thumbnailSvg === 'string'
  )
}

/**
 * 读列表的原始访问点。
 * 旧数据（pre-source 字段版本）缺 source 字段——按位置补齐 'user'，避免读旧数据被过滤掉。
 *
 * 导出而非保持私有：transfer 层 import 时复用同一份过滤 + 兜底逻辑，避免重复 isUserComponent 判定。
 */
export function readList(): UserComponent[] {
  const arr = safeReadJson<unknown>(STORAGE_KEY, [])
  if (!Array.isArray(arr)) return []
  return arr.filter(isUserComponent).map((uc) => ({ ...uc, source: 'user' as const }))
}

/** 写列表的原始访问点（transfer 层 importUserComponentsJSON 也走这个）。 */
export function writeList(list: UserComponent[]): void {
  safeWriteJson(STORAGE_KEY, list)
}

/** 列表读：按 createdAt 降序，最新创建的排前面。 */
export function listUserComponents(): UserComponent[] {
  return [...readList()].sort((a, b) => b.createdAt - a.createdAt)
}

/** 按 id 单条查询。未命中返回 undefined。 */
export function getUserComponent(id: string): UserComponent | undefined {
  return readList().find((c) => c.id === id)
}

export interface CreateUserComponentInput {
  name: string
  description?: string
  kind?: ComponentKind
  variantId?: string
  markdownSnippet: string
  /** 缩略图；未提供则用"文字首字"占位（defaults.ts） */
  thumbnailSvg?: string
  sourceMarkdown?: string
  /** 关联 UserVariant id（含 token 覆盖时由 Studio 写入），详见 UserComponent.linkedUserVariantId */
  linkedUserVariantId?: string
}

export function createUserComponent(input: CreateUserComponentInput): UserComponent {
  const list = readList()
  const uc: UserComponent = {
    source: 'user',
    id: genId(),
    name: input.name.trim() || '未命名组件',
    description: input.description?.trim() ?? '',
    kind: input.kind ?? 'none',
    variantId: input.variantId,
    markdownSnippet: input.markdownSnippet,
    thumbnailSvg: input.thumbnailSvg ?? defaultThumb(input.name),
    sourceMarkdown: input.sourceMarkdown,
    linkedUserVariantId: input.linkedUserVariantId,
    createdAt: Date.now(),
  }
  list.unshift(uc)
  writeList(list)
  return uc
}

export function deleteUserComponent(id: string): void {
  const list = readList().filter((c) => c.id !== id)
  writeList(list)
}

/**
 * patch 字段说明：
 *   - name / description / markdownSnippet / thumbnailSvg：undefined = 不改
 *   - linkedUserVariantId：undefined = 不改；null = 清空（解除与 UserVariant 的关联）
 *     null 是显式信号，区分"不改"与"清空"。
 */
export interface UpdateUserComponentPatch {
  name?: string
  description?: string
  markdownSnippet?: string
  thumbnailSvg?: string
  linkedUserVariantId?: string | null
}

export function updateUserComponent(
  id: string,
  patch: UpdateUserComponentPatch,
): UserComponent | undefined {
  const list = readList()
  const idx = list.findIndex((c) => c.id === id)
  if (idx === -1) return undefined
  const cur = list[idx]
  list[idx] = {
    ...cur,
    name: patch.name ?? cur.name,
    description: patch.description ?? cur.description,
    markdownSnippet: patch.markdownSnippet ?? cur.markdownSnippet,
    thumbnailSvg: patch.thumbnailSvg ?? cur.thumbnailSvg,
    linkedUserVariantId:
      patch.linkedUserVariantId === undefined
        ? cur.linkedUserVariantId
        : patch.linkedUserVariantId ?? undefined,
  }
  writeList(list)
  return list[idx]
}
