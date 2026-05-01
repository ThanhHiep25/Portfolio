import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const fullName = useMemo(() => user.name.toUpperCase() || 'USER', [user.name]);

  // Optimized scroll listener with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navLinks = useMemo(() => NAVIGATION.map((item) => {
    return { ...item };
  }), []);

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

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
            className="flex-shrink-0 z-[60]"
          >
            <Link
              to="/"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white flex items-center gap-1 group"
            >
              <span className="group-hover:text-primary transition-colors">{fullName}</span>
              <span className="text-primary group-hover:text-gray-900 dark:group-hover:text-white transition-colors">.DEV</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center space-x-1">
              {NAVIGATION.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative text-sm font-bold tracking-tight px-4 py-2 transition-all ${isActive
                      ? 'text-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
                      }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
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
          <div className="-mr-2 flex md:hidden z-[60]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Đóng menu" : "Mở menu"}
              className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white overflow-hidden group transition-all duration-300 active:scale-90"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl md:hidden z-[50]"
            />

            {/* Menu Content */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 w-full h-screen bg-white dark:bg-gray-950 md:hidden z-[55] flex flex-col px-8 pt-32 pb-12 overflow-y-auto"
            >
              <div className="flex flex-col space-y-6">
                {NAVIGATION.map((item, idx) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl sm:text-5xl font-black tracking-tighter transition-all flex items-center gap-4 group ${location.pathname === item.href ? 'text-primary' : 'text-gray-900 dark:text-white hover:text-primary'}`}
                    >
                      <span className="text-sm font-mono opacity-20 group-hover:opacity-100 transition-opacity">/0{idx + 1}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-auto pt-12 border-t border-gray-100 dark:border-white/5"
              >
                <button
                  onClick={() => {
                    toggleSettings();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-6 bg-gray-50 dark:bg-white/5 rounded-3xl group hover:bg-primary transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm group-hover:bg-white/20 transition-colors">
                      <Settings2 className="text-primary group-hover:text-white" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60">Giao diện</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors">Tùy chỉnh Profile</p>
                    </div>
                  </div>
                  <Terminal size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                </button>

                <div className="mt-8 flex items-center justify-between px-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kết nối với tôi</p>
                  <div className="flex gap-4">
                    {/* These links could be dynamic from constants if preferred */}
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <Terminal size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
