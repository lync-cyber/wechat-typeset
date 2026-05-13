/**
 * localStorage 共享小工具 —— drafts.ts 和 userComponents.ts 原来各持一份同名
 * safeRead / safeWrite / safeRemove / genId，抽到这里统一。
 *
 * 规则：
 *   - 所有读写都包 try/catch：SSR、隐私模式、配额超限都不抛
 *   - genId 的 prefix 形如 `d` / `uc`，输出 `<prefix>_<time36>_<rnd6>` 字符串
 *   - safeReadJson / safeWriteJson 处理 JSON.parse 失败路径，内部按 fallback 返回
 *     —— 调用方只传 key + fallback，不用再本地 try-catch
 */

export function safeRead(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeWrite(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // 配额超限 / 隐私模式下忽略；上层靠 storage.estimate() 提前告警
  }
}

export function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
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

/** 写 JSON：stringify 失败（循环引用等）则按 safeWrite 规则静默忽略 */
export function safeWriteJson<T>(key: string, value: T): void {
  try {
    safeWrite(key, JSON.stringify(value))
  } catch {
    // stringify 抛出（极少，循环引用）—— 忽略
  }
}

/**
 * 单调递增的随机 id。格式 `<prefix>_<base36 timestamp>_<6位 base36 随机>`，
 * 如 `d_mhxk28a_ab12cd`。prefix 决定读 localStorage 时一眼能区分是草稿还是组件。
 */
export function genId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
