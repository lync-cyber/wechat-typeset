// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, shallowReactive } from 'vue'
import WritingStyleDialog from '../../src/ui/components/WritingStyleDialog.vue'
import { defaultWritingStyles, type WritingStylesConfig } from '../../src/domain/publish/writingStyles'

const unmounts: (() => void)[] = []
const dialogMethods = ['showModal', 'close'] as const
let dialogPrototype: HTMLDialogElement
let originalDialogMethods: Map<string, PropertyDescriptor | undefined>

function mountDialog(options: { selectedId?: string; error?: string; canEdit?: boolean } = {}) {
  const config = defaultWritingStyles()
  config.styles[0].name = '原配置'
  const state = shallowReactive({ config, selectedId: config.defaultId, error: '', canEdit: true, loading: false, saving: false, ...options })
  const save = vi.fn<(config: WritingStylesConfig) => void>()
  const reload = vi.fn()
  const host = document.createElement('div')
  document.body.append(host)
  const app = createApp(defineComponent({
    setup: () => () => h(WritingStyleDialog, { ...state, onSave: save, onReload: reload }),
  }))
  unmounts.push(() => { app.unmount(); host.remove() })
  app.mount(host)
  const nameInput = () => host.querySelector<HTMLInputElement>('input[id$="-name"]')!
  const button = (text: string) => [...host.querySelectorAll<HTMLButtonElement>('button')].find((node) => node.textContent === text)!
  async function rename(name: string) {
    await nextTick()
    nameInput().value = name
    nameInput().dispatchEvent(new Event('input', { bubbles: true }))
    await nextTick()
  }
  async function submit() {
    host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    await nextTick()
  }
  return { state, host, save, reload, nameInput, button, rename, submit }
}

beforeEach(() => {
  // isolate:false 会复用 Vue 的 document 缓存；实际节点原型可能属于前一个 jsdom realm。
  const host = document.createElement('div')
  const probe = createApp({ render: () => h('dialog') })
  try {
    probe.mount(host)
    dialogPrototype = Object.getPrototypeOf(host.firstElementChild!) as HTMLDialogElement
  } finally {
    probe.unmount()
    host.remove()
  }
  originalDialogMethods = new Map(dialogMethods.map((name) => [name, Object.getOwnPropertyDescriptor(dialogPrototype, name)]))
  for (const name of dialogMethods) Object.defineProperty(dialogPrototype, name, { configurable: true, value: vi.fn() })
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})
afterEach(() => {
  unmounts.splice(0).forEach((unmount) => unmount())
  vi.restoreAllMocks()
  for (const name of dialogMethods) {
    const original = originalDialogMethods.get(name)
    if (original) Object.defineProperty(dialogPrototype, name, original)
    else Reflect.deleteProperty(dialogPrototype, name)
  }
})

describe('写作风格配置的保存与恢复', () => {
  it('未知文章风格提示不妨碍确认配置保存成功', async () => {
    const view = mountDialog({ selectedId: 'missing', error: '本文写作风格不存在，请重新选择。' })
    await view.rename('已保存配置')
    await view.submit()
    expect(view.save).toHaveBeenCalledOnce()
    view.state.saving = true
    await nextTick()
    view.state.config = structuredClone(view.save.mock.calls[0][0])
    view.state.saving = false
    await nextTick()
    expect(view.host.textContent).toContain('已保存全部写作风格。')
    expect(view.host.querySelector('.dirty-label')).toBeNull()
    expect(view.button('保存全部').disabled).toBe(true)
    expect(view.host.textContent).toContain('本文写作风格不存在')
  })

  it('写入失败保留修改和重试入口，即使标准化后的提交等于原配置', async () => {
    const view = mountDialog()
    await view.rename(' 原配置 ')
    await view.submit()
    expect(view.save.mock.calls[0][0].styles[0].name).toBe('原配置')
    view.state.saving = true
    await nextTick()
    view.state.error = '写作风格未保存：浏览器存储写入失败。'
    view.state.saving = false
    await nextTick()
    expect(view.host.textContent).not.toContain('已保存全部写作风格。')
    expect(view.nameInput().value).toBe(' 原配置 ')
    expect(view.button('保存全部').disabled).toBe(false)
    expect(view.host.querySelector('.dirty-label')).not.toBeNull()
  })

  it('损坏配置时禁止编辑和保存，修复重载后恢复', async () => {
    const view = mountDialog({ canEdit: false, error: '写作风格未载入：JSON 格式错误。' })
    expect(view.host.querySelector<HTMLFieldSetElement>('.fields')!.disabled).toBe(true)
    expect(view.button('保存全部').disabled).toBe(true)
    expect(view.button('重新载入').disabled).toBe(false)
    view.button('重新载入').click()
    expect(view.reload).toHaveBeenCalledOnce()
    view.state.loading = true
    await nextTick()
    const fixed = structuredClone(view.state.config)
    fixed.styles[0].name = '修复的配置'
    view.state.config = fixed
    view.state.error = ''
    view.state.canEdit = true
    view.state.loading = false
    await nextTick()
    expect(view.nameInput().value).toBe('修复的配置')
    expect(view.host.querySelector<HTMLFieldSetElement>('.fields')!.disabled).toBe(false)
    expect(view.host.textContent).toContain('已重新载入写作风格。')
  })

  it('未知文章风格不妨碍重载成功后重置已确认放弃的编辑', async () => {
    const view = mountDialog({ selectedId: 'missing', error: '本文写作风格不存在，请重新选择。' })
    await view.rename('将放弃的编辑')
    view.button('重新载入').click()
    view.state.loading = true
    await nextTick()
    view.state.config = structuredClone(view.state.config)
    view.state.loading = false
    await nextTick()
    expect(view.nameInput().value).toBe('原配置')
    expect(view.host.querySelector('.dirty-label')).toBeNull()
    expect(view.host.textContent).toContain('已重新载入写作风格。')
  })

  it.each([false, true])('配置来源切换时保留编辑并阻止写入新来源（内容改变：%s）', async (changed) => {
    const view = mountDialog()
    await view.rename('旧文章库的待保存编辑')
    const next = structuredClone(view.state.config)
    if (changed) next.styles[0].name = '另一个文章库'
    view.state.config = next
    await nextTick()
    expect(view.nameInput().value).toBe('旧文章库的待保存编辑')
    expect(view.host.textContent).toContain('配置已在其他位置更新')
    expect(view.button('保存全部').disabled).toBe(true)
    await view.submit()
    expect(view.save).not.toHaveBeenCalled()
  })
})
