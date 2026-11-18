import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sparkles, Send, Clapperboard } from 'lucide-react';
import { soundManager } from './SoundEffectManager';

interface NavbarProps {
  activeSection: string;
  onReplayIntro?: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onReplayIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isNowOn = soundManager.toggle();
    setSoundEnabled(isNowOn);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.play('navClick');
    setMobileMenuOpen(false);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const navOffset = 75;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#050608]/85 backdrop-blur-xl border-b border-[#ff1e38]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Sravan's Mini Portrait Avatar */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#ff1e38]/60 shadow-[0_0_15px_rgba(255,30,56,0.3)] group-hover:border-[#ff1e38] group-hover:shadow-[0_0_25px_rgba(255,30,56,0.6)] transition-all">
              <img
                src="/assets/sravan-portrait.png"
                alt="Sravan Kumar Naredla"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ff1e38] shadow-[0_0_8px_#ff1e38]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-glow transition-all">
                SRAVAN KUMAR
              </span>
              <span className="font-mono text-[10px] text-[#ff4d6d] tracking-widest uppercase">
                FRONTEND ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#0c0d14]/75 border border-white/5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => soundManager.play('hover')}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors font-sans rounded-full cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-[#ff1e38]/20 border border-[#ff1e38]/60 shadow-[0_0_15px_rgba(255,30,56,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Replay Cinematic Intro Button */}
            {onReplayIntro && (
              <button
                onClick={() => {
                  soundManager.play('cinematicImpact');
                  onReplayIntro();
                }}
                onMouseEnter={() => soundManager.play('hover')}
                className="p-2.5 rounded-xl bg-[#0f1016]/80 border border-white/10 text-neutral-400 hover:text-white hover:border-[#ff1e38]/50 transition-all cursor-pointer"
                title="Replay Cinematic Intro"
                aria-label="Replay Cinematic Intro"
              >
                <Clapperboard className="w-4 h-4 text-[#ff4d6d]" />
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => soundManager.play('hover')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#2b0811] border-[#ff1e38] text-[#ff4d6d] shadow-[0_0_15px_rgba(255,30,56,0.35)]'
                  : 'bg-[#0f1016]/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
              title={soundEnabled ? 'Mute Audio System' : 'Enable Cinematic Audio (Web Audio API)'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Quick Contact Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseEnter={() => soundManager.play('hover')}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-sans tracking-wide text-white bg-gradient-to-r from-[#e11d48] to-[#ff1e38] hover:from-[#ff1e38] hover:to-[#ff4d6d] transition-all duration-300 shadow-[0_0_20px_rgba(255,30,56,0.45)] hover:shadow-[0_0_30px_rgba(255,30,56,0.7)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled
                  ? 'bg-[#2b0811] border-[#ff1e38] text-[#ff4d6d]'
                  : 'bg-[#0f1016] border-white/10 text-neutral-400'
              }`}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                soundManager.play('buttonClick');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-[#0e1017] border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#07080c]/95 border-b border-[#ff1e38]/30 backdrop-blur-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          >
            <div className="px-6 py-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#ff1e38]/20 text-[#ff4d6d] border border-[#ff1e38]/40 font-bold'
                          : 'bg-[#11131c] text-neutral-300 hover:text-white hover:bg-[#1a1c29]'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-[#ff1e38] to-[#e11d48] text-white font-semibold text-sm shadow-[0_0_20px_rgba(255,30,56,0.5)] cursor-pointer"
                >
                  Contact Sravan
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
