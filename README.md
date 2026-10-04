# Khao Moo — The Ethnic Food Hub

The website for **Khao Moo**, a homegrown kitchen from Sivasagar, Assam. It's a single page built with React 19, Tailwind CSS 4 and Vite 7, with the fonts self-hosted.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
```

**Live site:** https://dibyajyotisatnami.github.io/Khao-Moo/

Every push to `main` or `claude/friendly-pasteur-ebyk4i` rebuilds the site and publishes it to the `gh-pages` branch (`.github/workflows/deploy.yml`), which GitHub Pages serves. Asset paths are relative (`base: './'`), so `dist/` also works on Netlify, Vercel, Cloudflare Pages or any other static host. If you move to a custom domain, update `siteUrl` in `src/config/site.js`.

## Where to edit things

| What | File |
| --- | --- |
| Restaurant details, address, phone, hours, links, copy, image slots, optional features | `src/config/site.js` |
| Menu (categories, dishes, prices, dietary labels, featured dishes) | `src/content/menu.js` |
| Sample/preview menu (used only if the real menu is emptied *and* the flag is on) | `src/content/sample-menu.js` |
| Photos | `public/images/` (WebP at 640 px and 1290 px wide) |
| Social sharing image (1200×630) | `public/og-image.jpg` |
| Downloadable menu | `public/khao-moo-menu.jpg` |
| Colours and fonts | `src/index.css` (`@theme` block) |

The page title, meta description, Open Graph/Twitter tags and the **Restaurant JSON-LD** are generated at build time from `site.js` (see `vite.config.js`). Only fields that are filled in end up in the structured data.

### Rule: only verified information
Leave a field as `null` (or `[]`) if it isn't confirmed. The site hides it automatically: no empty "Hours" block, no Call button without a number, no map embed without a checked URL, and no reviews unless they're real.

### Optional features (`site.features`)
- **`reservations`**: WhatsApp table-request form (name, date, time, guests, message). It validates input, blocks past dates and times, and opens WhatsApp with a formatted message. **Off** until the owner confirms they take reservation requests.
- **`menuFile`**: the "Download Menu" button.
- **`reviews`**: authentic reviews with their source. If the list is empty, the section becomes a "Find Us on Google Maps" link.
- **`site.maps.embedUrl`**: Google Maps iframe. Add it only after checking it shows the correct pin.

### Adding a photo
1. Export it about 1290 px wide and convert to WebP at 640 px and 1290 px, named `name-640.webp` and `name-1290.webp`.
2. Put both files in `public/images/`.
3. Reference it in `site.js` / `menu.js` with the `img()`/`photo()` helper, and give it accurate alt text.

Any image slot with `src: null` shows a styled placeholder at the same proportions, so the layout doesn't shift when a real photo is added.

## Accessibility and motion
- Semantic landmarks, a skip link, visible focus rings and labelled controls
- The lightbox traps focus and supports Esc and ←/→ (swipe on touch); focus returns to the photo you opened
- The mobile menu traps focus and closes on Esc
- Every animation (reveals, hero entrance, marquee, rotating badge, map pin pulse) turns off under `prefers-reduced-motion`

See **OWNER_HANDOFF.md** for what's still missing or unverified.
