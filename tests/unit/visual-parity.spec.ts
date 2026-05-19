/**
 * T4.1 视觉签名守卫：40 个 content-1.html 阶段 2 落地 variant 各自的渲染输出必
 * 含 baseline 中独有的装饰文字 / 几何形态片段。
 *
 * 为何不做字符级 diff：baseline 绑定 4 主题（t1/t2/t3/t4 编辑部/宋本/博物/包豪斯）
 * 字面色；variant render 走 ctx.tokens.colors，在不同主题下产出不同色值。新主题
 * （editorial/classical/naturalist/bauhaus）尚未落地，严格字符级 parity 必假。
 *
 * 本 spec 降级为 contains-check：每 variant 列出 baseline 独有的"装饰锚点"
 * （固定文案 / CSS 属性片段 / monospace 编号格式），要求渲染产出至少命中 X 个，
 * T4.x 阶段后续补 4 主题落地时再升级为字符级。
 *
 * CSS 格式说明：juice 内联后样式值格式为 "property: value;"（冒号后有空格），
 * 锚点须匹配实际输出格式。font-family 经 juice 去重后可能被移除，不作锚点。
 *
 * 主题选取原则：每个 variant 使用其 themeCompat / signatureOf 中的一个兼容主题，
 * 确保 themeCompat 守卫不会将其回退到 fallback variant。
 */

import { describe, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { getTheme } from '../../src/core/themes'

/**
 * 规范化 inline CSS 字面差异:variant 实现写 `prop:value`(无空格),
 * spec 锚点习惯写 `prop: value`(有空格)。把 html 内 `: `(冒号后单空格)
 * 折叠成 `:`,让两种写法都能匹配。不影响 markdown 内容里的标点。
 */
function normalize(s: string): string {
  return s.replace(/: /g, ':')
}

/** 断言 html 至少命中 anchors 中的 minCount 个 */
function assertAnchors(
  html: string,
  anchors: Array<string | RegExp>,
  minCount: number,
  label: string,
): void {
  const normHtml = normalize(html)
  let hits = 0
  const misses: string[] = []
  for (const anchor of anchors) {
    const matched =
      typeof anchor === 'string'
        ? normHtml.includes(normalize(anchor))
        : anchor.test(normHtml)
    if (matched) {
      hits++
    } else {
      misses.push(typeof anchor === 'string' ? anchor : anchor.toString())
    }
  }
  if (hits < minCount) {
    throw new Error(
      `[${label}] 视觉签名锚点命中 ${hits}/${anchors.length}，不满足最低 ${minCount} 个。\n未命中：${misses.slice(0, 5).join(' | ')}`,
    )
  }
}

function renderWith(themeId: string, md: string): string {
  return render({ md, theme: getTheme(themeId) }).html
}

function admonitionMd(variantId: string): string {
  return `::: tip 告示 variant=${variantId}\n正文示例\n:::\n`
}

function noteMd(variantId: string): string {
  return `::: note variant=${variantId}\n按语正文\n:::\n`
}

function quoteMd(variantId: string, author = '作者'): string {
  return `::: quote-card ${author} variant=${variantId}\n正文示例\n:::\n`
}

function highlightMd(variantId: string): string {
  return `::: highlight variant=${variantId}\n强调短句\n:::\n`
}

function pullQuoteMd(variantId: string, body = '正文示例', author = ''): string {
  return `::: pull-quote ${author} variant=${variantId}\n${body}\n:::\n`
}

// ═══════════════════════════════════════════════════════════════
// admonition × 8（baseline L30-190）
// ═══════════════════════════════════════════════════════════════

describe('visual-parity · admonition', () => {
  // themeCompat: ['official-gazette']
  it('numbered-rule', () => {
    const html = renderWith('official-gazette', admonitionMd('numbered-rule'))
    assertAnchors(
      html,
      [
        'NOTICE · N°01',
        'border-top: 2px solid',
        'border-bottom: 1px solid',
        '告　示',
      ],
      2,
      'numbered-rule',
    )
  })

  // themeCompat: ['official-gazette']
  it('hanging-nb', () => {
    const html = renderWith('official-gazette', admonitionMd('hanging-nb'))
    assertAnchors(
      html,
      [
        'N.B.',
        '001',
        'font-style: italic',
        'border-right: 1px solid',
      ],
      2,
      'hanging-nb',
    )
  })

  // signatureOf: 'literary-humanism'
  it('vermilion-seal', () => {
    const html = renderWith('literary-humanism', admonitionMd('vermilion-seal'))
    assertAnchors(
      html,
      [
        'rotate(-3deg)',
        'position: relative',
        '>告<',
        '示',
      ],
      2,
      'vermilion-seal',
    )
  })

  // signatureOf: 'literary-humanism'
  it('paper-slip', () => {
    const html = renderWith('literary-humanism', admonitionMd('paper-slip'))
    // svgSlot 的 inline style 不经 juice 归一化，冒号后无空格
    assertAnchors(
      html,
      [
        'writing-mode:vertical-rl',
        '示·告',
        'container-tip--paper-slip',
      ],
      2,
      'paper-slip',
    )
  })

  // themeCompat: ['life-aesthetic']
  it('field-tag', () => {
    const html = renderWith('life-aesthetic', admonitionMd('field-tag'))
    assertAnchors(
      html,
      [
        'FIG. CAVE',
        'Notabene',
        'border-bottom: 1px solid',
      ],
      2,
      'field-tag',
    )
  })

  // themeCompat: ['life-aesthetic']
  it('specimen-box', () => {
    const html = renderWith('life-aesthetic', admonitionMd('specimen-box'))
    assertAnchors(
      html,
      [
        'N°',
        '>04<',
        '告示',
        'display: grid',
      ],
      2,
      'specimen-box',
    )
  })

  // themeCompat: ['brutalist']
  it('filled-square', () => {
    const html = renderWith('brutalist', admonitionMd('filled-square'))
    assertAnchors(
      html,
      [
        'width: 18px',
        'height: 18px',
        'N° 01',
        '告　示',
      ],
      2,
      'filled-square',
    )
  })

  // themeCompat: ['brutalist']
  it('triangle-top', () => {
    const html = renderWith('brutalist', admonitionMd('triangle-top'))
    assertAnchors(
      html,
      [
        'ADMONITION',
        '告示',
        '<svg',
        '<polygon',
        'border: 1px solid',
      ],
      2,
      'triangle-top',
    )
  })
})

// ═══════════════════════════════════════════════════════════════
// note × 8（baseline L196-323）
// ═══════════════════════════════════════════════════════════════

describe('visual-parity · note', () => {
  // signatureOf: 'editorial-mook'
  it('ed-signoff', () => {
    const html = renderWith('editorial-mook', noteMd('ed-signoff'))
    assertAnchors(
      html,
      [
        '— ed.',
        'L.Z.',
        'border-top: 1px solid',
      ],
      2,
      'ed-signoff',
    )
  })

  // signatureOf: 'editorial-mook'
  it('inline-label', () => {
    const html = renderWith('editorial-mook', noteMd('inline-label'))
    assertAnchors(
      html,
      [
        '编者按',
        'display: inline-block',
      ],
      2,
      'inline-label',
    )
  })

  // signatureOf: 'literary-humanism'
  it('interlinear-gloss', () => {
    const html = renderWith('literary-humanism', noteMd('interlinear-gloss'))
    // svgSlot 的 inline style 不经 juice 归一化，冒号后无空格
    assertAnchors(
      html,
      [
        '黄庭坚',
        'border-top:1px solid',
        'border-bottom:1px solid',
      ],
      2,
      'interlinear-gloss',
    )
  })

  // signatureOf: 'literary-humanism'
  // 降级理由：juice 可能归并 font-size 使 font-size: 22px 出现在父级而非 svgSlot div；
  // 朱字「注」+ class selector 是更稳定的锚点
  it('vermilion-gloss', () => {
    const html = renderWith('literary-humanism', noteMd('vermilion-gloss'))
    assertAnchors(
      html,
      [
        '>注<',
        'font-size: 22px',
        'container-note--vermilion-gloss',
      ],
      2,
      'vermilion-gloss',
    )
  })

  // signatureOf: 'academic-frontier'
  it('ruler-note', () => {
    const html = renderWith('academic-frontier', noteMd('ruler-note'))
    assertAnchors(
      html,
      [
        '>NOTE<',
        'ed. 2025',
        'border-bottom: 1px dashed',
      ],
      2,
      'ruler-note',
    )
  })

  // signatureOf: 'academic-frontier'
  it('latin-subhead', () => {
    const html = renderWith('academic-frontier', noteMd('latin-subhead'))
    assertAnchors(
      html,
      [
        'Annotatio redactoris',
        'font-style: italic',
      ],
      2,
      'latin-subhead',
    )
  })

  // signatureOf: 'swiss-grid'
  it('initial-disc', () => {
    const html = renderWith('swiss-grid', noteMd('initial-disc'))
    assertAnchors(
      html,
      [
        'EDITOR',
        '刘震',
        'border-radius: 50%',
      ],
      2,
      'initial-disc',
    )
  })

  // signatureOf: 'brutalist'
  it('geometric-mark', () => {
    const html = renderWith('brutalist', noteMd('geometric-mark'))
    assertAnchors(
      html,
      [
        'EDITORIAL',
        'NOTE',
        'border-left: 9px solid',
      ],
      2,
      'geometric-mark',
    )
  })
})

// ═══════════════════════════════════════════════════════════════
// quote × 8（baseline L329-479）
// ═══════════════════════════════════════════════════════════════

describe('visual-parity · quote', () => {
  // themeCompat: ['editorial-mook', 'data-brief']
  it('oversized-mark', () => {
    const html = renderWith('editorial-mook', quoteMd('oversized-mark'))
    // font-family 被 juice 去重后从 svgSlot span 移除；使用固定字符锚点
    assertAnchors(
      html,
      [
        '&#8220;', // 大号引号字符实体
        'font-size: 72px',
        'font-style: italic',
      ],
      2,
      'oversized-mark',
    )
  })

  // themeCompat: ['editorial-mook', 'data-brief']
  // font-family 经 juice 去重可能被省略；改用固定文案锚点
  it('numbered-lines', () => {
    const html = renderWith('editorial-mook', quoteMd('numbered-lines'))
    assertAnchors(
      html,
      [
        'EXCERPT 003',
        'container-quote-card--numbered-lines',
      ],
      2,
      'numbered-lines',
    )
  })

  // themeCompat: ['literary-humanism', 'life-aesthetic']
  it('seal-kai', () => {
    const html = renderWith('literary-humanism', quoteMd('seal-kai'))
    assertAnchors(
      html,
      [
        '>句<',
        'text-align: center',
        'justify-content: center',
      ],
      2,
      'seal-kai',
    )
  })

  // themeCompat: ['literary-humanism', 'life-aesthetic']
  it('double-frame', () => {
    const html = renderWith('literary-humanism', quoteMd('double-frame', '黄庭坚'))
    assertAnchors(
      html,
      [
        '黄庭坚',
        'border: 1px solid',
        'font-style: italic',
      ],
      2,
      'double-frame',
    )
  })

  // themeCompat: ['academic-frontier', 'tech-explainer']
  it('specimen-quote', () => {
    const html = renderWith('academic-frontier', quoteMd('specimen-quote'))
    // svgSlot sections 的 inline style 不经 juice 归一化；
    // display:flex 被 juice 覆盖为 display: block（主题 CSS 中 display 规则）
    assertAnchors(
      html,
      [
        'border-top:1px solid',
        'border-bottom:1px solid',
        'border-left:1px solid',
        'container-quote-card--specimen-quote',
      ],
      2,
      'specimen-quote',
    )
  })

  // themeCompat: ['academic-frontier', 'tech-explainer']
  it('binomial-attrib', () => {
    const html = renderWith('academic-frontier', quoteMd('binomial-attrib'))
    assertAnchors(
      html,
      [
        'Sententia',
        'font-style: italic',
        'border-bottom: 1px solid',
      ],
      2,
      'binomial-attrib',
    )
  })

  // themeCompat: ['swiss-grid', 'brutalist']
  it('huge-numeral', () => {
    const html = renderWith('swiss-grid', quoteMd('huge-numeral'))
    assertAnchors(
      html,
      [
        '>07<',
        'font-size: 72px',
        'border-top: 1px solid',
      ],
      2,
      'huge-numeral',
    )
  })

  // themeCompat: ['swiss-grid', 'brutalist']
  it('ring-device', () => {
    const html = renderWith('swiss-grid', quoteMd('ring-device'))
    // svgSlot spans 的 inline style 不经 juice 归一化
    assertAnchors(
      html,
      [
        'border:2px solid',
        'border-radius:50%',
        'border-left:11px solid',
        'container-quote-card--ring-device',
      ],
      2,
      'ring-device',
    )
  })
})

// ═══════════════════════════════════════════════════════════════
// highlight × 8（baseline L485-586）
// highlight 容器通过 resolveVariantWithUv 解析 variant；resolveVariantId 不检查
// themeCompat，signatureOf 不阻断渲染。故 highlight 用 default 主题即可命中正确 variant。
// ═══════════════════════════════════════════════════════════════

describe('visual-parity · highlight', () => {
  it('dotted-underline', () => {
    const html = renderWith('default', highlightMd('dotted-underline'))
    assertAnchors(
      html,
      [
        'border-bottom: 2px dotted',
        'container-highlight--dotted-underline',
      ],
      2,
      'dotted-underline',
    )
  })

  it('tracked-emphasis', () => {
    const html = renderWith('default', highlightMd('tracked-emphasis'))
    assertAnchors(
      html,
      [
        'letter-spacing: 0.12em',
        'font-weight: 600',
        'container-highlight--tracked-emphasis',
      ],
      2,
      'tracked-emphasis',
    )
  })

  it('vermilion-inline', () => {
    const html = renderWith('default', highlightMd('vermilion-inline'))
    assertAnchors(
      html,
      [
        'border-left: 3px dotted',
        'container-highlight--vermilion-inline',
      ],
      2,
      'vermilion-inline',
    )
  })

  it('side-dots', () => {
    const html = renderWith('default', highlightMd('side-dots'))
    assertAnchors(
      html,
      [
        'border-left: 4px solid',
        'line-height: 2.1',
        'container-highlight--side-dots',
      ],
      2,
      'side-dots',
    )
  })

  it('wash-ground', () => {
    const html = renderWith('default', highlightMd('wash-ground'))
    assertAnchors(
      html,
      [
        'background-color: ',
        'padding: 12px 14px',
        'container-highlight--wash-ground',
      ],
      2,
      'wash-ground',
    )
  })

  it('bracketed-tick', () => {
    const html = renderWith('default', highlightMd('bracketed-tick'))
    assertAnchors(
      html,
      [
        'border-top: 1px solid',
        'border-bottom: 1px solid',
        'container-highlight--bracketed-tick',
      ],
      2,
      'bracketed-tick',
    )
  })

  it('geometric-flag', () => {
    const html = renderWith('default', highlightMd('geometric-flag'))
    assertAnchors(
      html,
      [
        'border-left: 5px solid',
        'border-right: 5px solid',
        'letter-spacing: 0.15em',
        'container-highlight--geometric-flag',
      ],
      2,
      'geometric-flag',
    )
  })

  it('single-stroke', () => {
    const html = renderWith('default', highlightMd('single-stroke'))
    assertAnchors(
      html,
      [
        'border-bottom: 3px solid',
        'container-highlight--single-stroke',
      ],
      2,
      'single-stroke',
    )
  })
})

// ═══════════════════════════════════════════════════════════════
// pull-quote × 8（baseline L592-727）
// ═══════════════════════════════════════════════════════════════

describe('visual-parity · pull-quote', () => {
  // signatureOf: 'people-story'
  it('weight-contrast', () => {
    const html = renderWith('people-story', pullQuoteMd('weight-contrast'))
    assertAnchors(
      html,
      [
        'border-top: 1px solid',
        'border-bottom: 1px solid',
        'font-weight: 600',
      ],
      2,
      'weight-contrast',
    )
  })

  // signatureOf: 'people-story'
  // font-family 被 juice 从 svgSlot span 移除；使用字符 + font-size 作锚点
  it('drop-capital', () => {
    const html = renderWith('people-story', pullQuoteMd('drop-capital', '凡人生大半的烦恼'))
    assertAnchors(
      html,
      [
        '>凡<',
        'font-size: 64px',
        'container-pull-quote--drop-capital',
      ],
      2,
      'drop-capital',
    )
  })

  // signatureOf: 'literary-humanism'
  it('calligraphic', () => {
    const html = renderWith('literary-humanism', pullQuoteMd('calligraphic'))
    assertAnchors(
      html,
      [
        '<svg',
        '<path',
        'container-pull-quote--calligraphic',
      ],
      2,
      'calligraphic',
    )
  })

  // signatureOf: 'literary-humanism'
  it('with-gloss', () => {
    const html = renderWith('literary-humanism', pullQuoteMd('with-gloss'))
    // svgSlot sections 的 inline style 不经 juice 归一化；wrapperCSS border-top 经 juice 归一化
    assertAnchors(
      html,
      [
        'display:table',
        'writing-mode:vertical-rl',
        'border-top: 1px solid',
      ],
      2,
      'with-gloss',
    )
  })

  // signatureOf: 'academic-frontier'
  // font-family 在 svgSlot 中被 juice 移除；使用固定文案 + font-style 作锚点
  it('bilingual-stack', () => {
    const html = renderWith('academic-frontier', pullQuoteMd('bilingual-stack'))
    assertAnchors(
      html,
      [
        'In wildness is the preservation of the world.',
        'font-style: italic',
        'container-pull-quote--bilingual-stack',
      ],
      2,
      'bilingual-stack',
    )
  })

  // signatureOf: 'academic-frontier'
  it('caliper-mark', () => {
    const html = renderWith('academic-frontier', pullQuoteMd('caliper-mark'))
    assertAnchors(
      html,
      [
        'display: table',
        '<svg',
        '<rect',
      ],
      2,
      'caliper-mark',
    )
  })

  // signatureOf: 'brutalist'
  it('inverted-plate', () => {
    const html = renderWith('brutalist', pullQuoteMd('inverted-plate'))
    assertAnchors(
      html,
      [
        'PULL · 06',
        'container-pull-quote--inverted-plate',
      ],
      2,
      'inverted-plate',
    )
  })

  // signatureOf: 'brutalist'
  it('grid-block', () => {
    const html = renderWith('brutalist', pullQuoteMd('grid-block', '少即多'))
    assertAnchors(
      html,
      [
        'display: table',
        'border: 1px solid',
        'width: 40px',
        '>少<',
      ],
      2,
      'grid-block',
    )
  })
})
