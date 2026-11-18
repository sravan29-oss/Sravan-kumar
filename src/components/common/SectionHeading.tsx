import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlightText?: string;
  description?: string;
  alignment?: 'center' | 'left';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightText,
  description,
  alignment = 'center',
}) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {/* HUD Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#160509] border border-[#ff1e38]/30 text-xs font-mono text-[#ff4d6d] tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(255,30,56,0.15)] ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38] -ml-2.5" />
        {badge}
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-white"
      >
        {title}{' '}
        {highlightText && (
          <span className="bg-gradient-to-r from-[#ff1e38] via-[#ff4d6d] to-[#ff8597] bg-clip-text text-transparent text-glow">
            {highlightText}
          </span>
        )}
      </motion.h2>

      {/* Subtitle / Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-neutral-400 font-sans leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Futuristic Center Divider Accent */}
      {isCenter && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e38] to-transparent mx-auto mt-6"
        />
      )}
    </div>
  );
};

