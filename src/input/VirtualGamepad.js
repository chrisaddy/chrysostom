/**
 * Virtual Gamepad - Game Boy style touch controls
 * 
 * D-pad on left, A/B buttons on right.
 * Only shows on touch devices / small screens.
 */

export class VirtualGamepad {
  constructor(scene) {
    this.scene = scene;
    this.enabled = false;
    
    // Virtual button states
    this.state = {
      up: false,
      down: false,
      left: false,
      right: false,
      a: false,  // Primary action (interact/confirm)
      b: false,  // Secondary (cancel/back)
    };
    
    // Callbacks
    this.onButtonDown = null;
    this.onButtonUp = null;
    
    // Check if we should show virtual controls
    this.checkTouchDevice();
    
    // Listen for resize to show/hide
    window.addEventListener('resize', () => this.checkTouchDevice());
  }

  checkTouchDevice() {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isSmallScreen = window.innerWidth <= 900;
    
    if ((isTouchDevice || isSmallScreen) && !this.enabled) {
      this.create();
    } else if (!isTouchDevice && !isSmallScreen && this.enabled) {
      this.destroy();
    }
  }

  create() {
    if (this.enabled) return;
    this.enabled = true;
    
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'virtual-gamepad';
    this.container.innerHTML = `
      <div class="gamepad-dpad">
        <button class="dpad-btn dpad-up" data-btn="up">▲</button>
        <div class="dpad-middle">
          <button class="dpad-btn dpad-left" data-btn="left">◀</button>
          <div class="dpad-center"></div>
          <button class="dpad-btn dpad-right" data-btn="right">▶</button>
        </div>
        <button class="dpad-btn dpad-down" data-btn="down">▼</button>
      </div>
      <div class="gamepad-buttons">
        <button class="action-btn btn-b" data-btn="b">B</button>
        <button class="action-btn btn-a" data-btn="a">A</button>
      </div>
    `;
    
    // Add styles
    this.addStyles();
    
    // Add to DOM
    document.body.appendChild(this.container);
    
    // Bind touch events
    this.bindEvents();
  }

  addStyles() {
    if (document.getElementById('gamepad-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'gamepad-styles';
    style.textContent = `
      #virtual-gamepad {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        pointer-events: none;
        z-index: 1000;
        background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
      }
      
      .gamepad-dpad,
      .gamepad-buttons {
        pointer-events: auto;
      }
      
      /* D-PAD */
      .gamepad-dpad {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
      
      .dpad-middle {
        display: flex;
        align-items: center;
        gap: 0;
      }
      
      .dpad-btn {
        width: 50px;
        height: 50px;
        background: #1a1a1a;
        border: 2px solid #333;
        color: #666;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        transition: all 0.1s;
      }
      
      .dpad-btn:active,
      .dpad-btn.pressed {
        background: #333;
        color: #ededed;
        border-color: #666;
      }
      
      .dpad-up { border-radius: 8px 8px 0 0; }
      .dpad-down { border-radius: 0 0 8px 8px; }
      .dpad-left { border-radius: 8px 0 0 8px; }
      .dpad-right { border-radius: 0 8px 8px 0; }
      
      .dpad-center {
        width: 50px;
        height: 50px;
        background: #111;
        border: 2px solid #333;
      }
      
      /* ACTION BUTTONS */
      .gamepad-buttons {
        display: flex;
        gap: 15px;
        align-items: center;
      }
      
      .action-btn {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #1a1a1a;
        border: 3px solid #333;
        color: #666;
        font-family: 'Georgia', serif;
        font-size: 18px;
        font-weight: bold;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        transition: all 0.1s;
      }
      
      .action-btn:active,
      .action-btn.pressed {
        background: #333;
        color: #ededed;
        border-color: #666;
        transform: scale(0.95);
      }
      
      .btn-a {
        background: #1a1a1a;
        border-color: #4a4a2a;
      }
      
      .btn-a:active,
      .btn-a.pressed {
        background: #3a3a1a;
        border-color: #d4af37;
        color: #d4af37;
      }
      
      .btn-b {
        margin-top: 30px;
      }
      
      /* Hide on large screens without touch */
      @media (min-width: 901px) {
        #virtual-gamepad {
          display: none;
        }
      }
      
      /* Landscape phone adjustments */
      @media (max-height: 500px) {
        #virtual-gamepad {
          height: 140px;
        }
        .dpad-btn {
          width: 40px;
          height: 40px;
          font-size: 14px;
        }
        .dpad-center {
          width: 40px;
          height: 40px;
        }
        .action-btn {
          width: 50px;
          height: 50px;
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    const buttons = this.container.querySelectorAll('[data-btn]');
    
    buttons.forEach(btn => {
      const buttonName = btn.dataset.btn;
      
      // Touch events
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.pressButton(buttonName, btn);
      }, { passive: false });
      
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.releaseButton(buttonName, btn);
      }, { passive: false });
      
      btn.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        this.releaseButton(buttonName, btn);
      }, { passive: false });
      
      // Mouse events (for testing on desktop)
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.pressButton(buttonName, btn);
      });
      
      btn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        this.releaseButton(buttonName, btn);
      });
      
      btn.addEventListener('mouseleave', (e) => {
        if (this.state[buttonName]) {
          this.releaseButton(buttonName, btn);
        }
      });
    });
    
    // Prevent context menu on long press
    this.container.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  pressButton(name, element) {
    if (this.state[name]) return; // Already pressed
    
    this.state[name] = true;
    element.classList.add('pressed');
    
    if (this.onButtonDown) {
      this.onButtonDown(name);
    }
    
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  releaseButton(name, element) {
    if (!this.state[name]) return; // Already released
    
    this.state[name] = false;
    element.classList.remove('pressed');
    
    if (this.onButtonUp) {
      this.onButtonUp(name);
    }
  }

  // Check if a direction is pressed
  isDown(button) {
    return this.state[button] || false;
  }

  // Get movement vector
  getMovement() {
    let x = 0;
    let y = 0;
    
    if (this.state.left) x -= 1;
    if (this.state.right) x += 1;
    if (this.state.up) y -= 1;
    if (this.state.down) y += 1;
    
    return { x, y };
  }

  destroy() {
    if (!this.enabled) return;
    this.enabled = false;
    
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
  }
}
