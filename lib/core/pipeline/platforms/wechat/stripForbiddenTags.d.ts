/**
 * stripForbiddenTags：移除粘贴到公众号会被剥离的危险标签。
 *
 * 移除：
 *   - <style>  （juice 之后理论上应该为空；这里兜底）
 *   - <script>
 *   - <noscript>
 *   - <link> / <meta>
 *
 * 保留：
 *   - <iframe>  仅当 src 指向 v.qq.com（mpvideo 容器产出），其余剥离
 *
 * 为什么不连同内容一起剥：
 *   <style> 必须丢内容；<script>/<noscript>/<iframe(非白名单)> 也是——它们的内容
 *   要么是 JS，要么是元信息，保留会在公众号里显示为乱码文本。
 */
export declare function stripForbiddenTags(html: string): string;
