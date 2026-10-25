/**
 * themeToSpec：Theme → PersonaSpec 的一次性迁移助手。跑 themeToSpec(theme) 抽出
 * palette/typography/variants/elements/containers/inline/templates，得到可直接
 * 写入 persona.data.ts 的对象初稿。
 *
 * 限制：motif 的 SVG 字符串 → JSON AST 反向解析不做（容错差），由调用方补齐。
 */
import type { Theme } from '../../types';
import type { PersonaSpec } from './types';
/**
 * 结构性反向迁移：能从 Theme 字段直接读出来的字段照抄，无法派生的（motifs）留空。
 *
 * @param theme Theme 实例（来自 themeRegistry）
 * @param overrides 人工补齐的字段（audience、motifs、meta、signatureContainers）
 */
export declare function themeToSpec(theme: Theme, overrides: Pick<PersonaSpec, 'audience' | 'meta'> & Partial<Pick<PersonaSpec, 'motifs' | 'signatureContainers'>>): PersonaSpec;
