import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2, Sparkles, Monitor, ShoppingBag, Briefcase, Zap } from 'lucide-react';
import { templates, Template as TemplateType } from '../data/dataTemplate';

// --- Components ---

const FilterTab: React.FC<{
  label: string;
  value: string;
  isActive: boolean;
  onClick: (val: string) => void;
  icon?: React.ElementType;
}> = ({
  label,
  value,
  isActive,
  onClick,
  icon: Icon
}) => (
    <button
      onClick={() => onClick(value)}
      className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isActive
        ? 'text-white'
        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-black dark:bg-white rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2 mix-blend-exclusion">
        {Icon && <Icon size={16} />}
        {label}
      </span>
    </button>
  );

const TemplateCard: React.FC<{ template: TemplateType }> = ({ template }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col items-start gap-4 p-4 rounded-3xl bg-white/50 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={template.template_img}
          alt={template.template_name}
          className="w-full h-full object-cover"
        />

        {/* Overlay / Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <motion.a
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm tracking-wide shadow-lg hover:bg-gray-100 transition-colors"
            animate={{ opacity: 1, scale: 1 }} // Needs clearer trigger usually, but for hover group it's ok
            href={template.template_demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo <Zap size={16} className="fill-current" />
          </motion.a>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
          {template.status}
        </div>
      </div>

      {/* Content */}
      <div className="w-full space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
              {template.template_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {template.template_des}
            </p>
          </div>
          <a
            href={template.template_link}
            className="p-2 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        {/* Footer / Tags */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 w-full flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {template.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-mono text-gray-400">{template.template_year}</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

const categories = [
  { label: "All Works", value: "all", icon: Sparkles },
  { label: "Creative", value: "creative", icon: Monitor },
  { label: "Business", value: "business", icon: Briefcase },
  { label: "Commerce", value: "ecommerce", icon: ShoppingBag },
  { label: "Personal", value: "personal", icon: Code2 },
];

const Template = () => {
  const [activeCategory, setActiveCategory] = useState("all");



  const filteredTemplates = useMemo(() => {
    if (activeCategory === "all") return templates;
    return templates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="template" className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative z-10 flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-9xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
              Digital <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Masterpieces</span>
            </h1>
            <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed mx-auto">
              Curated collection of next-gen web templates. Built with precision, animated with soul. Choose your digital identity.
            </p>
          </motion.div>

          {/* Filter Tabs */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-2 p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-white/5"
          >
            {categories.map((cat) => (
              <FilterTab
                key={cat.value}
                label={cat.label}
                value={cat.value}
                icon={cat.icon}
                isActive={activeCategory === cat.value}
                onClick={setActiveCategory}
              />
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.template_id} template={template} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 border border-purple-500/20">
              <Sparkles size={14} />
              <span>Design Trends 2026</span>
            </div>
            <p className="text-gray-400 text-lg">No templates found in this category yet.</p>
          </motion.div>
        )}

        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] mix-blend-screen" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] mix-blend-screen" />
        </div>
      </div>

    </section>
  );
};

export default Template;