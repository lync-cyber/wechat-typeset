/**
 * wxPatch 变更计数 —— 供"渲染透明度面板"展示本次渲染对原始 HTML 做的适配。
 *
 * 为什么走"扫描计数"而不是"改装每个 patch 返回 log"：
 *   所有 patch 都是幂等的（满足"看到已处理标记跳过"的性质），因此
 *   **扫描尚未修补的 HTML** 得到的目标数 === 即将被修补的元素数。
 *   这样每个 patch 的函数签名无需改变，测试也不需要配合重写；计数逻辑在
 *   单一模块里维护，一次 DOM 遍历拿到全部数据。
 *
 * 与 wxPatch/index.ts 的约束关系：
 *   每新增一个 patch，此处对应加一段扫描。Stage 3 当前覆盖：
 *     - patchListWrap          （listWrap + deepList 两条）
 *     - stripForbiddenAttrs    （id + position/top/z-index 等）
 *     - stripForbiddenTags     （hard-remove + 非白名单 iframe）
 *     - stripFontFamily
 *     - patchFlexToFallback
 *     - patchSvgIds
 *   暂不计入（实现代价大于信息增益）：patchSvgUrlQuotes / patchSvgWhiteBg —— 这两
 *   个属于"字符级样式修正"，不产生结构变动，作者无需在透明度面板感知。
 */

import {
  isInSvg,
  parseFragment,
  parseStyle,
  walkElements,
} from './utils'
import {
  FORBIDDEN_POSITION_PROPS,
  HARD_REMOVE_TAGS,
  IFRAME_SRC_ALLOW,
} from '../rules'

export interface PatchLogEntry {
  /** patch 函数名（稳定键，供测试断言） */
  patch: string
  /** 面向作者的中文说明（给 UI 用） */
  label: string
  /** 命中次数（元素 / 声明 / 节点） */
  count: number
}

export interface PatchLog {
  entries: PatchLogEntry[]
  /** Σ entries[i].count —— 给"共 N 处修改"文案用 */
  total: number
}

const WRAP_MARKER = 'data-wx-list-wrap'
const KEEP_FLEX_MARKER = 'data-wx-keep-flex'
const ID_WHITELIST = /^(fn|fnref|footnote)[-\d]/i

/**
 * 扫描 juice 内联后、wxPatch 应用前的 HTML，返回即将被各 patch 命中的次数。
 * 解析失败 / 空 HTML 返回空 log，不抛异常。
 */
export function inspectPatchTargets(html: string): PatchLog {
  const counts = {
    listWrap: 0,
    deepList: 0,
    strippedId: 0,
    strippedPos: 0,
    hardTag: 0,
    disallowedIframe: 0,
    fontFamily: 0,
    flexFallback: 0,
    svgId: 0,
  }

  if (html && html.trim()) {
    try {
      const { container } = parseFragment(html)
      walkElements(container, (el) => {
        if (el === container) return // `__wx_root__` 是 parseFragment 的包壳，不属于用户 HTML
        const tag = el.tagName.toLowerCase()

        if (tag === 'ul' || tag === 'ol') {
          const parent = el.parentElement
          if (!parent || !parent.hasAttribute(WRAP_MARKER)) counts.listWrap++
          // 深层嵌套计数：祖先 <ul>/<ol> 正好 2 层 → 本节点是第三层根
          let depth = 0
          let cur: Element | null = el.parentElement
          while (cur) {
            const t = cur.tagName.toLowerCase()
            if (t === 'ul' || t === 'ol') depth++
            cur = cur.parentElement
          }
          if (depth === 2) counts.deepList++
        }

        if (el.hasAttribute('id')) {
          const id = el.getAttribute('id') ?? ''
          if (isInSvg(el)) counts.svgId++
          else if (!ID_WHITELIST.test(id)) counts.strippedId++
        }

        if (HARD_REMOVE_TAGS.has(tag)) counts.hardTag++
        if (tag === 'iframe') {
          const src = el.getAttribute('src') ?? ''
          const allowed = IFRAME_SRC_ALLOW.some((re) => re.test(src))
          if (!allowed) counts.disallowedIframe++
        }

        const style = el.getAttribute('style')
        if (style) {
          const decls = parseStyle(style)
          for (const d of decls) {
            const prop = d.prop.toLowerCase()
            if (FORBIDDEN_POSITION_PROPS.has(prop)) counts.strippedPos++
            if (prop === 'font-family') counts.fontFamily++
            if (
              prop === 'display' &&
              /flex/i.test(d.value) &&
              !el.hasAttribute(KEEP_FLEX_MARKER)
            ) {
              counts.flexFallback++
            }
          }
        }
      })
    } catch {
      // parse 失败：返回空 log，别阻塞渲染
    }
  }

  const entries: PatchLogEntry[] = []
  if (counts.listWrap)
    entries.push({ patch: 'patchListWrap', label: '列表外包 <section>（保住外边距）', count: counts.listWrap })
  if (counts.deepList)
    entries.push({ patch: 'patchListWrap', label: '≥ 3 层嵌套列表扁平化为段落', count: counts.deepList })
  if (counts.strippedId)
    entries.push({ patch: 'stripForbiddenAttrs', label: '删除 id 属性（脚注锚点除外）', count: counts.strippedId })
  if (counts.strippedPos)
    entries.push({ patch: 'stripForbiddenAttrs', label: '剥离 position/top/z-index 等定位声明', count: counts.strippedPos })
  if (counts.hardTag)
    entries.push({ patch: 'stripForbiddenTags', label: '移除 style/script/meta/link 等标签', count: counts.hardTag })
  if (counts.disallowedIframe)
    entries.push({ patch: 'stripForbiddenTags', label: '剥离非白名单 iframe', count: counts.disallowedIframe })
  if (counts.fontFamily)
    entries.push({ patch: 'stripFontFamily', label: '剥离 inline font-family', count: counts.fontFamily })
  if (counts.flexFallback)
    entries.push({ patch: 'patchFlexToFallback', label: 'display:flex → block 降级', count: counts.flexFallback })
  if (counts.svgId)
    entries.push({ patch: 'patchSvgIds', label: 'SVG 子树 id 清理', count: counts.svgId })

  return {
    entries,
    total: entries.reduce((s, e) => s + e.count, 0),
  }
}
