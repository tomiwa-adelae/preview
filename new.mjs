// Starts a new preview from one of the four example sites.
// Usage: node new.mjs <slug> <template>
//   e.g. node new.mjs glee-spa booking
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const EXAMPLES = { fashion: 'elo', store: 'koza-hair', booking: 'highlights-by-sophie', portfolio: 'prime-luxury-ville' };
const [slug, template] = process.argv.slice(2);

if (!slug || !EXAMPLES[template]) {
  console.log('Usage: node new.mjs <slug> <template>\nTemplates: ' + Object.keys(EXAMPLES).join(', '));
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) { console.error('Slug must be lowercase letters, numbers and dashes, e.g. glee-spa'); process.exit(1); }
const dir = join(ROOT, 'sites', slug);
if (existsSync(dir)) { console.error(`sites/${slug} already exists`); process.exit(1); }

const cfg = JSON.parse(readFileSync(join(ROOT, 'sites', EXAMPLES[template], 'site.json'), 'utf8'));
cfg.draft = true; // remove this line when the site is ready to publish
mkdirSync(join(dir, 'photos'), { recursive: true });
writeFileSync(join(dir, 'site.json'), JSON.stringify(cfg, null, 2) + '\n');
console.log(`Created sites/${slug}/ from the "${EXAMPLES[template]}" example (${template} template).
Next:
  1. Put their photos in sites/${slug}/photos/
  2. Edit sites/${slug}/site.json (text, colours, fonts, products, photo file names)
  3. Delete the "draft": true line
  4. node build.mjs ${slug}`);
