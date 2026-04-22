/**
 * 用户自创组件存储（localStorage）
 *
 * 模式：单 key JSON 数组（组件片段短，不像草稿正文会很大，无需拆 body key）。
 *   - key: 'wechat-typeset:user-components'
 *   - value: JSON.stringify(UserComponent[])
 *
 * 交互入口（在 ComponentPalette.vue）：
 *   - 用户选中编辑器一段 markdown → 打开"保存为组件"弹窗 → 填名称/描述 → save
 *   - 我的组件 tab 里点击 → 插入 markdownSnippet
 *   - 长按/右键 → 删除
 */

import type { UserComponent, ComponentKind } from '../components-lib/types'
import { escapeXml } from '../pipeline/containers/types'
import { genId as genKvId, safeReadJson, safeWriteJson } from './_kv'

const STORAGE_KEY = 'wechat-typeset:user-components'

const genId = () => genKvId('uc')

function readList(): UserComponent[] {
  const arr = safeReadJson<unknown>(STORAGE_KEY, [])
  if (!Array.isArray(arr)) return []
  // 旧数据（预 Wrap 版本）没有 source 字段——按位置补齐，避免读旧 localStorage 被过滤掉。
  return arr.filter(isUserComponent).map((uc) => ({ ...uc, source: 'user' as const }))
}

function writeList(list: UserComponent[]): void {
  safeWriteJson(STORAGE_KEY, list)
}

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

export function listUserComponents(): UserComponent[] {
  return [...readList()].sort((a, b) => b.createdAt - a.createdAt)
}

export interface CreateUserComponentInput {
  name: string
  description?: string
  kind?: ComponentKind
  variantId?: string
  markdownSnippet: string
  /** 缩略图；未提供则用"文字首字"占位（UI 层处理） */
  thumbnailSvg?: string
  sourceMarkdown?: string
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

export function updateUserComponent(
  id: string,
  patch: Partial<Pick<UserComponent, 'name' | 'description'>>,
): void {
  const list = readList()
  const idx = list.findIndex((c) => c.id === id)
  if (idx === -1) return
  list[idx] = {
    ...list[idx],
    name: patch.name ?? list[idx].name,
    description: patch.description ?? list[idx].description,
  }
  writeList(list)
}

export function exportUserComponentsJSON(): string {
  return JSON.stringify({ version: 1, components: readList() }, null, 2)
}

export function importUserComponentsJSON(json: string): number {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return 0
  }
  const arr =
    parsed && typeof parsed === 'object' && 'components' in parsed
      ? (parsed as { components: unknown }).components
      : parsed
  if (!Array.isArray(arr)) return 0
  const list = readList()
  let added = 0
  for (const raw of arr) {
    if (!isUserComponent(raw)) continue
    if (list.some((c) => c.id === raw.id)) continue
    list.push(raw)
    added += 1
  }
  writeList(list)
  return added
}

function defaultThumb(name: string): string {
  const ch = name.trim().charAt(0) || '组'
  return (
    '<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0" y="0" width="75" height="75" rx="6" fill="#eef1f6"/>' +
    `<text x="37.5" y="48" text-anchor="middle" font-size="32" font-weight="700" fill="#6a737d">${escapeXml(ch)}</text>` +
    '</svg>'
  )
}
