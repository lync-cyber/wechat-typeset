/**
 * patchListWrap：把每个 ul/ol 外层包一层 <section>，并把列表级行间样式复制到 section。
 *
 * 为什么：
 *   微信编辑器的后处理会吞掉 ul/ol 上的若干 margin / padding 声明，
 *   导致列表与上下段落贴死。标准 workaround 是外包一个 section，
 *   在 section 上承载 margin，让列表节点本身只承载内部排版。
 *
 * 幂等：
 *   如果 ul/ol 的 parentElement 已经是"我们加上"的 section（标记 data-wx-list-wrap=""），
 *   则跳过。这样重复调用或和编辑器已经处理过的产物共存不会层层嵌套。
 *
 * 附加：嵌套列表自愈
 *   ≥ 3 层嵌套 (ancestor <ul>/<ol> ≥ 2) 的列表在公众号里缩进会把正文压到右半边，
 *   读起来灾难。这里把深层列表递归扁平化为 `<p>· content</p>` 段落序列，
 *   保留语义顺序，再交给下游 section-wrap。diagnose.ts 侧会在 markdown 源码层
 *   提前给作者红线，这里是兜底。
 */

import { parseFragment, serializeFragment, walkElements } from './utils'

const WRAP_MARKER = 'data-wx-list-wrap'
const FLATTEN_MARKER = 'data-wx-list-flatten'
/** 深层列表扁平化后段落前缀——视觉上仍能识别为列表项，但不再占用缩进预算。 */
const FLATTEN_BULLET = '· '

export function patchListWrap(html: string): string {
  const { container } = parseFragment(html)

  // 1) 先扁平化 ≥ 3 层嵌套的列表（深度 ≥ 2 的 <ul>/<ol> 为外层"太深"子树根）
  //    只收集"depth === 2"那一层，递归 flatten 会顺带吃掉更深的 4/5 层。
  //    这一步必须在 section-wrap 之前，否则扁平化会误操作已包好的层级计数。
  const deepRoots: HTMLElement[] = []
  walkElements(container, (el) => {
    const tag = el.tagName.toLowerCase()
    if (tag !== 'ul' && tag !== 'ol') return
    if (listDepth(el) === 2) deepRoots.push(el as HTMLElement)
  })
  for (const list of deepRoots) {
    const flat = flattenDeepList(list)
    list.parentElement?.replaceChild(flat, list)
  }

  // 2) 先收集，再改写——避免边遍历边变更结构
  const lists: HTMLElement[] = []
  walkElements(container, (el) => {
    const tag = el.tagName.toLowerCase()
    if (tag !== 'ul' && tag !== 'ol') return
    const parent = el.parentElement
    if (parent && parent.hasAttribute(WRAP_MARKER)) return // 已包
    lists.push(el as HTMLElement)
  })

  for (const list of lists) {
    const section = list.ownerDocument.createElement('section')
    section.setAttribute(WRAP_MARKER, '')
    // 复制 margin 到 section，减少外部间距塌陷
    const listStyle = list.getAttribute('style') ?? ''
    if (listStyle) {
      section.setAttribute('style', listStyle)
    }
    list.parentElement?.insertBefore(section, list)
    section.appendChild(list)
  }

  return serializeFragment(container)
}

/** 数"当前节点之上"的 <ul>/<ol> 祖先数（不含自身）。depth 0 = 顶层列表，2 = 第三层。 */
function listDepth(el: Element): number {
  let depth = 0
  let cur: Element | null = el.parentElement
  while (cur) {
    const tag = cur.tagName.toLowerCase()
    if (tag === 'ul' || tag === 'ol') depth++
    cur = cur.parentElement
  }
  return depth
}

/**
 * 把一个 <ul>/<ol> 子树递归扁平化为 DocumentFragment（一串 <p data-wx-list-flatten>）。
 *
 * 处理顺序：
 *   先递归把每个 <li> 内部的 <ul>/<ol> 换成"扁平段落"，然后把 <li> 自己的
 *   inline 内容也裹成带 bullet 前缀的 <p>，最后把两段顺序拼入结果 fragment。
 *
 * 不保留 <li>、不保留嵌套 <ul>/<ol>——这是"扁平化"的定义。作者如果需要保留结构，
 * 应在编辑期看到 diagnose 的 list-too-deep 红线后自己改短。
 */
function flattenDeepList(list: HTMLElement): DocumentFragment {
  const doc = list.ownerDocument
  const out = doc.createDocumentFragment()
  const items = Array.from(list.children).filter(
    (c) => c.tagName.toLowerCase() === 'li',
  ) as HTMLElement[]

  for (const li of items) {
    // 先把 li 里直接嵌套的 <ul>/<ol> 换成扁平片段，原地替换
    const nested = Array.from(li.children).filter((c) => {
      const t = c.tagName.toLowerCase()
      return t === 'ul' || t === 'ol'
    }) as HTMLElement[]
    for (const child of nested) {
      const flat = flattenDeepList(child)
      li.replaceChild(flat, child)
    }

    // 再按"li 自己的内容 → 嵌套扁平段落"的顺序拆出来
    const selfP = doc.createElement('p')
    selfP.setAttribute(FLATTEN_MARKER, '')
    selfP.appendChild(doc.createTextNode(FLATTEN_BULLET))
    const trailingParagraphs: HTMLElement[] = []
    while (li.firstChild) {
      const node = li.firstChild
      if (node.nodeType === 1 && (node as Element).tagName.toLowerCase() === 'p') {
        trailingParagraphs.push(node as HTMLElement)
        li.removeChild(node)
      } else {
        selfP.appendChild(node) // appendChild 会把 node 从 li 中移出
      }
    }
    // 只有 bullet 前缀、没有实质内容时（空 <li>）不产出空段落
    if (selfP.childNodes.length > 1) out.appendChild(selfP)
    for (const p of trailingParagraphs) out.appendChild(p)
  }
  return out
}
