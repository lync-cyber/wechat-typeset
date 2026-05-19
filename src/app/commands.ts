/**
 * 命令面板清单构造。依赖通过 deps 传入，输出 ComputedRef<Command[]>。
 * deps 字段较多但都是"需要的最少集合"——不把整个 composable 返回值塞进来当 black box，
 * 避免无关字段反向耦合 commands。未来可扩展 CommandSource 插件接口在此注入。
 */
import { computed, type ComputedRef, type Ref } from 'vue'
import type { Command } from '../ui/components/command-types'
import { themeList } from '../core/themes'
import { createDraft, listDrafts } from '../infra/storage/drafts'
import { baseThemeId } from '../ui/state/store'

export interface BuildCommandsDeps {
  modKey: string
  /** UI 抽屉状态总线 */
  ui: { commandOpen: boolean; helpOpen: boolean; leftSlot: string | null; rightSlot: string | null }
  drawerStates: Ref<{ drafts: boolean; components: boolean; customizer: boolean; checklist: boolean }>
  toggleLeft: (slot: 'drafts') => void
  toggleRight: (slot: 'components' | 'customizer' | 'checklist') => void
  /** 草稿生命周期 */
  draftIndexTick: Ref<number>
  activeDraftId: Ref<string | null>
  handleSave: () => void
  handleSelectDraft: (id: string) => void
  /** 剪贴板 / 分享 */
  handleCopy: () => void
  handleCopyShareLink: () => void
  /** 导出 */
  doExportHtml: () => void
  doExportMd: () => void
  doExportImage: () => void
  doExportCoverHorizontal: () => void
  doExportCoverSquare: () => void
  /** 本地动作 */
  handleClear: () => void
  handleLoadSample: () => void
  handleLoadReference: () => void
  handleLoadShowcase: () => void
  handleSaveSelection: () => void
  handleFixZhTypo: () => void
}

export function buildCommands(deps: BuildCommandsDeps): ComputedRef<Command[]> {
  const { modKey } = deps
  return computed<Command[]>(() => {
    void deps.draftIndexTick.value // 触发 listDrafts() 重读
    const list: Command[] = []
    list.push({ id: 'copy', title: '复制为微信富文本', group: '操作', shortcut: `${modKey} ↵`, run: deps.handleCopy })
    list.push({ id: 'save', title: '保存当前草稿', group: '操作', shortcut: `${modKey} S`, run: deps.handleSave })
    list.push({ id: 'clear', title: '清空正文', group: '操作', run: deps.handleClear })
    list.push({ id: 'load-sample', title: '载入当前主题示例', group: '操作', run: deps.handleLoadSample })
    list.push({ id: 'load-reference', title: '载入当前主题组件参考', group: '操作', keywords: '参考 reference 组件 全集', run: deps.handleLoadReference })
    list.push({ id: 'load-showcase', title: '载入全功能展示', group: '操作', keywords: 'showcase 全功能 全部容器 全部变体 高级 advanced', run: deps.handleLoadShowcase })
    list.push({ id: 'save-selection', title: '保存选区为组件', group: '操作', run: deps.handleSaveSelection })
    list.push({ id: 'fix-zh-typo', title: '一键修复中文排版', group: '操作', run: deps.handleFixZhTypo })

    list.push({ id: 'toggle-drafts', title: deps.drawerStates.value.drafts ? '关闭草稿抽屉' : '打开草稿抽屉', group: '视图', shortcut: `${modKey} ⇧ D`, run: () => deps.toggleLeft('drafts') })
    list.push({ id: 'toggle-components', title: deps.drawerStates.value.components ? '关闭组件库' : '打开组件库', group: '视图', shortcut: `${modKey} ⇧ P`, run: () => deps.toggleRight('components') })
    list.push({ id: 'toggle-customizer', title: deps.drawerStates.value.customizer ? '关闭自定义配色' : '打开自定义配色', group: '视图', shortcut: `${modKey} ⇧ C`, run: () => deps.toggleRight('customizer') })
    list.push({ id: 'toggle-checklist', title: deps.drawerStates.value.checklist ? '关闭发文清单' : '打开发文清单', group: '视图', run: () => deps.toggleRight('checklist') })
    list.push({ id: 'open-help', title: '快捷键与帮助', group: '视图', shortcut: '?', run: () => (deps.ui.helpOpen = true) })

    list.push({ id: 'export-html', title: '导出 HTML', group: '导出', shortcut: `${modKey} ⇧ H`, run: deps.doExportHtml })
    list.push({ id: 'export-md', title: '导出 Markdown', group: '导出', shortcut: `${modKey} ⇧ M`, run: deps.doExportMd })
    list.push({ id: 'export-image', title: '导出全文长图', group: '导出', run: deps.doExportImage })
    list.push({ id: 'export-cover-h', title: '导出封面 · 横版 900×383', group: '导出', keywords: '封面 cover 公众号', run: deps.doExportCoverHorizontal })
    list.push({ id: 'export-cover-s', title: '导出封面 · 方版 900×900', group: '导出', keywords: '封面 cover 公众号 方版 缩略图', run: deps.doExportCoverSquare })
    list.push({ id: 'copy-share-link', title: '复制分享链接', group: '导出', run: deps.handleCopyShareLink })

    themeList.forEach((t) => {
      list.push({
        id: `theme-${t.id}`,
        title: `主题 · ${t.name}`,
        group: '主题',
        keywords: `${t.id} theme`,
        run: () => { baseThemeId.value = t.id },
      })
    })

    list.push({
      id: 'new-draft',
      title: '新建草稿',
      group: '草稿',
      run: () => {
        const created = createDraft({ title: '新草稿', body: '# 新草稿\n', themeId: baseThemeId.value })
        deps.handleSelectDraft(created.id)
        deps.draftIndexTick.value += 1
      },
    })
    listDrafts().slice(0, 30).forEach((d) => {
      list.push({
        id: `draft-${d.id}`,
        title: `草稿 · ${d.title || '未命名'}`,
        group: '草稿',
        keywords: d.themeId,
        run: () => deps.handleSelectDraft(d.id),
      })
    })
    return list
  })
}
