/**
 * 组件草稿状态 —— Studio 内部使用的 reactive draft + dirty 跟踪。
 *
 * 三种 init 模式:
 *   - new      空白草稿,fields 全部缺省
 *   - edit     基于 user 组件 id 加载,保存调 updateComponent
 *   - derive   基于 builtin / theme template entry 克隆为新 user 草稿,保存调 createComponent
 *               克隆时保留 markdown / kind / variantId,name 加 "副本" 后缀
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

export type StudioMode = 'new' | 'edit' | 'derive'

export interface DraftFields {
  name: string
  description: string
  kind: ComponentKind
  variantId: string
  markdownSnippet: string
  thumbnailSvg: string
}

export interface UseComponentDraft {
  draft: DraftFields
  initial: DraftFields
  dirty: ComputedRef<boolean>
  /** 编辑模式才有:被编辑组件的 storage id,用于 updateComponent */
  editingId: string | null
  reset(): void
}

const EMPTY: DraftFields = {
  name: '',
  description: '',
  kind: 'none',
  variantId: '',
  markdownSnippet: '',
  thumbnailSvg: '',
}

function snapshotFromEntry(entry: ComponentEntry, namePrefix = ''): DraftFields {
  return {
    name: namePrefix ? `${namePrefix}${entry.name}` : entry.name,
    description: entry.description ?? '',
    kind: entry.kind,
    variantId: entry.variantId ?? '',
    markdownSnippet: entry.markdownSnippet,
    thumbnailSvg: entry.thumbnailSvg,
  }
}

export function useComponentDraft(
  mode: StudioMode,
  source: ComponentEntry | null,
): UseComponentDraft {
  let initial: DraftFields
  let editingId: string | null = null

  if (mode === 'new' || !source) {
    initial = { ...EMPTY }
  } else if (mode === 'edit') {
    // user 组件编辑:保留 id,name / desc / md / thumb 都直接克隆
    initial = snapshotFromEntry(source)
    if (source.source === 'user') editingId = (source as UserComponent).id
  } else {
    // derive:基于 builtin / theme template 克隆,加 "副本" 后缀以便用户认知 这是新条目
    initial = snapshotFromEntry(source, '副本 · ')
  }

  const draft = reactive<DraftFields>({ ...initial })

  const dirty = computed(() =>
    draft.name !== initial.name ||
    draft.description !== initial.description ||
    draft.kind !== initial.kind ||
    draft.variantId !== initial.variantId ||
    draft.markdownSnippet !== initial.markdownSnippet ||
    draft.thumbnailSvg !== initial.thumbnailSvg,
  )

  function reset() {
    draft.name = initial.name
    draft.description = initial.description
    draft.kind = initial.kind
    draft.variantId = initial.variantId
    draft.markdownSnippet = initial.markdownSnippet
    draft.thumbnailSvg = initial.thumbnailSvg
  }

  return { draft, initial, dirty, editingId, reset }
}
