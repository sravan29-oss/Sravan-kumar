import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, CheckCircle2, X, Sparkles, Server, ShieldCheck, ArrowUpRight, Cpu, Smartphone, Globe } from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { SectionHeading } from '../common/SectionHeading';
import { Card3DTilt } from '../3d/Card3DTilt';
import { soundManager } from '../common/SoundEffectManager';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectModal = (project: Project) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    soundManager.playClick();
    setSelectedProject(null);
  };

  const renderLinkButton = (project: Project) => {
    if (!project.websiteUrl) return null;

    const isPlayStore = project.linkType === 'playstore';
    const label = project.linkLabel || (isPlayStore ? 'Google Play' : 'Live Demo');

    return (
      <a
        href={project.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => soundManager.playHover()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a070c] border border-[#ff1e38]/50 text-[#ff4d6d] hover:bg-[#ff1e38] hover:text-white transition-all shadow-[0_0_15px_rgba(255,30,56,0.25)] hover:shadow-[0_0_25px_rgba(255,30,56,0.6)] text-xs font-mono font-semibold"
        title={`Open ${project.title} on ${isPlayStore ? 'Google Play Store' : 'Web'}`}
        aria-label={`Open ${project.title}`}
      >
        {isPlayStore ? (
          <Smartphone className="w-3.5 h-3.5 text-[#ff1e38] group-hover:text-white" />
        ) : (
          <Globe className="w-3.5 h-3.5 text-[#ff1e38] group-hover:text-white" />
        )}
        <span>{label}</span>
        <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
      </a>
    );
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#ff1e38]/10 via-[#880816]/5 to-transparent blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 03. CORE PRODUCTION PORTFOLIO"
          title="Featured Commercial &"
          highlightText="Production Platforms"
          description="A showcase of production-ready digital platforms engineered with React.js, TypeScript, REST API integrations, and modern component architectures deployed on Web and Mobile."
        />

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {FEATURED_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Card3DTilt
                maxTilt={8}
                className={`h-full glass-card border flex flex-col justify-between ${
                  project.isLatestFeatured
                    ? 'border-[#ff1e38]/70 shadow-[0_0_30px_rgba(255,30,56,0.25)]'
                    : 'border-white/10 hover:border-[#ff1e38]/50'
                }`}
              >
                <div className="p-6 md:p-8 space-y-6">
                  {/* Card Header & Badges */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {project.isLatestFeatured && (
                          <span className="px-3 py-1 rounded-full bg-[#24050a] border border-[#ff1e38] text-[11px] font-mono text-[#ff4d6d] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,30,56,0.4)]">
                            <Sparkles className="w-3 h-3 text-[#ff1e38] animate-spin" style={{ animationDuration: '6s' }} />
                            LATEST FEATURED PROJECT
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-400">
                          {project.status}
                        </span>
                        {project.linkType === 'playstore' && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                            <Smartphone className="w-3 h-3" />
                            Play Store App
                          </span>
                        )}
                        {project.linkType === 'web' && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Web Application
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-glow transition-all pt-1">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-[#ff4d6d]">
                        {project.category}
                      </p>
                    </div>

                    {/* Header Action Button */}
                    <div className="shrink-0">
                      {renderLinkButton(project)}
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Development Highlights (Preview Top 4) */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                      Key Development Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.keyAreas.slice(0, 4).map((area, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-lg bg-[#0e1017] border border-white/5 text-xs text-neutral-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1e38] shrink-0" />
                          <span className="truncate">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                      Technologies & Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#12131c] border border-white/10 text-xs font-mono text-neutral-300 hover:border-[#ff1e38]/40 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="px-6 py-4 bg-[#0a0b10] border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => openProjectModal(project)}
                    onMouseEnter={() => soundManager.playHover()}
                    className="text-xs font-mono text-[#ff4d6d] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group"
                  >
                    <span>View Architecture Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-400 hover:text-[#ff1e38] flex items-center gap-1.5"
                    >
                      <span>{project.linkType === 'playstore' ? 'Play Store' : 'Live Demo'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Project Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#090a10] border border-[#ff1e38]/50 rounded-2xl shadow-[0_0_60px_rgba(255,30,56,0.3)] overflow-hidden z-10 p-6 md:p-8 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e38] animate-ping" />
                    <span className="text-xs font-mono text-[#ff4d6d] uppercase">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold font-display text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={closeProjectModal}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#ff1e38] font-bold">
                  Overview
                </h4>
                <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* All Key Development Areas */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#ff1e38] font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Key Development Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.keyAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#0f1118] border border-white/5 flex items-start gap-2.5 text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff1e38] shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#ff1e38] font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-[#140609] border border-[#ff1e38]/30 text-xs font-mono text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform Metrics */}
              {selectedProject.metrics && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#ff1e38] font-bold flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Architecture Specs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedProject.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 rounded-xl bg-[#0e1017] border border-white/5">
                        <span className="text-[10px] font-mono text-neutral-400 block">{m.label}</span>
                        <span className="text-xs font-semibold text-white font-mono mt-0.5 block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {selectedProject.websiteUrl ? (
                  <a
                    href={selectedProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff1e38] to-[#e11d48] text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,30,56,0.4)] hover:shadow-[0_0_30px_rgba(255,30,56,0.7)] transition-all"
                  >
                    <span>
                      {selectedProject.linkType === 'playstore'
                        ? 'Open in Google Play Store'
                        : 'Launch Live Web App'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-neutral-500">
                    Production Enterprise System
                  </span>
                )}

                <button
                  onClick={closeProjectModal}
                  className="px-4 py-2 rounded-xl bg-[#141620] hover:bg-white/10 text-neutral-300 text-xs font-mono transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
