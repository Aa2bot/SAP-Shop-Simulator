Tech stack (current)
- Vanilla JavaScript loaded via `index.html` (`app.js` ~330KB monolith).
- HTML/CSS only; no bundler, no TypeScript, no framework/runtime.
- Assets in `assets/` plus multiple pack HTML fragments (pack1-turtle.html, etc.).
- Data in `pack-data.json` and `pack2_tier_hardcode_progress.json`.
- Audio handled via custom `UI_SOUNDS` mapping in `app.js`.

Target stack implication
- Will need module system/bundler (e.g., TS + Angular-like folder layout) to mirror SAP Calculator architecture.
- No automated tests present; need test runner selection (likely Vitest/Jest + jsdom or Angular TestBed equivalent).
