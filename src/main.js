import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { ExplorationScene } from './scenes/ExplorationScene.js';
import { DialogueScene } from './scenes/DialogueScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  backgroundColor: '#0a0a0a',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, ExplorationScene, DialogueScene]
};

const game = new Phaser.Game(config);
