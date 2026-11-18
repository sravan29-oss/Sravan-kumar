import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#ff1e38]/8 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 02. CAREER TRAJECTORY"
          title="Professional"
          highlightText="Work Experience"
          description="Direct production experience developing responsive web applications, integrating full-stack APIs, and building customer-facing digital products."
        />

        {/* Timeline Container */}
        <div className="relative mt-12 space-y-12">
          {/* Vertical Central Line on Desktop */}
          <div className="hidden md:block absolute left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#ff1e38] via-[#880816] to-transparent pointer-events-none" />

          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-0 md:pl-20"
            >
              {/* Timeline Red Glowing Marker Node */}
              <div className="hidden md:flex absolute left-8 -translate-x-1/2 top-8 w-6 h-6 rounded-full bg-[#0a0a0f] border-2 border-[#ff1e38] items-center justify-center shadow-[0_0_15px_#ff1e38] z-20">
                <span className={`w-2 h-2 rounded-full ${exp.current ? 'bg-[#ff1e38] animate-ping' : 'bg-[#ff4d6d]'}`} />
              </div>

              {/* 3D Tilt Experience Card */}
              <Card3DTilt maxTilt={6} className="glass-card border border-white/10 hover:border-[#ff1e38]/50">
                <div className="p-6 md:p-8 space-y-6">
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#20050a] border border-[#ff1e38] text-[11px] font-mono text-[#ff4d6d] font-semibold flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,30,56,0.3)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] animate-ping" />
                            Active Role
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-400">
                          {exp.type}
                        </span>
                      </div>

                      <div className="text-base md:text-lg font-semibold text-[#ff4d6d] mt-1 flex items-center gap-2">
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Metadata: Date & Location */}
                    <div className="flex flex-col sm:flex-row md:flex-col sm:items-start md:items-end gap-2 text-xs font-mono text-neutral-400">
                      <div className="flex items-center gap-2 bg-[#12131c] px-3 py-1.5 rounded-lg border border-white/5">
                        <Calendar className="w-3.5 h-3.5 text-[#ff1e38]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#ff1e38]" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#ff1e38]" />
                      Key Responsibilities & Contributions
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {exp.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-[#0c0d15]/60 border border-white/5 text-xs md:text-sm text-neutral-300 font-sans leading-relaxed"
                        >
                          <ChevronRight className="w-4 h-4 text-[#ff1e38] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Used Tags */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500 mr-2">TECH DEPLOYED:</span>
                    {exp.skillsUsed.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-[#140609] border border-[#ff1e38]/30 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
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

