// Dedicated Cinematic Splash Audio Controller
// Handles persistent single-track playback, browser autoplay policies, smooth volume fades, and error recovery

class SplashAudioController {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private targetVolume: number = 0.75;
  private isMuted: boolean = false;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  public init() {
    if (this.initialized && this.audio) return;

    try {
      // 1. Create native HTMLAudioElement with preloading
      this.audio = new Audio();
      this.audio.src = '/audio/cinematic-intro.mp3';
      this.audio.preload = 'auto';
      this.audio.volume = this.targetVolume;
      this.audio.muted = this.isMuted;
      this.audio.loop = false;

      this.audio.addEventListener('error', (e) => {
        // Fallback to alternative asset path if needed
        if (this.audio && !this.audio.src.includes('mateuszpixabay-backwards-morphing-tesseract-30sec-challenge-7430.mp3')) {
          console.warn('[SplashAudioController] Primary audio failed, falling back to secondary track...');
          this.audio.src = '/audio/mateuszpixabay-backwards-morphing-tesseract-30sec-challenge-7430.mp3';
          this.audio.load();
        } else {
          console.error('[SplashAudioController] Audio element error:', e);
        }
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        console.log('[SplashAudioController] Audio playback active (muted:', this.audio?.muted, ', volume:', this.audio?.volume, ')');
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        console.log('[SplashAudioController] Audio playback reached natural end.');
      });

      this.audio.load();
      this.initialized = true;
    } catch (err) {
      console.error('[SplashAudioController] Failed to initialize audio element:', err);
    }
  }

  public startWithAutoplayFallback(): Promise<boolean> {
    this.init();
    if (!this.audio) return Promise.resolve(false);

    // 1. First attempt unmuted playback
    this.audio.muted = false;
    this.audio.volume = this.targetVolume;

    const promise = this.audio.play();

    if (promise !== undefined) {
      return promise
        .then(() => {
          this.isPlaying = true;
          this.isMuted = false;
          console.log('[SplashAudioController] Autoplay with sound active.');
          return true;
        })
        .catch((_err) => {
          // 2. Browser policy blocked unmuted sound on page load/refresh.
          // Start playing muted immediately so audio time stays in exact 1:1 sync with the 3D visual timeline.
          console.info('[SplashAudioController] Browser policy blocked unmuted autoplay. Running muted in sync until first user gesture.');
          if (this.audio) {
            this.audio.muted = true;
            this.isMuted = true;
            return this.audio.play()
              .then(() => {
                this.isPlaying = true;
                return false; // playing, but muted pending user activation
              })
              .catch(() => false);
          }
          return false;
        });
    }

    return Promise.resolve(false);
  }

  public unmute(): boolean {
    if (!this.audio) return false;
    this.audio.muted = false;
    this.isMuted = false;
    this.audio.volume = this.targetVolume;

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise.catch(() => {});
    }

    this.isPlaying = true;
    console.log('[SplashAudioController] Audio unmuted successfully at volume:', this.audio.volume);
    return true;
  }

  public play(): Promise<boolean> {
    return this.startWithAutoplayFallback();
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  public fadeOut(durationMs = 1000) {
    if (!this.audio || this.audio.paused) return;

    const startVol = this.audio.volume;
    const startTime = performance.now();

    const step = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      if (this.audio) {
        this.audio.volume = Math.max(0, startVol * (1 - progress));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.audio.pause();
          this.audio.volume = this.targetVolume;
          this.isPlaying = false;
        }
      }
    };

    requestAnimationFrame(step);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
      if (this.isMuted) {
        this.audio.pause();
      } else {
        this.audio.volume = this.targetVolume;
        this.audio.play().catch(() => {});
      }
    }
    return !this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.muted = muted;
      if (muted) {
        this.audio.pause();
      }
    }
  }

  public setVolume(vol: number) {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.targetVolume;
    }
  }

  public isMutedState(): boolean {
    return this.isMuted || (this.audio ? this.audio.muted : false);
  }

  public isEffectivelyAudible(): boolean {
    return this.getIsPlaying() && !this.isMutedState();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !!this.audio && !this.audio.paused;
  }

  public getCurrentTime(): number {
    return this.audio ? this.audio.currentTime : 0;
  }

  public seek(seconds: number) {
    if (this.audio) {
      this.audio.currentTime = Math.max(0, seconds);
    }
  }
}

export const splashAudio = new SplashAudioController();

