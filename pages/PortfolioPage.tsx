import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import AIChat from '../components/AIChat';
import DonateQR from '../components/DonateQR';
import { AppSettings } from '../types';
import { THEME_COLORS } from '../constants';
import SEO from '../components/SEO';

interface PortfolioPageProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  toggleSettings: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ settings, updateSettings, toggleSettings }) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleProjectSelect = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      <SEO />
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
          <div id="projects">
            <Projects layout={settings.projectLayout} onProjectSelect={handleProjectSelect} />
          </div>
          <Skills />
          {/* <Testimonials /> */}
          <Contact />
        </main>
        {/* Donate QR Code */}
        {/* <DonateQR
          qrImage="/QR/QR-momo.jpg"
          donateLink="https://me.momo.vn/"
          title="Hỗ trợ dự án"
          description="Quét mã QR Momo hoặc nhấp vào liên kết để hỗ trợ"
        /> */}
        <AIChat />
      </div>
    </>
  );
};

export default PortfolioPage;
