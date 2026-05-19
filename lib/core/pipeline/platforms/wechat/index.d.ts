/**
 * wechat 平台 adapter：把 applyWxPatches / inspectPatchTargets 包成 PlatformAdapter
 * 供 registry 统一派发；同时直接 export，pipeline / public API / 测试从此 import。
 */
import { applyWxPatches } from './patch';
import { inspectPatchTargets } from './inspect';
import type { PlatformAdapter } from '../types';
export declare const wechatAdapter: PlatformAdapter;
export { applyWxPatches, inspectPatchTargets };
export type { WxPatchOptions } from './patch';
export type { PatchLog, PatchLogEntry } from './inspect';
export { patchListWrap, stripForbiddenAttrs, stripForbiddenTags, stripFontFamily, patchSvgUrlQuotes, patchSvgIds, patchFlexToFallback, patchSvgWhiteBg, } from './patch';
