import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LIGHT_COLOR = '#e2f0ca';
const DARK_COLOR  = '#89bc30';
const BLACK       = '#090A0C';

// Returns whether a hex color is "light" (so we know what to use as contrast)
const isLightColor = (hex: string) => {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // Standard luminance formula
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
};

export const PremiumButton = ({ 
  children, 
  text, 
  className = '', 
  color = LIGHT_COLOR, // Default to accent-light
  ...props 
}: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  // If the button bg is light → hover fill is the dark brand green, and vice versa
  const light = isLightColor(color);
  const hoverFill  = light ? DARK_COLOR  : LIGHT_COLOR;
  const textNormal = light ? BLACK        : LIGHT_COLOR;
  const textHover  = light ? LIGHT_COLOR  : BLACK;

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
        boxShadow: isHovered ? `0 0 40px ${hoverFill}66` : 'none',
        ...props.style
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Cursor-tracking fill circle */}
      <motion.div 
        className="absolute z-0 pointer-events-none rounded-full"
        style={{
          width: '150%',
          paddingBottom: '150%',
          left: mousePos.x,
          top: mousePos.y,
          x: '-50%',
          y: '-50%',
          backgroundColor: hoverFill,
        }}
        initial={{ scale: 0 }}
        animate={controls}
      />

      {/* Content */}
      <span 
        className="relative z-10 flex items-center justify-center transition-colors duration-500 font-bold"
        style={{ color: isHovered ? textHover : textNormal }}
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
