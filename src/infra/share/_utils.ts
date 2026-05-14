/**
 * share/* 内部小工具，避免 payloads 各文件复制粘贴。
 *
 * 仅 share 子树消费——名字带下划线前缀以示模块私有，外部模块请走 codec.ts 的公开导出。
 */

/**
 * 判 raw 是否为 plain object（非 null、非数组、非 primitive）。
 *
 * payload validate 的统一入口：line-1 调用 isRecord 失败即拒，
 * 后续 raw.field 才能在 TS 上窄到 unknown 而非 any。
 */
export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}
