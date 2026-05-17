/**
 * 组件草稿状态 —— Studio 内部使用的 reactive draft + dirty 跟踪。
 *
 * 三种 init 模式:
 *   - new      空白草稿,fields 全部缺省
 *   - edit     基于 user 组件 id 加载,保存调 updateComponent
 *               若 user 组件有 linkedUserVariantId,反查 UserVariant 仓并回填 token 面板
 *               （这是 4.3 edit-mode 回环的关键：让用户可继续在原 UV 上调 token,
 *                  而非每次只能"派生新版本"导致 UV 仓爆炸）
 *   - derive   基于 builtin / theme template entry 克隆为新 user 草稿,保存调 createComponent
 *               克隆时保留 markdown / kind / variantId,name 加 "副本" 后缀
 *               linkedUserVariantId 不复制（派生 = 全新组件，需独立 UV）
 *
 * dirty 判定:与初始 snapshot 任一字段不等。
 * 不持有 storage 责任：保存路径由 ComponentStudio.vue 决定调 createComponent or updateComponent。
 */
import { reactive, computed, type ComputedRef } from 'vue'
import type {
  ComponentEntry,
  ComponentKind,
  UserComponent,
} from '../../../domain/components-lib'
import { getUserVariant } from '../../../infra/storage/userVariants.repo'

export type StudioMode = 'new' | 'edit' | 'derive'

/**
 * tokens/patch/custom 三档互斥——切档清掉另两档的草稿数据，避免保存路径歧义。
 * custom 与 tokens/patch 的关键差异：base=null，靠独立 fence `uc-<uvid>` 路由，
 * 不需要 kind/variantId 锚定基底。
 */
export type UserVariantMode = 'tokens' | 'patch' | 'custom' | null

/** 草稿字段必填 string（v-model 不接受 undefined）；空串 = 未填。 */
export interface DraftCssPatch {
  wrapperCSS: string
  titleCSS: string
  bodyCSS: string
}

export interface DraftCustom {
  template: string
  wrapperCSS: string
  titleCSS: string
  bodyCSS: string
  svgSlot: string
}

export interface DraftFields {
  name: string
  description: string
  kind: ComponentKind
  variantId: string
  markdownSnippet: string
  thumbnailSvg: string
  userVariantTokens: Record<string, string>
  userVariantMode: UserVariantMode
  userVariantCssPatch: DraftCssPatch
  userVariantCustom: DraftCustom
}

export interface UseComponentDraft {
  draft: DraftFields
  initial: DraftFields
  dirty: ComputedRef<boolean>
  /** 编辑模式才有:被编辑组件的 storage id,用于 updateComponent */
  editingId: string | null
  /**
   * edit 模式打开时与组件关联的 UserVariant id 快照（不参与 dirty）。
   *   - null：本次编辑前组件未关联 UV（无 token 覆盖历史）
   *   - 字符串：已关联，保存路径据此决定 update / delete UV
   * 仅在 edit 模式有意义；new / derive 永远为 null。
   */
  originalLinkedUvId: string | null
  reset(): void
}

const EMPTY_CSS_PATCH: DraftCssPatch = { wrapperCSS: '', titleCSS: '', bodyCSS: '' }
const EMPTY_CUSTOM: DraftCustom = {
  template: '',
  wrapperCSS: '',
  titleCSS: '',
  bodyCSS: '',
  svgSlot: '',
}

const EMPTY: DraftFields = {
  name: '',
  description: '',
  kind: 'none',
  variantId: '',
  markdownSnippet: '',
  thumbnailSvg: '',
  userVariantTokens: {},
  userVariantMode: null,
  userVariantCssPatch: { ...EMPTY_CSS_PATCH },
  userVariantCustom: { ...EMPTY_CUSTOM },
}

function snapshotFromEntry(entry: ComponentEntry, namePrefix = ''): DraftFields {
  return {
    name: namePrefix ? `${namePrefix}${entry.name}` : entry.name,
    description: entry.description ?? '',
    kind: entry.kind,
    variantId: entry.variantId ?? '',
    markdownSnippet: entry.markdownSnippet,
    thumbnailSvg: entry.thumbnailSvg,
    userVariantTokens: {},
    userVariantMode: null,
    userVariantCssPatch: { ...EMPTY_CSS_PATCH },
    userVariantCustom: { ...EMPTY_CUSTOM },
  }
}

interface LoadedLink {
  originalLinkedUvId: string | null
  tokens: Record<string, string>
  cssPatch: DraftCssPatch
  custom: DraftCustom
  mode: UserVariantMode
}

/**
 * tokens/patch 严格要求 base.kind/variantId 与 entry 一致——不一致即被外部改坏，
 * 降级为空草稿走 fresh 路径。custom 不挂 base，跳过此校验。
 * 失败时 originalLinkedUvId 仍透出原值让 onSave 决定 clear 还是覆盖。
 */
function loadLinkedUv(entry: UserComponent): LoadedLink {
  const blank: LoadedLink = {
    originalLinkedUvId: entry.linkedUserVariantId ?? null,
    tokens: {},
    cssPatch: { ...EMPTY_CSS_PATCH },
    custom: { ...EMPTY_CUSTOM },
    mode: null,
  }
  const uvId = entry.linkedUserVariantId
  if (!uvId) return blank
  const uv = getUserVariant(uvId)
  if (!uv) return blank
  if (uv.level === 'custom') {
    return {
      ...blank,
      custom: {
        template: uv.template,
        wrapperCSS: uv.css.wrapperCSS,
        titleCSS: uv.css.titleCSS ?? '',
        bodyCSS: uv.css.bodyCSS ?? '',
        svgSlot: uv.css.svgSlot ?? '',
      },
      mode: 'custom',
    }
  }
  if (uv.base.kind !== entry.kind || uv.base.variantId !== (entry.variantId ?? '')) {
    return blank
  }
  if (uv.level === 'tokens') {
    return { ...blank, tokens: { ...uv.tokens }, mode: 'tokens' }
  }
  // level === 'patch'
  return {
    ...blank,
    cssPatch: {
      wrapperCSS: uv.cssPatch.wrapperCSS ?? '',
      titleCSS: uv.cssPatch.titleCSS ?? '',
      bodyCSS: uv.cssPatch.bodyCSS ?? '',
    },
    mode: 'patch',
  }
}

export function useComponentDraft(
  mode: StudioMode,
  source: ComponentEntry | null,
): UseComponentDraft {
  let initial: DraftFields
  let editingId: string | null = null
  let originalLinkedUvId: string | null = null

  if (mode === 'new' || !source) {
    initial = {
      ...EMPTY,
      userVariantCssPatch: { ...EMPTY_CSS_PATCH },
      userVariantCustom: { ...EMPTY_CUSTOM },
    }
  } else if (mode === 'edit') {
    initial = snapshotFromEntry(source)
    if (source.source === 'user') {
      editingId = (source as UserComponent).id
      const linked = loadLinkedUv(source as UserComponent)
      initial.userVariantTokens = linked.tokens
      initial.userVariantCssPatch = linked.cssPatch
      initial.userVariantCustom = linked.custom
      initial.userVariantMode = linked.mode
      originalLinkedUvId = linked.originalLinkedUvId
    }
  } else {
    initial = snapshotFromEntry(source, '副本 · ')
  }

  const draft = reactive<DraftFields>({
    ...initial,
    userVariantTokens: { ...initial.userVariantTokens },
    userVariantCssPatch: { ...initial.userVariantCssPatch },
    userVariantCustom: { ...initial.userVariantCustom },
  })

  const dirty = computed(() =>
    draft.name !== initial.name ||
    draft.description !== initial.description ||
    draft.kind !== initial.kind ||
    draft.variantId !== initial.variantId ||
    draft.markdownSnippet !== initial.markdownSnippet ||
    draft.thumbnailSvg !== initial.thumbnailSvg ||
    draft.userVariantMode !== initial.userVariantMode ||
    !shallowEqualRecord(draft.userVariantTokens, initial.userVariantTokens) ||
    !shallowEqualCssPatch(draft.userVariantCssPatch, initial.userVariantCssPatch) ||
    !shallowEqualCustom(draft.userVariantCustom, initial.userVariantCustom),
  )

  function reset() {
    draft.name = initial.name
    draft.description = initial.description
    draft.kind = initial.kind
    draft.variantId = initial.variantId
    draft.markdownSnippet = initial.markdownSnippet
    draft.thumbnailSvg = initial.thumbnailSvg
    draft.userVariantMode = initial.userVariantMode
    for (const k of Object.keys(draft.userVariantTokens)) {
      delete draft.userVariantTokens[k]
    }
    Object.assign(draft.userVariantTokens, initial.userVariantTokens)
    draft.userVariantCssPatch.wrapperCSS = initial.userVariantCssPatch.wrapperCSS
    draft.userVariantCssPatch.titleCSS = initial.userVariantCssPatch.titleCSS
    draft.userVariantCssPatch.bodyCSS = initial.userVariantCssPatch.bodyCSS
    draft.userVariantCustom.template = initial.userVariantCustom.template
    draft.userVariantCustom.wrapperCSS = initial.userVariantCustom.wrapperCSS
    draft.userVariantCustom.titleCSS = initial.userVariantCustom.titleCSS
    draft.userVariantCustom.bodyCSS = initial.userVariantCustom.bodyCSS
    draft.userVariantCustom.svgSlot = initial.userVariantCustom.svgSlot
  }

  return { draft, initial, dirty, editingId, originalLinkedUvId, reset }
}

function shallowEqualCssPatch(a: DraftCssPatch, b: DraftCssPatch): boolean {
  return a.wrapperCSS === b.wrapperCSS && a.titleCSS === b.titleCSS && a.bodyCSS === b.bodyCSS
}

function shallowEqualCustom(a: DraftCustom, b: DraftCustom): boolean {
  return (
    a.template === b.template &&
    a.wrapperCSS === b.wrapperCSS &&
    a.titleCSS === b.titleCSS &&
    a.bodyCSS === b.bodyCSS &&
    a.svgSlot === b.svgSlot
  )
}

function shallowEqualRecord(a: Record<string, string>, b: Record<string, string>): boolean {
  const ka = Object.keys(a)
  const kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  for (const k of ka) if (a[k] !== b[k]) return false
  return true
}
