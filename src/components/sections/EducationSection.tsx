import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle, BookOpen } from 'lucide-react';
import { EDUCATION_DATA } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Card3DTilt } from '../3d/Card3DTilt';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#ff1e38]/8 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 05. ACADEMIC FOUNDATION"
          title="Educational"
          highlightText="Background & Degrees"
          description="Formal engineering foundation providing analytical discipline, mathematical problem-solving, and continuous technology learning."
        />

        {/* Education Cards */}
        <div className="space-y-8 mt-12">
          {EDUCATION_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Card3DTilt maxTilt={5} className="glass-card border border-white/10 hover:border-[#ff1e38]/50">
                <div className="p-6 md:p-8 space-y-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#180407] border border-[#ff1e38]/40 flex items-center justify-center text-[#ff1e38] shrink-0 shadow-[0_0_15px_rgba(255,30,56,0.3)]">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                          {item.degree}
                        </h3>
                        <p className="text-sm md:text-base font-semibold text-[#ff4d6d] mt-1">
                          {item.institution}
                        </p>
                      </div>
                    </div>

                    {/* Timeline & Location */}
                    <div className="flex flex-col sm:flex-row md:flex-col sm:items-start md:items-end gap-2 text-xs font-mono text-neutral-400">
                      <div className="flex items-center gap-2 bg-[#12131c] px-3 py-1.5 rounded-lg border border-white/5">
                        <Calendar className="w-3.5 h-3.5 text-[#ff1e38]" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#ff1e38]" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                      Curriculum & Focus Areas:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#0c0d15]/70 border border-white/5 text-xs text-neutral-300 font-sans"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-[#ff1e38] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
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

