// wxPatch 用浏览器 DOMParser；Node 下缺，jsdom 顶上。import 一次即可，幂等。
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
