import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Volume2, FastForward, Shield, Terminal, Zap } from 'lucide-react';
import { soundManager } from './SoundEffectManager';

interface CinematicSplashLoaderProps {
  onComplete: () => void;
}

export const CinematicSplashLoader: React.FC<CinematicSplashLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'ignite' | 'reveal' | 'ready'>('ignite');
  const [audioStarted, setAudioStarted] = useState(false);

  // Auto-progress counter for splash loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('ready');
          soundManager.play('cinematicBoom');
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(100, prev + increment);
        if (next >= 45 && stage === 'ignite') {
          setStage('reveal');
          soundManager.play('cinematicBraam');
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [stage]);

  const handleStartAudio = () => {
    soundManager.enableAudio();
    soundManager.play('cinematicBraam');
    setAudioStarted(true);
  };

  const handleEnter = () => {
    soundManager.play('cinematicBoom');
    onComplete();
  };

  const handleSkip = () => {
    soundManager.play('buttonClick');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030305] flex items-center justify-center overflow-hidden select-none">
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-[#ff1e38] text-neutral-300 hover:text-white border border-white/20 text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(0,0,0,0.9)] cursor-pointer"
        aria-label="Skip to Portfolio"
      >
        <span>SKIP INTRO</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

      {/* Atmospheric Volumetric Red Smoke & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-r from-[#ff1e38]/20 via-[#880816]/15 to-transparent blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-lg w-full mx-auto px-6 flex flex-col items-center text-center space-y-8">
        {/* Holographic Radar & Real Portrait Frame */}
        <div className="relative w-48 h-60 sm:w-56 sm:h-72 flex items-center justify-center">
          {/* Concentric Rotating Tech Rings */}
          <div className="absolute -inset-8 rounded-full border border-[#ff1e38]/30 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute -inset-4 rounded-full border border-dashed border-[#ff4d6d]/40 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />

          {/* Sravan's Authentic Professional Photograph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={{
              opacity: stage === 'ignite' ? 0.4 : 1,
              scale: stage === 'ready' ? 1.03 : 1,
              filter: 'blur(0px)',
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#ff1e38] shadow-[0_0_50px_rgba(255,30,56,0.6),0_20px_40px_rgba(0,0,0,0.9)]"
          >
            <img
              src="/assets/sravan-portrait.png"
              alt="Sravan Kumar Naredla"
              className="w-full h-full object-cover object-top"
            />
            {/* Red Rim Backlight Gradient & Fade */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030305] via-[#030305]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ff1e38]/15 via-transparent to-transparent pointer-events-none" />

            {/* Scanning Laser Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff1e38] to-transparent animate-pulse" />
          </motion.div>
        </div>

        {/* Cinematic Title & Identity */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#180509] border border-[#ff1e38]/40 text-xs font-mono text-[#ff4d6d] tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] animate-ping" />
            <span>AUTHENTIC DEVELOPER IDENTITY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight"
          >
            SRAVAN KUMAR <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-[#ff4d6d] bg-clip-text text-transparent">
              NAREDLA
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm font-mono text-[#ff1e38] font-bold tracking-widest uppercase"
          >
            FRONTEND DEVELOPER &bull; REACT.JS SPECIALIST
          </motion.p>
        </div>

        {/* Progress Bar & Telemetry Status */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Terminal className="w-3.5 h-3.5 text-[#ff1e38]" />
              {stage === 'ready' ? 'INITIALIZATION COMPLETE' : 'LOADING 3D UNIVERSE...'}
            </span>
            <span className="text-[#ff4d6d] font-bold">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="relative w-full h-2 rounded-full bg-[#10111a] border border-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#880816] via-[#e11d48] to-[#ff1e38] shadow-[0_0_15px_#ff1e38]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Audio Enable & Enter Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {!audioStarted && (
            <button
              onClick={handleStartAudio}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1a080d] hover:bg-[#2b0c15] text-[#ff4d6d] hover:text-white border border-[#ff1e38]/50 text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(255,30,56,0.25)] cursor-pointer w-full sm:w-auto"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>ENABLE TRAILER SOUND FX</span>
            </button>
          )}

          {stage === 'ready' ? (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.04 }}
              onClick={handleEnter}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff1e38] via-[#e11d48] to-[#be123c] text-white font-sans font-bold text-sm shadow-[0_0_30px_rgba(255,30,56,0.6)] hover:shadow-[0_0_50px_rgba(255,30,56,0.9)] transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>ENTER DIGITAL UNIVERSE</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <span className="text-[11px] font-mono text-neutral-500 animate-pulse">
              SYNCING GRAPHICS ENGINE...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

