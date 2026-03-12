# Phase: Engine Reconstruction (mirror SAP Calculator)

## Goal
Rebuild gameplay engine, registries, and UI trigger pipeline so every SAP pet/food/toy/perk/ailment executes through a data-driven event/ability system, matching SAP Calculator architecture and verified by automated tests.

## Milestones
1) Tooling & Skeleton
- Add modern module/toolchain (TypeScript + Vite or Angular) while keeping current HTML playable during transition.
- Create folder layout `src/app/{domain,gameplay,integration,runtime,ui}`.
- Set up test runner (Vitest/Jest) with jsdom and CI hook.

2) Domain & Registries
- Define core interfaces/entities: Pet, Ability, Food, Toy, Perk, Ailment, Token, Trigger metadata.
- Build catalogs from `pack-data.json` + wiki sources; ensure token pets excluded from shop rolls.
- Ability registry: trigger, effect handler, level scaling values; every pet gets ability id.
- Food/toy registries: data-driven definitions with trigger/effects.

3) Gameplay Core
- Implement event bus + ability queue (priority + tie-breaker) modeled after SAP Calculator.
- Implement ability engine loop (process queue, remove dead, empty front checks).
- Add battle pipeline hooks (start_of_turn, before_attack, hurt, faint, summon, toy_break, etc.).

4) Effect Handler Library
- Reusable handlers: buff_random_friend/team, summon_pet, deal_damage, gain_gold/mana/trumpets, apply_perk/ailment, spawn_food/toy, shop_roll modifiers, counters.
- Support temporary vs permanent stats and per-turn trigger caps.

5) Systems: Food, Toy, Perk, Ailment, Token
- Food engine plugs into event bus (eat_food -> ability engine).
- Toy system with durability (default 2 turns) + toy_break events.
- Perk/ailment slot rules (one active; replace on apply; UI sync).
- Token validation: tokens never appear in shop rolls.

6) Runtime & Shop
- Game state services (player/team, gold, mana, turn counters, RNG seed).
- Shop logic uses registries, not static HTML; remove duplicated pack fragments.
- Persistence hooks (optional) and animation event emission.

7) UI & Animations
- UI layer subscribes to gameplay events for glow/animations: ability trigger, eat food, summon, mana gain, toy break.
- Display perks/ailments/toys adjacent to pets; dynamic shop rendering from registries.

8) Testing & Validation
- Mirror SAP Calculator test layout; add unit tests per ability/food/toy.
- Validation pass scans registries ensuring every entity has effect handler + asset.
- Smoke tests for event bus/trigger caps and toy durability.

## Risks / Decisions
- Need tooling decision: Angular parity vs lighter Vite+TS; choose after assessing effort.
- Large scope: schedule incremental migration (keep legacy app.js until feature parity).
- Asset coverage: ensure textures manifest aligns with registries.

## Immediate Next Steps
- Decide toolchain (Angular or TS+Vite) and scaffold src/ folder with minimal build.
- Extract pack-data into domain catalog format and prototype ability registry schema.
- Implement event bus + ability queue skeleton with tests.
