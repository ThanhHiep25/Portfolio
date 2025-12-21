
import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Code,
  Globe,
  Award,
  Layers,
  Cpu,
  Terminal,
  Zap,
  Database,
  Layout,
  Server,
  Box,
  Smartphone,
  Figma,
  Flame
} from 'lucide-react';
import userAbout from '../data/dataAbout';
import TechRadar from './TechRadar';

const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('react') || n.includes('next')) return <Layers className="text-blue-500" />;
  if (n.includes('java')) return <Terminal className="text-red-500" />;
  if (n.includes('python')) return <Cpu className="text-blue-600" />;
  if (n.includes('golang')) return <Box className="text-cyan-500" />;
  if (n.includes('firebase') || n.includes('socket')) return <Zap className="text-yellow-500" />;
  if (n.includes('javascript') || n.includes('typescript')) return <Code className="text-amber-500" />;
  if (n.includes('node') || n.includes('express')) return <Server className="text-green-500" />;
  if (n.includes('mongo') || n.includes('sql')) return <Database className="text-emerald-500" />;
  if (n.includes('tailwind') || n.includes('scss') || n.includes('css')) return <Layout className="text-sky-400" />;
  if (n.includes('motion') || n.includes('animation')) return <Flame className="text-purple-500" />;
  if (n.includes('git') || n.includes('docker')) return <Terminal className="text-gray-600 dark:text-gray-400" />;
  if (n.includes('figma')) return <Figma className="text-pink-500" />;
  if (n.includes('mobile') || n.includes('native')) return <Smartphone className="text-indigo-500" />;
  return <Terminal className="text-primary" />;
};

const SkillCard: React.FC<{ name: string; level: string }> = ({ name, level }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col gap-3"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:scale-110 transition-transform">
          {getSkillIcon(name)}
        </div>
        <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{name}</span>
      </div>
      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{level}%</span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        className="h-full bg-primary rounded-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </motion.div>
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  const user = userAbout[0];

  const skillCategories = useMemo(() => {
    const skills = user.skill;
    return {
      frontend: skills.filter(s => {
        const n = s.skill_name.toLowerCase();
        return n.includes('react') || n.includes('javascript') || n.includes('tailwind') || n.includes('motion') || n.includes('css') || n.includes('figma');
      }),
      backend: skills.filter(s => {
        const n = s.skill_name.toLowerCase();
        return n.includes('node') || n.includes('java') || n.includes('golang') || n.includes('firebase') || n.includes('mongo') || n.includes('api') || n.includes('socket');
      })
    };
  }, [user.skill]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Alex Assistant Core Intelligence</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">Bản Đồ Năng Lực</h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full shadow-lg shadow-primary/20"></div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-2">
            <TechRadar skills={user.skill} />
          </div>
          <div className="lg:col-span-3 grid gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Layout size={28} /></div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Xây dựng Giao diện (Frontend)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.frontend.map(skill => (
                  <SkillCard key={skill.skill_id} name={skill.skill_name} level={skill.skill_level} />
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-500/10 rounded-2xl text-green-500"><Server size={28} /></div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Hệ thống & Dữ liệu (Backend)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.backend.map(skill => (
                  <SkillCard key={skill.skill_id} name={skill.skill_name} level={skill.skill_level} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Languages & Certificates */}
        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Globe size={28} /></div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Ngoại Ngữ</h3>
            </div>
            <div className="space-y-8">
              {user.language.map((lang) => {
                const level = parseInt(lang.language_level) * 20;
                return (
                  <div key={lang.language_id}>
                    <div className="flex justify-between items-center mb-3 px-1">
                      <span className="text-gray-800 dark:text-gray-200 font-black uppercase tracking-wider text-xs">{lang.language_name}</span>
                      <span className="text-sm font-black text-primary">{level}%</span>
                    </div>
                    <div className="h-4 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden p-1 border border-gray-100 dark:border-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500"><Award size={28} /></div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">Chứng Chỉ</h3>
            </div>
            <div className="grid gap-4">
              {user.certificate.map((cert) => (
                <motion.a
                  key={cert.certificate_id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  href={cert.certificate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-primary transition-all shadow-sm"
                >
                  <div className="
                    flex items-center md:flex-row flex-col gap-4">
                    {
                      cert.certificate_img != '' && (
                        <img
                          src={cert.certificate_img}
                          alt={cert.certificate_name}
                          className="h-40 object-contain rounded-xl grayscale group-hover:grayscale-0 transition-all"
                        />
                      )
                    }
                    <div className="flex flex-col ml-4">
                        <div className="font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors text-base">{cert.certificate_name}</div>
                    <div className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-[0.2em]">{cert.certificate_des} — {cert.certificate_year}</div>
                    </div>
                  
                  </div>

                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
