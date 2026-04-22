# 用 TypeScript 从零实现 JWT 认证

::: intro 学完你将能
- 说出 JWT 的三段式结构：Header、Payload、Signature
- 用 Node.js 内置 `crypto` 模块手写签发与验签，无第三方依赖
- 识别并规避五种高频误用：弱密钥、`alg:none`、敏感字段入 Payload、跳过 `exp`、明文传输
:::

::: cover 教程说明
![封面占位](https://placehold.co/1200x630?text=tech-explainer)

**前置知识：** `JavaScript 基础` `HTTP 协议` `Base64 编码`

📖 预计阅读 12 分钟 · 最后更新 2026-04-20
:::

::: author 陈朗 role=后端工程师
最后更新：**2026-04-20** · 阅读时长约 12 分钟
:::

::: divider variant=rule
:::

## 1. JWT 的结构

JWT（JSON Web Token）由三段 Base64url 编码字符串拼成，用 `.` 分隔：

```text
TYPESCRIPT · 结构示意
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.SIGNATURE
    ↑ Header           ↑ Payload           ↑ Signature
```

::: tip Tip · 小贴士
Header 和 Payload 只是 Base64url 编码，**没有加密**——任何人都能解码读到内容。密码、手机号绝对不能放在 Payload 里。
:::

::: info Note · 注意事项
JWT 常被误称为"加密 Token"，正确叫法是"签名 Token"——它保证数据**未被篡改**，不保证数据**保密**。
:::

::: divider variant=dots
:::

## 2. 分步实现

::: steps 手写 JWT 签发与验签
### Step 1. 引入内置模块

只需 Node.js 18+ 内置的 `crypto`，无需任何 npm 依赖：

```typescript
TYPESCRIPT · src/auth/jwt.ts
import { createHmac, timingSafeEqual } from 'node:crypto'
```

### Step 2. 实现 HMAC-SHA256 签名

```typescript
TYPESCRIPT · src/auth/jwt.ts
function hmacSign(data: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(data)
    .digest('base64url')
}
```

### Step 3. 签发 Token

```typescript
TYPESCRIPT · src/auth/jwt.ts
function sign(payload: object, secret: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body   = btoa(JSON.stringify(payload))
  const sig    = hmacSign(`${header}.${body}`, secret)
  return `${header}.${body}.${sig}`
}
```

### Step 4. 验签并检查过期

```typescript
TYPESCRIPT · src/auth/jwt.ts
function verify(token: string, secret: string): object {
  const [header, payload, sig] = token.split('.')
  const expected = hmacSign(`${header}.${payload}`, secret)
  // 必须用时序安全比对，普通 === 存在时序攻击风险
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw new Error('invalid signature')
  }
  const decoded = JSON.parse(atob(payload))
  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    throw new Error('token expired')
  }
  return decoded
}
```
:::

::: divider variant=rule
:::

## 3. 正确与错误对比

:::: compare

::: pros Do · 推荐写法
- 密钥长度 ≥ 256 位随机字符
- Payload 只存用户 ID 与 `exp`
- 始终校验 `exp` 字段
- 通过 HTTPS 传输，绝不放 URL
:::

::: cons Don't · 避免这么做
- 用 `"secret"` 或 `"1234"` 当密钥
- 把密码、手机号塞进 Payload
- 跳过 `exp` 校验
- 在 query string 里传 Token
:::

::::

::: warning Warning · 常见陷阱
部分早期 JWT 库支持 `alg: none`，攻击者可构造无签名的合法 Token。**永远显式指定算法**，不要信任客户端传入的 `alg` 字段。
:::

::: danger Caution · 重大变更
从 HS256 迁移到 RS256 时，旧 Token 需要双算法过渡期——若直接切换，线上存量 Token 将全部失效。这是生产事故的高发点。
:::

::: note Node.js 版本
本文所有示例需要 Node.js 18+（依赖原生 `btoa` / `atob` / `base64url`）。若仍在 Node 16 线上，请用 `Buffer.from(x).toString('base64url')` 替代。tech-explainer 的 note 用于标注"环境与兼容性"这类非核心但绕不开的脚注。
:::

::: divider variant=dots
:::

## 4. 设计纲领与进阶

::: quote-card JWT 设计纲领
JWT 是信任契约，不是加密容器。签名确保"数据未被篡改"，不确保"数据看不到"——把这句话刻进 API 设计阶段，90% 的 JWT 安全问题都能提前规避。
:::

::: highlight
**进阶技巧**：用 `kid`（Key ID）字段实现密钥无感轮转——服务端维护 `kid → secret` 映射表，签发新 Token 时写入最新 kid，验签时按 kid 查表，旧 Token 继续有效。
:::

::: footer-cta 继续阅读 cta=下一篇：OAuth 2.0 与 JWT
手把手厘清 OAuth 为何要用 JWT，JWT 又解决了 OAuth 的哪些麻烦。
:::

::: divider variant=dots
:::

## 5. 视频 / 语音版

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="JWT 教程音频版" play_length="600000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: qrcode 关注「文档白昼」获取代码
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: see-also 下一篇会讲什么
- **OAuth 2.0 与 JWT 的协作关系**：授权码流程里，JWT 扮演什么角色
- **Refresh Token 的正确实现**：为什么不能把它当 Access Token 用
- **JWK Set 与密钥轮转**：从 kid 到完整轮转链路的工程化
:::

::: recommend 延伸阅读
- [RFC 7519：JWT 规范原文](https://example.com/rfc7519)
- [OWASP：JWT 安全最佳实践](https://example.com/owasp)
- [Node.js crypto 官方文档](https://example.com/crypto)
:::
