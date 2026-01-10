import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Heart, X, Copy, Check } from 'lucide-react';

interface DonateQRProps {
  qrImage?: string;
  donateLink?: string;
  title?: string;
  description?: string;
}

const DonateQR: React.FC<DonateQRProps> = ({ 
  qrImage = 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400',
  donateLink = 'https://paypal.me/yourname',
  title = 'Hỗ trợ dự án',
  description = 'Quét mã QR hoặc nhấp vào liên kết để hỗ trợ'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(donateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDonate = () => {
    window.open(donateLink, '_blank');
  };

  return (
    <>
      {/* Floating Donate Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart size={20} className="group-hover:animate-pulse" />
        <span className="font-black text-sm uppercase tracking-wider">Donate</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
           
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-white/10">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-pink-500/10 to-red-500/10 p-6 border-b border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg">
                      <Heart size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white">{title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="p-8 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="p-4 bg-white rounded-2xl border-2 border-gray-200 dark:border-white/10 shadow-lg">
                      <img
                        src={qrImage}
                        alt="Donate QR Code"
                        className="w-60 h-60 object-cover rounded-xl"
                      />
                    </div>
                  </motion.div>

                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Sử dụng ứng dụng thanh toán của bạn để quét mã này
                  </p>

                  {/* Action Buttons */}
                  <div className="w-full space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDonate}
                      className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Heart size={18} />
                        Ủng hộ ngay
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopyLink}
                      className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-white/10"
                    >
                      {copied ? (
                        <span className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                          <Check size={18} />
                          Đã sao chép!
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Copy size={18} />
                          Sao chép liên kết
                        </span>
                      )}
                    </motion.button>
                  </div>

                  {/* Footer Message */}
                  <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
                    Cảm ơn bạn đã ủng hộ! 🙏
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonateQR;
