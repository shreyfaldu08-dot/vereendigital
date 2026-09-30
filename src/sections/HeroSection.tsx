import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EchoText from '../components/EchoText';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const circleBgRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Master Timeline for Hero -> Horizontal Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Extended duration for both animations
          scrub: 1,
          pin: true,
        }
      });

      // 1. Hero Out & Blue Circle Expand
      tl.to(textRef.current, {
        scale: 6,
        rotationZ: -10,
        y: -100,
        opacity: 0,
        ease: 'power2.in',
        duration: 1
      }, 0)
      .to(circleBgRef.current, {
        scale: 30, // Large enough to cover the screen
        ease: 'power2.inOut',
        duration: 1
      }, 0)
      
      // 2. Fade in background layer for metrics
      .to('.metrics-bg-layer', {
        autoAlpha: 1,
        duration: 0.5
      }, 1)
      
      // 3. Horizontal Scroll - Slides in from the right
      .fromTo(scrollRef.current, 
        { x: '100vw' }, // Starts fully off-screen to the right
        { 
          x: '-200vw', // Slides through all 3 panels (100vw each)
          ease: "none",
          duration: 3 // Takes the remainder of the timeline
        }, 
        1 // Starts exactly when the circle finishes expanding
      )

      // 4. Parallax Giant Background Text
      .fromTo(bgTextRef.current,
        { x: '20vw' },
        {
          x: '-80vw',
          ease: "none",
          duration: 3
        },
        1
      );
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-primary-bg">
      

      {/* The Faded Blue Circle (Optimized for performance: No blur filter) */}
      <div 
        ref={circleBgRef} 
        className="absolute z-0 pointer-events-none"
        style={{ 
          width: '20vw', 
          height: '20vw', 
          background: 'radial-gradient(circle, #e2f0ca 0%, transparent 70%)', 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          willChange: 'transform'
        }} 
      />

      {/* Hero Typography */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none" style={{ perspective: '1000px' }}>
        <h1 ref={textRef} className="font-display font-bold leading-[0.85] tracking-tighter uppercase text-center flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
          <div className="flex pointer-events-auto">
            <EchoText text="DIGITAL" color="#F0EFEA" direction="up" tint="#89bc30" fontSize="16vw" mode="both" blur={0} echoes={8} />
          </div>
          <div className="flex pointer-events-auto">
            <EchoText text="FRONTIER" color="#89bc30" direction="down" tint="#89bc30" fontSize="16vw" mode="both" blur={0} echoes={8} />
          </div>
        </h1>
      </div>

      {/* Horizontal Scroll Metrics */}
      <div className="absolute inset-0 z-20 metrics-wrapper pointer-events-none overflow-hidden shadow-[inset_0_0_200px_rgba(0,0,0,0.15)]">
        
        {/* Background elements - invisible during hero intro, fades in during metrics */}
        <div className="metrics-bg-layer absolute inset-0 z-0 invisible opacity-0 pointer-events-none">
          {/* Subtle Dot Pattern Overlay for Texture */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'radial-gradient(#090A0C 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
          ></div>

          {/* Giant Parallax Background Text */}
          <div 
            ref={bgTextRef} 
            className="absolute inset-y-0 left-0 flex items-center opacity-5"
          >
            <h2 className="font-display text-[35vw] font-bold whitespace-nowrap leading-none tracking-tighter text-dark-text">
              RESULTS. SCALE. GROWTH.
            </h2>
          </div>
        </div>

        <div ref={scrollRef} className="relative z-10 flex h-full w-[300vw] text-dark-text pointer-events-auto">
          
          {/* Panel 1 */}
          <div className="w-screen h-full flex flex-col justify-center px-page shrink-0">
            <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-dark-text">
              $40<span className="text-accent-lime">M+</span>
            </h2>
            <div className="w-1/2 h-px bg-dark-text/20 my-8"></div>
            <p className="text-2xl md:text-4xl font-serif max-w-2xl text-dark-text/80">
              In revenue generated for our partners through digital innovation.
            </p>
          </div>

          {/* Panel 2 */}
          <div className="w-screen h-full flex flex-col justify-center px-page shrink-0">
            <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-dark-text">
              120<span className="text-accent-lime">+</span>
            </h2>
            <div className="w-1/2 h-px bg-dark-text/20 my-8"></div>
            <p className="text-2xl md:text-4xl font-serif max-w-2xl text-dark-text/80">
              Successful projects delivered across fintech, healthcare, and enterprise SaaS.
            </p>
          </div>

          {/* Panel 3 */}
          <div className="w-screen h-full flex flex-col justify-center px-page shrink-0">
            <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-dark-text">
              98<span className="text-accent-lime">%</span>
            </h2>
            <div className="w-1/2 h-px bg-dark-text/20 my-8"></div>
            <p className="text-2xl md:text-4xl font-serif max-w-2xl text-dark-text/80">
              Client Retention over 12 Years of Excellence. We build partnerships, not just software.
            </p>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-10 left-page font-mono text-xs uppercase tracking-widest text-secondary-text z-10 pointer-events-none">
        Scroll to Explore
      </div>
    </section>
  );
};

export default HeroSection;
