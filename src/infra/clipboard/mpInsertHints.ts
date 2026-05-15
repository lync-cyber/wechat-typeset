/**
 * 在复制路径里把 voice-card / video-card 容器旁注入微信识别的 mpvoice / mpvideo 注释串。
 *
 * 命名分层：作者面 fence 是 voice-card / video-card（语义化）；平台契约
 * （HTML 注释 + data-wx-mp-kind 锚点）仍是 mpvoice / mpvideo（微信后台读这串）。
 * 本模块按 data-wx-mp-kind 检测节点，与 fence 名解耦。
 *
 * 为什么放在 infra/clipboard 而不是渲染管线：
 *   - renderer 不知道下游平台是哪个；mp 注释串是"微信生态专属粘贴技巧"。
 *   - 预览里这些注释纯属噪音；只在复制时为粘贴侧准备。
 *   - 与 outlinkDegrade 同位（剪贴板适配层），调用次序：先 wxPatch，再 outlink，
 *     再 mpInsertHints —— 注释插入是最后一步，避免被 patch 流程吞掉。
 *
 * 注释格式 MP_HINT_FORMAT：
 *   - voice：`<mpvoice name="标题" voice_encode_fileid="xxx"></mpvoice>`
 *   - video：`<mpvideo vid="xxx" name="标题"></mpvideo>`
 *   公众号实测发现"伪标签"形式比纯 HTML 注释更稳定被编辑器吃进——本工具仍以注释
 *   占位（避免被任何 sanitizer 当成未知标签剥掉），格式常量集中在 MP_HINT_TEMPLATES，
 *   后续真机验证后可统一改字符串。
 *
 * 幂等：识别到节点前已存在 `data-wx-mp-hint="emitted"` 标记则跳过；同一篇 HTML
 *   多次复制不会累加注释。
 */

export interface MpHintResult {
  html: string
  /** 被注入提示的 section 数量 */
  count: number
}

/**
 * 注释主体（不含外层 `<!-- -->`）。createComment 会在序列化时补包。
 */
export const MP_HINT_TEMPLATES = {
  voice: (fileid: string | null, name: string | null): string => {
    const parts: string[] = ['mpvoice']
    if (name) parts.push(`name="${name}"`)
    if (fileid) parts.push(`voice_encode_fileid="${fileid}"`)
    return ` ${parts.join(' ')} `
  },
  video: (vid: string | null, fileid: string | null, name: string | null): string => {
    const parts: string[] = ['mpvideo']
    if (vid) parts.push(`vid="${vid}"`)
    if (fileid) parts.push(`video_encode_fileid="${fileid}"`)
    if (name) parts.push(`name="${name}"`)
    return ` ${parts.join(' ')} `
  },
} as const

/**
 * 扫描 html 里所有 `[data-wx-mp-kind]` section，在每个节点前插入对应注释串。
 *
 * - 没有 DOMParser（Node / 测试环境无 jsdom）或 html 为空时原样返回。
 * - data 属性来源于 container/media.ts open 行；attr 值在序列化时已经 HTML-escape，
 *   注释格式里直接消费 textContent 化的字符串避免双重转义。
 */
export function insertMpHints(html: string): MpHintResult {
  if (!html) return { html, count: 0 }
  if (typeof DOMParser === 'undefined') return { html, count: 0 }

  const doc = new DOMParser().parseFromString(
    `<!doctype html><html><body>${html}</body></html>`,
    'text/html',
  )
  const body = doc.body
  const nodes = Array.from(body.querySelectorAll('[data-wx-mp-kind]'))
  if (nodes.length === 0) return { html, count: 0 }

  let injected = 0
  for (const el of nodes) {
    if (el.getAttribute('data-wx-mp-hint') === 'emitted') continue
    const kind = el.getAttribute('data-wx-mp-kind')
    const name = el.getAttribute('data-wx-mp-name')
    const fileid = el.getAttribute('data-wx-mp-fileid')
    let body: string
    if (kind === 'voice') {
      body = MP_HINT_TEMPLATES.voice(fileid, name)
    } else if (kind === 'video') {
      const vid = el.getAttribute('data-wx-mp-vid')
      body = MP_HINT_TEMPLATES.video(vid, fileid, name)
    } else {
      continue
    }
    const commentNode = doc.createComment(body)
    const parent = el.parentNode
    if (!parent) continue
    parent.insertBefore(commentNode, el)
    el.setAttribute('data-wx-mp-hint', 'emitted')
    injected += 1
  }

  if (injected === 0) return { html, count: 0 }
  return { html: body.innerHTML, count: injected }
}
