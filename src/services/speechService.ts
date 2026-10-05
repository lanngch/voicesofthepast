/**
 * Text-to-Speech Narration Service for "Voices of the Past"
 * Reads letters aloud paragraph-by-paragraph with synchronized highlighting
 */

export interface SpeechCallbacks {
  onParagraphChange?: (index: number) => void;
  onFinish?: () => void;
  onError?: (err: unknown) => void;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private paragraphs: string[] = [];
  private currentParagraphIndex: number = -1;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private callbacks: SpeechCallbacks = {};
  private rate: number = 0.92; // Slightly measured, solemn reading speed
  private pitch: number = 0.98;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isAvailable(): boolean {
    return Boolean(this.synth);
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public getCurrentParagraph(): number {
    return this.currentParagraphIndex;
  }

  public startReading(paragraphs: string[], callbacks: SpeechCallbacks = {}) {
    if (!this.synth) return;

    this.stop();
    this.paragraphs = paragraphs;
    this.callbacks = callbacks;
    this.currentParagraphIndex = 0;
    this.isSpeaking = true;
    this.isPaused = false;

    this.readCurrentParagraph();
  }

  private readCurrentParagraph() {
    if (!this.synth || !this.isSpeaking) return;

    if (this.currentParagraphIndex >= this.paragraphs.length) {
      this.stop();
      this.callbacks.onFinish?.();
      return;
    }

    const text = this.paragraphs[this.currentParagraphIndex];
    this.callbacks.onParagraphChange?.(this.currentParagraphIndex);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    // Pick a natural English or soothing voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(
      (v) => (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Daniel') || v.name.includes('Google UK English') || v.lang.startsWith('en'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (this.isSpeaking && !this.isPaused) {
        this.currentParagraphIndex++;
        // Small pause between paragraphs
        window.setTimeout(() => {
          this.readCurrentParagraph();
        }, 500);
      }
    };

    utterance.onerror = (e) => {
      // If stopped intentionally, error is usually 'canceled' or 'interrupted'
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        this.callbacks.onError?.(e);
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (this.synth && this.isSpeaking && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentParagraphIndex = -1;
    this.currentUtterance = null;
  }
}

export const speechService = new SpeechService();
