# rjp.digital — Project Status

## Session checkpoint 2026-05-27

### Focus
Penpot Self-Hosting, Logo/Brand Research, & Canvas Automation.

### Done this session
- **Self-Hosted Penpot 2.15:** Successfully deployed the full suite of Penpot containers (frontend, backend, exporter, Postgres, Valkey, MCP, Mailcatcher) on the laptop at `http://localhost:9001`. Created admin credentials (`robin@rjp.digital` / `robinpenpot2026`) and configured local mailcatcher on `http://localhost:1080` to safely catch emails.
- **Wired Penpot MCP to Hermes:** Integrated the Penpot MCP server directly into our agent stack using an `mcp-remote` proxy bridge.
- **Infrastructure Tuning:**
  - Patched `docker-compose.yaml` to override the image command to `node index.js` (switched MCP from multi-user remote mode to single-user local developer mode), stripping out connection token requirements.
  - Patched `docker-compose.yaml` with explicit Nginx routing parameters (`PENPOT_MCP_URI` and `PENPOT_MCP_URI_WS`) to resolve WebSocket connection timeouts.
- **Created bespoke vector logos:** Generated 12 high-end, styleable inline SVG concepts for active projects (including `rjp.digital`, `cryptoclub`, `ebl`, `paintmyhouse`, `dnd-hud`, `howardsmaintenance`) under `~/projects/logos/`.
- **Authored `penpot-agent` Skill:** Created a reusable `penpot-agent` skill in `~/.hermes/skills/creative/penpot-agent/SKILL.md` detailing the exact Penpot Plugin JS methods and coordinate logic for future sessions.
- **Direct Canvas Automation:** Programmatically scripted a baseline-aligned typography wordmark directly onto Rob's active Penpot board (`New File 1`) featuring elegant *Instrument Serif* display type (`84px`) and light *Inter* (`44px`) next to it.
- **Option C Selection & Automation:**
  - Rob locked in **Option C (Bold Asymmetrical Agency Layout)** as the official design system direction.
  - Authored `/home/robin/projects/logos/draw_rjp_concept_c.py` and programmatically generated a dedicated `rjp.digital Option C Board` in Penpot. Features a massive serif display wordmark, an asymmetrical stacked *Inter* sub-header, a vector-drawn glowing amber beacon dot, and a micro-scaled widely-tracked tagline.
  - Exported a fully clean, production-ready vector SVG to `/home/robin/projects/logos/rjp_digital_concept_c.svg` matching these exact proportions.

### Open / Next
- **Logo Visual Verification:** Confirm the layout on the local Penpot dashboard with Rob (`http://localhost:9001`).
- **Live Astro Integration:** Replace the old straight-line logo at `public/images/rjp-logo.svg` with the newly designed Option C asymmetrical logo inside the `rjp-site` repo.
- **Client Logos:** Script and automate logos for sibling projects (such as `cryptoclub`, `ebl`, `paintmyhouse`, `howardsmaintenance`) following their respective design specs once the primary agency brand is pushed live.

### Blockers
None.
