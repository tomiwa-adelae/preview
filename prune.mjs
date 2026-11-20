// Removes photos a site's site.json never mentions. Usage: node prune.mjs <slug> [<slug>...]
import { readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
for (const slug of process.argv.slice(2)) {
  const dir = join(ROOT, 'sites', slug);
  const json = readFileSync(join(dir, 'site.json'), 'utf8');
  const files = readdirSync(join(dir, 'photos'));
  const unused = files.filter((f) => !json.includes(`"${f}"`));
  const missing = [...json.matchAll(/"([\w.-]+\.(?:jpe?g|png|webp))"/gi)].map((m) => m[1]).filter((f) => !files.includes(f));
  if (missing.length) { console.error(`✗ ${slug}: site.json names photos that don't exist: ${[...new Set(missing)].join(', ')} (nothing removed)`); process.exitCode = 1; continue; }
  unused.forEach((f) => rmSync(join(dir, 'photos', f)));
  console.log(`✓ ${slug}: kept ${files.length - unused.length}, removed ${unused.length}`);
}
