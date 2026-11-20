// PORTFOLIO template — full-bleed hero, projects, services, process, gallery, enquiry form
// (originally Prime Luxury Ville). Fits interior designers, event planners/decorators, photographers.
import { esc, img, link, navLinks, footerCols, page } from './lib.mjs';

const defaults = {
  '--bg': '#F6F2EB', '--sand': '#E8DFD1', '--stone': '#CFC3B0', '--accent': '#B08D57', '--accent-dark': '#8C6D3F',
  '--dark': '#221B16', '--dark-2': '#3A3029', '--paper': '#FFFFFF', '--ink': '#221B16', '--muted': '#7D7368', '--line': '#E4DACB',
  '--hero-accent': '#E3C892', '--badge': 'var(--accent)',
  '--display': "'Marcellus',Georgia,serif", '--sans': "'Manrope',system-ui,sans-serif",
};

const css = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;border:0;background:none}
.wrap{max-width:1280px;margin:0 auto;padding:0 32px}.eyebrow{font-size:11px;letter-spacing:.3em;text-transform:uppercase;font-weight:600;color:var(--accent)}
h1,h2,h3{font-family:var(--display);font-weight:400;text-wrap:balance;letter-spacing:.01em}.ph{width:100%;height:100%;object-fit:cover}
header.top{position:absolute;top:0;left:0;right:0;z-index:30;color:#fff}.nav{display:flex;align-items:center;justify-content:space-between;height:86px;gap:20px}
.logo{font-family:var(--display);font-size:22px;letter-spacing:.2em;line-height:1.1;text-transform:uppercase}.logo small{display:block;font-family:var(--sans);font-size:9.5px;letter-spacing:.38em;opacity:.8}
.nav-links{display:flex;gap:32px;font-size:13px;letter-spacing:.14em;text-transform:uppercase}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:16px 30px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;transition:.3s}
.btn.accent{background:var(--accent);color:#fff}.btn.accent:hover{background:var(--accent-dark)}
.btn.ghost{border:1px solid rgba(255,255,255,.6);color:#fff}.btn.ghost:hover{background:#fff;color:var(--dark)}
.btn.dark{background:var(--dark);color:var(--bg)}.btn.dark:hover{background:var(--accent)}.btn.sm{padding:12px 22px}
.hero{position:relative;min-height:min(92vh,860px);display:flex;align-items:flex-end;color:#fff;overflow:hidden}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:zoom 14s ease-out forwards}@keyframes zoom{from{transform:scale(1.08)}to{transform:scale(1)}}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,12,10,.5) 0%,rgba(15,12,10,.05) 35%,rgba(15,12,10,.7) 100%)}
.hero .wrap{position:relative;z-index:1;width:100%;padding-bottom:80px}.hero .eyebrow{color:var(--hero-accent)}
.hero h1{font-size:clamp(46px,6.6vw,98px);line-height:1;max-width:900px;margin:18px 0 26px}.hero p{max-width:520px;font-size:17px;color:#EFE7DA;margin-bottom:32px}
.btns{display:flex;gap:12px;flex-wrap:wrap}
.strip{background:var(--dark);color:var(--sand)}.strip .wrap{display:grid;grid-template-columns:repeat(4,1fr)}
.strip .wrap>div{padding:30px 24px;border-right:1px solid rgba(255,255,255,.08)}.strip .wrap>div:last-child{border-right:0}
.strip b{display:block;font-family:var(--display);font-weight:400;font-size:26px;color:#fff;line-height:1.15}.strip span{font-size:13px}
section{padding:110px 0}.head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:46px}
.head h2{font-size:clamp(38px,4.8vw,64px);line-height:1.02}.head p{max-width:420px;color:var(--muted)}
.projects{display:grid;grid-template-columns:1.4fr 1fr;gap:18px}
.proj{position:relative;overflow:hidden;background:var(--sand);display:block}.proj:first-child{grid-row:1/3;min-height:640px}.proj:not(:first-child){aspect-ratio:4/3}
.proj img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}.proj:hover img{transform:scale(1.05)}
.proj .cap{position:absolute;left:0;right:0;bottom:0;padding:70px 26px 24px;background:linear-gradient(180deg,transparent,rgba(15,12,10,.72));color:#fff;display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
.proj h3{font-size:30px;line-height:1.1}.proj small{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--stone)}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
.svc{padding:34px 26px 34px 0;border-right:1px solid var(--line)}.svc+.svc{padding-left:26px}.svc:last-child{border-right:0}
.svc h3{font-size:26px;margin-bottom:10px}.svc p{color:var(--muted);font-size:15px}
.process{background:var(--paper)}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.step .img{aspect-ratio:3/4;overflow:hidden;margin-bottom:18px}.step b{font-family:var(--display);font-weight:400;color:var(--accent);font-size:15px;letter-spacing:.2em}
.step h4{font-family:var(--display);font-weight:400;font-size:24px;margin:4px 0 6px}.step p{font-size:14.5px;color:var(--muted)}
.gal{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:180px;gap:12px}.gal div{overflow:hidden}.gal img{transition:transform .9s}.gal div:hover img{transform:scale(1.06)}
.g1{grid-column:span 2;grid-row:span 2}.g2{grid-column:span 2;grid-row:span 3}.g3{grid-column:span 2;grid-row:span 2}.g4{grid-column:span 2;grid-row:span 2}.g5{grid-column:span 2;grid-row:span 2}.g6{grid-column:span 2;grid-row:span 1}
.consult{background:var(--dark);color:var(--sand)}.consult .wrap{display:grid;grid-template-columns:1fr 1.1fr;gap:70px;align-items:start}
.consult h2{color:#fff;font-size:clamp(38px,4.6vw,60px);line-height:1.02;margin:16px 0 18px}.consult p{margin-bottom:28px;max-width:440px}
.contact{display:grid;gap:16px;font-size:15px}.contact b{display:block;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--accent);font-weight:600}
form{display:grid;grid-template-columns:1fr 1fr;gap:16px;background:var(--dark-2);padding:34px}
label{display:grid;gap:7px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--stone)}.full{grid-column:1/-1}
input,select,textarea{background:transparent;border:0;border-bottom:1px solid rgba(255,255,255,.25);padding:10px 0;font-size:15px;color:#fff;letter-spacing:0;text-transform:none;font-weight:400;outline:none;width:100%}
select option{color:#222}input:focus,select:focus,textarea:focus{border-color:var(--accent)}
.done{grid-column:1/-1;border:1px solid var(--accent);padding:16px;color:#fff;font-size:15px}
footer{background:color-mix(in srgb,var(--dark) 80%,#000);color:#A99D8E;padding:60px 0 30px}.foot{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap}.foot .logo{color:#fff}
.foot h6{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#fff;font-weight:600;margin-bottom:14px}.foot ul{list-style:none;display:grid;gap:8px;font-size:14px}
.copy{margin-top:44px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px}
@media (max-width:1000px){.projects{grid-template-columns:1fr}.proj:first-child{grid-row:auto;min-height:0;aspect-ratio:4/5}.svc-grid,.steps{grid-template-columns:1fr 1fr}
.svc{padding:28px 20px!important;border-bottom:1px solid var(--line)}.consult .wrap{grid-template-columns:1fr}.strip .wrap{grid-template-columns:1fr 1fr}.gal{grid-template-columns:repeat(4,1fr)}}
@media (max-width:700px){.wrap{padding:0 16px}.nav-links{display:none}section{padding:72px 0}.hero{min-height:640px}.svc-grid,.steps{grid-template-columns:1fr}.svc{border-right:0!important}
form{grid-template-columns:1fr;padding:22px}.gal{grid-template-columns:repeat(2,1fr);grid-auto-rows:160px}.gal div{grid-column:span 1!important;grid-row:span 2!important}.concept{bottom:12px;right:12px}}
`;

const sel = (id, label, list = []) => `<label>${esc(label)}<select id="${id}">${list.map((o) => `<option>${esc(o)}</option>`).join('')}</select></label>`;

export function render(cfg, siteUrl) {
  const { brand, hero, strip = [], projects, services, process, gallery, consult, footer } = cfg;
  const f = consult.fields || {};
  const body = `
<header class="top"><div class="wrap nav"><a href="#" class="logo">${esc(brand.name)}<small>${esc(brand.sub)}</small></a><nav class="nav-links">${navLinks(cfg.nav)}</nav>${link(cfg.navCta || { label: 'Get in touch', href: '#consult' }, 'btn ghost sm')}</div></header>

<section class="hero" style="padding:0">
  <img src="${img(hero.img)}" alt="${esc(hero.alt)}" style="object-position:${esc(hero.pos || 'center 60%')}">
  <div class="wrap"><span class="eyebrow">${esc(hero.eyebrow)}</span><h1>${esc(hero.headline)}</h1><p>${esc(hero.text)}</p><div class="btns">${link(hero.primary, 'btn accent')}${link(hero.secondary, 'btn ghost')}</div></div>
</section>

${strip.length ? `<div class="strip"><div class="wrap">${strip.map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div></div>` : ''}

<section id="work"><div class="wrap">
  <div class="head"><div><span class="eyebrow">${esc(projects.eyebrow)}</span><h2>${esc(projects.title)}</h2></div>${projects.text ? `<p>${esc(projects.text)}</p>` : ''}</div>
  <div class="projects">${projects.items.slice(0, 3).map((p) => `<a class="proj" href="#consult"><img class="ph" src="${img(p.img)}" alt="${esc(p.title)}" style="object-position:${esc(p.pos || 'center')}"><div class="cap"><div><small>${esc(p.kicker)}</small><h3>${esc(p.title)}</h3></div><span>→</span></div></a>`).join('')}</div>
  ${projects.note ? `<p style="margin-top:16px;font-size:12.5px;color:var(--muted)">${esc(projects.note)}</p>` : ''}
</div></section>

${services ? `<section id="services" style="padding-top:0"><div class="wrap">
  <div class="head"><div><span class="eyebrow">${esc(services.eyebrow)}</span><h2>${esc(services.title)}</h2></div></div>
  <div class="svc-grid">${services.items.map((s) => `<div class="svc"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}</div>
</div></section>` : ''}

${process ? `<section class="process" id="process"><div class="wrap">
  <div class="head"><div><span class="eyebrow">${esc(process.eyebrow)}</span><h2>${esc(process.title)}</h2></div></div>
  <div class="steps">${process.steps.map((s, i) => `<div class="step"><div class="img"><img class="ph" src="${img(s.img)}" alt="${esc(s.title)}" loading="lazy"></div><b>${String(i + 1).padStart(2, '0')}</b><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join('')}</div>
</div></section>` : ''}

${gallery ? `<section><div class="wrap">
  <div class="head"><div><span class="eyebrow">@${esc(cfg.instagram)}</span><h2>${esc(gallery.title)}</h2></div><a href="https://www.instagram.com/${esc(cfg.instagram)}/" target="_blank" rel="noopener" class="btn dark sm">Follow on Instagram</a></div>
  <div class="gal">${gallery.images.slice(0, 6).map((g, i) => `<div class="g${i + 1}"><img class="ph" src="${img(g.src || g)}" alt="${esc(g.alt || brand.name + ' detail')}" loading="lazy"></div>`).join('')}</div>
</div></section>` : ''}

<section class="consult" id="consult"><div class="wrap">
  <div><span class="eyebrow">${esc(consult.eyebrow)}</span><h2>${esc(consult.title)}</h2><p>${esc(consult.text)}</p>
    <div class="contact">${(consult.contact || []).map((c) => `<div><b>${esc(c.label)}</b>${esc(c.value)}</div>`).join('')}</div></div>
  <form id="consultForm" data-who="${esc(consult.who || 'the team')}">
    <label>Name<input id="c-name" required placeholder="Your full name"></label>
    <label>Phone / WhatsApp<input id="c-phone" placeholder="+234"></label>
    ${sel('c-type', f.typeLabel || 'Project type', f.types)}
    ${sel('c-loc', 'Location', f.locations || ['Lagos', 'Abuja', 'Elsewhere'])}
    ${sel('c-budget', 'Budget', f.budgets)}
    ${f.dateField ? `<label>${esc(f.dateField)}<input id="c-date" type="date"></label>` : sel('c-time', 'Timeline', f.timelines || ['As soon as possible', '1–3 months', '3–6 months', 'Just planning'])}
    <label class="full">${esc(f.notesLabel || 'Tell us more')}<textarea id="c-notes" rows="3" placeholder="${esc(f.notesPlaceholder || '')}"></textarea></label>
    <button class="btn accent full" type="submit">${esc(consult.submit || 'Send request')}</button>
  </form>
</div></section>

<footer><div class="wrap">
  <div class="foot"><div><div class="logo">${esc(brand.name)}<small>${esc(brand.sub)}</small></div><p style="margin-top:16px;max-width:320px;font-size:14px">${esc(footer.blurb)}</p></div>${footerCols(footer.columns)}</div>
  <div class="copy"><span>© ${esc(footer.legal)}</span><span>Website concept · not a live site</span></div>
</div></footer>`;
  return page({ cfg, defaults, css, body, siteUrl, script: { file: 'portfolio.js', data: {} } });
}
