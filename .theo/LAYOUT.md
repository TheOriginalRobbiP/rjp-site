# rjp.digital — LAYOUT

> Human-owned reference. Edit when project structure changes.
> Theo reads this on first turn; treats it as authoritative for paths.

## Repository

- **Host path (Windows):** `E:\rjp.digital`
- **Container path (mounted into Hermes):** `/mnt/e/rjp.digital`
- **Git remote:** (set this when published; currently local-only)

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Astro | `^5.17.1` (consider upgrade to 6.x — see STATUS) |
| Adapter | `@astrojs/node` (standalone) | `^9.5.2` |
| Styling | Tailwind CSS | `^4.1.18` (v4 engine) |
| Email | Resend | `^6.9.1` |
| Test | Vitest | `^4.0.18` |
| Runtime | Node | 22 LTS |

## Source layout

```
src/
├── components/     8 .astro components (About, Contact, Footer, Header,
│                   Hero, Pricing, Services, Work)
├── emails/         confirmation.ts, notification.ts (Resend templates)
├── icons/          4 SVG icons (cms, legacy, maintenance, web-dev)
├── layouts/        Layout.astro (single base layout)
├── lib/            rate-limit.ts, validation.ts (contact form helpers)
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   └── api/
│       └── contact.ts   (Resend-backed, rate-limited POST endpoint)
└── styles/
    └── global.css       (theme tokens, Tailwind v4 entry)
```

There's also legacy junk under repo root: `srcemails/`, `srclib/`,
`srcpagesapi/` — these look like duplicates from a botched move.
**Confirm before touching** — Robbi may want them archived not deleted.

## Build / deploy

| Command | Purpose |
|---|---|
| `npm install` | Install deps |
| `npm run dev` | Astro dev server (port 4321 default) |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview built output |
| `npm test` | Run Vitest suite |
| `docker build -t rjp-digital .` | Build production image |
| `docker run -p 8080:80 rjp-digital` | Run locally |

Production: pushed to git → Dokploy pulls → builds Docker image → serves on
port 80 behind their nginx.

## Important files outside src/

| Path | Purpose |
|---|---|
| `Dockerfile` | Multi-stage build (Node build → nginx serve) |
| `nginx.conf` | Production nginx config |
| `astro.config.mjs` | SSR/Node adapter + Tailwind plugin |
| `vitest.config.ts` | Test runner config |
| `hermes-stack-STATUS.md` | The Hermes/Theo operational context — separate concern from this site |
| `_inspect_opencode.py`, `_list_archived.py`, `_restore_archived.py` | One-off admin scripts (probably safe to ignore) |

## Brand assets (pre-existing, on host, not in this repo)

Mascot poses live in the **container's** `/opt/data/work/images/`:
- `rjp-kraken-three-fresh-v1.png` — hero (multitasking)
- `rjp-kraken-lightbulb-v1.png` — thinking
- `rjp-kraken-404-v3.png` — 404 page

These need to be either copied into `public/` here or referenced via CDN
before they can be used on the live site. Currently NOT integrated.

## Discord channels for this project

The Discord workspace mixes channels by topic, not by project. For
rjp.digital specifically (the site itself, not Theo's wider work):

- Most rjp.digital site-related conversation lives in **`#dev`**
  (id `1494706791546622138`) and **`#design`** (id `1494706831216607232`)
  under the **"Project - Rjp.digital"** category.
- Brand / mascot discussion historically lived in `#design` threads.

## Gotchas

- **Astro 5 not 6.** `package.json` is on 5.17.1. HERMES.md tells Theo to
  prefer 6.x for new projects, but this is an existing site — do NOT bump
  without an upgrade plan; Tailwind v4 + Astro 6 has had reported issues.
- **`output: 'server'`** in astro.config — this is SSR. Static-only changes
  still need `npm run build` to verify they don't break server routes.
- **Contact form depends on `RESEND_API_KEY`** in `.env`. Missing-env
  failure mode: 500 on POST /api/contact with no useful client message.
- **Duplicate `src*` folders at repo root.** Don't blindly delete.
