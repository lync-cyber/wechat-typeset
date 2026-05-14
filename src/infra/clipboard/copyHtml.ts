/**
 * 剪贴板写入：富文本（text/html）+ 纯文本（text/plain）双写
 *
 * 路径：
 *   1. Clipboard API（首选）—— 仅在 secure context + ClipboardItem 可用时尝试。
 *      Safari 要求 ClipboardItem 的 value 是 Blob 或 Promise<Blob>，且必须处在
 *      用户手势同步栈顶——传 `Promise.resolve(blob)` 让 Safari 把异步 Blob 准备
 *      视为合法手势内写入，而非"越过手势窗口"。
 *   2. execCommand('copy') 降级 —— 非 secure context / 权限被拒 / API 抛错时走
 *      隐藏 contenteditable 节点 + Selection 路径。这条路径在没有 HTTPS 的本地
 *      file:// 与公司内网 http 部署里仍是唯一可用方案。
 */

export interface CopyResult {
  ok: boolean
  mode: 'clipboard-api' | 'exec-command' | 'failed'
  error?: string
}

export async function copyHtmlToClipboard(html: string, plain: string): Promise<CopyResult> {
  // 首选 Clipboard API
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    typeof ClipboardItem !== 'undefined'
  ) {
    try {
      // Safari 要求 ClipboardItem 的 value 是 Blob 或 Promise<Blob>，且构造必须处在用户
      // 手势同步栈顶。传 Promise.resolve(Blob) 即可让 Safari 认识"异步准备好后写入"的语义，
      // 而不是把异步 await 之后的 new Blob 误判为越过手势窗口。
      const htmlBlob = new Blob([html], { type: 'text/html' })
      const plainBlob = new Blob([plain], { type: 'text/plain' })
      const item = new ClipboardItem({
        'text/html': Promise.resolve(htmlBlob),
        'text/plain': Promise.resolve(plainBlob),
      })
      await navigator.clipboard.write([item])
      return { ok: true, mode: 'clipboard-api' }
    } catch (err) {
      // 继续尝试降级
      // eslint-disable-next-line no-console
      console.warn('[copyHtml] Clipboard API failed, fallback to execCommand:', err)
    }
  }

  // 降级：execCommand('copy') —— 需要先选中一个 contenteditable 节点
  try {
    const container = document.createElement('div')
    container.setAttribute('contenteditable', 'true')
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.innerHTML = html
    document.body.appendChild(container)

    const range = document.createRange()
    range.selectNodeContents(container)
    const selection = window.getSelection()
    if (!selection) throw new Error('no selection')
    selection.removeAllRanges()
    selection.addRange(range)

    const ok = document.execCommand('copy')
    selection.removeAllRanges()
    document.body.removeChild(container)

    if (!ok) throw new Error('execCommand copy returned false')
    return { ok: true, mode: 'exec-command' }
  } catch (err) {
    return { ok: false, mode: 'failed', error: String(err) }
  }
}
