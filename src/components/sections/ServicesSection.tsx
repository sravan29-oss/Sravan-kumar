import React from 'react';
import { motion } from 'framer-motion';
import { Code, Atom, Smartphone, ShoppingBag, Network, Sparkles, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { SERVICES_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Card3DTilt } from '../3d/Card3DTilt';
import { soundManager } from '../common/SoundEffectManager';

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#ff1e38]" />;
      case 'Atom':
        return <Atom className="w-5 h-5 text-[#ff1e38]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#ff1e38]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-[#ff1e38]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#ff1e38]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#ff1e38]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#ff1e38]" />;
      default:
        return <Code className="w-5 h-5 text-[#ff1e38]" />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    soundManager.playClick();
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#ff1e38]/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 06. PRODUCTION SERVICES"
          title="Engineering Capabilities &"
          highlightText="Development Offerings"
          description="High-standard frontend engineering, component systems, and full-lifecycle web services delivered with precision and performance."
        />

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={idx === SERVICES_DATA.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <Card3DTilt
                maxTilt={8}
                className="h-full glass-card border border-white/10 hover:border-[#ff1e38]/50 flex flex-col justify-between"
              >
                <div className="p-6 md:p-8 space-y-5">
                  {/* Icon & Index Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#1a0509] border border-[#ff1e38]/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,30,56,0.25)]">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="font-mono text-xs text-neutral-500 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-glow transition-all">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-400 font-sans leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#ff1e38] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="px-6 py-4 bg-[#0a0b10] border-t border-white/5">
                  <button
                    onClick={() => handleInquire(service.title)}
                    onMouseEnter={() => soundManager.playHover()}
                    className="w-full text-xs font-mono text-[#ff4d6d] hover:text-white flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span>Request Service Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

