# Codex.md – Super Auto Pets Project Reference

## 1. Project Purpose
- Recreate the core mechanics of **Super Auto Pets**: shop phases, battles, pets, abilities, toys, food, perks, tokens, mana, trumpets, and all related game systems.  
- Support **custom pets, fan-made packs**, and future expansions, but start with the **base game**.  
- Ensure all AI or code modifications **check this Codex.md first** to maintain game consistency.

## 2. Core Game Systems

### 2.1 Pets
- Reference: [Pets Wiki](https://superautopets.wiki.gg/wiki/Pets)  
- Each pet has:
  - Name, Tier, Health, Attack, Abilities  
  - Ability triggers (e.g., faint, start of turn, hurt, before attack)  
  - Special interactions with food, perks, toys  

### 2.2 Shop Phase
- Players can buy pets, food, toys.  
- Display pets available per **tier and shop roll**.  
- Show current gold and level for shop mechanics.  
- Ensure **valid pets, food, and toys** appear based on current player level, pet, or method.

### 2.3 Food
- Reference: [Food Wiki](https://superautopets.wiki.gg/wiki/Food)  
- Food can:
  - Grant perks (buffs, summon pets, heal, damage)  
  - Trigger on events (faint, before attack, hurt, etc.)  
  - Be equipped to pets during shop phase  
- Each food item must have **icon/image, tier, effect, and source**.  
- Ensure food dynamically updates for valid pets only.

### 2.4 Perks
- Reference: [Food Perks Wiki](https://superautopets.wiki.gg/wiki/Food_Perks)  
- Perks grant ongoing abilities, stat boosts, or triggers.  
- Track all perk interactions (stacking, activation order, triggers).

### 2.5 Toys
- Reference: [Toys Wiki](https://superautopets.wiki.gg/wiki/Toys)  
- Toys are obtained via **pet purchases** or special methods.  
- Display **only the toys valid for the current pet/method**.  
- Include **clickable icons/images**, hover tooltips, and tier-based activation.  
- Toys break after 2 turns unless otherwise specified.

### 2.6 Tokens
- Reference: [Tokens Wiki](https://superautopets.wiki.gg/wiki/Tokens)  
- Tokens provide temporary boosts or abilities.  
- Track token stacking, duration, and triggers.

### 2.7 Mana
- Reference: [Mana Wiki](https://superautopets.wiki.gg/wiki/Mana)  
- Mana affects certain abilities or toys.  
- Track generation, spending, and caps.

### 2.8 Trumpets
- Reference: [Trumpet Wiki](https://superautopets.wiki.gg/wiki/Trumpet)  
- Trumpets boost stats or trigger effects.  
- Track stacking, activation, and interactions with abilities or food.

## 3. UI/UX Guidelines
- Battle and shop phases must be **clear and readable**.  
- Include **stat bars, icons, and hover tooltips** for all pets, food, toys, and perks.  
- Show **floating numbers** for damage, healing, or buffs.  
- Smooth animations for **attacks, abilities, fainting, perk/food/toy activation**.  
- Dynamically update UI based on **pet, food, toy availability, and triggers**.  
- Organize **selection panels** for pets, toys, and food with clickable images/icons.  
- Support **resizing, scaling, and accessibility options** (color-blind mode, keyboard navigation).

## 4. Data & Asset Requirements
- Each game element (pet, food, toy, perk) must include:
  - Name  
  - Tier  
  - Effect description  
  - Source or method  
  - Icon/image  
- Maintain **JSON-based datasets** for dynamic UI and game logic.  
- Ensure any **new custom pets, packs, or fan-made content** follow the same structure.

## 5. AI Usage Rules
- **Always reference Codex.md** before creating, modifying, or deleting any game logic.  
- Changes must respect **base game mechanics** before adding new content.  
- All new features should maintain:
  - UI clarity  
  - Trigger consistency  
  - Compatibility with future custom pets/packs

