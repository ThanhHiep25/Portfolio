import React, { useMemo, useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../interfaces/user';
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
    ArrowLeft,
    CheckCircle2,
    Share2,
    Twitter,
    Linkedin,
    Facebook,
    Copy,
    Check,
    ExternalLink,
    Sparkles,
    BarChart3,
    Milestone,
    Flag,
    Search,
    Settings,
    Rocket,
    Instagram,
    Calendar,
    Eye,
    Code,
    Icon,
    Terminal,
    Moon,
    Sun,
} from 'lucide-react';
import { nav } from 'framer-motion/client';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";

const TECH_ICON_MAP: Record<string, React.ReactNode> = {
    'react': <Layers size={16} />,
    'next': <Layers size={16} />,
    'node': <Server size={16} />,
    'express': <Server size={16} />,
    'spring': <Server size={16} />,
    'backend': <Server size={16} />,
    'golang': <Server size={16} />,
    'java': <Server size={16} />,
    'mongo': <Database size={16} />,
    'mysql': <Database size={16} />,
    'firebase': <Database size={16} />,
    'database': <Database size={16} />,
    'postgresql': <Database size={16} />,
    'tailwind': <Layout size={16} />,
    'css': <Layout size={16} />,
    'html': <Layout size={16} />,
    'frontend': <Layout size={16} />,
    'api': <Globe size={16} />,
    'axios': <Globe size={16} />,
    'http': <Globe size={16} />,
    'three': <Box size={16} />,
    'blender': <Box size={16} />,
    '3d': <Box size={16} />,
    'map': <MapPin size={16} />,
    'leaflet': <MapPin size={16} />,
    'animation': <Zap size={16} />,
    'zap': <Zap size={16} />,
    'mobile': <Smartphone size={16} />,
    'web': <Monitor size={16} />,
    'js': <Code2 size={16} />,
    'python': <Code2 size={16} />,
    'code': <Code2 size={16} />,
};

const getTechIcon = (name: string): React.ReactNode => {
    const n = name.toLowerCase();
    for (const [key, icon] of Object.entries(TECH_ICON_MAP)) {
        if (n.includes(key)) return icon;
    }
    return <Cpu size={16} />;
};

interface ProjectDetailProps {
    projectId: number;
    onBack: () => void;
    onSelectProject?: (projectId: number) => void;
}

interface FloatingIconProps {
    icon: React.ComponentType<any>;
    color: string;
    delay: number;
    initialPos: Record<string, string>;
}

const FloatingIcon: React.FC<FloatingIconProps> = memo(({ icon: Icon, color, delay, initialPos }: FloatingIconProps) => {
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
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay }}
            className={`absolute pointer-events-none ${color} gpu-accelerated`}>
            <Icon size={32} strokeWidth={1.5} />
        </motion.div>
    )
})

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onSelectProject }) => {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'technologies' | 'timeline'>('overview');

    const project = useMemo(() => {
        return mockProjects.find(p => p.project_id === projectId);
    }, [projectId]);

    // Always jump to top when switching to a new project detail
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [projectId]);

    const relatedProjects = useMemo(() => {
        if (!project) return [];
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
            .slice(0, 3);
    }, [project]);

    const projectUrl = typeof window !== 'undefined' ? `${window.location.origin}?project=${project?.project_id}` : '';

    const shareLinks = useMemo(() => ({
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}&quote=${encodeURIComponent(`${project?.project_name} - ${project?.project_des}`)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(`Xem dự án "${project?.project_name}": ${project?.project_des}`)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
        instagram: `https://instagram.com/`,
    }), [projectUrl, project?.project_name, project?.project_des]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(projectUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: string) => {
        const shareUrl = shareLinks[platform as keyof typeof shareLinks];
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    const timelineSteps = useMemo(() => [
        { label: 'Khởi tạo', icon: <Search size={16} />, status: 'done' },
        { label: 'Thiết kế', icon: <Layout size={16} />, status: 'done' },
        { label: 'Phát triển', icon: <Settings size={16} />, status: 'done' },
        { label: 'Hoàn thiện', icon: <Flag size={16} />, status: project?.status === 'Completed' ? 'done' : 'active' },
        { label: 'Triển khai', icon: <Rocket size={16} />, status: project?.status === 'Completed' ? 'done' : 'next' }
    ], [project?.status]);

    if (!project) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"
            >
                <button
                onClick={()=>{
                    onBack();
                    window.location.reload();
                }}
                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 relative"
        >

            {/* Floating Tech Icons */}
            <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-60" style={{ zIndex: 0 }} aria-hidden="true">
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
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300 font-semibold text-sm"
                    >
                        <ArrowLeft size={18} />
                        Quay lại
                    </button>

                    <div className="flex items-start justify-between gap-8">
                        <div className="flex-1">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block">{project.category}</span>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">
                                {project.project_name}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 font-medium max-w-2xl">
                                {project.project_des}
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider mb-2">Năm</div>
                                    <div className="text-2xl font-black text-gray-900 dark:text-white">{project.project_year}</div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider mb-2">Trạng thái</div>
                                    <div className="text-sm font-black text-primary flex items-center gap-2">
                                        <CheckCircle2 size={16} />
                                        {project.status || 'Hoàn thành'}
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider mb-2">Công nghệ</div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white">{project.project_type.length} tech</div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider mb-2">Loại</div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white">{project.category}</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {project.project_demo && (
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.project_demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                                    >
                                        <Eye size={18} />
                                        Live Demo
                                    </motion.a>
                                )}
                                {project.project_link && (
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.project_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm uppercase tracking-wider border border-gray-200 dark:border-white/10 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                                    >
                                        <Github size={18} />
                                        Mã nguồn
                                    </motion.a>
                                )}
                            </div>
                        </div>

                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block w-96 shrink-0"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/5 shadow-2xl">
                                <img
                                    src={project.project_img || FALLBACK_IMAGE}
                                    alt={project.project_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Mobile Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="lg:hidden mb-12"
                >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/5 shadow-2xl">
                        <img
                            src={project.project_img || FALLBACK_IMAGE}
                            alt={project.project_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Tabs Navigation */}
                <div className="mb-12 border-b border-gray-200 dark:border-white/5 flex gap-8">
                    {['overview', 'technologies', 'timeline'].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 font-black text-sm uppercase tracking-wider transition-all relative ${activeTab === tab
                                    ? 'text-primary'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            {tab === 'overview' ? 'Tổng quan' : tab === 'technologies' ? 'Công nghệ' : 'Lộ trình'}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-x-0 -bottom-1 h-1 bg-primary rounded-full"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12 mb-16"
                        >
                            {/* Share Section */}
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <Share2 size={20} className="text-primary" />
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">Chia sẻ dự án</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleShare('facebook')}
                                        className="p-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/15 dark:to-blue-500/5 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-500/25 dark:hover:to-blue-500/10 text-blue-600 dark:text-blue-400 transition-all border border-blue-200 dark:border-blue-500/30 shadow-sm hover:shadow-md group"
                                        title="Chia sẻ lên Facebook"
                                    >
                                        <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleShare('twitter')}
                                        className="p-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-500/15 dark:to-sky-500/5 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-500/25 dark:hover:to-sky-500/10 text-sky-600 dark:text-sky-400 transition-all border border-sky-200 dark:border-sky-500/30 shadow-sm hover:shadow-md group"
                                        title="Chia sẻ lên Twitter"
                                    >
                                        <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleShare('linkedin')}
                                        className="p-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/15 dark:to-blue-500/5 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-500/25 dark:hover:to-blue-500/10 text-blue-600 dark:text-blue-400 transition-all border border-blue-200 dark:border-blue-500/30 shadow-sm hover:shadow-md group"
                                        title="Chia sẻ lên LinkedIn"
                                    >
                                        <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                                    </motion.button>

                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={shareLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-500/15 dark:to-pink-500/5 hover:from-pink-100 hover:to-pink-200 dark:hover:from-pink-500/25 dark:hover:to-pink-500/10 text-pink-600 dark:text-pink-400 transition-all border border-pink-200 dark:border-pink-500/30 shadow-sm hover:shadow-md group"
                                        title="Chia sẻ lên Instagram"
                                    >
                                        <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                                    </motion.a>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCopyLink}
                                        className="p-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/50 dark:from-white/15 dark:to-white/5 hover:from-gray-200 hover:to-gray-300 dark:hover:from-white/25 dark:hover:to-white/10 text-gray-600 dark:text-gray-400 transition-all border border-gray-300 dark:border-white/20 shadow-sm hover:shadow-md group"
                                        title="Sao chép liên kết"
                                    >
                                        {copied ? <Check size={20} className="text-green-600 dark:text-green-400" /> : <Copy size={20} className="group-hover:scale-110 transition-transform" />}
                                    </motion.button>
                                </div>
                                <AnimatePresence>
                                    {copied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={16} />
                                            Đã sao chép liên kết!
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                    {/* Technologies Tab */}
                    {activeTab === 'technologies' && (
                        <motion.div
                            key="technologies"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-white/5 mb-16"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <BarChart3 size={20} className="text-primary" />
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">Công nghệ sử dụng</h3>
                            </div>
                            <div className="grid gap-6">
                                {project.project_type.map((t, i) => {
                                    const level = 100 - (i * 10) - (Math.random() * 5);
                                    return (
                                        <motion.div
                                            key={t.type_id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="space-y-2"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center gap-3 text-sm font-black text-gray-900 dark:text-white">
                                                    {getTechIcon(t.type_name)}
                                                    {t.type_name}
                                                </span>
                                                <span className="text-sm font-black text-gray-500 dark:text-gray-400">{Math.round(level)}%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${level}%` }}
                                                    transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: 'circOut' }}
                                                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === 'timeline' && (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-white/5 mb-16"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Milestone size={20} className="text-primary" />
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">Lộ trình dự án</h3>
                            </div>
                            <div className="relative">
                                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 dark:bg-white/5 hidden md:block" />
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 relative z-10">
                                    {timelineSteps.map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            className="flex flex-col items-center gap-3"
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md border-4 border-white dark:border-gray-900 ${step.status === 'done'
                                                        ? 'bg-primary text-white'
                                                        : step.status === 'active'
                                                            ? 'bg-primary/20 text-primary animate-pulse border-primary/50'
                                                            : 'bg-gray-100 dark:bg-white/5 text-gray-400'
                                                    }`}
                                            >
                                                {step.icon}
                                            </div>
                                            <span
                                                className={`text-[11px] font-black uppercase tracking-widest text-center ${step.status === 'done' ? 'text-primary' : 'text-gray-400'
                                                    }`}
                                            >
                                                {step.label}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-20"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles size={20} className="text-primary" />
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Dự án liên quan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p) => (
                                <motion.button
                                    key={p.project_id}
                                    whileHover={{ y: -8 }}
                                    onClick={() => {
                                        if (onSelectProject) {
                                            onSelectProject(p.project_id);
                                        } else {
                                            window.scrollTo(0, 0);
                                            window.history.pushState({}, '', `?project=${p.project_id}`);
                                            window.location.reload();
                                        }
                                    }}
                                    className="group w-full text-left bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer"
                                >
                                    <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={p.project_img || FALLBACK_IMAGE}
                                            alt={p.project_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs font-black text-primary uppercase tracking-wider mb-2 block opacity-70">{p.category}</span>
                                        <h4 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-3">{p.project_name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{p.project_des}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {p.project_type.slice(0, 2).map(t => (
                                                <span key={t.type_id} className="flex items-center gap-1 px-2 py-1 text-xs font-black rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                                                    {getTechIcon(t.type_name)}
                                                    {t.type_name}
                                                </span>
                                            ))}
                                            {p.project_type.length > 2 && (
                                                <span className="px-2 py-1 text-xs font-black rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                                                    +{p.project_type.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
