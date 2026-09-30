import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const Footer = () => {
  const [time, setTime] = useState("");
  const textRef = useRef<HTMLDivElement>(null);
  
  // Smooth motion tracking for the flashlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Spring config for a buttery smooth glide effect
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(80px circle at ${smoothX}px ${smoothY}px, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' EST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer 
      className="relative h-screen bg-transparent z-0"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-screen bg-[#060709] flex flex-col overflow-hidden pt-20">
        
        {/* Main Split Grid */}
        <div className="flex-1 w-full flex flex-col md:flex-row border-t border-accent-light/10">
          
          {/* Left Side - Massive CTA */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-accent-light/10 p-12 md:p-20 flex flex-col justify-between relative group">
            
            {/* Spinning Motif */}
            <div className="w-16 h-16 rounded-full border border-accent-lime/30 relative animate-[spin_10s_linear_infinite] mb-12 md:mb-0">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent-lime rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#89bc30]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-[6vw] leading-[0.9] font-display font-bold text-white mb-8 md:mb-12 uppercase tracking-tighter">
                Let's work<br/>
                <span className="text-accent-lime italic pr-4">together</span>
              </h2>
              
              <PremiumButton
                color="#e2f0ca"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 pointer-events-auto"
              >
                <span className="font-display font-bold uppercase tracking-widest text-sm md:text-base">Start a Project</span>
                <ArrowRight size={20} className="ml-4" />
              </PremiumButton>
            </div>

            {/* Abstract Background Element */}
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-accent-lime/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-accent-lime/10 transition-colors duration-700" />
          </div>

          {/* Right Side - Links & Info */}
          <div className="w-full md:w-[40%] flex flex-col pointer-events-auto">
            
            {/* Navigation Grid */}
            <div className="flex-1 grid grid-cols-2">
              <div className="border-r border-b border-accent-light/10 p-10 md:p-16 flex flex-col justify-center">
                <h4 className="font-mono text-xs uppercase tracking-widest text-accent-light/40 mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent-lime rounded-full" />
                  Menu
                </h4>
                <ul className="flex flex-col gap-5 text-xl font-serif italic text-accent-light/80">
                  <li><a href="#work" className="hover:text-accent-lime transition-colors">Work</a></li>
                  <li><a href="#services" className="hover:text-accent-lime transition-colors">Services</a></li>
                  <li><a href="#about" className="hover:text-accent-lime transition-colors">About</a></li>
                  <li><a href="#process" className="hover:text-accent-lime transition-colors">Process</a></li>
                </ul>
              </div>
              
              <div className="border-b border-accent-light/10 p-10 md:p-16 flex flex-col justify-center">
                <h4 className="font-mono text-xs uppercase tracking-widest text-accent-light/40 mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent-lime rounded-full" />
                  Socials
                </h4>
                <ul className="flex flex-col gap-5 text-xl font-serif italic text-accent-light/80">
                  <li><a href="#" className="hover:text-accent-lime transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-accent-lime transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-accent-lime transition-colors">Dribbble</a></li>
                  <li><a href="#" className="hover:text-accent-lime transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>

            {/* Digital Clock / Status */}
            <div className="h-32 md:h-40 p-10 md:p-16 flex items-center justify-between bg-accent-light/[0.02]">
              <div className="flex items-center gap-4">
                <Globe className="text-accent-lime animate-pulse" size={24} />
                <div>
                  <div className="text-white font-display font-bold text-lg md:text-2xl tracking-widest">{time || "12:00:00 EST"}</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-accent-light/40 mt-1">Local Time</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-mono text-xs uppercase tracking-widest text-accent-lime flex items-center gap-2 justify-end">
                  <div className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
                  Available for work
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="h-16 md:h-20 border-t border-b border-accent-light/10 flex items-center justify-between px-8 md:px-20 text-[10px] md:text-xs font-mono uppercase tracking-widest text-accent-light/40 pointer-events-auto bg-[#060709] z-20">
          <div className="flex gap-4 md:gap-8 flex-wrap">
            <span className="text-white">FRONTIER DIGITAL AGENCY</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

        {/* Giant Edge-to-Edge Typography with Flashlight Hover */}
        <div 
          className="w-full relative bg-[#060709] pointer-events-auto flex justify-center items-end py-4 md:py-8 flex-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={textRef}
        >
          {/* Base Layer: Dim text */}
          <h1 className="text-[14vw] font-display font-bold leading-[0.75] tracking-tighter text-accent-light/5 uppercase w-full text-center pointer-events-none select-none">
            FRONTIER
          </h1>

          {/* Illuminated Layer: Bright text revealed by flashlight */}
          <motion.div 
            className="absolute inset-0 flex justify-center items-end py-4 md:py-8 pointer-events-none transition-opacity duration-300"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
            }}
          >
            <h1 className="text-[14vw] font-display font-bold leading-[0.75] tracking-tighter text-white uppercase w-full text-center select-none drop-shadow-[0_0_20px_rgba(226, 240, 202,0.3)]">
              FRONTIER
            </h1>
          </motion.div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
