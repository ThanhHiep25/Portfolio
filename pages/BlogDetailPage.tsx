import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/dataBlog';
import { Calendar, Clock, ArrowLeft, Tag, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      // Redirect if post not found
      const timer = setTimeout(() => navigate('/blog'), 3000);
      return () => clearTimeout(timer);
    }
  }, [post, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Không tìm thấy bài viết</h1>
          <p className="text-gray-500 dark:text-gray-400">Đang chuyển hướng về trang Blog...</p>
        </div>
      </div>
    );
  }

  const postSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": [post.image],
    "datePublished": "2024-05-15", // Ideal to have this in data
    "author": [{
        "@type": "Person",
        "name": "Nguyễn Hiệp",
        "url": "https://nguyenhiep.dev/"
      }]
  } : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32">
      <SEO 
        title={`${post.title} - Blog`} 
        description={post.excerpt} 
        image={post.image}
        type="article"
        schema={postSchema}
      />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-8 hover:gap-4 transition-all"
          >
            <ArrowLeft size={16} /> Quay lại Blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.95] mb-8">
            {post.title}
          </h1>

          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic border-l-4 border-primary pl-6">
            {post.excerpt}
          </p>
        </motion.div>
      </div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 mb-20"
      >
        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* Left Sidebar - Social Share */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-40 flex flex-col items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 vertical-text mb-4">Chia sẻ</span>
            <button className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
              <Facebook size={20} />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
              <Twitter size={20} />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
              <LinkIcon size={20} />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="lg:col-span-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-xl dark:prose-invert max-w-none 
              prose-h2:text-4xl prose-h2:font-black prose-h2:tracking-tighter prose-h2:mt-16 prose-h2:mb-8
              prose-h3:text-2xl prose-h3:font-bold prose-h3:text-primary
              prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8
              prose-code:bg-primary/10 prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
              prose-strong:text-gray-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Footer of Article */}
          <div className="mt-20 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Tag size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Thẻ bài viết</p>
                <div className="flex gap-3">
                  {['React', 'Development', post.category].map(tag => (
                    <span key={tag} className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-6 py-3 rounded-2xl text-sm font-bold text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all group">
                <Share2 size={18} /> Chia sẻ bài viết
               </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Author / Related */}
        <div className="lg:col-span-3">
          <div className="sticky top-40 flex flex-col gap-8">
            <div className="bg-gray-50 dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/5">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Tác giả</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-primary/20">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-black text-gray-900 dark:text-white tracking-tight">Thanh Hiep</p>
                  <p className="text-xs text-primary font-bold">Frontend Developer</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Chuyên gia xây dựng trải nghiệm người dùng hiện đại và hiệu năng cao.
              </p>
              <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary-hover transition-all">
                Theo dõi
              </button>
            </div>
          </div>
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default BlogDetailPage;
