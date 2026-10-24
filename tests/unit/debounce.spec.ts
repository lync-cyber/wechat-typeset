/**
 * useDebouncedRender 契约
 *
 * - immediate=true：挂载后立即出首帧（避免空白）
 * - 快速输入 N 次：只应落地最后一次渲染
 * - flush()：立刻用当前源重跑一次，忽略待触发的 timer
 * - 组件卸载：未触发的 timer 必须被清理
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useDebouncedRender, type UseDebouncedRenderOptions } from '../../src/ui/composables/useDebouncedRender'
import { themeRegistry } from '../../src/core/themes'
const defaultTheme = themeRegistry.default
import type { RenderInput, RenderOutput } from '../../src/core/pipeline'

// 用 fake timer 精确控制 80ms 防抖窗口
beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

/**
 * 挂载 composable 到一个壳组件上。Vue 的 composable 必须在 setup 内调用，
 * 因此用 defineComponent 包一层；返回的 ref 通过闭包捕获。
 */
function mount(initialInput: RenderInput, options: UseDebouncedRenderOptions = {}) {
  let api!: ReturnType<typeof useDebouncedRender>
  const source = ref<RenderInput>(initialInput)

  const Holder = defineComponent({
    setup() {
      api = useDebouncedRender(source, { delayMs: 80, immediate: true, ...options })
      return () => h('div')
    },
  })

  const app = (async () => {
    const { createApp } = await import('vue')
    const root = document.createElement('div')
    const instance = createApp(Holder)
    instance.mount(root)
    return { instance, root }
  })()

  return { source, getApi: () => api, app }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: Error) => void
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej })
  return { promise, resolve, reject }
}

describe('useDebouncedRender', () => {
  it('immediate=true：挂载后立刻给出一次渲染', async () => {
    const { getApi, app } = mount({ md: '# hi', theme: defaultTheme })
    await app
    // immediate watch 调用的是 schedule()，仍走 timer，需要 tick 一下
    await vi.advanceTimersByTimeAsync(80)
    const out = getApi().rendered.value as RenderOutput
    expect(out.html).toContain('hi')
  })

  it('连续输入只渲染最后一次（防抖后沿）', async () => {
    const { source, getApi, app } = mount({ md: '# a', theme: defaultTheme })
    await app
    await vi.advanceTimersByTimeAsync(80)
    expect(getApi().rendered.value.html).toContain('a')

    source.value = { md: '# b', theme: defaultTheme }
    await vi.advanceTimersByTimeAsync(30)
    source.value = { md: '# c', theme: defaultTheme }
    await vi.advanceTimersByTimeAsync(30)
    source.value = { md: '# d', theme: defaultTheme }
    // 此时距最后一次修改不足 80ms，还不应更新
    expect(getApi().rendered.value.html).toContain('a')

    await vi.advanceTimersByTimeAsync(80)
    // 到期后应直接跳到 d（不经过 b、c）
    const html = getApi().rendered.value.html
    expect(html).toContain('d')
    expect(html).not.toContain('b</h1>')
    expect(html).not.toContain('c</h1>')
  })

  it('flush() 立即用当前 source 重跑并清定时器', async () => {
    const { source, getApi, app } = mount({ md: '# a', theme: defaultTheme })
    await app
    await vi.advanceTimersByTimeAsync(80)

    source.value = { md: '# flushed', theme: defaultTheme }
    // 不推进时间直接 flush，应该立即看到 flushed
    getApi().flush()
    const html = getApi().rendered.value.html
    expect(html).toContain('flushed')
  })

  it('旧文章图片读取较慢时，不覆盖较新文章的预览', async () => {
    const old = deferred<RenderInput>()
    const recent = deferred<RenderInput>()
    const prepareInput = vi.fn()
      .mockReturnValueOnce(old.promise)
      .mockReturnValueOnce(recent.promise)
    const { source, getApi, app } = mount({ md: '# 旧文', theme: defaultTheme }, { prepareInput })
    const { instance } = await app
    await vi.advanceTimersByTimeAsync(80)
    source.value = { md: '# 新文', theme: defaultTheme }
    await vi.advanceTimersByTimeAsync(80)
    recent.resolve({ ...source.value, md: '# 新文图片完成' })
    await nextTick()
    expect(getApi().rendered.value.html).toContain('新文图片完成')
    old.resolve({ md: '# 旧文图片完成', theme: defaultTheme })
    await nextTick()
    expect(getApi().rendered.value.html).not.toContain('旧文')
    instance.unmount()
  })

  it('flush 等待解析期间的新输入完成后才返回', async () => {
    const first = deferred<RenderInput>()
    const latest = deferred<RenderInput>()
    const prepareInput = vi.fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(latest.promise)
    const { source, getApi, app } = mount({ md: '# 正在输入', theme: defaultTheme }, { prepareInput })
    const { instance } = await app
    let completed = false
    const flushing = Promise.resolve(getApi().flush()).then(() => { completed = true })
    source.value = { md: '# 最后输入', theme: defaultTheme }
    await nextTick()
    first.resolve({ md: '# 正在输入', theme: defaultTheme })
    await nextTick()
    expect(completed).toBe(false)
    expect(prepareInput).toHaveBeenLastCalledWith(source.value)
    latest.resolve({ ...source.value, md: '# 最后输入图片完成' })
    await flushing
    expect(getApi().rendered.value.html).toContain('最后输入图片完成')
    instance.unmount()
  })

  it('并发 flush 共享一次等待，不互相使对方的结果过期', async () => {
    const pending = deferred<RenderInput>()
    const prepareInput = vi.fn(() => pending.promise)
    const input = { md: '# 图片', theme: defaultTheme }
    const { getApi, app } = mount(input, { prepareInput })
    const { instance } = await app
    const first = getApi().flush()
    const second = getApi().flush()
    expect(first).toBe(second)
    pending.resolve(input)
    await Promise.all([first, second])
    expect(prepareInput).toHaveBeenCalledOnce()
    expect(getApi().rendered.value.html).toContain('图片')
    instance.unmount()
  })

  it('最新解析失败时显示错误并拒绝 flush，防止复制旧预览', async () => {
    const error = new Error('文件权限已失效')
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const prepareInput = vi.fn().mockRejectedValue(error)
    const { getApi, app } = mount({ md: '# 图片', theme: defaultTheme }, { prepareInput })
    const { instance } = await app
    await expect(getApi().flush()).rejects.toThrow('文件权限已失效')
    expect(getApi().rendered.value.html).toContain('文件权限已失效')
    instance.unmount()
    consoleError.mockRestore()
  })

  it('组件卸载后不再应用异步图片解析结果', async () => {
    const pending = deferred<RenderInput>()
    const { getApi, app } = mount({ md: '# 图片', theme: defaultTheme }, { prepareInput: () => pending.promise })
    const { instance } = await app
    await vi.advanceTimersByTimeAsync(80)
    instance.unmount()
    pending.resolve({ md: '# 已离开页面', theme: defaultTheme })
    await nextTick()
    expect(getApi().rendered.value.html).toBe('')
  })
})
