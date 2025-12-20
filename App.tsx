
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SettingsPanel from './components/SettingsPanel';
import AIChat from './components/AIChat';
import Testimonials from './components/Testimonials';
import { AppSettings } from './types';
import { THEME_COLORS } from './constants';
import { motion, useReducedMotion } from 'framer-motion';

const App: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('portfolio-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        accentColor: parsed.accentColor || THEME_COLORS[parsed.primaryColor]?.hoverHex || THEME_COLORS.emerald.hoverHex,
        projectLayout: parsed.projectLayout || 'grid'
      };
    }
    return {
      darkMode: false,
      primaryColor: 'emerald',
      accentColor: THEME_COLORS.emerald.hoverHex,
      animationsEnabled: true,
      projectLayout: 'grid',
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Global Smooth Scroll Interceptor
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // Check if it's an internal link
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetId = anchor.hash.replace('#', '');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const navbarHeight = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 800; // Thời gian cuộn (ms)
          let startTime: number | null = null;

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Subtle Easing: easeInOutQuad
            const ease = progress < 0.5 
              ? 2 * progress * progress 
              : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const preset = THEME_COLORS[settings.primaryColor];
    const primaryHex = preset ? preset.hex : settings.primaryColor;
    const accentHex = settings.accentColor;

    // Fast color darkening for active states
    const activeHex = darkenColor(accentHex, 15);

    root.style.setProperty('--primary-color', primaryHex);
    root.style.setProperty('--primary-hover', accentHex);
    root.style.setProperty('--primary-active', activeHex);
    root.style.setProperty('--primary-rgb', hexToRgb(primaryHex));

    localStorage.setItem('portfolio-settings', JSON.stringify(settings));
  }, [settings]);

  function darkenColor(hex: string, percent: number) {
    if (!hex.startsWith('#')) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const d = 1 - percent / 100;
    return `rgb(${Math.floor(r * d)}, ${Math.floor(g * d)}, ${Math.floor(b * d)})`;
  }

  function hexToRgb(hex: string) {
    if (!hex.startsWith('#')) return '16, 185, 129';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.primaryColor && THEME_COLORS[newSettings.primaryColor]) {
        updated.accentColor = THEME_COLORS[newSettings.primaryColor].hoverHex;
      }
      return updated;
    });
  }, []);

  const toggleSettings = useCallback(() => {
    setIsSettingsOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 theme-transition relative overflow-x-hidden">
      {/* Performance Optimized Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: settings.darkMode ? 0.12 : 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full gpu-accelerated"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: shouldReduceMotion ? 'none' : 'blur(100px) saturate(1.1)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <Navbar toggleSettings={toggleSettings} />
        
        <main>
          <Hero />     
          <About />
          <Projects layout={settings.projectLayout} />
          <Skills />
          <Testimonials />
          <Contact />
        </main>

        <AIChat />
      </div>
      
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
      />
    </div>
  );
};

export default App;
