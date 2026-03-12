Current architecture (observed)
- Single-file gameplay + shop logic in `app.js`; imperative DOM updates.
- Multiple static HTML pack files (`pack1-turtle.html`, etc.) appear to define shop contents.
- Styling via `styles.css`.
- No layered separation between domain/gameplay/runtime/UI; event handling appears ad-hoc.

Target architecture (from SAP Calculator reference)
- `src/app/domain`: entities, interfaces, catalogs for pets/foods/toys/perks/ailments.
- `src/app/gameplay`: pure simulation pipeline (event bus, ability engine, effect handlers, battle resolution, RNG).
- `src/app/integrations`: registries/factories wiring content into runtime.
- `src/app/runtime`: game state, persistence, shop logic, food engine adapter.
- `src/app/ui`: reactive Angular UI responding to gameplay events + animations.

Migration gap
- Need to replace monolith with modular, event-driven architecture and registries.
- Need formal data models for pets/foods/perks/toys/ailments/tokens; remove pack HTML duplication.
