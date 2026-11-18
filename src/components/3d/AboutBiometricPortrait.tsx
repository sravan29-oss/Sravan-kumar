import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../common/SoundEffectManager';

export const AboutBiometricPortrait: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: (-y / rect.height) * 10,
      y: (x / rect.width) * 10,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.play('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.015 : 1})`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative w-full h-[460px] md:h-[520px] rounded-3xl overflow-hidden glass-card border border-[#ff1e38]/40 shadow-[0_0_40px_rgba(255,30,56,0.25)] flex flex-col justify-between p-4 group select-none"
    >
      {/* Reticle & Tech Status Header */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-300 z-20 bg-[#07080d]/85 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
          <span className="text-[#ff4d6d] font-bold">BIOMETRIC_PROFILE // AUTHENTICATED</span>
        </div>
        <span className="text-neutral-400">HYD &bull; IN</span>
      </div>

      {/* Sravan's Portrait in Biometric Tech Composition */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <img
          src="/assets/sravan-portrait.png"
          alt="Sravan Kumar Naredla"
          className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />

        {/* Ambient Dark Bottom Gradient Mask (Keeps text readable over shirt, face 100% crystal clear) */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050508] via-[#050508]/85 to-transparent pointer-events-none" />

        {/* Crimson Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff1e38]/10 via-transparent to-[#ff1e38]/5 pointer-events-none" />
      </div>

      {/* Interactive Laser Scanning Line */}
      <div className="pointer-events-none absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff1e38] to-transparent z-10 animate-pulse" />

      {/* Bottom Info HUD & Badges (Positioned cleanly at bottom over shirt, completely away from face) */}
      <div className="relative z-20 space-y-2 mt-auto">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-[#07080d]/90 border border-[#ff1e38]/50 text-[10px] font-mono text-[#ff4d6d] backdrop-blur-md font-semibold shadow-[0_0_12px_rgba(255,30,56,0.25)]">
            FRONTEND_DEV
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#07080d]/90 border border-white/10 text-[10px] font-mono text-neutral-300 backdrop-blur-md font-semibold">
            REACT.JS ARCHITECTURE
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#07080d]/90 border border-white/10 backdrop-blur-md flex items-center justify-between font-mono text-xs text-neutral-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#ff1e38]" />
            <span>SRAVAN KUMAR NAREDLA</span>
          </div>
          <span className="text-[#ff1e38] font-bold">1+ YRS EXP</span>
        </div>
      </div>

      {/* Cyber Corner Brackets */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#ff1e38] pointer-events-none z-20" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#ff1e38] pointer-events-none z-20" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#ff1e38] pointer-events-none z-20" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#ff1e38] pointer-events-none z-20" />
    </div>
  );
};

