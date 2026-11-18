import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, FastForward } from 'lucide-react';
import { EpicThreeUniverse } from '../3d/EpicThreeUniverse';
import { splashAudio } from './SplashAudioController';

interface UltraCinematicSplashProps {
  onComplete: () => void;
}

export const UltraCinematicSplash: React.FC<UltraCinematicSplashProps> = ({ onComplete }) => {
  const [elapsed, setElapsed] = useState(0); // 0 to 12 seconds
  const [audioEnabled, setAudioEnabled] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // AUTOMATIC SPLASH SEQUENCE — IMMEDIATE START & DIRECT MUSIC PLAYBACK
  useEffect(() => {
    // 1. Play soundtrack directly
    splashAudio.init();
    splashAudio.setVolume(0.75);
    splashAudio.startWithAutoplayFallback();

    // 2. Silent ambient listener for any natural user movement
    const handleAmbientMovement = () => {
      if (splashAudio.isMutedState() || !splashAudio.getIsPlaying()) {
        splashAudio.unmute();
      }
    };

    window.addEventListener('touchstart', handleAmbientMovement, { passive: true, once: true });
    window.addEventListener('touchend', handleAmbientMovement, { passive: true, once: true });
    window.addEventListener('pointerdown', handleAmbientMovement, { passive: true, once: true });
    window.addEventListener('pointermove', handleAmbientMovement, { passive: true, once: true });
    window.addEventListener('click', handleAmbientMovement, { passive: true, once: true });
    window.addEventListener('keydown', handleAmbientMovement, { passive: true, once: true });
    window.addEventListener('scroll', handleAmbientMovement, { passive: true, once: true });

    // 3. High-precision synchronized cinematic timeline
    const startTime = performance.now();
    intervalRef.current = window.setInterval(() => {
      const now = performance.now();
      const currentElapsed = (now - startTime) / 1000;
      setElapsed(currentElapsed);

      // Smooth musical resolution fadeout near the end (10.5s to 11.5s)
      if (currentElapsed >= 10.5 && audioEnabled) {
        const fadeRemaining = Math.max(0, 1.0 - (currentElapsed - 10.5) / 1.0);
        splashAudio.setVolume(0.75 * fadeRemaining);
      }

      // Auto-complete and transition to website at 11.5 seconds
      if (currentElapsed >= 11.5) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        splashAudio.fadeOut(600);
        onComplete();
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      splashAudio.stop();
      window.removeEventListener('pointerdown', handleAmbientMovement);
      window.removeEventListener('pointermove', handleAmbientMovement);
      window.removeEventListener('click', handleAmbientMovement);
      window.removeEventListener('touchstart', handleAmbientMovement);
      window.removeEventListener('keydown', handleAmbientMovement);
      window.removeEventListener('scroll', handleAmbientMovement);
    };
  }, [audioEnabled, onComplete]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowUnmuted = splashAudio.toggleMute();
    setAudioEnabled(isNowUnmuted);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    splashAudio.fadeOut(300);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020204] flex items-center justify-center overflow-hidden select-none">
      {/* Top Floating Controls: Music Toggle & Instant Skip */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#090a10]/80 hover:bg-[#161824] text-neutral-300 hover:text-white border border-white/15 text-xs font-mono transition-all backdrop-blur-md cursor-pointer"
          title={audioEnabled ? 'Mute Music' : 'Unmute Music'}
          aria-label="Toggle Music"
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#ff4d6d] animate-pulse" />
              <span className="hidden sm:inline">MUSIC ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">MUSIC OFF</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff1e38]/90 hover:bg-[#ff1e38] text-white border border-[#ff1e38] text-xs font-mono font-bold transition-all shadow-[0_0_25px_rgba(255,30,56,0.6)] cursor-pointer backdrop-blur-md"
          aria-label="Skip to Portfolio"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Timeline Clock Indicator */}
      <div className="absolute top-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#07080d]/80 border border-white/10 font-mono text-[11px] text-neutral-400 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
        <span>SCENE // {elapsed.toFixed(1)}s / 11.5s</span>
      </div>

      {/* Real Three.js Monumental Universe (Towering Monolith Pillars + Yantra Core) */}
      <EpicThreeUniverse timelineProgress={elapsed} />

      {/* Atmospheric Lighting & Volumetric Red Smoke */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-gradient-to-r from-[#ff1e38]/18 via-[#880816]/12 to-transparent blur-[160px]" />
      </div>

      {/* TIMELINE OVERLAYS (0s to 12s) — Automated Continuous Cinema */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 pointer-events-none">
        {/* 0-2s: THE MYSTERY */}
        {elapsed < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff1e38] mx-auto shadow-[0_0_20px_#ff1e38] animate-ping" />
            <p className="font-mono text-xs text-neutral-500 tracking-[0.3em] uppercase">
              THE MYSTERY AWAKENS
            </p>
          </motion.div>
        )}

        {/* 2-4s: THE WORLD AWAKENS */}
        {elapsed >= 2 && elapsed < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-2"
          >
            <span className="px-3 py-1 rounded-full bg-[#180509] border border-[#ff1e38]/40 text-xs font-mono text-[#ff4d6d] tracking-widest uppercase">
              CHAPTER I // ANCIENT ARCHITECTURE &bull; FUTURISTIC UNIVERSE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-widest uppercase text-glow">
              THE WORLD AWAKENS
            </h2>
          </motion.div>
        )}

        {/* 4-6s: THE ENERGY AWAKENS */}
        {elapsed >= 4 && elapsed < 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-2"
          >
            <span className="px-3 py-1 rounded-full bg-[#180509] border border-[#ff1e38]/40 text-xs font-mono text-[#ff4d6d] tracking-widest uppercase">
              CHAPTER II // CONCENTRIC YANTRA RESONANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-widest uppercase text-glow">
              CRIMSON ENERGY ACTIVATION
            </h2>
          </motion.div>
        )}

        {/* 6-8s: MY PORTRAIT REVEAL */}
        {elapsed >= 6 && elapsed < 8 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto"
          >
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-[#ff1e38] shadow-[0_0_60px_rgba(255,30,56,0.7),0_20px_50px_rgba(0,0,0,0.9)]">
              {/* Authentic Photograph */}
              <img
                src="/assets/sravan-portrait.png"
                alt="Sravan Kumar Naredla"
                className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 border-2 border-[#ff1e38]/40 rounded-3xl pointer-events-none" />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff1e38] to-transparent animate-pulse" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono text-[#ff4d6d] tracking-widest uppercase font-bold">
                PRIMARY HUMAN CHARACTER // INTRODUCING
              </span>
              <h3 className="text-2xl font-black font-display text-white tracking-wider">
                SRAVAN KUMAR NAREDLA
              </h3>
            </div>
          </motion.div>
        )}

        {/* 8-10.5s: THE TITLE CARD REVEAL (Climax of Intro synchronized to Musical Climax) */}
        {elapsed >= 8 && elapsed < 10.5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ff1e38] shadow-[0_0_30px_#ff1e38]">
              <img
                src="/assets/sravan-portrait.png"
                alt="Sravan Kumar Naredla"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Massive Cinematic Typography */}
            <div className="space-y-3">
              <span className="font-mono text-xs sm:text-sm text-[#ff4d6d] uppercase tracking-[0.3em] font-bold">
                AN EPIC PRODUCTION PRESENTS
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-neutral-100 to-[#ff4d6d] bg-clip-text text-transparent text-glow">
                  SRAVAN KUMAR
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#ff4d6d] via-[#ff1e38] to-[#ffb703] bg-clip-text text-transparent">
                  NAREDLA
                </span>
              </h1>

              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ff1e38]" />
                <p className="text-sm sm:text-lg font-mono font-bold text-white tracking-widest uppercase">
                  FRONTEND DEVELOPER &bull; REACT.JS ARCHITECT
                </p>
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#ff1e38]" />
              </div>

              <p className="font-mono text-xs sm:text-sm text-neutral-300 italic pt-1">
                "Turning Ideas Into Interactive Digital Experiences."
              </p>
            </div>
          </motion.div>
        )}

        {/* 10.5-12s: THE WEBSITE ENTRY (Smooth transition landing) */}
        {elapsed >= 10.5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="w-3 h-3 rounded-full bg-[#ff1e38] mx-auto animate-ping" />
            <h2 className="text-xl sm:text-3xl font-display font-black text-white tracking-widest uppercase text-glow">
              ENTERING DIGITAL UNIVERSE...
            </h2>
          </motion.div>
        )}
      </div>

      {/* Ambient Soundtrack Badge */}
      <div className="absolute bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0507]/85 border border-[#ff1e38]/30 backdrop-blur-md text-[11px] font-mono text-neutral-300 shadow-[0_0_15px_rgba(255,30,56,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] animate-ping" />
          <span>INDIAN BLOCKBUSTER SOUNDTRACK &bull; PLAYING</span>
        </div>
      </div>
    </div>
  );
};
