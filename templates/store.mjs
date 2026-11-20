// STORE template — product grid with filters, bag drawer and checkout (originally Koza Hair Plug).
import { esc, img, link, navLinks, footerCols, page } from './lib.mjs';

const defaults = {
  '--dark': '#2E2D31', '--dark-2': '#3A393E', '--accent': '#6A3FA0', '--accent-soft': '#C3A8EA',
  '--bg': '#F6EEF4', '--paper': '#FFFFFF', '--ink': '#1E1D21', '--muted': '#77737E', '--line': '#E7E1EA', '--sale': '#B4235A',
  '--on-dark': '#CFCBD6', '--badge': 'var(--accent)',
  '--display': "'Bodoni Moda',Georgia,serif", '--sans': "'DM Sans',system-ui,sans-serif",
};

const css = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%}button,select,input{font:inherit;color:inherit}button{cursor:pointer;border:0;background:none}
.wrap{max-width:1280px;margin:0 auto;padding:0 32px}.eyebrow{font-size:11px;letter-spacing:.26em;text-transform:uppercase;font-weight:500;color:var(--accent)}
.ph{width:100%;height:100%;object-fit:cover}h1,h2,h3{font-family:var(--display);font-weight:400;text-wrap:balance}
.ticker{background:var(--accent);color:#fff;font-size:12px;letter-spacing:.16em;text-transform:uppercase;overflow:hidden;white-space:nowrap;padding:10px 0}
.ticker div{display:inline-block;animation:tick 30s linear infinite}.ticker span{margin:0 26px}@keyframes tick{to{transform:translateX(-50%)}}
header.top{position:sticky;top:0;z-index:40;background:var(--dark);color:#fff}
.nav{display:flex;align-items:center;justify-content:space-between;height:70px;gap:20px}
.logo{font-family:var(--display);font-size:30px;letter-spacing:.06em;font-style:italic;line-height:1}
.logo small{font-family:var(--sans);font-style:normal;font-size:10px;letter-spacing:.34em;display:block;color:var(--accent-soft);margin-top:3px}
.nav-links{display:flex;gap:28px;font-size:13px;letter-spacing:.08em}.nav-links a:hover{color:var(--accent-soft)}
.bagbtn{display:flex;align-items:center;gap:8px;font-size:13px;letter-spacing:.08em;color:#fff}
.bagbtn b{display:inline-grid;place-items:center;min-width:22px;height:22px;border-radius:11px;background:var(--accent-soft);color:var(--ink);font-size:12px;padding:0 6px}
.hero{background:var(--dark);color:#fff;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:40px;align-items:center;padding-block:64px 0}
.hero h1{font-size:clamp(48px,6.4vw,92px);line-height:.98;margin:18px 0 22px}.hero h1 em{color:var(--accent-soft)}
.hero .eyebrow{color:var(--accent-soft)}.hero p{color:var(--on-dark);max-width:440px;font-size:17px;margin-bottom:32px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:16px 28px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:500;transition:.25s}
.btn.soft{background:var(--accent-soft);color:var(--ink)}.btn.soft:hover{background:#fff}
.btn.out{border:1px solid rgba(255,255,255,.4)}.btn.out:hover{border-color:#fff}
.btn.ink{background:var(--ink);color:#fff}.btn.ink:hover{background:var(--accent)}
.btns{display:flex;gap:12px;flex-wrap:wrap}
.trust{display:flex;gap:28px;margin-top:40px;padding-bottom:56px;flex-wrap:wrap;font-size:13px;color:var(--on-dark)}
.trust b{display:block;color:#fff;font-family:var(--display);font-size:24px;font-weight:400}
.hero-art{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-self:end;position:relative}
.hero-art .tall{aspect-ratio:3/5;overflow:hidden;border-radius:200px 200px 0 0}.hero-art .tall:nth-child(2){margin-top:70px}
.price-pop{position:absolute;left:-18px;top:46%;background:#fff;color:var(--ink);padding:12px 16px;font-size:12px;box-shadow:0 12px 30px rgba(0,0,0,.25)}
.price-pop s{color:var(--muted)}.price-pop b{display:block;font-size:18px;color:var(--sale)}
section{padding:96px 0}
.head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:34px}.head h2{font-size:clamp(36px,4.4vw,58px);line-height:1}
.head>a{font-size:11px;letter-spacing:.26em;text-transform:uppercase;border-bottom:1px solid}
.filters{display:flex;gap:8px;flex-wrap:wrap}
.chip{padding:9px 18px;border:1px solid var(--line);border-radius:999px;font-size:13px;background:var(--paper);transition:.2s}.chip.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.card .img{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--dark-2)}
.card .img img{transition:transform .7s cubic-bezier(.2,.7,.2,1);object-position:center 30%}.card:hover .img img{transform:scale(1.05)}
.tag{position:absolute;top:12px;left:12px;background:var(--sale);color:#fff;font-size:11px;letter-spacing:.1em;padding:5px 9px;font-weight:500;z-index:1}
.add{position:absolute;left:12px;right:12px;bottom:12px;background:#fff;color:var(--ink);padding:12px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;transform:translateY(150%);transition:.3s;z-index:1}
.card:hover .add,.add:focus{transform:none}
.card h4{font-family:var(--display);font-size:20px;font-weight:400;margin-top:14px;line-height:1.2}.card .meta{font-size:12.5px;color:var(--muted);margin-top:3px}
.card .pr{margin-top:8px;display:flex;gap:10px;align-items:baseline}.card .pr b{font-size:16px;font-weight:600}.card .pr s{font-size:13px;color:var(--muted)}
.note{font-size:12.5px;color:var(--muted);margin-top:24px}
.trustbar{background:var(--dark);color:#fff}.trustbar .wrap{display:grid;grid-template-columns:repeat(4,1fr)}
.trustbar .wrap>div{padding:34px 26px;border-right:1px solid rgba(255,255,255,.1)}.trustbar .wrap>div:last-child{border-right:0}
.trustbar h5{font-family:var(--display);font-size:22px;font-weight:400;margin-bottom:6px;color:var(--accent-soft)}.trustbar p{font-size:14px;color:var(--on-dark)}
.custom{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}
.custom .pics{display:grid;grid-template-columns:1fr 1fr;gap:12px}.custom .pics div{aspect-ratio:3/4;overflow:hidden}.custom .pics div:first-child{margin-top:50px}
.custom h2{font-size:clamp(36px,4.2vw,56px);line-height:1.02;margin:14px 0 18px}.custom p{color:var(--muted);margin-bottom:26px;max-width:460px}
.steps{display:grid;gap:14px;margin-bottom:30px}.steps>div{display:flex;gap:16px;align-items:flex-start;padding:16px;background:var(--paper);border:1px solid var(--line)}
.steps b{font-family:var(--display);font-size:26px;color:var(--accent);line-height:1}.steps h5{font-size:15px;font-weight:600}.steps p{margin:0;font-size:14px}
.social{background:var(--paper)}
.social-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.social-grid div{aspect-ratio:9/14;overflow:hidden;position:relative}
.social-grid span{position:absolute;left:12px;bottom:12px;color:#fff;font-family:var(--display);font-style:italic;font-size:18px;text-shadow:0 2px 12px rgba(0,0,0,.5)}
footer{background:var(--ink);color:#BDB8C4;padding:70px 0 34px}.foot{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}.foot .logo{color:#fff}
.foot h6{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#fff;font-weight:500;margin-bottom:16px}.foot ul{list-style:none;display:grid;gap:9px;font-size:14px}
.copy{margin-top:50px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px}
.scrim{position:fixed;inset:0;background:rgba(20,18,24,.5);z-index:70;opacity:0;pointer-events:none;transition:.3s}
.drawer{position:fixed;top:0;right:0;bottom:0;width:min(420px,100%);background:#fff;z-index:80;transform:translateX(100%);transition:transform .35s cubic-bezier(.2,.7,.2,1);display:flex;flex-direction:column}
.open .scrim{opacity:1;pointer-events:auto}.open .drawer{transform:none}
.drawer .dh{display:flex;justify-content:space-between;align-items:center;padding:22px 24px;border-bottom:1px solid var(--line)}.drawer .dh h3{font-size:26px}
.lines{flex:1;overflow:auto;padding:12px 24px}
.line{display:grid;grid-template-columns:64px 1fr auto;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.line img{width:64px;height:80px;object-fit:cover}.line h5{font-family:var(--display);font-weight:400;font-size:16px}.line small{color:var(--muted)}.line button{font-size:12px;color:var(--muted);text-decoration:underline}
.empty{padding:40px 0;color:var(--muted);text-align:center}
.sum{padding:22px 24px;border-top:1px solid var(--line);display:grid;gap:12px}.sum .row{display:flex;justify-content:space-between;font-size:15px}.sum .row b{font-size:18px}
.sum .btn{justify-content:center}.sum .hint{font-size:12px;color:var(--muted);text-align:center;min-height:18px}
@media (max-width:1000px){.hero-grid,.custom{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,1fr)}.trustbar .wrap{grid-template-columns:1fr 1fr}
.social-grid{grid-template-columns:repeat(3,1fr)}.social-grid div:nth-child(n+4){display:none}.foot{grid-template-columns:1fr 1fr}}
@media (max-width:700px){.wrap{padding:0 16px}.nav-links{display:none}.hero-grid{padding-block:44px 0}section{padding:68px 0}
.grid{gap:12px}.card h4{font-size:17px}.add{transform:none;padding:9px;font-size:11px}.trustbar .wrap{grid-template-columns:1fr}
.trustbar .wrap>div{border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.social-grid{grid-template-columns:repeat(2,1fr)}.social-grid div:nth-child(n+3){display:none}
.foot{grid-template-columns:1fr}.price-pop{display:none}.concept{bottom:12px;right:12px}}
`;

export function render(cfg, siteUrl) {
  const { brand, hero, shop, trust = [], custom, social, footer } = cfg;
  const tick = (cfg.ticker || []).map((t) => `<span>✦ ${esc(t)}</span>`).join('');
  const body = `
${tick ? `<div class="ticker"><div>${tick}${tick}</div></div>` : ''}
<header class="top"><div class="wrap nav">
  <a href="#" class="logo">${esc(brand.name)}<small>${esc(brand.sub)}</small></a>
  <nav class="nav-links">${navLinks(cfg.nav)}</nav>
  <button class="bagbtn" id="openBag" aria-label="Open bag">Bag <b id="count">0</b></button>
</div></header>

<section class="hero" style="padding:0"><div class="wrap hero-grid">
  <div>
    <span class="eyebrow">${esc(hero.eyebrow)}</span>
    <h1>${hero.headlineHtml}</h1>
    <p>${esc(hero.text)}</p>
    <div class="btns">${link(hero.primary, 'btn soft')}${link(hero.secondary, 'btn out')}</div>
    ${hero.stats?.length ? `<div class="trust">${hero.stats.map((s) => `<div><b>${esc(s.value)}</b>${esc(s.label)}</div>`).join('')}</div>` : '<div style="height:56px"></div>'}
  </div>
  <div class="hero-art">
    ${hero.images.slice(0, 2).map((i) => `<div class="tall"><img class="ph" src="${img(i.src)}" alt="${esc(i.alt)}" style="object-position:${esc(i.pos || 'center')}"></div>`).join('')}
    ${hero.pricePop ? `<div class="price-pop"><s>${esc(hero.pricePop.was)}</s><b>${esc(hero.pricePop.now)}</b>${esc(hero.pricePop.label)}</div>` : ''}
  </div>
</div></section>

<section id="shop"><div class="wrap">
  <div class="head">
    <div><span class="eyebrow">${esc(shop.eyebrow)}</span><h2>${esc(shop.title)}</h2></div>
    ${shop.filters?.length ? `<div class="filters">${[{ key: 'all', label: 'All' }, ...shop.filters].map((f, i) => `<button class="chip${i ? '' : ' on'}" data-f="${esc(f.key)}">${esc(f.label)}</button>`).join('')}</div>` : ''}
  </div>
  <div class="grid" id="grid"></div>
  ${shop.note ? `<p class="note">${esc(shop.note)}</p>` : ''}
</div></section>

${trust.length ? `<div class="trustbar" id="info"><div class="wrap">${trust.map((t) => `<div><h5>${esc(t.title)}</h5><p>${esc(t.text)}</p></div>`).join('')}</div></div>` : ''}

${custom ? `<section id="custom"><div class="wrap custom">
  <div class="pics">${custom.images.slice(0, 2).map((i) => `<div><img class="ph" src="${img(i.src)}" alt="${esc(i.alt)}" loading="lazy"></div>`).join('')}</div>
  <div>
    <span class="eyebrow">${esc(custom.eyebrow)}</span><h2>${esc(custom.title)}</h2><p>${esc(custom.text)}</p>
    <div class="steps">${custom.steps.map((s, i) => `<div><b>${i + 1}</b><div><h5>${esc(s.title)}</h5><p>${esc(s.text)}</p></div></div>`).join('')}</div>
    <button class="btn ink" id="customCta" data-msg="${esc(custom.ctaMsg || 'The custom order form opens here.')}">${esc(custom.cta)}</button>
  </div>
</div></section>` : ''}

${social ? `<section class="social" id="social"><div class="wrap">
  <div class="head"><div><span class="eyebrow">@${esc(cfg.instagram)}</span><h2>${esc(social.title)}</h2></div><a href="https://www.instagram.com/${esc(cfg.instagram)}/" target="_blank" rel="noopener">Follow on Instagram</a></div>
  <div class="social-grid">${social.items.map((i) => `<div><img class="ph" src="${img(i.src)}" alt="${esc(i.alt || i.caption)}" loading="lazy"><span>${esc(i.caption)}</span></div>`).join('')}</div>
</div></section>` : ''}

<footer><div class="wrap">
  <div class="foot"><div><div class="logo">${esc(brand.name)}<small>${esc(brand.sub)}</small></div><p style="margin-top:18px;max-width:300px;font-size:14px">${esc(footer.blurb)}</p></div>${footerCols(footer.columns)}</div>
  <div class="copy"><span>© ${esc(footer.legal)}</span><span>Website concept · not a live store</span></div>
</div></footer>

<div class="scrim" id="scrim"></div>
<aside class="drawer" aria-label="Your bag">
  <div class="dh"><h3>Your bag</h3><button id="closeBag" aria-label="Close bag" style="font-size:22px">×</button></div>
  <div class="lines" id="lines"></div>
  <div class="sum">
    <div class="row"><span>Subtotal</span><b id="subtotal">0</b></div>
    <button class="btn ink" id="checkout">Checkout with Paystack</button>
    ${cfg.whatsappOrder !== false ? '<button class="btn" style="border:1px solid var(--line)" id="waOrder">Send order on WhatsApp</button>' : ''}
    <div class="hint" id="hint"></div>
  </div>
</aside>`;
  return page({
    cfg, defaults, css, body, siteUrl,
    script: { file: 'store.js', data: { currency: shop.currency || '₦', products: shop.products, name: brand.name } },
  });
}
