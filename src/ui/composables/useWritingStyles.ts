import { computed, onBeforeUnmount, ref, shallowRef, watch, type Ref } from 'vue'
import { parseFrontmatter, updatePublication } from '../../core/pipeline/frontmatter'
import { defaultWritingStyles, parseWritingStylesJSON, type WritingStylesDocument } from '../../domain/publish/writingStyles'
import { readArticle, writeArticle } from '../../infra/fs/library'
import { safeWrite } from '../../infra/storage/_kv'

const FILE_NAME = '.writing-styles.json'
const BROWSER_KEY = 'wechat-typeset:writing-styles'

async function readConfigFile(directory: FileSystemDirectoryHandle) {
  try {
    const handle = await directory.getFileHandle(FILE_NAME)
    return { handle, ...await readArticle(handle) }
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'NotFoundError') return null
    throw cause
  }
}

export function useWritingStyles(deps: {
  /** 文章库根目录；父级只传入已获读写权限的句柄。 */
  directory: Ref<FileSystemDirectoryHandle | null>
  md: Ref<string>
}) {
  const config = shallowRef<WritingStylesDocument>(defaultWritingStyles())
  const loading = ref(false)
  const saving = ref(false)
  const storageError = ref('')
  let generation = 0
  let contextDirectory: FileSystemDirectoryHandle | null | undefined
  let expectedModified: number | null = null
  const loadBlocked = ref(true)

  const selectedId = computed(() => parseFrontmatter(deps.md.value).publication.writingStyle || config.value.defaultId)
  const canEdit = computed(() => !loading.value && !saving.value && !loadBlocked.value)
  const activeStyle = computed(() => loading.value || loadBlocked.value
    ? null : config.value.styles.find((style) => style.id === selectedId.value) ?? null)
  const error = computed(() => storageError.value || (!loading.value && !loadBlocked.value && !activeStyle.value
    ? `本文写作风格「${selectedId.value}」不存在，请重新选择。` : ''))

  function current(request: number, directory: FileSystemDirectoryHandle | null) {
    return request === generation && deps.directory.value === directory
  }

  async function load() {
    const request = ++generation
    const directory = deps.directory.value
    if (contextDirectory !== directory) config.value = defaultWritingStyles()
    contextDirectory = directory
    loading.value = true
    storageError.value = ''
    loadBlocked.value = true
    try {
      const disk = directory ? await readConfigFile(directory) : null
      if (!current(request, directory)) return
      // 仅文件不存在时使用浏览器兜底；损坏的磁盘 JSON 不能被默认值悄悄覆盖。
      const source = disk?.text ?? localStorage.getItem(BROWSER_KEY)
      const parsed = source === null ? { ok: true as const, value: defaultWritingStyles() } : parseWritingStylesJSON(source)
      if (!parsed.ok) throw new Error(`${disk ? FILE_NAME : '浏览器写作风格'}格式错误：${parsed.error}。请修复后重新载入。`)
      config.value = parsed.value
      expectedModified = disk?.lastModified ?? null
      loadBlocked.value = false
    } catch (cause) {
      if (current(request, directory)) storageError.value = `写作风格未载入：${cause instanceof Error ? cause.message : String(cause)}`
    } finally {
      if (current(request, directory)) loading.value = false
    }
  }

  function reload(): Promise<void> {
    return saving.value ? Promise.resolve() : load()
  }

  function select(id: string): boolean {
    if (!canEdit.value) return false
    if (!config.value.styles.some((style) => style.id === id)) {
      storageError.value = '写作风格不存在，请重新选择。'
      return false
    }
    storageError.value = ''
    deps.md.value = updatePublication(deps.md.value, { writingStyle: id })
    return true
  }

  async function save(value: WritingStylesDocument): Promise<boolean> {
    if (!canEdit.value) return false
    const request = generation
    const directory = deps.directory.value
    saving.value = true
    storageError.value = ''
    try {
      // JSON 往返给异步保存拍快照，并统一使用 domain 校验；不接受未知字段或非法范围。
      const parsed = parseWritingStylesJSON(JSON.stringify(value))
      if (!parsed.ok) throw new Error(parsed.error)
      const text = `${JSON.stringify(parsed.value, null, 2)}\n`
      if (directory) {
        const disk = await readConfigFile(directory)
        if (!current(request, directory)) return false
        if ((disk?.lastModified ?? null) !== expectedModified) {
          loadBlocked.value = true
          throw new Error(`${FILE_NAME} 已在外部修改，请重新载入后再保存。`)
        }
        const handle = disk?.handle ?? await directory.getFileHandle(FILE_NAME, { create: true })
        // 目标句柄已固定；开始写入后即便切库，也只完成原目录写入，不更新新库界面。
        const lastModified = await writeArticle(handle, text)
        if (!current(request, directory)) return false
        expectedModified = lastModified
      } else if (!safeWrite(BROWSER_KEY, text)) {
        throw new Error('浏览器存储写入失败，请检查存储空间后重试。')
      }
      if (!current(request, directory)) return false
      config.value = parsed.value
      return true
    } catch (cause) {
      if (current(request, directory)) storageError.value = `写作风格未保存：${cause instanceof Error ? cause.message : String(cause)}`
      return false
    } finally {
      saving.value = false
    }
  }

  watch(deps.directory, () => { void load() }, { immediate: true, flush: 'sync' })
  onBeforeUnmount(() => { generation += 1 })

  return { config, loading, saving, canEdit, error, selectedId, activeStyle, select, save, reload }
}
