// Web Audio API Synthesizer - 100% offline, zero audio file dependencies
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val) {
    this.enabled = val;
  }

  playTone(freq, duration = 0.15, type = 'sine', gainVal = 0.12) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Pleasant click for card flip or tap
  playCardFlip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.playTone(480, 0.08, 'triangle', 0.1);
    } catch (e) {}
  }

  // Harmonious pair match
  playMatchSound() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.25, 'sine', 0.15);
        }, idx * 90);
      });
    } catch (e) {}
  }

  // Celebratory victory fanfare
  playSuccessFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.35, 'triangle', 0.18);
        }, idx * 110);
      });
    } catch (e) {}
  }

  // Sequence tones for Pattern Recall (Calm warm bell-like chords)
  playPatternTone(index) {
    if (!this.enabled) return;
    const freqs = [329.63, 392.00, 440.00, 523.25]; // E4, G4, A4, C5 (Pentatonic, always harmonious)
    const freq = freqs[index % freqs.length] || 440;
    this.playTone(freq, 0.4, 'sine', 0.25);
  }

  // Gentle buzzer for mistake - not harsh or stressful for dementia patients
  playGentleBuzzer() {
    if (!this.enabled) return;
    this.playTone(220, 0.3, 'sawtooth', 0.08);
  }

  // Water drop/splash chime
  playWaterChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      this.playTone(800, 0.08, 'sine', 0.15);
      setTimeout(() => this.playTone(1200, 0.15, 'sine', 0.12), 60);
    } catch (e) {}
  }

  // Medication alert chime
  playReminderChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [600, 800, 1000].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.2), i * 140);
      });
    } catch (e) {}
  }
}

export const sounds = new SoundSynthesizer();
