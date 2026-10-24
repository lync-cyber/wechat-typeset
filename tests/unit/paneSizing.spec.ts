// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { EDITOR_MIN_W, usePaneSizing } from '@/app/usePaneSizing'
import PaneSplitter from '@/ui/components/PaneSplitter.vue'

const cleanups: (() => void)[] = []
const observers: ResizeObserverStub[] = []
const originalWindowWidth = window.innerWidth

class ResizeObserverStub {
  observe = vi.fn()
  disconnect = vi.fn()
  constructor(private readonly callback: ResizeObserverCallback) { observers.push(this) }
  notify(target: Element, width: number) {
    this.callback([{ target, contentRect: { width } } as ResizeObserverEntry], this as unknown as ResizeObserver)
  }
}

function setWindowWidth(value: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value })
}

function measuredElement(width: number) {
  const measured = { element: document.createElement('div'), width }
  vi.spyOn(measured.element, 'getBoundingClientRect').mockImplementation(() => ({ width: measured.width }) as DOMRect)
  return measured
}

function mountSizing(options: { width?: number | null; container?: HTMLElement | null } = {}) {
  const editorWidth = ref<number | null>(options.width ?? null)
  const container = ref<HTMLElement | null>(options.container ?? null)
  let api!: ReturnType<typeof usePaneSizing>
  const app = createApp(defineComponent({
    setup() {
      api = usePaneSizing({ editorWidth, ...('container' in options ? { container } : {}) })
      return () => h('div')
    },
  }))
  app.mount(document.createElement('div'))
  const unmount = () => app.unmount()
  cleanups.push(unmount)
  return { api, editorWidth, container, unmount }
}

function mountSplitter(width: number | null = null) {
  const values: (number | null)[] = []
  const host = document.createElement('div')
  document.body.append(host)
  const app = createApp(defineComponent({
    setup: () => () => h('div', [
      h('section', { class: 'test-editor' }),
      h(PaneSplitter, { width, max: 900, 'onUpdate:width': (value: number | null) => values.push(value) }),
    ]),
  }))
  app.mount(host)
  const editor = host.querySelector<HTMLElement>('.test-editor')!
  const splitter = host.querySelector<HTMLElement>('[role="separator"]')!
  vi.spyOn(editor, 'getBoundingClientRect').mockReturnValue({ width: 600 } as DOMRect)
  Object.defineProperty(splitter, 'offsetLeft', { value: 838 }) // 编辑器 600 + 左侧文章库 238
  cleanups.push(() => { app.unmount(); host.remove() })
  return { splitter, values }
}

beforeEach(() => {
  setWindowWidth(1440)
  observers.length = 0
  vi.stubGlobal('ResizeObserver', ResizeObserverStub)
})
afterEach(() => {
  cleanups.splice(0).reverse().forEach((cleanup) => cleanup())
  setWindowWidth(originalWindowWidth)
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('usePaneSizing', () => {
  it('不传容器时继续按窗口计算，缩窗后回收越界宽度', async () => {
    const state = mountSizing({ width: 1000 })
    expect(state.api.editorMaxWidth.value).toBe(1019)
    setWindowWidth(1200)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(state.api.viewportW.value).toBe(1200)
    expect(state.api.editorMaxWidth.value).toBe(779)
    expect(state.editorWidth.value).toBe(779)
    expect(observers).toHaveLength(0)
  })

  it('按工作区实测宽度扣除预览，工具展开后立即回收编辑器宽度', async () => {
    const area = measuredElement(1202)
    const state = mountSizing({ width: 760, container: area.element })
    await nextTick()
    expect(state.api.editorMaxWidth.value).toBe(781)
    expect(observers[0].observe).toHaveBeenCalledWith(area.element)
    area.width = 882
    observers[0].notify(area.element, area.width)
    await nextTick()
    expect(state.api.editorMaxWidth.value).toBe(461)
    expect(state.editorWidth.value).toBe(461)
    expect(state.api.viewportW.value).toBe(1440)
  })

  it('窄工作区保留 320 下限，默认自动宽度仍是 null', async () => {
    const area = measuredElement(390)
    const state = mountSizing({ container: area.element })
    await nextTick()
    expect(state.api.editorMaxWidth.value).toBe(EDITOR_MIN_W)
    expect(state.editorWidth.value).toBeNull()
  })

  it('容器更换后忽略旧观察回调，卸载释放观察器和窗口监听', async () => {
    const first = measuredElement(1202)
    const second = measuredElement(882)
    const state = mountSizing({ container: first.element })
    state.container.value = second.element
    await nextTick()
    expect(observers[0].observe).toHaveBeenLastCalledWith(second.element)
    observers[0].notify(first.element, 500)
    await nextTick()
    expect(state.api.editorMaxWidth.value).toBe(461)
    cleanups.pop()?.()
    expect(observers[0].disconnect).toHaveBeenCalled()
    setWindowWidth(1000)
    window.dispatchEvent(new Event('resize'))
    expect(state.api.viewportW.value).toBe(1440)
  })

  it('容器临时隐藏时不重置已经设置的宽度', async () => {
    const area = measuredElement(1202)
    const state = mountSizing({ width: 700, container: area.element })
    await nextTick()
    observers[0].notify(area.element, 0)
    await nextTick()
    expect(state.api.editorMaxWidth.value).toBe(781)
    expect(state.editorWidth.value).toBe(700)
  })
})

describe('PaneSplitter', () => {
  it('第一次鼠标拖动从编辑器实际宽度开始，不把文章库宽度算进去', () => {
    const { splitter, values } = mountSplitter()
    splitter.dispatchEvent(new MouseEvent('mousedown', { button: 0, clientX: 838, bubbles: true }))
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 858 }))
    expect(values).toEqual([620])
    window.dispatchEvent(new MouseEvent('mouseup'))
    expect(document.body.classList.contains('splitter-dragging')).toBe(false)
  })

  it('键盘调整使用实际宽度，Home、End 和 Enter 保留既有行为', () => {
    const { splitter, values } = mountSplitter()
    for (const key of ['ArrowRight', 'Home', 'End', 'Enter']) {
      splitter.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
    }
    expect(values).toEqual([624, 320, 900, null])
  })

  it('触摸调整也使用编辑器宽度', () => {
    const { splitter, values } = mountSplitter()
    for (const [type, clientX] of [['touchstart', 838], ['touchmove', 858]] as const) {
      const event = new Event(type, { bubbles: true, cancelable: true })
      Object.defineProperty(event, 'touches', { value: [{ clientX }] })
      splitter.dispatchEvent(event)
    }
    expect(values).toEqual([620])
  })

  it('已设置宽度时仍以显式值为准', () => {
    const { splitter, values } = mountSplitter(450)
    splitter.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(values).toEqual([474])
  })
})
