/**
 * useFilteredList —— "搜索框 + 列表过滤"通用组合：
 *   - query：reactive ref（双向绑定到 SearchBox）
 *   - filtered：computed，自动随 query / source 变化
 *   - 调用方提供 predicate：(item, lowercasedQuery) => boolean
 *
 * 不做的事（保持小而美）：
 *   - 不内建高亮匹配片段——调用方拿 filtered 后自己渲染
 *   - 不内建排序——调用方按需 sort（如 searchDrafts 按 mtime）
 *   - 不内建 debounce——这些列表百到千量级前端 filter 同步即可
 */

import { computed, ref, type ComputedRef, type Ref } from 'vue'

export interface UseFilteredListOptions<T> {
  /** 源数据；可以是 ref / computed，也可以是直接传入的 ReadonlyArray（写死场景）。 */
  source: Ref<readonly T[]> | ComputedRef<readonly T[]> | (() => readonly T[])
  /**
   * 匹配谓词。query 已经 trim().toLowerCase()，空串走 short-circuit（直接返回全集，
   * 不调用 predicate），所以 predicate 不需要再判空。
   */
  predicate: (item: T, query: string) => boolean
}

export interface UseFilteredListReturn<T> {
  query: Ref<string>
  filtered: ComputedRef<readonly T[]>
  /** 便捷重置 query 到空串；常给"清除"按钮挂载。 */
  clear: () => void
}

export function useFilteredList<T>(opts: UseFilteredListOptions<T>): UseFilteredListReturn<T> {
  const query = ref('')

  const filtered = computed<readonly T[]>(() => {
    const src =
      typeof opts.source === 'function'
        ? opts.source()
        : opts.source.value
    const q = query.value.trim().toLowerCase()
    if (!q) return src
    return src.filter((item) => opts.predicate(item, q))
  })

  function clear() {
    query.value = ''
  }

  return { query, filtered, clear }
}
