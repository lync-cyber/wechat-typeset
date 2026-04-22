/**
 * 站外链接降级 · 粘贴到微信前的 HTML 后处理
 *
 * 背景：微信公众号正文里读者点不开站外链接（只是纯文本样式），会让"看起来蓝蓝的
 * 超链接"变成骗点击的视觉陷阱。按作者偏好提供三种处理：
 *
 *   - keep      保持原样（包括蓝色下划线），作者明知有这一局限
 *   - tail-list 正文把超链接替换为上角标 `[N]`，文末追加有序列表「参考链接」
 *   - drop      直接剥掉 `<a>`，只留文本，视觉彻底不误导
 *
 * 仅识别 `http(s)://` 开头的 href；`#anchor` / `mailto:` / `tel:` 不做处理。
 * 已剥完的文档再次送入 `degradeOutlinks` 会返回 `count: 0`（幂等）——
 * 这也让 `handleCopy` 重复点击时不会重复追加参考列表。
 *
 * **例外**：带 `data-wx-footer-cta` 标记的 `<a>` 不降级——footer-cta 是作者
 * 核心转化入口（关注引导 / 阅读原文 / 小程序跳转），让它走 keep 语义。非白名单
 * URL 的告警由 diagnose 的 `footer-cta-outlink` 规则在编辑期提示。
 */

export type OutlinkStrategy = 'keep' | 'tail-list' | 'drop'

export const OUTLINK_STRATEGIES: readonly OutlinkStrategy[] = ['keep', 'tail-list', 'drop']

export const OUTLINK_STRATEGY_LABEL: Record<OutlinkStrategy, string> = {
  keep: '保留',
  'tail-list': '尾注',
  drop: '丢弃',
}

export interface DegradeResult {
  html: string
  /** 被影响的外链数量 */
  count: number
}

const EXTERNAL_RE = /^https?:\/\//i

export function degradeOutlinks(html: string, strategy: OutlinkStrategy): DegradeResult {
  if (strategy === 'keep' || !html) return { html, count: 0 }
  if (typeof DOMParser === 'undefined') return { html, count: 0 }

  const doc = new DOMParser().parseFromString(
    `<!doctype html><html><body>${html}</body></html>`,
    'text/html',
  )
  const body = doc.body
  // 已处理的文档特征：body 末尾挂着 `data-wx-outlink-list`；再来一遍不会新增
  const already = body.querySelector('ol[data-wx-outlink-list]')
  const anchors = Array.from(body.querySelectorAll('a'))
  const externals = anchors
    .map((el) => ({ el, href: el.getAttribute('href') ?? '' }))
    .filter(({ el, href }) => EXTERNAL_RE.test(href) && !el.hasAttribute('data-wx-footer-cta'))

  if (externals.length === 0) return { html, count: 0 }

  if (strategy === 'drop') {
    for (const { el } of externals) {
      const parent = el.parentNode
      if (!parent) continue
      while (el.firstChild) parent.insertBefore(el.firstChild, el)
      parent.removeChild(el)
    }
    return { html: body.innerHTML, count: externals.length }
  }

  // strategy === 'tail-list'
  const list = doc.createElement('ol')
  list.setAttribute('data-wx-outlink-list', '')
  externals.forEach(({ el, href }, idx) => {
    const n = idx + 1
    const marker = doc.createElement('sup')
    marker.setAttribute('data-wx-outlink-ref', String(n))
    marker.textContent = `[${n}]`

    const parent = el.parentNode
    if (!parent) return
    // 把 <a> 的子节点升到外层，紧跟一个 sup 上角标；保留原文本含格式
    while (el.firstChild) parent.insertBefore(el.firstChild, el)
    parent.insertBefore(marker, el)
    parent.removeChild(el)

    const li = doc.createElement('li')
    li.textContent = href
    list.appendChild(li)
  })

  if (!already) {
    const heading = doc.createElement('p')
    heading.setAttribute('data-wx-outlink-heading', '')
    heading.textContent = '参考链接'
    body.appendChild(heading)
    body.appendChild(list)
  } else {
    // 之前已有尾注块则把新条目拼到现有列表后（复制同一篇时追加不重建）
    while (list.firstChild) already.appendChild(list.firstChild)
  }

  return { html: body.innerHTML, count: externals.length }
}
