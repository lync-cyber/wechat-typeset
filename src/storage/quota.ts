/**
 * 存储配额工具 —— 为草稿抽屉脚注和空间告警提供共享接口。
 *
 * 优先使用 `navigator.storage.estimate()`（Chrome/Safari/Firefox 都有实现，
 * 返回整个 origin 的聚合配额，单位 bytes）；不可用时回退到 localStorage
 * 近似值（把 wechat-typeset:* key 的 UTF-16 字符数 × 2 当 bytes，上限 5MB）。
 *
 * 设计原则：
 *   - 永不抛错；接口默认返回 { supported: false, … } 让调用方顺利降级
 *   - 阈值 80% 写在模块里，而不是每个调用点重复
 */

export const QUOTA_WARN_THRESHOLD = 0.8

export interface StorageStat {
  /** true 时 used/quota 来自 `navigator.storage.estimate()`；false 时是 LS 估算 */
  supported: boolean
  used: number
  quota: number
  /** 0..1 */
  pct: number
  /** pct >= QUOTA_WARN_THRESHOLD */
  warn: boolean
}

const LS_ESTIMATED_QUOTA = 5 * 1024 * 1024

export async function getStorageStat(): Promise<StorageStat> {
  try {
    if (
      typeof navigator !== 'undefined' &&
      navigator.storage &&
      typeof navigator.storage.estimate === 'function'
    ) {
      const { usage = 0, quota = 0 } = await navigator.storage.estimate()
      if (quota > 0) {
        const pct = usage / quota
        return {
          supported: true,
          used: usage,
          quota,
          pct,
          warn: pct >= QUOTA_WARN_THRESHOLD,
        }
      }
    }
  } catch {
    // 降级到 LS 估算
  }
  return fallbackLsStat()
}

/** 把字节数格式化为 `12.3 KB` / `4.5 MB`；不带负号，不做 BiByte 区分 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function fallbackLsStat(): StorageStat {
  let used = 0
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k || !k.startsWith('wechat-typeset:')) continue
      const v = localStorage.getItem(k) ?? ''
      used += (k.length + v.length) * 2
    }
  } catch {
    used = 0
  }
  const pct = used / LS_ESTIMATED_QUOTA
  return {
    supported: false,
    used,
    quota: LS_ESTIMATED_QUOTA,
    pct,
    warn: pct >= QUOTA_WARN_THRESHOLD,
  }
}
