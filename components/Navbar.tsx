
import React, { useState, useEffect } from 'react';
import { Menu, X, Settings2, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import userAbout from '../data/dataAbout';

interface NavbarProps {
  toggleSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const user = userAbout[0];
  const firstName = user.name.split(' ').pop()?.toUpperCase() || 'USER';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-200/20 dark:border-white/5'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white flex items-center gap-1 group"
            >
              <span className="group-hover:text-primary transition-colors">{firstName}</span>
              <span className="text-primary group-hover:text-gray-900 dark:group-hover:text-white transition-colors">.DEV</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center space-x-1">
              {NAVIGATION.map((item) => {
                const isTemplateLink = item.href === '#blog';
                return isTemplateLink ? (
                  <Link
                    key={item.name}
                    to="/template"
                    className={`text-sm font-bold tracking-tight px-4 py-2 rounded-full transition-all ${location.pathname === '/template'
                      ? 'text-primary bg-gray-100 dark:bg-white/5'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary px-4 py-2 rounded-full text-sm font-bold tracking-tight transition-all hover:bg-gray-100 dark:hover:bg-white/5 active:text-primary-hover"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
            <motion.button
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.2)",
                backgroundColor: "var(--gray-100)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open('/template', '_auto');
              }}
              className="
              px-4 py-2 rounded-full bg- transition-colors
              flex items-center justify-center
              text-sm font-bold tracking-tight text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 active:text-primary-hover
            ">
              <Terminal size={14}
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" />
              Mẫu UI
            </motion.button>
            <motion.button
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.2)",
                backgroundColor: "var(--primary-hover)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSettings}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:bg-primary-hover"
            >
              <Settings2 size={14} />
              Tùy chỉnh
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="px-6 pt-4 pb-8 space-y-2">
              {NAVIGATION.map((item) => {
                const isTemplateLink = item.href === '#blog';
                return isTemplateLink ? (
                  <Link
                    key={item.name}
                    to="/template"
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-4 rounded-2xl text-lg font-black tracking-tight transition-all ${location.pathname === '/template'
                      ? 'text-primary bg-gray-50 dark:bg-white/5'
                      : 'text-gray-800 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-800 dark:text-gray-200 hover:text-primary block px-4 py-4 rounded-2xl text-lg font-black tracking-tight hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4">
                <motion.button
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ backgroundColor: "var(--primary-hover)" }}
                  onClick={() => {
                    toggleSettings();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 uppercase tracking-widest text-xs active:bg-primary-hover"
                >
                  <Settings2 size={18} />
                  Cài đặt giao diện
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
