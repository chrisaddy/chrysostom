/**
 * Portrait Renderer - Death to the World aesthetic
 * 
 * Stark black & white, iconographic, woodcut-inspired portraits.
 * Heavy shadows, piercing eyes, dramatic contrast.
 */

export class PortraitRenderer {
  constructor(scene, x, y, width = 280, height = 400) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = scene.add.graphics();
    
    // Color palette - stark, no grays (well, minimal)
    this.colors = {
      black: 0x000000,
      white: 0xededed,
      gold: 0xd4af37,      // For halos
      darkGray: 0x1a1a1a,  // Subtle shadow
      midGray: 0x333333,   // Minimal use
    };
  }

  clear() {
    this.graphics.clear();
  }

  /**
   * Draw Chrysostom - the Golden Mouth
   * Archbishop, ascetic, fierce preacher
   */
  drawChrysostom() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === HALO ===
    // Double ring halo - Orthodox iconographic style
    g.lineStyle(4, this.colors.gold);
    g.strokeCircle(cx, cy - 60, 100);
    g.lineStyle(2, this.colors.gold);
    g.strokeCircle(cx, cy - 60, 90);
    
    // Cross in halo (Christ-like blessing)
    g.lineStyle(3, this.colors.gold);
    g.lineBetween(cx, cy - 160, cx, cy + 40);
    g.lineBetween(cx - 100, cy - 60, cx + 100, cy - 60);
    
    // === HOOD/KLOBUK (monastic hood) ===
    g.fillStyle(this.colors.black);
    // Main hood shape
    g.beginPath();
    g.moveTo(cx - 70, cy - 20);
    g.lineTo(cx - 85, cy + 200);
    g.lineTo(cx + 85, cy + 200);
    g.lineTo(cx + 70, cy - 20);
    g.lineTo(cx + 50, cy - 100);
    g.lineTo(cx, cy - 130);
    g.lineTo(cx - 50, cy - 100);
    g.closePath();
    g.fill();
    
    // === FACE ===
    // Gaunt, ascetic face - stark white against black
    g.fillStyle(this.colors.white);
    // Face shape - angular, thin
    g.beginPath();
    g.moveTo(cx - 35, cy - 80);
    g.lineTo(cx - 45, cy - 20);
    g.lineTo(cx - 40, cy + 30);
    g.lineTo(cx - 25, cy + 60);
    g.lineTo(cx, cy + 75);  // Chin
    g.lineTo(cx + 25, cy + 60);
    g.lineTo(cx + 40, cy + 30);
    g.lineTo(cx + 45, cy - 20);
    g.lineTo(cx + 35, cy - 80);
    g.closePath();
    g.fill();
    
    // === EYES - Piercing, seeing through you ===
    // Eye sockets (shadow)
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx - 18, cy - 35, 18, 12);
    g.fillEllipse(cx + 18, cy - 35, 18, 12);
    
    // Eyeballs
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 18, cy - 35, 12, 8);
    g.fillEllipse(cx + 18, cy - 35, 12, 8);
    
    // Pupils - looking directly at viewer
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 18, cy - 35, 5);
    g.fillCircle(cx + 18, cy - 35, 5);
    
    // Catch light
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 16, cy - 37, 2);
    g.fillCircle(cx + 20, cy - 37, 2);
    
    // === BROW - Heavy, intense ===
    g.fillStyle(this.colors.black);
    g.lineStyle(3, this.colors.black);
    g.lineBetween(cx - 35, cy - 50, cx - 5, cy - 45);
    g.lineBetween(cx + 5, cy - 45, cx + 35, cy - 50);
    
    // === NOSE - Long, ascetic ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 30, cx - 3, cy + 10);
    g.lineBetween(cx - 3, cy + 10, cx - 10, cy + 15);
    g.lineBetween(cx - 3, cy + 10, cx + 5, cy + 15);
    
    // === MOUTH - Thin, the "Golden Mouth" ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx - 15, cy + 35, cx + 15, cy + 35);
    // Slight downturn - gravitas
    g.lineBetween(cx - 15, cy + 35, cx - 18, cy + 38);
    g.lineBetween(cx + 15, cy + 35, cx + 18, cy + 38);
    
    // === BEARD - Forked, monastic ===
    g.fillStyle(this.colors.black);
    // Left fork
    g.beginPath();
    g.moveTo(cx - 25, cy + 55);
    g.lineTo(cx - 35, cy + 130);
    g.lineTo(cx - 10, cy + 100);
    g.lineTo(cx, cy + 75);
    g.closePath();
    g.fill();
    // Right fork
    g.beginPath();
    g.moveTo(cx + 25, cy + 55);
    g.lineTo(cx + 35, cy + 130);
    g.lineTo(cx + 10, cy + 100);
    g.lineTo(cx, cy + 75);
    g.closePath();
    g.fill();
    
    // === SHOULDERS/VESTMENTS ===
    g.fillStyle(this.colors.black);
    g.fillRect(cx - 85, cy + 130, 170, 100);
    
    // Omophorion (bishop's stole) - white Y shape
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 8, cy + 80, 16, 150);
    
    // Cross pattern on omophorion
    g.fillStyle(this.colors.black);
    for (let i = 0; i < 4; i++) {
      const crossY = cy + 100 + i * 35;
      g.fillRect(cx - 4, crossY, 8, 12);
      g.fillRect(cx - 8, crossY + 3, 16, 5);
    }
    
    // Pectoral cross
    g.fillStyle(this.colors.gold);
    g.fillRect(cx - 3, cy + 140, 6, 25);
    g.fillRect(cx - 10, cy + 150, 20, 6);
  }

  /**
   * Draw the Player - a thief from Antioch
   * Young, hungry, wary
   */
  drawPlayer() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === HOOD/CLOAK - Pulled low ===
    g.fillStyle(this.colors.black);
    g.beginPath();
    g.moveTo(cx - 80, cy - 30);
    g.lineTo(cx - 90, cy + 200);
    g.lineTo(cx + 90, cy + 200);
    g.lineTo(cx + 80, cy - 30);
    g.lineTo(cx + 40, cy - 90);
    g.lineTo(cx, cy - 100);
    g.lineTo(cx - 40, cy - 90);
    g.closePath();
    g.fill();
    
    // === FACE - Partially shadowed by hood ===
    g.fillStyle(this.colors.white);
    // Lower face visible
    g.beginPath();
    g.moveTo(cx - 35, cy - 40);
    g.lineTo(cx - 40, cy + 20);
    g.lineTo(cx - 30, cy + 50);
    g.lineTo(cx, cy + 65);
    g.lineTo(cx + 30, cy + 50);
    g.lineTo(cx + 40, cy + 20);
    g.lineTo(cx + 35, cy - 40);
    g.closePath();
    g.fill();
    
    // Shadow from hood across upper face
    g.fillStyle(this.colors.black);
    g.beginPath();
    g.moveTo(cx - 40, cy - 70);
    g.lineTo(cx - 35, cy - 30);
    g.lineTo(cx + 35, cy - 30);
    g.lineTo(cx + 40, cy - 70);
    g.closePath();
    g.fill();
    
    // === EYES - Wary, watchful, in shadow ===
    // Just the glint
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 15, cy - 45, 4);
    g.fillCircle(cx + 15, cy - 45, 4);
    // Pupils
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 15, cy - 45, 2);
    g.fillCircle(cx + 15, cy - 45, 2);
    
    // === NOSE/MOUTH - Young, but hardened ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 20, cx, cy + 5);
    g.lineBetween(cx - 12, cy + 25, cx + 12, cy + 25);
    
    // === STUBBLE suggestion ===
    g.fillStyle(this.colors.midGray);
    for (let i = 0; i < 8; i++) {
      const sx = cx - 20 + Math.sin(i * 1.3) * 25;
      const sy = cy + 35 + Math.cos(i * 0.9) * 15;
      g.fillCircle(sx, sy, 1);
    }
    
    // === CLOAK CLASP ===
    g.fillStyle(this.colors.midGray);
    g.fillCircle(cx, cy + 100, 8);
    g.fillStyle(this.colors.black);
    g.fillCircle(cx, cy + 100, 4);
  }

  /**
   * Draw Widow Maria - grief, dignity, hope
   */
  drawWidow() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === HEAD COVERING - Maphorion ===
    g.fillStyle(this.colors.black);
    g.beginPath();
    g.moveTo(cx - 70, cy - 80);
    g.lineTo(cx - 85, cy + 200);
    g.lineTo(cx + 85, cy + 200);
    g.lineTo(cx + 70, cy - 80);
    g.quadraticCurveTo(cx, cy - 120, cx - 70, cy - 80);
    g.closePath();
    g.fill();
    
    // === FACE - Careworn but dignified ===
    g.fillStyle(this.colors.white);
    g.beginPath();
    g.moveTo(cx - 30, cy - 60);
    g.lineTo(cx - 35, cy);
    g.lineTo(cx - 25, cy + 40);
    g.lineTo(cx, cy + 55);
    g.lineTo(cx + 25, cy + 40);
    g.lineTo(cx + 35, cy);
    g.lineTo(cx + 30, cy - 60);
    g.closePath();
    g.fill();
    
    // === EYES - Tired but not defeated ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx - 12, cy - 25, 10, 7);
    g.fillEllipse(cx + 12, cy - 25, 10, 7);
    // Lines under eyes (weariness)
    g.lineStyle(1, this.colors.black);
    g.lineBetween(cx - 20, cy - 15, cx - 5, cy - 18);
    g.lineBetween(cx + 5, cy - 18, cx + 20, cy - 15);
    
    // Eyeballs
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 12, cy - 25, 6, 5);
    g.fillEllipse(cx + 12, cy - 25, 6, 5);
    
    // Pupils - looking down slightly (humility/sorrow)
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 12, cy - 23, 3);
    g.fillCircle(cx + 12, cy - 23, 3);
    
    // === NOSE/MOUTH ===
    g.lineStyle(1, this.colors.black);
    g.lineBetween(cx, cy - 15, cx - 2, cy + 5);
    // Mouth - slight, dignified
    g.lineBetween(cx - 10, cy + 25, cx + 10, cy + 25);
    
    // === HANDS - Clasped in prayer/supplication ===
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 20, cy + 120, 40, 50);
    // Finger lines
    g.lineStyle(1, this.colors.black);
    g.lineBetween(cx - 10, cy + 125, cx - 10, cy + 160);
    g.lineBetween(cx, cy + 125, cx, cy + 160);
    g.lineBetween(cx + 10, cy + 125, cx + 10, cy + 160);
  }

  /**
   * Draw Deacon Stephanos - young, earnest, helpful
   */
  drawDeacon() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === HAIR - Short, neat ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx, cy - 70, 50, 40);
    
    // === FACE - Young, open ===
    g.fillStyle(this.colors.white);
    g.beginPath();
    g.moveTo(cx - 35, cy - 60);
    g.lineTo(cx - 40, cy);
    g.lineTo(cx - 30, cy + 45);
    g.lineTo(cx, cy + 60);
    g.lineTo(cx + 30, cy + 45);
    g.lineTo(cx + 40, cy);
    g.lineTo(cx + 35, cy - 60);
    g.closePath();
    g.fill();
    
    // === EYES - Bright, eager ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx - 15, cy - 25, 12, 10);
    g.fillEllipse(cx + 15, cy - 25, 12, 10);
    
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 15, cy - 25, 8, 7);
    g.fillEllipse(cx + 15, cy - 25, 8, 7);
    
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 15, cy - 25, 4);
    g.fillCircle(cx + 15, cy - 25, 4);
    
    // Catch light - bigger for youthful energy
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 13, cy - 27, 2);
    g.fillCircle(cx + 17, cy - 27, 2);
    
    // === NOSE/MOUTH ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 15, cx, cy + 5);
    // Slight smile
    g.beginPath();
    g.arc(cx, cy + 30, 12, 0.2, Math.PI - 0.2, false);
    g.stroke();
    
    // === VESTMENTS - Deacon's sticharion ===
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 60, cy + 70, 120, 160);
    
    // Orarion (deacon's stole) - diagonal
    g.fillStyle(this.colors.black);
    g.lineStyle(0);
    g.beginPath();
    g.moveTo(cx - 50, cy + 70);
    g.lineTo(cx - 40, cy + 70);
    g.lineTo(cx + 50, cy + 200);
    g.lineTo(cx + 40, cy + 200);
    g.closePath();
    g.fill();
    
    // Cross on orarion
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 3, cy + 120, 6, 15);
    g.fillRect(cx - 7, cy + 125, 14, 5);
  }

  /**
   * Draw Merchant Kyriakos - wealthy, calculating
   */
  drawMerchant() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === HAT - Wealthy merchant's cap ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx, cy - 90, 55, 25);
    g.fillRect(cx - 45, cy - 90, 90, 30);
    
    // === FACE - Well-fed, shrewd ===
    g.fillStyle(this.colors.white);
    g.beginPath();
    g.moveTo(cx - 40, cy - 60);
    g.lineTo(cx - 50, cy);
    g.lineTo(cx - 45, cy + 50);
    g.lineTo(cx, cy + 65);
    g.lineTo(cx + 45, cy + 50);
    g.lineTo(cx + 50, cy);
    g.lineTo(cx + 40, cy - 60);
    g.closePath();
    g.fill();
    
    // Double chin
    g.lineStyle(1, this.colors.black);
    g.beginPath();
    g.arc(cx, cy + 55, 25, 0.3, Math.PI - 0.3, false);
    g.stroke();
    
    // === EYES - Calculating, narrow ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx - 15, cy - 20, 14, 8);
    g.fillEllipse(cx + 15, cy - 20, 14, 8);
    
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 15, cy - 20, 8, 5);
    g.fillEllipse(cx + 15, cy - 20, 8, 5);
    
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 15, cy - 20, 3);
    g.fillCircle(cx + 15, cy - 20, 3);
    
    // === NOSE - Prominent ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 10, cx + 5, cy + 10);
    g.lineBetween(cx + 5, cy + 10, cx - 5, cy + 15);
    
    // === MOUTH - Thin, tight ===
    g.lineBetween(cx - 12, cy + 35, cx + 12, cy + 35);
    
    // === BEARD - Trimmed, neat ===
    g.fillStyle(this.colors.black);
    g.beginPath();
    g.moveTo(cx - 35, cy + 45);
    g.lineTo(cx - 25, cy + 90);
    g.lineTo(cx, cy + 100);
    g.lineTo(cx + 25, cy + 90);
    g.lineTo(cx + 35, cy + 45);
    g.closePath();
    g.fill();
    
    // === CLOTHING - Rich robes ===
    g.fillStyle(this.colors.black);
    g.fillRect(cx - 70, cy + 100, 140, 130);
    
    // Gold trim
    g.fillStyle(this.colors.gold);
    g.fillRect(cx - 70, cy + 100, 140, 8);
    g.fillRect(cx - 35, cy + 100, 8, 130);
    g.fillRect(cx + 27, cy + 100, 8, 130);
    
    // Rings on hands
    g.fillStyle(this.colors.gold);
    g.fillCircle(cx - 55, cy + 180, 5);
    g.fillCircle(cx + 55, cy + 180, 5);
  }

  /**
   * Draw based on character key
   */
  draw(characterKey) {
    const key = characterKey?.toLowerCase() || 'unknown';
    
    switch (key) {
      case 'chrysostom':
      case 'john chrysostom':
        this.drawChrysostom();
        break;
      case 'player':
      case 'you':
        this.drawPlayer();
        break;
      case 'widow':
      case 'maria':
        this.drawWidow();
        break;
      case 'deacon':
      case 'stephanos':
        this.drawDeacon();
        break;
      case 'merchant':
      case 'kyriakos':
        this.drawMerchant();
        break;
      default:
        this.drawPlayer(); // Default to player silhouette
    }
  }

  setAlpha(alpha) {
    this.graphics.setAlpha(alpha);
  }

  destroy() {
    this.graphics.destroy();
  }
}
