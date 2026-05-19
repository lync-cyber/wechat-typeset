// pipeline 的 wxPatch 用浏览器 DOMParser；Node 下缺，jsdom 顶上。一次性副作用 import。
// 与 packages/cli/src/shim.ts 同源——两处独立持有，避免 tools/ 反向依赖 packages/cli/。
import { JSDOM } from 'jsdom'

const g = globalThis as unknown as {
  DOMParser?: unknown
  XMLSerializer?: unknown
  document?: unknown
  Node?: unknown
}

if (!g.DOMParser) {
  const dom = new JSDOM('', { url: 'http://localhost/' })
  g.DOMParser = dom.window.DOMParser
  g.XMLSerializer = dom.window.XMLSerializer
  g.document = dom.window.document
  g.Node = dom.window.Node
}

export {}
