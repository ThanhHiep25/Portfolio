
// Fix: Added React import to resolve "Cannot find namespace 'React'" errors.
import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../interfaces/user';
// Fix: Added Github to lucide-react imports to resolve "Cannot find name 'Github'" error.
import { 
  Github,
  Code2, 
  Database, 
  Server, 
  Layout, 
  Globe, 
  Box, 
  MapPin, 
  Zap, 
  Smartphone, 
  Monitor,
  Cpu,
  Layers,
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  MessageCircle,
  ExternalLink,
  Sparkles,
  BarChart3,
  Milestone,
  Flag,
  Search,
  Settings,
  Rocket,
  Instagram
} from 'lucide-react';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";

const getTechIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('react') || n.includes('next')) return <Layers size={14} />;
  if (n.includes('node') || n.includes('express') || n.includes('spring') || n.includes('backend') || n.includes('golang') || n.includes('java')) return <Server size={14} />;
  if (n.includes('mongo') || n.includes('mysql') || n.includes('firebase') || n.includes('database') || n.includes('postgresql')) return <Database size={14} />;
  if (n.includes('tailwind') || n.includes('css') || n.includes('html') || n.includes('frontend')) return <Layout size={14} />;
  if (n.includes('api') || n.includes('axios') || n.includes('http')) return <Globe size={14} />;
  if (n.includes('three') || n.includes('blender') || n.includes('3d')) return <Box size={14} />;
  if (n.includes('map') || n.includes('leaflet')) return <MapPin size={14} />;
  if (n.includes('animation') || n.includes('zap')) return <Zap size={14} />;
  if (n.includes('mobile')) return <Smartphone size={14} />;
  if (n.includes('web')) return <Monitor size={14} />;
  if (n.includes('js') || n.includes('python') || n.includes('code')) return <Code2 size={14} />;
  return <Cpu size={14} />;
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void; onSelect: (p: Project) => void }> = ({ project, onClose, onSelect }) => {
  const relatedProjects = useMemo(() => {
    return mockProjects
      .filter(p => p.project_id !== project.project_id)
      .map(p => {
        let score = 0;
        if (p.category === project.category) score += 10;
        const sharedTech = p.project_type.filter(t => 
          project.project_type.some(pt => pt.type_name === t.type_name)
        );
        score += sharedTech.length * 2;
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [copied, setCopied] = useState(false);

  const projectUrl = typeof window !== 'undefined' ? `${window.location.origin}?project=${project.project_id}` : '';

  // Update meta tags for social sharing
  const updateMetaTags = () => {
    if (typeof document === 'undefined') return;
    
    // Update OG tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateMetaName = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('og:title', `${project.project_name} | Dự án của Nguyễn Hiệp`);
    updateMetaTag('og:description', project.project_des);
    updateMetaTag('og:image', project.project_img || '');
    updateMetaTag('og:url', projectUrl);
    updateMetaTag('twitter:title', `${project.project_name} | Dự án của Nguyễn Hiệp`);
    updateMetaTag('twitter:description', project.project_des);
    updateMetaTag('twitter:image', project.project_img || '');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    updateMetaTags();
    
    // Add delay to ensure meta tags are updated
    setTimeout(() => {
      const shareUrl = shareLinks[platform as keyof typeof shareLinks];
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    }, 100);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}&quote=${encodeURIComponent(`${project.project_name} - ${project.project_des}`)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(`Xem dự án "${project.project_name}": ${project.project_des}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
    instagram: `https://instagram.com/`,
  };

  const timelineSteps = [
    { label: 'Khởi tạo', icon: <Search size={14} />, status: 'done' },
    { label: 'Thiết kế', icon: <Layout size={14} />, status: 'done' },
    { label: 'Phát triển', icon: <Settings size={14} />, status: 'done' },
    { label: 'Hoàn thiện', icon: <Flag size={14} />, status: project.status === 'Completed' ? 'done' : 'active' },
    { label: 'Triển khai', icon: <Rocket size={14} />, status: project.status === 'Completed' ? 'done' : 'next' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={onClose} 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl w-screen h-screen top-0 left-0"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }} 
        exit={{ y: 50, opacity: 0, scale: 0.95 }} 
        onClick={e => e.stopPropagation()} 
        className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-gray-950 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-[210] p-3 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all shadow-lg border border-white/10" 
          aria-label="Đóng chi tiết dự án"
        >
          <X size={20} />
        </button>
        
        <div className="md:w-5/12 h-64 md:h-full overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0 border-r border-gray-100 dark:border-white/5">
          <img src={project.project_img || FALLBACK_IMAGE} alt={`Hình ảnh minh họa dự án ${project.project_name}`} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-950 flex flex-col h-full">
          <div className="p-8 md:p-12 pb-6">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 inline-block">{project.category}</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">{project.project_name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">{project.project_des}</p>
            
            {/* Tech Stats Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={16} className="text-primary" />
                <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Thống kê công nghệ</h3>
              </div>
              <div className="grid gap-4">
                {project.project_type.map((t, i) => {
                  // Mock usage level for visualization
                  const level = 100 - (i * 10) - (Math.random() * 5);
                  return (
                    <div key={t.type_id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2">{getTechIcon(t.type_name)} {t.type_name}</span>
                        <span>{Math.round(level)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${level}%` }}
                          transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "circOut" }}
                          className="h-full bg-primary rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-8">
                <Milestone size={16} className="text-primary" />
                <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Lộ trình dự án ({project.project_year})</h3>
              </div>
              <div className="relative">
                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 dark:bg-white/5" />
                <div className="relative flex justify-between">
                  {timelineSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 relative z-10 bg-white dark:bg-gray-950 px-2">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + (idx * 0.1) }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                          step.status === 'done' 
                            ? 'bg-primary text-white' 
                            : step.status === 'active' 
                              ? 'bg-primary/20 text-primary animate-pulse border border-primary/50' 
                              : 'bg-gray-100 dark:bg-white/5 text-gray-400'
                        }`}
                      >
                        {step.icon}
                      </motion.div>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${
                        step.status === 'done' ? 'text-primary' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {project.project_demo && (
                <a href={project.project_demo} target="_blank" className="flex-1 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-center shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2">
                  Live Demo <ExternalLink size={14} />
                </a>
              )}
              {project.project_link && (
                <a href={project.project_link} target="_blank" className="flex-1 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-center active:scale-95 transition-all flex items-center justify-center gap-2 border border-transparent dark:border-white/10">
                  Mã nguồn <Github size={14} />
                </a>
              )}
            </div>

            {/* Share Section */}
            <div className="mb-12 pb-12 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <Share2 size={16} className="text-primary" />
                <h3 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Chia sẻ dự án</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {/* Facebook Share */}
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-4 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all border border-blue-100 dark:border-blue-500/20 group"
                  aria-label="Chia sẻ lên Facebook"
                  title="Chia sẻ lên Facebook"
                >
                  <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Twitter Share */}
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-4 flex items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 transition-all border border-sky-100 dark:border-sky-500/20 group"
                  aria-label="Chia sẻ lên Twitter"
                  title="Chia sẻ lên Twitter"
                >
                  <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* LinkedIn Share */}
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-4 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all border border-blue-100 dark:border-blue-500/20 group"
                  aria-label="Chia sẻ lên LinkedIn"
                  title="Chia sẻ lên LinkedIn"
                >
                  <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Instagram Share */}
                <a
                  href={shareLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-center rounded-2xl bg-pink-50 dark:bg-pink-500/10 hover:bg-pink-100 dark:hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 transition-all border border-pink-100 dark:border-pink-500/20 group"
                  aria-label="Chia sẻ lên Instagram"
                  title="Chia sẻ lên Instagram"
                >
                  <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="p-4 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-600 dark:text-gray-400 transition-all border border-gray-200 dark:border-white/20 group"
                  aria-label="Sao chép liên kết"
                  title="Sao chép liên kết"
                >
                  {copied ? <Check size={20} className="text-green-600 dark:text-green-400" /> : <Copy size={20} className="group-hover:scale-110 transition-transform" />}
                </button>
              </div>
            </div>
          </div>

          {/* Related Projects Section */}
          <div className="mt-auto border-t border-gray-100 dark:border-white/5 p-8 md:p-12 bg-gray-50/50 dark:bg-black/20">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-primary" />
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Dự án liên quan</h3>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
              {relatedProjects.map(p => (
                <button
                  key={p.project_id}
                  onClick={() => onSelect(p)}
                  className="group flex flex-col gap-3 min-w-[200px] text-left snap-start"
                >
                  <div className="aspect-video w-full rounded-2xl overflow-hidden relative">
                    <img src={p.project_img || FALLBACK_IMAGE} alt={p.project_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[8px] font-black text-white uppercase tracking-widest bg-primary px-3 py-1 rounded-full">Xem ngay</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-1 block opacity-70">{p.category}</span>
                    <h4 className="text-[11px] font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate w-full">{p.project_name}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = memo(({ project, index, onSelect, layout }: any) => {
  const isFeatured = index % 5 === 0 && layout === 'grid';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative flex flex-col transition-all duration-500 rounded-[2.5rem] overflow-hidden gpu-accelerated cursor-pointer
        ${layout === 'list' ? 'md:flex-row w-full h-auto md:items-stretch mb-8' : 'h-full'}
        ${isFeatured ? 'md:col-span-2' : 'col-span-1'}
        ${layout === 'carousel' ? 'min-w-[320px] md:min-w-[400px] snap-center' : ''}
        ${layout === 'minimal' ? 'group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl' : ''}
        ${layout === 'comparison' ? 'group flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl' : ''}
      `}
      onClick={() => onSelect(project)}
    >
      <div className="absolute inset-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500" />
      
      <div className={`relative overflow-hidden shrink-0 ${layout === 'list' ? 'md:w-[320px] lg:w-[400px]' : (layout === 'minimal' || layout === 'comparison' ? 'w-16 h-16 rounded-2xl' : 'h-64')} ${isFeatured ? 'md:h-[450px]' : ''}`}>
        <img src={project.project_img || FALLBACK_IMAGE} alt={`Project ${project.project_name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
        {layout !== 'minimal' && layout !== 'comparison' && (
          <div className="absolute top-6 left-6 z-20"><span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest border border-white/20">{project.category}</span></div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1 relative z-10 min-w-0">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors tracking-tight ${isFeatured ? 'text-4xl' : 'text-2xl'} truncate`}>{project.project_name}</h3>
          <ArrowRight size={20} className="text-gray-300 group-hover:text-primary group-hover:rotate-[-45deg] transition-all shrink-0" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6 line-clamp-2">{project.project_des}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.project_type.slice(0, 4).map(t => (
            <span key={t.type_id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-white/5 text-[9px] font-black text-gray-400 uppercase tracking-tighter">
              {getTechIcon(t.type_name)}{t.type_name}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

const TimelineItem = ({ project, index, onSelect }: any) => {
  const isLeft = index % 2 === 0;
  return (
    <motion.article initial={{ opacity: 0, x: isLeft ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} className={`flex w-full mb-12 items-center justify-between ${isLeft ? '' : 'flex-row-reverse'}`}>
      <div className="hidden md:block w-5/12" />
      <div className="z-20 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shrink-0 border-4 border-white dark:border-gray-950 shadow-lg" aria-hidden="true"><Calendar size={14} /></div>
      <div onClick={() => onSelect(project)} className={`w-full md:w-5/12 bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 cursor-pointer hover:border-primary/50 transition-all group relative`}>
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">{project.project_year}</span>
        <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">{project.project_name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{project.project_des}</p>
      </div>
    </motion.article>
  );
};

const Projects: React.FC<{ layout?: string }> = ({ layout = 'grid' }) => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Mobile App'];

  const filteredProjects = useMemo(() => {
    let list = [...mockProjects].sort((a, b) => b.project_id - a.project_id);
    if (filter !== 'All') list = list.filter(p => p.category === filter);
    return list;
  }, [filter]);

  const displayedProjects = useMemo(() => {
    if (layout === 'carousel' || showAll) return filteredProjects;
    return filteredProjects.slice(0, 6);
  }, [filteredProjects, showAll, layout]);

  const remainingCount = filteredProjects.length - displayedProjects.length;

  const handleScroll = (dir: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Archive & Showcase</span>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-4">Kho dự án <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x">Thực chiến.</span></h2>
          </motion.div>
          {layout === 'carousel' && (
            <div className="flex gap-3">
              <button onClick={() => handleScroll('left')} className="p-4 bg-white dark:bg-gray-900 rounded-2xl text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-white/10" aria-label="Slide trái"><ChevronLeft size={24} /></button>
              <button onClick={() => handleScroll('right')} className="p-4 bg-white dark:bg-gray-900 rounded-2xl text-gray-400 hover:text-primary transition-all border border-gray-100 dark:border-white/10" aria-label="Slide phải"><ChevronRight size={24} /></button>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-2 mb-16 overflow-x-auto pb-4 no-scrollbar" aria-label="Lọc dự án">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setFilter(cat); setShowAll(false); }} className={`relative px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <span className="relative z-10">{cat}</span>
              {filter === cat && <motion.div layoutId="activeCat" className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
            </button>
          ))}
        </nav>

        <motion.div 
          layout 
          className={`
            ${layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}
            ${layout === 'carousel' ? 'flex gap-8 overflow-x-auto pb-12 px-2 no-scrollbar snap-x' : ''}
            ${layout === 'masonry' ? 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8' : ''}
            ${layout === 'list' || layout === 'comparison' ? 'flex flex-col gap-6' : ''}
            ${layout === 'minimal' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
            ${layout === 'timeline' ? 'relative max-w-4xl mx-auto' : ''}
          `}
        >
          {layout === 'timeline' && <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gray-200 dark:bg-white/10 hidden md:block" aria-hidden="true" />}
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((p, idx) => (
              layout === 'timeline' ? (
                <TimelineItem key={p.project_id} project={p} index={idx} onSelect={setSelectedProject} />
              ) : (
                <ProjectCard key={p.project_id} project={p} index={idx} onSelect={setSelectedProject} layout={layout} />
              )
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && remainingCount > 0 && layout !== 'carousel' && (
          <motion.div layout className="mt-20 text-center">
            <button onClick={() => setShowAll(true)} className="group relative px-10 py-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-black text-[10px] uppercase tracking-widest hover:border-primary transition-all shadow-xl flex items-center gap-3 mx-auto active:scale-95">
              <Plus size={16} className="text-primary group-hover:rotate-180 transition-transform duration-500" />
              Xem thêm ({remainingCount})
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onSelect={setSelectedProject} />}
      </AnimatePresence>
    </section>
  );
};

export default memo(Projects);
