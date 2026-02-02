# Art Style Guide: Constantinople ☦️

## The Death to the World Aesthetic

This game's visual identity is inspired by **Death to the World**, the Orthodox Christian punk zine that emerged in the 1990s. The aesthetic is stark, confrontational, beautiful, and deeply spiritual—punk energy married to ancient iconography.

**This is not a "Christian video game" look.** No pastel angels. No clip-art crosses. This is icon corners and basement shows. This is the desert fathers and Black Flag. 

---

## Core Visual Principles

### 1. High Contrast Black & White

The primary palette is **stark black and white**. Not gray. Not soft. Stark.

```
PRIMARY PALETTE
═══════════════════════════════════════════════════
#000000  ████  Pure Black (lines, figures, shadows)
#0A0A0A  ████  Near-Black (backgrounds, depth)
#1A1A1A  ████  Dark (secondary surfaces)
#2A2A2A  ████  Charcoal (walls, buildings)
#D4D4D4  ████  Light Gray (ground, open areas)
#EDEDED  ████  Off-White (highlights, text, skin)
#FFFFFF  ████  Pure White (rare, for emphasis)
═══════════════════════════════════════════════════
```

### 2. Sacred Gold (Selective)

Gold is reserved for **holy things only**:
- Halos around saints
- Gospel books
- Church domes
- Liturgical objects (chalice, paten)
- Icon details

```
SACRED ACCENTS
═══════════════════════════════════════════════════
#D4AF37  ████  Byzantine Gold (halos, domes)
#B8860B  ████  Dark Gold (shadows on gold)
#4AF2A1  ████  Mystic Green (UI, system text)
═══════════════════════════════════════════════════
```

**Rule:** If it's not explicitly holy, it's not gold. The restraint makes the gold powerful.

### 3. Woodcut/Linocut Feel

Linework should feel hand-carved:
- **Thick, confident strokes** — no thin hairlines
- **Visible texture** — subtle imperfections welcome
- **No anti-aliasing** — embrace the pixel
- **Cross-hatching** for shadows and texture
- **Solid fills** over gradients

Think: Medieval woodcuts, prison tattoos, photocopied zines.

### 4. Orthodox Iconographic Influence

Characters and portraits draw from icon traditions:
- **Frontal or 3/4 views** (never full profile)
- **Large, expressive eyes** — windows to the soul
- **Elongated features** — slight stylization toward the spiritual
- **Flat perspective** — no vanishing points in figures
- **Symbolic gesture** — hands positioned meaningfully
- **Inverse perspective** in architecture (things larger as they recede spiritually)

### 5. Punk Energy

Despite the spiritual content, the visual energy is punk:
- **Confrontational** — figures look at the viewer
- **Dense** — fill the frame, no wasted space
- **Raw** — imperfect is better than polished
- **Intense** — every image should have weight

---

## Character Design

### Player Character

The player is a thief from Antioch—desperate, hungry, on the edge.

**Visual traits:**
- Threadbare clothing (simple tunic, worn cloak)
- Lean, sharp features
- Eyes that dart (in portrait)
- No halo (obviously)
- Bare feet or simple sandals

**Animation priority:**
- Walk cycle (4-6 frames per direction)
- Idle breathing
- Interaction reach

### St. John Chrysostom

The "Golden Mouth"—Archbishop of Constantinople, fearless preacher, friend of the poor.

**Visual traits:**
- Bishop's vestments (simplified for sprite scale)
- Omophorion (the white stole with crosses)
- Bishop's crown/mitre silhouette
- Gold halo (always)
- Kind but piercing eyes
- Beard (obviously)
- Slight, not imposing physically—his power is spiritual

**Portrait style:**
- Drawn in icon tradition
- Large eyes that meet the viewer
- Blessing gesture or holding gospel
- Halo must be visible

### NPCs: Common People

Constantinople is full of people. They should feel diverse but unified by style.

**Types needed:**
- Market vendors (men and women)
- Beggars (Chrysostom's flock)
- Wealthy citizens (tension with Chrysostom)
- Monastics (monks and nuns)
- Imperial guards
- Children
- Clergy (deacons, priests)

**Visual consistency:**
- Same stark black/white treatment
- Period-appropriate clothing (Byzantine, ~400 AD)
- Faces should have character, not be generic
- Halos only for recognized saints

### Antagonists

Empress Eudoxia and her faction—not evil, but in opposition.

**Eudoxia:**
- Imperial regalia (crown, jeweled robes)
- Beautiful but cold
- Purple accents (if we ever add color)
- No halo—she's not a saint

**Theophilus of Alexandria:**
- Bishop's vestments like Chrysostom
- Older, heavier
- Eyes that calculate
- Technically has a halo? (controversial—he was a bishop, but...)

---

## Environment Design

### Architecture

Constantinople at its early height. Blend of:
- Roman engineering (arches, columns, baths)
- Eastern influence (domes, mosaics)
- Christian conversion (crosses atop everything)

**Key structures:**
- **Hagia Sophia** (the OLD one—wooden roof, smaller than Justinian's)
- **The Hippodrome** (massive, the city's heart)
- **Imperial Palace** complex
- **City walls** (Theodosian walls being built during this period)
- **Markets** (stoa-style covered markets)
- **Monasteries** (simple, austere)
- **Private homes** (Roman atrium style)

**Tile style:**
- **Clear silhouettes** — know what it is at a glance
- **Thick outlines** — 1-2 pixel black border on everything
- **Pattern textures** — simple repeating marks for stone, wood, etc.
- **No perspective in tiles** — strict top-down

### Sacred Spaces

Churches and holy places get special treatment:
- **Gold accents** on domes and crosses
- **Lighter ground** (white marble floors)
- **Icon placement** on walls (tiny pixel icons!)
- **Candles** (small bright spots)
- **Incense** (subtle gray wisps if animated)

### Market/Secular Spaces

Contrast with sacred spaces:
- **Denser, busier** layouts
- **More gray tones** 
- **Clutter** (crates, baskets, awnings)
- **People everywhere**

### Time of Day

The game follows the liturgical cycle. Visual changes:

**Morning (Orthros):**
- Lighter palette overall
- Long shadows from left (east)
- Gold on domes catches light

**Midday:**
- Harshest contrast
- Short shadows
- Hottest whites

**Evening (Vespers):**
- Longer shadows from right
- Slightly warmer? (or just softer)
- Candles visible in windows

**Night:**
- Near-black dominates
- Windows glow
- Stars? (simple white dots)

---

## UI Design

### Dialogue Boxes

- **Black background** (#0A0A0A)
- **Thin white border** 
- **Georgia or serif font** (timeless, readable)
- **Off-white text** (#EDEDED)
- **Green accent** (#4AF2A1) for system messages

### Menus

- Minimal
- Black backgrounds
- White text
- No unnecessary decoration
- Orthodox cross (☦) as bullet points or dividers

### HUD (Minimal)

- Location name in corner
- Interaction prompt when near NPCs
- Quest log accessible but not always visible
- No health bars (this isn't that kind of game)

---

## Animation Principles

### Character Animation

- **Deliberate, not floaty** — weight to movements
- **Limited frames is fine** — 4-6 frame walk cycle works
- **Idle animation** — subtle breathing, blinking
- **NPCs can be static** — sprites don't have to move constantly

### Environment Animation

- **Candle flicker** (2-3 frames)
- **Torch flame** (3-4 frames)
- **Water shimmer** (harbor, fountains)
- **Flag/banner wave** (3-4 frames)
- **Incense rise** (subtle, if included)

### Portrait Animation

- **Blink** (rare, subtle)
- **Expression shifts** (for emotional beats in dialogue)
- **No lip sync** — not necessary for this style

---

## Reference Materials

### Death to the World

The primary visual reference. Find issues of the zine online. Study:
- Cover art compositions
- Mix of iconography and punk imagery
- Typography treatment
- Use of black space

### Byzantine Iconography

- Andrei Rublev's icons
- Theophanes the Greek
- Novgorod school (stark, less ornate)
- Study the faces especially—the eyes

### Woodcut Art

- Medieval woodcuts (dance of death, etc.)
- Albrecht Dürer (for technique, though his style is more Renaissance)
- Mexican woodcut tradition (bold, simple)
- Punk show flyers

### Games (Mood Reference)

- **Pentiment** — medieval woodcut aesthetic in games
- **Return of the Obra Dinn** — 1-bit, stark contrast
- **Blasphemous** — religious imagery, pixel art
- **Kentucky Route Zero** — stark, theatrical presentation

---

## DO and DON'T

### DO

✓ Embrace the pixel grid
✓ Use thick, confident lines
✓ Let black breathe
✓ Make eyes expressive
✓ Keep halos sacred
✓ Let the style be confrontational
✓ Study actual icons for faces and poses

### DON'T

✗ Anti-alias or smooth edges
✗ Use gradients
✗ Make it "cute" or "friendly"
✗ Overuse gold
✗ Add unnecessary detail at small scales
✗ Forget the punk energy
✗ Make it look like other "Christian games"

---

## Technical Specs (Quick Reference)

| Element | Size | Notes |
|---------|------|-------|
| Tiles | 16×16 px | Top-down, no perspective |
| Characters | 16×24 px | Small enough to fit multiple per screen |
| Portraits | 128×192 px | Icon-style, larger for impact |
| UI Icons | 16×16 px | Simple, recognizable |

---

*"Speak the truth, even if your voice trembles."*

—The aesthetic is the message. Make it count.
