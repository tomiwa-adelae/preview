# Previews hub

Concept website previews for prospective clients. One repo, one Vercel project, one link per business:

```
https://<your-project>.vercel.app/<slug>/
```

No dependencies: only Node 18+.

## Templates

| Template | Use for | Example site |
|---|---|---|
| `fashion` | Fashion brands with colours/variants, ₦/$ prices | `sites/elo` |
| `store` | Product stores (hair, perfume, kidswear, gym wear…) with filters, bag and checkout | `sites/koza-hair` |
| `booking` | Service businesses (makeup, salons, spas, lash techs, caterers, chefs), with optional class/event + countdown | `sites/highlights-by-sophie` |
| `portfolio` | Project-led businesses (interiors, events, decor, photographers) with an enquiry form | `sites/prime-luxury-ville` |

## Add a new preview (20–40 min)

```bash
node new.mjs glee-spa booking        # copies the example site as a draft
# 1. put their photos in sites/glee-spa/photos/
# 2. edit sites/glee-spa/site.json — text, colours (theme.vars), fonts (theme.fontsHref), items, photo names
# 3. delete the "draft": true line
node build.mjs glee-spa              # builds just that site and checks every photo exists
git add sites/glee-spa && git commit -m "Add glee-spa preview" && git push   # Vercel redeploys
```

Open `dist/<slug>/index.html` in a browser to check it before pushing.

### Tips
- Fields ending in `Html` (e.g. `headlineHtml`) accept HTML like `<em>` and `<br>`. Everything else is plain text.
- Colours: copy them from the brand's own posts and flyers. Set `--accent`, `--dark`, `--bg` first.
- `ogImage` is the photo shown when the link is shared on WhatsApp/Instagram. Pick the strongest one.
- Mark anything you made up (product names, prices, terms) with a `note`.
- Resize photos to max 1200×1600 before adding them, so pages load fast on mobile data.

## Take a preview down

Delete `sites/<slug>/`, commit, push. Or add `"draft": true` to its `site.json` to hide it without deleting.

## Deploy (once)

Import this repo at vercel.com/new and leave the defaults: `vercel.json` already sets the build command and output folder.
The root URL shows nothing and `robots.txt` blocks search engines, so businesses are never listed publicly.
