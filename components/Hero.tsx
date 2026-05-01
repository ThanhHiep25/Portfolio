import React, { useState, useEffect, memo } from 'react';
import { motion, useScroll, Variants, useReducedMotion } from 'framer-motion';
import {
  Layers,
  Database,
  Terminal,
  Smartphone,
  Cpu,
  Globe,
  Box,
  Zap,
  Moon,
  Sun,
  CheckCircle2
} from 'lucide-react';
import userAbout from '../data/dataAbout';
import SlideShowSkill from '@/data/dataSkill';
import Skeleton from './Skeleton';

const FloatingIcon = memo(({ icon: Icon, color, delay, initialPos }: any) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      animate={shouldReduceMotion ? { opacity: 0.3 } : {
        opacity: [0.3, 0.6, 0.3],
        y: [0, -40, 0],
        x: [0, 20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className={`absolute pointer-events-none ${color} gpu-accelerated`}
    >
      <Icon size={32} strokeWidth={1.5} />
    </motion.div>
  );
});

const Hero: React.FC = () => {
  const user = userAbout[0];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    // Simulate initial loading
    const timer = setTimeout(() => {
      // We still wait for image load actually
    }, 1000);

    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const duplicatedSkill = [...SlideShowSkill, ...SlideShowSkill];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-950 pt-24 pb-12">

      {/* Dynamic Spotlight Effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 opacity-100 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb), 0.08), transparent 80%)`,
          willChange: 'background'
        }}
      />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 dark:opacity-30" aria-hidden="true">
        <FloatingIcon icon={Layers} color="text-blue-500" delay={0} initialPos={{ top: '15%', left: '10%' }} />
        <FloatingIcon icon={Terminal} color="text-green-500" delay={2} initialPos={{ top: '65%', left: '5%' }} />
        <FloatingIcon icon={Database} color="text-purple-500" delay={1} initialPos={{ top: '20%', right: '15%' }} />
        <FloatingIcon icon={Smartphone} color="text-pink-500" delay={3} initialPos={{ bottom: '20%', right: '10%' }} />
        <FloatingIcon icon={Cpu} color="text-orange-500" delay={0.5} initialPos={{ top: '40%', left: '25%' }} />
        <FloatingIcon icon={Box} color="text-cyan-500" delay={4} initialPos={{ bottom: '15%', left: '40%' }} />
        <FloatingIcon icon={Zap} color="text-yellow-500" delay={1.5} initialPos={{ top: '10%', right: '40%' }} />
        <FloatingIcon icon={Globe} color="text-red-500" delay={2.5} initialPos={{ bottom: '30%', right: '30%' }} />
        <FloatingIcon icon={Moon} color="text-gray-500" delay={3.5} initialPos={{ top: '20%', left: '60%' }} />
        <FloatingIcon icon={Sun} color="text-gray-500" delay={4.5} initialPos={{ bottom: '40%', left: '60%' }} />
      </div>

      <div className="relative z-10 text-center px-4 md:max-w-7xl max-w-5xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">

          <motion.div variants={itemVariants} className="flex flex-col items-center mt-12 mb-12 relative">


            <div className="text-center relative mt-12 ">
              <h1 className="relative inline-block mb-6">
                <span className="block text-4xl md:text-[6.5rem] font-black tracking-tightest text-gray-600 dark:text-white leading-[0.8]">
                  {user.name.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', y: 20 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      transition={{
                        delay: 0.5 + (index * 0.04),
                        duration: 0.8,
                        type: "spring",
                        stiffness: 120
                      }}
                      whileHover={{
                        y: -15,
                        scale: 1.1,
                        color: 'var(--primary-color)',
                        transition: { duration: 0.2 }
                      }}
                      className="inline-block transition-all cursor-default select-none hover:drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                    >
                      {char === ' ' ? '\u00A0' : char.toUpperCase()}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="relative inline-block"
                >
                  <span className="text-2xl md:text-5xl font-black tracking-tight text-gray-600 dark:text-white animate-gradient-x leading-tight drop-shadow-2xl">
                    {user.job}
                  </span>

                  {/* Decorative Underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 1.2, ease: "circOut" }}
                    className="absolute -bottom-4 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
                  />

                  {/* Background Glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.4, 0.1]
                    }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute -inset-10 bg-primary/20 blur-[80px] rounded-full -z-10"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Xây dựng sản phẩm kỹ thuật số với trải nghiệm <span className="text-gray-950 dark:text-white font-bold">mượt mà</span> và mã nguồn <span className="text-gray-950 dark:text-white font-bold">tối ưu</span>. Đang tiềm kiếm con đường mới của mình.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.a
              href="#projects"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 rounded-2xl bg-primary hover:bg-primary-hover active:bg-primary-active text-gray-950 font-black shadow-2xl shadow-primary/30 transition-all text-sm uppercase tracking-widest flex items-center justify-center"
            >
              Xem dự án của tôi
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-black border border-gray-100 dark:border-gray-700 hover:border-primary active:border-primary-active transition-all text-sm uppercase tracking-widest flex items-center justify-center"
            >
              Bắt đầu trò chuyện
            </motion.a>
          </motion.div>

          {/* Bento Grid Section */}
          <motion.div
            variants={containerVariants}
            className="w-full mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Box 1: Google Developer Badge (Large) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="lg:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-gray-200/50 dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <img
                  src="/GGD.png"
                  alt="Google Developers"
                  fetchPriority="high"
                  className="w-full h-full object-contain rounded-xl relative z-10 drop-shadow-2xl"
                />
              </div>

              <div className="relative z-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">Verified</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-active dark:text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Community</span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight flex items-center justify-center md:justify-start gap-3">
                  Google Developer <CheckCircle2 className="text-blue-500" size={24} />
                </h2>
                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-md">
                  Xác nhận bởi Google và đã tham gia đóng góp tích cực trong các sự kiện cộng đồng công nghệ của Google.
                </p>
                <a
                  href={user.googleDeveloper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-emerald-700 dark:text-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                >
                  Xem Profile <Globe size={14} />
                </a>
              </div>
            </motion.div>

            {/* Box 2: Quick Stats */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group overflow-hidden rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 p-10 flex flex-col justify-center items-center text-center shadow-xl shadow-gray-200/50 dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-8 relative z-10">
                <div>
                  <div className="text-5xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter">01+</div>
                  <div className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em]">Năm kinh nghiệm</div>
                </div>
                <div className="w-12 h-px bg-gray-100 dark:bg-white/10 mx-auto" />
                <div>
                  <div className="text-5xl font-black text-primary-active dark:text-primary mb-1 tracking-tighter">10+</div>
                  <div className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em]">Dự án hoàn thiện</div>
                </div>
              </div>
            </motion.div>

            {/* Box 3: Tech Stack Marquee (Full Width below) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 relative group overflow-hidden rounded-[2.5rem] bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 py-8 shadow-inner"
            >
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10" />

              <div className="flex items-center gap-12 w-max animate-infinite-scroll hover:[animation-play-state:paused] px-12">
                {duplicatedSkill.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center gap-4 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-white/10 flex items-center justify-center p-2.5 transition-all group-hover/item:scale-110 group-hover/item:border-primary/30">
                      <img
                        src={item.imageSlide}
                        alt={item.name}
                        className="w-full h-full object-contain filter grayscale group-hover/item:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-widest group-hover/item:text-emerald-700 dark:group-hover/item:text-primary transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}                                      
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center group" aria-label="Cuộn xuống giới thiệu">
          <div className="w-8 h-12 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center p-2 group-hover:border-primary transition-colors">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </a>
      </motion.div> */}
    </section >
  );
};

export default Hero;
