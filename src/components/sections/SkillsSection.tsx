import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Cpu, Wrench, Sparkles, Check, Terminal, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Card3DTilt } from '../3d/Card3DTilt';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#ff1e38]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#ff1e38]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#ff1e38]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#ff1e38]" />;
      default:
        return <Layers className="w-5 h-5 text-[#ff1e38]" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Volumetric Light */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#ff1e38]/8 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#880816]/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 04. TECHNICAL ARSENAL"
          title="Core Technologies &"
          highlightText="Engineering Stack"
          description="A structured overview of core competencies across frontend frameworks, backend integrations, state management, and modern developer tooling."
        />

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              <Card3DTilt maxTilt={6} className="h-full glass-card border border-white/10 hover:border-[#ff1e38]/40">
                <div className="p-6 md:p-8 space-y-6">
                  {/* Category Header */}
                  <div className="flex items-start gap-4 border-b border-white/10 pb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1a0509] border border-[#ff1e38]/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,30,56,0.25)] shrink-0">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List in Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.02 }}
                        className="p-3 rounded-xl bg-[#0c0d14] border border-white/5 hover:border-[#ff1e38]/40 transition-all duration-200 group flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm text-neutral-200 group-hover:text-white group-hover:text-glow transition-colors">
                            {skill.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] group-hover:shadow-[0_0_8px_#ff1e38]" />
                        </div>

                        {/* Descriptive Expertise Level (No Fake % Numbers) */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] font-mono">
                          <span className="text-[#ff4d6d]">{skill.level}</span>
                          <span className="text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded">
                            {skill.tag}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Category Footer Indicator */}
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#ff1e38]" />
                      MODERN ARCHITECTURE READY
                    </span>
                    <span className="text-[#ff4d6d]">100% PRODUCTION TESTED</span>
                  </div>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

