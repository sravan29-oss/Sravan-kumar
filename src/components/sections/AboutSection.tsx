import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle2, Layers, Cpu, Sparkles, Compass, Code, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { AboutBiometricPortrait } from '../3d/AboutBiometricPortrait';
import { ResumeModal } from '../common/ResumeModal';
import { soundManager } from '../common/SoundEffectManager';

export const AboutSection: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => {
    soundManager.play('buttonClick');
    setIsResumeOpen(true);
  };

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#ff1e38]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 01. PROFILE & ENGINEERING PHILOSOPHY"
          title="Architecting Resilient"
          highlightText="Digital Interfaces"
          description="A look into my engineering background, core design principles, and drive for delivering practical, user-centric web applications."
        />

        {/* Top Grid: Narrative & Biometric Holographic Portrait Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Narrative Content (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-6 md:p-8 rounded-2xl glass-card border border-[#ff1e38]/30 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff4d6d]">
                <Cpu className="w-4 h-4 text-[#ff1e38]" />
                <span>EXPERT FOCUS // COMPONENT ARCHITECTURE</span>
              </div>

              <p className="text-base md:text-lg text-white font-sans leading-relaxed">
                {PERSONAL_INFO.aboutDetails[0]}
              </p>

              <p className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed">
                {PERSONAL_INFO.aboutDetails[1]}
              </p>

              {/* Action Button: Download Resume */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleOpenResume}
                  onMouseEnter={() => soundManager.play('hover')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff1e38] to-[#e11d48] text-white font-sans font-semibold text-sm shadow-[0_0_20px_rgba(255,30,56,0.45)] hover:shadow-[0_0_30px_rgba(255,30,56,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume / CV</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-[#ff1e38]" />
                  <span>Verified Experience & Education</span>
                </div>
              </div>
            </div>

            {/* Development Interests */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#ff1e38]" />
                Key Development Interests
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PERSONAL_INFO.developmentInterests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0b0c12]/80 border border-white/5 hover:border-[#ff1e38]/40 transition-colors flex items-start gap-2.5 text-xs text-neutral-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1e38] shrink-0 mt-0.5" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sravan's Biometric Photographic Tech Composition (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <AboutBiometricPortrait />
          </motion.div>
        </div>

        {/* Experience Highlights Deck */}
        <div className="mt-14 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ff1e38]" />
              Engineering Highlights in Production
            </h4>
            <span className="text-xs font-mono text-[#ff4d6d]">LIVE COMMERCIAL IMPACT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAL_INFO.experienceHighlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-xl bg-[#0d0e15]/90 border border-white/5 hover:border-[#ff1e38]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a0509] border border-[#ff1e38]/40 flex items-center justify-center text-[#ff4d6d] font-mono text-xs font-bold group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 font-sans leading-relaxed">
                    {highlight}
                  </p>
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-[#ff1e38]/40 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Bar (1+ yrs Frontend Expertise) */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#11131c]/80 to-[#08090e]/80 border border-white/10 hover:border-[#ff1e38]/60 transition-all text-center relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                {/* Glowing Radar Beacon in Top Left */}
                <div className="absolute top-3.5 left-3.5 flex items-center justify-center pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#ff1e38] shadow-[0_0_12px_#ff1e38]" />
                  <span className="absolute w-5 h-5 rounded-full border border-[#ff1e38]/30 animate-ping opacity-60" />
                  <span className="absolute w-7 h-7 rounded-full border border-[#ff1e38]/20" />
                </div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff1e38]/10 rounded-bl-full pointer-events-none group-hover:bg-[#ff1e38]/20 transition-colors blur-lg" />

                <div className="text-3xl md:text-5xl font-black font-display text-white tracking-tight mt-1">
                  <span className="text-glow">{stat.value}</span>
                  <span className="text-[#ff1e38] text-2xl md:text-3xl ml-0.5">{stat.suffix}</span>
                </div>

                <h5 className="font-semibold text-xs md:text-sm text-neutral-200 mt-2 font-sans tracking-wide">
                  {stat.label}
                </h5>

                <p className="text-[11px] font-mono text-neutral-400 mt-1 line-clamp-1">
                  {stat.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};
