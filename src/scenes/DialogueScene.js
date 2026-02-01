import Phaser from 'phaser';

// Dialogue data (will be moved to JSON files later)
const DIALOGUES = {
  chrysostom_intro: [
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "You there—I saw what you meant to do."
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom', 
      text: "A hand reaching for another man's purse. Do you think I am blind?"
    },
    {
      speaker: 'You',
      portrait: null,
      text: "(You freeze. The Archbishop himself caught you.)"
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "You wear your hunger like a cloak. I know that look. I have seen it in Antioch, in every city."
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "What is your name, child?"
    },
    {
      speaker: 'You',
      portrait: null,
      text: "[Enter your name...]",
      input: true
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "Listen to me. The gold in that man's purse—it would feed you for a day. Maybe two."
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "But there is another way to live. Come."
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "I have work that needs doing. Work that feeds the soul as well as the body."
    },
    {
      speaker: 'Chrysostom',
      portrait: 'chrysostom',
      text: "Will you hear me out?"
    },
    {
      speaker: 'System',
      text: "✦ John Chrysostom has taken interest in you. ✦"
    }
  ]
};

export class DialogueScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogueScene' });
  }

  init(data) {
    this.npcName = data.npcName || 'Unknown';
    this.dialogueKey = data.dialogueKey || 'default';
    this.returnScene = data.returnScene || 'ExplorationScene';
    this.currentLine = 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Dark overlay
    this.overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.85);
    this.overlay.setOrigin(0, 0);
    
    // Portrait area (left side) - stark, dramatic
    this.portraitBg = this.add.rectangle(0, 0, width * 0.4, height, 0x0a0a0a);
    this.portraitBg.setOrigin(0, 0);
    this.portraitBg.setStrokeStyle(2, 0xededed);
    
    // Portrait placeholder (will be replaced with actual art)
    this.portrait = this.add.graphics();
    this.drawPlaceholderPortrait();
    
    // Speaker name
    this.speakerText = this.add.text(width * 0.45, 40, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      color: '#ededed',
      fontStyle: 'italic'
    });
    
    // Dialogue text area
    this.dialogueBox = this.add.rectangle(
      width * 0.45, 
      height - 180, 
      width * 0.5, 
      140, 
      0x0a0a0a
    );
    this.dialogueBox.setOrigin(0, 0);
    this.dialogueBox.setStrokeStyle(1, 0x333333);
    
    // Dialogue text
    this.dialogueText = this.add.text(width * 0.45 + 20, height - 160, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '18px',
      color: '#ededed',
      wordWrap: { width: width * 0.5 - 40 },
      lineSpacing: 8
    });
    
    // Continue prompt
    this.continuePrompt = this.add.text(width - 40, height - 30, '▼', {
      fontFamily: 'Georgia, serif',
      fontSize: '20px',
      color: '#4af2a1'
    });
    this.continuePrompt.setOrigin(1, 1);
    
    // Animate continue prompt
    this.tweens.add({
      targets: this.continuePrompt,
      y: height - 25,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Load dialogue
    this.dialogue = DIALOGUES[this.dialogueKey] || DIALOGUES.chrysostom_intro;
    
    // Show first line
    this.showLine(0);
    
    // Input to advance
    this.input.keyboard.on('keydown-SPACE', () => this.advance());
    this.input.keyboard.on('keydown-ENTER', () => this.advance());
    this.input.on('pointerdown', () => this.advance());
  }

  drawPlaceholderPortrait() {
    // Draw a stark, icon-like placeholder portrait
    const centerX = this.cameras.main.width * 0.2;
    const centerY = this.cameras.main.height * 0.4;
    
    this.portrait.clear();
    
    // Halo (for saints)
    this.portrait.lineStyle(3, 0xd4af37); // Gold
    this.portrait.strokeCircle(centerX, centerY - 20, 80);
    
    // Face silhouette - stark black
    this.portrait.fillStyle(0x000000);
    
    // Head
    this.portrait.fillEllipse(centerX, centerY, 60, 75);
    
    // Shoulders/robes
    this.portrait.fillRect(centerX - 70, centerY + 50, 140, 150);
    
    // Omophorion (bishop's stole) - white on black
    this.portrait.fillStyle(0xededed);
    this.portrait.fillRect(centerX - 50, centerY + 50, 15, 120);
    this.portrait.fillRect(centerX + 35, centerY + 50, 15, 120);
    
    // Cross on chest
    this.portrait.fillRect(centerX - 3, centerY + 70, 6, 40);
    this.portrait.fillRect(centerX - 15, centerY + 85, 30, 6);
    
    // Eyes - piercing white
    this.portrait.fillStyle(0xededed);
    this.portrait.fillCircle(centerX - 15, centerY - 10, 6);
    this.portrait.fillCircle(centerX + 15, centerY - 10, 6);
    
    // Pupils - looking at viewer
    this.portrait.fillStyle(0x000000);
    this.portrait.fillCircle(centerX - 14, centerY - 10, 3);
    this.portrait.fillCircle(centerX + 16, centerY - 10, 3);
  }

  showLine(index) {
    if (index >= this.dialogue.length) {
      this.endDialogue();
      return;
    }
    
    const line = this.dialogue[index];
    this.currentLine = index;
    
    // Update speaker
    this.speakerText.setText(line.speaker || '');
    
    // Typewriter effect for text
    this.typewriterText(line.text);
    
    // Update portrait visibility based on speaker
    if (line.speaker === 'You' || line.speaker === 'System') {
      this.portrait.setAlpha(0.3);
    } else {
      this.portrait.setAlpha(1);
    }
    
    // Special styling for system messages
    if (line.speaker === 'System') {
      this.dialogueText.setColor('#4af2a1');
      this.speakerText.setText('');
    } else {
      this.dialogueText.setColor('#ededed');
    }
  }

  typewriterText(text) {
    this.dialogueText.setText('');
    this.continuePrompt.setVisible(false);
    
    let i = 0;
    this.time.addEvent({
      delay: 30,
      callback: () => {
        this.dialogueText.setText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          this.continuePrompt.setVisible(true);
        }
      },
      repeat: text.length - 1
    });
  }

  advance() {
    // If text is still typing, show it all
    const currentText = this.dialogue[this.currentLine]?.text || '';
    if (this.dialogueText.text.length < currentText.length) {
      this.dialogueText.setText(currentText);
      this.continuePrompt.setVisible(true);
      return;
    }
    
    // Move to next line
    this.showLine(this.currentLine + 1);
  }

  endDialogue() {
    // Fade out and return to exploration
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.resume(this.returnScene);
      this.scene.stop();
    });
  }
}
