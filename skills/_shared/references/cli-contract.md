# CLI 契约速查（共享 reference）

> 三个 skill 共用同一个 CLI 入口：`@wechat-typeset/cli`。本文件是 subcommand 签名 / 输入 schema / JSON 输出 / 退出码 / lint issue 修复表的**单一真源**。改这里 = 改所有调用方文档。
>
> 权威依据：[`packages/cli/src/commands/*.ts`](../../../packages/cli/src/commands)（每条 Command 自带 inputSchema / outputSchema），运行时一致性由 `npm run cli -- describe` 输出兜底。

## 目录

- [调用约定](#调用约定)
- [Subcommand 表](#subcommand-表)
- [退出码语义](#退出码语义)
- [lint issue 修复表](#lint-issue-修复表)
- [validate 错误模式表（hint）](#validate-错误模式表hint)
- [JSON 输出形状](#json-输出形状)
- [MCP 集成](#mcp-集成)
- [Skill 独家脚本](#skill-独家脚本一览)

## 调用约定

```bash
# 通用形式
npm run cli -- <subcommand> [args]

# 模式 A · --json 从 stdin 读 JSON（推荐复杂参数 / 与 MCP 调用同 schema）
echo '{"md":"...","persona":"default"}' | npm run cli -- render --json

# 模式 B · --flag value（仅在 inputSchema 声明的字段上有效）
npm run cli -- containers snippet --name tip --variant accent-bar

# 文件捷径
npm run cli -- render --input <md-path>           # 等价于 { md: readFile(...) }
npm run cli -- validate --spec <spec-json-path>   # 等价于 { spec: JSON.parse(...) }

# 自描述（MCP / LLM 用）
npm run cli -- describe   # 输出 { version, commands[] }
```

- 未知 flag（不在 inputSchema 内）直接报错退出 1，不会静默丢
- 字符串字段直接 `--key value`；object / array 字段必须走 `--json`
- 子命令多词分隔用空格（`personas list`、`containers snippet`、`motif render`），MCP 端转下划线（`personas_list` 等）

## Subcommand 表

| 子命令 | 输入 schema | 输出（成功） |
| --- | --- | --- |
| `render` | `{ md, persona?, spec?, platform? }` | `{ html, wordCount, readingTime, patchLog, frontmatterIssues, pageConfig }` |
| `validate` | `{ spec }` 或 `{ md, persona? }` | `{ ok, errors[], warnings[] }`（含 `hint`） |
| `lint` | `{ md, persona? }` | `{ ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }` |
| `annotate` | `{ md, persona }` | `{ patches[], capabilitySnapshot, vocabularySubset, blockCount }` |
| `personas list` | — | `PersonaSummary[]` |
| `personas get` | `{ id }` | 完整 `PersonaSpec` |
| `personas capabilities` | `{ id }` | `{ persona, defaultVariants, recommendedVariants, recommendedVariantOverrides, containers[], kickers }` |
| `personas recommend` | `{ title, summary, topic?, style? }` | `{ ranked[3], recommendNew, rationaleOneLine }` |
| `containers list` | — | `ContainerSpec[]`（vocabulary 全集） |
| `containers snippet` | `{ name, variant?, persona? }` | `string`（markdown 片段；`persona` 仅 API 对称，对输出无影响） |
| `motif render` | `{ shape }` 或 `{ template, values }` | `string`（SVG） |
| `describe` | — | `{ version, commands[] }`（自描述清单） |

## 退出码语义

| 退出码 | 含义 |
| --- | --- |
| `0` | 成功 |
| `1` | 输入解析 / 参数错（CLI dispatcher 拒绝） |
| `2` | 业务 `ok=false`（lint 有 error / validate 校验失败） |
| `2` | `WtException(RESOURCE_NOT_FOUND)`（未知 persona / container 名等） |
| `3` | `WtException(SPEC_INVALID)`（render 路径上 spec 投影校验失败） |
| `4` | `WtException(CONTRACT_VIOLATION)` / `WtException(RENDER_FAILED)`（fence 不闭合、pipeline 报错） |
| `5` | `WtException(PLATFORM_UNSUPPORTED)`（未知 publish target） |

退出码统一从 `src/core/errors.ts` 的 `EXIT_CODES` 映射；CLI 与 MCP 同源。

## lint issue 修复表

| `issue.kind` | severity | 原因 | 修法 |
| --- | --- | --- | --- |
| `unknown_container` | error | fence 名拼错 / 不在 vocabulary 内 | 改成 [`container-vocabulary.md`](container-vocabulary.md) 合法名；`npm run cli -- containers list` 查全集 |
| `unexpected_jsx_attrs` | error | 写了 `{variant="x"}` JSX 风 | 改成 `variant=x`（无大括号） |
| `html_comment_variant` | error | 写了 `<!-- variant=x -->` | 删注释，写到 `:::` open 行 |
| `fence_not_closed` | error | 缺 `:::` 闭合 | 补一行同长度 `:::`/`::::` |
| `nesting_depth` | error | compare/toc/kpi-dashboard 等外层用了 `:::`（3 个冒号） | 升级为 `::::`（4 个冒号） |
| `inline_unclosed` | error | `[.着重` / `[~波浪` / `==高亮` 等行内扩展未闭合 | 补对应闭合标记 |
| `wrong_theme_namespace` | warning | `theme:*` 容器在非该主题里使用 | 切到该 namespace 主题，或改用 base / pack:editorial 替代容器；不阻塞 |
| `frontmatter_invalid` | warning | frontmatter 内 variant id / theme id 非法 | 改成合法 id 或删除字段（pipeline 会回退到入参 / 默认） |

## validate 错误模式表（hint）

cli `validate` 输出 `errors[]`，每条按规则匹配后附 `hint` 字段。LLM 拿到 `path` + `message` + `hint` 三元组即可 self-correct：

| path 模式 | hint |
| --- | --- |
| `palette.<key>` + hex 非法 | 改成 `^#[0-9a-fA-F]{3,8}$`（典型：#1f2937 / #fefefe） |
| `palette.<key>` missing | palette 11 键必齐：primary / secondary / accent / bg / bgSoft / bgMuted / text / textMuted / textInverse / border / code |
| `status.<tip\|info\|warning\|danger>` | status 4 态齐全，每态 `{ accent, soft }`；最容易遗漏 info |
| `motifs.*.fontSize < 14` | motif text.fontSize ≥ 14（公众号 SVG 光栅化的 CJK 字号底线） |
| `motifs.*.strokeWidth < 1` | motif strokeWidth ≥ 1（亚像素描边在公众号会消失） |
| `motifs.*.fontFamily` | 只能是 serif / sans-serif / monospace |
| `motifs.*.placeholders` | MotifTemplate placeholders 必须包含 primitives 里出现的所有 `{name}` |
| `signatureContainers[N]` | id 必须在 `getSupportedSignatureContainers()` 白名单（camelCase） |
| `variants.<kind>` | id 必须在 `getVariantIds().<kind>` 白名单；幻觉 `glow`/`modern`/`flat` 不存在 |
| `id` kebab | id 必须 `^[a-z][a-z0-9-]*$`，与目录名一致 |
| `name`/`description`/`audience` required | 三者必填非空——LLM 选型主要靠这三项 |
| `meta.createdAt` | ISO 日期 YYYY-MM-DD |

## JSON 输出形状

### `lint` 输出

```json
{
  "ok": true,
  "issues": [
    {
      "line": 12,
      "kind": "wrong_theme_namespace",
      "severity": "warning",
      "name": "kpi-dashboard",
      "hint": "…",
      "excerpt": ":::: kpi-dashboard KEY METRICS"
    }
  ],
  "count": 1,
  "errorCount": 0,
  "warningCount": 1,
  "effectivePersona": "default",
  "personaSource": "flag"
}
```

`personaSource` 取值：`'frontmatter'` / `'flag'` / `'none'`。

### `annotate` 输出

```json
{
  "patches": [
    {
      "line": 3,
      "endLine": 3,
      "kind": "wrap_first_paragraph",
      "container": "abstract",
      "reason": "文首总览段（80 字符）——典型 abstract 位置",
      "confidence": "high",
      "preview": "本文将探讨 …"
    }
  ],
  "capabilitySnapshot": {
    "personaId": "swiss-grid",
    "defaultVariants": { "admonition": "accent-bar" },
    "recommendedVariants": { "admonition": ["accent-bar", "pill-tag"] },
    "containers": [ { "id": "abstract", "available": true, "signature": true, "namespace": "base", "pack": "base" } ]
  },
  "vocabularySubset": [ { "name": "tip", "category": "admonition", "fenceLength": 3, "description": "…", "example": "…" } ],
  "blockCount": 24
}
```

合法 `kind`：`wrap_paragraph` / `wrap_blockquote` / `convert_list` / `wrap_first_paragraph` / `wrap_section_title` / `wrap_pros_cons`。

### `validate` 输出

```json
{
  "ok": false,
  "errors": [
    {
      "message": "palette.primary: not a valid hex",
      "severity": "error",
      "path": "palette.primary",
      "hint": "改成 ^#[0-9a-fA-F]{3,8}$ 形式（典型：#1f2937 / #2558b0 / #fefefe）"
    }
  ],
  "warnings": []
}
```

### `personas recommend` 输出

```json
{
  "ranked": [
    {
      "id": "tech-explainer",
      "name": "文档白昼",
      "description": "…",
      "audience": "技术布道 / 产品文档 / 教程",
      "variantsSignature": { "admonition": "accent-bar" },
      "signatureContainers": ["note", "seeAlso"],
      "staticScore": 1,
      "staticReasons": ["audience/description 命中题材\"技术\"关键词 …"]
    }
  ],
  "recommendNew": false,
  "rationaleOneLine": "强匹配 tech-explainer（1.00）"
}
```

`recommendNew=true` ⇔ top-1 score < 0.6，建议去 `wechat-typeset-author-persona` 造新主题。

## MCP 集成

CLI 与 MCP 共享同一个 COMMANDS 数组，每条 Command 的 `inputSchema` 即 MCP tool 的 `inputSchema`：

```jsonc
// Claude Desktop / Cursor 的 mcp.json
{
  "mcpServers": {
    "wechat-typeset": {
      "command": "npx",
      "args": ["-p", "@wechat-typeset/mcp", "wechat-typeset-mcp"]
    }
  }
}
```

MCP tool 名映射：subcommand 空格转下划线（`personas list` → `personas_list`、`motif render` → `motif_render`）。`tools/list` 直接消费 `npm run cli -- describe` 的 commands 数组。

## Skill 独家脚本一览

CLI 不覆盖、各 skill 保留为本地脚本的工具（场景：HTML 报表、文件落地、prompt 模板构造）：

| Skill | 脚本 | 作用 |
| --- | --- | --- |
| author-persona | `scripts/new-persona-from-prompt.ts` | 输出"给 LLM 用的结构化输出 prompt"（schema + 硬约束 + 邻近样例） |
| author-persona | `scripts/preview-motifs.ts` | spec → 单页 HTML gallery（色板 + 全部 motif + admonition icon） |
| author-persona | `scripts/persist-persona.ts` | spec → 落到 `src/core/themes/<id>/` + patch registry |
| export-richtext | `scripts/render-gallery.ts` | 多 persona 并排预览（iframe srcdoc） |
| export-richtext | `scripts/copy-richtext.ts` | HTML 写入系统剪贴板（Win/Mac/Linux） |
| export-richtext | `scripts/open-in-browser.ts` | 启动 vite preview + 自动开浏览器 |
