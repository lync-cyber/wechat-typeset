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

## 命名规范

**Canonical 形式**：`<resource> <action>`（如 `markdown render`、`personas list`、`containers snippet`）。新命令必须遵循此规范。

**Deprecation 窗口**：bare-verb 旧名保留为 alias，description 前缀 `DEPRECATED alias of <canonical>`，下一个 major 移除。同源记录在 `capabilities.json.deprecations[]`：

| 旧名 (deprecated) | Canonical |
| --- | --- |
| `render` | `markdown render` |
| `lint` | `markdown lint` |
| `annotate` | `markdown annotate` |
| `annotate apply` | `markdown annotate apply` |
| `validate` | `validate spec` / `validate markdown` |

> MCP 工具名沿用 `空格→下划线` 转换（如 `markdown render` → `markdown_render`）。

## Subcommand 表

> 表中列出 canonical 名；旧 alias 仍可用但 description 前缀 `DEPRECATED`。所有命令默认 `readOnly: true`（详见 `describe` 输出 / capabilities `cli.commands[*].readOnly`）。

**markdown · 文章管线**

| 子命令 | 输入 schema | 输出 |
| --- | --- | --- |
| `markdown render` | `{ md, persona?, spec?, platform? }` | `{ html, wordCount, readingTime, patchLog, frontmatterIssues, pageConfig }`；`platform` 枚举来自 `platforms list` |
| `markdown lint` | `{ md, persona? }` | `{ ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }`；`issues[].kind` 是 8 态 enum |
| `markdown annotate` | `{ md, persona }` | `{ patches[], capabilitySnapshot, vocabularySubset, blockCount }`；`patches[].kind`/`confidence` 都是 enum |
| `markdown annotate apply` | `{ md, patches[] }` | `{ md, applied, skipped[] }` |

**validate · 校验**

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `validate spec` | `{ spec }` | `{ ok, errors[], warnings[] }` |
| `validate markdown` | `{ md, persona? }` | `{ ok, errors[], warnings[] }` |

**personas · 主题选型**

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `personas list` | — | `PersonaSummary[]` |
| `personas get` | `{ id }` | `PersonaSpec` |
| `personas capabilities` | `{ id }` | `{ persona, defaultVariants, recommendedVariants, recommendedVariantOverrides, containers[], kickers }` |
| `personas recommend` | `{ title?, summary?, topic?, style?, vibe?, audience? }` 至少一个非空 | `{ ranked[3], recommendNew, rationaleOneLine }`。全空 → `CONTRACT_VIOLATION` |
| `persona motifs` | `{ id }` | 该 persona 的 `MotifSpec`（h2Prefix / dividers / admonition icons 等 AST 集合） |

**containers · 容器词汇**

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `containers list` | — | `ContainerSpec[]` |
| `containers get` | `{ name }` | 单个 `ContainerSpec`；未知 → RESOURCE_NOT_FOUND |
| `containers variants` | `{ name }` | 容器可切换的 `VariantDescriptor[]`；无 variantKind 的容器返回 `[]` |
| `containers snippet` | `{ name, variant?, persona? }` | `string`（传 `persona` 且未传 `variant` 时按该主题 default variant 绑定） |

**inline-extensions · 行内扩展**

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `inline-extensions list` | — | `InlineExtensionSpec[]`（syntax / regex / inputExample / outputHtmlExample） |
| `inline-extensions snippet` | `{ syntax }` | `string`（该扩展的 inputExample） |

**元 / 平台**

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `motif render` | `{ shape }` **xor** `{ template, values? }` | `string`（SVG）。同时给 / 都不给 → `CONTRACT_VIOLATION` |
| `frontmatter parse` | `{ md }` | `{ config, body, issues }`——独立解析 markdown 头部，不走完整 render |
| `platforms list` | — | `PlatformInfo[]`（`{ id, name, status }`） |
| `capabilities` | — | 与 `dist/api/capabilities.json` 同源的全量契约（personas / containers / variants / hardRules / cli.commands / deprecations / fallbackBehavior 等） |
| `error-codes list` | — | `Array<{ code, exitCode, description }>` |
| `schema get` | — | PersonaSpec JSON Schema (draft-07)；LLM 结构化输出约束源 |
| `describe` | — | `{ version, commands[], errorCodes[], platforms[], variantIds, signatureContainers[], hardRules, inlineExtensions[] }`，每个 command 含 `readOnly: boolean` |

## 退出码语义

| 退出码 | 含义 |
| --- | --- |
| `0` | 成功 |
| `1` | 输入解析 / 参数错（CLI dispatcher 拒绝） |
| `2` | 业务 `ok=false`（lint 有 error / validate 校验失败） |
| `2` | `WtException(RESOURCE_NOT_FOUND)`（未知 persona / container 名等） |
| `3` | `WtException(SPEC_INVALID)`（render 路径上 spec 投影校验失败） |
| `4` | `WtException(CONTRACT_VIOLATION)`（fence 不闭合、嵌套错、未知容器等契约层错误） |
| `5` | `WtException(PLATFORM_UNSUPPORTED)`（未知 publish target） |
| `6` | `WtException(RENDER_FAILED)`（管线内部异常 / 兜底）。与 4 分离，便于 CI 程序化分支 |

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

## `describe` 输出形状

```jsonc
{
  "version": "x.y.z",
  "commands": [
    { "name": "render", "description": "...", "inputSchema": {...}, "outputSchema": {...} }
  ],
  "errorCodes": [
    { "code": "CONTRACT_VIOLATION", "exitCode": 4, "description": "markdown 容器/语法/嵌套错（fence_not_closed 等）" }
  ],
  "platforms": [
    { "id": "wechat", "name": "微信公众号", "status": "stable" }
  ],
  "variantIds": {
    "admonition": ["accent-bar", "pill-tag", "ticket-notch", "..."],
    "quote": ["classic", "left-bar", "magazine-dropcap", "..."]
  },
  "signatureContainers": ["abstract", "keyNumber", "..."],
  "hardRules": {
    "minFontSize": 14,
    "minStrokeWidth": 1,
    "allowedFontFamilies": ["serif", "sans-serif", "monospace"],
    "hexPattern": "^#[0-9a-fA-F]{3,8}$"
  },
  "inlineExtensions": [
    { "syntax": "==mark==", "description": "...", "regex": "...", "inputExample": "...", "outputHtmlExample": "..." }
  ]
}
```

> MCP / LLM 集成方一次 `describe` 即可拿到工具注册所需的全部元信息——不必额外去 `capabilities.json` 或源码翻硬约束阈值。

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

### `annotate apply` 输出

```json
{
  "md": "<新 markdown>",
  "applied": 5,
  "skipped": [
    { "patch": { "line": 12, "endLine": 12, "kind": "wrap_paragraph", "container": "tip" },
      "reason": "range overlaps a previously applied patch" }
  ]
}
```

`skipped[].reason` 取值：

- `invalid range line=... endLine=...` —— 行号越界 / 倒置 / 非整数
- `range overlaps a previously applied patch` —— 与已应用 patch 行范围重叠（应在筛选阶段过滤掉弱的那个）
- `unknown container "<name>"` —— container 名拼错或未在 vocabulary 里
- `wrap_pros_cons requires manual structure ...` —— pros/cons 不可机械应用，需 `containers snippet --name compare` 手工拼

**核对**：`applied + skipped.length === patches.length`。

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

MCP tool 名映射：subcommand 空格转下划线（`personas list` → `personas_list`、`markdown render` → `markdown_render`）。`tools/list` 直接消费 `npm run cli -- describe` 的 commands 数组。

**错误返回**：MCP 端的 `WtException` 错误走 MCP 2025-03 `structuredContent` 字段：

```jsonc
{
  "isError": true,
  "content": [{ "type": "text", "text": "CONTRACT_VIOLATION: fence_not_closed at line 12 (+2 more)" }],
  "structuredContent": {
    "code": "CONTRACT_VIOLATION",
    "exitCode": 4,
    "errors": [ /* WtError[] */ ],
    "warnings": []
  }
}
```

客户端读 `structuredContent.code` 程序化分支；`content[0].text` 是 fallback 可读摘要。未归类 Error 兜底成 `code: 'RENDER_FAILED'`（exitCode 6）。

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
