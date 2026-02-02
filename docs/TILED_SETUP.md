# Tiled Map Editor Setup ☦️

Complete guide for setting up Tiled to create maps for Constantinople.

---

## Quick Reference

| Setting | Value |
|---------|-------|
| Tile Size | 16×16 pixels |
| Map Format | JSON |
| Orientation | Orthogonal |
| Render Order | Right-Down |
| Tile Layer Format | CSV |

---

## 1. Installing Tiled

### macOS
```bash
brew install tiled
# Or download from https://www.mapeditor.org/
```

### Windows/Linux
Download from https://www.mapeditor.org/

---

## 2. Project Structure

Our Tiled files live in the game's assets folder:

```
assets/
└── maps/
    ├── tilesets/
    │   ├── constantinople.tsx      # Tileset definition
    │   └── constantinople.png      # Tileset image
    ├── templates/
    │   ├── npc_spawn.tx            # NPC spawn template
    │   └── trigger.tx              # Trigger template
    └── levels/
        ├── hagia_sophia_district.tmx   # Tiled source
        ├── hagia_sophia_district.json  # Exported for Phaser
        ├── market_district.tmx
        └── market_district.json
```

---

## 3. Tileset Setup

### 3.1 Tileset Image Specifications

The tileset image should be:
- **Size:** 256×256 pixels (16×16 tiles, 256 total)
- **Tile size:** 16×16 pixels
- **Margin:** 0 pixels
- **Spacing:** 0 pixels
- **Format:** PNG-24 with transparency

### 3.2 Creating the Tileset in Tiled

1. **File → New → New Tileset**

2. **Settings:**
   - Name: `Constantinople`
   - Type: `Based on Tileset Image`
   - Source: Browse to `constantinople.png`
   - Tile width: `16`
   - Tile height: `16`
   - Margin: `0`
   - Spacing: `0`

3. **Save:** `assets/maps/tilesets/constantinople.tsx`

### 3.3 Tile Properties

Set custom properties on tiles for game logic:

**Collision Tiles:**
- Select wall/obstacle tiles
- View → Custom Properties
- Add: `collides` (bool) = `true`

**Animated Tiles:**
- Select tile
- View → Tile Animation Editor
- Add frames, set duration (ms)

**Terrain Definitions:**
- Tileset menu → Terrain Types
- Define: Ground, Wall, Water, etc.
- Paint corners for auto-tiling

---

## 4. Map Creation

### 4.1 New Map Settings

**File → New → New Map**

| Setting | Value |
|---------|-------|
| Orientation | Orthogonal |
| Tile layer format | CSV |
| Tile render order | Right Down |
| Map size | Width: 50, Height: 40 tiles |
| Tile size | 16×16 pixels |

This creates an 800×640 pixel map (50×16 × 40×16).

### 4.2 Standard Layer Structure

Create these layers in order (bottom to top):

```
Layers Panel:
├── 📁 Background
│   ├── 🔲 Ground           (Tile Layer)
│   └── 🔲 Ground_Detail    (Tile Layer)
├── 📁 Midground  
│   ├── 🔲 Walls            (Tile Layer)
│   ├── 🔲 Buildings        (Tile Layer)
│   └── 🔲 Objects          (Tile Layer)
├── 📁 Foreground
│   └── 🔲 Above_Player     (Tile Layer) - roofs, overhangs
├── 📁 Logic (hidden in-game)
│   ├── 🔶 Collision        (Object Layer)
│   ├── 🔶 NPC_Spawns       (Object Layer)
│   ├── 🔶 Triggers         (Object Layer)
│   └── 🔶 Zones            (Object Layer)
```

**Layer Properties:**

| Layer | Visible | In-Game Use |
|-------|---------|-------------|
| Ground | Yes | Base terrain |
| Ground_Detail | Yes | Cracks, debris, variation |
| Walls | Yes | Collision + rendering |
| Buildings | Yes | Structures |
| Objects | Yes | Props, furniture |
| Above_Player | Yes | Renders above player (depth) |
| Collision | No | Physics boundaries |
| NPC_Spawns | No | Where NPCs appear |
| Triggers | No | Events, zone transitions |
| Zones | No | Named areas for UI |

### 4.3 Object Layer Setup

#### Collision Objects
- Use **Rectangle** tool
- Draw over impassable areas
- Keep shapes simple (rectangles, not complex polygons)

#### NPC Spawn Points
- Use **Point** or **Rectangle** tool
- Add Custom Properties:
  - `npc_type` (string): `chrysostom`, `beggar_01`, etc.
  - `npc_name` (string): Display name
  - `dialogue_key` (string): Which dialogue tree to use
  - `facing` (string): `up`, `down`, `left`, `right`

#### Trigger Zones
- Use **Rectangle** tool for area triggers
- Add Custom Properties:
  - `trigger_type` (string): `zone_enter`, `zone_exit`, `interact`
  - `action` (string): `change_map`, `start_dialogue`, `play_cutscene`
  - `target` (string): Target map/dialogue/cutscene ID

---

## 5. Tile Organization

### 5.1 Tileset Index Reference

Organize your 256-tile tileset logically:

```
Tile Index Layout (16×16 grid, indices 0-255):

Row 0 (0-15):   Ground - stone variants
Row 1 (16-31):  Ground - dirt, marble, grass
Row 2 (32-47):  Ground - water, paths, transitions
Row 3 (48-63):  Walls - basic stone
Row 4 (64-79):  Walls - corners, ends
Row 5 (80-95):  Walls - brick, palace
Row 6 (96-111): Buildings - roofs
Row 7 (112-127): Buildings - doors, windows
Row 8 (128-143): Buildings - columns, arches
Row 9 (144-159): Church - floors
Row 10 (160-175): Church - altar, iconostasis
Row 11 (176-191): Market - stalls, awnings
Row 12 (192-207): Market - props
Row 13 (208-223): Decorations - nature
Row 14 (224-239): Decorations - furniture, statues
Row 15 (240-255): Special - landmarks, animated
```

### 5.2 Essential Tiles

**Minimum Viable Tileset (MVP):**

| Index | Tile | Description |
|-------|------|-------------|
| 0 | Stone Ground | Default walkable |
| 1 | Stone Ground (var) | Visual variation |
| 16 | Dirt | Outskirts |
| 17 | Marble | Church/palace floor |
| 48 | Wall (horizontal) | Basic wall |
| 49 | Wall (vertical) | Basic wall |
| 64 | Wall (corner TL) | Top-left corner |
| 65 | Wall (corner TR) | Top-right corner |
| 66 | Wall (corner BL) | Bottom-left corner |
| 67 | Wall (corner BR) | Bottom-right corner |
| 112 | Door (closed) | Entrance |
| 113 | Door (open) | Open entrance |
| 144 | Church floor | White marble |
| 208 | Tree | Decoration |
| 224 | Bench | Seating |

---

## 6. Export Settings

### 6.1 JSON Export (for Phaser)

**File → Export As**

Settings:
- Format: JSON map files (*.json)
- Location: `assets/maps/levels/`

**Export Options:**
- [x] Embed tilesets
- [x] Minimize output (smaller file)

### 6.2 Keeping Source and Export Synced

Workflow:
1. Edit `.tmx` file in Tiled
2. Save `.tmx`
3. Export to `.json`
4. Both files stay in `assets/maps/levels/`

---

## 7. Phaser Integration

### 7.1 Loading the Map

```javascript
// In BootScene.preload()
preload() {
  // Load tileset image
  this.load.image('tiles', 'assets/maps/tilesets/constantinople.png');
  
  // Load map data
  this.load.tilemapTiledJSON('hagia_sophia', 'assets/maps/levels/hagia_sophia_district.json');
}
```

### 7.2 Creating the Map

```javascript
// In ExplorationScene.create()
create() {
  // Create tilemap
  const map = this.make.tilemap({ key: 'hagia_sophia' });
  
  // Add tileset (name must match Tiled tileset name)
  const tileset = map.addTilesetImage('Constantinople', 'tiles');
  
  // Create layers (names must match Tiled layer names)
  this.groundLayer = map.createLayer('Ground', tileset, 0, 0);
  this.groundDetailLayer = map.createLayer('Ground_Detail', tileset, 0, 0);
  this.wallsLayer = map.createLayer('Walls', tileset, 0, 0);
  this.buildingsLayer = map.createLayer('Buildings', tileset, 0, 0);
  this.objectsLayer = map.createLayer('Objects', tileset, 0, 0);
  this.aboveLayer = map.createLayer('Above_Player', tileset, 0, 0);
  
  // Set up collision
  this.wallsLayer.setCollisionByProperty({ collides: true });
  
  // Or collision by tile index
  // this.wallsLayer.setCollisionBetween(48, 95); // All wall tiles
  
  // Create player after ground, before above layer
  this.createPlayer();
  
  // Set depth so Above_Player renders over player
  this.aboveLayer.setDepth(10);
  
  // Set up physics collision
  this.physics.add.collider(this.player, this.wallsLayer);
  
  // Process object layers
  this.processNPCSpawns(map);
  this.processTriggers(map);
  
  // Camera bounds
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}
```

### 7.3 Processing Object Layers

```javascript
processNPCSpawns(map) {
  const npcLayer = map.getObjectLayer('NPC_Spawns');
  if (!npcLayer) return;
  
  npcLayer.objects.forEach(obj => {
    const npcType = obj.properties?.find(p => p.name === 'npc_type')?.value;
    const npcName = obj.properties?.find(p => p.name === 'npc_name')?.value;
    const dialogueKey = obj.properties?.find(p => p.name === 'dialogue_key')?.value;
    
    // Create NPC sprite at this position
    const npc = this.physics.add.sprite(obj.x, obj.y, npcType);
    npc.setData('name', npcName);
    npc.setData('dialogue', dialogueKey);
    
    this.npcs.push(npc);
  });
}

processTriggers(map) {
  const triggerLayer = map.getObjectLayer('Triggers');
  if (!triggerLayer) return;
  
  triggerLayer.objects.forEach(obj => {
    // Create trigger zone
    const zone = this.add.zone(obj.x, obj.y, obj.width, obj.height);
    this.physics.world.enable(zone);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;
    
    // Store trigger data
    zone.setData('trigger_type', obj.properties?.find(p => p.name === 'trigger_type')?.value);
    zone.setData('action', obj.properties?.find(p => p.name === 'action')?.value);
    zone.setData('target', obj.properties?.find(p => p.name === 'target')?.value);
    
    // Set up overlap detection
    this.physics.add.overlap(this.player, zone, this.onTrigger, null, this);
  });
}

onTrigger(player, zone) {
  const triggerType = zone.getData('trigger_type');
  const action = zone.getData('action');
  const target = zone.getData('target');
  
  if (action === 'change_map') {
    this.scene.start('ExplorationScene', { map: target });
  }
}
```

---

## 8. Sample Map: Hagia Sophia District

### 8.1 Design Sketch

```
+--------------------------------------------------+
|                     WALLS                         |
|  +----------+            +-----------+           |
|  | Building |            |  CHURCH   |           |
|  | (homes)  |            | (Hagia    |           |
|  |          |    ☦       | Sophia)   |           |
|  +----[]----+   Plaza    |           |           |
|       door               +-----[]----+           |
|                              door                 |
|           [Chrysostom spawns here]               |
|                                                   |
|  +-------+  [Market   [Market   +-------+        |
|  |       |   Stall]    Stall]   |       |        |
|  | House |                      | House |        |
|  +---[]--+          ○           +---[]--+        |
|                   Player                          |
|                   Spawn                           |
|  <-- To Market District                          |
+--------------------------------------------------+

Size: 50×40 tiles (800×640 px)
```

### 8.2 Map Properties

Set these in Map → Map Properties:

| Property | Value |
|----------|-------|
| `map_name` | Hagia Sophia District |
| `map_id` | `hagia_sophia` |
| `music` | `byzantine_chant_01` |
| `ambient` | `city_crowd` |
| `time_locked` | `false` |

---

## 9. Tiled Shortcuts

Essential keyboard shortcuts:

| Action | macOS | Windows |
|--------|-------|---------|
| Stamp Brush | B | B |
| Bucket Fill | F | F |
| Eraser | E | E |
| Rectangle Select | R | R |
| Pan View | Space+Drag | Space+Drag |
| Zoom In/Out | ⌘+/⌘- | Ctrl+/Ctrl- |
| Toggle Grid | G | G |
| Undo | ⌘Z | Ctrl+Z |
| Save | ⌘S | Ctrl+S |
| Export | ⌘E | Ctrl+E |

---

## 10. Checklist

### New Map Checklist

- [ ] Create .tmx file with correct settings
- [ ] Set up all required layers
- [ ] Paint ground layer first
- [ ] Add walls with collision property
- [ ] Place buildings and objects
- [ ] Add Above_Player elements
- [ ] Draw collision shapes
- [ ] Place NPC spawn points with properties
- [ ] Place trigger zones
- [ ] Set map properties
- [ ] Test in Tiled (no errors)
- [ ] Export to JSON
- [ ] Test in Phaser
- [ ] Commit both .tmx and .json

### Pre-Export Checklist

- [ ] All layers named correctly
- [ ] Tileset embedded
- [ ] No out-of-bounds tiles
- [ ] Collision layer complete
- [ ] NPC spawns have all properties
- [ ] Triggers have all properties
- [ ] Map properties set

---

*"Every city needs a map. Build ours well."* ☦️
