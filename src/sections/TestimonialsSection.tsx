import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Frontier didn't just build our platform; they fundamentally improved our product strategy. Their engineering quality and attention to design detail are unmatched.",
    name: "Sarah Jenkins",
    role: "CTO, Nexus Financial",
    color: "#89bc30"
  },
  {
    quote: "The technical architecture they implemented scaled effortlessly when we hit viral growth. Finding a team that understands both complex backend systems and premium UI is rare.",
    name: "Marcus Chen",
    role: "Founder, Aura Health",
    color: "#89bc30"
  },
  {
    quote: "Working with Frontier feels like having an elite in-house product team. Their transparency, speed, and standard of excellence transformed how we operate.",
    name: "Elena Rodriguez",
    role: "VP of Product, LogisTech",
    color: "#F0EFEA"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return; // Pause auto-play when hovering
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setIsHovered(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 md:py-48 bg-[#090A0C] border-y border-accent-light/5 overflow-hidden relative cursor-crosshair min-h-[80vh] flex flex-col justify-center items-center"
    >
      
      {/* Massive Background Typography for Section Identity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
        <h2 className="text-[18vw] font-display font-bold text-accent-light/[0.02] whitespace-nowrap leading-none tracking-tighter">
          CLIENT VOICES
        </h2>
      </div>
        
      {/* BASE LAYER (Dimmed, unilluminated) - Full Section Size */}
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-10 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`base-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-5xl mx-auto"
          >
            <h3 className="font-serif italic text-3xl md:text-5xl leading-[1.3] md:leading-[1.3] mb-12 text-accent-light/10">
              {testimonials[currentIndex].quote}
            </h3>
            <div>
              <div className="font-display font-bold text-lg text-accent-light/10">{testimonials[currentIndex].name}</div>
              <div className="text-accent-light/10 text-sm mt-1">{testimonials[currentIndex].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ILLUMINATED LAYER (Bright, revealed by flashlight mask) - Full Section Size */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-20 px-6 transition-opacity duration-300"
        style={{
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black 15%, rgba(0,0,0,0.5) 60%, transparent 100%)`,
          maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black 15%, rgba(0,0,0,0.5) 60%, transparent 100%)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`bright-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-5xl mx-auto"
          >
            <h3 className="font-serif italic text-3xl md:text-5xl leading-[1.3] md:leading-[1.3] mb-12 text-white drop-shadow-[0_0_15px_rgba(226, 240, 202,0.4)]">
              {testimonials[currentIndex].quote}
            </h3>
            <div>
              <div className="font-display font-bold text-lg text-white drop-shadow-[0_0_10px_rgba(226, 240, 202,0.4)]">{testimonials[currentIndex].name}</div>
              <div className="text-sm mt-1 uppercase tracking-widest font-mono font-bold drop-shadow-[0_0_10px_rgba(226, 240, 202,0.4)]" style={{ color: testimonials[currentIndex].color }}>
                {testimonials[currentIndex].role}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Auto-play Indicators */}
      <div className="absolute bottom-12 flex gap-3 z-30 pointer-events-auto">
        {testimonials.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-700 ${i === currentIndex ? 'bg-accent-lime w-12' : 'bg-accent-light/20 w-3 hover:bg-accent-light/40'}`} 
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default TestimonialsSection;
