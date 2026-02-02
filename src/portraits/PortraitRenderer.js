/**
 * Portrait Renderer - Byzantine Mosaic aesthetic
 * 
 * Inspired by Byzantine iconography and "Death to the World" zine art.
 * Stippled/tessellated texture, dithered shading, diagonal backgrounds.
 */

export class PortraitRenderer {
  constructor(scene, x, y, width = 280, height = 400) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = scene.add.graphics();
    
    // Color palette - monochromatic with gold accent
    this.colors = {
      black: 0x000000,
      darkGray: 0x1a1a1a,
      midGray: 0x333333,
      lightGray: 0x666666,
      paleGray: 0xaaaaaa,
      white: 0xededed,
      gold: 0xd4af37,
    };
  }

  clear() {
    this.graphics.clear();
  }

  /**
   * Draw diagonal striped background - Byzantine mosaic style
   */
  drawDiagonalBackground(x, y, width, height, color1 = 0x1a1a1a, color2 = 0x0d0d0d, spacing = 8) {
    const g = this.graphics;
    
    // Base fill
    g.fillStyle(color2);
    g.fillRect(x - width/2, y - height/2, width, height);
    
    // Diagonal lines
    g.lineStyle(2, color1);
    for (let i = -height; i < width + height; i += spacing) {
      g.lineBetween(
        x - width/2 + i, 
        y - height/2,
        x - width/2 + i - height, 
        y + height/2
      );
    }
  }

  /**
   * Draw stippled/dithered fill - mosaic tile effect
   */
  drawStipple(x, y, width, height, density = 0.15, color = 0x333333) {
    const g = this.graphics;
    const dotSize = 2;
    
    for (let dx = 0; dx < width; dx += 4) {
      for (let dy = 0; dy < height; dy += 4) {
        if (Math.random() < density) {
          g.fillStyle(color);
          g.fillRect(x + dx, y + dy, dotSize, dotSize);
        }
      }
    }
  }

  /**
   * Draw dithered shading - checkerboard pattern
   */
  drawDither(x, y, width, height, color1, color2, pattern = 'checker') {
    const g = this.graphics;
    const size = 2;
    
    for (let dx = 0; dx < width; dx += size) {
      for (let dy = 0; dy < height; dy += size) {
        const useColor1 = pattern === 'checker' 
          ? ((dx + dy) / size) % 2 === 0
          : Math.random() < 0.5;
        g.fillStyle(useColor1 ? color1 : color2);
        g.fillRect(x + dx, y + dy, size, size);
      }
    }
  }

  /**
   * Draw mosaic-style face texture
   */
  drawFaceTexture(cx, cy, points) {
    const g = this.graphics;
    
    // Base face fill
    g.fillStyle(this.colors.white);
    g.beginPath();
    g.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      g.lineTo(points[i].x, points[i].y);
    }
    g.closePath();
    g.fill();
    
    // Add stippled shading for depth
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    
    // Light stipple across face
    for (let x = minX; x < maxX; x += 5) {
      for (let y = minY; y < maxY; y += 5) {
        if (this.pointInPolygon(x, y, points) && Math.random() < 0.08) {
          g.fillStyle(this.colors.paleGray);
          g.fillRect(x, y, 2, 2);
        }
      }
    }
    
    // Heavier stipple on edges/shadows
    for (let x = minX; x < minX + 15; x += 4) {
      for (let y = minY; y < maxY; y += 4) {
        if (this.pointInPolygon(x, y, points) && Math.random() < 0.3) {
          g.fillStyle(this.colors.lightGray);
          g.fillRect(x, y, 2, 2);
        }
      }
    }
  }

  /**
   * Point in polygon test (ray casting)
   */
  pointInPolygon(x, y, points) {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x, yi = points[i].y;
      const xj = points[j].x, yj = points[j].y;
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }

  /**
   * Draw curly/stylized hair marks - Byzantine mosaic style
   */
  drawCurlyMarks(cx, cy, radius, count = 20, color = 0x000000) {
    const g = this.graphics;
    g.lineStyle(2, color);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius * (0.7 + Math.random() * 0.3);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      
      // Small curved marks
      g.beginPath();
      g.arc(x, y, 3 + Math.random() * 4, angle, angle + 1.5);
      g.stroke();
    }
  }

  /**
   * Draw beard with repeated curved marks
   */
  drawStylizedBeard(cx, startY, width, length, color = 0x000000) {
    const g = this.graphics;
    g.lineStyle(2, color);
    
    // Rows of curved marks descending
    for (let row = 0; row < length; row += 8) {
      const rowWidth = width * (1 - row / (length * 1.5));
      for (let col = -rowWidth/2; col < rowWidth/2; col += 10) {
        const x = cx + col + (Math.random() - 0.5) * 4;
        const y = startY + row + (Math.random() - 0.5) * 2;
        
        // Curved beard stroke
        g.beginPath();
        g.moveTo(x, y);
        g.quadraticCurveTo(x + 3, y + 6, x, y + 10);
        g.stroke();
      }
    }
  }

  /**
   * Draw geometric vestment patterns
   */
  drawVestmentPattern(x, y, width, height, patternType = 'cross') {
    const g = this.graphics;
    const spacing = 20;
    
    for (let dx = 0; dx < width; dx += spacing) {
      for (let dy = 0; dy < height; dy += spacing) {
        const px = x + dx;
        const py = y + dy;
        
        if (patternType === 'cross') {
          g.fillStyle(this.colors.black);
          g.fillRect(px + 7, py + 3, 6, 14);
          g.fillRect(px + 3, py + 7, 14, 6);
        } else if (patternType === 'diamond') {
          g.fillStyle(this.colors.black);
          g.beginPath();
          g.moveTo(px + 10, py);
          g.lineTo(px + 20, py + 10);
          g.lineTo(px + 10, py + 20);
          g.lineTo(px, py + 10);
          g.closePath();
          g.fill();
        }
      }
    }
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
    
    // === DIAGONAL BACKGROUND ===
    this.drawDiagonalBackground(cx, cy, this.width + 100, this.height + 100);
    
    // === HALO ===
    // Double ring halo with cross - Orthodox iconographic style
    g.lineStyle(5, this.colors.gold);
    g.strokeCircle(cx, cy - 60, 105);
    g.lineStyle(3, this.colors.gold);
    g.strokeCircle(cx, cy - 60, 95);
    
    // Cross in halo
    g.lineStyle(4, this.colors.gold);
    g.lineBetween(cx, cy - 165, cx, cy + 45);
    g.lineBetween(cx - 105, cy - 60, cx + 105, cy - 60);
    
    // === HOOD/KLOBUK (monastic hood) ===
    // Dark fill with edge
    g.fillStyle(this.colors.black);
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
    
    // Stippled edge highlight
    g.lineStyle(2, this.colors.midGray);
    g.beginPath();
    g.moveTo(cx - 70, cy - 20);
    g.lineTo(cx - 50, cy - 100);
    g.lineTo(cx, cy - 130);
    g.lineTo(cx + 50, cy - 100);
    g.lineTo(cx + 70, cy - 20);
    g.stroke();
    
    // === FACE with mosaic texture ===
    const facePoints = [
      { x: cx - 35, y: cy - 80 },
      { x: cx - 48, y: cy - 20 },
      { x: cx - 42, y: cy + 30 },
      { x: cx - 25, y: cy + 55 },
      { x: cx, y: cy + 70 },
      { x: cx + 25, y: cy + 55 },
      { x: cx + 42, y: cy + 30 },
      { x: cx + 48, y: cy - 20 },
      { x: cx + 35, y: cy - 80 },
    ];
    this.drawFaceTexture(cx, cy, facePoints);
    
    // Face outline
    g.lineStyle(2, this.colors.black);
    g.beginPath();
    g.moveTo(facePoints[0].x, facePoints[0].y);
    for (let i = 1; i < facePoints.length; i++) {
      g.lineTo(facePoints[i].x, facePoints[i].y);
    }
    g.closePath();
    g.stroke();
    
    // === EYES - Byzantine style, large, piercing ===
    // Eye sockets
    g.fillStyle(this.colors.midGray);
    g.fillEllipse(cx - 18, cy - 35, 20, 13);
    g.fillEllipse(cx + 18, cy - 35, 20, 13);
    
    // Eyeballs
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 18, cy - 35, 14, 10);
    g.fillEllipse(cx + 18, cy - 35, 14, 10);
    
    // Pupils - large, iconic
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 18, cy - 35, 6);
    g.fillCircle(cx + 18, cy - 35, 6);
    
    // Catch light
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 15, cy - 37, 2);
    g.fillCircle(cx + 21, cy - 37, 2);
    
    // Eye outlines
    g.lineStyle(2, this.colors.black);
    g.strokeEllipse(cx - 18, cy - 35, 14, 10);
    g.strokeEllipse(cx + 18, cy - 35, 14, 10);
    
    // === BROW - Heavy, intense ===
    g.lineStyle(3, this.colors.black);
    g.lineBetween(cx - 38, cy - 52, cx - 5, cy - 46);
    g.lineBetween(cx + 5, cy - 46, cx + 38, cy - 52);
    
    // === NOSE - Long, ascetic ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 30, cx - 2, cy + 10);
    g.lineBetween(cx - 2, cy + 10, cx - 12, cy + 15);
    g.lineBetween(cx - 2, cy + 10, cx + 8, cy + 15);
    // Nostril dots
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 8, cy + 18, 2);
    g.fillCircle(cx + 4, cy + 18, 2);
    
    // === MOUTH - Thin, the "Golden Mouth" ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx - 15, cy + 38, cx + 15, cy + 38);
    g.lineBetween(cx - 15, cy + 38, cx - 18, cy + 42);
    g.lineBetween(cx + 15, cy + 38, cx + 18, cy + 42);
    
    // === HAIR/BEARD - Stylized curved marks ===
    // Hair peeking from hood
    this.drawCurlyMarks(cx, cy - 75, 25, 12, this.colors.black);
    
    // Beard - Byzantine style with curved strokes
    this.drawStylizedBeard(cx, cy + 55, 50, 70, this.colors.black);
    
    // Beard fill base
    g.fillStyle(this.colors.black);
    g.beginPath();
    g.moveTo(cx - 25, cy + 55);
    g.quadraticCurveTo(cx - 35, cy + 90, cx - 20, cy + 120);
    g.lineTo(cx, cy + 130);
    g.lineTo(cx + 20, cy + 120);
    g.quadraticCurveTo(cx + 35, cy + 90, cx + 25, cy + 55);
    g.closePath();
    g.fill();
    
    // === VESTMENTS ===
    // Shoulders - black robe
    g.fillStyle(this.colors.black);
    g.fillRect(cx - 85, cy + 130, 170, 100);
    
    // Omophorion (bishop's stole) - white with cross pattern
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 12, cy + 75, 24, 155);
    
    // Cross pattern on omophorion - Byzantine geometric
    this.drawVestmentPattern(cx - 12, cy + 75, 24, 155, 'cross');
    
    // Pectoral cross - larger, more prominent
    g.fillStyle(this.colors.gold);
    g.fillRect(cx - 5, cy + 135, 10, 35);
    g.fillRect(cx - 15, cy + 148, 30, 10);
    
    // Cross detail
    g.lineStyle(1, this.colors.black);
    g.strokeRect(cx - 5, cy + 135, 10, 35);
    g.strokeRect(cx - 15, cy + 148, 30, 10);
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
    
    // === DIAGONAL BACKGROUND ===
    this.drawDiagonalBackground(cx, cy, this.width + 100, this.height + 100);
    
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
    
    // Hood edge highlight
    g.lineStyle(2, this.colors.midGray);
    g.beginPath();
    g.moveTo(cx - 40, cy - 90);
    g.lineTo(cx, cy - 100);
    g.lineTo(cx + 40, cy - 90);
    g.stroke();
    
    // === FACE with mosaic texture ===
    const facePoints = [
      { x: cx - 35, y: cy - 40 },
      { x: cx - 40, y: cy + 20 },
      { x: cx - 30, y: cy + 50 },
      { x: cx, y: cy + 65 },
      { x: cx + 30, y: cy + 50 },
      { x: cx + 40, y: cy + 20 },
      { x: cx + 35, y: cy - 40 },
    ];
    this.drawFaceTexture(cx, cy, facePoints);
    
    // Face outline
    g.lineStyle(2, this.colors.black);
    g.beginPath();
    g.moveTo(facePoints[0].x, facePoints[0].y);
    for (let i = 1; i < facePoints.length; i++) {
      g.lineTo(facePoints[i].x, facePoints[i].y);
    }
    g.closePath();
    g.stroke();
    
    // Shadow from hood across upper face - dithered
    this.drawDither(cx - 35, cy - 70, 70, 35, this.colors.black, this.colors.midGray, 'random');
    
    // === EYES - Wary, watchful, in shadow ===
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 15, cy - 50, 5);
    g.fillCircle(cx + 15, cy - 50, 5);
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 15, cy - 50, 3);
    g.fillCircle(cx + 15, cy - 50, 3);
    // Catch light
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 13, cy - 52, 1);
    g.fillCircle(cx + 17, cy - 52, 1);
    
    // === NOSE/MOUTH ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 20, cx, cy + 5);
    g.lineBetween(cx - 12, cy + 25, cx + 12, cy + 25);
    
    // === STUBBLE - stippled ===
    g.fillStyle(this.colors.midGray);
    for (let i = 0; i < 15; i++) {
      const sx = cx - 25 + Math.random() * 50;
      const sy = cy + 30 + Math.random() * 25;
      g.fillRect(sx, sy, 2, 2);
    }
    
    // === CLOAK CLASP ===
    g.fillStyle(this.colors.midGray);
    g.fillCircle(cx, cy + 100, 10);
    g.fillStyle(this.colors.black);
    g.fillCircle(cx, cy + 100, 5);
    g.lineStyle(1, this.colors.lightGray);
    g.strokeCircle(cx, cy + 100, 10);
  }

  /**
   * Draw Widow Maria - grief, dignity, hope
   */
  drawWidow() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === DIAGONAL BACKGROUND ===
    this.drawDiagonalBackground(cx, cy, this.width + 100, this.height + 100);
    
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
    
    // Edge highlight
    g.lineStyle(2, this.colors.midGray);
    g.beginPath();
    g.moveTo(cx - 70, cy - 80);
    g.quadraticCurveTo(cx, cy - 120, cx + 70, cy - 80);
    g.stroke();
    
    // === FACE with mosaic texture ===
    const facePoints = [
      { x: cx - 30, y: cy - 60 },
      { x: cx - 35, y: cy },
      { x: cx - 25, y: cy + 40 },
      { x: cx, y: cy + 55 },
      { x: cx + 25, y: cy + 40 },
      { x: cx + 35, y: cy },
      { x: cx + 30, y: cy - 60 },
    ];
    this.drawFaceTexture(cx, cy, facePoints);
    
    // Face outline
    g.lineStyle(2, this.colors.black);
    g.beginPath();
    g.moveTo(facePoints[0].x, facePoints[0].y);
    for (let i = 1; i < facePoints.length; i++) {
      g.lineTo(facePoints[i].x, facePoints[i].y);
    }
    g.closePath();
    g.stroke();
    
    // === EYES - Tired but not defeated ===
    g.fillStyle(this.colors.midGray);
    g.fillEllipse(cx - 12, cy - 25, 12, 8);
    g.fillEllipse(cx + 12, cy - 25, 12, 8);
    
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 12, cy - 25, 8, 6);
    g.fillEllipse(cx + 12, cy - 25, 8, 6);
    
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 12, cy - 23, 3);
    g.fillCircle(cx + 12, cy - 23, 3);
    
    // Lines under eyes (weariness)
    g.lineStyle(1, this.colors.midGray);
    g.lineBetween(cx - 20, cy - 15, cx - 5, cy - 18);
    g.lineBetween(cx + 5, cy - 18, cx + 20, cy - 15);
    
    // === NOSE/MOUTH ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 15, cx - 2, cy + 5);
    g.lineBetween(cx - 10, cy + 25, cx + 10, cy + 25);
    
    // === HANDS - Clasped in prayer ===
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 20, cy + 120, 40, 50);
    
    // Stipple on hands
    for (let i = 0; i < 8; i++) {
      g.fillStyle(this.colors.paleGray);
      g.fillRect(cx - 15 + Math.random() * 30, cy + 125 + Math.random() * 40, 2, 2);
    }
    
    // Finger lines
    g.lineStyle(1, this.colors.black);
    g.lineBetween(cx - 10, cy + 125, cx - 10, cy + 165);
    g.lineBetween(cx, cy + 125, cx, cy + 165);
    g.lineBetween(cx + 10, cy + 125, cx + 10, cy + 165);
  }

  /**
   * Draw Deacon Stephanos - young, earnest, helpful
   */
  drawDeacon() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === DIAGONAL BACKGROUND ===
    this.drawDiagonalBackground(cx, cy, this.width + 100, this.height + 100);
    
    // === HAIR - Short, neat with curly marks ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx, cy - 70, 50, 40);
    this.drawCurlyMarks(cx, cy - 70, 35, 15, this.colors.midGray);
    
    // === FACE with mosaic texture ===
    const facePoints = [
      { x: cx - 35, y: cy - 60 },
      { x: cx - 40, y: cy },
      { x: cx - 30, y: cy + 45 },
      { x: cx, y: cy + 60 },
      { x: cx + 30, y: cy + 45 },
      { x: cx + 40, y: cy },
      { x: cx + 35, y: cy - 60 },
    ];
    this.drawFaceTexture(cx, cy, facePoints);
    
    // Face outline
    g.lineStyle(2, this.colors.black);
    g.beginPath();
    g.moveTo(facePoints[0].x, facePoints[0].y);
    for (let i = 1; i < facePoints.length; i++) {
      g.lineTo(facePoints[i].x, facePoints[i].y);
    }
    g.closePath();
    g.stroke();
    
    // === EYES - Bright, eager ===
    g.fillStyle(this.colors.midGray);
    g.fillEllipse(cx - 15, cy - 25, 14, 11);
    g.fillEllipse(cx + 15, cy - 25, 14, 11);
    
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 15, cy - 25, 10, 8);
    g.fillEllipse(cx + 15, cy - 25, 10, 8);
    
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 15, cy - 25, 5);
    g.fillCircle(cx + 15, cy - 25, 5);
    
    // Larger catch lights for youth
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 12, cy - 27, 3);
    g.fillCircle(cx + 18, cy - 27, 3);
    
    // Eye outlines
    g.lineStyle(1, this.colors.black);
    g.strokeEllipse(cx - 15, cy - 25, 10, 8);
    g.strokeEllipse(cx + 15, cy - 25, 10, 8);
    
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
    
    // Stipple texture on vestments
    for (let i = 0; i < 30; i++) {
      g.fillStyle(this.colors.paleGray);
      g.fillRect(cx - 55 + Math.random() * 110, cy + 75 + Math.random() * 150, 2, 2);
    }
    
    // Orarion (deacon's stole) - diagonal
    g.fillStyle(this.colors.black);
    g.lineStyle(0);
    g.beginPath();
    g.moveTo(cx - 50, cy + 70);
    g.lineTo(cx - 38, cy + 70);
    g.lineTo(cx + 52, cy + 230);
    g.lineTo(cx + 40, cy + 230);
    g.closePath();
    g.fill();
    
    // Cross on orarion
    g.fillStyle(this.colors.white);
    g.fillRect(cx - 3, cy + 120, 8, 18);
    g.fillRect(cx - 8, cy + 126, 18, 6);
  }

  /**
   * Draw Merchant Kyriakos - wealthy, calculating
   */
  drawMerchant() {
    this.clear();
    const cx = this.x;
    const cy = this.y;
    const g = this.graphics;
    
    // === DIAGONAL BACKGROUND ===
    this.drawDiagonalBackground(cx, cy, this.width + 100, this.height + 100);
    
    // === HAT - Wealthy merchant's cap ===
    g.fillStyle(this.colors.black);
    g.fillEllipse(cx, cy - 90, 55, 25);
    g.fillRect(cx - 45, cy - 90, 90, 30);
    g.lineStyle(2, this.colors.midGray);
    g.strokeEllipse(cx, cy - 90, 55, 25);
    
    // === FACE with mosaic texture ===
    const facePoints = [
      { x: cx - 40, y: cy - 60 },
      { x: cx - 50, y: cy },
      { x: cx - 45, y: cy + 50 },
      { x: cx, y: cy + 65 },
      { x: cx + 45, y: cy + 50 },
      { x: cx + 50, y: cy },
      { x: cx + 40, y: cy - 60 },
    ];
    this.drawFaceTexture(cx, cy, facePoints);
    
    // Face outline
    g.lineStyle(2, this.colors.black);
    g.beginPath();
    g.moveTo(facePoints[0].x, facePoints[0].y);
    for (let i = 1; i < facePoints.length; i++) {
      g.lineTo(facePoints[i].x, facePoints[i].y);
    }
    g.closePath();
    g.stroke();
    
    // Double chin
    g.lineStyle(1, this.colors.midGray);
    g.beginPath();
    g.arc(cx, cy + 55, 25, 0.3, Math.PI - 0.3, false);
    g.stroke();
    
    // === EYES - Calculating, narrow ===
    g.fillStyle(this.colors.midGray);
    g.fillEllipse(cx - 15, cy - 20, 16, 9);
    g.fillEllipse(cx + 15, cy - 20, 16, 9);
    
    g.fillStyle(this.colors.white);
    g.fillEllipse(cx - 15, cy - 20, 10, 6);
    g.fillEllipse(cx + 15, cy - 20, 10, 6);
    
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 15, cy - 20, 3);
    g.fillCircle(cx + 15, cy - 20, 3);
    
    // Smaller catch lights
    g.fillStyle(this.colors.white);
    g.fillCircle(cx - 13, cy - 22, 1);
    g.fillCircle(cx + 17, cy - 22, 1);
    
    // === NOSE - Prominent ===
    g.lineStyle(2, this.colors.black);
    g.lineBetween(cx, cy - 10, cx + 5, cy + 10);
    g.lineBetween(cx + 5, cy + 10, cx - 5, cy + 15);
    
    // === MOUTH - Thin, tight ===
    g.lineBetween(cx - 12, cy + 35, cx + 12, cy + 35);
    
    // === BEARD - Trimmed, neat with stylized marks ===
    g.fillStyle(this.colors.black);
    g.beginPath();
    g.moveTo(cx - 35, cy + 45);
    g.lineTo(cx - 25, cy + 90);
    g.lineTo(cx, cy + 100);
    g.lineTo(cx + 25, cy + 90);
    g.lineTo(cx + 35, cy + 45);
    g.closePath();
    g.fill();
    
    this.drawStylizedBeard(cx, cy + 50, 40, 45, this.colors.midGray);
    
    // === CLOTHING - Rich robes ===
    g.fillStyle(this.colors.black);
    g.fillRect(cx - 70, cy + 100, 140, 130);
    
    // Gold trim - Byzantine pattern
    g.fillStyle(this.colors.gold);
    g.fillRect(cx - 70, cy + 100, 140, 10);
    g.fillRect(cx - 38, cy + 100, 10, 130);
    g.fillRect(cx + 28, cy + 100, 10, 130);
    
    // Diamond pattern in gold trim
    g.fillStyle(this.colors.black);
    for (let y = cy + 115; y < cy + 220; y += 25) {
      g.fillRect(cx - 36, y, 6, 6);
      g.fillRect(cx + 30, y, 6, 6);
    }
    
    // Rings on hands
    g.fillStyle(this.colors.gold);
    g.fillCircle(cx - 55, cy + 190, 6);
    g.fillCircle(cx + 55, cy + 190, 6);
    g.fillStyle(this.colors.black);
    g.fillCircle(cx - 55, cy + 190, 3);
    g.fillCircle(cx + 55, cy + 190, 3);
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
        this.drawPlayer();
    }
  }

  setAlpha(alpha) {
    this.graphics.setAlpha(alpha);
  }

  destroy() {
    this.graphics.destroy();
  }
}
