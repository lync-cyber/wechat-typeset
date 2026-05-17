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
 * 用户态变体的"编辑模式"。决定保存路径与 UI 显示哪个面板。
 *   - null      未启用任何 UV（保存不创建 UV）
 *   - 'tokens'  L1：tokens 面板（每字段一个 color/size 控件）
 *   - 'patch'   L2：源码模式（CSS 三 slot 直接写 inline css 片段）
 *   - 'custom'  L3：完全自定义 HTML 骨架（template 字符串 + 4 个 CSS slot）
 *
 * 同时只有一档生效——切档相当于切换 base 的"自由度阶梯"。custom 与 tokens/patch
 * 的关键差异：custom 不依赖 base.kind/variantId（基底 = null），它注册独立 fence
 * （`uc-<uvid>`）走 _user.ts 的占位符替换路径。
 */
export type UserVariantMode = 'tokens' | 'patch' | 'custom' | null

/**
 * patch 档草稿：三个 inline css slot。所有 string 字段未填即视为"不追加"。
 * 与 UserVariantPatch.cssPatch 同形，但所有字段必填（draft 永远持有 string，便于 v-model 绑 CM6）。
 */
export interface DraftCssPatch {
  wrapperCSS: string
  titleCSS: string
  bodyCSS: string
}

/**
 * custom 档草稿：完整 HTML template + 4 个 CSS slot（含 svgSlot）。
 * 与 UserVariantCustom.template / .css 同形，所有字段必填便于 v-model。
 */
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
  /**
   * 用户态变体的 token 覆盖（步骤 4）。key 与 variant 的 tokenSchema key 对齐，
   * 空 string 视为"未覆盖"（UI 占位符显示主题默认）。
   *
   * 仅当 variantId 对应的内置 variant 暴露 tokenSchema 时才有意义；不暴露的 variant
   * 字段值会被 ComponentStudio 保存逻辑忽略。
   *
   * 保存路径：非空时 ComponentStudio 创建 UserVariantTokens 入仓，并把 markdown
   * 的 `variant=<base>` 改写为 `variant=<uv_xxx>`。
   */
  userVariantTokens: Record<string, string>
  /** 步骤 5：当前激活的 UV 模式；切档清掉另一档的草稿数据（避免保存时歧义）。 */
  userVariantMode: UserVariantMode
  /** 步骤 5：patch 档草稿——SourceModePanel 三个 CodeMirrorPane 的 v-model 目标。 */
  userVariantCssPatch: DraftCssPatch
  /** 步骤 7：custom 档草稿——CustomModePanel 的 template + 4 个 css slot 的 v-model 目标。 */
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
 * edit 模式：若 user 组件挂着 linkedUserVariantId，反查 UV 并按 level 把数据回填到对应草稿字段。
 *
 * 严格要求 base.kind/variantId 与组件 entry 一致（仅 tokens/patch）——不一致说明数据被外部
 * 改坏（或用户在另一会话改过组件 kind）；降级为"无 UV 覆盖"重新走 fresh 路径，保存时若用户
 * 没填任何字段会被识别为"主动清空"流程（详见 ComponentStudio.onSave）。
 *
 * custom 档不挂 base.kind/variantId，跳过 base 校验直接回填 template + css 槽位。
 *
 * 失败（UV 已删 / base 不匹配）都返回 mode=null + 空草稿，但 originalLinkedUvId 仍透出
 * 原值让 onSave 决定是清空 link 还是覆盖。
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
