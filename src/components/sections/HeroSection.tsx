import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, ExternalLink, Sparkles, Terminal, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { HeroCinematicCanvas } from '../3d/HeroCinematicCanvas';
import { soundManager } from '../common/SoundEffectManager';

export const HeroSection: React.FC = () => {
  const handleScrollTo = (targetId: string) => {
    soundManager.play('navClick');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden scroll-mt-20"
    >
      {/* Volumetric Red Atmosphere & Light Streaks */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#ff1e38]/18 via-[#880816]/10 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#ff1e38]/10 blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#880816]/12 blur-[110px] pointer-events-none -z-10" />

      {/* Cyber Grid Lines Backdrop */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Content (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Top HUD Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#150407] border border-[#ff1e38]/40 shadow-[0_0_20px_rgba(255,30,56,0.25)] w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#ff1e38] -ml-3" />
              <span className="font-mono text-xs font-semibold tracking-wider text-[#ff4d6d] uppercase">
                {PERSONAL_INFO.status} &bull; PRODUCTION READY
              </span>
            </motion.div>

            {/* Main Name & Hero Typography */}
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-mono text-xs sm:text-sm text-neutral-400 tracking-widest flex items-center gap-2 uppercase"
              >
                <Terminal className="w-4 h-4 text-[#ff1e38]" />
                CINEMATIC 3D DEVELOPER PORTFOLIO
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-[1.08]"
              >
                SRAVAN KUMAR <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-neutral-100 to-[#ff4d6d] bg-clip-text text-transparent">
                  NAREDLA
                </span>
              </motion.h1>

              {/* Professional Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex items-center gap-2 pt-1"
              >
                <span className="text-lg sm:text-2xl font-bold font-sans text-[#ff1e38] tracking-wide text-glow">
                  {PERSONAL_INFO.heroSubtitle}
                </span>
              </motion.div>
            </div>

            {/* Tagline Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="p-4 rounded-xl bg-[#0c0d14]/75 border-l-4 border-[#ff1e38] border-r border-t border-b border-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <p className="font-mono text-sm sm:text-base text-neutral-200 italic font-medium">
                "{PERSONAL_INFO.tagline}"
              </p>
            </motion.div>

            {/* Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl"
            >
              {PERSONAL_INFO.introduction}
            </motion.p>

            {/* CTA Buttons with Sound Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => handleScrollTo('projects')}
                onMouseEnter={() => soundManager.play('hover')}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ff1e38] via-[#e11d48] to-[#be123c] text-white font-sans font-bold text-sm shadow-[0_0_25px_rgba(255,30,56,0.5)] hover:shadow-[0_0_40px_rgba(255,30,56,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                onMouseEnter={() => soundManager.play('hover')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0e1017] hover:bg-[#161822] text-neutral-200 hover:text-white border border-[#ff1e38]/50 hover:border-[#ff1e38] font-sans font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_transparent] hover:shadow-[0_0_20px_rgba(255,30,56,0.3)] cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#ff1e38]" />
                <span>Contact Me</span>
              </button>

              <a
                href={PERSONAL_INFO.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.play('hover')}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-mono border border-white/10 transition-colors"
                title="Open Current Live Portfolio"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#ff4d6d]" />
                <span className="hidden sm:inline">Live Deployment</span>
              </a>
            </motion.div>

            {/* Social Links & Verified Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-4 pt-3 border-t border-white/10 text-neutral-400 text-xs font-mono"
            >
              <span className="text-neutral-500 uppercase tracking-wider">CHANNELS:</span>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.play('hover')}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-[#ff1e38] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-neutral-700">&bull;</span>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.play('hover')}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-[#ff1e38] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-neutral-700">&bull;</span>
              <span className="text-neutral-400">Hyderabad, IN</span>
            </motion.div>
          </div>

          {/* Right Column: The Cinematic 3D Portrait & Three.js Universe (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <HeroCinematicCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
