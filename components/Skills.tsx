import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import {
  Layers,
  Cpu,
  Terminal,
  Zap,
  Database,
  Box,
  Smartphone,
  Figma,
  Flame,
  Cloud,
  ArrowUpRight,
  Shield,
  Binary,
  Hash,
  Globe,
  Server,
  CloudCog,
  Dna,
  Workflow,
  Code2,
  Layout,
  ChevronRight,
  Monitor,
  Command,
  Trophy
} from 'lucide-react';
import userAbout from '../data/dataAbout';
import TechRadar from './TechRadar';
import { Skill } from '../interfaces/user';

// --- Types ---
// Removed local Skill interface in favor of imported Skill from interfaces/user

// --- Icons Helper ---
const getSkillIcon = (name: string, size = 20) => {
  const n = name.toLowerCase();
  if (n.includes('react') || n.includes('next')) return <Layers size={size} />;
  if (n.includes('java') || n.includes('spring')) return <Server size={size} />;
  if (n.includes('python')) return <Cpu size={size} />;
  if (n.includes('golang')) return <Box size={size} />;
  if (n.includes('firebase') || n.includes('socket')) return <Zap size={size} />;
  if (n.includes('javascript') || n.includes('typescript')) return <Code2 size={size} />;
  if (n.includes('node') || n.includes('express')) return <Terminal size={size} />;
  if (n.includes('mongo') || n.includes('sql') || n.includes('database')) return <Database size={size} />;
  if (n.includes('tailwind') || n.includes('scss') || n.includes('css')) return <Layout size={size} />;
  if (n.includes('motion') || n.includes('animation') || n.includes('framer')) return <Flame size={size} />;
  if (n.includes('git') || n.includes('docker') || n.includes('cloud')) return <Cloud size={size} />;
  if (n.includes('figma') || n.includes('ux') || n.includes('ui')) return <Figma size={size} />;
  if (n.includes('mobile') || n.includes('native')) return <Smartphone size={size} />;
  if (n.includes('api') || n.includes('rest')) return <Workflow size={size} />;
  return <Terminal size={size} />;
};

// --- Dock Item ---
interface DockItemProps {
  skill: Skill;
  mouseX: MotionValue<number>;
  selected: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({
  skill,
  mouseX,
  selected,
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ x: 0, width: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setBounds({ x: rect.x, width: rect.width });
      }
    };
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
    };
  }, []);

  const distance = useTransform(mouseX, (val: number) => {
    return val - bounds.x - bounds.width / 2;
  });

  // Use SCALE instead of WIDTH/HEIGHT to prevent forced reflows
  const scaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="w-14 h-14 flex items-center justify-center relative">
      <motion.div
        ref={ref}
        style={{ scale }}
        onClick={onClick}
        className={`absolute bottom-0 w-12 h-12 flex items-center justify-center rounded-2xl cursor-pointer transition-colors group z-10 ${selected
          ? 'bg-primary text-white shadow-2xl shadow-primary/40'
          : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 text-gray-500'
          }`}
      >
        {getSkillIcon(skill.skill_name, 24)}

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileHover={{ opacity: 1, y: -60, scale: 1 }}
            className="absolute pointer-events-none px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest z-50 border border-white/10 shadow-2xl whitespace-nowrap"
          >
            {skill.skill_name}
          </motion.div>
        </AnimatePresence>

        {selected && (
          <motion.div
            layoutId="active-dot"
            className="absolute -bottom-3 w-1.5 h-1.5 bg-primary rounded-full"
          />
        )}
      </motion.div>
    </div>
  );
};

// --- Main Section ---
const Skills: React.FC = () => {
  const user = userAbout[0];
  const mouseX = useMotionValue(Infinity);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(user.skill[0]);
  const [viewMode, setViewMode] = useState<'ANALYSIS' | 'RADAR'>('ANALYSIS');

  return (
    <section id="skills" className="py-40 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-black uppercase tracking-[0.6em] text-[10px] block mb-4">Command Center</span>
            <h2 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none uppercase">
              Skill <span className="text-outline text-transparent opacity-20 italic">Dashboard</span>
            </h2>
          </motion.div>
        </div>

        {/* Console & Dock Layout */}
        <div className="flex flex-col items-center gap-20">

          {/* Terminal Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl rounded-[3rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gray-200/50 dark:bg-white/5 px-8 py-5 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-gray-600 dark:text-gray-400">
                <Monitor size={12} className="text-emerald-700 dark:text-primary" />
                <span className="tracking-widest uppercase">{viewMode === 'ANALYSIS' ? 'skill-analysis.exe' : 'tech-radar.sys'} — 8bit</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode(prev => prev === 'ANALYSIS' ? 'RADAR' : 'ANALYSIS')}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-active dark:text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    {viewMode === 'ANALYSIS' ? 'Switch to Radar' : 'Switch to Analysis'}
                  </span>
                  <ChevronRight size={10} />
                </button>
                <Hash size={14} className="text-gray-400" />
              </div>
            </div>

            <div className="p-10 md:p-16 min-h-[500px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {viewMode === 'ANALYSIS' ? (
                  <motion.div
                    key="analysis"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full grid md:grid-cols-2 gap-16"
                  >
                    {/* Left: Visual */}
                    <div className="flex flex-col items-center md:items-start justify-center">
                      <motion.div
                        key={selectedSkill.skill_id}
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        className="mb-10 p-10 rounded-[3rem] bg-white dark:bg-black/20 border border-gray-100 dark:border-white/10 shadow-2xl text-primary relative group"
                      >
                        <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        {getSkillIcon(selectedSkill.skill_name, 100)}
                      </motion.div>
                      <div className="font-mono text-base space-y-3">
                        <p className="text-gray-600 dark:text-gray-400"><span className="text-primary-active dark:text-primary">const</span> <span className="text-blue-700 dark:text-blue-400">TechStack</span> = {"{"}</p>
                        <p className="pl-6 text-gray-700 dark:text-gray-300">name: <span className="text-amber-700 dark:text-amber-500">"{selectedSkill.skill_name}"</span>,</p>
                        <p className="pl-6 text-gray-700 dark:text-gray-300">proficiency: <span className="text-emerald-700 dark:text-emerald-500">{selectedSkill.skill_level}</span>,</p>
                        <p className="pl-6 text-gray-700 dark:text-gray-300">status: <span className="text-primary-active dark:text-primary">"DEPLOYED"</span></p>
                        <p className="text-gray-600 dark:text-gray-400">{"};"}</p>
                      </div>
                    </div>

                    {/* Right: Analysis */}
                    <div className="flex flex-col justify-center gap-12">
                      <div>
                        <div className="flex justify-between items-end mb-6">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">Analysis Output</span>
                          <span className="text-3xl font-black text-primary-active dark:text-primary">{selectedSkill.skill_level}%</span>
                        </div>
                        <div className="flex items-end gap-2 h-32">
                          {Array.from({ length: 24 }).map((_, i) => {
                            const level = parseInt(selectedSkill.skill_level);
                            const active = i < Math.floor((level / 100) * 24);
                            return (
                              <motion.div
                                key={i}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: i * 0.02 }}
                                className={`w-full rounded-sm ${active ? 'bg-primary' : 'bg-gray-200 dark:bg-white/5'}`}
                                style={{ height: `${(i + 1) * 4.1}%` }}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-white dark:bg-black/20 border border-gray-100 dark:border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                          <Command size={40} />
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic font-medium">
                          "{selectedSkill.skill_name} đóng vai trò cốt lõi trong việc xây dựng các giải pháp có độ tin cậy cao và hiệu suất vượt trội trong hệ sinh thái của tôi."
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="radar"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full"
                  >
                    <TechRadar skills={user.skill} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating macOS Dock */}
          <div className="relative mt-10 w-full flex justify-center">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full" />

            {/* Main Dock Container - Fixed Height to prevent layout shift */}
            <div className="h-[130px] flex items-end max-w-full overflow-x-auto no-scrollbar pb-4">
              <motion.div
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-6 py-4 rounded-[2.5rem] bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow overflow-visible mx-auto"
              >
                {user.skill.map(skill => (
                  <DockItem
                    key={skill.skill_id}
                    skill={skill}
                    mouseX={mouseX}
                    selected={selectedSkill.skill_id === skill.skill_id}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </motion.div>
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-400 animate-pulse">Select Module to Analyze</span>
            </div>
          </div>
        </div>

        {/* Global Stats Footer */}
        <div className="mt-40 grid md:grid-cols-3 gap-8">
          <div className="p-10 rounded-[3rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <Binary size={22} className="text-primary" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Ngôn ngữ</h3>
            </div>
            <div className="space-y-6">
              {user.language.map(l => (
                <div key={l.language_id}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{l.language_name}</span>
                    <span className="text-xs font-black text-primary-active dark:text-primary">LV.{l.language_level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${parseInt(l.language_level) * 20}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 p-10 rounded-[3rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <Trophy size={22} className="text-amber-500" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Chứng nhận</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {user.certificate.slice(0, 4).map(c => (
                <motion.div
                  key={c.certificate_id}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-[2rem] bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <p className="text-[11px] font-black text-gray-900 dark:text-white uppercase mb-1 group-hover:text-primary transition-colors">{c.certificate_name}</p>
                    <p className="text-[8px] text-gray-600 dark:text-gray-400 uppercase tracking-widest">{c.certificate_year}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
