/**
 * useDraftManager —— 草稿 CRUD + 配额查询的 domain 层 composable。把 storage
 * 调用包成响应式接口：mutate 后自动触发 `tick` 让派生 computed 重算；UI 层不
 * 关心"刷新时机"。
 *
 * 接口设计偏厚（list / search / known-tags / storage-stat / export / import）：
 * 草稿列表只有 DraftDrawer 一个消费者；一处接口收口比 6 个文件各自 import 14 个
 * 函数更易演化（未来要加"按 themeId 过滤"或"分页"只改这里）。`refresh()` 显式
 * 暴露——供 useDraftLifecycle 的"save 完通知 UI"路径走，避免 watch deep 在
 * localStorage 上的 hacky 做法。
 */
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import {
  createDraft as storageCreateDraft,
  deleteDraft as storageDeleteDraft,
  exportDraftsJSON,
  importDraftsJSONDetailed,
  listAllTags,
  listDrafts,
  readDraft,
  searchDrafts,
  updateDraft as storageUpdateDraft,
  type Draft,
  type DraftMeta,
  type SearchOptions,
} from '../../infra/storage/drafts'
import {
  formatBytes,
  getStorageStat,
  type StorageStat,
} from '../../infra/storage/quota'

export interface UseDraftManager {
  /** 全量草稿列表（按 storage 内部排序）；任意 mutate 后自动 reactive 触发 */
  drafts: ComputedRef<DraftMeta[]>
  /** 已使用的所有 tag */
  knownTags: ComputedRef<string[]>
  /** 异步加载的 storage 配额状态（onMounted 自动取一次；mutate 后会重取） */
  storageStat: Ref<StorageStat>
  /** 进度条专用：0..100 整数百分比 */
  storagePct: ComputedRef<number>

  search(opts: SearchOptions): DraftMeta[]
  read(id: string): Draft | null

  create(input: { title?: string; body: string; themeId?: string }): DraftMeta
  update(id: string, patch: Partial<Omit<Draft, 'id' | 'createdAt'>>): void
  remove(id: string): void

  exportJSON(): string
  importJSON(text: string): { added: number; skipped: number; invalid: number }

  /** 手动触发刷新——给 useDraftLifecycle / 其他外部 mutate 路径用 */
  refresh(): void

  formatBytes: typeof formatBytes
}

export function useDraftManager(): UseDraftManager {
  const tick = ref(0)
  const storageStat = ref<StorageStat>({
    supported: false,
    used: 0,
    quota: 5 * 1024 * 1024,
    pct: 0,
    warn: false,
  })

  function bump() {
    tick.value += 1
    void refreshStat()
  }

  async function refreshStat() {
    storageStat.value = await getStorageStat()
  }

  onMounted(() => {
    void refreshStat()
  })

  return {
    drafts: computed(() => {
      void tick.value
      return listDrafts()
    }),
    knownTags: computed(() => {
      void tick.value
      return listAllTags()
    }),
    storageStat,
    storagePct: computed(() => Math.min(100, Math.round(storageStat.value.pct * 100))),

    search(opts) {
      void tick.value
      return searchDrafts(opts)
    },
    read: readDraft,

    create(input) {
      const created = storageCreateDraft(input)
      bump()
      return created
    },
    update(id, patch) {
      storageUpdateDraft(id, patch)
      bump()
    },
    remove(id) {
      storageDeleteDraft(id)
      bump()
    },

    exportJSON: exportDraftsJSON,
    importJSON(text) {
      const r = importDraftsJSONDetailed(text)
      bump()
      return r
    },

    refresh: bump,

    formatBytes,
  }
}
