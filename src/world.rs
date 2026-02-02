//! World rendering - Constantinople in the time of the Golden Mouth

use bevy::prelude::*;
use crate::GameState;

pub struct WorldPlugin;

impl Plugin for WorldPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(OnEnter(GameState::Loading), spawn_world);
    }
}

/// Ground tile marker
#[derive(Component)]
pub struct Ground;

/// Wall/obstacle marker
#[derive(Component)]
pub struct Wall;

/// Church building marker
#[derive(Component)]
pub struct Church;

fn spawn_world(mut commands: Commands) {
    let tile_size = 16.0;
    let map_width = 50;
    let map_height = 40;
    
    // Ground tiles
    for y in 0..map_height {
        for x in 0..map_width {
            let px = (x as f32 - map_width as f32 / 2.0) * tile_size;
            let py = (y as f32 - map_height as f32 / 2.0) * tile_size;
            
            // Border walls
            if x == 0 || x == map_width - 1 || y == 0 || y == map_height - 1 {
                spawn_wall(&mut commands, px, py, tile_size);
                continue;
            }
            
            // Church area
            if x >= 28 && x <= 35 && y >= 10 && y <= 15 {
                spawn_church_tile(&mut commands, px, py, tile_size);
                continue;
            }
            
            // Building outlines
            if should_place_wall(x, y) {
                spawn_wall(&mut commands, px, py, tile_size);
                continue;
            }
            
            // Ground
            spawn_ground(&mut commands, px, py, tile_size);
        }
    }
}

fn spawn_ground(commands: &mut Commands, x: f32, y: f32, size: f32) {
    // Subtle variation in ground color
    let variation = ((x * 7.0 + y * 13.0).sin() * 0.05) as f32;
    let base = 0.15 + variation;
    
    commands.spawn((
        Ground,
        Sprite {
            color: Color::srgb(base, base - 0.02, base - 0.04),
            custom_size: Some(Vec2::splat(size)),
            ..default()
        },
        Transform::from_xyz(x, y, 0.0),
    ));
}

fn spawn_wall(commands: &mut Commands, x: f32, y: f32, size: f32) {
    commands.spawn((
        Wall,
        Sprite {
            color: Color::srgb(0.08, 0.08, 0.08),
            custom_size: Some(Vec2::splat(size)),
            ..default()
        },
        Transform::from_xyz(x, y, 1.0),
    ));
}

fn spawn_church_tile(commands: &mut Commands, x: f32, y: f32, size: f32) {
    // Golden church tiles
    commands.spawn((
        Church,
        Sprite {
            color: Color::srgb(0.3, 0.25, 0.1),
            custom_size: Some(Vec2::splat(size)),
            ..default()
        },
        Transform::from_xyz(x, y, 1.0),
    ));
}

fn should_place_wall(x: i32, y: i32) -> bool {
    // Building 1
    if (x == 5 || x == 12) && y >= 5 && y <= 12 { return true; }
    if (y == 5 || y == 12) && x >= 5 && x <= 12 { return true; }
    
    // Building 2
    if (x == 20 || x == 26) && y >= 20 && y <= 28 { return true; }
    if (y == 20 || y == 28) && x >= 20 && x <= 26 { return true; }
    
    // Building 3 (near church)
    if (x == 28 || x == 35) && y >= 8 && y <= 17 { return true; }
    if (y == 8 || y == 17) && x >= 28 && x <= 35 { return true; }
    
    false
}
