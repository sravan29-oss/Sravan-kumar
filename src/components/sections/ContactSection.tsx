import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Copy, Check, ExternalLink, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SectionHeading } from '../common/SectionHeading';
import { Card3DTilt } from '../3d/Card3DTilt';
import { soundManager } from '../common/SoundEffectManager';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  initialSubject?: string;
  onAddToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '', onAddToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // Sync if initialSubject changes
  React.useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject for your message';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!validate()) {
      onAddToast('Validation Error', 'Please check the required fields in the form', 'error');
      return;
    }

    setIsSubmitting(true);
    setSubmittedStatus(null);

    try {
      // Direct Web3Forms submission to Sravan's verified Gmail inbox
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b271ccc3-1d7c-46cf-94b6-5de6c0133423',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: `Portfolio Visitor: ${formData.name}`,
          botcheck: '',
        }),
      });

      const data = await response.json();

      if (data.success) {
        try {
          confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#ff1e38', '#ff4d6d', '#ffffff', '#10b981'],
          });
        } catch {
          // Confetti fallback
        }

        setSubmittedStatus('Transmission delivered directly to Sravan\'s Gmail inbox! Thank you for reaching out.');
        onAddToast('Message Delivered', 'Your inquiry was sent directly to Sravan\'s Gmail inbox.', 'success');

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Web3Forms API transmission failed');
      }
    } catch (err: unknown) {
      console.warn('[Web3Forms Notice]', err);

      // Resilient fallback to mailto draft + clipboard backup
      const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
      const emailBody = encodeURIComponent(
        `Hello Sravan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent from Sravan Kumar Naredla 3D Developer Portfolio`
      );
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

      navigator.clipboard?.writeText(
        `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
      ).catch(() => {});

      window.location.href = mailtoUrl;

      onAddToast('Draft Prepared in Email Client', 'Your email app was opened with your message pre-filled.', 'info');
      setSubmittedStatus('Opened email client draft to send directly to naredlasravankumar29@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    soundManager.playClick();
    navigator.clipboard?.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
      onAddToast('Copied to Clipboard', PERSONAL_INFO.email, 'success');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
      onAddToast('Copied to Clipboard', PERSONAL_INFO.phone, 'success');
    }
  };

  const getWhatsAppUrl = () => {
    const cleanPhone = PERSONAL_INFO.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hi Sravan, I came across your portfolio website and would like to discuss a frontend opportunity.`
    );
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#ff1e38]/10 via-[#880816]/5 to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// 07. TRANSMIT MESSAGE"
          title="Initiate Direct"
          highlightText="Contact & Collaboration"
          description="Have a role, freelance project, or architectural inquiry? Connect directly via verified email, phone, WhatsApp, or the transmission form."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Cards & Quick Connect (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card3DTilt maxTilt={6} className="glass-card border border-white/10 hover:border-[#ff1e38]/50 p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#ff4d6d] uppercase tracking-wider block">
                  COMMUNICATION CHANNELS
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  Direct Coordinates
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 font-sans leading-relaxed">
                  Fastest response times via direct email and WhatsApp message. Open for remote and Hyderabad-based opportunities.
                </p>
              </div>

              {/* Contact List */}
              <div className="space-y-4 pt-2">
                {/* Email Item */}
                <div className="p-4 rounded-xl bg-[#0c0d15] border border-white/5 flex items-center justify-between gap-3 group hover:border-[#ff1e38]/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#180407] border border-[#ff1e38]/40 flex items-center justify-center text-[#ff1e38] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Primary Email</span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs md:text-sm font-semibold text-white hover:text-[#ff4d6d] block truncate transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#ff1e38] text-neutral-400 hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-xl bg-[#0c0d15] border border-white/5 flex items-center justify-between gap-3 group hover:border-[#ff1e38]/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#180407] border border-[#ff1e38]/40 flex items-center justify-center text-[#ff1e38] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Voice & WhatsApp</span>
                      <a
                        href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-xs md:text-sm font-semibold text-white hover:text-[#ff4d6d] block truncate transition-colors"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#ff1e38] text-neutral-400 hover:text-white transition-colors shrink-0"
                    title="Copy Phone Number"
                    aria-label="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-4 rounded-xl bg-[#0c0d15] border border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#180407] border border-[#ff1e38]/40 flex items-center justify-center text-[#ff1e38] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Operational Base</span>
                    <p className="text-xs md:text-sm font-semibold text-white">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Actions: WhatsApp & External Portfolio */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e1a14] hover:bg-[#122e1f] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={PERSONAL_INFO.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono font-semibold transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[#ff1e38]" />
                  <span>Live Portfolio</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>SOCIAL PROFILES:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-neutral-300 hover:text-[#ff1e38] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-neutral-700">•</span>
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-neutral-300 hover:text-[#ff1e38] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Card3DTilt>
          </div>

          {/* Right Column: Contact Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card3DTilt maxTilt={5} className="glass-card border border-white/10 hover:border-[#ff1e38]/50 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
                    <span className="text-xs font-mono text-[#ff4d6d]">TRANSMISSION TERMINAL</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
                    Send a Message
                  </h3>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 flex items-center gap-1">
                      <span>Full Name</span>
                      <span className="text-[#ff1e38]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0c0d14] border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#ff1e38] transition-all ${
                        errors.name ? 'border-[#ff1e38]' : 'border-white/10 focus:border-[#ff1e38]'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] font-mono text-[#ff4d6d] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 flex items-center gap-1">
                      <span>Email Address</span>
                      <span className="text-[#ff1e38]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0c0d14] border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#ff1e38] transition-all ${
                        errors.email ? 'border-[#ff1e38]' : 'border-white/10 focus:border-[#ff1e38]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] font-mono text-[#ff4d6d] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 flex items-center gap-1">
                    <span>Subject / Project Inquiry</span>
                    <span className="text-[#ff1e38]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Frontend Developer Role / React Application Project"
                    className={`w-full px-4 py-3 rounded-xl bg-[#0c0d14] border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#ff1e38] transition-all ${
                      errors.subject ? 'border-[#ff1e38]' : 'border-white/10 focus:border-[#ff1e38]'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] font-mono text-[#ff4d6d] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 flex items-center gap-1">
                    <span>Your Message</span>
                    <span className="text-[#ff1e38]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, technical scope, or opportunity..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#0c0d14] border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#ff1e38] transition-all resize-none ${
                      errors.message ? 'border-[#ff1e38]' : 'border-white/10 focus:border-[#ff1e38]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] font-mono text-[#ff4d6d] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Feedback Notification */}
                {submittedStatus && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-400 font-mono flex items-start gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                    <span>{submittedStatus}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => soundManager.playHover()}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-[#ff1e38] via-[#e11d48] to-[#be123c] text-white font-sans font-bold text-sm shadow-[0_0_25px_rgba(255,30,56,0.5)] hover:shadow-[0_0_40px_rgba(255,30,56,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>

                <p className="text-[11px] font-mono text-neutral-400 text-center">
                  Direct encrypted transmission to Sravan's inbox (<span className="text-white">naredlasravankumar29@gmail.com</span>) via Web3Forms API.
                </p>
              </form>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
};

