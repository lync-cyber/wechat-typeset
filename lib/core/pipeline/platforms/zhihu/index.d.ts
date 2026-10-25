/**
 * 知乎平台 adapter（占位）
 *
 * status='placeholder'：UI 暂不暴露 select，避免诱导作者走 no-op 流程。
 * fork / 社区 PR 补完 patch.ts 后，将 status 升为 'beta' / 'stable' 即可开启 UI。
 */
import { applyZhihuPatches } from './patch';
import type { PlatformAdapter } from '../types';
export declare const zhihuAdapter: PlatformAdapter;
export { applyZhihuPatches };
export type { ZhihuPatchOptions } from './patch';
