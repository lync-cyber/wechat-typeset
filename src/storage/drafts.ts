/**
 * 草稿存储 · 多篇 CRUD
 *
 * 存储策略：
 *   - 主索引 (wechat-typeset:drafts:index)：Draft 元数据列表（id / title / themeId / updatedAt），单条 localStorage
 *   - 每篇正文 (wechat-typeset:drafts:body:<id>)：独立 key，避免一条记录超 5MB 限制
 *   - 当前活跃 id (wechat-typeset:drafts:active)
 *
 * 用户数据迁移：若发现 0.1 以前的遗留 key wx-md:draft:single，
 * 会静默迁移为一篇"未命名草稿"后删除旧 key。
 */

import { genId as genKvId, safeRead, safeRemove, safeWrite } from './_kv'

const LEGACY_KEY = 'wx-md:draft:single'
const INDEX_KEY = 'wechat-typeset:drafts:index'
const ACTIVE_KEY = 'wechat-typeset:drafts:active'
const BODY_PREFIX = 'wechat-typeset:drafts:body:'

export interface DraftMeta {
  id: string
  title: string
  themeId: string
  updatedAt: number
  createdAt: number
  /** 可选的标签集合（如 '技术', '随笔'）；无标签时留空数组或省略 */
  tags?: string[]
}

export interface Draft extends DraftMeta {
  body: string
}

export interface SearchOptions {
  /** 自由文本，扫标题+正文+标签；为空则忽略 */
  query?: string
  /** 所有给定标签必须都命中；为空则忽略 */
  tags?: string[]
}

const genId = () => genKvId('d')

function readIndex(): DraftMeta[] {
  const raw = safeRead(INDEX_KEY)
  if (!raw) return []
  try {
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? (arr as DraftMeta[]) : []
  } catch {
    return []
  }
}

function writeIndex(list: DraftMeta[]): void {
  safeWrite(INDEX_KEY, JSON.stringify(list))
}

/** 懒迁移：发现老 single key 就转成一篇新草稿 */
function migrateLegacy(): void {
  const legacy = safeRead(LEGACY_KEY)
  if (legacy == null) return
  const index = readIndex()
  if (index.length > 0) {
    // 已经有新结构，老 key 留着不动——但标记为已迁移避免重复创建
    safeRemove(LEGACY_KEY)
    return
  }
  const id = genId()
  const now = Date.now()
  const meta: DraftMeta = {
    id,
    title: deriveTitle(legacy) || '未命名草稿',
    themeId: 'default',
    updatedAt: now,
    createdAt: now,
  }
  writeIndex([meta])
  safeWrite(`${BODY_PREFIX}${id}`, legacy)
  safeWrite(ACTIVE_KEY, id)
  safeRemove(LEGACY_KEY)
}

/** 从 md 里抽一行作为标题（第一个 # 或前 20 字） */
export function deriveTitle(md: string): string {
  const line = md
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.length > 0)
  if (!line) return ''
  const stripped = line.replace(/^#+\s*/, '').slice(0, 24)
  return stripped
}

export function listDrafts(): DraftMeta[] {
  migrateLegacy()
  const list = readIndex()
  return [...list].sort((a, b) => b.updatedAt - a.updatedAt)
}

export function getActiveDraftId(): string | null {
  migrateLegacy()
  return safeRead(ACTIVE_KEY)
}

export function setActiveDraftId(id: string | null): void {
  if (id) safeWrite(ACTIVE_KEY, id)
  else safeRemove(ACTIVE_KEY)
}

export function readDraft(id: string): Draft | null {
  const meta = readIndex().find((m) => m.id === id)
  if (!meta) return null
  const body = safeRead(`${BODY_PREFIX}${id}`) ?? ''
  return { ...meta, body }
}

export function createDraft(initial?: {
  title?: string
  themeId?: string
  body?: string
  tags?: string[]
}): Draft {
  migrateLegacy()
  const id = genId()
  const now = Date.now()
  const body = initial?.body ?? ''
  const tags = initial?.tags?.filter((t) => t.trim().length > 0)
  const meta: DraftMeta = {
    id,
    title: initial?.title || deriveTitle(body) || '未命名草稿',
    themeId: initial?.themeId ?? 'default',
    updatedAt: now,
    createdAt: now,
    ...(tags && tags.length ? { tags } : {}),
  }
  const list = readIndex()
  list.unshift(meta)
  writeIndex(list)
  safeWrite(`${BODY_PREFIX}${id}`, body)
  setActiveDraftId(id)
  return { ...meta, body }
}

export function updateDraft(id: string, patch: Partial<Omit<Draft, 'id' | 'createdAt'>>): void {
  const list = readIndex()
  const idx = list.findIndex((m) => m.id === id)
  if (idx === -1) return
  const now = Date.now()
  const prev = list[idx]
  const next: DraftMeta = {
    ...prev,
    title: patch.title ?? prev.title,
    themeId: patch.themeId ?? prev.themeId,
    tags: patch.tags ?? prev.tags,
    updatedAt: now,
  }
  list[idx] = next
  writeIndex(list)
  if (typeof patch.body === 'string') {
    safeWrite(`${BODY_PREFIX}${id}`, patch.body)
    // 未显式指定 title 时用正文第一行刷新
    if (!patch.title) {
      const fresh = deriveTitle(patch.body)
      if (fresh) {
        list[idx] = { ...next, title: fresh }
        writeIndex(list)
      }
    }
  }
}

/**
 * 全文搜索 —— 扫 title + body + tags。
 *
 * query 解析：
 *   - 空串或纯空白：不过滤文本
 *   - 含 `#xxx` 形式的 token：从 query 里抽为 tag 过滤，剩余片段仍做全文匹配
 *   - 其余：分词（按空白）后，每个词必须在 title/body/tags 的拼接串里出现
 *
 * 独立 tags 参数：作为显式过滤叠加在 query 解析出的 tags 之上（交集即可）。
 *
 * 为保持接口轻量，实现走"逐篇 read body"的朴素扫描——草稿数量级 ≤ 数百，
 * 搜索是交互级（用户敲一个字符触发），单次扫描成本可忽略。
 */
export function searchDrafts(opts: SearchOptions = {}): DraftMeta[] {
  const rawQuery = opts.query?.trim() ?? ''
  const tokens = rawQuery ? rawQuery.split(/\s+/) : []
  const tagsFromQuery = tokens.filter((t) => t.startsWith('#')).map((t) => t.slice(1).toLowerCase()).filter(Boolean)
  const textTokens = tokens.filter((t) => !t.startsWith('#')).map((t) => t.toLowerCase()).filter(Boolean)
  const explicitTags = (opts.tags ?? []).map((t) => t.toLowerCase()).filter(Boolean)
  const requiredTags = Array.from(new Set([...tagsFromQuery, ...explicitTags]))

  const all = listDrafts()
  return all.filter((m) => {
    if (requiredTags.length > 0) {
      const myTags = (m.tags ?? []).map((t) => t.toLowerCase())
      if (!requiredTags.every((t) => myTags.includes(t))) return false
    }
    if (textTokens.length === 0) return true
    // 读一次 body；tokens 全部命中才算命中
    const body = safeRead(`${BODY_PREFIX}${m.id}`) ?? ''
    const hay = `${m.title}\n${body}\n${(m.tags ?? []).join(' ')}`.toLowerCase()
    return textTokens.every((t) => hay.includes(t))
  })
}

/**
 * 所有草稿里出现过的标签集合（去重后字母序）。用于下拉建议或 tag 面板。
 */
export function listAllTags(): string[] {
  const set = new Set<string>()
  for (const m of readIndex()) {
    for (const t of m.tags ?? []) {
      const v = t.trim()
      if (v) set.add(v)
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

export function deleteDraft(id: string): void {
  const list = readIndex().filter((m) => m.id !== id)
  writeIndex(list)
  safeRemove(`${BODY_PREFIX}${id}`)
  if (getActiveDraftId() === id) {
    setActiveDraftId(list[0]?.id ?? null)
  }
}

export function exportDraftsJSON(): string {
  const list = readIndex()
  const full = list.map((m) => ({ ...m, body: safeRead(`${BODY_PREFIX}${m.id}`) ?? '' }))
  return JSON.stringify({ version: 1, drafts: full }, null, 2)
}

export interface ImportResult {
  added: number
  skipped: number
  invalid: number
}

/** 只返回导入成功条数；详细统计请用 importDraftsJSONDetailed。 */
export function importDraftsJSON(json: string): number {
  return importDraftsJSONDetailed(json).added
}

/**
 * 导入并返回细项统计：added（新增）/ skipped（id 冲突）/ invalid（类型不合法）。
 * 非法 JSON 整体返回 `{0,0,0}`。
 */
export function importDraftsJSONDetailed(json: string): ImportResult {
  const result: ImportResult = { added: 0, skipped: 0, invalid: 0 }
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return result
  }
  const arr = isRecord(parsed) && Array.isArray((parsed as { drafts?: unknown }).drafts)
    ? ((parsed as { drafts: unknown[] }).drafts)
    : []
  const list = readIndex()
  for (const raw of arr) {
    if (!isRecord(raw)) {
      result.invalid += 1
      continue
    }
    const id = typeof raw.id === 'string' && raw.id.length > 0 ? raw.id : null
    if (!id) {
      result.invalid += 1
      continue
    }
    if (list.some((m) => m.id === id)) {
      result.skipped += 1
      continue
    }
    const body = typeof raw.body === 'string' ? raw.body : ''
    const title = typeof raw.title === 'string' && raw.title ? raw.title : deriveTitle(body) || '未命名草稿'
    const themeId = typeof raw.themeId === 'string' && raw.themeId ? raw.themeId : 'default'
    const updatedAt = typeof raw.updatedAt === 'number' ? raw.updatedAt : Date.now()
    const createdAt = typeof raw.createdAt === 'number' ? raw.createdAt : Date.now()
    const tags = Array.isArray(raw.tags)
      ? raw.tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
      : undefined
    list.push({ id, title, themeId, updatedAt, createdAt, ...(tags && tags.length ? { tags } : {}) })
    safeWrite(`${BODY_PREFIX}${id}`, body)
    result.added += 1
  }
  writeIndex(list)
  return result
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}
