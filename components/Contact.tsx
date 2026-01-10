
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Loader2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import userAbout from '../data/dataAbout';
import { GoogleGenAI } from "@google/genai";

const Contact: React.FC = () => {
  const user = userAbout[0];
  const [emailCopied, setEmailCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [personalizedReply, setPersonalizedReply] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialIcons = [
    { name: 'LinkedIn', url: user.linkedIn, icon: <Linkedin size={20} /> },
    { name: 'GitHub', url: user.github, icon: <Github size={20} /> },
    { name: 'Facebook', url: user.facebook, icon: <Facebook size={20} /> },
    { name: 'Email', url: `mailto:${user.email}`, icon: <Mail size={20} /> },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    try {
      // 1. Tạo lời cảm ơn cá nhân hóa bằng Gemini AI
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Khách hàng tên ${formData.name} vừa gửi tin nhắn: "${formData.message}". Hãy viết 1 câu cảm ơn cực kỳ chuyên nghiệp, ngắn gọn (dưới 20 từ) để Alex gửi lại họ ngay lập tức. Xưng Alex, gọi Bạn.`,
      });
      setPersonalizedReply(response.text || `Cảm ơn ${formData.name}, Alex đã nhận được thông tin và sẽ phản hồi bạn sớm nhất!`);
      
      console.log("Sending email with data:", formData);
      
      // Giả lập delay mạng
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      // Reset form sau khi gửi thành công
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error("Gửi tin nhắn lỗi:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-gray-50 dark:bg-gray-950 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] mb-4 block">Get in touch</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight sm:leading-none">
              Hãy cùng tạo nên <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Điều Tuyệt Vời.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 md:mb-12 text-base sm:text-xl leading-relaxed font-medium max-w-lg">
              Alex luôn sẵn sàng lắng nghe ý tưởng của bạn. Gửi tin nhắn ngay để nhận phản hồi tự động từ AI của mình nhé!
            </p>
            
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
              {[
                { icon: <Phone size={20} />, text: user.phone, label: 'Điện thoại' },
                { icon: <MapPin size={20} />, text: user.address, label: 'Vị trí' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 shadow-sm group hover:border-primary/30 transition-all">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</span>
                    <span className="font-bold text-gray-700 dark:text-gray-200">{item.text}</span>
                  </div>
                </div>
              ))}
              
              <div className="group flex items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Email cá nhân</span>
                    <span className="font-bold text-gray-700 dark:text-gray-200 block truncate text-sm sm:text-base">{user.email}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <AnimatePresence mode="wait">
                    {emailCopied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check size={18} className="text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialIcons.map((social) => (
                <motion.a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm text-gray-400 hover:text-primary border border-gray-100 dark:border-white/5 hover:border-primary transition-all"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form / Success State */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-900 p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-[3rem] shadow-2xl border border-primary/20 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                  <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
                      <CheckCircle2 size={48} />
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-primary/20 rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">Tin nhắn đã gửi!</h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 font-medium">
                    Email tự động đã được gửi tới hộp thư của bạn. Hiệp cũng đã nhận được thông báo ngay lập tức.
                  </p>
                  
                  {/* AI Response Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 bg-primary/5 rounded-2xl border border-primary/10 text-left mb-10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-primary" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Phản hồi nhanh từ Alex AI</span>
                    </div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200 italic leading-relaxed">
                      "{personalizedReply}"
                    </p>
                  </motion.div>

                  <button 
                    onClick={() => setStatus('idle')}
                    className="flex items-center gap-2 mx-auto text-primary font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Gửi tin nhắn khác <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/5 relative"
                >
                  <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><Send size={18} /></div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase tracking-widest text-xs">Gửi lời nhắn</h3>
                  </div>

                  <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ tên của bạn</label>
                        <input 
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          type="text" 
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white font-bold" 
                          placeholder="Nguyễn Văn A" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Địa chỉ Email</label>
                        <input 
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email" 
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white font-bold" 
                          placeholder="email@example.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nội dung tin nhắn</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5} 
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white font-bold resize-none" 
                        placeholder="Bạn muốn trao đổi về dự án nào?"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={status === 'sending'}
                      className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl 
                        ${status === 'sending' 
                          ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                          : 'bg-primary text-white hover:bg-primary-hover shadow-primary/25 active:scale-95'}
                      `}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Đang kết nối...
                        </>
                      ) : (
                        <>
                          Gửi đi ngay
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs font-bold text-red-500">
                        Có lỗi xảy ra, Alex đang sửa chữa. Hãy thử lại sau nhé!
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} {user.name} Portfolio • Built with React & TailwindCSS
          </p>
          <div className="flex gap-8">
            <a href="#about" className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Về tôi</a>
            <a href="#projects" className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Dự án</a>
            <a href="#skills" className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Kỹ năng</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
