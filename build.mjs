// Builds every site in sites/<slug>/site.json into dist/<slug>/index.html.
// Usage: node build.mjs            (all sites)
//        node build.mjs koza-hair  (one site)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITES = join(ROOT, 'sites');
const DIST = join(ROOT, 'dist');
const TEMPLATES = ['fashion', 'store', 'booking', 'portfolio'];

const siteUrl = (process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')).replace(/\/$/, '');

const only = process.argv[2];
if (!only) rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'assets'), { recursive: true });

// Client scripts
for (const t of TEMPLATES) cpSync(join(ROOT, 'templates', `${t}.client.js`), join(DIST, 'assets', `${t}.js`));

// Root page and robots: never list the businesses publicly.
writeFileSync(join(DIST, 'index.html'), '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Previews</title><body style="font:16px system-ui;padding:40px;color:#444">Nothing to see here.</body>');
writeFileSync(join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

const slugs = readdirSync(SITES, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_') && (!only || d.name === only))
  .map((d) => d.name);

let problems = 0;
for (const slug of slugs) {
  const dir = join(SITES, slug);
  const file = join(dir, 'site.json');
  if (!existsSync(file)) { console.warn(`! ${slug}: no site.json, skipped`); continue; }
  let cfg;
  try { cfg = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { console.error(`✗ ${slug}: site.json is not valid JSON — ${e.message}`); problems++; continue; }
  if (cfg.draft) { console.log(`- ${slug}: draft, skipped`); continue; }
  cfg.slug = slug;
  if (!TEMPLATES.includes(cfg.template)) { console.error(`✗ ${slug}: unknown template "${cfg.template}" (use ${TEMPLATES.join(', ')})`); problems++; continue; }

  const { render } = await import(pathToFileURL(join(ROOT, 'templates', `${cfg.template}.mjs`)).href);
  let html;
  try { html = render(cfg, siteUrl); } catch (e) { console.error(`✗ ${slug}: ${e.message}`); problems++; continue; }

  const out = join(DIST, slug);
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'index.html'), html);
  if (existsSync(join(dir, 'photos'))) cpSync(join(dir, 'photos'), join(out, 'photos'), { recursive: true });

  // Check every photo the page (or its data) points to actually exists.
  const refs = new Set([...html.matchAll(/photos\/([\w.-]+\.(?:jpe?g|png|webp))/gi)].map((m) => m[1]));
  for (const m of JSON.stringify(cfg).matchAll(/"([\w.-]+\.(?:jpe?g|png|webp))"/gi)) refs.add(m[1]);
  const missing = [...refs].filter((r) => !existsSync(join(dir, 'photos', r)));
  if (missing.length) { console.error(`✗ ${slug}: missing photos → ${missing.join(', ')}`); problems++; }
  else console.log(`✓ ${slug} (${cfg.template}) → dist/${slug}/  [${refs.size} photos]`);
}
if (!siteUrl) console.log('\nNote: SITE_URL not set, so link previews (og:image) use no absolute URL. Vercel sets this automatically.');
if (problems) { console.error(`\n${problems} problem(s) found.`); process.exit(1); }
