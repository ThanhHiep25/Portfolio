import React, { useEffect, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { AppSettings } from '../types';

// Lazy load non-critical sections
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

const SectionLoader = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

interface PortfolioPageProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  toggleSettings: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ settings, updateSettings, toggleSettings }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Handle automatic scroll based on URL path
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path) {
      const element = document.getElementById(path);
      if (element) {
        const navbarHeight = 80;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    } else if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [location.pathname]);

  const handleProjectSelect = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nguyễn Hiệp",
    "jobTitle": "Software Engineer",
    "url": "https://nguyenhiep.dev/",
    "sameAs": [
      "https://github.com/ThanhHiep25",
      "https://linkedin.com/in/nguyenthanhhiep"
    ],
    "knowsAbout": ["ReactJS", "NextJS", "Spring Boot", "Full-stack Development"]
  };

  return (
    <>
      <SEO schema={portfolioSchema} />
      
      {/* Performance Optimized Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: settings.darkMode ? 0.12 : 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full gpu-accelerated"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: shouldReduceMotion ? 'none' : 'blur(100px) saturate(1.1)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        <main>
          <div id="home"><Hero /></div>
          
          <Suspense fallback={<SectionLoader />}>
            <div id="about"><About /></div>
            <div id="projects">
              <Projects layout={settings.projectLayout} onProjectSelect={handleProjectSelect} />
            </div>
            <div id="skills"><Skills /></div>
            <div id="contact"><Contact /></div>
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default PortfolioPage;
