import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, CheckCircle, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_DATA, FEATURED_PROJECTS } from '../../data/portfolioData';
import { soundManager } from './SoundEffectManager';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownloadText = () => {
    soundManager.playClick();
    const resumeText = `
=====================================================
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.heroSubtitle}
=====================================================
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
Portfolio: ${PERSONAL_INFO.portfolioUrl}
Location: ${PERSONAL_INFO.location}

PROFESSIONAL SUMMARY:
${PERSONAL_INFO.introduction}

PROFESSIONAL EXPERIENCE:
${EXPERIENCES.map(
  (exp) => `
• ${exp.role} | ${exp.company}
  ${exp.location} | ${exp.period}
  Responsibilities:
  ${exp.responsibilities.map((r) => `  - ${r}`).join('\n')}
`
).join('')}

FEATURED PROJECTS:
${FEATURED_PROJECTS.map(
  (p) => `
• ${p.title} (${p.category})
  ${p.websiteUrl ? `Live URL: ${p.websiteUrl}` : 'Internal Production System'}
  Tech: ${p.technologies.join(', ')}
  Description: ${p.description}
  Key Focus:
  ${p.keyAreas.map((k) => `  - ${k}`).join('\n')}
`
).join('')}

EDUCATION:
${EDUCATION_DATA.map(
  (edu) => `
• ${edu.degree}
  ${edu.institution} (${edu.location}) | ${edu.period}
`
).join('')}
=====================================================
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sravan_Kumar_Naredla_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#090a0f] border border-[#ff1e38]/40 rounded-2xl shadow-[0_0_50px_rgba(255,30,56,0.25)] flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0e1017]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e38] animate-ping" />
                <h3 className="font-display font-bold text-lg md:text-xl text-white tracking-wide">
                  RESUME // <span className="text-[#ff1e38]">{PERSONAL_INFO.name}</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadText}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#161822] hover:bg-[#ff1e38] text-neutral-300 hover:text-white border border-white/10 transition-colors"
                  title="Download plain text copy"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#161822] hover:bg-[#ff1e38] text-neutral-300 hover:text-white border border-white/10 transition-colors"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Resume Document */}
            <div className="p-6 md:p-10 overflow-y-auto space-y-8 text-neutral-200 font-sans text-sm md:text-base leading-relaxed">
              {/* Header Info */}
              <div className="border-b border-white/10 pb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white font-display tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-[#ff4d6d] font-mono text-sm md:text-base font-semibold mt-1">
                  {PERSONAL_INFO.heroSubtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#ff1e38]" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white truncate">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#ff1e38]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ff1e38]" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-[#ff1e38]" />
                    <a href={PERSONAL_INFO.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white truncate">
                      Portfolio Link
                    </a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff1e38] font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ff1e38] rounded-sm" />
                  Professional Summary
                </h2>
                <p className="text-neutral-300 leading-relaxed text-sm">
                  {PERSONAL_INFO.introduction}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff1e38] font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-[#ff1e38]/40">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-bold text-white text-base font-display">{exp.role}</h3>
                        <span className="text-xs font-mono text-[#ff4d6d] bg-[#1a080d] px-2 py-0.5 rounded border border-[#ff1e38]/20">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-neutral-400 mb-2">
                        {exp.company} — {exp.location}
                      </p>
                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-neutral-300">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff1e38] font-bold mb-4 flex items-center gap-2">
                  <Code className="w-3.5 h-3.5" />
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FEATURED_PROJECTS.map((proj) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-[#0f1118] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm font-display">{proj.title}</h4>
                        {proj.websiteUrl && (
                          <a
                            href={proj.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ff1e38] text-xs flex items-center gap-1 hover:underline font-mono"
                          >
                            Live <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-[#ff4d6d]">{proj.category}</p>
                      <p className="text-xs text-neutral-300 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 bg-black/50 text-neutral-400 text-[10px] rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-[#ff1e38] font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Education
                </h2>
                <div className="space-y-3">
                  {EDUCATION_DATA.map((edu) => (
                    <div key={edu.id} className="flex flex-wrap items-start justify-between gap-1 text-xs">
                      <div>
                        <span className="font-semibold text-white">{edu.degree}</span>
                        <p className="text-neutral-400 font-mono">{edu.institution}, {edu.location}</p>
                      </div>
                      <span className="font-mono text-neutral-500">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0e1017] flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#ff1e38]" />
                Verified & Production Authenticated
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#ff1e38] hover:bg-[#d90429] text-white font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(255,30,56,0.4)]"
              >
                Close Viewer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

