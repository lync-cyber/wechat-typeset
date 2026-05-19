/**
 * 统一 Variant 注册表（运行时 render 派发层）
 *
 * 新增 variant 三步：
 *   1. 在 `src/core/variants/<kind>/` 下新建 `<id>.ts`，default export 一个 VariantDef / CodeBlockDef。
 *   2. 在 `src/core/variants/<kind>/_all.ts` import 并追加到数组（每个 kind 一份聚合器）。
 *   3. 把新 id 加入 `src/core/themes/types.ts` 的 `VARIANT_IDS[<kind>]`（`satisfies` 保证类型对齐）。
 *
 * 聚合输出（供下游消费）：
 *   - ADMONITION_VARIANTS / QUOTE_VARIANTS / COMPARE_VARIANTS / STEPS_VARIANTS /
 *     DIVIDER_VARIANTS / SECTION_TITLE_VARIANTS / NOTE_VARIANTS —— `pipeline/containers/*.ts` 按 id 分派 render
 *   - CODE_BLOCK_VARIANTS —— signature 异质，独立桶
 *   - ALL_VARIANT_DEFS —— 全部容器骨架 variant def 的扁平数组（**不含** kind='none' 的
 *     自由组件 snippet）；自由组件 snippet 的源在 domain 层 builtin-source.ts 自行合并。
 *     core 层不感知 domain 层的 free snippet 资产，避免反向依赖。
 *
 * 顺序：各 kind 的 `*_ORDER` 常量决定运行时表的稳定迭代顺序（影响快照），未列出的按 id 字典序追加。
 *
 * 为何用显式 import 而非 `import.meta.glob`：`scripts/verify-sample-full.ts` 通过 tsx
 * 在 Node 下直接跑 pipeline，tsx 没有 Vite 的 glob 转换会 TypeError。显式 import 让本文件
 * 在 Vite 和 Node 两套运行时都可用。
 */
import type { AdmonitionKind, AdmonitionRenderArgs, CodeBlockDef, CompareRenderArgs, VariantDef, VariantRender } from './_core';
import type { AdmonitionVariantId, AnnouncementVariantId, CompareVariantId, DialogueVariantId, DividerVariantId, FooterCTAVariantId, FootnotesVariantId, GalleryVariantId, HighlightVariantId, NoteVariantId, PullQuoteVariantId, QaBlockVariantId, QrcodeVariantId, QuoteVariantId, RecommendVariantId, SectionTitleVariantId, StepsVariantId, TableCardVariantId } from '../themes/types';
/**
 * 容器 variant 的 render 必选变体：pipeline/containers/*.ts 查表后直接 `.render()`，
 * 不该处理 undefined。kind='none' 的自由组件无 render，不入这些桶。
 */
type RequiredRender<Args> = VariantDef<Args> & {
    render: NonNullable<VariantRender<Args>>;
};
/**
 * 任意 variant def 的并集类型。导出供 domain/components-lib 派生面板资产时使用。
 * core 内部消费者用更精确的 VariantDef<Args> / CodeBlockDef。
 */
export type AnyVariantDef = VariantDef<unknown> | CodeBlockDef;
/**
 * 全部容器骨架 variant def 的扁平只读视图。
 *
 * **不含** kind='none' 的自由组件 snippet——free 资产由 domain 层
 * builtin-source.ts 自己 import freeAll 后与本数组合并。
 *
 * 反向 sanity 测试用它扫描"实现进来但未在 VARIANT_IDS 声明"的漏网 variant。
 * core 内部仍走 *_VARIANTS Record 表，不直接迭代 ALL_VARIANT_DEFS。
 */
export declare const ALL_VARIANT_DEFS: ReadonlyArray<AnyVariantDef>;
export declare const ADMONITION_VARIANTS: Record<AdmonitionVariantId, RequiredRender<AdmonitionRenderArgs>>;
export declare const QUOTE_VARIANTS: Record<QuoteVariantId, RequiredRender<void>>;
export declare const COMPARE_VARIANTS: Record<CompareVariantId, RequiredRender<CompareRenderArgs>>;
export declare const STEPS_VARIANTS: Record<StepsVariantId, RequiredRender<void>>;
export declare const DIVIDER_VARIANTS: Record<DividerVariantId, RequiredRender<void>>;
export declare const SECTION_TITLE_VARIANTS: Record<SectionTitleVariantId, RequiredRender<void>>;
export declare const NOTE_VARIANTS: Record<NoteVariantId, RequiredRender<void>>;
export declare const HIGHLIGHT_VARIANTS: Record<HighlightVariantId, RequiredRender<void>>;
export declare const FOOTNOTES_VARIANTS: Record<FootnotesVariantId, RequiredRender<void>>;
export declare const RECOMMEND_VARIANTS: Record<RecommendVariantId, RequiredRender<void>>;
export declare const QRCODE_VARIANTS: Record<QrcodeVariantId, RequiredRender<void>>;
export declare const FOOTER_CTA_VARIANTS: Record<FooterCTAVariantId, RequiredRender<void>>;
export declare const PULL_QUOTE_VARIANTS: Record<PullQuoteVariantId, RequiredRender<void>>;
export declare const ANNOUNCEMENT_VARIANTS: Record<AnnouncementVariantId, RequiredRender<void>>;
export declare const TABLE_CARD_VARIANTS: Record<TableCardVariantId, RequiredRender<void>>;
export declare const GALLERY_VARIANTS: Record<GalleryVariantId, RequiredRender<void>>;
export declare const DIALOGUE_VARIANTS: Record<DialogueVariantId, RequiredRender<void>>;
export declare const QA_BLOCK_VARIANTS: Record<QaBlockVariantId, RequiredRender<void>>;
export type { AdmonitionKind };
export declare const CODE_BLOCK_VARIANTS: Record<string, CodeBlockDef>;
