/**
 * 向后兼容 shim —— 见 ./index.ts
 *
 * tests/unit/inspect.spec.ts 直接 import 此路径，本 re-export 让测试无需改动路径。
 */

export { inspectPatchTargets } from '../platforms/wechat/inspect'
export type { PatchLog, PatchLogEntry } from '../platforms/wechat/inspect'
