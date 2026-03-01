# Shop Simulator

Local website prototype with:
- Main board: 5 pet spaces
- Pet shop: 3 slots
- Food shop: 1 slot
- Turn system with tier unlocks:
  - Turns 1-2: Tier 1
  - Turns 3-4: Tiers 1-2
  - Turns 5-6: Tiers 1-3
  - Turns 7-8: Tiers 1-4
  - Turns 9-10: Tiers 1-5
  - Turns 11+: Tiers 1-6
- Gold system: start each turn with 10, buy=3, sell=1, roll=1
- Random wallpaper background from SAP textures
- Hover tooltips for pets/foods (tier, stats, ability)
- Pack switcher (1-6), with Pack 1 data implemented

Data files:
- `assets-manifest.json`: local texture and sprite lookup
- `pack-data.json`: Pack 1 pet/food tier + stat + ability data

## Run locally

```powershell
cd "c:\Users\Jon\Downloads\Shop Simulator"
python -m http.server 8080
```

Open `http://localhost:8080`.
