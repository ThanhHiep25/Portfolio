import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Template from '../components/Template';
import { AppSettings } from '../types';

interface TemplatePageProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  toggleSettings: () => void;
}

const TemplatePage: React.FC<TemplatePageProps> = ({ settings, updateSettings, toggleSettings }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
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
     

        <main>
          <Template />
        </main>
      </div>
    </>
  );
};

export default TemplatePage;
