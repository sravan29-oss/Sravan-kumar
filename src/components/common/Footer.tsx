import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Heart, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundManager } from './SoundEffectManager';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040407] border-t border-[#ff1e38]/20 pt-16 pb-12 overflow-hidden z-20">
      {/* Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-b from-[#ff1e38]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b050a] to-[#0c0d12] border border-[#ff1e38]/60 flex items-center justify-center shadow-[0_0_15px_rgba(255,30,56,0.4)]">
                <span className="font-display font-black text-sm text-white">SK</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white tracking-wide">
                  {PERSONAL_INFO.name.toUpperCase()}
                </h3>
                <p className="text-xs font-mono text-[#ff4d6d]">
                  {PERSONAL_INFO.heroSubtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-sm">
              "{PERSONAL_INFO.tagline}" Crafting high-performance, user-friendly, and interactive web applications with cutting-edge frontend architecture.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="w-10 h-10 rounded-xl bg-[#0f1118] border border-white/10 hover:border-[#ff1e38] flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-[0_0_10px_transparent] hover:shadow-[0_0_15px_rgba(255,30,56,0.4)]"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="w-10 h-10 rounded-xl bg-[#0f1118] border border-white/10 hover:border-[#ff1e38] flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-[0_0_10px_transparent] hover:shadow-[0_0_15px_rgba(255,30,56,0.4)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onMouseEnter={() => soundManager.playHover()}
                className="w-10 h-10 rounded-xl bg-[#0f1118] border border-white/10 hover:border-[#ff1e38] flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-[0_0_10px_transparent] hover:shadow-[0_0_15px_rgba(255,30,56,0.4)]"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="w-10 h-10 rounded-xl bg-[#0f1118] border border-white/10 hover:border-[#ff1e38] flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-[0_0_10px_transparent] hover:shadow-[0_0_15px_rgba(255,30,56,0.4)]"
                aria-label="Current Live Portfolio"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff1e38] rounded-full" />
              System Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400 font-sans">
              <li>
                <a href="#about" className="hover:text-[#ff4d6d] transition-colors">About Story</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#ff4d6d] transition-colors">Career Timeline</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#ff4d6d] transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#ff4d6d] transition-colors">Technical Stack</a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#ff4d6d] transition-colors">Education & Academics</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff1e38] rounded-full" />
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400 font-sans">
              <li>Frontend Web Apps</li>
              <li>React.js Architecture</li>
              <li>Responsive UI/UX</li>
              <li>E-Commerce Workflows</li>
              <li>REST API Integration</li>
            </ul>
          </div>

          {/* Col 5: Direct Communication */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff1e38] rounded-full" />
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff1e38] mt-0.5 shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white break-all">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ff1e38] shrink-0" />
                <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ff1e38] shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#140608] border border-[#ff1e38]/30 text-[11px] font-mono text-[#ff4d6d]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] animate-ping" />
                <span>Available for New Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#ff1e38]" />
            <span>
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-600 hidden md:inline">
              STACK: React + TypeScript + Three.js + Tailwind
            </span>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1017] hover:bg-[#ff1e38] text-neutral-400 hover:text-white border border-white/10 hover:border-[#ff1e38] transition-all duration-200"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

