import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch, type Ref } from 'vue'
import { parseFrontmatter } from '../../core/pipeline/frontmatter'
import { createArticle, isLibrarySupported, listArticles, pickLibrary, readArticle, restoreLibrary, writeArticle, type ArticleEntry, type Library } from '../../infra/fs/library'
import { safeReadJson, safeRemove, safeWriteJson } from '../../infra/storage/_kv'

interface FileBuffer { text: string; lastModified: number }
type PermissionHandle = FileSystemDirectoryHandle & {
  requestPermission(options: { mode: 'readwrite' }): Promise<PermissionState>
}

export function useLibraryArticles(deps: {
  md: Ref<string>
  baseThemeId: Ref<string>
  beforeOpen: () => boolean
}) {
  const supported = isLibrarySupported()
  const library = shallowRef<Library | null>(null)
  const articles = shallowRef<ArticleEntry[]>([])
  const activeArticle = shallowRef<ArticleEntry | null>(null)
  const permitted = ref(false)
  const revision = ref(0)
  const busy = ref(false)
  const error = ref('')
  const conflict = shallowRef<{ lastModified: number } | null>(null)
  const diskText = ref('')
  let diskModified = 0
  let bufferTimer: ReturnType<typeof setTimeout> | undefined
  let restoring: Promise<void> = Promise.resolve()
  const dirty = computed(() => !!activeArticle.value && deps.md.value !== diskText.value)
  const title = computed(() => parseFrontmatter(deps.md.value).publication.title || activeArticle.value?.title || '')
  const savingLabel = computed(() => error.value || (busy.value ? '读写中…' : dirty.value ? '未保存' : '已保存到文件'))

  function bufferKey() {
    return `wechat-typeset:file-buffer:${library.value?.id}:${activeArticle.value?.name}`
  }
  function flushBuffer() {
    clearTimeout(bufferTimer)
    if (!activeArticle.value) return true
    if (!dirty.value) { safeRemove(bufferKey()); return true }
    if (!safeWriteJson(bufferKey(), { text: deps.md.value, lastModified: diskModified })) {
      error.value = '未保存 · 崩溃备份失败，请按 Ctrl+S 写盘'
      return false
    }
    return true
  }
  watch(deps.md, () => {
    if (!activeArticle.value) return
    clearTimeout(bufferTimer)
    bufferTimer = setTimeout(flushBuffer, 2000)
  }, { flush: 'sync' })

  async function run(action: () => Promise<void>) {
    if (busy.value) return
    busy.value = true
    error.value = ''
    try { await action() } catch (cause) {
      if (!(cause instanceof DOMException && cause.name === 'AbortError')) {
        error.value = `文件操作失败：${cause instanceof Error ? cause.message : String(cause)}`
      }
    } finally { busy.value = false }
  }
  async function refresh() {
    if (library.value && permitted.value) {
      articles.value = await listArticles(library.value.dir)
      revision.value++
    }
  }
  async function connect() {
    await run(async () => {
      await restoring
      if (!library.value) {
        library.value = await pickLibrary()
        permitted.value = true
      } else {
        permitted.value = await (library.value.dir as PermissionHandle).requestPermission({ mode: 'readwrite' }) === 'granted'
      }
      if (!permitted.value) { error.value = '未获得文件夹读写权限，请再次点击文件夹入口授权'; return }
      await refresh()
    })
  }
  async function chooseLibrary() {
    if (!flushBuffer()) return
    await run(async () => {
      const next = await pickLibrary()
      if (!flushBuffer()) return
      if (activeArticle.value) {
        activeArticle.value = null
        conflict.value = null
        deps.md.value = ''
      }
      library.value = next
      permitted.value = true
      await refresh()
    })
  }
  function loadDisk(text: string, lastModified: number, clearBuffer = true) {
    diskText.value = text
    diskModified = lastModified
    deps.md.value = text
    const theme = parseFrontmatter(text).config.theme
    if (theme) deps.baseThemeId.value = theme
    conflict.value = null
    if (clearBuffer) flushBuffer()
  }
  async function open(entry: ArticleEntry) {
    if (entry.name === activeArticle.value?.name) return
    await run(async () => {
      const disk = await readArticle(entry.file)
      if (!flushBuffer() || !deps.beforeOpen()) return
      activeArticle.value = entry
      const backup = safeReadJson<FileBuffer | null>(bufferKey(), null)
      const recoverBackup = backup && typeof backup.text === 'string' && typeof backup.lastModified === 'number' && backup.text !== disk.text
      loadDisk(disk.text, disk.lastModified, !recoverBackup)
      if (recoverBackup) {
        diskModified = backup.lastModified
        deps.md.value = backup.text
        flushBuffer()
        if (backup.lastModified !== disk.lastModified) conflict.value = { lastModified: disk.lastModified }
      }
    })
  }
  async function create(title: string) {
    if (!library.value || !title.trim()) return
    let entry: ArticleEntry | undefined
    await run(async () => {
      entry = await createArticle(library.value!.dir, title.trim())
      await refresh()
    })
    if (entry) await open(entry)
  }
  async function checkExternal() {
    if (!permitted.value || busy.value || conflict.value) return
    await run(async () => {
      await refresh()
      if (!activeArticle.value) return
      const disk = await readArticle(activeArticle.value!.file)
      if (disk.lastModified === diskModified) return
      if (dirty.value) conflict.value = { lastModified: disk.lastModified }
      else loadDisk(disk.text, disk.lastModified)
    })
  }
  async function save(acceptedVersion?: number) {
    if (!activeArticle.value) return
    await run(async () => {
      const entry = activeArticle.value!
      const disk = await readArticle(entry.file)
      if (disk.lastModified !== diskModified && disk.lastModified !== acceptedVersion) {
        if (dirty.value) conflict.value = { lastModified: disk.lastModified }
        else loadDisk(disk.text, disk.lastModified)
        return
      }
      const text = deps.md.value
      diskModified = await writeArticle(entry.file, text)
      diskText.value = text
      conflict.value = null
      flushBuffer()
      await refresh()
    })
  }
  async function loadDiskVersion() {
    if (!activeArticle.value) return
    await run(async () => {
      const disk = await readArticle(activeArticle.value!.file)
      loadDisk(disk.text, disk.lastModified)
      await refresh()
    })
  }
  function overwrite() { return save(conflict.value?.lastModified) }
  function leave() {
    if (busy.value || conflict.value) return false
    if (!flushBuffer()) return false
    activeArticle.value = null
    error.value = ''
    return true
  }
  function onBeforeUnload(event: BeforeUnloadEvent) {
    flushBuffer()
    if (dirty.value) { event.preventDefault(); event.returnValue = '' }
  }
  onMounted(() => {
    if (supported) restoring = restoreLibrary().then((saved) => { library.value = saved }).catch((cause) => { error.value = String(cause) })
    window.addEventListener('focus', checkExternal)
    window.addEventListener('pagehide', flushBuffer)
    window.addEventListener('beforeunload', onBeforeUnload)
  })
  onBeforeUnmount(() => {
    flushBuffer()
    window.removeEventListener('focus', checkExternal)
    window.removeEventListener('pagehide', flushBuffer)
    window.removeEventListener('beforeunload', onBeforeUnload)
  })
  return { supported, library, articles, activeArticle, permitted, revision, busy, error, dirty, title, savingLabel, conflict, connect, chooseLibrary, open, create, save, leave, flushBuffer, loadDiskVersion, overwrite }
}
