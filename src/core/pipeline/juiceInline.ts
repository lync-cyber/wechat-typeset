/**
 * juice/client 封装
 *
 * 输入：包含 <style> 块的完整 HTML 片段（字符串）
 * 输出：<style> 被内联到元素 style 属性后的 HTML 字符串，<style> 被移除
 *
 * 注意：juice/client 的导出是 inlineContent(html, css, options) 而非 Node 版本
 * 的 juiceFile / juiceResources。我们这里把 <style>…</style> 抽出来手动调用。
 */

import juice from 'juice'

/**
 * last-result 单格缓存：防抖击键期间 bodyHtml / themeCss 都未变时（连续触发
 * 同一参数的 render），跳过 juice.inlineContent。juice 是同步 CPU 密集（大文
 * 档 50~150ms），但产出对 (htmlWithStyle) 是纯函数 → 字符串相等即可命中。
 *
 * 不用 Map：juice 调用在击键防抖路径上，最近一次输入即是热数据，再往前的
 * (theme A → theme B → theme A) 回切场景频率远低于单 theme 内连续触发。
 * 多格 Map 占用键字符串开销不划算。
 */
let lastInput: string | null = null
let lastOutput: string | null = null

export function inlineHtml(htmlWithStyle: string): string {
  if (lastInput !== null && lastInput === htmlWithStyle) return lastOutput as string

  // 抽出所有 <style> 内容作为 CSS；原位置替换为空
  const styles: string[] = []
  const htmlWithoutStyle = htmlWithStyle.replace(
    /<style[^>]*>([\s\S]*?)<\/style>/gi,
    (_, css: string) => {
      styles.push(css)
      return ''
    },
  )
  const css = styles.join('\n')
  const out = !css.trim()
    ? htmlWithoutStyle
    : juice.inlineContent(htmlWithoutStyle, css, {
        inlinePseudoElements: false,
        preserveImportant: false,
        preserveMediaQueries: false,
        preserveFontFaces: false,
        removeStyleTags: true,
      })

  lastInput = htmlWithStyle
  lastOutput = out
  return out
}
