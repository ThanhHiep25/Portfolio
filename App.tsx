
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsPanel from './components/SettingsPanel';
import { AppSettings } from './types';
import { THEME_COLORS } from './constants';
import { motion } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';
import TemplatePage from './pages/TemplatePage';

const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth > 1024; // Hide intro on tablet/mobile
  });
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

  // Hide intro on tablet/mobile and keep it hidden if user resizes smaller
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setShowIntro(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 theme-transition relative overflow-hidden">
      {showIntro && <IntroScreen onIntroComplete={handleIntroComplete} primaryColor={THEME_COLORS[settings.primaryColor]?.hex} />}

      <Routes>
        <Route
          path="/"
          element={
            <PortfolioPage
              settings={settings}
              updateSettings={updateSettings}
              toggleSettings={toggleSettings}
            />
          }
        />
        <Route
          path="/template"
          element={
            <TemplatePage
              settings={settings}
              updateSettings={updateSettings}
              toggleSettings={toggleSettings}
            />
          }
        />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>

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
