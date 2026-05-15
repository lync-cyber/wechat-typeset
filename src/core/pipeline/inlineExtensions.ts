/**
 * 行内扩展清单：单一真源。capabilities.json / writer-docs / skill references 全部读这一份。
 * 新增扩展必须同时在 markdown.ts (插件 / 规则) 与本表登记。
 */

export interface InlineExtensionSpec {
  syntax: string
  description: string
  /** 触发该扩展的正则（字符串形态，下游 LLM 直接消费）。 */
  regex: string
  /** 作者输入样例（markdown 源码片段）。 */
  inputExample: string
  /** 渲染后等价 HTML 片段（含包裹元素），便于下游做"反向匹配 / 预览校验"。 */
  outputHtmlExample: string
}

export const INLINE_EXTENSIONS: readonly InlineExtensionSpec[] = Object.freeze([
  {
    syntax: '==mark==',
    description: '荧光笔高亮（markdown-it-mark）',
    regex: '==([^=]+)==',
    inputExample: '==重点==',
    outputHtmlExample: '<mark>重点</mark>',
  },
  {
    syntax: '~~del~~',
    description: 'GFM 删除线',
    regex: '~~([^~]+)~~',
    inputExample: '~~已废弃~~',
    outputHtmlExample: '<s>已废弃</s>',
  },
  {
    syntax: '++ins++',
    description: '插入（markdown-it-ins）',
    regex: '\\+\\+([^+]+)\\+\\+',
    inputExample: '++新增++',
    outputHtmlExample: '<ins>新增</ins>',
  },
  {
    syntax: '[.text.]',
    description: '中文着重号',
    regex: '\\[\\.([^\\n]+?)\\.\\]',
    inputExample: '[.核心论点.]',
    outputHtmlExample: '<span class="wx-emphasis">核心论点</span>',
  },
  {
    syntax: '[~text~]',
    description: '波浪下划线',
    regex: '\\[~([^\\n]+?)~\\]',
    inputExample: '[~引文出处~]',
    outputHtmlExample: '<span class="wx-wavy">引文出处</span>',
  },
])
