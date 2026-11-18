import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { Background3DParticles } from './components/3d/Background3DParticles';
import { UltraCinematicSplash } from './components/common/UltraCinematicSplash';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ContactSection } from './components/sections/ContactSection';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [contactSubject, setContactSubject] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Ultra Cinematic Splash Screen: plays automatically when user opens or refreshes the site
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Toast handler
  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ScrollSpy to highlight active navigation link
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'services', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const elem = document.getElementById(id);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030304] text-neutral-100 overflow-x-hidden">
      {/* Ultra Cinematic Indian Epic Movie Opening Splash Screen */}
      {showSplash && (
        <UltraCinematicSplash onComplete={handleSplashComplete} />
      )}

      {/* Interactive Custom 3D Cursor */}
      <CustomCursor />

      {/* Floating 3D WebGL / Canvas Space Background Particles & Red Streaks */}
      <Background3DParticles />

      {/* Sticky Glassmorphism Header */}
      <Navbar activeSection={activeSection} onReplayIntro={() => setShowSplash(true)} />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ServicesSection onSelectService={(serviceTitle) => setContactSubject(`Inquiry: ${serviceTitle}`)} />
        <ContactSection initialSubject={contactSubject} onAddToast={addToast} />
      </main>

      {/* Cinematic Cyber Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
