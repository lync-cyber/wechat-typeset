/**
 * localStorage 共享小工具 —— drafts.ts 和 userComponents.ts 原来各持一份同名
 * safeRead / safeWrite / safeRemove / genId，抽到这里统一。
 *
 * 规则：
 *   - 所有读写都包 try/catch：SSR、隐私模式、配额超限都不抛
 *   - genId 的 prefix 形如 `d` / `uc`，输出 `<prefix>_<time36>_<rnd6>` 字符串
 *   - 不做 schema 校验；调用方按自己的结构 JSON.parse / stringify
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
 * 单调递增的随机 id。格式 `<prefix>_<base36 timestamp>_<6位 base36 随机>`，
 * 如 `d_mhxk28a_ab12cd`。prefix 决定读 localStorage 时一眼能区分是草稿还是组件。
 */
export function genId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
