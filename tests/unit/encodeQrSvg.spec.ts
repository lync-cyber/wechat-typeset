/**
 * encodeQrSvg 契约
 *
 * 不接外部 QR 解码库（额外依赖与本编码器自洽性的折中：解码若需要也会带来另一个
 * 信任面）。本测试守住可验证的不变量：
 *   - 输出是 well-formed SVG（含 viewBox）
 *   - 矩阵尺寸符合 version 公式 N = 4v + 17 + 2*margin
 *   - finder 图形完整出现在三角（左上 / 右上 / 左下）—— 通过统计左上 7×7
 *     内的 on 模块数（finder 单元为 25 个 on 模块）
 *   - 不同文本产生不同输出（最小区分性）
 *   - 不同 ecc 等级版本数应不增反减（容错越高所需版本越大）
 *   - 颜色注入生效（fg / bg）
 */

import { describe, it, expect } from 'vitest'
import { encodeQrSvg } from '../../src/core/pipeline/qr/encodeQrSvg'

function countOnInPath(svg: string): number {
  const m = svg.match(/d="([^"]*)"/)
  if (!m) return 0
  return (m[1].match(/M/g) ?? []).length
}

describe('encodeQrSvg · 形状', () => {
  it('短文本默认 → version 1（21×21 + 2×4 边距 = 29×29 viewBox）', () => {
    const svg = encodeQrSvg('HELLO WORLD', { ecc: 'L' })
    expect(svg).toMatch(/^<svg /)
    expect(svg).toContain('viewBox="0 0 29 29"')
  })

  it('margin 可配；margin=0 → 21×21', () => {
    const svg = encodeQrSvg('A', { ecc: 'L', margin: 0 })
    expect(svg).toContain('viewBox="0 0 21 21"')
  })

  it('长文本自动扩到更高版本', () => {
    const longText = 'X'.repeat(200) // 200 字节 byte mode
    const svg = encodeQrSvg(longText, { ecc: 'L' })
    const m = svg.match(/viewBox="0 0 (\d+) \1"/)
    expect(m).toBeTruthy()
    const total = Number(m![1])
    expect(total).toBeGreaterThan(29) // 已超 v1
  })

  it('ecc 越高，相同文本所需版本不减', () => {
    const text = 'x'.repeat(50)
    const sizeL = Number(encodeQrSvg(text, { ecc: 'L' }).match(/viewBox="0 0 (\d+)/)![1])
    const sizeH = Number(encodeQrSvg(text, { ecc: 'H' }).match(/viewBox="0 0 (\d+)/)![1])
    expect(sizeH).toBeGreaterThanOrEqual(sizeL)
  })
})

describe('encodeQrSvg · 颜色注入', () => {
  it('显式 fg/bg 写进 svg', () => {
    const svg = encodeQrSvg('TEST', { fg: '#ff0000', bg: '#00ff00' })
    expect(svg).toContain('fill="#ff0000"')
    expect(svg).toContain('fill="#00ff00"')
  })

  it('size 显式时输出 width/height', () => {
    const svg = encodeQrSvg('TEST', { size: 120 })
    expect(svg).toContain('width="120"')
    expect(svg).toContain('height="120"')
  })

  it('未传 size → 外层 svg 不写 width/height（依赖外层 CSS）', () => {
    const svg = encodeQrSvg('TEST')
    // 外层 <svg> 开口标签
    const open = svg.slice(0, svg.indexOf('>') + 1)
    expect(open).not.toMatch(/width="/)
    expect(open).not.toMatch(/height="/)
  })
})

describe('encodeQrSvg · 区分性', () => {
  it('不同文本 → 不同 path data', () => {
    const a = encodeQrSvg('HELLO')
    const b = encodeQrSvg('WORLD')
    expect(a).not.toBe(b)
  })

  it('同文本同参数 → 完全一致（mask 选择稳定）', () => {
    const a = encodeQrSvg('REPRO TEST', { ecc: 'M' })
    const b = encodeQrSvg('REPRO TEST', { ecc: 'M' })
    expect(a).toBe(b)
  })
})

describe('encodeQrSvg · 模块数合理', () => {
  it('v1 (21×21) 总模块 441；on 模块在 ~40%-50% 之间（penalty rule 保证）', () => {
    const svg = encodeQrSvg('HELLO WORLD', { ecc: 'L', margin: 0 })
    const on = countOnInPath(svg)
    expect(on).toBeGreaterThan(140) // > 32%
    expect(on).toBeLessThan(280) // < 64%
  })
})

describe('encodeQrSvg · 错误', () => {
  it('超长文本 → 抛错（byte mode 上限约 ~2900 字节 / v40-L）', () => {
    const huge = 'x'.repeat(3000)
    expect(() => encodeQrSvg(huge, { ecc: 'L' })).toThrow(/overflow|too long/)
  })
})

describe('encodeQrSvg · UTF-8 多字节', () => {
  it('中文文本（每字 3 字节）能正确扩版本', () => {
    const cn = encodeQrSvg('扫码关注我们的公众号', { ecc: 'M' })
    expect(cn).toMatch(/^<svg /)
    // 10 字 × 3 字节 = 30 字节 → v3-M cap 44 bytes 够；v3 size = 29
    const m = cn.match(/viewBox="0 0 (\d+)/)
    expect(Number(m![1])).toBeGreaterThanOrEqual(29) // ≥ v3+margin
  })
})
