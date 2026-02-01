import Phaser from 'phaser';

export class ExplorationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ExplorationScene' });
  }

  create() {
    // Create a simple map (will be replaced with Tiled maps later)
    this.createMap();
    
    // Create player
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(2);
    
    // Create Chrysostom NPC near the church
    this.chrysostom = this.physics.add.sprite(500, 200, 'chrysostom');
    this.chrysostom.setScale(2);
    this.chrysostom.setImmovable(true);
    this.chrysostom.body.setSize(16, 16);
    
    // NPC data
    this.chrysostom.setData('name', 'John Chrysostom');
    this.chrysostom.setData('dialogue', 'chrysostom_intro');
    
    // Interaction prompt (hidden by default)
    this.interactionPrompt = this.add.sprite(0, 0, 'prompt');
    this.interactionPrompt.setScale(1.5);
    this.interactionPrompt.setVisible(false);
    
    // Set up collisions
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.chrysostom);
    
    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.interactKey.on('down', () => this.tryInteract());
    
    // Touch/click to move (for mobile)
    this.input.on('pointerdown', (pointer) => {
      this.targetX = pointer.worldX;
      this.targetY = pointer.worldY;
    });
    
    // Camera follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    
    // UI text
    this.add.text(16, 16, 'WASD/Arrows to move | SPACE to interact', {
      fontFamily: 'Georgia, serif',
      fontSize: '14px',
      color: '#888888'
    }).setScrollFactor(0);
    
    // Location text
    this.locationText = this.add.text(16, this.cameras.main.height - 30, 'Near Hagia Sophia', {
      fontFamily: 'Georgia, serif',
      fontSize: '16px',
      color: '#ededed'
    }).setScrollFactor(0);

    // Track nearby NPCs
    this.nearbyNPC = null;
  }

  createMap() {
    // Simple procedural map for now
    // In production, use Tiled and import JSON
    
    const mapWidth = 50;
    const mapHeight = 40;
    const tileSize = 16;
    
    this.walls = this.physics.add.staticGroup();
    
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const px = x * tileSize;
        const py = y * tileSize;
        
        // Border walls
        if (x === 0 || x === mapWidth - 1 || y === 0 || y === mapHeight - 1) {
          const wall = this.add.sprite(px, py, 'wall');
          this.walls.add(wall);
          continue;
        }
        
        // Church area (special tiles near Chrysostom's position)
        if (x >= 28 && x <= 35 && y >= 10 && y <= 15) {
          this.add.sprite(px, py, 'church');
          continue;
        }
        
        // Some random walls for structure
        if (this.shouldPlaceWall(x, y)) {
          const wall = this.add.sprite(px, py, 'wall');
          this.walls.add(wall);
          continue;
        }
        
        // Ground
        this.add.sprite(px, py, 'ground');
      }
    }
    
    // Set world bounds
    this.physics.world.setBounds(0, 0, mapWidth * tileSize, mapHeight * tileSize);
  }

  shouldPlaceWall(x, y) {
    // Simple deterministic "random" for consistent map
    const seed = x * 31 + y * 17;
    
    // Create some building outlines
    // Building 1
    if ((x === 5 || x === 12) && y >= 5 && y <= 12) return true;
    if ((y === 5 || y === 12) && x >= 5 && x <= 12) return true;
    
    // Building 2
    if ((x === 20 || x === 26) && y >= 20 && y <= 28) return true;
    if ((y === 20 || y === 28) && x >= 20 && x <= 26) return true;
    
    // Building 3 (near church)
    if ((x === 28 || x === 35) && y >= 8 && y <= 17) return true;
    if ((y === 8 || y === 17) && x >= 28 && x <= 35) return true;
    
    return false;
  }

  update() {
    const speed = 120;
    let vx = 0;
    let vy = 0;
    
    // Keyboard movement
    if (this.cursors.left.isDown || this.input.keyboard.addKey('A').isDown) {
      vx = -speed;
    } else if (this.cursors.right.isDown || this.input.keyboard.addKey('D').isDown) {
      vx = speed;
    }
    
    if (this.cursors.up.isDown || this.input.keyboard.addKey('W').isDown) {
      vy = -speed;
    } else if (this.cursors.down.isDown || this.input.keyboard.addKey('S').isDown) {
      vy = speed;
    }
    
    this.player.setVelocity(vx, vy);
    
    // Check proximity to NPCs
    this.checkNPCProximity();
  }

  checkNPCProximity() {
    const distance = Phaser.Math.Distance.Between(
      this.player.x, this.player.y,
      this.chrysostom.x, this.chrysostom.y
    );
    
    if (distance < 50) {
      this.nearbyNPC = this.chrysostom;
      this.interactionPrompt.setPosition(this.chrysostom.x, this.chrysostom.y - 40);
      this.interactionPrompt.setVisible(true);
    } else {
      this.nearbyNPC = null;
      this.interactionPrompt.setVisible(false);
    }
  }

  tryInteract() {
    if (this.nearbyNPC) {
      // Transition to dialogue scene
      this.scene.launch('DialogueScene', {
        npcName: this.nearbyNPC.getData('name'),
        dialogueKey: this.nearbyNPC.getData('dialogue'),
        returnScene: 'ExplorationScene'
      });
      this.scene.pause();
    }
  }
}
