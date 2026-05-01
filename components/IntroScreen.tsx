import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
  onIntroComplete: () => void;
  primaryColor?: string;
}

const IntroScreen: React.FC<IntroProps> = ({ onIntroComplete, primaryColor = '#10b981' }) => {
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onIntroComplete, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onIntroComplete]);

  const words = ["CREATIVE", "STRATEGY", "DEVELOPMENT"];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans"
        >
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-color)_0%,_transparent_70%)] opacity-10"
              style={{ '--primary-color': primaryColor } as any} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-4xl px-8">
            {/* Top Words Marquee Style */}
            <div className="flex justify-between mb-24 overflow-hidden">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.3 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                  className="text-[10px] font-black tracking-[0.5em] text-white uppercase"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Central Big Text */}
            <div className="relative mb-24 h-32 md:h-48 flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-7xl md:text-9xl font-black text-white tracking-tighter text-center"
              >
                Đợi xíu
              </motion.h1>

              {/* Animated Ring around the text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/5 rounded-full scale-[1.5] md:scale-[1.2]"
              />
            </div>

            {/* Counter Section */}
            <div className="flex flex-col items-center">
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${counter}%` }}
                  className="absolute inset-y-0 left-0 bg-primary"
                />
              </div>

              <div className="flex justify-between w-full items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Đang fix bug...</span>
                  <span className="text-white/40 text-[10px] font-medium tracking-tight">© 2026 NGUYENHIEP PORTFOLIO</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-6xl font-black text-white tabular-nums tracking-tighter">
                    {counter}
                  </span>
                  <span className="text-sm md:text-xl font-bold text-primary">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-12 left-12 flex flex-col gap-2"
          >
            <div className="w-8 h-[1px] bg-white/30" />
            <div className="w-4 h-[1px] bg-white/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 right-12 text-right"
          >
            <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed">
              Design by Nguyen Hiep<br />
              Precision & Motion
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;