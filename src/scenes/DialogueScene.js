import Phaser from 'phaser';
import { PortraitRenderer } from '../portraits/PortraitRenderer.js';

// Import dialogue data
import chrysostomIntro from '../data/dialogues/chrysostom_intro.json';
import chrysostomFirstMission from '../data/dialogues/chrysostom_first_mission.json';
import marketMerchant from '../data/dialogues/market_merchant.json';
import poorFamily from '../data/dialogues/poor_family.json';
import deaconStephanos from '../data/dialogues/deacon_stephanos.json';

// Dialogue registry - maps dialogue keys to imported JSON
const DIALOGUE_REGISTRY = {
  chrysostom_intro: chrysostomIntro,
  chrysostom_first_mission: chrysostomFirstMission,
  market_merchant: marketMerchant,
  poor_family: poorFamily,
  deacon_stephanos: deaconStephanos,
};

export class DialogueScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogueScene' });
    
    // Game state (in production, this would be a proper state manager)
    this.gameState = {
      playerName: 'Stranger',
      flags: {},
      quests: {},
      reputation: {
        church: 0,
        poor: 0,
        merchants: 0,
      },
    };
  }

  init(data) {
    this.npcName = data.npcName || 'Unknown';
    this.dialogueKey = data.dialogueKey || 'chrysostom_intro';
    this.returnScene = data.returnScene || 'ExplorationScene';
    this.currentLine = 0;
    this.currentBranch = null;
    this.dialogueComplete = false;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Load dialogue data from JSON
    this.loadDialogue(this.dialogueKey);
    
    // Dark overlay
    this.overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.85);
    this.overlay.setOrigin(0, 0);
    
    // Portrait area (left side) - stark, dramatic
    this.portraitBg = this.add.rectangle(0, 0, width * 0.4, height, 0x0a0a0a);
    this.portraitBg.setOrigin(0, 0);
    this.portraitBg.setStrokeStyle(2, 0xededed);
    
    // Portrait renderer - Death to the World aesthetic
    this.portraitRenderer = new PortraitRenderer(
      this,
      width * 0.2,  // center of portrait area
      height * 0.45,
      width * 0.35,
      height * 0.8
    );
    this.portraitRenderer.draw('chrysostom');
    
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
      height - 200, 
      width * 0.5, 
      160, 
      0x0a0a0a
    );
    this.dialogueBox.setOrigin(0, 0);
    this.dialogueBox.setStrokeStyle(1, 0x333333);
    
    // Dialogue text
    this.dialogueText = this.add.text(width * 0.45 + 20, height - 180, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '18px',
      color: '#ededed',
      wordWrap: { width: width * 0.5 - 40 },
      lineSpacing: 8
    });
    
    // Choice buttons container
    this.choiceContainer = this.add.container(width * 0.45, height - 200);
    this.choiceButtons = [];
    
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
    
    // Show first line
    this.showLine(0);
    
    // Input to advance
    this.input.keyboard.on('keydown-SPACE', () => this.advance());
    this.input.keyboard.on('keydown-ENTER', () => this.advance());
    this.input.on('pointerdown', (pointer) => {
      // Only advance if not clicking a choice button
      if (this.choiceButtons.length === 0) {
        this.advance();
      }
    });
    
    // Number keys for choices
    this.input.keyboard.on('keydown-ONE', () => this.selectChoice(0));
    this.input.keyboard.on('keydown-TWO', () => this.selectChoice(1));
    this.input.keyboard.on('keydown-THREE', () => this.selectChoice(2));
    this.input.keyboard.on('keydown-FOUR', () => this.selectChoice(3));
  }

  loadDialogue(key) {
    const dialogueData = DIALOGUE_REGISTRY[key];
    
    if (!dialogueData) {
      console.warn(`Dialogue not found: ${key}, using default`);
      this.dialogueData = DIALOGUE_REGISTRY.chrysostom_intro;
    } else {
      this.dialogueData = dialogueData;
    }
    
    // Start with main lines
    this.dialogue = this.dialogueData.lines || [];
    this.branches = this.dialogueData.branches || {};
  }

  drawPlaceholderPortrait(speaker = 'chrysostom') {
    // Draw a stark, icon-like placeholder portrait
    const centerX = this.cameras.main.width * 0.2;
    const centerY = this.cameras.main.height * 0.4;
    
    this.portrait.clear();
    
    if (speaker === 'chrysostom' || speaker === 'Chrysostom') {
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
    } else if (speaker === 'widow' || speaker === 'maria') {
      // Simpler figure - head covering
      this.portrait.fillStyle(0x000000);
      this.portrait.fillEllipse(centerX, centerY, 50, 60);
      this.portrait.fillRect(centerX - 60, centerY + 30, 120, 140);
      
      // Head covering
      this.portrait.fillStyle(0x333333);
      this.portrait.fillEllipse(centerX, centerY - 20, 60, 50);
      
      // Tired eyes
      this.portrait.fillStyle(0xededed);
      this.portrait.fillCircle(centerX - 12, centerY - 5, 4);
      this.portrait.fillCircle(centerX + 12, centerY - 5, 4);
    } else if (speaker === 'merchant' || speaker === 'kyriakos') {
      // Well-fed figure
      this.portrait.fillStyle(0x000000);
      this.portrait.fillEllipse(centerX, centerY, 65, 70);
      this.portrait.fillRect(centerX - 70, centerY + 40, 140, 160);
      
      // Rings suggestion
      this.portrait.fillStyle(0xd4af37);
      this.portrait.fillCircle(centerX - 55, centerY + 100, 5);
      this.portrait.fillCircle(centerX + 55, centerY + 100, 5);
      
      // Calculating eyes
      this.portrait.fillStyle(0xededed);
      this.portrait.fillCircle(centerX - 15, centerY - 5, 5);
      this.portrait.fillCircle(centerX + 15, centerY - 5, 5);
      this.portrait.fillStyle(0x000000);
      this.portrait.fillCircle(centerX - 14, centerY - 5, 2);
      this.portrait.fillCircle(centerX + 16, centerY - 5, 2);
    } else if (speaker === 'deacon' || speaker === 'stephanos') {
      // Young, earnest figure
      this.portrait.fillStyle(0x000000);
      this.portrait.fillEllipse(centerX, centerY, 50, 65);
      this.portrait.fillRect(centerX - 55, centerY + 45, 110, 140);
      
      // Deacon's stole (single over shoulder)
      this.portrait.fillStyle(0xededed);
      this.portrait.fillRect(centerX - 35, centerY + 45, 12, 100);
      
      // Friendly eyes
      this.portrait.fillStyle(0xededed);
      this.portrait.fillCircle(centerX - 12, centerY - 8, 5);
      this.portrait.fillCircle(centerX + 12, centerY - 8, 5);
    } else {
      // Default silhouette
      this.portrait.fillStyle(0x333333);
      this.portrait.fillEllipse(centerX, centerY, 50, 65);
      this.portrait.fillRect(centerX - 55, centerY + 45, 110, 140);
    }
  }

  interpolateText(text) {
    // Replace {playerName} and other variables with actual values
    let result = text;
    result = result.replace(/\{playerName\}/g, this.gameState.playerName);
    // Add more interpolations as needed
    return result;
  }

  showLine(index) {
    if (index >= this.dialogue.length) {
      if (this.currentBranch) {
        // End of branch, end dialogue
        this.endDialogue();
      } else {
        this.endDialogue();
      }
      return;
    }
    
    const line = this.dialogue[index];
    this.currentLine = index;
    
    // Clear any existing choices
    this.clearChoices();
    
    // Handle choice nodes
    if (line.speaker === 'Choices' && line.choices) {
      this.showChoices(line.choices);
      return;
    }
    
    // Update speaker
    this.speakerText.setText(line.speaker || '');
    
    // Update portrait based on speaker/portrait field
    const portraitKey = line.portrait || line.speaker?.toLowerCase();
    this.portraitRenderer.draw(portraitKey);
    
    // Typewriter effect for text
    const interpolatedText = this.interpolateText(line.text);
    this.typewriterText(interpolatedText);
    
    // Update portrait visibility based on speaker
    if (line.speaker === 'You' || line.speaker === 'System') {
      this.portraitRenderer.setAlpha(0.3);
    } else {
      this.portraitRenderer.setAlpha(1);
    }
    
    // Special styling for system messages
    if (line.speaker === 'System') {
      this.dialogueText.setColor('#4af2a1');
      this.speakerText.setText('');
      
      // Handle flags from system messages
      if (line.flags) {
        Object.assign(this.gameState.flags, line.flags);
      }
    } else {
      this.dialogueText.setColor('#ededed');
    }
    
    // Handle input requests
    if (line.input) {
      this.showInputPrompt(line.inputKey || 'playerName');
    }
  }

  showChoices(choices) {
    const width = this.cameras.main.width;
    
    // Hide continue prompt
    this.continuePrompt.setVisible(false);
    
    // Hide dialogue box, show choices
    this.dialogueBox.setVisible(false);
    this.dialogueText.setVisible(false);
    
    choices.forEach((choice, index) => {
      // Check if choice has requirements we don't meet
      if (choice.requirements) {
        const meetsRequirements = this.checkRequirements(choice.requirements);
        if (!meetsRequirements) return; // Skip this choice
      }
      
      const y = index * 50;
      
      // Choice background
      const bg = this.add.rectangle(0, y, width * 0.5, 40, 0x1a1a1a);
      bg.setOrigin(0, 0);
      bg.setStrokeStyle(1, 0x4af2a1);
      bg.setInteractive();
      
      // Choice text
      const text = this.add.text(15, y + 10, `${index + 1}. ${choice.text}`, {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        color: '#ededed',
      });
      
      // Hover effects
      bg.on('pointerover', () => {
        bg.setFillStyle(0x2a2a2a);
      });
      bg.on('pointerout', () => {
        bg.setFillStyle(0x1a1a1a);
      });
      bg.on('pointerdown', () => {
        this.selectChoice(index);
      });
      
      this.choiceContainer.add([bg, text]);
      this.choiceButtons.push({ bg, text, choice });
    });
  }

  checkRequirements(requirements) {
    // Simple requirement checking
    if (requirements.quest && !this.gameState.quests[requirements.quest]) {
      return false;
    }
    if (requirements.flags) {
      for (const flag of Object.keys(requirements.flags)) {
        if (this.gameState.flags[flag] !== requirements.flags[flag]) {
          return false;
        }
      }
    }
    return true;
  }

  selectChoice(index) {
    if (index >= this.choiceButtons.length) return;
    
    const choiceData = this.choiceButtons[index].choice;
    
    // Apply flags from choice
    if (choiceData.flags) {
      Object.assign(this.gameState.flags, choiceData.flags);
    }
    
    // Clear choices
    this.clearChoices();
    
    // Show dialogue box again
    this.dialogueBox.setVisible(true);
    this.dialogueText.setVisible(true);
    
    // Navigate to branch if specified
    if (choiceData.next && this.branches[choiceData.next]) {
      this.currentBranch = choiceData.next;
      this.dialogue = this.branches[choiceData.next];
      this.showLine(0);
    } else {
      // Continue to next line
      this.showLine(this.currentLine + 1);
    }
  }

  clearChoices() {
    this.choiceContainer.removeAll(true);
    this.choiceButtons = [];
    this.continuePrompt.setVisible(true);
  }

  showInputPrompt(inputKey) {
    // In a real game, this would show a text input
    // For now, we'll use a default name
    const defaultName = 'Alexios'; // A Byzantine Greek name
    this.gameState[inputKey] = defaultName;
    this.gameState.playerName = defaultName;
    
    // Show the name as if typed
    this.dialogueText.setText(`"${defaultName}"`);
    this.continuePrompt.setVisible(true);
  }

  typewriterText(text) {
    this.dialogueText.setText('');
    this.continuePrompt.setVisible(false);
    
    let i = 0;
    this.typewriterEvent = this.time.addEvent({
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
    // If choices are showing, don't advance
    if (this.choiceButtons.length > 0) return;
    
    // If text is still typing, show it all
    const currentText = this.dialogue[this.currentLine]?.text || '';
    const interpolatedText = this.interpolateText(currentText);
    
    if (this.dialogueText.text.length < interpolatedText.length) {
      if (this.typewriterEvent) {
        this.typewriterEvent.destroy();
      }
      this.dialogueText.setText(interpolatedText);
      this.continuePrompt.setVisible(true);
      return;
    }
    
    // Move to next line
    this.showLine(this.currentLine + 1);
  }

  endDialogue() {
    // Save game state (in production, persist to localStorage)
    console.log('Game state after dialogue:', this.gameState);
    
    // Fade out and return to exploration
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.resume(this.returnScene);
      this.scene.stop();
    });
  }
}
