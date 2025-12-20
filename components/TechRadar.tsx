// Fix: Added React import to resolve "Cannot find namespace 'React'" errors.
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Server, 
  Wrench, 
  Palette,
  Info
} from 'lucide-react';
import { Skill } from '../interfaces/user';

interface TechRadarProps {
  skills: Skill[];
}

interface Blip {
  id: number;
  name: string;
  x: number;
  y: number;
  quadrant: string;
  ring: string;
  level: number;
}

const TechRadar: React.FC<TechRadarProps> = ({ skills }) => {
  const [hoveredBlip, setHoveredBlip] = useState<Blip | null>(null);

  const radarData = useMemo(() => {
    const size = 500;
    const center = size / 2;
    const maxRadius = size * 0.45;

    const quadrants = [
      { name: 'Frontend', startAngle: -Math.PI, endAngle: -Math.PI / 2, icon: <Layers size={14} />, color: 'text-blue-500' },
      { name: 'Backend', startAngle: -Math.PI / 2, endAngle: 0, icon: <Server size={14} />, color: 'text-emerald-500' },
      { name: 'Tools', startAngle: 0, endAngle: Math.PI / 2, icon: <Wrench size={14} />, color: 'text-amber-500' },
      { name: 'Design', startAngle: Math.PI / 2, endAngle: Math.PI, icon: <Palette size={14} />, color: 'text-pink-500' },
    ];

    const rings = [
      { name: 'Adopt', radius: maxRadius * 0.4, label: 'Làm chủ' },
      { name: 'Trial', radius: maxRadius * 0.7, label: 'Thành thạo' },
      { name: 'Assess', radius: maxRadius, label: 'Đang học' },
    ];

    const blips: Blip[] = skills.map((skill, index) => {
      const level = parseInt(skill.skill_level);
      const name = skill.skill_name.toLowerCase();
      
      let quadrantIdx = 0;
      if (name.includes('node') || name.includes('java') || name.includes('golang') || name.includes('firebase') || name.includes('mongo') || name.includes('api') || name.includes('socket')) quadrantIdx = 1;
      else if (name.includes('git') || name.includes('docker')) quadrantIdx = 2;
      else if (name.includes('figma') || name.includes('ux') || name.includes('ui')) quadrantIdx = 3;
      else quadrantIdx = 0;

      const quad = quadrants[quadrantIdx];
      
      let ringIdx = 0;
      if (level >= 90) ringIdx = 0;
      else if (level >= 75) ringIdx = 1;
      else ringIdx = 2;

      const innerR = ringIdx === 0 ? 0 : rings[ringIdx - 1].radius;
      const outerR = rings[ringIdx].radius;
      
      // Random position within its ring and quadrant segment
      const r = innerR + Math.random() * (outerR - innerR - 10) + 5;
      const angle = quad.startAngle + 0.1 + Math.random() * (quad.endAngle - quad.startAngle - 0.2);

      return {
        id: skill.skill_id,
        name: skill.skill_name,
        level: level,
        quadrant: quad.name,
        ring: rings[ringIdx].name,
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle)
      };
    });

    return { size, center, quadrants, rings, blips };
  }, [skills]);

  return (
    <div className="relative w-full max-w-[600px] mx-auto group">
      <svg viewBox={`0 0 ${radarData.size} ${radarData.size}`} className="w-full h-auto drop-shadow-2xl overflow-visible">
        {/* Radar Background Rings */}
        {radarData.rings.map((ring, i) => (
          <circle
            key={ring.name}
            cx={radarData.center}
            cy={radarData.center}
            r={ring.radius}
            fill="none"
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-800/50"
            strokeWidth="1"
            strokeDasharray={i === 2 ? "none" : "4 4"}
          />
        ))}

        {/* Quadrant Lines */}
        <line x1={radarData.center - radarData.rings[2].radius} y1={radarData.center} x2={radarData.center + radarData.rings[2].radius} y2={radarData.center} stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" />
        <line x1={radarData.center} y1={radarData.center - radarData.rings[2].radius} x2={radarData.center} y2={radarData.center + radarData.rings[2].radius} stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" />

        {/* Ring Labels */}
        {radarData.rings.map((ring, i) => (
          <text
            key={ring.label}
            x={radarData.center}
            y={radarData.center - ring.radius + 15}
            textAnchor="middle"
            className="text-[8px] font-black uppercase tracking-widest fill-gray-400 dark:fill-gray-600 pointer-events-none"
          >
            {ring.label}
          </text>
        ))}

        {/* Quadrant Labels */}
        {radarData.quadrants.map((q, i) => {
          const angle = (q.startAngle + q.endAngle) / 2;
          const r = radarData.rings[2].radius + 35;
          const x = radarData.center + r * Math.cos(angle);
          const y = radarData.center + r * Math.sin(angle);
          return (
            <g key={q.name}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                className={`text-[10px] font-black uppercase tracking-[0.2em] fill-gray-500 dark:fill-gray-400`}
              >
                {q.name}
              </text>
            </g>
          );
        })}

        {/* Blips */}
        {radarData.blips.map((blip) => (
          <motion.g
            key={blip.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredBlip(blip)}
            onMouseLeave={() => setHoveredBlip(null)}
            className="cursor-crosshair relative"
          >
            {/* Background Glow / Halo on Hover */}
            <AnimatePresence>
              {hoveredBlip?.id === blip.id && (
                <motion.circle
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  cx={blip.x}
                  cy={blip.y}
                  r={18}
                  className="fill-primary/10 stroke-primary/20"
                  strokeWidth="1"
                />
              )}
            </AnimatePresence>

            {/* Pulse Animation when hovered */}
            {hoveredBlip?.id === blip.id && (
              <motion.circle
                cx={blip.x}
                cy={blip.y}
                r={12}
                className="fill-primary/20"
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            )}

            {/* Main Interactive Circle */}
            <motion.circle
              cx={blip.x}
              cy={blip.y}
              animate={{ 
                r: hoveredBlip?.id === blip.id ? 8 : 4.5,
                fill: hoveredBlip?.id === blip.id ? 'var(--primary-color)' : 'rgba(var(--primary-rgb), 0.5)',
                stroke: hoveredBlip?.id === blip.id ? '#ffffff' : 'transparent',
                strokeWidth: hoveredBlip?.id === blip.id ? 2 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="drop-shadow-sm"
            />
          </motion.g>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {hoveredBlip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute z-20 pointer-events-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl rounded-2xl p-4 min-w-[180px] backdrop-blur-md bg-opacity-95 dark:bg-opacity-95"
            style={{ 
                left: hoveredBlip.x > 250 ? 'auto' : hoveredBlip.x + 30, 
                right: hoveredBlip.x > 250 ? (600 - hoveredBlip.x) + 30 : 'auto',
                top: hoveredBlip.y - 50 
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              <h4 className="font-black text-gray-900 dark:text-white text-sm tracking-tight">{hoveredBlip.name}</h4>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{hoveredBlip.quadrant} • {hoveredBlip.ring}</p>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                    Mastery: {hoveredBlip.level}%
                  </div>
                </div>
              </div>
              <Info size={14} className="text-primary/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-8">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full border border-gray-300 border-dashed"></div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Độ phủ công nghệ</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/60"></div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tech Blips</span>
        </div>
      </div>
    </div>
  );
};

export default TechRadar;