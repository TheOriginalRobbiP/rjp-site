# rjp.digital — DECISIONS

> Append-only log of non-trivial decisions and their rationales.
> Format: `YYYY-MM-DD | decision | rationale`
> Newest at the bottom.

---

2026-04 | Astro 5.17.1 + Tailwind v4 + @astrojs/node (standalone) | Modern stack baseline; Tailwind v4 for the rewritten engine; SSR on Node for the contact form API and future personalisation hooks.

2026-04 | Deploy via Docker + nginx on Dokploy | Same pattern as cryptoclub.co.za — keep deploy targets uniform across the portfolio.

2026-04 | Resend for transactional email (contact form) | Simpler than SES for a single low-volume form; React Email-friendly; one less AWS account to manage.

2026-04 | Brand: kraken mascot (3 tentacles), no skull/face | Intentional shift from the earlier skull mascot direction — more on-brand for "calm operator" tone, more legible at small sizes, doesn't conflict with esports brands.

2026-04 | Brand colours: electric purple + pink/magenta double-outline on black, cream-coloured suckers, hard cel-shading | Distinctive in dark-mode default; cel shading reads cleanly in both raster (mascot) and vector (wordmark) form.

2026-04 | Logo direction 1: horizontal lockup, separate tentacle mark (left) + clean "rjp.digital" wordmark (right), lighthouse-i in wordmark | Picked over stacked / circular alternatives because horizontal works in nav bars and OG images at the same crop.

2026-04 | Image generation backend: Gemini 3 (not ComfyUI/Flux) | Faster iteration, no local GPU needed, illustrative output matches the mascot style cleanly.

2026-04-30 | Adopted `.theo/` per-project state convention (this directory) | Pilot to fix Theo's "doesn't remember on resume" problem. STATUS.md / DECISIONS.md / LAYOUT.md / SESSIONS/. Memory facts get `project:rjp.digital` tag.
