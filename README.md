# Constantinople: A Chrysostom Story ☦️

An Orthodox exploration game set in Constantinople during the time of St. John Chrysostom (~398-404 AD).

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Controls

- **WASD / Arrow Keys** - Move
- **Space / Enter** - Interact / Advance dialogue
- **Click/Tap** - Also works for interaction

## Project Structure

```
chrysostom/
├── src/
│   ├── main.js              # Phaser game config
│   └── scenes/
│       ├── BootScene.js     # Asset loading
│       ├── ExplorationScene.js  # Top-down world
│       └── DialogueScene.js     # Cutaway conversations
├── assets/
│   ├── sprites/             # Character & tile sprites
│   ├── portraits/           # Dialogue portrait art
│   └── maps/                # Tiled map files
├── index.html
└── package.json
```

## Current State

**Working:**
- Top-down movement in placeholder Constantinople
- NPC interaction (approach Chrysostom, press Space)
- Dialogue cutaway scene with typewriter text
- Placeholder graphics (stark black & white style)

**Next Steps:**
- [ ] Real sprite art (16x16 or 32x32 tiles)
- [ ] Portrait art for dialogue scenes
- [ ] Tiled map integration
- [ ] More NPCs and dialogue
- [ ] Quest/mission system
- [ ] Save/load

## Art Style

Inspired by **Death to the World** zine aesthetic:
- Stark black & white
- High contrast
- Orthodox iconographic influence
- Punk energy, not kitsch

## The Story

You're a thief from Antioch who lost everything. You came to Constantinople to survive—steal, cheat, get your bag.

Then John Chrysostom catches your hand in someone's purse. He doesn't call the guards. He offers you another way.

---

*For the glory of God and the good of His Church* ☦️
