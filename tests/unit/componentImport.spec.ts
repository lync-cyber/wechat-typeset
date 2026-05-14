/**
 * componentImport · share-component hash → mutations.createComponent 接收端契约
 *
 * 锁：
 *   - peekComponentShareHash 仅识别 share-component= 前缀；不消费副作用
 *   - tryImportComponentFromHash 走 mutations → validateSnippet 兜底
 *   - 非法 markdown → ok=false reason='validation'，不写 storage
 *   - 解析失败 → ok=false reason='parse'
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  peekComponentShareHash,
  tryImportComponentFromHash,
} from '../../src/infra/share/payloads/componentImport'
import {
  buildUrl,
} from '../../src/infra/share/codec'
import {
  componentCodec,
  wrapComponentSnapshot,
  type ComponentSnapshot,
} from '../../src/infra/share/payloads/component'
import { listUserComponents, deleteUserComponent } from '../../src/infra/storage/userComponents'

function clearStorage(): void {
  if (typeof localStorage !== 'undefined') localStorage.clear()
  for (const c of listUserComponents()) deleteUserComponent(c.id)
}

const goodSnapshot: ComponentSnapshot = {
  id: 'uc_test_001',
  name: '测试组件',
  description: '一段合法 tip',
  kind: 'admonition',
  variantId: 'accent-bar',
  markdownSnippet: '::: tip variant=accent-bar\nhello\n:::\n',
  thumbnailSvg: '<svg></svg>',
}

beforeEach(() => clearStorage())

describe('peekComponentShareHash', () => {
  it('识别合法 share-component hash', () => {
    const url = buildUrl(componentCodec, wrapComponentSnapshot(goodSnapshot), {
      origin: '',
      pathname: '',
    })
    const hash = url.slice(url.indexOf('#'))
    const peek = peekComponentShareHash(hash)
    expect(peek).not.toBeNull()
    expect(peek!.component.name).toBe('测试组件')
  })

  it('article share hash → null（前缀不匹配）', () => {
    expect(peekComponentShareHash('#share=eyJ2IjoxLCJtZCI6Img...')).toBeNull()
  })

  it('空 hash / 无 hash → null', () => {
    expect(peekComponentShareHash('')).toBeNull()
    expect(peekComponentShareHash('#')).toBeNull()
  })
})

describe('tryImportComponentFromHash · 合法路径', () => {
  it('合法 snapshot → mutations.createComponent → storage 落地', () => {
    const url = buildUrl(componentCodec, wrapComponentSnapshot(goodSnapshot), {
      origin: '',
      pathname: '',
    })
    const hash = url.slice(url.indexOf('#'))
    const res = tryImportComponentFromHash(hash)
    expect(res.ok).toBe(true)
    if (res.ok) {
      expect(res.name).toBe('测试组件')
      // storage 真的写了
      const list = listUserComponents()
      expect(list.some((c) => c.name === '测试组件')).toBe(true)
    }
  })
})

describe('tryImportComponentFromHash · 失败路径', () => {
  it('解析失败 → ok=false reason=parse', () => {
    const res = tryImportComponentFromHash('#share=garbage')
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.reason).toBe('parse')
  })

  it('非法 markdown（未注册 fence）→ reason=validation，不写 storage', () => {
    const badSnap: ComponentSnapshot = {
      ...goodSnapshot,
      markdownSnippet: '::: unknown-fence\nx\n:::\n',
    }
    const url = buildUrl(componentCodec, wrapComponentSnapshot(badSnap), {
      origin: '',
      pathname: '',
    })
    const hash = url.slice(url.indexOf('#'))
    const before = listUserComponents().length
    const res = tryImportComponentFromHash(hash)
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.reason).toBe('validation')
    expect(listUserComponents().length).toBe(before)
  })
})
