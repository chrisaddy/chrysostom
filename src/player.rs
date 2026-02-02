//! Player movement and control

use bevy::prelude::*;
use crate::GameState;

pub struct PlayerPlugin;

impl Plugin for PlayerPlugin {
    fn build(&self, app: &mut App) {
        app
            .add_systems(OnEnter(GameState::Loading), spawn_player)
            .add_systems(
                Update,
                (
                    player_movement,
                    camera_follow,
                ).run_if(in_state(GameState::Exploration))
            );
    }
}

/// Marker component for the player
#[derive(Component)]
pub struct Player;

/// Player movement speed
#[derive(Component)]
pub struct Speed(pub f32);

fn spawn_player(
    mut commands: Commands,
    mut next_state: ResMut<NextState<GameState>>,
) {
    // Spawn player as a simple colored rectangle for now
    // Will replace with sprite later
    commands.spawn((
        Player,
        Speed(150.0),
        Sprite {
            color: Color::srgb(0.9, 0.9, 0.85), // Off-white, like an icon
            custom_size: Some(Vec2::new(32.0, 48.0)),
            ..default()
        },
        Transform::from_xyz(0.0, 0.0, 10.0), // Above the ground layer
    ));
    
    // Transition to exploration
    next_state.set(GameState::Exploration);
}

fn player_movement(
    keyboard: Res<ButtonInput<KeyCode>>,
    time: Res<Time>,
    mut query: Query<(&Speed, &mut Transform), With<Player>>,
) {
    let Ok((speed, mut transform)) = query.get_single_mut() else {
        return;
    };
    
    let mut direction = Vec2::ZERO;
    
    // WASD and arrow keys
    if keyboard.pressed(KeyCode::KeyW) || keyboard.pressed(KeyCode::ArrowUp) {
        direction.y += 1.0;
    }
    if keyboard.pressed(KeyCode::KeyS) || keyboard.pressed(KeyCode::ArrowDown) {
        direction.y -= 1.0;
    }
    if keyboard.pressed(KeyCode::KeyA) || keyboard.pressed(KeyCode::ArrowLeft) {
        direction.x -= 1.0;
    }
    if keyboard.pressed(KeyCode::KeyD) || keyboard.pressed(KeyCode::ArrowRight) {
        direction.x += 1.0;
    }
    
    // Normalize to prevent faster diagonal movement
    if direction != Vec2::ZERO {
        direction = direction.normalize();
    }
    
    // Apply movement
    let delta = direction * speed.0 * time.delta_secs();
    transform.translation.x += delta.x;
    transform.translation.y += delta.y;
}

fn camera_follow(
    player_query: Query<&Transform, With<Player>>,
    mut camera_query: Query<&mut Transform, (With<Camera2d>, Without<Player>)>,
) {
    let Ok(player_transform) = player_query.get_single() else {
        return;
    };
    
    let Ok(mut camera_transform) = camera_query.get_single_mut() else {
        return;
    };
    
    // Smooth camera follow
    let target = player_transform.translation;
    let current = camera_transform.translation;
    
    camera_transform.translation = current.lerp(
        Vec3::new(target.x, target.y, current.z),
        0.1, // Smoothing factor
    );
}
