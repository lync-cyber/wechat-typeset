/**
 * 多篇草稿 CRUD 测试
 *
 * 覆盖：
 *  - create / list / read / update / delete / active id
 *  - export/import JSON 往返
 *  - deriveTitle 从首个非空行（或首个 # 标题）抽取
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  createDraft,
  deleteDraft,
  deriveTitle,
  exportDraftsJSON,
  getActiveDraftId,
  importDraftsJSON,
  listAllTags,
  listDrafts,
  readDraft,
  searchDrafts,
  updateDraft,
} from '../src/storage/drafts'

function resetStorage() {
  localStorage.clear()
}

beforeEach(() => resetStorage())
afterEach(() => resetStorage())

describe('deriveTitle', () => {
  it('优先用首个 # 标题，截断至 24 字', () => {
    expect(deriveTitle('# 今天是个好日子\n正文')).toBe('今天是个好日子')
    expect(deriveTitle('\n\n## 二级标题也行\n正文')).toBe('二级标题也行')
  })

  it('无标题时用首个非空行', () => {
    expect(deriveTitle('  \n\n 开场白 \n正文')).toBe('开场白')
    expect(deriveTitle('')).toBe('')
  })
})

describe('CRUD 基本流', () => {
  it('create → list 能读到；setActiveDraftId 生效', () => {
    const d = createDraft({ title: 'a', body: '# a' })
    expect(listDrafts().map((m) => m.id)).toContain(d.id)
    expect(getActiveDraftId()).toBe(d.id)
  })

  it('updateDraft 改 body 同时刷新 title（若未显式指定）', () => {
    const d = createDraft({ title: '旧', body: '旧正文' })
    updateDraft(d.id, { body: '# 新标题\n内容' })
    const reloaded = readDraft(d.id)
    expect(reloaded?.body).toBe('# 新标题\n内容')
    expect(reloaded?.title).toBe('新标题')
  })

  it('deleteDraft 把条目从索引和正文一起删', () => {
    const d = createDraft({ body: 'x' })
    deleteDraft(d.id)
    expect(listDrafts()).toHaveLength(0)
    expect(readDraft(d.id)).toBeNull()
    expect(getActiveDraftId()).toBeNull()
  })
})

describe('导出 / 导入 JSON 往返', () => {
  it('exportDraftsJSON 输出合法 JSON，importDraftsJSON 恢复条目', () => {
    const a = createDraft({ title: 'A', body: 'body-a' })
    const b = createDraft({ title: 'B', body: 'body-b' })
    const dump = exportDraftsJSON()
    resetStorage()
    expect(listDrafts()).toHaveLength(0)
    const added = importDraftsJSON(dump)
    expect(added).toBe(2)
    const ids = listDrafts().map((m) => m.id).sort()
    expect(ids).toEqual([a.id, b.id].sort())
    expect(readDraft(a.id)?.body).toBe('body-a')
    expect(readDraft(b.id)?.body).toBe('body-b')
  })

  it('非法 JSON 不抛错，返回 0', () => {
    expect(importDraftsJSON('not json')).toBe(0)
    expect(listDrafts()).toHaveLength(0)
  })
})

describe('tags · 持久化与往返', () => {
  it('createDraft 带 tags 后 listDrafts 能读到', () => {
    const d = createDraft({ title: 'A', body: 'body-a', tags: ['tech', 'vue'] })
    const read = listDrafts().find((m) => m.id === d.id)
    expect(read?.tags).toEqual(['tech', 'vue'])
  })

  it('updateDraft 可改 tags', () => {
    const d = createDraft({ title: 'A', body: 'x' })
    updateDraft(d.id, { tags: ['draft', '随笔'] })
    expect(readDraft(d.id)?.tags).toEqual(['draft', '随笔'])
  })

  it('export → import 保留 tags', () => {
    createDraft({ title: 'A', body: 'x', tags: ['a', 'b'] })
    const dump = exportDraftsJSON()
    localStorage.clear()
    importDraftsJSON(dump)
    expect(listDrafts()[0].tags).toEqual(['a', 'b'])
  })

  it('listAllTags 聚合去重（顺序按 localeCompare）', () => {
    createDraft({ title: '1', body: 'x', tags: ['vue', 'alpha'] })
    createDraft({ title: '2', body: 'x', tags: ['vue', 'beta'] })
    expect(listAllTags()).toEqual(['alpha', 'beta', 'vue'])
  })
})

describe('searchDrafts', () => {
  it('空查询返回全量', () => {
    createDraft({ title: 'A', body: 'x' })
    createDraft({ title: 'B', body: 'y' })
    expect(searchDrafts({}).length).toBe(2)
  })

  it('文本扫描命中正文', () => {
    const a = createDraft({ title: '标题一', body: '里面藏了 VueJS 关键词' })
    createDraft({ title: '标题二', body: '不相关内容' })
    const hits = searchDrafts({ query: 'vuejs' })
    expect(hits.map((h) => h.id)).toEqual([a.id])
  })

  it('文本扫描命中标题', () => {
    const a = createDraft({ title: 'Vue 新文章', body: 'x' })
    createDraft({ title: '随笔一则', body: 'y' })
    expect(searchDrafts({ query: 'vue' }).map((h) => h.id)).toEqual([a.id])
  })

  it('tag 精确过滤', () => {
    const a = createDraft({ title: 'A', body: 'x', tags: ['tech'] })
    createDraft({ title: 'B', body: 'x', tags: ['diary'] })
    expect(searchDrafts({ tags: ['tech'] }).map((h) => h.id)).toEqual([a.id])
  })

  it('query 中的 #xxx 作为 tag 过滤', () => {
    const a = createDraft({ title: 'A', body: 'vue content', tags: ['tech'] })
    createDraft({ title: 'B', body: 'vue content', tags: ['diary'] })
    const hits = searchDrafts({ query: '#tech vue' })
    expect(hits.map((h) => h.id)).toEqual([a.id])
  })

  it('多词 AND 语义', () => {
    const a = createDraft({ title: 'A', body: 'alpha beta gamma' })
    createDraft({ title: 'B', body: 'alpha only' })
    expect(searchDrafts({ query: 'alpha beta' }).map((h) => h.id)).toEqual([a.id])
  })

  it('tags 参数与 query#tag 叠加取交集', () => {
    createDraft({ title: 'A', body: 'x', tags: ['a'] })
    createDraft({ title: 'B', body: 'x', tags: ['a', 'b'] })
    const c = createDraft({ title: 'C', body: 'x', tags: ['a', 'b', 'c'] })
    const hits = searchDrafts({ query: '#a #b', tags: ['c'] })
    expect(hits.map((h) => h.id)).toEqual([c.id])
  })
})
