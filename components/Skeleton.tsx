import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rect', 
  width, 
  height 
}) => {
  const baseStyles = "bg-gray-200 dark:bg-gray-800 relative overflow-hidden";
  
  const variantStyles = {
    text: "rounded-md h-4 w-full mb-2",
    rect: "rounded-2xl w-full h-full",
    circle: "rounded-full"
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Skeleton;
