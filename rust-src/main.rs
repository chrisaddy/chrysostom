//! Constantinople - A Chrysostom Story
//! 
//! An Orthodox exploration game set in Constantinople during the time of 
//! St. John Chrysostom, Archbishop and Doctor of the Church.
//!
//! Built with Bevy, built with love, built right.

use bevy::prelude::*;

mod player;
mod npc;
mod dialogue;
mod world;

use player::PlayerPlugin;
use npc::NpcPlugin;
use dialogue::DialoguePlugin;
use world::WorldPlugin;

/// Game states
#[derive(States, Debug, Clone, Copy, Eq, PartialEq, Hash, Default)]
pub enum GameState {
    #[default]
    Loading,
    Exploration,
    Dialogue,
    Menu,
}

fn main() {
    App::new()
        .add_plugins(
            DefaultPlugins
                .set(WindowPlugin {
                    primary_window: Some(Window {
                        title: "Constantinople - A Chrysostom Story".into(),
                        resolution: (800., 600.).into(),
                        ..default()
                    }),
                    ..default()
                })
                .set(ImagePlugin::default_nearest()), // Pixel art filtering
        )
        .init_state::<GameState>()
        .add_plugins((
            WorldPlugin,
            PlayerPlugin,
            NpcPlugin,
            DialoguePlugin,
        ))
        .add_systems(Startup, setup)
        .run();
}

fn setup(mut commands: Commands) {
    // Camera
    commands.spawn(Camera2d::default());
}
