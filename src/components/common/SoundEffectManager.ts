// High-End Cinematic Web Audio Synthesizer (Varanasi / Hollywood Trailer Grade)
// Multi-oscillator synthesis, resonant filter sweeps, distortion saturation, sub-bass braaam, and stereo energy

export type SoundType =
  | 'cinematicBraam'
  | 'cinematicBoom'
  | 'cinematicImpact'
  | 'cinematicReveal'
  | 'cinematicTitleClimax'
  | 'whoosh'
  | 'energyPulse'
  | 'navClick'
  | 'buttonClick'
  | 'hover'
  | 'cardActivation'
  | 'menuOpen'
  | 'menuClose'
  | 'contactChirp'
  | 'toggle';

class CinematicSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private masterGain: GainNode | null = null;
  private volume: number = 0.85;
  private lastHoverTime: number = 0;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sravan_portfolio_sound_enabled');
      this.enabled = saved !== 'false';
    }
  }

  public unlockAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startAtmosphericDrone() {
    if (!this.enabled) return;
    try {
      this.unlockAudioContext();
      if (!this.ctx || !this.masterGain) return;
      if (this.droneGain) return; // already active

      const t = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, t);
      this.droneGain.gain.linearRampToValueAtTime(0.22 * this.volume, t + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, t);
      filter.frequency.linearRampToValueAtTime(260, t + 7.0);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc2.type = 'sine';

      this.droneOsc1.frequency.setValueAtTime(43.65, t); // Deep F1 sub
      this.droneOsc2.frequency.setValueAtTime(65.41, t); // C2 resonance

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start(t);
      this.droneOsc2.start(t);
    } catch {
      // safe fallback
    }
  }

  public stopAtmosphericDrone() {
    if (!this.ctx || !this.droneGain) return;
    try {
      const t = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, t);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      setTimeout(() => {
        try {
          if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); this.droneOsc1 = null; }
          if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); this.droneOsc2 = null; }
          if (this.droneGain) { this.droneGain.disconnect(); this.droneGain = null; }
        } catch {}
      }, 1300);
    } catch {
      // safe fallback
    }
  }

  public enableAudio(): boolean {
    this.enabled = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sravan_portfolio_sound_enabled', 'true');
    }
    this.unlockAudioContext();
    this.play('buttonClick');
    return this.enabled;
  }

  public disableAudio(): boolean {
    this.enabled = false;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sravan_portfolio_sound_enabled', 'false');
    }
    return this.enabled;
  }

  public toggle(): boolean {
    if (this.enabled) {
      return this.disableAudio();
    } else {
      return this.enableAudio();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private makeDistortionCurve(amount = 20): Float32Array {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }

  public play(type: SoundType) {
    if (!this.enabled) return;

    if (type === 'hover') {
      const now = performance.now();
      if (now - this.lastHoverTime < 55) return;
      this.lastHoverTime = now;
    }

    try {
      this.unlockAudioContext();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const vol = this.volume;

      switch (type) {
        // 1. EPIC CINEMATIC BRAAAM (Deep Indian big-screen Varanasi / Inception brass impact)
        case 'cinematicBraam': {
          const sub = this.ctx.createOscillator();
          const subGain = this.ctx.createGain();
          sub.type = 'sine';
          sub.frequency.setValueAtTime(55, t);
          sub.frequency.exponentialRampToValueAtTime(30, t + 1.6);
          subGain.gain.setValueAtTime(0.5 * vol, t);
          subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.7);
          sub.connect(subGain);
          subGain.connect(this.masterGain);
          sub.start(t);
          sub.stop(t + 1.7);

          const saw1 = this.ctx.createOscillator();
          const saw2 = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const dist = this.ctx.createWaveShaper();
          const sawGain = this.ctx.createGain();

          saw1.type = 'sawtooth';
          saw2.type = 'sawtooth';
          saw1.frequency.setValueAtTime(110, t);
          saw2.frequency.setValueAtTime(111.9, t);
          saw1.frequency.exponentialRampToValueAtTime(55, t + 1.2);
          saw2.frequency.exponentialRampToValueAtTime(55.9, t + 1.2);

          filter.type = 'lowpass';
          filter.Q.setValueAtTime(6, t);
          filter.frequency.setValueAtTime(950, t);
          filter.frequency.exponentialRampToValueAtTime(100, t + 1.1);

          dist.curve = this.makeDistortionCurve(18) as any;
          dist.oversample = '2x';

          sawGain.gain.setValueAtTime(0.32 * vol, t);
          sawGain.gain.linearRampToValueAtTime(0.42 * vol, t + 0.12);
          sawGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);

          saw1.connect(filter);
          saw2.connect(filter);
          filter.connect(dist);
          dist.connect(sawGain);
          sawGain.connect(this.masterGain);

          saw1.start(t);
          saw2.start(t);
          saw1.stop(t + 1.5);
          saw2.stop(t + 1.5);
          break;
        }

        // 2. CINEMATIC BOOM / IMPACT
        case 'cinematicBoom':
        case 'cinematicImpact': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(160, t);
          osc.frequency.exponentialRampToValueAtTime(26, t + 1.1);

          gain.gain.setValueAtTime(0.5 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.15);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 1.15);

          // Top metallic resonant strike
          const metal = this.ctx.createOscillator();
          const metalGain = this.ctx.createGain();
          metal.type = 'triangle';
          metal.frequency.setValueAtTime(980, t);
          metal.frequency.exponentialRampToValueAtTime(180, t + 0.35);
          metalGain.gain.setValueAtTime(0.12 * vol, t);
          metalGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

          metal.connect(metalGain);
          metalGain.connect(this.masterGain);
          metal.start(t);
          metal.stop(t + 0.35);
          break;
        }

        // 3. CINEMATIC TITLE CLIMAX (Orchestral Brass + Sub Drop + Resonant Gong for Sravan Kumar Naredla Reveal)
        case 'cinematicTitleClimax': {
          // Massive sub bass drop
          const sub = this.ctx.createOscillator();
          const subGain = this.ctx.createGain();
          sub.type = 'sine';
          sub.frequency.setValueAtTime(140, t);
          sub.frequency.exponentialRampToValueAtTime(28, t + 2.2);
          subGain.gain.setValueAtTime(0.65 * vol, t);
          subGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
          sub.connect(subGain);
          subGain.connect(this.masterGain);
          sub.start(t);
          sub.stop(t + 2.4);

          // Detuned cinematic brass saw cluster
          [-0.7, 0, 0.7].forEach((detune) => {
            if (!this.ctx || !this.masterGain) return;
            const saw = this.ctx.createOscillator();
            const filt = this.ctx.createBiquadFilter();
            const g = this.ctx.createGain();

            saw.type = 'sawtooth';
            saw.frequency.setValueAtTime(110 * (1 + detune * 0.015), t);
            saw.frequency.exponentialRampToValueAtTime(55, t + 2.0);

            filt.type = 'lowpass';
            filt.frequency.setValueAtTime(1400, t);
            filt.frequency.exponentialRampToValueAtTime(120, t + 1.8);
            filt.Q.setValueAtTime(6, t);

            g.gain.setValueAtTime(0.28 * vol, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);

            saw.connect(filt);
            filt.connect(g);
            g.connect(this.masterGain);
            saw.start(t);
            saw.stop(t + 2.0);
          });

          // Resonant crash shimmer
          const shimmer = this.ctx.createOscillator();
          const shimmerGain = this.ctx.createGain();
          shimmer.type = 'triangle';
          shimmer.frequency.setValueAtTime(1400, t);
          shimmer.frequency.exponentialRampToValueAtTime(90, t + 1.4);
          shimmerGain.gain.setValueAtTime(0.18 * vol, t);
          shimmerGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
          shimmer.connect(shimmerGain);
          shimmerGain.connect(this.masterGain);
          shimmer.start(t);
          shimmer.stop(t + 1.4);
          break;
        }

        // 3. CINEMATIC REVEAL (Harmonic Rising Swell)
        case 'cinematicReveal': {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'triangle';
          osc1.frequency.setValueAtTime(70, t);
          osc2.frequency.setValueAtTime(140, t);
          osc1.frequency.exponentialRampToValueAtTime(520, t + 0.7);
          osc2.frequency.exponentialRampToValueAtTime(1040, t + 0.7);

          gain.gain.setValueAtTime(0.03 * vol, t);
          gain.gain.linearRampToValueAtTime(0.2 * vol, t + 0.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.masterGain);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.75);
          osc2.stop(t + 0.75);
          break;
        }

        case 'whoosh': {
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(80, t);
          osc.frequency.exponentialRampToValueAtTime(260, t + 0.3);

          filter.type = 'bandpass';
          filter.Q.setValueAtTime(4, t);
          filter.frequency.setValueAtTime(180, t);
          filter.frequency.exponentialRampToValueAtTime(1400, t + 0.2);
          filter.frequency.exponentialRampToValueAtTime(120, t + 0.4);

          gain.gain.setValueAtTime(0.12 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.42);
          break;
        }

        case 'energyPulse': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(280, t);
          osc.frequency.exponentialRampToValueAtTime(920, t + 0.1);

          gain.gain.setValueAtTime(0.1 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.12);
          break;
        }

        case 'buttonClick': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(680, t);
          osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);

          gain.gain.setValueAtTime(0.09 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.065);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.065);
          break;
        }

        case 'navClick': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, t);
          osc.frequency.exponentialRampToValueAtTime(380, t + 0.05);

          gain.gain.setValueAtTime(0.06 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.05);
          break;
        }

        case 'hover': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(950, t);
          osc.frequency.exponentialRampToValueAtTime(1400, t + 0.03);

          gain.gain.setValueAtTime(0.02 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.03);
          break;
        }

        case 'cardActivation': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(220, t);
          osc.frequency.exponentialRampToValueAtTime(600, t + 0.1);

          gain.gain.setValueAtTime(0.08 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.12);
          break;
        }

        case 'menuOpen': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(260, t);
          osc.frequency.exponentialRampToValueAtTime(740, t + 0.12);

          gain.gain.setValueAtTime(0.06 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.14);
          break;
        }

        case 'menuClose': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(680, t);
          osc.frequency.exponentialRampToValueAtTime(220, t + 0.1);

          gain.gain.setValueAtTime(0.06 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.1);
          break;
        }

        case 'contactChirp': {
          [0, 0.05, 0.1, 0.16].forEach((offset, idx) => {
            if (!this.ctx || !this.masterGain) return;
            const chirpOsc = this.ctx.createOscillator();
            const chirpGain = this.ctx.createGain();
            chirpOsc.type = 'sine';
            chirpOsc.frequency.setValueAtTime(600 + idx * 220, t + offset);

            chirpGain.gain.setValueAtTime(0.04 * vol, t + offset);
            chirpGain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.04);

            chirpOsc.connect(chirpGain);
            chirpGain.connect(this.masterGain);
            chirpOsc.start(t + offset);
            chirpOsc.stop(t + offset + 0.04);
          });
          break;
        }

        case 'toggle': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, t);
          osc.frequency.setValueAtTime(880, t + 0.06);

          gain.gain.setValueAtTime(0.08 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.14);
          break;
        }
      }
    } catch {
      // Safe fallback
    }
  }

  public playClick() {
    this.play('buttonClick');
  }

  public playHover() {
    this.play('hover');
  }
}

export const soundManager = new CinematicSoundEngine();
