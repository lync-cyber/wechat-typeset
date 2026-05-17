/**
 * userVariantSave —— ComponentStudio 保存路径里"如何处理 UV 仓 + markdown 改写"的纯函数
 * 抽取（步骤 5.5 + 4.3）。
 *
 * 为什么单独抽：dispatchUserVariant 是 4 路矩阵分支（orig × hasContent），还要跨级
 * （tokens ↔ patch）重建，逻辑足以独立验证。放在 .vue 里只能靠 mount 整个 Studio
 * 才能测，成本高且 jsdom 跑 CM6 编辑器昂贵。
 *
 * 输入：DraftFields 快照（不持 reactive 引用） + originalLinkedUvId
 * 输出：{ markdown, linkAction }；副作用：调 createUserVariant / updateUserVariant /
 *      deleteUserVariant（这些 storage 调用对测试可观察）
 */

import type { DraftCssPatch, DraftFields } from './useComponentDraft'
import type { VariantKind } from '../../../core/themes/types'
import type {
  CreateUserVariantInput,
} from '../../../infra/storage/userVariants.repo'
import {
  createUserVariant,
  deleteUserVariant,
  getUserVariant,
  updateUserVariant,
} from '../../../infra/storage/userVariants.repo'

/**
 * 三 slot substring 查找：顺序与 SourceModePanel.SLOT_LABELS 一致（wrapper → title → body）。
 * 不做模糊匹配——sample.before 与作者源串通常逐字相等；查不到时返回 null 让调用方
 * 静默 fallback（跳到任意位置反而误导用户）。
 */
export type CssPatchSlot = 'wrapperCSS' | 'titleCSS' | 'bodyCSS'

export function findSlotContainingSubstring(
  patch: DraftCssPatch,
  needle: string,
): CssPatchSlot | null {
  if (!needle) return null
  const slots: CssPatchSlot[] = ['wrapperCSS', 'titleCSS', 'bodyCSS']
  for (const s of slots) {
    if (patch[s].includes(needle)) return s
  }
  return null
}

export type LinkAction =
  | { kind: 'noop' }
  | { kind: 'set'; id: string }
  | { kind: 'clear' }

export interface DispatchResult {
  markdown: string
  linkAction: LinkAction
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 把 markdown 里所有 `variant=<baseId>` token 替换为新 id。
 * 不存在的 baseId / 不含 `variant=` 的片段：原样返回（不强行注入，避免破坏用户意图）。
 */
export function rewriteVariantInMarkdown(md: string, baseId: string, newId: string): string {
  if (!baseId || !newId || !md) return md
  const re = new RegExp(`\\bvariant=${escapeRegExp(baseId)}\\b`, 'g')
  return md.replace(re, `variant=${newId}`)
}

/**
 * 重写 fence opener `::: <oldFence>` → `::: <newFence>`。custom UV 新建时把作者
 * 的占位 `uc-NEW` 改成真实 `uc-<uv.id>`，否则 markdown-it 找不到 fence 退化为字面文本。
 * 仅匹配"3+ 冒号 + 空白 + 完整词边界"，避免误伤代码段 / inline text。
 */
export const CUSTOM_FENCE_PLACEHOLDER = 'uc-NEW'

export function rewriteCustomFenceInMarkdown(
  md: string,
  oldFence: string,
  newFence: string,
): string {
  if (!oldFence || !newFence || !md || oldFence === newFence) return md
  const re = new RegExp(`(:{3,}\\s*)${escapeRegExp(oldFence)}\\b`, 'g')
  return md.replace(re, `$1${newFence}`)
}

function hasPatchContent(draft: DraftFields): boolean {
  const p = draft.userVariantCssPatch
  return !!(p.wrapperCSS.trim() || p.titleCSS.trim() || p.bodyCSS.trim())
}

function hasCustomContent(draft: DraftFields): boolean {
  // template + wrapperCSS 是 UserVariantCustom 的必填两字段
  const c = draft.userVariantCustom
  return !!(c.template.trim() && c.wrapperCSS.trim())
}

function isBaseValid(draft: DraftFields): boolean {
  return draft.kind !== 'none' && !!draft.variantId
}

function hasUvContent(draft: DraftFields): boolean {
  if (draft.userVariantMode === 'custom') return hasCustomContent(draft)
  if (!isBaseValid(draft)) return false
  if (draft.userVariantMode === 'tokens') return Object.keys(draft.userVariantTokens).length > 0
  if (draft.userVariantMode === 'patch') return hasPatchContent(draft)
  return false
}

function buildCreateInput(draft: DraftFields): CreateUserVariantInput | null {
  if (draft.userVariantMode === 'custom' && hasCustomContent(draft)) {
    const c = draft.userVariantCustom
    return {
      level: 'custom',
      name: `${draft.name.trim()} · custom`,
      base: null,
      template: c.template,
      css: {
        wrapperCSS: c.wrapperCSS,
        ...(c.titleCSS.trim() ? { titleCSS: c.titleCSS } : {}),
        ...(c.bodyCSS.trim() ? { bodyCSS: c.bodyCSS } : {}),
        ...(c.svgSlot.trim() ? { svgSlot: c.svgSlot } : {}),
      },
    }
  }
  if (!isBaseValid(draft)) return null
  const baseRef = { kind: draft.kind as VariantKind, variantId: draft.variantId }
  if (draft.userVariantMode === 'tokens' && Object.keys(draft.userVariantTokens).length > 0) {
    return {
      level: 'tokens',
      name: `${draft.name.trim()} · tokens`,
      base: baseRef,
      tokens: { ...draft.userVariantTokens },
    }
  }
  if (draft.userVariantMode === 'patch' && hasPatchContent(draft)) {
    const p = draft.userVariantCssPatch
    return {
      level: 'patch',
      name: `${draft.name.trim()} · patch`,
      base: baseRef,
      cssPatch: {
        ...(p.wrapperCSS.trim() ? { wrapperCSS: p.wrapperCSS } : {}),
        ...(p.titleCSS.trim() ? { titleCSS: p.titleCSS } : {}),
        ...(p.bodyCSS.trim() ? { bodyCSS: p.bodyCSS } : {}),
      },
    }
  }
  return null
}

/**
 * UV 分派矩阵（步骤 5：扩到 tokens / patch 双档）。详细矩阵见 ComponentStudio.vue 的注释。
 *
 * 副作用：
 *   - 跨级 / 跨 base → deleteUserVariant(orig) 释放 + 走 fresh 路径
 *   - 同级同 base + 有内容 → updateUserVariant
 *   - 有 orig + 无内容 → deleteUserVariant + linkAction='clear'
 *   - 无 orig + 有内容 → createUserVariant + linkAction='set'
 */
export function dispatchUserVariant(
  draft: DraftFields,
  originalLinkedUvId: string | null,
): DispatchResult {
  let effectiveOrig: string | null = originalLinkedUvId
  // 跨级 / 跨 base 删旧后，markdown 还含旧 id；先把 md 回退到 base 再走 case 3
  // 的"create + base→new"重写。把这一步显式跟踪在 `mdAfterDriftReset`，避免在
  // case 3 里再次猜测 baseId 与 origId 的关系。
  let mdAfterDriftReset = draft.markdownSnippet

  // base / level 漂移视为重建：删旧 + 走 fresh 路径。custom 的 fence 是
  // `::: uc-<uvid>`（非 `variant=<id>`），无法被 rewriteVariantInMarkdown 机械改写——
  // 涉及 custom 的跨档转换不重写 markdown，由用户手动修复 fence 引用
  if (effectiveOrig && (isBaseValid(draft) || draft.userVariantMode === 'custom')) {
    const cur = getUserVariant(effectiveOrig)
    if (cur) {
      const baseDrifted =
        cur.level !== 'custom' &&
        draft.userVariantMode !== 'custom' &&
        (cur.base.kind !== draft.kind || cur.base.variantId !== draft.variantId)
      const levelDrifted = cur.level !== draft.userVariantMode
      if (baseDrifted || levelDrifted) {
        if (cur.level !== 'custom' && draft.userVariantMode !== 'custom') {
          mdAfterDriftReset = rewriteVariantInMarkdown(
            mdAfterDriftReset,
            effectiveOrig,
            draft.variantId,
          )
        }
        deleteUserVariant(effectiveOrig)
        effectiveOrig = null
      }
    }
  }

  // case 1: 同级同 base + 有内容 → 覆盖更新；markdown 不动
  if (effectiveOrig && hasUvContent(draft)) {
    if (draft.userVariantMode === 'tokens') {
      updateUserVariant(effectiveOrig, { tokens: { ...draft.userVariantTokens } })
    } else if (draft.userVariantMode === 'patch') {
      const p = draft.userVariantCssPatch
      updateUserVariant(effectiveOrig, {
        cssPatch: {
          ...(p.wrapperCSS.trim() ? { wrapperCSS: p.wrapperCSS } : {}),
          ...(p.titleCSS.trim() ? { titleCSS: p.titleCSS } : {}),
          ...(p.bodyCSS.trim() ? { bodyCSS: p.bodyCSS } : {}),
        },
      })
    } else if (draft.userVariantMode === 'custom') {
      const c = draft.userVariantCustom
      updateUserVariant(effectiveOrig, {
        template: c.template,
        css: {
          wrapperCSS: c.wrapperCSS,
          titleCSS: c.titleCSS,
          bodyCSS: c.bodyCSS,
          svgSlot: c.svgSlot,
        },
      })
    }
    return { markdown: draft.markdownSnippet, linkAction: { kind: 'noop' } }
  }

  // case 2: orig 在 + 无内容 → 用户清空，删 UV + 回退 markdown
  if (effectiveOrig && !hasUvContent(draft)) {
    deleteUserVariant(effectiveOrig)
    const restored = isBaseValid(draft)
      ? rewriteVariantInMarkdown(draft.markdownSnippet, effectiveOrig, draft.variantId)
      : draft.markdownSnippet
    return { markdown: restored, linkAction: { kind: 'clear' } }
  }

  // case 3: 无 orig + 有内容 → 新建 UV
  if (!effectiveOrig && hasUvContent(draft)) {
    const input = buildCreateInput(draft)
    if (input) {
      const uv = createUserVariant(input)
      const rewritten =
        draft.userVariantMode === 'custom'
          ? rewriteCustomFenceInMarkdown(
              mdAfterDriftReset,
              CUSTOM_FENCE_PLACEHOLDER,
              `uc-${uv.id}`,
            )
          : rewriteVariantInMarkdown(mdAfterDriftReset, draft.variantId, uv.id)
      return { markdown: rewritten, linkAction: { kind: 'set', id: uv.id } }
    }
  }

  // case 4: 其余（无 orig 无内容 / 跨级重建后无内容）→ no-op；
  // 若是跨级触发了 drift reset，仍把回退后的 markdown 透出避免遗留旧 id
  return {
    markdown: mdAfterDriftReset,
    linkAction: effectiveOrig === null && mdAfterDriftReset !== draft.markdownSnippet
      ? { kind: 'clear' }
      : { kind: 'noop' },
  }
}
