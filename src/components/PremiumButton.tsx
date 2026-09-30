import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const PremiumButton = ({ 
  children, 
  text, 
  className = '', 
  color = '#89bc30', // Default to accent-lime
  ...props 
}: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      });
    } else {
      controls.start({
        scale: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      });
    }
  }, [isHovered, controls]);

  return (
    <button 
      ref={buttonRef}
      className={`group relative overflow-hidden flex items-center justify-center rounded-full transition-all duration-500 active:scale-95 ${className}`}
      style={{
        backgroundColor: color,
        boxShadow: isHovered ? `0 0 40px ${color}66` : 'none', // 40% opacity hex
        ...props.style
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* 
        Creative Cursor-Tracking Fill:
        A circle that exactly tracks the mouse and expands to fill the button on hover. 
      */}
      <motion.div 
        className="absolute z-0 pointer-events-none rounded-full"
        style={{
          width: '150%',
          paddingBottom: '150%', // Make it a perfect square
          left: mousePos.x,
          top: mousePos.y,
          x: '-50%',
          y: '-50%',
          backgroundColor: '#000000',
        }}
        initial={{ scale: 0 }}
        animate={controls}
      />

      {/* Content Wrapper */}
      <span 
        className="relative z-10 flex items-center justify-center transition-colors duration-500 font-bold"
        style={{ color: isHovered ? color : '#000000' }}
      >
        {text ? (
          <span className="font-mono tracking-[0.2em]">{text}</span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};
