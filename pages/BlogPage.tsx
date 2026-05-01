import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import AIChat from '../components/AIChat';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { AppSettings } from '../types';

interface BlogPageProps {
  settings: AppSettings;
  toggleSettings: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ settings, toggleSettings }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO title="Blog - Kiến thức & Chia sẻ" description="Khám phá các bài viết kỹ thuật chuyên sâu về React, UI/UX và AI." />
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="relative z-10">
        <main className="pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Blog />
          </motion.div>
          
          <Contact />
        </main>
      </div>
    </>
  );
};

export default BlogPage;
