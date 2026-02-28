
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

  useEffect(() => {
    if (window.innerWidth < 1024) return;

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

          <motion.div variants={itemVariants} className="flex justify-center mt-20">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 leading-[1.1]">
              Tôi là {user.name.toUpperCase()} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient-x drop-shadow-sm">
                {user.job}
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Xây dựng sản phẩm kỹ thuật số với trải nghiệm <span className="text-gray-900 dark:text-white font-bold">mượt mà</span> và mã nguồn <span className="text-gray-900 dark:text-white font-bold">tối ưu</span>. Đang tiềm kiếm con đường mới của mình.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.a
              href="#projects"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 rounded-2xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-black shadow-2xl shadow-primary/30 transition-all text-sm uppercase tracking-widest flex items-center justify-center"
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

          <div className="relative group w-full flex justify-center mb-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10 rounded-2xl"></div>

            <div className="w-full rounded-2xl overflow-hidden ">
              <img src="/banner.jpg" alt="banner" className="w-full h-auto object-cover" />
            </div>

            <a href={user.googleDeveloper}
              className="absolute md:bottom-12 bottom-2 md:left-10 transform z-10 flex items-center gap-2 backdrop-blur-md p-1 rounded-xl"
              target="_blank" rel="noopener noreferrer">
              <motion.img
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -5, rotate: -5 }}
                src="/GGD.png"
                alt="Google Developers Logo"
                className="w-16 h-16 shadow-md rounded-xl group-hover:scale-110 group-hover:border-2 group-hover:border-primary transition-all" />
              <div className="flex flex-col items-start gap-1" >
                <p className="text-white text-xl font-bold flex items-center gap-2">Google Developer <CheckCircle2 className="text-blue-500" size={20} /></p>
                <p className="text-white text-[12px]">Xác nhận bởi Google và đã tham gia các sự kiện của Google</p>
              </div>
            </a>
          </div>



        </motion.div>
      </div>

      {/* Slide Show Skill */}
      <motion.div className="w-full overflow-hidden py-10">
        <div className="flex items-center gap-10 w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {
            duplicatedSkill.map((item) => (
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.5, y: -5 }}
                key={item.id} className="flex items-center">
                <img src={item.imageSlide} alt={item.name} className="w-12 h-auto rounded-full transition-all" />
              </motion.div>
            ))
          }
        </div>

      </motion.div >

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
