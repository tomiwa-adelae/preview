// BOOKING template — services, optional featured event/class with countdown, portfolio, booking form
// (originally Highlights by Sophie). Fits makeup artists, salons, spas, lash techs, caterers, chefs.
import { esc, img, link, navLinks, footerCols, page } from './lib.mjs';

const defaults = {
  '--bg': '#FBF1EC', '--soft': '#F4D9D9', '--pink': '#E9A9B6', '--accent': '#C47F86', '--dark': '#4B2B24', '--dark-2': '#6E4339',
  '--paper': '#FFFFFF', '--ink': '#2C1B17', '--muted': '#8A716B', '--line': '#EEDDD6', '--on-dark': '#E9D6CF', '--badge': 'var(--dark)',
  '--display': "'DM Serif Display',Georgia,serif", '--sans': "'Outfit',system-ui,sans-serif",
};

const css = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-weight:300;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}img{display:block;max-width:100%}button,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;border:0;background:none}
.wrap{max-width:1240px;margin:0 auto;padding:0 32px}.eyebrow{font-size:11.5px;letter-spacing:.26em;text-transform:uppercase;font-weight:500;color:var(--accent)}
h1,h2,h3{font-family:var(--display);font-weight:400;text-wrap:balance}.ph{width:100%;height:100%;object-fit:cover}
header.top{position:sticky;top:0;z-index:40;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;height:74px;gap:20px}
.logo{display:flex;align-items:center;gap:12px}.mono{width:42px;height:42px;border:1.5px solid var(--dark);display:grid;place-items:center;font-family:var(--display);font-size:20px;color:var(--dark);letter-spacing:-.04em}
.logo span{font-size:11px;letter-spacing:.3em;text-transform:uppercase;font-weight:500;line-height:1.4}
.nav-links{display:flex;gap:30px;font-size:14px}.nav-links a:hover{color:var(--accent)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:15px 28px;border-radius:999px;font-size:13.5px;letter-spacing:.08em;font-weight:500;transition:.25s}
.btn.dark{background:var(--dark);color:var(--bg)}.btn.dark:hover{background:var(--accent)}
.btn.line{border:1px solid var(--dark)}.btn.line:hover{background:var(--dark);color:var(--bg)}.btn.sm{padding:11px 20px;font-size:13px}
.hero{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding-block:56px 90px}
.hero h1{font-size:clamp(50px,6.6vw,96px);line-height:.98;margin:16px 0 22px;color:var(--dark)}.hero h1 em{color:var(--accent)}
.hero p{font-size:17px;max-width:440px;color:var(--dark-2);margin-bottom:30px}.btns{display:flex;gap:12px;flex-wrap:wrap}
.meta-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:34px}.pill{border:1px solid var(--line);background:var(--paper);border-radius:999px;padding:7px 14px;font-size:13px}
.hero-art{position:relative}.hero-art .main{aspect-ratio:4/5;border-radius:999px 999px 24px 24px;overflow:hidden}
.hero-art .mini{position:absolute;width:38%;aspect-ratio:3/4;left:-12%;bottom:-8%;border:8px solid var(--bg);border-radius:18px;overflow:hidden}
.hero-art .stamp{position:absolute;right:-4%;top:8%;width:120px;height:120px;border-radius:50%;background:var(--pink);display:grid;place-items:center;text-align:center;font-family:var(--display);font-size:16px;line-height:1.1;color:var(--dark);animation:spin 18s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
section{padding:100px 0}.head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:40px}
.head h2{font-size:clamp(38px,4.6vw,62px);line-height:1;color:var(--dark)}
.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
.svc{background:var(--paper);border-radius:20px;overflow:hidden;display:flex;flex-direction:column}
.svc .img{aspect-ratio:4/5;overflow:hidden}.svc .img img{transition:transform .8s}.svc:hover .img img{transform:scale(1.05)}
.svc .body{padding:20px 20px 24px;display:flex;flex-direction:column;gap:8px;flex:1}.svc h3{font-size:26px;color:var(--dark)}
.svc .price{font-size:14px;font-weight:500;color:var(--dark)}.svc p{font-size:14.5px;color:var(--muted);flex:1}.svc a{font-size:13px;font-weight:500;color:var(--accent)}
.feature{background:linear-gradient(180deg,var(--soft),color-mix(in srgb,var(--soft) 50%,var(--bg)))}
.mc{display:grid;grid-template-columns:1.05fr 1fr;gap:60px;align-items:center}
.mc .flyer{border-radius:24px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.15);transform:rotate(-1.5deg)}
.mc h2{font-size:clamp(44px,5.4vw,76px);line-height:.95;color:var(--dark);margin:14px 0 6px}.mc .sub{font-family:var(--display);font-style:italic;font-size:24px;color:var(--accent);margin-bottom:20px}
.mc p{color:var(--dark-2);max-width:460px;margin-bottom:26px}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:26px}.facts div{background:var(--paper);border-radius:16px;padding:16px}
.facts small{display:block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-weight:500}
.facts b{display:block;font-family:var(--display);font-weight:400;font-size:24px;color:var(--dark);margin-top:4px;line-height:1.1}.facts s{font-size:12px;color:var(--muted);text-decoration:none}
.count{display:flex;gap:10px;margin-bottom:26px;flex-wrap:wrap;align-items:center}
.count div{background:var(--dark);color:var(--bg);border-radius:12px;padding:10px 14px;text-align:center;min-width:64px}
.count b{display:block;font-family:var(--display);font-weight:400;font-size:26px;line-height:1}.count small{font-size:10px;letter-spacing:.16em;text-transform:uppercase}
.count span{font-size:13px;color:var(--dark-2);margin-left:6px}
.gallery{columns:4 220px;column-gap:14px}.gallery div{break-inside:avoid;margin-bottom:14px;border-radius:16px;overflow:hidden}.gallery img{width:100%;height:auto}
.book{display:grid;grid-template-columns:1fr 1.1fr;gap:60px;align-items:start}
.book .side h2{font-size:clamp(38px,4.4vw,58px);line-height:1;color:var(--dark);margin:14px 0 16px}.book .side p{color:var(--dark-2);margin-bottom:22px}
.terms{display:grid;gap:10px}.terms div{display:flex;gap:12px;font-size:14.5px;color:var(--dark-2)}.terms i{flex:none;width:8px;height:8px;border-radius:50%;background:var(--pink);margin-top:8px}
form.card{background:var(--paper);border-radius:24px;padding:32px;display:grid;grid-template-columns:1fr 1fr;gap:16px;box-shadow:0 20px 50px rgba(0,0,0,.06)}
form.card label{display:grid;gap:6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;color:var(--muted)}form.card .full{grid-column:1/-1}
form.card input,form.card select,form.card textarea{border:1px solid var(--line);border-radius:12px;padding:13px 14px;background:var(--bg);font-size:15px;text-transform:none;letter-spacing:0;font-weight:400;color:var(--ink);outline:none;width:100%}
form.card input:focus,form.card select:focus,form.card textarea:focus{border-color:var(--accent)}
.done{grid-column:1/-1;background:var(--soft);border-radius:14px;padding:16px;color:var(--dark);font-size:15px}
footer{background:var(--dark);color:var(--on-dark);padding:70px 0 34px}.foot{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}.foot .mono{border-color:var(--bg);color:var(--bg)}
.foot h6{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--bg);font-weight:500;margin-bottom:16px}.foot ul{list-style:none;display:grid;gap:9px;font-size:14px}
.copy{margin-top:50px;padding-top:22px;border-top:1px solid rgba(255,255,255,.15);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px}
@media (max-width:1000px){.hero,.mc,.book{grid-template-columns:1fr}.foot{grid-template-columns:1fr 1fr}.hero-art .mini{left:0}}
@media (max-width:700px){.wrap{padding:0 16px}.nav-links{display:none}section{padding:70px 0}.hero{padding-block:36px 70px}
.hero-art .stamp{width:92px;height:92px;font-size:13px;right:0}.facts{grid-template-columns:1fr}form.card{grid-template-columns:1fr;padding:22px}.foot{grid-template-columns:1fr}.concept{bottom:12px;right:12px}}
`;

const logo = (b) => `<a href="#" class="logo"><div class="mono">${esc(b.mono)}</div><span>${b.lines.map(esc).join('<br>')}</span></a>`;
const opts = (list = []) => list.map((o) => `<option>${esc(o)}</option>`).join('');

export function render(cfg, siteUrl) {
  const { brand, hero, services, feature, gallery, booking, footer } = cfg;
  const body = `
<header class="top"><div class="wrap nav">${logo(brand)}<nav class="nav-links">${navLinks(cfg.nav)}</nav>${link(cfg.navCta || { label: 'Book now', href: '#book' }, 'btn dark sm')}</div></header>

<div class="wrap hero">
  <div>
    <span class="eyebrow">${esc(hero.eyebrow)}</span>
    <h1>${hero.headlineHtml}</h1>
    <p>${esc(hero.text)}</p>
    <div class="btns">${link(hero.primary, 'btn dark')}${link(hero.secondary, 'btn line')}</div>
    ${hero.pills?.length ? `<div class="meta-row">${hero.pills.map((p) => `<span class="pill">${esc(p)}</span>`).join('')}</div>` : ''}
  </div>
  <div class="hero-art">
    <div class="main"><img class="ph" src="${img(hero.main.src)}" alt="${esc(hero.main.alt)}" style="object-position:${esc(hero.main.pos || 'center 30%')}"></div>
    ${hero.mini ? `<div class="mini"><img class="ph" src="${img(hero.mini.src)}" alt="${esc(hero.mini.alt)}" style="object-position:${esc(hero.mini.pos || 'center 30%')}"></div>` : ''}
    ${hero.stampHtml ? `<div class="stamp">${hero.stampHtml}</div>` : ''}
  </div>
</div>

<section id="services" style="padding-top:0"><div class="wrap">
  <div class="head"><div><span class="eyebrow">${esc(services.eyebrow)}</span><h2>${esc(services.title)}</h2></div><a href="#book" class="btn line sm">Book any service</a></div>
  <div class="services">${services.items.map((s) => `<div class="svc"><div class="img"><img class="ph" src="${img(s.img)}" alt="${esc(s.title)}" loading="lazy" style="object-position:${esc(s.pos || 'center 25%')}"></div><div class="body"><h3>${esc(s.title)}</h3>${s.price ? `<div class="price">${esc(s.price)}</div>` : ''}<p>${esc(s.text)}</p><a href="#book">${esc(s.link || 'Book this →')}</a></div></div>`).join('')}</div>
</div></section>

${feature ? `<section class="feature" id="feature"><div class="wrap mc">
  <div class="flyer"><img src="${img(feature.image)}" alt="${esc(feature.title)}" loading="lazy"></div>
  <div>
    <span class="eyebrow">${esc(feature.eyebrow)}</span><h2>${esc(feature.title)}</h2>${feature.sub ? `<div class="sub">${esc(feature.sub)}</div>` : ''}
    <p>${esc(feature.text)}</p>
    ${feature.facts?.length ? `<div class="facts">${feature.facts.map((f) => `<div><small>${esc(f.label)}</small><b>${esc(f.value)}</b>${f.note ? `<s>${esc(f.note)}</s>` : ''}</div>`).join('')}</div>` : ''}
    ${feature.countdownTo ? `<div class="count" id="count" aria-live="polite"></div>` : ''}
    <button class="btn dark" id="featureCta">${esc(feature.cta)}</button>
    <p id="featureMsg" style="margin-top:14px;font-size:14px;min-height:20px"></p>
  </div>
</div></section>` : ''}

${gallery ? `<section id="work"><div class="wrap">
  <div class="head"><div><span class="eyebrow">${esc(gallery.eyebrow)}</span><h2>${esc(gallery.title)}</h2></div><a href="https://www.instagram.com/${esc(cfg.instagram)}/" target="_blank" rel="noopener" class="btn line sm">See more on Instagram</a></div>
  <div class="gallery">${gallery.images.map((i) => `<div><img src="${img(i.src || i)}" alt="${esc(i.alt || cfg.brand.lines.join(' ') + ' work')}" loading="lazy"></div>`).join('')}</div>
</div></section>` : ''}

<section id="book" style="background:var(--paper)"><div class="wrap book">
  <div class="side">
    <span class="eyebrow">${esc(booking.eyebrow)}</span><h2>${esc(booking.title)}</h2><p>${esc(booking.text)}</p>
    ${booking.terms?.length ? `<div class="terms">${booking.terms.map((t) => `<div><i></i>${esc(t)}</div>`).join('')}${booking.termsNote ? `<div><i></i><em>${esc(booking.termsNote)}</em></div>` : ''}</div>` : ''}
  </div>
  <form class="card" id="bookForm" data-who="${esc(booking.who || 'the team')}">
    <label>Your name<input id="b-name" required placeholder="Full name"></label>
    <label>${esc(booking.dateLabel || 'Date')}<input id="b-date" type="date" required></label>
    <label>Service<select id="b-svc">${opts(booking.services || services.items.map((s) => s.title))}</select></label>
    <label>${esc(booking.extra?.label || 'Location')}${booking.extra?.options ? `<select id="b-extra">${opts(booking.extra.options)}</select>` : `<input id="b-extra" placeholder="${esc(booking.extra?.placeholder || 'e.g. Lekki, Lagos')}">`}</label>
    <label>Phone / WhatsApp<input id="b-phone" placeholder="+234"></label>
    <label>Preferred time<input id="b-time" type="time"></label>
    <label class="full">Anything else?<textarea id="b-notes" rows="3" placeholder="${esc(booking.notesPlaceholder || 'Tell us what you have in mind…')}"></textarea></label>
    <button class="btn dark full" type="submit">${esc(booking.submit || 'Check availability')}</button>
  </form>
</div></section>

<footer><div class="wrap">
  <div class="foot"><div>${logo(brand)}<p style="margin-top:18px;max-width:300px;font-size:14px">${esc(footer.blurb)}</p></div>${footerCols(footer.columns)}</div>
  <div class="copy"><span>© ${esc(footer.legal)}</span><span>Website concept · not a live site</span></div>
</div></footer>`;
  return page({
    cfg, defaults, css, body, siteUrl,
    script: { file: 'booking.js', data: { countdownTo: feature?.countdownTo, countdownLabel: feature?.countdownLabel, countdownDone: feature?.countdownDone, featureMsg: feature?.ctaMsg } },
  });
}
