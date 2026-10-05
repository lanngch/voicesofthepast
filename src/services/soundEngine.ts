/**
 * Web Audio Engine for "Voices of the Past"
 * Creates authentic procedural music, acoustic instruments, soundscapes, and letter FX
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  private isMuted: boolean = false;
  private volume: number = 0.65;
  private isMusicPlaying: boolean = false;
  private currentPreset: string = 'home-ambient';
  private loopTimer: number | null = null;
  private ambientNodes: { source?: AudioNode; gain?: GainNode; filter?: BiquadFilterNode }[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // Play realistic paper rustle / letter sliding sound
  public playPaperRustle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      // White noise burst shaped like paper scraping
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + 0.35);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + 0.4);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Play vintage typewriter / fountain pen stroke
  public playPenScratch() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.07);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  // Play soft antique chime
  public playChime(freq: number = 880) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Ignore
    }
  }

  // Start procedural atmospheric musical theme for a frame
  public playTheme(preset: string) {
    this.initContext();
    this.currentPreset = preset;
    this.isMusicPlaying = true;

    this.stopTheme(false);
    this.startAmbientSound(preset);
    this.startMelodyLoop(preset);
  }

  public stopTheme(markStopped: boolean = true) {
    if (this.loopTimer !== null) {
      window.clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    this.stopAmbientSound();
    if (markStopped) {
      this.isMusicPlaying = false;
    }
  }

  private stopAmbientSound() {
    for (const node of this.ambientNodes) {
      try {
        if ('stop' in (node.source as AudioScheduledSourceNode)) {
          (node.source as AudioScheduledSourceNode).stop();
        }
        node.source?.disconnect();
        node.gain?.disconnect();
        node.filter?.disconnect();
      } catch {
        // Ignore
      }
    }
    this.ambientNodes = [];
  }

  private startAmbientSound(preset: string) {
    if (!this.ctx || !this.ambientGain) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise-ish distribution for nature sound
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      if (preset === 'ocean-heroic') {
        // Ocean swell waves
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.18, now);

        // LFO for surf waves
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.18, now); // ~5 second wave swell
        lfoGain.gain.setValueAtTime(240, now);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        this.ambientNodes.push({ source: lfo, gain: lfoGain });
      } else if (preset === 'cello-stream') {
        // Mountain stream water murmur
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(900, now);
        filter.Q.setValueAtTime(1.8, now);
        gain.gain.setValueAtTime(0.12, now);
      } else if (preset === 'lullaby-piano') {
        // Midnight rain
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.14, now);
      } else {
        // Gentle countryside breeze / vinyl warm hiss
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(550, now);
        filter.Q.setValueAtTime(1.2, now);
        gain.gain.setValueAtTime(0.08, now);
      }

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      noise.start(now);
      this.ambientNodes.push({ source: noise, gain, filter });
    } catch {
      // AudioContext fallback
    }
  }

  // Plays notes procedurally on acoustic instruments
  private playPluckNote(freq: number, type: 'guitar' | 'flute' | 'piano' | 'cello' = 'guitar', duration: number = 2.0) {
    if (!this.ctx || !this.musicGain) return;

    try {
      const now = this.ctx.currentTime;

      if (type === 'flute') {
        // Warm bamboo flute: sine with subtle vibrato
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Vibrato
        const vibrato = this.ctx.createOscillator();
        vibrato.frequency.setValueAtTime(5.2, now);
        const vibGain = this.ctx.createGain();
        vibGain.gain.setValueAtTime(freq * 0.02, now);
        vibrato.connect(vibGain);
        vibGain.connect(osc.frequency);
        vibrato.start(now);
        vibrato.stop(now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.2);
        gain.gain.setValueAtTime(0.12, now + duration - 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + duration);
      } else if (type === 'cello') {
        // Cello tone: warm filtered sawtooth with gentle slow attack
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
        gain.gain.setValueAtTime(0.1, now + duration - 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + duration);
      } else if (type === 'piano') {
        // Electric piano / bell: fundamental + 2nd harmonic with smooth exponential decay
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 2, now);

        const gain1 = this.ctx.createGain();
        const gain2 = this.ctx.createGain();
        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        gain2.gain.setValueAtTime(0.04, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(this.musicGain);
        gain2.connect(this.musicGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
      } else {
        // Acoustic guitar pluck
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + duration);
      }
    } catch {
      // AudioContext fallback
    }
  }

  // Musical progressions tailored to each letter's atmosphere
  private startMelodyLoop(preset: string) {
    let step = 0;

    // Scale frequencies (Hz)
    const notes: Record<string, number> = {
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00
    };

    const runStep = () => {
      if (!this.isMusicPlaying) return;

      if (preset === 'flute-guitar') {
        // Nostalgic Vietnamese pentatonic melody: C - D - F - G - A
        const pattern = [
          { guitar: [notes.C3, notes.G3, notes.E4], flute: notes.G4, time: 2.4 },
          { guitar: [notes.A3, notes.E4, notes.C4], flute: notes.A4, time: 2.4 },
          { guitar: [notes.F3, notes.C4, notes.A4], flute: notes.C5, time: 2.4 },
          { guitar: [notes.G3, notes.D4, notes.B3], flute: notes.D5, time: 2.4 },
          { guitar: [notes.A3, notes.E4, notes.C4], flute: notes.E5, time: 2.8 },
          { guitar: [notes.G3, notes.D4, notes.G4], flute: notes.D5, time: 2.4 },
          { guitar: [notes.F3, notes.C4, notes.A4], flute: notes.C5, time: 2.4 },
          { guitar: [notes.C3, notes.G3, notes.E4], flute: notes.G4, time: 3.0 },
        ];
        const cur = pattern[step % pattern.length];
        cur.guitar.forEach((f, idx) => {
          window.setTimeout(() => this.playPluckNote(f, 'guitar', 2.8), idx * 120);
        });
        if (cur.flute) {
          window.setTimeout(() => this.playPluckNote(cur.flute, 'flute', 3.2), 300);
        }
      } else if (preset === 'ocean-heroic') {
        // Majestic minor-to-major progression
        const pattern = [
          { chord: [notes.A3, notes.E4, notes.A4], lead: notes.C5, time: 3.0 },
          { chord: [notes.F3, notes.C4, notes.A4], lead: notes.E5, time: 3.0 },
          { chord: [notes.D3, notes.A3, notes.F4], lead: notes.D5, time: 3.0 },
          { chord: [notes.E3, notes.B3, notes.G4], lead: notes.B4, time: 3.0 },
          { chord: [notes.A3, notes.E4, notes.C5], lead: notes.A4, time: 3.2 },
          { chord: [notes.G3, notes.D4, notes.B4], lead: notes.G4, time: 3.0 },
        ];
        const cur = pattern[step % pattern.length];
        cur.chord.forEach((f, idx) => {
          window.setTimeout(() => this.playPluckNote(f, 'cello', 4.0), idx * 180);
        });
        if (cur.lead) {
          window.setTimeout(() => this.playPluckNote(cur.lead, 'flute', 3.5), 450);
        }
      } else if (preset === 'cello-stream') {
        // Tender romantic cello melody
        const pattern = [
          { cello: notes.C3, notesArp: [notes.E3, notes.G3, notes.C4], time: 2.8 },
          { cello: notes.A3, notesArp: [notes.C4, notes.E4, notes.A4], time: 2.8 },
          { cello: notes.F3, notesArp: [notes.A3, notes.C4, notes.F4], time: 2.8 },
          { cello: notes.G3, notesArp: [notes.B3, notes.D4, notes.G4], time: 2.8 },
        ];
        const cur = pattern[step % pattern.length];
        this.playPluckNote(cur.cello, 'cello', 3.4);
        cur.notesArp.forEach((f, idx) => {
          window.setTimeout(() => this.playPluckNote(f, 'piano', 2.2), (idx + 1) * 220);
        });
      } else if (preset === 'lullaby-piano') {
        // Melancholy lullaby piano
        const pattern = [
          { root: notes.A3, melody: [notes.E4, notes.A4, notes.C5, notes.B4], time: 3.2 },
          { root: notes.F3, melody: [notes.C4, notes.F4, notes.A4, notes.G4], time: 3.2 },
          { root: notes.D3, melody: [notes.A3, notes.D4, notes.F4, notes.E4], time: 3.2 },
          { root: notes.E3, melody: [notes.B3, notes.E4, notes.G4, notes.E4], time: 3.2 },
        ];
        const cur = pattern[step % pattern.length];
        this.playPluckNote(cur.root, 'piano', 3.6);
        cur.melody.forEach((f, idx) => {
          window.setTimeout(() => this.playPluckNote(f, 'piano', 2.0), (idx + 1) * 350);
        });
      } else {
        // Pastoral acoustic guitar fingerpicking (Duc Pho / Home)
        const pattern = [
          { notes: [notes.G3, notes.D4, notes.G4, notes.B4], time: 2.4 },
          { notes: [notes.C3, notes.G3, notes.E4, notes.G4], time: 2.4 },
          { notes: [notes.D3, notes.A3, notes.F4, notes.A4], time: 2.4 },
          { notes: [notes.E3, notes.B3, notes.G4, notes.E4], time: 2.4 },
        ];
        const cur = pattern[step % pattern.length];
        cur.notes.forEach((f, idx) => {
          window.setTimeout(() => this.playPluckNote(f, 'guitar', 2.5), idx * 240);
        });
      }

      step++;
    };

    // First step immediate
    runStep();
    this.loopTimer = window.setInterval(runStep, 2600);
  }
}

export const soundEngine = new SoundEngine();
