import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { id: '01', title: 'Discover & Define', desc: 'We begin by deeply understanding your business goals, target audience, and technical constraints to establish a clear project roadmap.' },
  { id: '02', title: 'Architecture & Design', desc: 'Creating the structural foundation and visual language. We map out data flows, system architecture, and high-fidelity UI prototypes.' },
  { id: '03', title: 'Iterative Development', desc: 'Building the solution in agile sprints. You receive regular updates and working builds to ensure alignment and rapid feedback.' },
  { id: '04', title: 'Testing & Validation', desc: 'Rigorous QA testing, performance profiling, and security audits to ensure the product meets enterprise-grade standards.' },
  { id: '05', title: 'Launch & Scale', desc: 'Smooth deployment to production environments, followed by ongoing monitoring, support, and feature iterations based on real user data.' }
];

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const totalSteps = processSteps.length;
      const anglePerStep = 360 / totalSteps;

      // 1. Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Scroll for 4 viewport heights
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Calculate which step is currently active based on scroll progress (0 to 1)
            const progress = self.progress;
            const currentStep = Math.min(
              Math.floor(progress * totalSteps), 
              totalSteps - 1
            );
            
            // We use state to trigger React re-renders for the text content
            // To avoid too many re-renders, we only set if changed
            setActiveIndex((prev) => prev !== currentStep ? currentStep : prev);
          }
        }
      });

      // 2. Rotate the entire wheel based on scroll
      // As you scroll through 100% of the timeline, the wheel rotates exactly enough 
      // to bring the last item to the 0deg position.
      tl.to(wheelRef.current, {
        rotation: -anglePerStep * (totalSteps - 1),
        ease: 'none',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="process" className="relative h-screen w-full bg-[#050608] overflow-hidden border-t border-accent-light/5 flex items-center">
      
      {/* Background Grid - Masked to only reveal near the active node */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(226, 240, 202,1) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 240, 202,1) 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at 35vw 50%, black 0%, transparent 300px)',
          WebkitMaskImage: 'radial-gradient(circle at 35vw 50%, black 0%, transparent 300px)'
        }} 
      />

      <div className="w-full max-w-[100rem] mx-auto px-page h-full flex items-center relative z-10">
        
        {/* Left Side: The Massive Rotating Wheel */}
        <div className="w-1/2 h-full absolute left-0 flex items-center justify-start pointer-events-none">
          {/* The Wheel Container (shifted left so only the right arc is on screen) */}
          <div className="relative -left-[30vw] md:-left-[20vw] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] max-w-[800px] max-h-[800px]">
            
            {/* The Actual Rotating Ring */}
            <div 
              ref={wheelRef} 
              className="absolute inset-0 rounded-full border border-accent-light/10 bg-accent-light/[0.01] backdrop-blur-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]"
              style={{ transformOrigin: 'center center' }}
            >
              {/* Mechanical Dial Details */}
              <div className="absolute inset-4 rounded-full border border-dashed border-accent-light/10 opacity-50" />
              <div className="absolute inset-12 rounded-full border border-accent-light/5" />
              
              {/* Outer Ambient Glow (Reduced by 50%) */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_150px_rgba(137, 188, 48,0.08)] pointer-events-none" />

              {processSteps.map((step, i) => {
                const angle = i * (360 / processSteps.length);
                const isActive = activeIndex === i;
                
                return (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{ 
                      // Numbers are printed directly on the dial. They naturally become perfectly upright when they reach the 0deg (right edge) position!
                      transform: `rotate(${angle}deg) translate(calc(30vw))`, 
                    }}
                  >
                    <div className="relative">
                      {/* Active Node Edge Highlight & Ripple */}
                      {isActive && (
                        <>
                          {/* Ripple */}
                          <div className="absolute inset-[-40px] rounded-full bg-accent-lime/10 blur-xl animate-pulse" />
                          {/* Heavy Edge Glow connecting it to the wheel */}
                          <div className="absolute -left-[60px] top-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-accent-lime/20 blur-[50px] rounded-full" />
                        </>
                      )}
                      
                      <div 
                        className={`relative z-10 flex items-center justify-center w-24 h-24 -ml-12 -mt-12 rounded-full border transition-all duration-[600ms] font-mono text-2xl backdrop-blur-xl ${isActive ? 'bg-accent-lime text-black border-accent-lime shadow-[0_0_50px_rgba(137, 188, 48,0.6),inset_0_0_20px_rgba(226, 240, 202,0.4)] scale-110' : 'bg-[#0a0b0e]/80 text-accent-light/30 border-accent-light/10'}`}
                      >
                        {step.id}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Static Edge Highlight on the container (Reduced by 50%) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[150px] h-[300px] bg-accent-lime/10 blur-[80px] rounded-full pointer-events-none z-20" />

            {/* Center Hub Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-accent-light/5 flex items-center justify-center bg-[#0a0b0e]/90 backdrop-blur-3xl shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-dashed border-accent-light/10 animate-[spin_60s_linear_infinite]" />
                <div className="w-6 h-6 rounded-full bg-accent-lime shadow-[0_0_30px_rgba(137, 188, 48,0.8)]" />
            </div>

          </div>
        </div>

        {/* Right Side: The Content that changes based on active index */}
        <div className="w-full md:w-1/2 ml-auto h-full flex flex-col justify-center pl-10 md:pl-20 relative">
          
          <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-10 font-bold">05 — THE ENGINE</h2>
          
          <div className="relative h-[300px]">
            {processSteps.map((step, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${activeIndex === i ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
              >
                <div className="text-accent-lime font-mono text-lg mb-4">{step.id}</div>
                <h3 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.1] mb-6">
                  {step.title}
                </h3>
                <p className="text-secondary-text text-xl max-w-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
