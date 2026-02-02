# Constantinople: A Chrysostom Story ☦️

An Orthodox exploration game set in Constantinople during the time of St. John Chrysostom (~398-404 AD).

Built with **Rust** and **Bevy** — runs native or in the browser via WebAssembly.

## Quick Start

### Native (Desktop)

```bash
# Run the game
cargo run

# Release build
cargo run --release
```

### Web (WASM)

```bash
# Install WASM target
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli

# Build WASM
cargo build --release --target wasm32-unknown-unknown

# Generate JS bindings
wasm-bindgen \
  --out-dir web \
  --target web \
  target/wasm32-unknown-unknown/release/chrysostom.wasm

# Serve locally
cd web && python3 -m http.server 8080
```

### Docker

```bash
docker build -t chrysostom .
docker run -p 8080:8080 chrysostom
```

## Controls

| Input | Action |
|-------|--------|
| **WASD / Arrow Keys** | Move |
| **Space / Enter** | Interact / Advance dialogue |

## Project Structure

```
chrysostom/
├── src/
│   ├── main.rs          # Game setup, plugins, states
│   ├── player.rs        # Player movement & input
│   ├── npc.rs           # NPC spawning & proximity detection
│   ├── dialogue.rs      # Dialogue state machine & UI
│   └── world.rs         # Map, walls, camera
├── assets/              # Sprites, fonts, maps (TODO)
├── web/
│   └── index.html       # WASM loading page
├── Cargo.toml
├── Dockerfile           # Multi-stage: Rust build → nginx
└── railway.toml         # Railway deployment config
```

## Architecture

**ECS (Entity Component System)** via Bevy:
- **Components**: `Player`, `NPC`, `Velocity`, `Dialogue`, etc.
- **Systems**: `player_movement`, `npc_proximity`, `dialogue_input`, etc.
- **States**: `GameState::Loading` → `Exploration` ↔ `Dialogue`

## Current State

**Working:**
- Top-down movement with camera follow
- NPC proximity detection
- Dialogue system with state machine
- Placeholder graphics (colored rectangles)
- WASM build for browser deployment

**Next Steps:**
- [ ] Real sprite art (32x32 pixel art)
- [ ] Collision detection with walls
- [ ] More NPCs and branching dialogue
- [ ] Quest/mission system
- [ ] Audio (chants, ambient)
- [ ] Save/load

## Art Style

Inspired by **Death to the World** zine aesthetic:
- Stark black & white
- High contrast
- Orthodox iconographic influence
- Punk energy meets Byzantine reverence

## The Story

You're a thief from Antioch who lost everything. You came to Constantinople to survive—steal, cheat, get your bag.

Then John Chrysostom catches your hand in someone's purse. He doesn't call the guards. He offers you another way.

## Deployment

**GitHub Actions** builds WASM and pushes to GHCR:
```
Push to main → Build WASM → ghcr.io/chrisaddy/chrysostom:latest
```

**Railway** pulls the pre-built image (no build needed):
1. New Project → Docker Image
2. Image: `ghcr.io/chrisaddy/chrysostom:latest`
3. Port: `8080`

## Tech Stack

- **Rust** — Memory safety, performance
- **Bevy 0.15** — ECS game engine
- **wgpu** — Cross-platform graphics (WebGPU/WebGL)
- **wasm-bindgen** — Rust ↔ JavaScript interop

---

*For the glory of God and the good of His Church* ☦️
