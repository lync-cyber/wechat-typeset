# MCP ↔ CLI 调用形态映射（共享 reference）

> 同一个引擎，三种宿主形态：CLI（shell）、MCP（Claude Desktop / Cursor / Cline）、Node 库。
> 本文是"同一份 schema 怎么以不同形态被消费"的速查；3 个 skill 共用。

## 1 · 工具名映射规则

| CLI 形式 | MCP tool 名 | 库导出 |
| --- | --- | --- |
| `npm run cli -- <resource> <action>` | `<resource>_<action>`（空格 → 下划线） | 函数（部分命令）`src/public/index.ts` 直接调用 |

例：

| CLI | MCP |
| --- | --- |
| `markdown render` | `markdown_render` |
| `markdown annotate apply` | `markdown_annotate_apply` |
| `personas list` | `personas_list` |
| `containers snippet` | `containers_snippet` |
| `motif render` | `motif_render` |

旧 deprecated bare-verb 在两端都仍可用（`render` 在 CLI 仍能跑，`render` 工具在 MCP 仍存在），description 前缀 `DEPRECATED alias of <canonical>`。

## 2 · 集成方接入步骤

无论哪种宿主，**第一步永远是调 `describe`**。它的输出包含：

- `commands[]` — 全部命令的 name / description / inputSchema / outputSchema / **readOnly**
- `errorCodes[]` — WtException 错误码 + 退出码（运行时可读，不必读源码）
- `platforms[]` — `markdown render --platform` 的合法 id
- `variantIds` — 每个 VariantKind 的合法 id 集合（防 LLM 幻觉）
- `signatureContainers[]` — 主题级签名容器白名单
- `hardRules` — 字号 / 描边阈值
- `inlineExtensions[]` — `==mark==` / `[.着重.]` 等行内扩展全集

```bash
# CLI
npx -p @wechat-typeset/cli wechat-typeset describe | jq

# MCP — 任意客户端 list_tools 后直接 call_tool({ name: 'describe' })
```

## 3 · MCP 配置

```jsonc
// Claude Desktop / Cursor / Cline 的 mcp.json
{
  "mcpServers": {
    "wechat-typeset": {
      "command": "npx",
      "args": ["-p", "@wechat-typeset/mcp", "wechat-typeset-mcp"]
    }
  }
}
```

## 4 · 输入约定

- **CLI 模式 A · `--json` 从 stdin 读 JSON**（复杂参数走这个，与 MCP 同 schema）：

  ```bash
  echo '{"md":"...","persona":"swiss-grid"}' | npm run cli -- markdown render --json
  ```

- **CLI 模式 B · `--flag value`**（仅在 inputSchema 声明的字符串字段上有效）：

  ```bash
  npm run cli -- containers snippet --name tip --variant accent-bar
  ```

- **MCP**：客户端 tool call payload 即 inputSchema。无 stdin、无 flag。

## 5 · 输出 / 错误返回

### 成功

- CLI：stdout 是 JSON 或纯字符串（输出形态由 outputSchema 决定）；exitCode `0`
- MCP：`{ content: [{ type: 'text', text: <json or string> }] }`

### 失败（WtException）

- CLI：stdout 是 `{ ok: false, code, errors[], warnings[] }`；exitCode = `WT_ERROR_INFO[code].exitCode`（见 [error-routing.md](error-routing.md)）
- MCP：

  ```jsonc
  {
    "isError": true,
    "content": [{ "type": "text", "text": "CONTRACT_VIOLATION: fence_not_closed at line 12 (+2 more)" }],
    "structuredContent": {
      "code": "CONTRACT_VIOLATION",
      "exitCode": 4,
      "errors": [/* WtError[] */],
      "warnings": []
    }
  }
  ```

  → 读 `structuredContent.code` 程序化分支；`content[0].text` 是 fallback 摘要。

### 失败（未归类 Error）

- CLI：stderr 带 stack；exitCode = `6`（RENDER_FAILED）
- MCP：兜底成 `{ structuredContent: { code: 'RENDER_FAILED', ... } }`

## 6 · 幂等性 / 缓存

每条命令的 describe 输出含 `readOnly: boolean`：

- `readOnly: true` —— 纯读，MCP 客户端可放心缓存、自动重试、并发调用
- `readOnly: false` —— 写 / 持久化（**当前 CLI/MCP 全 readOnly: true**；未来 persist 类命令出现时会显式标 false）

## 7 · 库直调（Node）

```ts
import { render, validatePersona, listPersonas, EXIT_CODES, WtException } from 'wechat-typeset'

try {
  const { html } = render({ md, persona: 'swiss-grid' })
} catch (e) {
  if (e instanceof WtException) {
    // e.code / e.errors / EXIT_CODES[e.code]
  }
}
```

CLI / MCP / 库三层 schema 同源——`src/public/*` 是唯一真源。

## 相关

- [cli-contract.md](cli-contract.md) · subcommand 签名 / 退出码 / JSON 输出形状全集
- [error-routing.md](error-routing.md) · WtException → skill 转向矩阵
