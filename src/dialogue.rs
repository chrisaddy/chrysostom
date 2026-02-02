//! Dialogue system - conversations with the saints and the faithful

use bevy::prelude::*;
use crate::GameState;

pub struct DialoguePlugin;

impl Plugin for DialoguePlugin {
    fn build(&self, app: &mut App) {
        app
            .add_event::<StartDialogue>()
            .add_event::<AdvanceDialogue>()
            .init_resource::<CurrentDialogue>()
            .add_systems(
                Update,
                (
                    handle_start_dialogue,
                    handle_dialogue_input,
                    advance_dialogue,
                ).run_if(in_state(GameState::Exploration).or(in_state(GameState::Dialogue)))
            )
            .add_systems(OnEnter(GameState::Dialogue), show_dialogue_ui)
            .add_systems(OnExit(GameState::Dialogue), cleanup_dialogue_ui);
    }
}

/// Event to start a dialogue
#[derive(Event)]
pub struct StartDialogue {
    pub npc_name: String,
    pub dialogue_key: String,
}

/// Event to advance dialogue
#[derive(Event)]
pub struct AdvanceDialogue;

/// Current dialogue state
#[derive(Resource, Default)]
pub struct CurrentDialogue {
    pub npc_name: String,
    pub lines: Vec<DialogueLine>,
    pub current_line: usize,
    pub active: bool,
}

/// A single line of dialogue
#[derive(Clone)]
pub struct DialogueLine {
    pub speaker: String,
    pub text: String,
}

/// Marker for dialogue UI elements
#[derive(Component)]
pub struct DialogueUi;

/// The speaker name text
#[derive(Component)]
pub struct SpeakerText;

/// The dialogue content text
#[derive(Component)]
pub struct DialogueText;

fn handle_start_dialogue(
    mut events: EventReader<StartDialogue>,
    mut dialogue: ResMut<CurrentDialogue>,
    mut next_state: ResMut<NextState<GameState>>,
) {
    for event in events.read() {
        // Load dialogue based on key
        let lines = load_dialogue(&event.dialogue_key);
        
        *dialogue = CurrentDialogue {
            npc_name: event.npc_name.clone(),
            lines,
            current_line: 0,
            active: true,
        };
        
        next_state.set(GameState::Dialogue);
    }
}

fn load_dialogue(key: &str) -> Vec<DialogueLine> {
    // TODO: Load from JSON/RON files
    // For now, hardcoded dialogue
    match key {
        "chrysostom_intro" => vec![
            DialogueLine {
                speaker: "John Chrysostom".into(),
                text: "Peace be with you, child.".into(),
            },
            DialogueLine {
                speaker: "John Chrysostom".into(),
                text: "I see in your eyes a hunger - not for bread, though that too perhaps.".into(),
            },
            DialogueLine {
                speaker: "John Chrysostom".into(),
                text: "But a hunger for something more. For meaning. For truth.".into(),
            },
            DialogueLine {
                speaker: "You".into(),
                text: "How do you know this, Father?".into(),
            },
            DialogueLine {
                speaker: "John Chrysostom".into(),
                text: "Because I have seen it a thousand times. In the eyes of the poor. The rich. The emperor himself.".into(),
            },
            DialogueLine {
                speaker: "John Chrysostom".into(),
                text: "We are all beggars before God, child. The only difference is whether we know it.".into(),
            },
        ],
        _ => vec![
            DialogueLine {
                speaker: "???".into(),
                text: "...".into(),
            },
        ],
    }
}

fn show_dialogue_ui(
    mut commands: Commands,
    dialogue: Res<CurrentDialogue>,
) {
    // Dark overlay
    commands.spawn((
        DialogueUi,
        Sprite {
            color: Color::srgba(0.0, 0.0, 0.0, 0.85),
            custom_size: Some(Vec2::new(2000.0, 2000.0)),
            ..default()
        },
        Transform::from_xyz(0.0, 0.0, 50.0),
    ));
    
    // Dialogue box background
    commands.spawn((
        DialogueUi,
        Sprite {
            color: Color::srgb(0.05, 0.05, 0.05),
            custom_size: Some(Vec2::new(700.0, 150.0)),
            ..default()
        },
        Transform::from_xyz(0.0, -200.0, 51.0),
    ));
    
    // Speaker name
    let speaker = dialogue.lines.get(0).map(|l| l.speaker.as_str()).unwrap_or("");
    commands.spawn((
        DialogueUi,
        SpeakerText,
        Text2d::new(speaker),
        TextFont {
            font_size: 24.0,
            ..default()
        },
        TextColor(Color::srgb(0.83, 0.68, 0.21)), // Gold
        Transform::from_xyz(-300.0, -140.0, 52.0),
    ));
    
    // Dialogue text
    let text = dialogue.lines.get(0).map(|l| l.text.as_str()).unwrap_or("");
    commands.spawn((
        DialogueUi,
        DialogueText,
        Text2d::new(text),
        TextFont {
            font_size: 18.0,
            ..default()
        },
        TextColor(Color::srgb(0.93, 0.93, 0.93)),
        Transform::from_xyz(0.0, -200.0, 52.0),
    ));
    
    // Continue prompt
    commands.spawn((
        DialogueUi,
        Text2d::new("▼ SPACE to continue"),
        TextFont {
            font_size: 12.0,
            ..default()
        },
        TextColor(Color::srgb(0.5, 0.5, 0.5)),
        Transform::from_xyz(280.0, -260.0, 52.0),
    ));
}

fn handle_dialogue_input(
    keyboard: Res<ButtonInput<KeyCode>>,
    state: Res<State<GameState>>,
    mut events: EventWriter<AdvanceDialogue>,
) {
    if *state.get() != GameState::Dialogue {
        return;
    }
    
    if keyboard.just_pressed(KeyCode::Space) || keyboard.just_pressed(KeyCode::Enter) {
        events.send(AdvanceDialogue);
    }
}

fn advance_dialogue(
    mut events: EventReader<AdvanceDialogue>,
    mut dialogue: ResMut<CurrentDialogue>,
    mut next_state: ResMut<NextState<GameState>>,
    mut speaker_query: Query<&mut Text2d, (With<SpeakerText>, Without<DialogueText>)>,
    mut text_query: Query<&mut Text2d, (With<DialogueText>, Without<SpeakerText>)>,
) {
    for _ in events.read() {
        if !dialogue.active {
            continue;
        }
        
        dialogue.current_line += 1;
        
        if dialogue.current_line >= dialogue.lines.len() {
            // End dialogue
            dialogue.active = false;
            next_state.set(GameState::Exploration);
        } else {
            // Update text
            let line = &dialogue.lines[dialogue.current_line];
            
            for mut speaker in speaker_query.iter_mut() {
                speaker.0 = line.speaker.clone();
            }
            
            for mut text in text_query.iter_mut() {
                text.0 = line.text.clone();
            }
        }
    }
}

fn cleanup_dialogue_ui(
    mut commands: Commands,
    query: Query<Entity, With<DialogueUi>>,
) {
    for entity in query.iter() {
        commands.entity(entity).despawn();
    }
}
