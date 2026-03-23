import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// --- CONFIG ASSETS (Map ảnh của bạn vào đây) ---
const ASSETS = {
  runLeft: '/intro/4.png',   // Nhân vật chạy (hướng phải)
  runRight: '/intro/5.png',  // Nhân vật chạy (hướng trái)
  jump: '/intro/6.png',      // Nhân vật nhảy
  skate: '/intro/7.png',     // Trượt ván
  sit: '/intro/1.png',       // Ngồi buộc dây giày
  group: '/intro/9.png',     // Nhóm bạn
  hero: '/intro/intro-center.png' // Ảnh chính (Peace sign)
};

interface IntroProps {
  onIntroComplete: () => void;
  primaryColor?: string;
}

const MAX_SCROLL = 2500; // Scroll dài hơn để hiệu ứng mượt hơn

const UrbanIntro: React.FC<IntroProps> = ({ onIntroComplete, primaryColor }) => {
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef(0);

  // Motion Values
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.8
  });

  // --- TRANSFORMS (CHUYỂN ĐỘNG) ---

  // 1. TEXT BACKGROUND (Parallax chậm)
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const textOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  // 2. CÁC NHÂN VẬT PHỤ (Bay vào từ các hướng)

  // Trượt ván: Lướt từ phải qua trái dưới đáy
  const skateX = useTransform(smoothProgress, [0, 0.4], ['100vw', '-100vw']);
  const skateXLeft = useTransform(smoothProgress, [0, 0.4], ['-100vw', '100vw']);

  // Chạy: Chạy từ trái vào giữa rồi biến mất
  const runX = useTransform(smoothProgress, [0.1, 0.5], ['-50vw', '10vw']);
  const runXRight = useTransform(smoothProgress, [0.1, 0.5], ['100vw', '-10vw']);
  const runOpacity = useTransform(smoothProgress, [0.4, 0.6], [1, 0]);

  // Nhảy: Rơi từ trên xuống
  const jumpY = useTransform(smoothProgress, [0.3, 0.7], ['-100vh', '20vh']);
  const jumpScale = useTransform(smoothProgress, [0.3, 0.7], [0.5, 1.2]);
  const jumpOpacity = useTransform(smoothProgress, [0.6, 0.8], [1, 0]);

  // Ngồi: Xuất hiện tĩnh ở góc rồi mờ đi
  const sitOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const skateOpacity = useTransform(smoothProgress, [0, 1], [0, 5]);

  // 3. HERO MAIN (Nhân vật chính)
  // Logic: Zoom từ cực lớn (mờ) -> Nhỏ lại rõ nét -> Zoom cực lớn vào màn hình
  const heroScale = useTransform(smoothProgress, [0.6, 0.85, 1], [3, 1, 15]);
  const heroOpacity = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0.6, 0.85], ['100px', '0px']);

  // 4. MÀN CHE TRẮNG KẾT THÚC
  const whiteOverlay = useTransform(smoothProgress, [0.9, 0.95], [0, 1]);

  // --- LOGIC SCROLL (Giữ nguyên logic core) ---
  useEffect(() => {
    const handleScroll = (delta: number) => {
      if (isFinished) return;
      const next = Math.max(0, Math.min(scrollRef.current + delta, MAX_SCROLL));
      scrollRef.current = next;

      const p = next / MAX_SCROLL;
      scrollProgress.set(p);

      if (p >= 0.99 && !isFinished) {
        setIsFinished(true);
        setTimeout(onIntroComplete, 500);
      }
    };

    const onWheel = (e: WheelEvent) => { e.preventDefault(); handleScroll(e.deltaY); };
    // Thêm logic touch nếu cần (như bài trước)

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [isFinished, onIntroComplete, scrollProgress]);

  if (isFinished && smoothProgress.get() >= 0.99) return null;

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-[#0f0f0f] overflow-hidden flex items-center justify-center font-sans">

      {/* 1. BACKGROUND NOISE & GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* 2. HUGE TYPOGRAPHY (Nằm sau cùng) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
        style={{ y: textY, opacity: textOpacity }}
      >
        <h1 className="text-[25vw] font-black text-gray-600 leading-[0.8] tracking-tighter">
          STREET
        </h1>
        <h1 className="text-[25vw] font-black text-transparent leading-[0.8] tracking-tighter shadow-[40px_-10px_40px] shadow-white bg-gray-400"
          style={{ WebkitTextStroke: '2px #222' }}>
          MESSENGER
        </h1>
      </motion.div>

      {/* 3. SCENE ELEMENTS (Các nhân vật bay lượn) */}

      {/* A. Ngồi buộc dây giày (Góc trái dưới - Xuất hiện đầu tiên) */}
      <motion.img
        src={ASSETS.sit}
        className="absolute bottom-20 -right-[120px] translate-y-20 w-[500px] object-contain drop-shadow-2xl"
        style={{ opacity: sitOpacity }}
      />
      <motion.div className="absolute bottom-2/3 right-[360px] translate-y-20 bg-white/20 rounded-xl py-2 px-4 backdrop-blur-md"
        style={{ opacity: sitOpacity }}
      >
        <p className="text-5xl font-bold font-mono">Hi Fen</p>
        <p className="text-xl font-mono">Hãy tận hưởng thế giới này nhé 🌻</p>
      </motion.div>


      {/* B. Trượt ván (Lướt ngang màn hình) */}
      <motion.img
        src={ASSETS.skate}
        className="absolute -top-20 left-[15%] translate-y-20  w-[30vw] object-contain drop-shadow-2xl z-10"
        style={{ x: skateXLeft, rotate: -10 }}
      />

      <motion.div className="absolute bg-gray-500 w-[500vw] h-[500vh] -top-100 left-[40%] blur-xl" style={{ x: skateXLeft, rotate: -10, opacity: skateOpacity }}></motion.div>


      {/* C. Chạy (Chạy từ trái vào) */}
      <motion.img
        src={ASSETS.runLeft}
        className="absolute top-[20%] left-0 w-[35vw] object-contain drop-shadow-2xl z-20"
        style={{ x: runXRight, opacity: runOpacity }}
      />
      <motion.div className="absolute bg-gradient-to-r from-black/80 to-gray-500/80 w-[500vw] h-[56vh] bottom-0 left-[25%] z-10 blur-xl" style={{ x: runXRight, opacity: runOpacity }}></motion.div>

      {/* D. Nhảy (Rơi từ trên xuống) */}
      <motion.img
        src={ASSETS.jump}
        className="absolute -top-30 right-[20%] w-[40vw] object-contain drop-shadow-2xl z-30"
        style={{ y: jumpY, scale: jumpScale, opacity: jumpOpacity }}
      />

      {/* 4. HERO MAIN (Nhân vật chính - Xuất hiện cuối cùng) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
      >
        <img
          src={ASSETS.jump}
          className="h-[85vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          alt="Hero"
        />


      </motion.div>

      {/* 5. WHITE FLASH OVERLAY (Kết thúc) */}
      <motion.div
        className="absolute inset-0 bg-white z-[100]"
        style={{ opacity: whiteOverlay }}
      />

      {/* UI: Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-end gap-1 mix-blend-difference z-40"
        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
      >
        <span className="text-white text-xl font-mono">SCROLL DOWN</span>
        <div className="w-40 h-[2px] bg-white" />
      </motion.div>

    </motion.div>
  );
};

export default UrbanIntro;