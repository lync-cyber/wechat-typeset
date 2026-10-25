/**
 * Variant 实证采用率分析（纯函数）。
 *
 * 边界：本文件**不读文件系统**——它接受 spec 数组 + variant def 数组，产出"谁被
 * 谁采用 / 谁孤儿"的分析结果。CLI（scripts/variant-usage.ts）与守卫测试
 * （tests/unit/variant-coverage.spec.ts）都导入本模块；分析逻辑不双写。
 *
 * 三类身份：
 *   - default       —— 至少有一个 spec.variants[kind] === id
 *   - designedFor   —— meta.designedFor 至少含一个主题
 *   - orphan        —— 既无 default 又无 designedFor
 *
 * orphan = 实验性候选；本模块只识别身份，不做迁移决策（VariantMeta.experimental 标记
 * 是设计者的显式确认，本分析不修改源码）。
 */
import { VARIANT_IDS } from '../themes/types';
import type { PersonaSpec } from '../themes/_shared/spec';
import { type VariantDef, type CodeBlockDef } from './_core';
/** 仅含 VARIANT_IDS 覆盖的 12 个 kind（codeBlock / none 不在 spec.variants 命名空间内）。 */
type AnalyzableKind = keyof typeof VARIANT_IDS;
export interface VariantUsageEntry {
    kind: AnalyzableKind;
    id: string;
    /** 把本 variant 作为默认骨架的主题 id 列表。 */
    defaultBy: readonly string[];
    /** meta.designedFor 声明的设计起源主题 id 列表（空 = variant 自身未声明）。 */
    designedFor: readonly string[];
    /** meta.experimental 标记（作者显式确认"在等首个采用方"）。 */
    experimental: boolean;
    /** 综合身份。orphan = 既无 default 又无 designedFor。 */
    status: 'default' | 'designedFor' | 'orphan';
}
export interface VariantUsageReport {
    entries: readonly VariantUsageEntry[];
    orphans: readonly VariantUsageEntry[];
    /** 既不在 VARIANT_IDS 又被某 spec 引用（应被 validateSpec 拦截，留作交叉守卫）。 */
    unknownReferenced: ReadonlyArray<{
        kind: string;
        id: string;
        themeId: string;
    }>;
}
type AnyVariantDef = VariantDef<unknown> | CodeBlockDef;
export declare function analyzeVariantUsage(specs: readonly PersonaSpec[], defs: readonly AnyVariantDef[]): VariantUsageReport;
export {};
