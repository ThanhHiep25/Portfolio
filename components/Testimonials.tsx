
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "MEO meo Meo",
    role: "Senior Tech @MEO_Corporation",
    text: "Hiệp là một kỹ sư có tư duy UI rất tốt. Cậu ấy không chỉ viết code chạy được, mà còn viết code đẹp và tối ưu hiệu suất cực tốt.",
    avatar: "/assets/uv/meme-meo-cuoi-5.jpg"
  },
  {
    name: "MEO méo Meo",
    role: "Project Manager",
    text: "Khả năng nắm bắt công nghệ mới của Hiệp thật kinh ngạc. Sự sáng tạo không giới hạn của cậu ấy.",
    avatar: "/assets/uv/meme-meo-cuoi-27.jpg"
  },
  {
    name: "Hoàng Thị MEO",
    role: "UX Designer",
    text: "Làm việc với Hiệp rất nhàn vì cậu ấy hiểu sâu về UX. Mọi hiệu ứng chuyển cảnh đều được tính toán kỹ lưỡng để mang lại trải nghiệm tốt nhất.",
    avatar: "/assets/uv/meme-meo-cuoi-8.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Social Proof & Trust
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
            Đồng nghiệp <span className="text-primary">nói gì?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 relative overflow-hidden group"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic mb-8 relative z-10">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white text-sm">{item.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
