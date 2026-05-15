# rjp.digital — STATUS

> Living document. Theo updates this pre-compression and on session-end.
> Last meaningful update: 2026-04-30 (pilot rollout of `.theo/` convention).

## Current state

The site is live (Astro 5.17.1, Tailwind v4, Node 22, Resend for contact form,
deployed via Docker + nginx on Dokploy). 8 components, 1 contact API route.

The brand identity has settled: **kraken mascot, no skull/face, three
tentacles, electric purple with pink/magenta double outline, hard cel-shading
on black bg.** Hero/Thinking/404 mascot poses are locked and live in
`/opt/data/work/images/` (see fact 18 in semantic_memory).

The wordmark uses a lighthouse-replaced "i" — direction-1 horizontal lockup.
Production composite still pending in Inkscape.

GSC service-account access is **not yet wired** for rjp.digital — the SA
`theodore-seo@theodore-seo.iam.gserviceaccount.com` needs to be added in
Google Search Console settings before Theo can pull SEO data.

## Open tasks

- [ ] Add `theodore-seo@theodore-seo.iam.gserviceaccount.com` to GSC for
  `rjp.digital` so SEO tools work
- [ ] Final Inkscape composite of the wordmark + tentacle lockup
- [ ] Ship a /blog or /writing route (currently no content surface)
- [ ] Consider Astro 6 upgrade — repo is on 5.17.1, HERMES.md prefers 6.x

## Recent activity

(none recorded yet — first session under the `.theo/` convention)

---

## Session checkpoints

(Theo appends `## Session checkpoint <ISO datetime>` blocks here when
compression fires or session ends.)

## Session checkpoint 2026-05-01T14:30:00Z

**Focus:** rjp.digital full site redesign + deploy prep

**Done this session:**
- Moved clean site to `/mnt/e/rjp-site/` (old folder was polluted with workspace junk)
- New lighthouse editorial design shipped: warm sand palette, Instrument Serif, weathered teal
- `rjp.digital` wordmark SVG logo — text-only, serif, amber dot on period
- Hero lighthouse illustration generated + portrait-cropped to fit frame
- Eworx case study added to Work section (live URL, real description)
- About section: availability badge + "How it works" 4-step process
- All Impeccable audit issues fixed: 5 Criticals, 11 Warnings, 10 Suggestions
- Removed: fake stat badges, mascot images, tentacle SVG, glassmorphism header
- Footer: two-row layout, wordmark logo, UK-based location
- OG image generated + wired up, theme-color fixed, fonts preloaded
- Contact form verified working on live site
- "Since 2018" eyebrow — consistent with 6+ years experience
- Site ready to deploy — James pushing via PowerShell to trigger Dokploy

**Open / next:**
- Testimonials (none yet — flag as first thing to add after next client)
- `50+` sites delivered stat — confirm accuracy
- Availability badge is hardcoded — remember to update when busy
- rjp-site-git folder on Windows will be the new clean git home going forward
- Logo variations (A — lighthouse icon lockup) saved for future use

## Session checkpoint 2026-05-01T20:20:00Z

**Focus:** `/astro-migration` service page + `/blog` route

**Done this session:**
- Built `/astro-migration` (351 lines) — hero, problem stats, before/after, 4-step process, what's included, FAQ accordion, Eworx case study teaser, contact form (with `source: astro-migration` hidden field)
- Built `/blog/index.astro` (146 lines) — editorial list layout matching Services pattern, empty state, CTA footer linking to migration page
- Updated `Header.astro` — `isHome` variable for context-aware anchor vs absolute links, Blog nav item added (desktop + mobile), Get in touch links work from any page
- Diagnosed pre-existing WSL2/NTFS build error (`favicon.ico` EPERM on Vite `copyFileSync`) — unrelated to our changes, won't affect Dokploy build. Also pinned `@tailwindcss/vite@4.1.18` to fix a separate Tailwind 4.2.x/Vite 8 incompatibility.

**Open / next:**
- Write the first blog post: `src/pages/blog/why-your-plumber-website-is-slow.astro`
- Draft cold outreach email template
- Add rjp.digital to Google Search Console
- Add link to `/astro-migration` from Services section on homepage (service 02)
- Consider Astro Content Collections for blog (once 2+ posts exist)


**Focus:** SEO strategy + next build tasks

**Done this session (continued):**
- Pricing updated: Care Plan £249/mo, Lump sum £3,950–£7,500
- Content audit completed — key fixes made (dates, fake stats, about column, location)
- SA market discussion — decision: UK-only main site, /za page when dad ready to promote
- SEO keyword research completed — key finding: "wordpress to astro migration UK" and "slow wordpress site fix UK" are low competition, beatable in weeks
- Three blog post ideas identified that double as cold outreach material
- Outreach strategy: target tradespeople with slow WordPress sites via PageSpeed audit angle

**Next session (rjp.digital #dev channel):**
- Build `/astro-migration` service page
- Set up /blog route
- Write first blog post: "Why Your Plumber Website Is Slow — And How It's Costing You Leads"
- Add rjp.digital to Google Search Console
- Draft cold outreach email template
