/**
 * localStorage 共享小工具。规则：
 *   - 所有读写都包 try/catch：SSR、隐私模式、配额超限都不抛
 *   - genId 的 prefix 形如 `d` / `uc`，输出 `<prefix>_<time36>_<rnd6>` 字符串
 *   - safeWrite / safeWriteJson 返回 boolean：true=成功，false=失败（quota / 隐私模式 /
 *     stringify 错），让 hot path（updateDraft / flushDraftSave）能向 UI 上抛
 *     "写盘失败 · 存储已满"。旧调用方忽略返回值不影响行为。
 */

export function safeRead(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeWrite(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (err) {
    // QuotaExceededError / 隐私模式 / SSR：返回 false 让上层做用户可见反馈
    // eslint-disable-next-line no-console
    console.warn(`[storage] safeWrite failed: ${key}`, err)
    return false
  }
}

export function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore——删除失败几乎只在 SSR 触发，无需上抛
  }
}

/**
 * 读 JSON：localStorage 空 / parse 失败 / 类型不符 都返回 fallback。
 * 不做 schema 校验——调用方如果需要 filter 非法项（比如 userComponents），在返回值上再走一次即可。
 */
export function safeReadJson<T>(key: string, fallback: T): T {
  const raw = safeRead(key)
  if (raw == null) return fallback
  try {
    const parsed = JSON.parse(raw)
    return parsed as T
  } catch {
    return fallback
  }
}

/**
 * 写 JSON：返回 true=成功，false=stringify 失败 / setItem 失败。
 * stringify 失败（循环引用等）极少，但与 quota 失败一同 warn + 返回 false，让 UI 走同一个错误路径。
 */
export function safeWriteJson<T>(key: string, value: T): boolean {
  let serialized: string
  try {
    serialized = JSON.stringify(value)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[storage] safeWriteJson stringify failed: ${key}`, err)
    return false
  }
  return safeWrite(key, serialized)
}

/**
 * 单调递增的随机 id。格式 `<prefix>_<base36 timestamp>_<6位 base36 随机>`，
 * 如 `d_mhxk28a_ab12cd`。prefix 决定读 localStorage 时一眼能区分是草稿还是组件。
 */
export function genId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
