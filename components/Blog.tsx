import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/dataBlog';
import { ArrowRight, Clock, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block"
            >
              / Kiến thức chuyên môn
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter"
            >
              Blog <span className="text-primary">Kỹ thuật</span>.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest"
            >
              Tất cả bài viết <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-bold flex items-center gap-2">
                      Đọc bài viết <ChevronRight size={18} />
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      Xem chi tiết
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
    </section>
  );
};

export default Blog;
