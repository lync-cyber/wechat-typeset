/**
 * Node 环境下注入 DOMParser/XMLSerializer/document/Node。
 *
 * 原因：wxPatch 后处理用了浏览器 DOMParser；在 tsx / Node 环境下缺，必须先
 * 用 jsdom 塞 globalThis，再 await import('../src/public')。否则会得到
 * "DOMParser is not defined" 错误。
 *
 * 与 packages/cli/src/shim.ts、tests/verify-sample-full.ts 同一套 stub。
 */

import { JSDOM } from 'jsdom'

const dom = new JSDOM('', { url: 'http://localhost/' })
;(globalThis as unknown as { DOMParser: unknown }).DOMParser = dom.window.DOMParser
;(globalThis as unknown as { XMLSerializer: unknown }).XMLSerializer = dom.window.XMLSerializer
;(globalThis as unknown as { document: unknown }).document = dom.window.document
;(globalThis as unknown as { Node: unknown }).Node = dom.window.Node

export {}
