/**
 * 极简 LRU 缓存 —— 用于 pipeline 内热点对象（MarkdownIt 实例、themeCSS 字符串等）。
 *
 * 实现：基于 Map 迭代序 = 插入序的 spec 保证。get 命中时把 entry 删除后重新 set
 * 到末尾，触发"刷新到最近使用"。set 满时淘汰 keys().next().value（最老）。
 *
 * 不引入 lru-cache 依赖：这里的容量都是个位数（8~12），TTL / weighed size 都不需要；
 * 引入会让 R12 移植到 lib-only build 时多带一份打包成本。
 */
export interface LRU<K, V> {
  get(key: K): V | undefined
  set(key: K, value: V): void
  has(key: K): boolean
  delete(key: K): boolean
  clear(): void
  readonly size: number
}

export function createLRU<K, V>(max: number): LRU<K, V> {
  if (max <= 0) throw new Error('[lru] max must be > 0')
  const map = new Map<K, V>()
  return {
    get(key) {
      const v = map.get(key)
      if (v === undefined && !map.has(key)) return undefined
      // 已存在则刷新到尾部
      map.delete(key)
      map.set(key, v as V)
      return v
    },
    set(key, value) {
      if (map.has(key)) map.delete(key)
      map.set(key, value)
      if (map.size > max) {
        const oldest = map.keys().next().value
        if (oldest !== undefined) map.delete(oldest)
      }
    },
    has(key) {
      return map.has(key)
    },
    delete(key) {
      return map.delete(key)
    },
    clear() {
      map.clear()
    },
    get size() {
      return map.size
    },
  }
}
