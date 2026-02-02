# Asset List: Constantinople ☦️

Complete inventory of visual assets needed for the MVP and beyond. Each item includes specs, priority, and status.

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| 🔴 P0 | MVP blocker—game doesn't work without it |
| 🟡 P1 | MVP desired—game is much better with it |
| 🟢 P2 | Post-MVP—nice to have |
| ⚪ P3 | Future/expansion |

---

## 1. Character Sprites

Top-down sprites for the exploration view. All sprites are **16×24 pixels**.

### Player Character

| Asset | Frames | Priority | Status | Notes |
|-------|--------|----------|--------|-------|
| `player_walk_down` | 4-6 | 🔴 P0 | ⬜ TODO | Walking toward camera |
| `player_walk_up` | 4-6 | 🔴 P0 | ⬜ TODO | Walking away |
| `player_walk_left` | 4-6 | 🔴 P0 | ⬜ TODO | Can mirror for right |
| `player_walk_right` | 4-6 | 🔴 P0 | ⬜ TODO | Or mirror left |
| `player_idle_down` | 2-4 | 🟡 P1 | ⬜ TODO | Subtle breathing |
| `player_idle_up` | 2-4 | 🟢 P2 | ⬜ TODO | |
| `player_idle_left` | 2-4 | 🟢 P2 | ⬜ TODO | |
| `player_interact` | 2-3 | 🟡 P1 | ⬜ TODO | Reaching out gesture |

**Sprite sheet:** `player.png` — 96×96 px minimum (6 cols × 4 rows)

### St. John Chrysostom

| Asset | Frames | Priority | Status | Notes |
|-------|--------|----------|--------|-------|
| `chrysostom_idle` | 2-4 | 🔴 P0 | ⬜ TODO | Standing, slight movement |
| `chrysostom_walk_down` | 4 | 🟡 P1 | ⬜ TODO | For cutscenes/following |
| `chrysostom_walk_up` | 4 | 🟢 P2 | ⬜ TODO | |
| `chrysostom_bless` | 3-4 | 🟡 P1 | ⬜ TODO | Blessing gesture |
| `chrysostom_preach` | 2-3 | 🟡 P1 | ⬜ TODO | Arms raised slightly |

**Visual notes:** Bishop's vestments silhouette, mitre/crown shape, gold halo (1-2px ring)

**Sprite sheet:** `chrysostom.png` — 80×72 px minimum

### Core NPCs (MVP)

| Asset | Frames | Priority | Status | Notes |
|-------|--------|----------|--------|-------|
| `npc_beggar_01` | 2 | 🔴 P0 | ⬜ TODO | Seated, ragged |
| `npc_beggar_02` | 2 | 🟡 P1 | ⬜ TODO | Standing, crutch |
| `npc_merchant_01` | 2 | 🔴 P0 | ⬜ TODO | Behind stall |
| `npc_merchant_02` | 2 | 🟡 P1 | ⬜ TODO | Walking vendor |
| `npc_citizen_male_01` | 2 | 🔴 P0 | ⬜ TODO | Byzantine tunic |
| `npc_citizen_male_02` | 2 | 🟡 P1 | ⬜ TODO | Wealthier dress |
| `npc_citizen_female_01` | 2 | 🔴 P0 | ⬜ TODO | Modest dress, head covered |
| `npc_citizen_female_02` | 2 | 🟡 P1 | ⬜ TODO | Wealthier |
| `npc_monk_01` | 2 | 🔴 P0 | ⬜ TODO | Simple black robes |
| `npc_nun_01` | 2 | 🟡 P1 | ⬜ TODO | Black habit |
| `npc_priest_01` | 2 | 🔴 P0 | ⬜ TODO | Priest vestments |
| `npc_deacon_01` | 2 | 🟡 P1 | ⬜ TODO | Deacon vestments |
| `npc_guard_01` | 2 | 🟡 P1 | ⬜ TODO | Imperial guard, spear |
| `npc_child_01` | 2 | 🟡 P1 | ⬜ TODO | Smaller sprite (16×16?) |
| `npc_child_02` | 2 | 🟢 P2 | ⬜ TODO | |

**Sprite sheet:** `npcs.png` — 256×96 px (16 chars × 4 frames)

### Antagonist NPCs (MVP)

| Asset | Frames | Priority | Status | Notes |
|-------|--------|----------|--------|-------|
| `eudoxia_idle` | 2 | 🟡 P1 | ⬜ TODO | Imperial regalia |
| `eudoxia_walk` | 4 | 🟢 P2 | ⬜ TODO | |
| `theophilus_idle` | 2 | 🟢 P2 | ⬜ TODO | Bishop vestments |
| `arcadius_idle` | 2 | 🟢 P2 | ⬜ TODO | Emperor, weak posture |

---

## 2. Portrait Art

Close-up portraits for dialogue scenes. Drawn in icon style. **128×192 pixels**.

### Main Characters

| Asset | Expressions | Priority | Status | Notes |
|-------|-------------|----------|--------|-------|
| `portrait_chrysostom` | 3-4 | 🔴 P0 | ⬜ TODO | Neutral, kind, stern, passionate |
| `portrait_player` | 3-4 | 🟡 P1 | ⬜ TODO | Or remain faceless/silhouette |
| `portrait_eudoxia` | 2-3 | 🟡 P1 | ⬜ TODO | Cold, angry |
| `portrait_theophilus` | 2 | 🟢 P2 | ⬜ TODO | Calculating, false piety |
| `portrait_arcadius` | 2 | 🟢 P2 | ⬜ TODO | Uncertain, weak |

### Supporting Characters

| Asset | Expressions | Priority | Status | Notes |
|-------|-------------|----------|--------|-------|
| `portrait_beggar` | 1-2 | 🟡 P1 | ⬜ TODO | Generic, sympathetic |
| `portrait_merchant` | 1-2 | 🟡 P1 | ⬜ TODO | Generic, busy |
| `portrait_monk` | 1-2 | 🟡 P1 | ⬜ TODO | Peaceful, ascetic |
| `portrait_citizen_male` | 1 | 🟢 P2 | ⬜ TODO | Generic |
| `portrait_citizen_female` | 1 | 🟢 P2 | ⬜ TODO | Generic |
| `portrait_priest` | 1-2 | 🟡 P1 | ⬜ TODO | |
| `portrait_guard` | 1 | 🟢 P2 | ⬜ TODO | Stern |

**Portrait specs:**
- Black background (#0A0A0A)
- Figure fills most of frame
- Gold halo for saints (Chrysostom only in MVP)
- Eyes face viewer (icon tradition)
- Minimal but expressive line work

---

## 3. Tile Sets

16×16 pixel tiles for map construction. Strict top-down perspective.

### Ground Tiles

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `ground_stone` | 4 | 🔴 P0 | ⬜ TODO | Main walkable surface |
| `ground_marble` | 2 | 🟡 P1 | ⬜ TODO | Church interiors, palace |
| `ground_dirt` | 3 | 🟡 P1 | ⬜ TODO | Outskirts, markets |
| `ground_grass` | 2 | 🟢 P2 | ⬜ TODO | Gardens |
| `ground_water_shallow` | 2 | 🟢 P2 | ⬜ TODO | Fountains |
| `ground_water_deep` | 2 | 🟢 P2 | ⬜ TODO | Harbor (animated?) |

### Wall Tiles

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `wall_stone_straight` | 1 | 🔴 P0 | ⬜ TODO | Basic wall |
| `wall_stone_corner` | 4 | 🔴 P0 | ⬜ TODO | All 4 corners |
| `wall_stone_end` | 4 | 🟡 P1 | ⬜ TODO | Wall endings |
| `wall_brick` | 2 | 🟡 P1 | ⬜ TODO | Different building type |
| `wall_palace` | 2 | 🟢 P2 | ⬜ TODO | Fancier, imperial |
| `city_wall` | 3 | 🟢 P2 | ⬜ TODO | Theodosian walls (massive) |

### Building Tiles

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `building_roof` | 4 | 🔴 P0 | ⬜ TODO | Terracotta style |
| `building_door` | 2 | 🔴 P0 | ⬜ TODO | Closed, open |
| `building_window` | 2 | 🟡 P1 | ⬜ TODO | Lit, unlit |
| `building_column` | 2 | 🟡 P1 | ⬜ TODO | Roman columns |
| `building_arch` | 1 | 🟡 P1 | ⬜ TODO | Archway entrance |
| `building_stairs` | 2 | 🟢 P2 | ⬜ TODO | Up, down indication |

### Church Tiles (Special)

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `church_floor` | 2 | 🔴 P0 | ⬜ TODO | White marble, cross pattern |
| `church_altar` | 1 | 🔴 P0 | ⬜ TODO | Holy table |
| `church_iconostasis` | 3 | 🟡 P1 | ⬜ TODO | Icon wall segments |
| `church_icon_small` | 4 | 🟡 P1 | ⬜ TODO | Tiny icons on walls |
| `church_candle_stand` | 1 | 🟡 P1 | ⬜ TODO | |
| `church_dome_floor` | 1 | 🟢 P2 | ⬜ TODO | Under dome marking |
| `church_pew` | 1 | ⚪ P3 | ⬜ TODO | (Historically, no pews—standing!) |

### Market Tiles

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `market_stall` | 3 | 🔴 P0 | ⬜ TODO | Vendor stalls |
| `market_awning` | 2 | 🟡 P1 | ⬜ TODO | Shade coverings |
| `market_crate` | 2 | 🟡 P1 | ⬜ TODO | Goods |
| `market_basket` | 2 | 🟡 P1 | ⬜ TODO | |
| `market_rug` | 2 | 🟢 P2 | ⬜ TODO | Displayed wares |
| `market_pottery` | 2 | 🟢 P2 | ⬜ TODO | |

### Decoration Tiles

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `deco_tree` | 2 | 🟡 P1 | ⬜ TODO | Cypress, olive |
| `deco_shrub` | 2 | 🟢 P2 | ⬜ TODO | |
| `deco_bench` | 1 | 🟡 P1 | ⬜ TODO | |
| `deco_fountain` | 1 | 🟡 P1 | ⬜ TODO | Animated? |
| `deco_statue` | 2 | 🟢 P2 | ⬜ TODO | Roman/Byzantine |
| `deco_cross` | 1 | 🔴 P0 | ⬜ TODO | Stone cross marker |
| `deco_torch` | 1 | 🟡 P1 | ⬜ TODO | Wall torch (animated) |
| `deco_barrel` | 1 | 🟢 P2 | ⬜ TODO | |
| `deco_cart` | 1 | 🟢 P2 | ⬜ TODO | |

### Special Location Tiles

| Asset | Variants | Priority | Status | Notes |
|-------|----------|----------|--------|-------|
| `hagia_sophia_dome` | 1 | 🟡 P1 | ⬜ TODO | Gold-topped |
| `hippodrome_track` | 4 | 🟢 P2 | ⬜ TODO | Racing track |
| `hippodrome_seating` | 2 | 🟢 P2 | ⬜ TODO | |
| `palace_gate` | 1 | 🟢 P2 | ⬜ TODO | Imperial palace entrance |
| `harbor_dock` | 3 | 🟢 P2 | ⬜ TODO | Wooden planks |
| `harbor_boat` | 2 | ⚪ P3 | ⬜ TODO | Small vessels |

---

## 4. UI Elements

Interface graphics. Clean, minimal, thematic.

### Core UI

| Asset | Size | Priority | Status | Notes |
|-------|------|----------|--------|-------|
| `ui_dialogue_box` | 9-slice | 🔴 P0 | ⬜ TODO | Black bg, white border |
| `ui_dialogue_continue` | 16×16 | 🔴 P0 | ⬜ TODO | Arrow/prompt to continue |
| `ui_interaction_prompt` | 16×16 | 🔴 P0 | ⬜ TODO | "Press Space" indicator |
| `ui_menu_background` | 9-slice | 🟡 P1 | ⬜ TODO | |
| `ui_button_default` | 9-slice | 🟡 P1 | ⬜ TODO | |
| `ui_button_hover` | 9-slice | 🟡 P1 | ⬜ TODO | |
| `ui_button_pressed` | 9-slice | 🟢 P2 | ⬜ TODO | |

### Icons

| Asset | Size | Priority | Status | Notes |
|-------|------|----------|--------|-------|
| `icon_cross` | 16×16 | 🟡 P1 | ⬜ TODO | Orthodox cross ☦ |
| `icon_quest` | 16×16 | 🟡 P1 | ⬜ TODO | Quest marker |
| `icon_talk` | 16×16 | 🟡 P1 | ⬜ TODO | NPC wants to talk |
| `icon_location` | 16×16 | 🟢 P2 | ⬜ TODO | Map marker |
| `icon_save` | 16×16 | 🟢 P2 | ⬜ TODO | |
| `icon_settings` | 16×16 | 🟢 P2 | ⬜ TODO | |

### Title/Branding

| Asset | Size | Priority | Status | Notes |
|-------|------|----------|--------|-------|
| `title_logo` | 400×200 | 🟡 P1 | ⬜ TODO | "Constantinople" in DttW style |
| `title_background` | Full screen | 🟡 P1 | ⬜ TODO | Hagia Sophia silhouette? |
| `loading_screen` | Full screen | 🟢 P2 | ⬜ TODO | Orthodox cross, minimal |

---

## 5. Effects & Animation

Animated elements and particle effects.

### Environmental

| Asset | Frames | Priority | Status | Notes |
|-------|--------|----------|--------|-------|
| `fx_candle_flame` | 3-4 | 🟡 P1 | ⬜ TODO | Small flicker |
| `fx_torch_flame` | 4-5 | 🟡 P1 | ⬜ TODO | Larger flame |
| `fx_water_ripple` | 3-4 | 🟢 P2 | ⬜ TODO | For fountains |
| `fx_incense_smoke` | 4-6 | 🟢 P2 | ⬜ TODO | Rising wisps |
| `fx_dust_motes` | 4 | ⚪ P3 | ⬜ TODO | Church interior |

### Interaction

| Asset | Frames | Priority | Status | Notes |
|-------|--------|----------|--------|-------|
| `fx_exclamation` | 2 | 🟡 P1 | ⬜ TODO | NPC notice |
| `fx_quest_complete` | 4 | 🟢 P2 | ⬜ TODO | Celebration |
| `fx_blessing` | 4-6 | 🟢 P2 | ⬜ TODO | When blessed by Chrysostom |

---

## 6. Audio Assets (Reference)

Not visual, but included for completeness. Art team doesn't create these.

| Asset | Type | Priority | Notes |
|-------|------|----------|-------|
| Byzantine chant samples | Music | 🟡 P1 | Licensed or original |
| Ambient city sounds | SFX | 🟡 P1 | Market, crowd |
| Church bells | SFX | 🟡 P1 | |
| Footsteps (stone, marble) | SFX | 🟢 P2 | |
| UI sounds | SFX | 🟢 P2 | |

---

## Asset Counts Summary

### MVP (P0 + P1)

| Category | Count |
|----------|-------|
| Character sprites | ~25 sprite sheets |
| Portraits | ~10 portraits × 2-3 expressions |
| Tiles | ~50-60 unique tiles |
| UI elements | ~15 elements |
| Effects | ~8 animations |

### Full Game (All Priorities)

| Category | Count |
|----------|-------|
| Character sprites | ~50+ |
| Portraits | ~25+ |
| Tiles | ~100+ |
| UI elements | ~25+ |
| Effects | ~15+ |

---

## File Organization

```
assets/
├── sprites/
│   ├── player.png           # Player sprite sheet
│   ├── chrysostom.png       # Chrysostom sprite sheet
│   ├── npcs.png             # All NPC sprites
│   └── effects.png          # Animated effects
├── portraits/
│   ├── chrysostom.png       # Multiple expressions
│   ├── player.png           # If we show player
│   ├── eudoxia.png
│   └── generic/
│       ├── beggar.png
│       ├── merchant.png
│       └── ...
├── tiles/
│   ├── ground.png           # All ground tiles
│   ├── walls.png            # All wall tiles
│   ├── buildings.png        # Building elements
│   ├── church.png           # Church-specific
│   ├── market.png           # Market-specific
│   └── decorations.png      # Props and deco
├── ui/
│   ├── dialogue.png         # Dialogue UI elements
│   ├── icons.png            # All icons
│   └── title.png            # Title/branding
└── maps/
    ├── hagia_sophia_district.json
    └── hagia_sophia_district.tmx
```

---

## Acceptance Criteria

Every asset should meet these standards:

1. **Style compliant** — Matches ART_STYLE_GUIDE.md
2. **Correct dimensions** — Exact pixel sizes as specified
3. **Proper palette** — Only approved colors
4. **Clean pixels** — No anti-aliasing, no stray pixels
5. **Readable at scale** — Clear silhouettes even when small
6. **Consistent** — Matches other assets in the same category

---

*"The glory of God is a human being fully alive."* — St. Irenaeus

Let's make something alive. ☦️
