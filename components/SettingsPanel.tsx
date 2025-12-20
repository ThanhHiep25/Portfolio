
import React from 'react';
import { X, Moon, Sun, Check, Palette, LayoutGrid, StretchHorizontal, GalleryHorizontal, LayoutList, Columns, GitCommit, TableProperties, Sparkles, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSettings, ThemeColor } from '../types';
import { THEME_COLORS } from '../constants';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, settings, updateSettings }) => {
  const currentPrimaryHex = THEME_COLORS[settings.primaryColor]?.hex || settings.primaryColor;
  const currentAccentHex = settings.accentColor;

  const layouts = [
    { id: 'grid', label: 'Lưới', icon: <LayoutGrid size={18} /> },
    { id: 'list', label: 'Chi tiết', icon: <StretchHorizontal size={18} /> },
    { id: 'carousel', label: 'Slide', icon: <GalleryHorizontal size={18} /> },
    { id: 'minimal', label: 'Nhỏ', icon: <LayoutList size={18} /> },
    { id: 'masonry', label: 'Xếp gạch', icon: <Columns size={18} /> },
    { id: 'timeline', label: 'Dòng thời gian', icon: <GitCommit size={18} /> },
    { id: 'comparison', label: 'So sánh', icon: <TableProperties size={18} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-[70] overflow-y-auto custom-scrollbar"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Palette size={24} className="text-primary" />
                  Cá nhân hóa
                </h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Theme Mode */}
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Chế độ hiển thị</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateSettings({ darkMode: false })}
                    className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      !settings.darkMode 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <Sun size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sáng</span>
                  </button>
                  <button
                    onClick={() => updateSettings({ darkMode: true })}
                    className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      settings.darkMode 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <Moon size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tối</span>
                  </button>
                </div>
              </div>

              {/* Project Layout */}
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Bố cục dự án</h3>
                <div className="grid grid-cols-2 gap-3">
                  {layouts.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => updateSettings({ projectLayout: layout.id as any })}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                        settings.projectLayout === layout.id 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      {layout.icon}
                      <span className="text-[9px] font-black uppercase tracking-widest text-center">{layout.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Color Presets */}
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Bộ màu giao diện</h3>
                <div className="grid grid-cols-5 gap-3">
                  {Object.entries(THEME_COLORS).map(([key, color]) => (
                    <button
                      key={key}
                      onClick={() => updateSettings({ primaryColor: key })}
                      className={`group relative w-full aspect-square rounded-full flex items-center justify-center transition-all hover:scale-110 focus:outline-none ${
                        settings.primaryColor === key ? 'ring-4 ring-primary/20 scale-110' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {settings.primaryColor === key && (
                        <Check size={16} className="text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Custom Colors */}
              <div className="mb-10 space-y-6">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 border-t dark:border-gray-800 pt-6 flex items-center gap-2">
                   <Sparkles size={12} className="text-primary" /> Tùy chỉnh màu tự do
                </h3>
                <div className="space-y-6">
                  {/* Primary Color Control */}
                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Màu chủ đạo (Static)</label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border dark:border-gray-700 shadow-sm">
                        <input 
                          type="color" 
                          value={currentPrimaryHex}
                          onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                          className="absolute inset-0 w-[200%] h-[200%] cursor-pointer border-none p-0 scale-150 transform -translate-x-1/4 -translate-y-1/4"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={currentPrimaryHex.toUpperCase()}
                        onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  {/* Accent Color Control (Hover/Active) */}
                  <div>
                    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Màu nhấn (Hover / Active)</label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border dark:border-gray-700 shadow-sm" style={{ backgroundColor: currentAccentHex }}>
                        <input 
                          type="color" 
                          value={currentAccentHex}
                          onChange={(e) => updateSettings({ accentColor: e.target.value })}
                          className="absolute inset-0 w-[200%] h-[200%] cursor-pointer border-none p-0 scale-150 transform -translate-x-1/4 -translate-y-1/4"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={currentAccentHex.toUpperCase()}
                        onChange={(e) => updateSettings({ accentColor: e.target.value })}
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700">
                      <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <MousePointer2 size={10} /> Xem trước hiệu ứng
                      </span>
                      <button className="w-full py-3 bg-primary hover:bg-primary-hover active:bg-primary-active text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                        Thử nhấn tôi
                      </button>
                      <p className="mt-2 text-[8px] font-bold text-gray-400 leading-tight">Màu này sẽ áp dụng cho các nút, liên kết và các trạng thái tương tác trên toàn bộ Portfolio.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset */}
              <div className="pt-8 border-t dark:border-gray-800">
                <button
                  onClick={() => updateSettings({ 
                    darkMode: false, 
                    primaryColor: 'emerald',
                    accentColor: THEME_COLORS.emerald.hoverHex,
                    projectLayout: 'grid'
                  })}
                  className="w-full py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-750 transition-colors"
                >
                  Khôi phục mặc định
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
