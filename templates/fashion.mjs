// FASHION template — editorial fashion brand with colour story, products with colour swatches,
// ₦/$ toggle, detail/fabric section, packaging story and social strip (originally ELO).
import { esc, img, link, navLinks, footerCols, page } from './lib.mjs';

const defaults = {
  '--bg': '#F7F4EF', '--paper': '#FFFFFF', '--stone': '#ECE7DF', '--ink': '#2B2A26', '--muted': '#7A766D', '--accent': '#8C8A3A',
  '--story-bg': '#EDE5F7', '--hero-bg': '#EEF0C9', '--badge': 'var(--ink)',
  '--serif': "'Cormorant Garamond',Georgia,serif", '--sans': "'Jost',system-ui,sans-serif",
};

const css = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-weight:300;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%}button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
.wrap{max-width:1240px;margin:0 auto;padding:0 32px}.eyebrow{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);font-weight:400}
h1,h2,h3{font-family:var(--serif);font-weight:400;letter-spacing:.01em;text-wrap:balance}.ph{width:100%;height:100%;object-fit:cover}
.announce{background:var(--ink);color:var(--bg);text-align:center;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;padding:10px 16px}
header.top{position:sticky;top:0;z-index:40;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--stone)}
.nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:72px}
.nav-links{display:flex;gap:28px;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase}
.logo{font-family:var(--serif);font-size:34px;letter-spacing:.14em;font-weight:500;text-align:center;line-height:1}
.logo small{display:block;font-size:9px;letter-spacing:.32em;font-family:var(--sans);font-weight:300;color:var(--muted);margin-top:4px}
.nav-right{display:flex;justify-content:flex-end;align-items:center;gap:22px;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase}
.cur{display:flex;border:1px solid var(--stone);border-radius:999px;padding:3px}.cur button{padding:4px 10px;border-radius:999px;font-size:11px;letter-spacing:.12em}.cur button.on{background:var(--ink);color:var(--bg)}
.bag{display:flex;align-items:center;gap:6px}.bag span{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--story-bg);font-size:11px}
.hero-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:center;padding-block:56px 80px}
.hero h1{font-size:clamp(52px,7.2vw,104px);line-height:.95;margin:20px 0 26px}.hero h1 em{font-style:italic;color:var(--accent)}
.hero p{max-width:420px;font-size:17px;color:var(--muted);margin-bottom:36px}.btns{display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;padding:16px 30px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;border:1px solid var(--ink);transition:all .3s}
.btn.solid{background:var(--ink);color:var(--bg)}.btn.solid:hover{background:var(--accent);border-color:var(--accent)}.btn.ghost:hover{background:var(--ink);color:var(--bg)}
.hero-art{display:grid;grid-template-columns:1.35fr 1fr;gap:16px;align-items:end}
.hero-main{aspect-ratio:3/4;border-radius:320px 320px 0 0;overflow:hidden;background:var(--hero-bg)}
.hero-side{display:grid;gap:16px}.hero-side .ph-box{aspect-ratio:3/4;overflow:hidden;background:var(--stone)}
.hero-tag{background:var(--paper);padding:16px 18px;font-size:12.5px;box-shadow:0 10px 30px rgba(0,0,0,.06)}.hero-tag b{font-family:var(--serif);font-size:22px;font-weight:500;display:block;line-height:1.1;margin:4px 0 2px}
.marquee{border-top:1px solid var(--stone);border-bottom:1px solid var(--stone);overflow:hidden;white-space:nowrap;padding:18px 0;background:var(--paper)}
.marquee div{display:inline-block;animation:scroll 36s linear infinite;font-family:var(--serif);font-size:24px;font-style:italic;color:var(--muted)}.marquee span{margin:0 28px;color:var(--accent);font-style:normal}
@keyframes scroll{to{transform:translateX(-50%)}}
section{padding:110px 0}.sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:48px;flex-wrap:wrap}
.sec-head h2{font-size:clamp(38px,4.6vw,60px);line-height:1}.sec-head a{font-size:12px;letter-spacing:.2em;text-transform:uppercase;border-bottom:1px solid var(--ink);padding-bottom:4px}
.colours{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.colour{position:relative;aspect-ratio:3/4;overflow:hidden;cursor:pointer}.colour img{transition:transform 1s cubic-bezier(.2,.7,.2,1)}.colour:hover img{transform:scale(1.05)}
.colour .label{position:absolute;left:0;right:0;bottom:0;padding:60px 28px 26px;background:linear-gradient(180deg,transparent,rgba(30,28,20,.45));color:#fff;display:flex;justify-content:space-between;align-items:flex-end}
.colour .label h3{font-size:44px;line-height:1}.colour .label p{font-size:11px;letter-spacing:.22em;text-transform:uppercase}
.products{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.card .img{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--stone)}.card .img img{transition:transform .8s cubic-bezier(.2,.7,.2,1)}.card:hover .img img{transform:scale(1.04)}
.badge{position:absolute;top:14px;left:14px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;background:var(--ink);color:var(--bg);padding:5px 10px;z-index:1}
.quick{position:absolute;left:14px;right:14px;bottom:14px;background:var(--ink);color:var(--bg);text-align:center;padding:12px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;transform:translateY(160%);transition:transform .35s;z-index:1}
.card:hover .quick,.quick:focus{transform:none}
.card .meta{display:flex;justify-content:space-between;align-items:flex-start;margin-top:16px;gap:10px}.card h4{font-family:var(--serif);font-size:22px;font-weight:500;line-height:1.15}
.card h4 span{display:block;font-family:var(--sans);font-size:13px;font-weight:300;color:var(--muted);margin-top:4px}.card .price{font-size:14px;white-space:nowrap}
.swatches{display:flex;gap:8px;margin-top:10px}.sw{width:18px;height:18px;border-radius:50%;border:1px solid rgba(0,0,0,.12);outline:1px solid transparent;outline-offset:2px}.sw.on{outline-color:var(--ink)}
.note{margin-top:22px;font-size:12px;color:var(--muted)}
.details{background:var(--paper)}.details-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.diagrams{display:grid;grid-template-columns:1fr 1fr;gap:14px}.diagrams div{aspect-ratio:3/4;overflow:hidden;background:#F4F4F2}.diagrams div:nth-child(2){margin-top:60px}
.feats{display:grid;grid-template-columns:1fr 1fr;gap:34px 30px;margin-top:40px}.feat h4{font-family:var(--serif);font-size:24px;font-weight:500;margin-bottom:6px}.feat p{font-size:14.5px;color:var(--muted)}
.feat i{display:block;width:26px;height:26px;border-radius:50%;margin-bottom:12px}
.story{display:grid;grid-template-columns:1.1fr 1fr;background:var(--story-bg)}.story .art{min-height:560px;overflow:hidden}
.story .txt{padding:80px 64px;display:flex;flex-direction:column;justify-content:center}.story h2{font-size:clamp(38px,4.4vw,58px);line-height:1.02;margin:16px 0 22px}.story p{color:var(--muted);max-width:420px;margin-bottom:32px}
.ig{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.ig a{aspect-ratio:9/14;position:relative;overflow:hidden;display:block;background:var(--stone)}
.ig .play{position:absolute;top:12px;right:12px;width:28px;height:28px;border:1px solid rgba(255,255,255,.9);border-radius:50%;display:grid;place-items:center;font-size:9px;color:#fff;background:rgba(0,0,0,.15)}
.info{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--stone);border-bottom:1px solid var(--stone)}
.info div{padding:38px 28px;border-right:1px solid var(--stone)}.info div:last-child{border-right:0}.info h5{font-family:var(--serif);font-size:22px;font-weight:500;margin-bottom:6px}.info p{font-size:13.5px;color:var(--muted)}
.join{text-align:center;padding:120px 0}.join h2{font-size:clamp(40px,5vw,68px);line-height:1;margin:16px 0 18px}.join p{color:var(--muted);margin-bottom:34px}
.join form{display:flex;max-width:480px;margin:0 auto;border-bottom:1px solid var(--ink)}.join input{flex:1;min-width:0;border:0;background:transparent;padding:14px 4px;font:inherit;font-size:15px;outline:none;color:var(--ink)}
.join button{font-size:12px;letter-spacing:.22em;text-transform:uppercase;padding:0 6px}
footer{background:var(--ink);color:#cfcabf;padding:80px 0 40px}.foot{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}.foot .logo{text-align:left;color:var(--bg)}
.foot h6{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--bg);font-weight:400;margin-bottom:18px}.foot ul{list-style:none;display:grid;gap:10px;font-size:14px}
.copy{margin-top:60px;padding-top:24px;border-top:1px solid rgba(255,255,255,.15);display:flex;justify-content:space-between;font-size:12px;letter-spacing:.08em;flex-wrap:wrap;gap:10px}
@media (max-width:1000px){.hero-grid{grid-template-columns:1fr;gap:40px}.products{grid-template-columns:repeat(2,1fr)}.ig{grid-template-columns:repeat(3,1fr)}.ig a:nth-child(n+4){display:none}
.details-grid,.story{grid-template-columns:1fr;gap:50px}.info{grid-template-columns:1fr 1fr}.foot{grid-template-columns:1fr 1fr}}
@media (max-width:760px){.wrap{padding:0 16px}.nav{grid-template-columns:auto 1fr auto}.nav-links{display:none}.logo{text-align:left;font-size:28px}.nav-right{gap:14px}.nav-right .hide-m{display:none}
.hero-grid{padding-block:40px 60px}section{padding:72px 0}.products{gap:14px}.card h4{font-size:18px}.card .meta{flex-direction:column;gap:2px}.quick{transform:none;padding:9px;font-size:10px}
.feats{grid-template-columns:1fr}.story .txt{padding:56px 20px}.story .art{min-height:360px}.ig{grid-template-columns:repeat(2,1fr)}.ig a:nth-child(n+3){display:none}
.info{grid-template-columns:1fr}.info div{border-right:0;border-bottom:1px solid var(--stone)}.foot{grid-template-columns:1fr}.concept{bottom:12px;right:12px}}
`;

export function render(cfg, siteUrl) {
  const { brand, hero, colours, shop, details, story, social, info = [], join, footer } = cfg;
  const marquee = (cfg.marquee || []).map((m) => `${esc(m)} <span>✦</span> `).join('');
  const ig = `https://www.instagram.com/${esc(cfg.instagram)}/`;
  const body = `
${cfg.announce ? `<div class="announce">${esc(cfg.announce)}</div>` : ''}
<header class="top"><div class="wrap nav">
  <nav class="nav-links">${navLinks(cfg.nav)}</nav>
  <a href="#" class="logo">${esc(brand.name)}<small>${esc(brand.sub)}</small></a>
  <div class="nav-right">${shop.usd !== false ? '<div class="cur" role="group" aria-label="Currency"><button class="on" data-cur="ngn">₦ NGN</button><button data-cur="usd">$ USD</button></div>' : ''}<a href="#" class="hide-m">Account</a><a href="#" class="bag">Bag <span id="bagCount">0</span></a></div>
</div></header>

<section class="hero" style="padding:0"><div class="wrap hero-grid">
  <div><span class="eyebrow">${esc(hero.eyebrow)}</span><h1>${hero.headlineHtml}</h1><p>${esc(hero.text)}</p><div class="btns">${link(hero.primary, 'btn solid')}${link(hero.secondary, 'btn ghost')}</div></div>
  <div class="hero-art">
    <div class="hero-main"><img class="ph" src="${img(hero.main.src)}" alt="${esc(hero.main.alt)}" style="object-position:${esc(hero.main.pos || 'center')}"></div>
    <div class="hero-side">${hero.tag ? `<div class="hero-tag"><span class="eyebrow">${esc(hero.tag.eyebrow)}</span><b>${esc(hero.tag.title)}</b>${esc(hero.tag.text)}</div>` : ''}${hero.side ? `<div class="ph-box"><img class="ph" src="${img(hero.side.src)}" alt="${esc(hero.side.alt)}" style="object-position:${esc(hero.side.pos || 'center')}"></div>` : ''}</div>
  </div>
</div></section>

${marquee ? `<div class="marquee"><div>${marquee.repeat(4)}</div></div>` : ''}

${colours ? `<section id="colours"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">${esc(colours.eyebrow)}</span><h2>${colours.titleHtml || esc(colours.title)}</h2></div><a href="#shop">View all</a></div>
  <div class="colours">${colours.items.map((c) => `<a class="colour" href="#shop" data-pick="${esc(c.key)}"><img class="ph" src="${img(c.img)}" alt="${esc(c.label)}" loading="lazy" style="object-position:${esc(c.pos || 'center')}"><div class="label"><h3>${esc(c.label)}</h3><p>${esc(c.sub)}</p></div></a>`).join('')}</div>
</div></section>` : ''}

<section id="shop" style="padding-top:${colours ? 0 : 110}px"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">${esc(shop.eyebrow)}</span><h2>${esc(shop.title)}</h2></div>${shop.link ? link(shop.link) : ''}</div>
  <div class="products" id="products"></div>
  ${shop.note ? `<p class="note">${esc(shop.note)}</p>` : ''}
</div></section>

${details ? `<section class="details" id="details"><div class="wrap details-grid">
  <div class="diagrams">${details.images.slice(0, 2).map((i) => `<div><img class="ph" src="${img(i.src)}" alt="${esc(i.alt)}" loading="lazy" style="object-fit:${esc(i.fit || 'cover')}"></div>`).join('')}</div>
  <div><span class="eyebrow">${esc(details.eyebrow)}</span><h2 style="font-size:clamp(38px,4.4vw,58px);line-height:1.02;margin-top:14px">${details.titleHtml || esc(details.title)}</h2>
    <div class="feats">${details.feats.map((f) => `<div class="feat"><i style="background:${esc(f.swatch || 'var(--accent)')}"></i><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>`).join('')}</div></div>
</div></section>` : ''}

${story ? `<section style="padding:0"><div class="story"><div class="art"><img class="ph" src="${img(story.img)}" alt="${esc(story.alt)}" loading="lazy"></div>
  <div class="txt"><span class="eyebrow">${esc(story.eyebrow)}</span><h2>${story.titleHtml || esc(story.title)}</h2><p>${esc(story.text)}</p>${link(story.cta, 'btn solid')}</div></div></section>` : ''}

${social ? `<section id="social"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">@${esc(cfg.instagram)}</span><h2>${esc(social.title)}</h2></div><a href="${ig}" target="_blank" rel="noopener">Follow along</a></div>
  <div class="ig">${social.items.map((i) => `<a href="${ig}" target="_blank" rel="noopener"><img class="ph" src="${img(i.src)}" alt="${esc(i.alt)}" loading="lazy">${i.video ? '<span class="play">▶</span>' : ''}</a>`).join('')}</div>
</div></section>` : ''}

${info.length ? `<div class="wrap"><div class="info">${info.map((i) => `<div><h5>${esc(i.title)}</h5><p>${esc(i.text)}</p></div>`).join('')}</div></div>` : ''}

${join ? `<section class="join"><div class="wrap"><span class="eyebrow">${esc(join.eyebrow)}</span><h2>${join.titleHtml || esc(join.title)}</h2><p>${esc(join.text)}</p>
  <form id="join"><input id="email" type="email" placeholder="Your email address" aria-label="Email"><button type="submit">Subscribe →</button></form></div></section>` : ''}

<footer><div class="wrap">
  <div class="foot"><div><div class="logo">${esc(brand.name)}</div><p style="margin-top:20px;max-width:280px;font-size:14px">${esc(footer.blurb)}</p></div>${footerCols(footer.columns)}</div>
  <div class="copy"><span>© ${esc(footer.legal)}</span><span>Homepage concept · not a live store</span></div>
</div></footer>`;
  return page({
    cfg, defaults, css, body, siteUrl,
    script: { file: 'fashion.js', data: { colors: shop.colors || {}, products: shop.products } },
  });
}
