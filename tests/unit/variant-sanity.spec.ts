/**
 * Variant Sanity 契约（v2 P1 同质化修复后的回归基线）
 *
 * 覆盖矩阵：
 *   6 kind 容器类（admonition / quote / compare / steps / divider / sectionTitle）
 *     × 23 个 variant
 *     × 5 套主题（default / tech-geek / life-aesthetic / business-finance / literary-humanism）
 *   + 1 kind 非容器类（codeBlock）— 走 md.options.highlight 而非 `:::` 容器栈，单独成组测试
 *     × 2 个 variant（bare / header-bar）
 *     × 5 套主题
 *
 * 每组容器 render 必须：
 *   ① 零抛错（variant 代码不炸、themeCSS 守卫不炸、juice / wxPatch 全程不炸）
 *   ② 输出含 `container-{kindName}--{variantId}` 双 class（组件库 UI 反查点）
 *   ③ HTML 全文不得出现被微信剥离的 CSS（position:/float:/@media/@keyframes/:hover/:active/-webkit-）
 *   ④ HTML 内嵌 SVG 不得出现 id 属性 / url('…') / url("…")（粘贴到公众号会坏）
 *   ⑤ juice 后不再残留 <style> 标签（主题 CSS 已全部内联到元素 style 属性）
 *
 * 另有每个 variant 在默认主题下的 inline snapshot，任何 variant 代码改动都会被测试显式捕获。
 */

import { describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeList, defaultTheme } from '../../src/core/themes'
import { VARIANT_IDS, type VariantKind } from '../../src/core/themes/types'
import { FORBIDDEN_CSS_PATTERNS } from '../../src/core/pipeline/rules'

type Kind = VariantKind
type VariantCase = {
  kind: Kind
  id: string
  /** 用于生成 markdown fence 的容器名 */
  containerName: string
  md: string
}

/** 构造 6 大类的测试 fence */
function buildCases(): VariantCase[] {
  const out: VariantCase[] = []
  for (const id of VARIANT_IDS.admonition) {
    out.push({
      kind: 'admonition',
      id,
      containerName: 'tip',
      md: `::: tip 测试标题 variant=${id}\n第一行正文。\n第二行正文，含 ==高亮== 与 \`code\`。\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.quote) {
    out.push({
      kind: 'quote',
      id,
      containerName: 'quote-card',
      md: `::: quote-card 苏轼 variant=${id}\n人生如逆旅，我亦是行人。\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.compare) {
    out.push({
      kind: 'compare',
      id,
      containerName: 'compare',
      md:
        `:::: compare variant=${id}\n\n` +
        `::: pros 正方\n- 要点 A\n- 要点 B\n:::\n\n` +
        `::: cons 反方\n- 要点 C\n- 要点 D\n:::\n\n` +
        `::::\n`,
    })
  }
  for (const id of VARIANT_IDS.steps) {
    out.push({
      kind: 'steps',
      id,
      containerName: 'steps',
      md:
        `::: steps 操作步骤 variant=${id}\n` +
        `### 第一步\n准备材料。\n\n` +
        `### 第二步\n下锅翻炒。\n\n` +
        `### 第三步\n起锅装盘。\n` +
        `:::\n`,
    })
  }
  for (const id of VARIANT_IDS.divider) {
    out.push({
      kind: 'divider',
      id,
      containerName: 'divider',
      md: `::: divider variant=${id}${id === 'glyph' ? ' glyph=◆' : ''}\n:::\n`,
    })
  }
  for (const id of VARIANT_IDS.sectionTitle) {
    out.push({
      kind: 'sectionTitle',
      id,
      containerName: 'section-title',
      md: `::: section-title 章节标题 variant=${id}\n:::\n`,
    })
  }
  // M-5 pull-quote
  for (const id of VARIANT_IDS.pullQuote) {
    out.push({
      kind: 'pullQuote',
      id,
      containerName: 'pull-quote',
      md: `::: pull-quote variant=${id}\n我们以为在阅读，其实只是在滑动。\n:::\n`,
    })
  }
  // M-3 announcement
  for (const id of VARIANT_IDS.announcement) {
    out.push({
      kind: 'announcement',
      id,
      containerName: 'announcement',
      md: `::: announcement tone=danger variant=${id} 测试通告\n本期推送涉及账号迁移说明。\n:::\n`,
    })
  }
  // M-4 table-card：嵌套 4 冒号外，3 冒号内 table-row
  for (const id of VARIANT_IDS.tableCard) {
    out.push({
      kind: 'tableCard',
      id,
      containerName: 'table-card',
      md:
        `:::: table-card 规格对比 variant=${id}\n` +
        `::: table-row header=true cells="型号 | 容量 | 价格"\n:::\n` +
        `::: table-row cells="A | 256G | ¥6999"\n:::\n` +
        `::: table-row cells="B | 512G | ¥8999"\n:::\n` +
        `::::\n`,
    })
  }
  // M-2 gallery：嵌套 image-item
  for (const id of VARIANT_IDS.gallery) {
    out.push({
      kind: 'gallery',
      id,
      containerName: 'gallery',
      md:
        `:::: gallery 春夏秋冬 variant=${id}\n` +
        `::: image-item src="https://placehold.co/400" alt="A" 春\n:::\n` +
        `::: image-item src="https://placehold.co/400" alt="B" 夏\n:::\n` +
        `::::\n`,
    })
  }
  // M-1 dialogue：嵌套 dialogue-turn
  for (const id of VARIANT_IDS.dialogue) {
    out.push({
      kind: 'dialogue',
      id,
      containerName: 'dialogue',
      md:
        `:::: dialogue 主编访谈 variant=${id}\n` +
        `::: dialogue-turn name="主持人" role="Q"\n你怎么看这次转向？\n:::\n` +
        `::: dialogue-turn name="张三" role="A"\n转向是必然的，但节奏会更慢。\n:::\n` +
        `::::\n`,
    })
  }
  return out
}

const CASES = buildCases()

// 禁用模式来自 src/pipeline/rules.ts · FORBIDDEN_CSS_PATTERNS（单一事实来源）
function assertNoForbiddenCss(html: string, label: string): void {
  for (const [pattern, reason] of FORBIDDEN_CSS_PATTERNS) {
    if (pattern.test(html)) {
      throw new Error(`[${label}] 产出命中禁用 CSS：${reason}. match=${html.match(pattern)?.[0]}`)
    }
  }
}

/** 抓出所有 inline SVG 片段（从 `<svg` 到 `</svg>`） */
function extractSvgs(html: string): string[] {
  const out: string[] = []
  const re = /<svg[\s\S]*?<\/svg>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) out.push(m[0])
  return out
}

function assertSvgSafe(html: string, label: string): void {
  for (const svg of extractSvgs(html)) {
    expect(svg, `${label} · SVG 含 id=`).not.toMatch(/\sid="/)
    expect(svg, `${label} · SVG 含 url('`).not.toMatch(/url\(['"]/)
  }
}

// -------------------- 主矩阵：5 × 23 = 115 组合全部跑一遍 --------------------

for (const theme of themeList) {
  describe(`${theme.id} · variant sanity`, () => {
    for (const c of CASES) {
      const label = `${theme.id} · ${c.kind}:${c.id}`
      it(label, () => {
        const { html } = render({ md: c.md, theme })

        // ① 非空产物
        expect(html.length, label).toBeGreaterThan(0)

        // ② 双 class：container-X + container-X--{id}
        const baseRe = new RegExp(`class="[^"]*container-${c.containerName}(\\s|--|")`)
        const variantRe = new RegExp(`container-${c.containerName}--${c.id}\\b`)
        expect(html, `${label} 缺基础 class`).toMatch(baseRe)
        expect(html, `${label} 缺 variant class`).toMatch(variantRe)

        // ③ CSS 禁用字清零
        assertNoForbiddenCss(html, label)

        // ④ SVG 无 id / url 引号
        assertSvgSafe(html, label)

        // ⑤ 无 <style>（juice 后应全部内联）
        expect(html, `${label} 残留 <style>`).not.toMatch(/<style\b/i)
      })
    }
  })
}

// -------------------- 跨主题覆盖验证（防止漏跑） --------------------

describe('枚举完整性', () => {
  it('11 kind × N variant 全部进入容器测试矩阵（codeBlock / note / footnotes 走独立组）', () => {
    const totals: Record<string, number> = {}
    for (const c of CASES) totals[c.kind] = (totals[c.kind] ?? 0) + 1
    expect(totals).toEqual({
      admonition: 19, // +1: news-row (data-brief) +1: news-underline (swiss-grid) +1: mook-tag (editorial-mook)
      quote: 7, // +1: tilted-sticker (brutalist) +1: editorial-block (editorial pull-quote) +1: left-bar (日常引用)
      compare: 4, // +1: data-card (data-brief 家族)
      steps: 5, // +2 P0-A: step-card / split-row（卡片化分步 / 学术分栏）
      divider: 6, // +1: seal-mark (swiss-grid 家族收束印章)
      sectionTitle: 5, // +3 P0-A: number-prefix / kicker-stack / ribbon-stamp
      pullQuote: 4, // M-5: giant-mark / centered-rule / stamp-quote / margin-pull
      announcement: 4, // M-3: danger-bar / mono-disclaimer / ai-notice / stamped-banner
      tableCard: 4, // M-4: rule-grid / zebra-rows / key-value / price-tier
      gallery: 4, // M-2: duo / triptych / nine-grid / ribbon-strip
      dialogue: 4, // M-1: qa-rows / chat-bubbles / name-prefix / interview-column
    })
  })

  it('codeBlock 的 5 个 variant 全部在 VARIANT_IDS 登记', () => {
    expect([...VARIANT_IDS.codeBlock]).toEqual([
      'bare',
      'header-bar',
      'line-numbers',
      'terminal-frame',
      'inline-card',
    ])
  })

  it('全部已注册主题都进入矩阵', () => {
    expect(themeList.map((t) => t.id)).toEqual([
      'default',
      'tech-geek',
      'tech-explainer',
      'business-finance',
      'data-brief',
      'industry-observer',
      'commerce-pulse',
      'literary-humanism',
      'people-story',
      'editorial-mook',
      'late-night-vinyl',
      'life-aesthetic',
      'edu-classroom',
      'academic-frontier',
      'official-gazette',
      'swiss-grid',
      'brutalist',
      'youth-zine',
    ])
  })
})

// -------------------- HTML 片段快照（默认主题，每 variant 一条） --------------------

/**
 * 目的：variant wrapperCSS / svgSlot / titleCSS 的任何意外改动都要被显式捕获，
 * 避免被 ① 的"不抛错"和 ② 的"含 class"放行。
 *
 * 取"render 输出里定位到 variant wrapper 的那一段"做快照 —— 避免把整篇 html + 大段主题 CSS 都吸进来。
 */

function sliceVariantChunk(html: string, containerName: string, variantId: string): string {
  const re = new RegExp(
    `<section[^>]*container-${containerName}--${variantId}[\\s\\S]*?</section>`,
  )
  const m = html.match(re)
  return m?.[0] ?? '<no-match>'
}

describe('默认主题 · 每 variant 渲染片段快照', () => {
  for (const c of CASES) {
    it(`${c.kind}:${c.id}`, () => {
      const { html } = render({ md: c.md, theme: defaultTheme })
      const chunk = sliceVariantChunk(html, c.containerName, c.id)
      expect(chunk).not.toBe('<no-match>')
      // 写入 __snapshots__/variant-sanity.spec.ts.snap；首次运行自动生成
      expect(chunk).toMatchSnapshot()
    })
  }
})

// -------------------- codeBlock 专项：走 highlight hook，不是容器栈 --------------------

const CODE_BLOCK_MD = [
  '```javascript',
  "const x = 1",
  "console.log('hi')",
  '```',
  '',
].join('\n')

describe('codeBlock variant · 14 主题 × 5 variant', () => {
  for (const theme of themeList) {
    for (const id of VARIANT_IDS.codeBlock) {
      const label = `${theme.id} · codeBlock:${id}`
      it(label, () => {
        // getMarkdown 按 theme.id 缓存 MD 实例，fence rule 闭包绑死首次创建时的 theme；
        // 覆写 variants 不改 id 会让缓存返回旧实例（variants.codeBlock 被冻结）。
        // 测试里显式拼后缀 id 绕开缓存。
        const themed = {
          ...theme,
          id: `${theme.id}--cb-${id}`,
          variants: { ...theme.variants, codeBlock: id },
        }
        const { html } = render({ md: CODE_BLOCK_MD, theme: themed })

        // 所有 variant 都产出 <pre><code>
        expect(html, `${label} 缺 <pre><code>`).toMatch(/<pre[^>]*>[\s\S]*<code[^>]*>/)

        if (id === 'bare') {
          // bare 零 wrapper —— 与其余 4 个 variant 的差异化识别面
          expect(html, `${label} bare 不应出现 wrapper`).not.toMatch(/wx-code-block/)
        } else {
          // 其余 variant 必须有 wx-code-block--{id} 双 class wrapper
          const wrapperRe = new RegExp(`class="wx-code-block wx-code-block--${id}"`)
          expect(html, `${label} 缺 wrapper`).toMatch(wrapperRe)
        }

        // variant 专属签名特征：避免不同 variant 渲染产物互相退化
        if (id === 'header-bar') {
          expect(html, `${label} header-bar 缺语言标签`).toMatch(/>JAVASCRIPT</)
        } else if (id === 'line-numbers') {
          // 行号 gutter 列存在 + 出现行号 "1" / "2"（CODE_BLOCK_MD 是 2 行）
          expect(html, `${label} line-numbers 缺 gutter`).toMatch(/wx-code-block__gutter/)
        } else if (id === 'terminal-frame') {
          // 窗口腔出现 traffic-light SVG（3 个 circle r="6"）+ 居中标题区
          expect(html, `${label} terminal-frame 缺窗口腔`).toMatch(/wx-code-block__chrome/)
          expect(html, `${label} terminal-frame 缺 traffic-light`).toMatch(/<circle[^>]*r="6"/)
        }
        // inline-card 只断言 wrapper 双 class —— 它的设计语言就是"克制无装饰"

        // 共同约束：CSS 禁用字清零、SVG 安全、无 <style> 残留
        assertNoForbiddenCss(html, label)
        assertSvgSafe(html, label)
        expect(html, `${label} 残留 <style>`).not.toMatch(/<style\b/i)
      })
    }
  }
})
