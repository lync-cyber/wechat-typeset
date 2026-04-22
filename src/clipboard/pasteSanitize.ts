/**
 * 富文本粘贴清洗 —— HTML → markdown 降级。
 *
 * 为什么：
 *   作者常把 Word / 公众号后台 / 其他博客的选段复制进编辑器，浏览器默认把
 *   `text/html` 原样塞进 CodeMirror，于是 markdown 文本里混入 `<span style="...">`、
 *   `class="x"`、`<p style="...">` 等大片脏数据，违反 writer-contract "只写 22 容器"
 *   的承诺。我们在 paste 事件里抢先把 HTML 降级成 markdown 段落 / 列表，作者
 *   看到的就是干净文本。
 *
 * 降级边界（**不重建自定义容器**）：
 *   - 标题、段落、列表、链接、图片、内联强调、代码块、引用块 —— 走 turndown
 *   - 我们的 22 个自定义容器（tip/cover/compare/...）**不**尝试反向识别：
 *     站外粘贴来源不会带 `::: name` 标记，强行猜只会拼错 —— 降级为普通段落 +
 *     列表即可，作者需要哪个容器再自己挪到 `:::` 里。
 *   - 完全无 HTML 的 `text/plain` 粘贴直接交回 CM 默认行为。
 */

import TurndownService from 'turndown'

/**
 * 单例 turndown，不跨调用变配置。
 *
 * 选项选择：
 *   - headingStyle: 'atx' —— `# h1` 风格，与项目样稿一致
 *   - bulletListMarker: '-' —— writer-contract 默认
 *   - codeBlockStyle: 'fenced' —— ``` 而非缩进（缩进会和列表续行冲突）
 *   - emDelimiter: '*' / strongDelimiter: '**' —— 避免 `_` 在中文里被误识为下划线
 */
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
  hr: '---',
})

/**
 * 清掉粘贴源里常见的纯噪声节点：
 *   - `<style>` / `<script>` / `<meta>` / `<link>`（Word 会带大段 XML style 岛）
 *   - `<o:p>` Word 专属 XML
 *   - 保留 `<span>` 但 turndown 默认会丢掉无语义包裹，这里不用专门处理
 */
turndown.remove(['style', 'script', 'meta', 'link', 'title'] as never[])

// Word 的 "mso-*" 属性和 `<o:p>` 等 XML 命名空间标签是噪声——保留的话会渲染成字面量。
turndown.addRule('wordXmlNs', {
  filter: (node) => {
    const tag = node.nodeName.toLowerCase()
    return tag.startsWith('o:') || tag.startsWith('w:') || tag.startsWith('v:')
  },
  replacement: () => '',
})

/**
 * 把粘贴事件里的 HTML 字符串降级为 markdown。
 *
 * 输入是**已由浏览器 sanitize 过**的 `text/html` —— 常见形态是 Word 的 "CF_HTML"
 * 片段（带 `<!--StartFragment-->` / `<!--EndFragment-->` 注释）。turndown 会按文档
 * 结构遍历，我们只需做最小前置清洗。
 *
 * @returns 清洗后的 markdown 字符串；若 html 为空或仅空白，返回空串
 */
export function sanitizePastedHtml(html: string): string {
  if (!html || !html.trim()) return ''

  // 截取 Word / Office 的 StartFragment/EndFragment 之间的真实内容
  const startMatch = html.match(/<!--\s*StartFragment\s*-->/i)
  const endMatch = html.match(/<!--\s*EndFragment\s*-->/i)
  let body = html
  if (startMatch && endMatch) {
    const start = (startMatch.index ?? 0) + startMatch[0].length
    const end = endMatch.index ?? html.length
    body = html.slice(start, end)
  }

  const md = turndown.turndown(body)
  // turndown 结果末尾常带一串空行——压到最多两个换行（markdown 段落分隔足够）
  return md.replace(/\n{3,}/g, '\n\n').trim()
}

/**
 * 判断 `clipboardData` 是否"值得走 HTML 降级"。
 *
 * 纯 `text/plain`、或 HTML 实际只是包一层 `<p>` 的 plain-text（典型：CodeMirror
 * 间的复制）—— 都交给浏览器默认粘贴。
 */
export function shouldSanitize(data: DataTransfer | null): boolean {
  if (!data) return false
  const types = Array.from(data.types ?? [])
  if (!types.includes('text/html')) return false
  const html = data.getData('text/html')
  // 仅 `<meta charset>` + 一层包裹视为"无结构 HTML"，走默认 text/plain 粘贴
  const textish = html.replace(/<meta[^>]*>/gi, '').trim()
  if (/^<p[^>]*>[^<]*<\/p>$/i.test(textish)) return false
  return true
}
