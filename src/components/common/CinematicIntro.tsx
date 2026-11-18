import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Volume2, FastForward } from 'lucide-react';
import { soundManager } from './SoundEffectManager';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [scene, setScene] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Scene 1: Darkness (1.2s)
    const timer1 = setTimeout(() => {
      setScene(2);
      soundManager.play('cinematicReveal');
    }, 1200);

    // Scene 2: Energy Activation (1.5s)
    const timer2 = setTimeout(() => {
      setScene(3);
      soundManager.play('cinematicImpact');
    }, 2800);

    // Scene 3: Portrait Reveal (2s)
    const timer3 = setTimeout(() => {
      setScene(4);
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSkip = () => {
    soundManager.play('buttonClick');
    onComplete();
  };

  const handleEnter = () => {
    soundManager.play('cinematicImpact');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020203] flex items-center justify-center overflow-hidden select-none">
      {/* Skip Button (Always visible) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#ff1e38] text-neutral-300 hover:text-white border border-white/15 text-xs font-mono font-semibold transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer"
        aria-label="Skip Cinematic Intro"
      >
        <span>Skip Prologue</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

      {/* Atmospheric Ember Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[#ff1e38]/15 via-[#880816]/10 to-transparent blur-[140px]" />
      </div>

      <AnimatePresence mode="wait">
        {/* Scene 1: Pitch Black with subtle ignition */}
        {scene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 rounded-full bg-[#ff1e38] mx-auto shadow-[0_0_20px_#ff1e38]"
            />
            <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
              INITIALIZING CINEMATIC CORE...
            </p>
          </motion.div>
        )}

        {/* Scene 2: Energy Activation */}
        {scene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#ff1e38] animate-ping opacity-40" />
              <div className="absolute inset-2 rounded-full border border-dashed border-[#ff4d6d] animate-spin" style={{ animationDuration: '6s' }} />
              <div className="w-20 h-20 rounded-2xl bg-[#160509] border-2 border-[#ff1e38] flex items-center justify-center shadow-[0_0_40px_#ff1e38] transform rotate-45">
                <Sparkles className="w-8 h-8 text-[#ff4d6d] -rotate-45" />
              </div>
            </div>
            <p className="font-mono text-sm text-[#ff4d6d] font-bold tracking-widest uppercase">
              CRIMSON ENERGY AWAKENING
            </p>
          </motion.div>
        )}

        {/* Scene 3: Portrait Reveal */}
        {scene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto px-4"
          >
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-[#ff1e38] shadow-[0_0_60px_rgba(255,30,56,0.6)]">
              <img
                src="/assets/sravan-portrait.png"
                alt="Sravan Kumar Naredla"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 border border-[#ff1e38]/50 rounded-3xl pointer-events-none" />
            </div>

            <div className="text-center space-y-1">
              <p className="font-mono text-xs text-[#ff4d6d] tracking-widest uppercase">
                IDENTITY VERIFIED // REAL DEVELOPER
              </p>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide">
                SRAVAN KUMAR NAREDLA
              </h2>
            </div>
          </motion.div>
        )}

        {/* Scene 4: Developer Identity & Launch */}
        {scene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-6 max-w-xl mx-auto px-6 text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ff1e38] shadow-[0_0_30px_#ff1e38]">
              <img
                src="/assets/sravan-portrait.png"
                alt="Sravan Kumar Naredla"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ff4d6d] uppercase tracking-widest px-3 py-1 rounded-full bg-[#180509] border border-[#ff1e38]/40">
                FRONTEND DEVELOPER &bull; REACT.JS SPECIALIST
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight pt-2">
                SRAVAN KUMAR NAREDLA
              </h1>
              <p className="font-mono text-sm sm:text-base text-neutral-300 italic pt-1">
                "Turning Ideas Into Interactive Digital Experiences."
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleEnter}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff1e38] via-[#e11d48] to-[#be123c] text-white font-sans font-bold text-sm shadow-[0_0_30px_rgba(255,30,56,0.6)] hover:shadow-[0_0_45px_rgba(255,30,56,0.9)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Enter Digital Universe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

