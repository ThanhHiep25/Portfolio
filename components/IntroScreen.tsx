import React, { useEffect, useState, useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface IntroScreenProps {
  onIntroComplete: () => void;
  primaryColor?: string; // Optional for compatibility with parent prop
}

// --- CONFIG ANIMATION ---
const autoFocusBreath = {
  scale: [1, 1.002, 1],
  rotate: [0, 0.5, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "reverse" as const,
    repeatDelay: 0.5
  }
}

// --- SUB-COMPONENT: LỚP KÍNH PHẢN CHIẾU ---
const GlassElement = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  // Phản chiếu di chuyển ngược hướng chuột để tạo độ lồi 3D
  const glareX = useTransform(mouseX, [-0.5, 0.5], [25, -25]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [25, -25]);

  return (
    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-50">
      {/* 1. Lớp bóng kính tổng thể (Specular Reflection) */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          x: glareX,
          y: glareY
        }}
      />

      {/* 2. Vệt sáng sắc cạnh (Hard Light) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-md rounded-full"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]), // Parallax mạnh hơn
          y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]),
          opacity: 0.3
        }}
      />

      {/* 3. Caustics (Vân sáng khúc xạ) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/5 to-purple-500/5 mix-blend-color-dodge" />
    </div>
  )
}

const MAX_SCROLL = 1500;
const MOBILE_BREAKPOINT = 768;

// --- MAIN COMPONENT ---
const UltimateLensIntro: React.FC<IntroScreenProps> = ({ onIntroComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Audio Refs
  const motorAudioRef = useRef<HTMLAudioElement | null>(null);
  const shutterAudioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll state (shared for wheel + touch)
  const scrollRef = useRef(0);
  const pointerActiveRef = useRef(false);
  const lastPointerY = useRef<number | null>(null);

  // Motion Values
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { damping: 20, stiffness: 80, mass: 1 });

  // Mouse Motion Values (Cho hiệu ứng kính lồi)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  // --- TRANSFORMS ---
  const bladeRotate = useTransform(smoothProgress, [0, 1], [0, -65]);
  const bladeMovement = useTransform(smoothProgress, [0, 1], ['-15%', '-55%']);
  const lensScale = useTransform(smoothProgress, [0.6, 1], [1, isMobile ? 8 : 30]);
  const ringRotation = useTransform(smoothProgress, [0, 1], [0, 90]);
  const lensOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0]);

  // Flash Effect logic
  const flashOpacity = useTransform(smoothProgress, [0.95, 0.98, 1], [0, 1, 0]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const maxScroll = isMobile ? 700 : MAX_SCROLL;

    const updateProgress = (delta: number) => {
      if (isFinished) return;

      // Xử lý Âm thanh Mô tơ
      if (!hasStartedAudio && motorAudioRef.current) {
        motorAudioRef.current.play().catch(() => { }); // Catch lỗi nếu trình duyệt chặn
        setHasStartedAudio(true);
      }

      const next = Math.max(0, Math.min(scrollRef.current + delta, maxScroll));
      scrollRef.current = next;

      const progress = next / maxScroll;
      scrollProgress.set(progress);

      // Khi hoàn thành
      if (progress >= 0.99 && !isFinished) {
        setIsFinished(true);

        // Dừng tiếng mô tơ, chơi tiếng màn trập
        if (motorAudioRef.current) {
          motorAudioRef.current.pause();
          motorAudioRef.current.currentTime = 0;
        }
        if (shutterAudioRef.current) {
          shutterAudioRef.current.play().catch(() => { });
        }

        setTimeout(onIntroComplete, 800); // Đợi flash xong mới unmount
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isFinished) return;
      if (scrollRef.current < MAX_SCROLL - 50) e.preventDefault();
      updateProgress(e.deltaY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (isFinished) return;
      pointerActiveRef.current = true;
      lastPointerY.current = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Chuẩn hóa toạ độ chuột (-0.5 đến 0.5)
      if (!isMobile) {
        mouseX.set(e.clientX / window.innerWidth - 0.5);
        mouseY.set(e.clientY / window.innerHeight - 0.5);
      }

      if (!pointerActiveRef.current || lastPointerY.current === null || isFinished) return;
      e.preventDefault();

      const deltaY = e.clientY - lastPointerY.current;
      lastPointerY.current = e.clientY;
      updateProgress(deltaY);
    };

    const handlePointerUp = () => {
      pointerActiveRef.current = false;
      lastPointerY.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('pointerdown', handlePointerDown, { passive: false });
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      // Cleanup audio
      if (motorAudioRef.current) motorAudioRef.current.pause();
    };
  }, [isFinished, onIntroComplete, hasStartedAudio, mouseX, mouseY, scrollProgress, isMobile]);

  if (isFinished && smoothProgress.get() > 0.995) return null;

  const bladeCount = 9;

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#151515]/80 backdrop-blur-md overflow-hidden touch-none select-none`}
      style={{ opacity: lensOpacity }}
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" style={{ opacity: isMobile ? 0.04 : 0.1 }} />

      {/* --- CỤM ỐNG KÍNH (MAIN ASSEMBLY) --- */}
      <motion.div
        className={`relative rounded-full flex items-center justify-center ${isMobile ? 'w-[85vmin] h-[85vmin]' : 'w-[70vmin] h-[70vmin]'}`}
        style={{ scale: lensScale }}
      >
        {/* 1. VỎ NGOÀI CÙNG */}
        <div className="absolute inset-[-10%] rounded-full bg-[#151515] shadow-2xl border border-[#222]"
          style={{ boxShadow: isMobile ? '0 10px 25px rgba(0,0,0,0.6)' : '0 20px 50px rgba(0,0,0,0.8)' }} />

        {/* 2. VÒNG CAO SU LẤY NÉT */}
        <div className="absolute inset-[-2%] rounded-full border-[15px] border-[#1a1a1a]"
          style={{
            backgroundImage: 'repeating-conic-gradient(#1a1a1a 0deg, #1a1a1a 1deg, #0d0d0d 1.5deg, #0d0d0d 2deg)',
            boxShadow: 'inset 0 0 10px #000'
          }}
        />

        {/* 3. VÒNG CHỈ ĐỎ */}
        <div className="absolute inset-[2%] rounded-full border-[2px] border-red-700/80 shadow-[0_0_10px_rgba(200,0,0,0.3)]" />

        {/* 4. VÒNG THÔNG SỐ */}
        <motion.div
          className="absolute inset-[5%] rounded-full border-[30px] border-[#111] bg-[#111] flex items-center justify-center"
          style={{ rotate: ringRotation }}
        >
          <div className="absolute top-2 text-[8px] font-bold text-gray-400 tracking-[2px]">
            1:1.2 USM 85mm φ72mm
          </div>
          <div className="absolute bottom-2 text-[8px] font-bold text-gray-500 tracking-[2px]">
            MADE IN NG.HIEP
          </div>
          <div className="absolute left-4 w-1 h-1 bg-gray-600 rounded-full" />
          <div className="absolute right-4 w-1 h-1 bg-gray-600 rounded-full" />
        </motion.div>

        {/* 5. PHẦN KÍNH TRONG & LÁ KHẨU */}
        <motion.div
          className="absolute inset-[18%] rounded-full bg-black overflow-hidden shadow-[inset_0_0_20px_#000]"
          animate={isFinished ? {} : autoFocusBreath}
        >

          {/* --- CƠ CHẾ LÁ KHẨU --- */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: bladeCount }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full"
                style={{
                  rotate: (360 / bladeCount) * i,
                }}
              >
                <motion.div
                  className="absolute w-[70%] h-[70%] top-1/2 left-1/2 origin-top-left bg-[#1a1a1a]"
                  style={{
                    x: bladeMovement,
                    y: bladeMovement,
                    rotate: bladeRotate,
                    borderRadius: '0 80% 0 30%',
                    background: 'linear-gradient(135deg, #222 0%, #1a1a1a 50%, #111 100%)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    borderLeft: '1px solid rgba(0,0,0,0.8)',
                    boxShadow: '5px 5px 15px rgba(0,0,0,0.8)'
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* CÁC LỚP QUANG HỌC CỐ ĐỊNH */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <motion.div
            className="absolute inset-0 rounded-full mix-blend-screen opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(100, 100, 255, 0.4) 0%, transparent 60%)',
              rotate: useTransform(smoothProgress, [0, 1], [0, -45])
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full mix-blend-overlay opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 70% 70%, rgba(255, 200, 100, 0.4) 0%, transparent 50%)',
            }}
          />

          {/* --- TÍCH HỢP LỚP KÍNH PHẢN CHIẾU THEO CHUỘT --- */}
          <GlassElement mouseX={smoothMouseX} mouseY={smoothMouseY} />

        </motion.div>

        {/* Viền kim loại trong cùng */}
        <div className="absolute inset-[18%] rounded-full border border-gray-700/50 pointer-events-none" />

      </motion.div>

      {/* UI Hướng dẫn */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
        <span className={`${isMobile ? 'text-[14px]' : 'text-[20px]'} uppercase tracking-[0.25em] text-gray-500 font-mono`}>Scroll to Open</span>
      </motion.div>
    </motion.div>
  );
};

export default UltimateLensIntro;