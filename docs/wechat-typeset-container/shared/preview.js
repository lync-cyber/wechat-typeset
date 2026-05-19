// 页面加载：把每个 variant 内的 template.snippet-src 内容渲染到 .wx-paper
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.variant').forEach(v => {
    const tpl = v.querySelector('template.snippet-src');
    const paper = v.querySelector('.wx-paper');
    if (tpl && paper && !paper.hasChildNodes()) {
      paper.appendChild(tpl.content.cloneNode(true));
    }
  });
});

// 复制 inline-style HTML 片段到剪贴板
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy');
  if (!btn) return;
  const variant = btn.closest('.variant');
  const tpl = variant.querySelector('template.snippet-src');
  if (!tpl) return;
  // 把 template 里的 HTML 取出来，剔除前导缩进
  let html = tpl.innerHTML;
  // 找最小缩进
  const lines = html.split('\n').filter(l => l.trim());
  const indent = Math.min(...lines.map(l => (l.match(/^ */) || [''])[0].length));
  html = html.split('\n').map(l => l.slice(indent)).join('\n').trim();
  try {
    await navigator.clipboard.writeText(html);
    const original = btn.textContent;
    btn.textContent = '已复制 ✓';
    btn.classList.add('ok');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('ok');
    }, 1400);
  } catch (err) {
    // 回退方案
    const ta = document.createElement('textarea');
    ta.value = html;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    btn.textContent = '已复制 ✓';
    btn.classList.add('ok');
    setTimeout(() => {
      btn.textContent = '复制 HTML';
      btn.classList.remove('ok');
    }, 1400);
  }
});

// 切换查看代码
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.toggle-snippet');
  if (!btn) return;
  const snippet = btn.closest('.variant').querySelector('.snippet');
  if (!snippet) return;
  snippet.classList.toggle('open');
  btn.textContent = snippet.classList.contains('open') ? '收起代码' : '查看代码';
});
