/**
 * CSSObject → inline style 字符串。
 *
 * 容器渲染器需要把 `ctx.containers.<slot>`（主题层 baseContainers + spec.containers 深合并后的产物）
 * 落到 wrapper / 内部小元素的 `style="..."` 属性里——themeCSS.ts 走 `<style>` 标签那条路是
 * 给 .markdown-body 选择器用的；容器内部的 token 驱动 inline style 必须用本工具串成字面值，
 * 才能在 juice 内联前就附在 DOM 上、避免被微信粘贴时的 CSS 提取/外联规则吞掉。
 *
 * 历史：R2 前本函数在 databrief.ts 与 signature.ts 各有一份完全相同的实现（含注释），
 * 借口是"避免跨文件依赖"——但两份代码维护成本远高于一个共享 helper，且任何边界条件演进
 * （单位推断、!important、空值处理）必然产生主题渲染分裂。本文件是单一真相。
 *
 * 行为：
 *   - undefined / null / '' 整体值跳过
 *   - number 默认补 px（与 themeCSS.ts 同语义）
 *   - string 仅 trim，不做单位推断（调用方自己写好单位）
 *   - key 也 trim，但保留连字符（kebab-case 是 CSS 原生）
 */

import type { CSSObject } from '../../../themes/types'

export function inlineCss(obj: CSSObject | undefined): string {
  if (!obj) return ''
  const decls: string[] = []
  for (const [k, raw] of Object.entries(obj)) {
    if (raw === undefined || raw === null || raw === '') continue
    const v = typeof raw === 'number' ? `${raw}px` : String(raw).trim()
    if (!v) continue
    decls.push(`${k.trim()}:${v}`)
  }
  return decls.join(';')
}
