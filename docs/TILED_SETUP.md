# Tiled Map Editor Setup ☦️

Complete guide for setting up Tiled to create maps for Constantinople.

**Engine:** Rust / Bevy

---

## Quick Reference

| Setting | Value |
|---------|-------|
| Tile Size | 32×32 pixels |
| Map Format | JSON or TMX |
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
        ├── market_district.tmx
        └── ...
```

---

## 3. Tileset Setup

### 3.1 Tileset Image Specifications

The tileset image should be:
- **Size:** 512×512 pixels (16×16 tiles at 32px each, 256 total)
- **Tile size:** 32×32 pixels
- **Margin:** 0 pixels
- **Spacing:** 0 pixels
- **Format:** PNG-24 with transparency

### 3.2 Creating the Tileset in Tiled

1. **File → New → New Tileset**

2. **Settings:**
   - Name: `Constantinople`
   - Type: `Based on Tileset Image`
   - Source: Browse to `constantinople.png`
   - Tile width: `32`
   - Tile height: `32`
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

---

## 4. Map Creation

### 4.1 New Map Settings

**File → New → New Map**

| Setting | Value |
|---------|-------|
| Orientation | Orthogonal |
| Tile layer format | CSV |
| Tile render order | Right Down |
| Map size | Width: 25, Height: 20 tiles |
| Tile size | 32×32 pixels |

This creates an 800×640 pixel map (25×32 × 20×32).

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
│   └── 🔲 Above_Player     (Tile Layer)
├── 📁 Logic (hidden in-game)
│   ├── 🔶 Collision        (Object Layer)
│   ├── 🔶 NPC_Spawns       (Object Layer)
│   ├── 🔶 Triggers         (Object Layer)
│   └── 🔶 Zones            (Object Layer)
```

---

## 5. Bevy Integration

### 5.1 Using bevy_ecs_tilemap

We use `bevy_ecs_tilemap` crate for Tiled integration.

```toml
# Cargo.toml
[dependencies]
bevy_ecs_tilemap = "0.14"
```

### 5.2 Loading the Map

```rust
use bevy::prelude::*;
use bevy_ecs_tilemap::prelude::*;

fn load_map(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    let map_handle: Handle<TiledMap> = asset_server.load("maps/levels/hagia_sophia.tmx");
    
    commands.spawn(TiledMapBundle {
        tiled_map: map_handle,
        ..default()
    });
}
```

### 5.3 Processing Object Layers

```rust
fn process_map_objects(
    mut commands: Commands,
    map_query: Query<&TiledMap, Added<TiledMap>>,
) {
    for tiled_map in &map_query {
        // Find NPC spawns layer
        for layer in &tiled_map.map.layers {
            if let Some(object_layer) = layer.as_object_layer() {
                if layer.name == "NPC_Spawns" {
                    for object in object_layer.objects() {
                        let npc_type = object.properties.get("npc_type");
                        let position = Vec2::new(object.x, object.y);
                        
                        // Spawn NPC entity
                        commands.spawn((
                            NPC {
                                npc_type: npc_type.cloned(),
                            },
                            Transform::from_xyz(position.x, position.y, 1.0),
                        ));
                    }
                }
            }
        }
    }
}
```

### 5.4 Collision from Tile Properties

```rust
fn setup_collision(
    mut commands: Commands,
    tile_query: Query<(Entity, &TilePos, &TileTextureIndex)>,
    tileset: Res<TilesetData>,
) {
    for (entity, pos, texture_index) in &tile_query {
        // Check if tile has "collides" property
        if tileset.tile_has_property(texture_index.0, "collides") {
            commands.entity(entity).insert(Collider);
        }
    }
}
```

---

## 6. Sample Map: Hagia Sophia District

### 6.1 Design Sketch

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

Size: 25×20 tiles (800×640 px)
```

### 6.2 Map Properties

Set these in Map → Map Properties:

| Property | Value |
|----------|-------|
| `map_name` | Hagia Sophia District |
| `map_id` | `hagia_sophia` |
| `music` | `byzantine_chant_01` |
| `ambient` | `city_crowd` |

---

## 7. Tiled Shortcuts

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

---

## 8. Checklist

### New Map Checklist

- [ ] Create .tmx file with correct settings (32×32 tiles)
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
- [ ] Test in Bevy
- [ ] Commit .tmx file

---

*"Every city needs a map. Build ours well."* ☦️
