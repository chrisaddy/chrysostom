# Art Tools Guide ☦️

Recommended tools and workflows for creating Constantinople's visual assets.

---

## Primary Tool: Aseprite

**The industry standard for pixel art.** If you're serious about this project, get Aseprite.

### Why Aseprite

- Purpose-built for pixel art and animation
- Onion skinning for smooth animations
- Palette management (enforce our color palette)
- Tilemap mode for tile creation
- Layer support with pixel-perfect blending
- Native sprite sheet export
- Active development and community

### Getting Aseprite

**Official (Recommended):**
- Purchase: https://www.aseprite.org/ — $19.99
- Worth every penny for serious pixel art

**Free Alternative (Compile from source):**
```bash
# Aseprite is open source, paid for convenience
git clone --recursive https://github.com/aseprite/aseprite.git
# Follow build instructions in INSTALL.md
```

### Aseprite Setup for Constantinople

**1. Create Custom Palette**

Save this as `constantinople.gpl` (GIMP palette format):
```
GIMP Palette
Name: Constantinople
#
  0   0   0    Black
 10  10  10    Near-Black
 26  26  26    Dark
 42  42  42    Charcoal
 51  51  51    Medium-Dark
102 102 102    Medium
136 136 136    Medium-Light
176 176 176    Light-Gray
212 212 212    Light
237 237 237    Off-White
255 255 255    White
212 175  55    Byzantine-Gold
184 134  11    Dark-Gold
 74 242 161    UI-Green
```

Or in Aseprite:
1. Edit → Keyboard Shortcuts → Set "New Palette from Sprite" shortcut
2. Create a 14×1 pixel sprite with all colors
3. Sprite → Palette → New Palette from Sprite
4. Save as `constantinople.aseprite-palette`

**2. Configure for 16px Work**

- View → Pixel Grid (enable for zoom levels)
- View → Grid → Grid Settings: 16×16 for tiles, 16×24 for characters
- Preferences → Editor → Right-click: Pick foreground color

**3. Animation Setup**

For character sprites:
- Frame → Frame Duration: 100ms default
- View → Timeline (always visible)
- Enable Onion Skin (View → Onion Skin)

### Aseprite Workflow

**Creating a Character Sprite Sheet:**

1. New: 16×24 pixels
2. Add frames (F key) for animation
3. Draw first frame
4. Use onion skin to animate
5. Export: File → Export Sprite Sheet
   - Layout: By Rows
   - Sheet Type: Packed (or Fixed Rows for specific layouts)
   - Output: PNG

**Creating Tiles:**

1. New: 16×16 pixels (or 256×256 for full tileset)
2. View → Tiled Mode (see tile repetition)
3. Draw with seams in mind
4. For tileset: Sprite → Canvas Size for grid

---

## Free Alternatives

### Piskel (Browser-Based)

**Best for:** Quick work, no install needed, beginners
**URL:** https://www.piskelapp.com/

**Pros:**
- Free and browser-based
- Simple interface
- Animation support
- Export to PNG/GIF/sprite sheet

**Cons:**
- Limited features vs Aseprite
- No custom palettes (workaround: import palette image)
- Can be laggy with large files

**Workflow:**
1. Set canvas to 16×24 (character) or 16×16 (tile)
2. Use layers for organization
3. Export → Download as PNG (for static) or Export Spritesheet

### LibreSprite

**Best for:** People who want Aseprite but free
**URL:** https://libresprite.github.io/

Fork of Aseprite from before it went paid-only. Similar interface, slightly behind on features.

**Install:**
```bash
# macOS
brew install libresprite

# Linux
# Build from source or use AppImage
```

### GraphicsGale (Windows Only)

**Best for:** Windows users wanting free pro-level tool
**URL:** https://graphicsgale.com/us/

Was commercial, now free. Excellent for animation.

### GIMP + Plugins

**Best for:** People who already know GIMP
**URL:** https://www.gimp.org/

Not ideal for pixel art, but workable:
- Disable anti-aliasing on all tools
- Use Pencil tool (not Brush)
- Enable pixel grid
- Consider "Pixel Art" plugin pack

---

## Tiled Map Editor

**Essential for level design.** Creates the maps our Phaser game loads.

### Getting Tiled

**URL:** https://www.mapeditor.org/

- Free and open source
- Donation-supported ($)
- Available for macOS, Windows, Linux

**Install:**
```bash
# macOS
brew install tiled

# Or download from website
```

### Tiled Setup for Constantinople

**1. Create New Tileset**

- File → New → New Tileset
- Name: "Constantinople Tiles"
- Type: Based on Tileset Image
- Source: `assets/tiles/tileset.png`
- Tile width: 16
- Tile height: 16
- Margin: 0
- Spacing: 0
- Save as: `assets/maps/constantinople.tsx`

**2. Create New Map**

- File → New → New Map
- Orientation: Orthogonal
- Tile size: 16×16
- Map size: Start with 50×40 tiles (800×640 px)
- Tile layer format: CSV
- Tile render order: Right Down

**3. Layer Setup**

Create these layers (bottom to top):
```
├── Ground        (tile layer)
├── Ground Detail (tile layer)
├── Walls         (tile layer)
├── Objects       (tile layer)
├── Collision     (object layer - for physics)
├── NPCs          (object layer - spawn points)
└── Triggers      (object layer - events)
```

**4. Collision Layer**

- Create Object Layer named "Collision"
- Draw rectangles over walls/obstacles
- Set custom property: `collision: true`

**5. Export Settings**

- File → Export As → JSON
- Save to: `assets/maps/[mapname].json`

### Phaser Integration

```javascript
// Load tilemap
this.load.tilemapTiledJSON('map', 'assets/maps/hagia_sophia.json');
this.load.image('tiles', 'assets/tiles/tileset.png');

// Create map
const map = this.make.tilemap({ key: 'map' });
const tileset = map.addTilesetImage('Constantinople Tiles', 'tiles');

// Create layers
const groundLayer = map.createLayer('Ground', tileset, 0, 0);
const wallsLayer = map.createLayer('Walls', tileset, 0, 0);

// Set collision
wallsLayer.setCollisionByProperty({ collides: true });
// Or: wallsLayer.setCollisionByExclusion([-1]); // All tiles collide

this.physics.add.collider(this.player, wallsLayer);
```

---

## Color Management Tools

### Color Palette References

Keep the palette consistent across tools:

**Hex Codes:**
```
#000000  #0A0A0A  #1A1A1A  #2A2A2A  #333333
#666666  #888888  #B0B0B0  #D4D4D4  #EDEDED  #FFFFFF
#D4AF37  #B8860B  #4AF2A1
```

**RGB Values:**
```
  0,  0,  0     10, 10, 10     26, 26, 26     42, 42, 42     51, 51, 51
102,102,102    136,136,136    176,176,176    212,212,212    237,237,237    255,255,255
212,175, 55    184,134, 11     74,242,161
```

### Color Picker Extensions

**macOS:**
- Built-in Digital Color Meter
- Or: Sip ($), Pika (free)

**Windows:**
- PowerToys Color Picker (free, Microsoft)

**Browser:**
- ColorZilla extension

---

## Version Control for Art

### Git LFS for Large Files

Set up Git LFS for binary assets:

```bash
# Install
git lfs install

# Track PNGs
git lfs track "*.png"
git lfs track "*.aseprite"

# Commit .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS for art assets"
```

### Asset Naming Convention

```
[category]_[name]_[variant]_v[version].png

Examples:
- player_walk_down_v1.png
- player_walk_down_v2.png  (iteration)
- tiles_ground_stone_final.png
```

Keep `.aseprite` source files separate from exported PNGs:
```
art_source/           (not in repo, or separate repo)
├── player.aseprite
├── chrysostom.aseprite
└── tiles.aseprite

assets/               (in game repo)
├── sprites/
│   ├── player.png
│   └── chrysostom.png
└── tiles/
    └── tileset.png
```

---

## Reference Gathering Tools

### For Byzantine/Orthodox References

**Websites:**
- https://commons.wikimedia.org/ — Public domain icons
- https://www.icon-art.info/ — Icon database
- https://www.metmuseum.org/art/collection — Met's Byzantine collection

**Books:**
- "The Icon" by Kurt Weitzmann
- "Byzantine Art" by Robin Cormack

### For Death to the World Aesthetic

**Online Archives:**
- Search "Death to the World zine" images
- Orthodox punk flyer archives
- Russian/Greek prison tattoo references

### Screenshot/Moodboard Tools

**macOS:**
- Screenshot (⌘+Shift+4)
- Preview for quick edits

**Cross-platform:**
- PureRef (free, moodboard tool) — https://www.pureref.com/
- Pinterest (for collecting references)

---

## Workflow Summary

### New Character Creation

1. **Reference:** Gather Byzantine clothing/icon references
2. **Sketch:** Paper or Aseprite rough (new layer, low opacity)
3. **Block:** Fill silhouette in pure black
4. **Define:** Add white highlights, face details
5. **Gold:** Add halo if saint
6. **Animate:** Create walk cycle frames
7. **Export:** Sprite sheet per SPRITE_SPECS.md
8. **Test:** Load in Phaser, verify animations
9. **Commit:** Add to version control

### New Tileset Creation

1. **Plan:** Sketch tile layout on paper
2. **Base Tile:** Create in Aseprite with Tiled Mode
3. **Variants:** Duplicate and modify
4. **Corners/Edges:** Create connecting pieces
5. **Test:** Import to Tiled, build test map
6. **Iterate:** Fix tiling issues
7. **Export:** Full tileset PNG
8. **Document:** Update ASSET_LIST.md

---

## Quick Start Checklist

For someone starting from zero:

- [ ] Install Aseprite (or LibreSprite)
- [ ] Download constantinople.gpl palette
- [ ] Install Tiled
- [ ] Create test 16×16 tile
- [ ] Create test 16×24 character
- [ ] Export both, verify in Phaser
- [ ] Read ART_STYLE_GUIDE.md thoroughly
- [ ] Study Byzantine icon references
- [ ] Create first real asset

---

*"The tools are nothing without the hand that wields them."*

Pick up the pen. Start drawing. ☦️
