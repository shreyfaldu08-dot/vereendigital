import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LIGHT_COLOR = '#e2f0ca';
const DARK_COLOR  = '#89bc30';
const BLACK       = '#090A0C';

// Returns whether a hex color is "light" (so we know what to use as contrast)
const isLightColor = (hex: string) => {
  if (!hex || hex === 'transparent' || hex.startsWith('rgba')) return false;
  const c = hex.replace('#', '');
  if (c.length !== 6 && c.length !== 3) return false;
  const fullHex = c.length === 3 ? c.split('').map((x: string) => x + x).join('') : c;
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  // Standard luminance formula
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
};

export interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  color?: string;
  hoverColor?: string;
  textColor?: string;
  textHoverColor?: string;
  variant?: 'solid' | 'outline' | 'glass';
}

export const PremiumButton = ({ 
  children, 
  text, 
  className = '', 
  color = LIGHT_COLOR, // Default to accent-light
  hoverColor,
  textColor,
  textHoverColor,
  variant = 'solid',
  style,
  ...props 
}: PremiumButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const isOutline = variant === 'outline' || variant === 'glass';
  const light = isOutline ? false : isLightColor(color);

  // Dynamic hover fill and text colors
  const hoverFill = hoverColor || (isOutline ? DARK_COLOR : light ? DARK_COLOR : LIGHT_COLOR);
  
  // Normal and hover text colors
  const textNormal = textColor || (isOutline ? '#ffffff' : (light ? BLACK : BLACK));
  const textHover  = textHoverColor || (isOutline ? BLACK : BLACK);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      });
    }
  }, [isHovered, controls]);

  const backgroundStyle = isOutline 
    ? (variant === 'glass' ? 'rgba(255, 255, 255, 0.04)' : 'transparent')
    : color;

  const borderStyle = isOutline
    ? (isHovered ? '1px solid rgba(137, 188, 48, 0.8)' : '1px solid rgba(255, 255, 255, 0.15)')
    : 'none';

  return (
    <button 
      ref={buttonRef}
      className={`group relative overflow-hidden flex items-center justify-center rounded-full transition-all duration-500 active:scale-95 cursor-pointer ${className}`}
      style={{
        backgroundColor: backgroundStyle,
        border: borderStyle,
        boxShadow: isHovered ? `0 0 35px ${hoverFill}66` : 'none',
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Cursor-tracking fill circle */}
      <motion.div 
        className="absolute z-0 pointer-events-none rounded-full"
        style={{
          width: '250%',
          paddingBottom: '250%',
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
        className="relative z-10 flex items-center justify-center transition-colors duration-300 font-bold"
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

