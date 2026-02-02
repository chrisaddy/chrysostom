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
    // === PLAYER SPRITE (32x32) - Hooded thief ===
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    
    // Stark black silhouette with white details
    playerGraphics.fillStyle(0x000000);
    
    // Cloak/body (triangular shape)
    playerGraphics.beginPath();
    playerGraphics.moveTo(16, 6);    // Top of hood
    playerGraphics.lineTo(6, 30);    // Bottom left
    playerGraphics.lineTo(26, 30);   // Bottom right
    playerGraphics.closePath();
    playerGraphics.fill();
    
    // Hood opening (darker shadow within)
    playerGraphics.fillStyle(0x1a1a1a);
    playerGraphics.fillEllipse(16, 12, 6, 5);
    
    // Face (barely visible in shadow)
    playerGraphics.fillStyle(0xcccccc);
    playerGraphics.fillEllipse(16, 13, 4, 4);
    
    // Eyes - just glints in the shadow
    playerGraphics.fillStyle(0xffffff);
    playerGraphics.fillCircle(14, 12, 1);
    playerGraphics.fillCircle(18, 12, 1);
    
    // Feet
    playerGraphics.fillStyle(0x000000);
    playerGraphics.fillRect(10, 28, 4, 4);
    playerGraphics.fillRect(18, 28, 4, 4);
    
    playerGraphics.generateTexture('player', 32, 32);
    playerGraphics.destroy();

    // === CHRYSOSTOM SPRITE (32x32) - Bishop with klobuk ===
    const npcGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    
    // Black robes
    npcGraphics.fillStyle(0x000000);
    npcGraphics.beginPath();
    npcGraphics.moveTo(16, 10);   // Shoulders
    npcGraphics.lineTo(6, 30);    // Bottom left
    npcGraphics.lineTo(26, 30);   // Bottom right
    npcGraphics.closePath();
    npcGraphics.fill();
    
    // Klobuk (monastic hood/hat)
    npcGraphics.fillRect(10, 2, 12, 8);
    npcGraphics.fillRect(12, 0, 8, 4);
    
    // Face
    npcGraphics.fillStyle(0xededed);
    npcGraphics.fillEllipse(16, 14, 5, 6);
    
    // Eyes - piercing
    npcGraphics.fillStyle(0x000000);
    npcGraphics.fillCircle(14, 13, 1.5);
    npcGraphics.fillCircle(18, 13, 1.5);
    
    // Beard
    npcGraphics.fillStyle(0x000000);
    npcGraphics.beginPath();
    npcGraphics.moveTo(12, 18);
    npcGraphics.lineTo(14, 24);
    npcGraphics.lineTo(16, 22);
    npcGraphics.lineTo(18, 24);
    npcGraphics.lineTo(20, 18);
    npcGraphics.closePath();
    npcGraphics.fill();
    
    // Omophorion (white stole) - vertical stripe
    npcGraphics.fillStyle(0xededed);
    npcGraphics.fillRect(15, 18, 2, 12);
    
    // Small cross on chest
    npcGraphics.fillRect(14, 20, 4, 1);
    npcGraphics.fillRect(15, 19, 2, 3);
    
    npcGraphics.generateTexture('chrysostom', 32, 32);
    npcGraphics.destroy();

    // === GROUND TILE (16x16) - Worn stone pavement ===
    const groundGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Base - warm gray stone
    groundGraphics.fillStyle(0xc0b8a8);
    groundGraphics.fillRect(0, 0, 16, 16);
    // Mortar lines
    groundGraphics.lineStyle(1, 0x9a9080);
    groundGraphics.lineBetween(0, 8, 16, 8);
    groundGraphics.lineBetween(8, 0, 8, 16);
    // Wear marks
    groundGraphics.fillStyle(0xb0a898);
    groundGraphics.fillRect(2, 2, 4, 4);
    groundGraphics.fillRect(10, 10, 4, 4);
    groundGraphics.generateTexture('ground', 16, 16);
    groundGraphics.destroy();

    // === WALL TILE (16x16) - Ancient stone wall ===
    const wallGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Dark stone base
    wallGraphics.fillStyle(0x2a2520);
    wallGraphics.fillRect(0, 0, 16, 16);
    // Stone block pattern
    wallGraphics.lineStyle(1, 0x1a1510);
    wallGraphics.strokeRect(1, 1, 14, 7);
    wallGraphics.strokeRect(1, 9, 7, 6);
    wallGraphics.strokeRect(9, 9, 6, 6);
    // Highlights
    wallGraphics.fillStyle(0x3a3530);
    wallGraphics.fillRect(2, 2, 12, 1);
    wallGraphics.fillRect(2, 10, 5, 1);
    wallGraphics.fillRect(10, 10, 4, 1);
    wallGraphics.generateTexture('wall', 16, 16);
    wallGraphics.destroy();

    // === CHURCH TILE (16x16) - Sacred marble floor ===
    const churchGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // White marble base
    churchGraphics.fillStyle(0xf0ece4);
    churchGraphics.fillRect(0, 0, 16, 16);
    // Marble veins
    churchGraphics.lineStyle(1, 0xd8d4cc);
    churchGraphics.lineBetween(0, 4, 6, 8);
    churchGraphics.lineBetween(10, 0, 16, 6);
    churchGraphics.lineBetween(4, 12, 12, 16);
    // Cross inlay - black marble
    churchGraphics.fillStyle(0x1a1a1a);
    churchGraphics.fillRect(7, 3, 2, 10);
    churchGraphics.fillRect(4, 6, 8, 2);
    // Gold outline on cross
    churchGraphics.lineStyle(1, 0xd4af37);
    churchGraphics.strokeRect(7, 3, 2, 10);
    churchGraphics.strokeRect(4, 6, 8, 2);
    churchGraphics.generateTexture('church', 16, 16);
    churchGraphics.destroy();

    // === INTERACTION PROMPT (16x16) - Byzantine style ===
    const promptGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Gold circle
    promptGraphics.fillStyle(0xd4af37);
    promptGraphics.fillCircle(8, 8, 7);
    // Black inner circle
    promptGraphics.fillStyle(0x000000);
    promptGraphics.fillCircle(8, 8, 5);
    // White icon (hand pointing down = "interact")
    promptGraphics.fillStyle(0xededed);
    promptGraphics.fillRect(7, 4, 2, 6);
    promptGraphics.fillRect(5, 6, 6, 2);
    // Arrow pointing down
    promptGraphics.beginPath();
    promptGraphics.moveTo(8, 12);
    promptGraphics.lineTo(5, 9);
    promptGraphics.lineTo(11, 9);
    promptGraphics.closePath();
    promptGraphics.fill();
    promptGraphics.generateTexture('prompt', 16, 16);
    promptGraphics.destroy();
    
    // === DOOR TILE (16x16) - Wooden door ===
    const doorGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Dark wood
    doorGraphics.fillStyle(0x3a2820);
    doorGraphics.fillRect(0, 0, 16, 16);
    // Planks
    doorGraphics.lineStyle(1, 0x2a1810);
    doorGraphics.lineBetween(5, 0, 5, 16);
    doorGraphics.lineBetween(11, 0, 11, 16);
    // Iron bands
    doorGraphics.fillStyle(0x4a4a4a);
    doorGraphics.fillRect(0, 3, 16, 2);
    doorGraphics.fillRect(0, 11, 16, 2);
    // Handle
    doorGraphics.fillStyle(0x8a7a60);
    doorGraphics.fillCircle(13, 8, 2);
    doorGraphics.generateTexture('door', 16, 16);
    doorGraphics.destroy();
    
    // === WATER TILE (16x16) - Bosphorus/harbor ===
    const waterGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Dark blue-black water
    waterGraphics.fillStyle(0x1a2030);
    waterGraphics.fillRect(0, 0, 16, 16);
    // Wave highlights
    waterGraphics.lineStyle(1, 0x2a3040);
    waterGraphics.lineBetween(0, 4, 8, 6);
    waterGraphics.lineBetween(8, 6, 16, 4);
    waterGraphics.lineBetween(0, 12, 8, 10);
    waterGraphics.lineBetween(8, 10, 16, 12);
    // Reflection glints
    waterGraphics.fillStyle(0x3a4050);
    waterGraphics.fillRect(3, 5, 2, 1);
    waterGraphics.fillRect(11, 11, 2, 1);
    waterGraphics.generateTexture('water', 16, 16);
    waterGraphics.destroy();
  }

  create() {
    this.scene.start('ExplorationScene');
  }
}
