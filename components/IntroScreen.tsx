import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onIntroComplete: () => void;
  primaryColor?: string;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onIntroComplete, primaryColor = '#10b981' }) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [scale, setScale] = useState(0.08);
  const [rotate, setRotate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollAmount = 0;
    const minScrollToTrigger = 300;

    const handleScroll = () => {
      if (isExpanding) return;

      scrollAmount += window.scrollY || window.pageYOffset;
      
      if (scrollAmount > minScrollToTrigger) {
        setIsExpanding(true);
        window.scrollTo(0, 0);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isExpanding) return;

      scrollAmount += e.deltaY > 0 ? 50 : -50;
      scrollAmount = Math.max(0, scrollAmount);

      if (scrollAmount > minScrollToTrigger) {
        setIsExpanding(true);
        window.scrollTo(0, 0);
      }

      // Calculate scale based on scroll
      const newScale = Math.min(1, 0.08 + (scrollAmount / minScrollToTrigger) * 0.92);
      const rotation = (scrollAmount / minScrollToTrigger) * 180;
      setScale(newScale);
      setRotate(rotation);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanding]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-50 flex items-center justify-center overflow-hidden perspective"
    >
      {/* Animated expanding camera aperture */}
      <motion.div
        initial={{ scale: 0.08, opacity: 1 }}
        animate={
          isExpanding
            ? { scale: 1, opacity: 1 }
            : { scale: scale, opacity: 1 }
        }
        transition={
          isExpanding
            ? { duration: 3, ease: [0.34, 1.56, 0.64, 1] }
            : { duration: 0.2, ease: 'easeOut'}
        }
        onAnimationComplete={() => {
          if (isExpanding) {
            setTimeout(() => {
              onIntroComplete();
            }, 1000);
          }
        }}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateZ: isExpanding ? 0 : rotate,
        }}
      >
        {/* Camera Aperture Blades */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full"
              style={{
                rotateZ: (i * 45) + (isExpanding ? 0 : rotate * 2),
                clipPath: `polygon(50% 50%, 50% 0%, 100% 0%)`
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}${isExpanding ? '00' : '20'}, ${primaryColor}${isExpanding ? '00' : '08'})`,
                  transition: 'background 0.2s ease'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Inner Rotating Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={`ring-${ring}`}
              className="absolute rounded-full border-2"
              style={{
                width: `${70 + ring * 25}%`,
                height: `${70 + ring * 25}%`,
                borderColor: `${primaryColor}${isExpanding ? '20' : '40'}`,
                rotateZ: isExpanding ? ring * 120 : rotate * (ring + 1),
              }}
            />
          ))}
        </div>

        {/* Center gradient background */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-full"
          style={{
            background: `radial-gradient(circle, ${primaryColor}15, ${primaryColor}05)`,
            filter: isExpanding ? 'blur(0px)' : 'blur(2px)',
          }}
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isExpanding ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center z-10 relative"
          >
            <motion.div
              animate={isExpanding ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center justify-center"
            >
              <Sparkles size={48} className="text-primary mb-6" />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
              Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 font-semibold max-w-2xl">
              Khám phá những dự án tuyệt vời
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 opacity-70">
              Cuộn để mở rộng ↓
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={isExpanding ? {} : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none opacity-10"
          >
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Hint text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isExpanding ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
      >
        <p className="text-sm font-black text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          ✨ Scroll hoặc cuộn để bắt đầu ✨
        </p>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
