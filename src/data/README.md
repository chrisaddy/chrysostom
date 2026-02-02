# Data Structure

This folder contains all the game's narrative content in JSON format.

## Dialogues (`dialogues/`)

Each dialogue file represents a conversation tree with a character.

### Structure

```json
{
  "id": "unique_key",
  "title": "Display Name",
  "description": "Internal notes about this dialogue",
  "requirements": {
    "quest": "required_quest_id",
    "flags": { "someFlag": true }
  },
  "lines": [
    {
      "speaker": "Character Name",
      "portrait": "portrait_key",
      "text": "What they say. Use {playerName} for interpolation."
    },
    {
      "speaker": "Choices",
      "choices": [
        {
          "text": "What player can say",
          "next": "branch_name",
          "flags": { "flagToSet": true },
          "requirements": { "quest": "some_quest" }
        }
      ]
    }
  ],
  "branches": {
    "branch_name": [
      { "speaker": "...", "text": "..." }
    ]
  }
}
```

### Special Speakers

- `"You"` - Player character (portrait fades)
- `"System"` - Game messages (green text, used for quest updates)
- `"Choices"` - Triggers a choice selection

### Variables

- `{playerName}` - Replaced with player's name

## Quests (`quests/`)

Each quest file defines objectives and rewards.

### Structure

```json
{
  "id": "unique_key",
  "title": "Quest Name",
  "description": "Short description",
  "giver": "npc_id",
  "type": "main|side",
  "chapter": 1,
  
  "objectives": [
    {
      "id": "objective_id",
      "type": "talk|find|give_item|receive_item|observe|discover",
      "target": "npc_or_item_id",
      "description": "What to do",
      "dependsOn": "previous_objective_id"
    }
  ],
  
  "rewards": {
    "items": [...],
    "reputation": { "church": 10, "poor": 5 },
    "unlocks": ["dialogue_id"],
    "flags": { "questComplete": true }
  },
  
  "journal": {
    "start": "Journal entry when quest starts",
    "objective_id": "Entry when this objective completes",
    "complete": "Final journal entry"
  }
}
```

## Adding New Content

1. Create a new JSON file in the appropriate folder
2. Import it in `DialogueScene.js` and add to `DIALOGUE_REGISTRY`
3. Reference the dialogue key in NPC data (in `ExplorationScene.js`)

## Orthodox Theological Notes

Each quest and major dialogue should include `thematicNotes` with:
- `orthodoxTeaching`: What this content teaches about the faith
- `chrysostomQuotes`: Actual quotes from Chrysostom to inspire dialogue
- `historicalContext`: Notes on historical accuracy

This ensures the game stays true to its Orthodox purpose.
