// Shared helpers for every template.
// Fields whose name ends in "Html" are inserted as raw HTML; everything else is escaped.

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const cssVars = (obj = {}) => Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(';');

export const img = (file) => `photos/${file}`;

export const link = (l, cls = '') =>
  l ? `<a href="${esc(l.href || '#')}" class="${cls}"${/^https?:/.test(l.href || '') ? ' target="_blank" rel="noopener"' : ''}>${esc(l.label)}</a>` : '';

export const navLinks = (items = []) => items.map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join('');

export const footerCols = (cols = []) =>
  cols.map((c) => `<div><h6>${esc(c.title)}</h6><ul>${c.items.map((i) => `<li>${typeof i === 'string' ? esc(i) : link(i)}</li>`).join('')}</ul></div>`).join('');

// Full HTML document. `defaults` are the template's own CSS variables; cfg.theme.vars overrides them.
export function page({ cfg, defaults, css, body, script, siteUrl }) {
  const t = cfg.theme || {};
  const url = siteUrl ? `${siteUrl}/${cfg.slug}/` : '';
  const ogImg = cfg.ogImage && siteUrl ? `${siteUrl}/${cfg.slug}/${img(cfg.ogImage)}` : '';
  const data = script ? `<script type="application/json" id="site-data">${JSON.stringify(script.data || {}).replace(/</g, '\\u003c')}</script><script src="../assets/${script.file}" defer></script>` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(cfg.title)}</title>
<meta name="description" content="${esc(cfg.description)}">
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(cfg.title)}">
<meta property="og:description" content="${esc(cfg.description)}">
${url ? `<meta property="og:url" content="${esc(url)}">` : ''}
${ogImg ? `<meta property="og:image" content="${esc(ogImg)}"><meta name="twitter:card" content="summary_large_image">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${esc(t.fontsHref)}" rel="stylesheet">
<style>
:root{${cssVars(defaults)};${cssVars(t.vars)}}
${css}
.concept{position:fixed;bottom:18px;right:18px;z-index:90;background:var(--badge,#222);color:#fff;font:500 11px/1 system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;padding:9px 14px;border-radius:999px;opacity:.9}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
${body}
<div class="concept">Concept preview</div>
${data}
</body>
</html>`;
}
