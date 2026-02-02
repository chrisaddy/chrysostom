import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { ExplorationScene } from './scenes/ExplorationScene.js';
import { DialogueScene } from './scenes/DialogueScene.js';

const config = {
  type: Phaser.AUTO,
  // Design resolution - game is built for this
  width: 800,
  height: 480,  // 5:3 aspect, good for landscape mobile
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
  scene: [BootScene, ExplorationScene, DialogueScene],
  input: {
    activePointers: 3, // Support multi-touch for virtual gamepad
  }
};

const game = new Phaser.Game(config);

// Prevent pull-to-refresh and other gestures on mobile
document.addEventListener('touchmove', (e) => {
  if (e.target.closest('#game') || e.target.closest('#virtual-gamepad')) {
    e.preventDefault();
  }
}, { passive: false });
