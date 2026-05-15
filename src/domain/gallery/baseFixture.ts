/**
 * 标准骨架 fixture：从 vocabulary 派生的"所有主题应该都能渲染的最小完整稿"。
 *
 * 设计纪律：
 *   1. **不手写容器清单**——base 容器集合从 CONTAINER_VOCABULARY 自动派生
 *      （`packOf===base && !parent`）。新增 base 容器自动出现；新增 pack/theme
 *      容器自动**不**出现（扩展容器走 sample-{id}.md 自己消费）。
 *   2. **不包含主题特例**——同一份 fixture 对 14 主题字节相同；主题间差异只能由
 *      `render({md, theme})` 通过主题 voice 表达，绝不能让 fixture 感知主题。
 *   3. **元素基线手写一次**——h1-h4 / 段落 / 列表 / 引用 / 代码 / 表格 / 分隔线 /
 *      图片 / inline 强调集中在一个 HEADER_BLOCK 块里，与 BASE_ELEMENT_KEYS
 *      （voice 检查的元素白名单）配对。任何一方调整字段都得同步另一方。
 *
 * 用途：
 *   - tests/unit/theme-rendered-snapshot.spec.ts：14 主题 × 同一 md → HTML 快照
 *   - scripts/gen-showcase.ts：把元素 / base 容器 / 扩展签名容器三段分别渲染嵌入
 *   - 其他需要"主题视觉差异基准"的场景都可 import 本模块
 *
 * 与 sample-full.md 的边界：
 *   - sample-full.md 是"作者侧全量演示稿"，含 pack:* / theme:* 容器，会随写作集成方
 *     需求增长；它继续承担 verify-sample-full.ts 的端到端断言。
 *   - 本 fixture 是"主题契约骨架"，只为 base 命名空间负责；增长由 vocabulary base
 *     新增驱动，不被外部稿件膨胀感染。
 *
 * 放在 src/domain/gallery/ 的理由：
 *   - 它是从 vocabulary 派生的"域级资产"，被测试与 showcase 生成器双端消费
 *   - 不依赖 jsdom / pipeline，纯字符串拼接，src/ 可放
 *   - 历史曾在 tests/helpers/，迁移后那里改为 reexport 保持外部入口稳定
 */

import {
  CONTAINER_VOCABULARY,
  packOf,
  STYLE_KEY_TO_CONTAINER_NAME,
  lookupContainerSpec,
} from '../../core/vocabulary/vocabulary'
import type { PersonaSpec } from '../../core/themes/_shared/spec'

/**
 * 元素 / inline / 排版基线 markdown。覆盖 BASE_ELEMENT_KEYS 全部 18 字段：
 *   h1 / h2 / h3 / h4 / p / blockquote / ul / ol / li / code / kbd / pre / img / a / hr / table / strong / em
 *
 * inline 扩展：highlight (==xx==) / wavy (~~xx~~) / ins (++xx++) —— 触发 ThemeInline 三态。
 */
export const BASE_ELEMENT_FIXTURE_MD = `# 标准骨架 · H1 主标题

## H2 章节标题

### H3 小节标题

#### H4 步骤小标题

正文段落：**加粗** / *斜体* / \`inline code\` / ==高亮== / ~~波浪~~ / ++插入++ / [外链](https://example.com)。

- 无序列表 A
- 无序列表 B
  - 嵌套项 B.1

1. 有序列表 A
2. 有序列表 B

> blockquote 引用：承担引言 voice 的兜底位。

| 表头 A | 表头 B |
| --- | --- |
| 单元 1 | 单元 2 |

![骨架示意](https://placehold.co/600x300?text=fixture)

按 \`Ctrl+S\` 保存（inline code 同时承担 kbd 提示场景；主题若覆写 kbd，则需作者另起 inline HTML）。

---

\`\`\`ts
const greeting: string = 'hello, theme voice'
console.log(greeting)
\`\`\`
`

/**
 * 派生 base 容器 markdown 段落数组：vocabulary 中 packOf===base && !parent
 * 的全部容器，取其 spec.example。顺序按 CONTAINER_VOCABULARY 原序，保证渲染
 * 产物阅读流畅。
 */
function deriveBaseContainerMd(): string[] {
  return CONTAINER_VOCABULARY
    .filter((s) => packOf(s) === 'base' && !s.parent)
    .map((s) => s.example.trimEnd())
}

/** 仅 base 容器示例的拼接 markdown（不含元素 catalog）。 */
export const BASE_CONTAINER_FIXTURE_MD: string =
  deriveBaseContainerMd().join('\n\n') + '\n'

/** 完整骨架（元素 catalog + base 容器）—— 14 主题渲染快照基线。 */
export const BASE_FIXTURE_MD: string =
  BASE_ELEMENT_FIXTURE_MD + '\n' + BASE_CONTAINER_FIXTURE_MD

/**
 * 为单个主题派生"签名容器 fixture"：把 spec.signatureContainers 中**不在 base 骨架**
 * 的扩展容器（pack:* / theme:* 命名空间）转成 markdown，用于验证主题对自家声明
 * 的扩展容器确实有 renderer 落地。
 *
 * 为什么不放进 BASE_FIXTURE_MD：骨架要保持"主题无关、对所有主题字节相同"。扩展
 * 容器是"愿意演刊物形态"的主题才声明的，按主题动态派生才是对的。
 *
 * 输出 md 可能为空（主题没声明任何扩展 signature 容器，如 default / tech-geek）。
 */
export function buildSignatureFixtureMd(spec: PersonaSpec): {
  md: string
  fenceNames: readonly string[]
} {
  const fenceNames: string[] = []
  const blocks: string[] = []
  for (const styleKey of spec.signatureContainers ?? []) {
    const fenceName = STYLE_KEY_TO_CONTAINER_NAME[styleKey]
    if (!fenceName) continue
    const cs = lookupContainerSpec(fenceName)
    if (!cs) continue
    if (packOf(cs) === 'base') continue
    fenceNames.push(fenceName)
    blocks.push(cs.example.trimEnd())
  }
  return {
    md: blocks.length === 0 ? '' : blocks.join('\n\n') + '\n',
    fenceNames,
  }
}
