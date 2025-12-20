// Fix: Added React import to resolve "Cannot find namespace 'React'" errors.
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2, Volume2, Loader2, Sparkles, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithGeminiStream } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: "Chào bạn! Alex đây. Cần hỏi gì về Hiệp không?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  const playAudio = useCallback(async (base64Data: string) => {
    if (!base64Data || !audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();

      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setIsSpeaking(false);
      setIsSpeaking(true);
      source.start();
    } catch (e) {
      console.error("Audio error", e);
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      // Sử dụng requestAnimationFrame để đảm bảo animation kết thúc trước khi cuộn
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const { audioPromise } = await chatWithGeminiStream(
        userMessage, 
        messages, 
        (chunk) => {
          setMessages(prev => {
            const last = prev[prev.length - 1];
            const others = prev.slice(0, -1);
            return [...others, { role: 'model', content: last.content + chunk }];
          });
        }
      );
      
      setIsLoading(false);
      const audioData = await audioPromise;
      if (audioData) playAudio(audioData);

    } catch (error) {
      setMessages(prev => {
        const others = prev.slice(0, -1);
        return [...others, { role: 'model', content: "Alex hơi bận, thử lại nhé!" }];
      });
      setIsLoading(false);
    }
  };

  // Chat window variants for smoother layout transitions
  const chatVariants = {
    initial: { opacity: 0, scale: 0.5, y: 100, x: 100 },
    open: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      x: 0,
    },
    exit: { opacity: 0, scale: 0.5, y: 100, x: 100 }
  };

  // Fix: Use 'as const' to ensure 'type' is specifically '"spring"' and not 'string' for framer-motion compatibility
  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 1
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] bg-primary text-white p-4 sm:p-5 rounded-full shadow-2xl group overflow-hidden"
            aria-label="Mở chat với Alex AI"
          >
            <Sparkles size={24} className="sm:w-7 sm:h-7 group-hover:animate-spin-slow" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            key="chat-window"
            variants={chatVariants}
            initial="initial"
            animate="open"
            exit="exit"
            transition={springTransition}
            className={`fixed z-[100] bg-white dark:bg-gray-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 flex flex-col gpu-accelerated
              bottom-4 right-4 sm:bottom-6 sm:right-6 origin-bottom-right
              ${isMinimized ? 'cursor-pointer' : ''}
            `}
            style={{ 
              width: isMinimized 
                ? (window.innerWidth < 640 ? '160px' : '220px') 
                : (window.innerWidth < 640 ? 'calc(100% - 2rem)' : '380px'),
              height: isMinimized 
                ? '60px' 
                : (window.innerWidth < 640 ? '70dvh' : '580px'),
              maxHeight: isMinimized ? '60px' : 'calc(100dvh - 3rem)',
            }}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            {/* Header */}
            <motion.div 
              layout="position"
              className={`bg-primary px-5 py-4 flex items-center justify-between text-white shrink-0 ${isMinimized ? 'h-full' : 'h-16'}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`shrink-0 ${isSpeaking ? 'animate-bounce' : ''}`}>
                  <Bot size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap">Alex AI</span>
                  {!isMinimized && <span className="text-[8px] opacity-70 uppercase tracking-tighter">Ready to help</span>}
                </div>
              </div>
              
              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>

            {/* Chat Body */}
            {!isMinimized && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-full overflow-hidden"
              >
                <div 
                  ref={scrollRef} 
                  className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar bg-gray-50/20 dark:bg-black/10"
                >
                  {messages.map((msg, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={idx}
                      className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                        msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400' : 'bg-primary text-white'
                      }`}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed max-w-[85%] font-medium shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700'
                      }`}>
                        {msg.content || (isLoading && idx === messages.length - 1 ? (
                          <div className="flex gap-1 py-1">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        ) : "")}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input Area */}
                <form 
                  onSubmit={handleSubmit} 
                  className="p-4 bg-white dark:bg-gray-900 border-t dark:border-white/5 flex gap-2 sm:gap-3 items-center"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl px-5 py-3.5 sm:py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm font-bold transition-all border border-transparent focus:border-primary/30"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className={`p-3.5 sm:p-4 rounded-2xl text-white transition-all flex items-center justify-center min-w-[48px] sm:min-w-[56px] shadow-lg
                      ${isLoading || !input.trim() ? 'bg-gray-200 dark:bg-gray-800 text-gray-400' : 'bg-primary hover:bg-primary-hover active:scale-90 shadow-primary/20'}
                    `}
                  >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                  </button>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;