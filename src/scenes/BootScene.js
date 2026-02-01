import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Show loading text
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      color: '#ededed'
    }).setOrigin(0.5);

    // Generate placeholder sprites programmatically (until we have real art)
    this.generatePlaceholderAssets();
  }

  generatePlaceholderAssets() {
    // Player sprite (simple 16x24 figure)
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    
    // Simple monochrome character - stark black on transparent
    playerGraphics.fillStyle(0x000000);
    // Body
    playerGraphics.fillRect(4, 8, 8, 12);
    // Head
    playerGraphics.fillCircle(8, 5, 4);
    // Feet
    playerGraphics.fillRect(4, 20, 3, 4);
    playerGraphics.fillRect(9, 20, 3, 4);
    
    playerGraphics.generateTexture('player', 16, 24);
    playerGraphics.destroy();

    // NPC sprite (Chrysostom - with bishop's hat silhouette)
    const npcGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    npcGraphics.fillStyle(0x000000);
    // Body (robes)
    npcGraphics.fillRect(2, 10, 12, 14);
    // Head
    npcGraphics.fillCircle(8, 6, 4);
    // Bishop's crown/hat
    npcGraphics.fillRect(4, 0, 8, 4);
    npcGraphics.fillRect(6, -2, 4, 3);
    
    npcGraphics.generateTexture('chrysostom', 16, 24);
    npcGraphics.destroy();

    // Simple tile - ground
    const groundGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    groundGraphics.fillStyle(0xd4d4d4);
    groundGraphics.fillRect(0, 0, 16, 16);
    groundGraphics.lineStyle(1, 0xb0b0b0);
    groundGraphics.strokeRect(0, 0, 16, 16);
    groundGraphics.generateTexture('ground', 16, 16);
    groundGraphics.destroy();

    // Wall tile
    const wallGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    wallGraphics.fillStyle(0x2a2a2a);
    wallGraphics.fillRect(0, 0, 16, 16);
    wallGraphics.lineStyle(1, 0x1a1a1a);
    wallGraphics.strokeRect(0, 0, 16, 16);
    // Add some texture
    wallGraphics.fillStyle(0x3a3a3a);
    wallGraphics.fillRect(2, 2, 5, 5);
    wallGraphics.fillRect(9, 9, 5, 5);
    wallGraphics.generateTexture('wall', 16, 16);
    wallGraphics.destroy();

    // Church tile (special)
    const churchGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    churchGraphics.fillStyle(0xe8e8e8);
    churchGraphics.fillRect(0, 0, 16, 16);
    // Cross pattern
    churchGraphics.fillStyle(0x000000);
    churchGraphics.fillRect(7, 2, 2, 12);
    churchGraphics.fillRect(4, 5, 8, 2);
    churchGraphics.generateTexture('church', 16, 16);
    churchGraphics.destroy();

    // Interaction prompt
    const promptGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    promptGraphics.fillStyle(0xffffff);
    promptGraphics.fillCircle(8, 8, 6);
    promptGraphics.fillStyle(0x000000);
    promptGraphics.fillRect(7, 4, 2, 5);
    promptGraphics.fillRect(7, 10, 2, 2);
    promptGraphics.generateTexture('prompt', 16, 16);
    promptGraphics.destroy();
  }

  create() {
    this.scene.start('ExplorationScene');
  }
}
