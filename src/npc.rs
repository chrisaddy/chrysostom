//! Non-player characters - Saints, merchants, the poor, the faithful

use bevy::prelude::*;
use crate::{GameState, player::Player, dialogue::StartDialogue};

pub struct NpcPlugin;

impl Plugin for NpcPlugin {
    fn build(&self, app: &mut App) {
        app
            .add_systems(OnEnter(GameState::Loading), spawn_chrysostom)
            .add_systems(
                Update,
                (
                    check_npc_interaction,
                    update_interaction_prompt,
                ).run_if(in_state(GameState::Exploration))
            );
    }
}

/// Marker for NPCs
#[derive(Component)]
pub struct Npc;

/// The NPC's name
#[derive(Component)]
pub struct NpcName(pub String);

/// Dialogue key for this NPC
#[derive(Component)]
pub struct DialogueKey(pub String);

/// Marker for NPCs in interaction range
#[derive(Component)]
pub struct InRange;

/// Visual prompt showing interaction is available
#[derive(Component)]
pub struct InteractionPrompt {
    pub target: Entity,
}

/// Distance at which player can interact with NPC
const INTERACTION_DISTANCE: f32 = 60.0;

fn spawn_chrysostom(mut commands: Commands) {
    // St. John Chrysostom - the Golden Mouth
    commands.spawn((
        Npc,
        NpcName("John Chrysostom".into()),
        DialogueKey("chrysostom_intro".into()),
        Sprite {
            color: Color::srgb(0.1, 0.1, 0.1), // Black robes
            custom_size: Some(Vec2::new(32.0, 48.0)),
            ..default()
        },
        Transform::from_xyz(100.0, 80.0, 10.0),
    ));
    
    // Golden halo (child entity)
    // TODO: Add as child sprite
}

fn check_npc_interaction(
    mut commands: Commands,
    keyboard: Res<ButtonInput<KeyCode>>,
    player_query: Query<&Transform, With<Player>>,
    npc_query: Query<(Entity, &Transform, &NpcName, &DialogueKey), With<Npc>>,
    mut dialogue_events: EventWriter<StartDialogue>,
) {
    let Ok(player_transform) = player_query.get_single() else {
        return;
    };
    
    for (npc_entity, npc_transform, name, dialogue_key) in npc_query.iter() {
        let distance = player_transform
            .translation
            .truncate()
            .distance(npc_transform.translation.truncate());
        
        if distance < INTERACTION_DISTANCE {
            // Add InRange marker
            commands.entity(npc_entity).insert(InRange);
            
            // Check for interaction key
            if keyboard.just_pressed(KeyCode::Space) || keyboard.just_pressed(KeyCode::Enter) {
                dialogue_events.send(StartDialogue {
                    npc_name: name.0.clone(),
                    dialogue_key: dialogue_key.0.clone(),
                });
            }
        } else {
            // Remove InRange marker
            commands.entity(npc_entity).remove::<InRange>();
        }
    }
}

fn update_interaction_prompt(
    mut commands: Commands,
    npc_query: Query<(Entity, &Transform, Option<&InRange>), With<Npc>>,
    prompt_query: Query<(Entity, &InteractionPrompt)>,
) {
    // Remove prompts for NPCs no longer in range
    for (prompt_entity, prompt) in prompt_query.iter() {
        if let Ok((_, _, in_range)) = npc_query.get(prompt.target) {
            if in_range.is_none() {
                commands.entity(prompt_entity).despawn();
            }
        } else {
            commands.entity(prompt_entity).despawn();
        }
    }
    
    // Add prompts for NPCs in range
    for (npc_entity, npc_transform, in_range) in npc_query.iter() {
        if in_range.is_some() {
            // Check if prompt already exists
            let has_prompt = prompt_query.iter().any(|(_, p)| p.target == npc_entity);
            
            if !has_prompt {
                commands.spawn((
                    InteractionPrompt { target: npc_entity },
                    Text2d::new("▼ SPACE"),
                    TextFont {
                        font_size: 14.0,
                        ..default()
                    },
                    TextColor(Color::srgb(0.3, 0.9, 0.5)),
                    Transform::from_xyz(
                        npc_transform.translation.x,
                        npc_transform.translation.y + 40.0,
                        20.0,
                    ),
                ));
            }
        }
    }
}
