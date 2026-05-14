/**
 * 容器语法契约
 *
 * 每个容器至少验证：
 *   - fence 语法被识别（产生 class="container-xxx"）
 *   - info 作为标题被注入；attrs 被读取
 *   - 嵌套容器（compare / pros / cons）用 4 vs 3 冒号 fence 长度区分
 */

import { describe, it, expect } from 'vitest'
import { render } from '../../src/core/pipeline'
import { defaultTheme } from '../../src/core/themes/default'

function run(md: string): string {
  return render({ md, theme: defaultTheme }).html
}

describe('admonitions', () => {
  it('tip：识别 fence，注入标题', () => {
    const out = run('::: tip 小贴士\n正文内容\n:::\n')
    expect(out).toMatch(/class="container-tip(\s|")/)
    expect(out).toContain('小贴士')
    expect(out).toContain('正文内容')
  })

  it('warning / info / danger 都识别', () => {
    const out = run(
      '::: warning 注意\na\n:::\n' +
      '::: info 说明\nb\n:::\n' +
      '::: danger 警告\nc\n:::\n',
    )
    expect(out).toMatch(/class="container-warning(\s|")/)
    expect(out).toMatch(/class="container-info(\s|")/)
    expect(out).toMatch(/class="container-danger(\s|")/)
  })

  it('不含 emoji（质感优先）', () => {
    const out = run('::: tip 小贴士\n正文\n:::\n')
    expect(out).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u)
  })
})

describe('intro / cover / author / section-title', () => {
  it('intro 容器识别且 info 成为标题', () => {
    const out = run('::: intro 开场白\n正文\n:::\n')
    expect(out).toMatch(/class="container-intro"/)
    expect(out).toContain('开场白')
  })

  it('author 读取 attrs.role', () => {
    const out = run('::: author 张三 role=前端工程师\n简介\n:::\n')
    expect(out).toMatch(/class="container-author"/)
    expect(out).toContain('张三')
    expect(out).toContain('前端工程师')
  })

  it('section-title 生成独立容器 class', () => {
    const out = run('::: section-title 第一章\n:::\n')
    expect(out).toMatch(/class="container-section-title(\s|")/)
    expect(out).toContain('第一章')
  })
})

describe('quote-card / highlight', () => {
  it('quote-card 识别，byline 通过 info', () => {
    const out = run('::: quote-card 苏轼\n人生如逆旅\n:::\n')
    expect(out).toMatch(/class="container-quote-card(\s|")/)
    expect(out).toContain('人生如逆旅')
    // byline 渲染在关闭后：含"— 苏轼"
    expect(out).toContain('苏轼')
  })

  it('highlight 块识别', () => {
    const out = run('::: highlight\n核心观点\n:::\n')
    expect(out).toMatch(/class="container-highlight"/)
    expect(out).toContain('核心观点')
  })
})

describe('compare · pros · cons 嵌套', () => {
  it('外 4 冒号 + 内 3 冒号 → 两列嵌套', () => {
    const src =
      ':::: compare\n' +
      '::: pros 优点\n优A\n:::\n' +
      '::: cons 缺点\n缺B\n:::\n' +
      '::::\n'
    const out = run(src)
    expect(out).toMatch(/class="container-compare(\s|")/)
    expect(out).toMatch(/class="container-pros(\s|")/)
    expect(out).toMatch(/class="container-cons(\s|")/)
    expect(out).toContain('优A')
    expect(out).toContain('缺B')
  })

  it('两列使用 display:table-cell 保证等高（且不走 flex）', () => {
    const src =
      ':::: compare\n::: pros\nA\n:::\n::: cons\nB\n:::\n::::\n'
    const out = run(src)
    // 外层 table + 内列 table-cell：微信粘贴后保留、两列内容长短不一时等高
    expect(out).toMatch(/container-compare[^>]*display:\s*table/)
    expect(out).toMatch(/container-pros[^>]*display:\s*table-cell/)
    expect(out).toMatch(/container-cons[^>]*display:\s*table-cell/)
    expect(out).not.toMatch(/display:\s*flex/)
  })

  it('两列内部的 p / li 被压到 13px 且 letter-spacing:0（窄栏预算）', () => {
    const src =
      ':::: compare\n' +
      '::: pros 方案 A\n方案 A 的正文。\n\n- 要点一二三四\n:::\n' +
      '::: cons 方案 B\n- 要点一二三四\n:::\n' +
      '::::\n'
    const out = run(src)
    // juice 内联后栏内 p/li 必须落到 13px（否则 CJK 文字在 ~150px 栏里阶梯式换行）
    expect(out).toMatch(/container-pros[\s\S]*?<p[^>]*font-size:\s*13px/)
    expect(out).toMatch(/container-pros[\s\S]*?<li[^>]*font-size:\s*13px/)
    // letter-spacing 必须被覆盖为 0（全局是 1px，窄栏里会多出 ~10% 占宽）
    expect(out).toMatch(/container-pros[\s\S]*?<p[^>]*letter-spacing:\s*0/)
  })
})

describe('steps / divider', () => {
  it('steps 识别', () => {
    const out = run('::: steps 安装步骤\n1. a\n2. b\n:::\n')
    expect(out).toMatch(/class="container-steps(\s|")/)
    expect(out).toContain('安装步骤')
  })

  it('divider variant=wave 产出 SVG 无 id 无 url 引号', () => {
    const out = run('::: divider variant=wave\n:::\n')
    expect(out).toMatch(/class="container-divider(\s|")/)
    expect(out).toMatch(/<svg/)
    // 经 wxPatch：SVG 内部不应有 id
    expect(out).not.toMatch(/<svg[^>]*\sid=/)
  })

  it('divider 默认 variant 为线条', () => {
    const out = run('::: divider\n:::\n')
    expect(out).toMatch(/class="container-divider(\s|")/)
    // 默认 variant=line：用 hr
    expect(out).toMatch(/<hr/)
  })
})

describe('footer-cta / recommend / qrcode', () => {
  it('footer-cta 读取 info 与 cta attr', () => {
    const out = run('::: footer-cta 欢迎关注 cta=点此关注\n描述文案\n:::\n')
    expect(out).toMatch(/class="container-footer-cta"/)
    expect(out).toContain('欢迎关注')
    expect(out).toContain('点此关注')
  })

  it('footer-cta 仅 cta 无 href：渲染为 <span>', () => {
    const out = run('::: footer-cta 标题 cta=点此关注\n:::\n')
    expect(out).toMatch(/<span[^>]*>点此关注<\/span>/)
    expect(out).not.toMatch(/<a\s[^>]*>点此关注<\/a>/)
  })

  it('footer-cta cta + href：渲染为 <a> 带 data-wx-footer-cta 标记', () => {
    const md =
      '::: footer-cta 标题 cta=阅读原篇 href=https://mp.weixin.qq.com/s/abc\n:::\n'
    const out = run(md)
    expect(out).toMatch(
      /<a[^>]*href="https:\/\/mp\.weixin\.qq\.com\/s\/abc"[^>]*data-wx-footer-cta="[^"]*"[^>]*>阅读原篇<\/a>/,
    )
  })

  it('footer-cta href 值里的 & 做 HTML 属性转义', () => {
    const md = '::: footer-cta cta=去 href="https://a.com?x=1&y=2"\n:::\n'
    const out = run(md)
    expect(out).toContain('href="https://a.com?x=1&amp;y=2"')
  })

  it('recommend 块识别', () => {
    const out = run('::: recommend 推荐阅读\n- [A](http://a.com)\n:::\n')
    expect(out).toMatch(/class="container-recommend"/)
    expect(out).toContain('推荐阅读')
  })

  it('qrcode 块识别', () => {
    const out = run('::: qrcode 扫码关注\n:::\n')
    expect(out).toMatch(/class="container-qrcode"/)
    expect(out).toContain('扫码关注')
  })
})

describe('mpvoice / mpvideo', () => {
  it('mpvoice 默认占位卡', () => {
    const out = run('::: mpvoice 本期播客\n:::\n')
    expect(out).toMatch(/class="container-mpvoice"/)
    expect(out).toContain('本期播客')
  })

  it('mpvideo qqvid 渲染腾讯视频 iframe（v.qq.com 白名单）', () => {
    const out = run('::: mpvideo qqvid=w1234abcd 片头\n:::\n')
    expect(out).toMatch(/<iframe[^>]*v\.qq\.com/)
    // 白名单保留
    expect(out).toContain('vid=w1234abcd')
  })

  it('mpvideo 无 qqvid → 占位卡', () => {
    const out = run('::: mpvideo 待补视频\n:::\n')
    expect(out).toMatch(/class="container-mpvideo"/)
    expect(out).not.toMatch(/<iframe/)
  })
})

describe('info / attrs 解析', () => {
  it('attrs 支持引号包围空格值', () => {
    const out = run('::: author 张三 role="高级架构师"\n简介\n:::\n')
    expect(out).toContain('高级架构师')
  })

  it('多个 attrs 共存', () => {
    const out = run('::: divider variant=dots extra=unused\n:::\n')
    expect(out).toMatch(/class="container-divider(\s|")/)
    // dots variant 用 circle
    expect(out).toMatch(/<circle/)
  })
})

describe('signature containers（note / abstract / key-number / see-also）', () => {
  it('note：第五态 fence + 默认标题"补注" + variant 类后缀', () => {
    const out = run('::: note\n正文\n:::\n')
    // R8：note 接入 NoteKind 独立变体类，class 含 container-note + variant 后缀
    expect(out).toMatch(/class="container-note container-note--/)
    expect(out).toContain('补注')
    expect(out).toContain('正文')
  })

  it('note：自定义标题覆盖默认', () => {
    const out = run('::: note 免责声明\n文本\n:::\n')
    expect(out).toContain('免责声明')
  })

  it('abstract：kicker + bgSoft 外框', () => {
    const out = run('::: abstract 摘要\n三句话总结。\n:::\n')
    expect(out).toMatch(/class="container-abstract"/)
    expect(out).toMatch(/class="container-abstract__kicker"/)
    expect(out).toContain('摘要')
    expect(out).toContain('三句话总结')
  })

  it('key-number：attrs.value 驱动大字号数字', () => {
    const out = run('::: key-number 年度 ARR value=45%\nSaaS 企业版拉动。\n:::\n')
    expect(out).toMatch(/class="container-key-number"/)
    expect(out).toMatch(/class="container-key-number__value"/)
    expect(out).toContain('45%')
    expect(out).toContain('年度 ARR')
    expect(out).toContain('SaaS 企业版拉动')
  })

  it('see-also：默认标题"延伸阅读"', () => {
    const out = run('::: see-also\n- [相关 A](https://example.com/a)\n- [相关 B](https://example.com/b)\n:::\n')
    expect(out).toMatch(/class="container-see-also"/)
    expect(out).toContain('延伸阅读')
    expect(out).toMatch(/<a[^>]*href="https:\/\/example\.com\/a"/)
  })
})

describe('footnotes 条目切分（[N] 行 → 独立 <p>）', () => {
  // 报刊脚注 baseContainers.footnotes 已带 padding-left:1.6em + text-indent:-1.6em
  // 的 hanging indent；hanging indent 是块级属性，必须每条 `[N] …` 各自一段才生效。
  // wx_footnotes_entry_split 把作者没留空行写的 `[1]\n[2]\n[3]…` 序列切成多 <p>。
  it('多条 [N] 连写被切成独立 <p>', () => {
    const out = run(
      '::: footnotes\n' +
      '[1]　覆盖 2010–2025，两年滑动窗口。\n' +
      '[2]　深度理解得分取自 24h 回忆测试。\n' +
      '[3]　n=1,024。\n' +
      ':::\n',
    )
    expect(out).toMatch(/class="container-footnotes"/)
    // 三个 <p> 各自承载一条
    const ps = out.match(/<p[\s>]/g) ?? []
    expect(ps.length).toBeGreaterThanOrEqual(3)
    expect(out).toContain('[1]')
    expect(out).toContain('[2]')
    expect(out).toContain('[3]')
    // 切分点的 softbreak 应被吃掉,不会再有 `[2]` 紧跟 `\n[1]` 这种残留
    expect(out).not.toMatch(/\[1\][^<]*\n[\s]*\[2\]/)
  })

  it('单条目（无可切分点）保持单 <p>，不强行新增段落', () => {
    const out = run(
      '::: footnotes\n' +
      '[1]　仅一条脚注内容。\n' +
      ':::\n',
    )
    expect(out).toMatch(/class="container-footnotes"/)
    const ps = out.match(/<p[\s>]/g) ?? []
    expect(ps.length).toBe(1)
  })

  it('非 [N] 起始（如 ※ 引用）不被切分（editorial-mook 风）', () => {
    const out = run(
      '::: footnotes\n' +
      '※　本文引述參見 帕慕克《別樣的色彩》。\n' +
      ':::\n',
    )
    const ps = out.match(/<p[\s>]/g) ?? []
    expect(ps.length).toBe(1)
    expect(out).toContain('※')
  })

  it('容器外的 [N] 软换行不受影响', () => {
    // 正文里 `[1]…\n[2]…` 应保留为单段（仅 footnotes 容器内才切）
    const out = run('[1]　甲文。\n[2]　乙文。\n')
    const ps = out.match(/<p[\s>]/g) ?? []
    expect(ps.length).toBe(1)
  })
})

describe('refs 容器 kicker（info-driven）', () => {
  it('info 非空时渲染 kicker，使用 primary 色 + letter-spacing', () => {
    const out = run('::: refs 参 考 文 献\n[1] 来源 A · [2] 来源 B\n:::\n')
    expect(out).toMatch(/class="container-refs"/)
    expect(out).toMatch(/class="container-refs__kicker"/)
    expect(out).toContain('参 考 文 献')
    expect(out).toMatch(/container-refs__kicker[^>]*letter-spacing/)
  })

  it('info 缺省时不渲染 kicker（向后兼容）', () => {
    const out = run('::: refs\n[1] 来源 A · [2] 来源 B\n:::\n')
    expect(out).toMatch(/class="container-refs"/)
    expect(out).not.toMatch(/class="container-refs__kicker"/)
  })
})
