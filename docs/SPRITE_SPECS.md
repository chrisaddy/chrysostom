# Sprite Sheet Specifications ☦️

Technical specifications for all sprite sheets. Follow these exactly for proper Bevy integration.

> **Note:** We use 32×32 sprites (up from 16×16) for better detail while still fitting the pixel art aesthetic.

---

## Quick Reference

| Asset Type | Sprite Size | Sheet Layout | Format |
|------------|-------------|--------------|--------|
| Player | 16×24 px | 6 cols × 8 rows | PNG-24 |
| NPCs | 16×24 px | Variable | PNG-24 |
| Tiles | 16×16 px | 16 cols × N rows | PNG-24 |
| Portraits | 128×192 px | 4 cols × 1 row (expressions) | PNG-24 |
| UI Elements | Variable | Packed | PNG-24 |
| Effects | 16×16 or 32×32 | Animation strip | PNG-24 |

---

## 1. Player Sprite Sheet

**File:** `assets/sprites/player.png`

### Dimensions
- **Sprite size:** 16×24 pixels
- **Sheet size:** 96×192 pixels (6 columns × 8 rows)
- **Total frames:** 48

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Row │ Animation          │ Frames │ Frame Duration          │
├─────┼────────────────────┼────────┼─────────────────────────┤
│  0  │ Idle Down          │ 2      │ 500ms (slow breathe)    │
│  1  │ Walk Down          │ 6      │ 100ms each              │
│  2  │ Idle Up            │ 2      │ 500ms                   │
│  3  │ Walk Up            │ 6      │ 100ms each              │
│  4  │ Idle Left          │ 2      │ 500ms                   │
│  5  │ Walk Left          │ 6      │ 100ms each              │
│  6  │ Idle Right         │ 2      │ 500ms (or mirror left)  │
│  7  │ Walk Right         │ 6      │ 100ms each              │
└─────┴────────────────────┴────────┴─────────────────────────┘
```

### Visual Layout

```
      0    16   32   48   64   80
    ┌────┬────┬────┬────┬────┬────┐
  0 │ I1 │ I2 │    │    │    │    │  Idle Down (2 frames)
    ├────┼────┼────┼────┼────┼────┤
 24 │ W1 │ W2 │ W3 │ W4 │ W5 │ W6 │  Walk Down (6 frames)
    ├────┼────┼────┼────┼────┼────┤
 48 │ I1 │ I2 │    │    │    │    │  Idle Up
    ├────┼────┼────┼────┼────┼────┤
 72 │ W1 │ W2 │ W3 │ W4 │ W5 │ W6 │  Walk Up
    ├────┼────┼────┼────┼────┼────┤
 96 │ I1 │ I2 │    │    │    │    │  Idle Left
    ├────┼────┼────┼────┼────┼────┤
120 │ W1 │ W2 │ W3 │ W4 │ W5 │ W6 │  Walk Left
    ├────┼────┼────┼────┼────┼────┤
144 │ I1 │ I2 │    │    │    │    │  Idle Right
    ├────┼────┼────┼────┼────┼────┤
168 │ W1 │ W2 │ W3 │ W4 │ W5 │ W6 │  Walk Right
    └────┴────┴────┴────┴────┴────┘
         96 × 192 pixels total
```

### Bevy Loading

```rust
// In asset loading system
fn load_player_sprites(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut texture_atlases: ResMut<Assets<TextureAtlasLayout>>,
) {
    let texture = asset_server.load("sprites/player.png");
    let layout = TextureAtlasLayout::from_grid(
        UVec2::new(32, 32),  // sprite size
        6,                    // columns
        8,                    // rows
        None,                 // padding
        None,                 // offset
    );
    let texture_atlas_layout = texture_atlases.add(layout);
    
    commands.spawn((
        SpriteBundle {
            texture,
            ..default()
        },
        TextureAtlas {
            layout: texture_atlas_layout,
            index: 0,
        },
        Player,
    ));
}

// Animation component
#[derive(Component)]
struct AnimationIndices {
    first: usize,
    last: usize,
}

#[derive(Component, Deref, DerefMut)]
struct AnimationTimer(Timer);
```

### Design Notes

- **Origin point:** Center-bottom of sprite (for proper ground alignment)
- **Shadow:** Optional 1-2px dark ellipse under feet
- **Collision box:** 10×8 px, centered at bottom of sprite

---

## 2. Chrysostom Sprite Sheet

**File:** `assets/sprites/chrysostom.png`

### Dimensions
- **Sprite size:** 16×24 pixels
- **Sheet size:** 80×72 pixels (5 columns × 3 rows)
- **Total frames:** 15

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Row │ Animation          │ Frames │ Notes                   │
├─────┼────────────────────┼────────┼─────────────────────────┤
│  0  │ Idle Down          │ 4      │ Primary state           │
│  1  │ Walk Down          │ 4      │ For cutscenes           │
│  2  │ Blessing           │ 4      │ Special gesture         │
│  3  │ (unused)           │        │ Future expansion        │
└─────┴────────────────────┴────────┴─────────────────────────┘
```

### Visual Layout

```
      0    16   32   48   64
    ┌────┬────┬────┬────┬────┐
  0 │ I1 │ I2 │ I3 │ I4 │    │  Idle (4 frames, subtle)
    ├────┼────┼────┼────┼────┤
 24 │ W1 │ W2 │ W3 │ W4 │    │  Walk
    ├────┼────┼────┼────┼────┤
 48 │ B1 │ B2 │ B3 │ B4 │    │  Blessing
    └────┴────┴────┴────┴────┘
         80 × 72 pixels total
```

### Design Notes

- **Distinctive silhouette:** Bishop's mitre/crown clearly visible
- **Gold halo:** 1-2 pixel gold (#D4AF37) ring around head
- **Omophorion:** White stole visible even at small scale
- **Posture:** Dignified, slightly shorter than guards/soldiers

---

## 3. NPC Sprite Sheet

**File:** `assets/sprites/npcs.png`

### Dimensions
- **Sprite size:** 16×24 pixels
- **Sheet size:** 256×96 pixels (16 columns × 4 rows)
- **Total sprites:** 64 frames (16 NPCs × 4 frames each)

### Layout (Each NPC gets 4 frames: idle1, idle2, walk1, walk2)

```
┌───────────────────────────────────────────────────────────────────┐
│ Col │ NPC Type            │ Frames 0-3                            │
├─────┼─────────────────────┼───────────────────────────────────────┤
│ 0-3 │ Beggar 01           │ Seated idle (2) + reaching (2)        │
│ 4-7 │ Beggar 02           │ Standing idle (2) + crutch walk (2)   │
│ 8-11│ Merchant 01         │ Behind stall idle (4)                 │
│12-15│ Merchant 02         │ Walking vendor (4)                    │
│ ... │ ...                 │                                       │
└─────┴─────────────────────┴───────────────────────────────────────┘
```

### Visual Layout

```
      0   16   32   48   64   80   96  112  128  144  160  176  192  208  224  240
    ┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
  0 │ B1 │ B1 │ B1 │ B1 │ B2 │ B2 │ B2 │ B2 │ M1 │ M1 │ M1 │ M1 │ M2 │ M2 │ M2 │ M2 │ Row 0
    ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
 24 │ C♂1│    │    │    │ C♂2│    │    │    │ C♀1│    │    │    │ C♀2│    │    │    │ Row 1
    ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
 48 │Monk│    │    │    │ Nun│    │    │    │Prst│    │    │    │Deac│    │    │    │ Row 2
    ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
 72 │Grd1│    │    │    │Kid1│    │    │    │Kid2│    │    │    │ ?? │    │    │    │ Row 3
    └────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
         256 × 96 pixels total
```

---

## 4. Tile Sheet Specifications

**File:** `assets/tiles/tileset.png`

### Dimensions
- **Tile size:** 16×16 pixels
- **Sheet size:** 256×256 pixels (16 columns × 16 rows)
- **Total tiles:** 256

### Layout by Row

```
┌──────┬──────────────────────────────────────────────────────────┐
│ Row  │ Content                                                  │
├──────┼──────────────────────────────────────────────────────────┤
│  0   │ Ground tiles (stone, dirt, marble, grass)                │
│  1   │ Ground tiles continued (water, paths)                    │
│  2   │ Wall tiles (stone straight, corners)                     │
│  3   │ Wall tiles continued (ends, brick)                       │
│  4   │ Building roofs                                           │
│  5   │ Doors, windows                                           │
│  6   │ Columns, arches                                          │
│  7   │ Church floor tiles                                       │
│  8   │ Church elements (altar, iconostasis)                     │
│  9   │ Market stalls, awnings                                   │
│ 10   │ Market props (crates, baskets)                           │
│ 11   │ Decorations (trees, shrubs)                              │
│ 12   │ Decorations (benches, fountains)                         │
│ 13   │ Decorations (statues, crosses)                           │
│ 14   │ Special (Hagia Sophia, Hippodrome)                       │
│ 15   │ Reserved / Animated tile references                      │
└──────┴──────────────────────────────────────────────────────────┘
```

### Tiled Integration

This tileset is designed for **Tiled Map Editor**. Export settings:
- Format: PNG
- Margin: 0
- Spacing: 0
- Tile size: 16×16

---

## 5. Portrait Specifications

**Directory:** `assets/portraits/`

### Dimensions
- **Portrait size:** 128×192 pixels
- **Expression variants:** 4 per character (horizontal strip)
- **Sheet size per character:** 512×192 pixels

### Expression Layout

```
      0       128      256      384
    ┌────────┬────────┬────────┬────────┐
  0 │Neutral │  Kind  │ Stern  │Passion │  128×192 each
    │        │        │        │ ate    │
    │        │        │        │        │
    │        │        │        │        │
192 └────────┴────────┴────────┴────────┘
         512 × 192 pixels total
```

### Standard Expressions

| Index | Expression | Usage |
|-------|------------|-------|
| 0 | Neutral | Default, listening |
| 1 | Kind/Warm | Encouraging dialogue |
| 2 | Stern/Serious | Warnings, rebukes |
| 3 | Passionate | Preaching, emotional moments |

### Design Guidelines

1. **Composition:** Head and upper body, centered
2. **Background:** Solid black (#0A0A0A)
3. **Eyes:** Large, icon-style, meeting viewer's gaze
4. **Halo:** Gold ring for saints, positioned behind head
5. **Lighting:** Dramatic, high contrast (single light source feel)
6. **Detail level:** More than sprites, still stylized

### Bevy Loading

```rust
// Load portrait as texture atlas
fn load_portraits(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut texture_atlases: ResMut<Assets<TextureAtlasLayout>>,
) {
    let texture = asset_server.load("portraits/chrysostom.png");
    let layout = TextureAtlasLayout::from_grid(
        UVec2::new(128, 192),  // portrait size
        4,                      // 4 expressions
        1,                      // 1 row
        None,
        None,
    );
    let atlas_layout = texture_atlases.add(layout);
    
    // Store for later use in dialogue system
    commands.insert_resource(PortraitAtlas {
        texture,
        layout: atlas_layout,
    });
}

// Usage in dialogue
fn show_portrait(
    portrait_atlas: Res<PortraitAtlas>,
    mut query: Query<&mut TextureAtlas, With<Portrait>>,
) {
    for mut atlas in &mut query {
        atlas.index = 1; // Kind expression
    }
}
```

---

## 6. UI Element Specifications

**File:** `assets/ui/ui.png`

### 9-Slice Elements

For scalable UI boxes (dialogue, menus):

```
┌────┬────────────────┬────┐
│ TL │       T        │ TR │  Corner: 8×8 px
├────┼────────────────┼────┤  Edge: 8×8 px (tiled)
│ L  │     Center     │ R  │  Center: 8×8 px (tiled)
├────┼────────────────┼────┤
│ BL │       B        │ BR │
└────┴────────────────┴────┘
```

**Dialogue box spec:**
- Border: 2px white (#EDEDED)
- Background: Near-black (#0A0A0A)
- Corner radius: None (sharp corners)
- Minimum size: 100×50 px

### Icon Grid

```
      0    16   32   48   64   80   96  112
    ┌────┬────┬────┬────┬────┬────┬────┬────┐
  0 │ ☦  │ ? Q│ 💬 │ 📍 │ 💾 │ ⚙️ │ ▼  │ ⬆️  │
    ├────┼────┼────┼────┼────┼────┼────┼────┤
 16 │ !  │ ▶️ │ ⏸️ │ ✕  │    │    │    │    │
    └────┴────┴────┴────┴────┴────┴────┴────┘
```

| Position | Icon | Usage |
|----------|------|-------|
| 0,0 | Orthodox cross | Branding, markers |
| 1,0 | Quest marker | Active quest indicator |
| 2,0 | Speech bubble | NPC wants to talk |
| 3,0 | Location pin | Map markers |
| 4,0 | Save icon | Save game |
| 5,0 | Settings gear | Settings menu |
| 6,0 | Down arrow | Continue dialogue |
| 7,0 | Up arrow | Alternative prompt |
| 0,1 | Exclamation | Alert/notification |
| 1,1 | Play | Start/continue |
| 2,1 | Pause | Pause menu |
| 3,1 | Close X | Close/cancel |

---

## 7. Effect Animations

**File:** `assets/sprites/effects.png`

### Dimensions
- **Frame size:** 16×16 pixels (small effects) or 32×32 (large)
- **Horizontal strips** per effect

### Layout

```
      0    16   32   48   64   80   96  112
    ┌────┬────┬────┬────┬────┬────┬────┬────┐
  0 │ 🕯 │ 🕯 │ 🕯 │ 🕯 │    │    │    │    │  Candle (4 frames, 150ms)
    ├────┼────┼────┼────┼────┼────┼────┼────┤
 16 │ 🔥 │ 🔥 │ 🔥 │ 🔥 │ 🔥 │    │    │    │  Torch (5 frames, 100ms)
    ├────┼────┼────┼────┼────┼────┼────┼────┤
 32 │ 💧 │ 💧 │ 💧 │ 💧 │    │    │    │    │  Water ripple (4 frames)
    ├────┼────┼────┼────┼────┼────┼────┼────┤
 48 │ ☁️ │ ☁️ │ ☁️ │ ☁️ │ ☁️ │ ☁️ │    │    │  Incense (6 frames, 200ms)
    └────┴────┴────┴────┴────┴────┴────┴────┘
```

---

## 8. Technical Requirements

### File Format

- **Format:** PNG-24 with alpha transparency
- **Color depth:** 8-bit per channel (24-bit color + 8-bit alpha)
- **Compression:** Standard PNG compression
- **No interlacing** (faster loading)

### Color Palette Enforcement

All sprites must use only these colors:

```
#000000  Pure Black
#0A0A0A  Near-Black
#1A1A1A  Dark
#2A2A2A  Charcoal
#333333  Medium Dark
#666666  Medium (use sparingly)
#888888  Medium Light (use sparingly)
#B0B0B0  Light Gray
#D4D4D4  Light
#EDEDED  Off-White
#FFFFFF  Pure White

#D4AF37  Byzantine Gold (sacred only)
#B8860B  Dark Gold (sacred only)
#4AF2A1  UI Green (system messages only)
```

### Naming Convention

```
[category]_[name]_[variant].png

Examples:
- player.png
- chrysostom.png
- npcs.png
- tiles_ground.png
- portrait_chrysostom.png
- ui_icons.png
- fx_candle.png
```

### Pixel Alignment

- **No sub-pixel positioning** — all sprites align to whole pixels
- **No rotation** in-game (create rotated variants if needed)
- **Integer scaling only** (2x, 3x, etc.)

---

## Validation Checklist

Before submitting any sprite sheet:

- [ ] Correct dimensions (exact pixel sizes)
- [ ] Palette compliant (only approved colors)
- [ ] No anti-aliasing (clean pixel edges)
- [ ] Proper transparency (no white backgrounds)
- [ ] Consistent style (matches existing assets)
- [ ] Correct frame count and layout
- [ ] Tests in Bevy (loads and animates correctly)

---

*"Let everything be done decently and in order."* — 1 Corinthians 14:40

Measure twice, pixel once. ☦️
