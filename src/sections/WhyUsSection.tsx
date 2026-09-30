import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyUsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 2. Background Marquee
      gsap.to('.marquee-inner', {
        xPercent: -30,
        opacity: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 3. Left title breathing effect
      gsap.to('.left-title', {
        scale: 1.05,
        color: '#d4ff00',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 4. Text scrub animation happens naturally as the words scroll up
      const words = gsap.utils.toArray('.scrub-word');
      
      const scrubTrigger = {
        trigger: textRef.current,
        start: 'top 75%', // Starts revealing exactly when it enters the readable area
        end: 'bottom 50%',
        scrub: true,
      };

      gsap.fromTo(words, 
        { opacity: 0.15, color: '#333' },
        {
          opacity: 1,
          color: '#ffffff',
          stagger: 0.1,
          scrollTrigger: scrubTrigger
        }
      );

      // 5. Sidebar Progress Line
      gsap.fromTo('.scroll-progress-bar', 
        { scaleY: 0, boxShadow: '0 0 0px #d4ff00' },
        { 
          scaleY: 1, 
          boxShadow: '0 0 20px #d4ff00',
          ease: 'none',
          scrollTrigger: scrubTrigger
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const manifestoText = "We don't just build websites. We engineer digital ecosystems that command attention, drive scalable growth, and redefine industry standards. We exist at the intersection of relentless innovation and flawless execution.".split(' ');

  return (
    <section ref={containerRef} id="about" className="relative w-full bg-[#0d0e12] py-40 border-t border-border">
      
      {/* Background Kinetic Marquee */}
      <div className="absolute top-40 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none">
        <div className="marquee-inner flex whitespace-nowrap font-display font-bold text-[15vw] leading-none uppercase tracking-tighter text-white">
          <span>THE FRONTIER AWAITS &nbsp;</span>
          <span>THE FRONTIER AWAITS &nbsp;</span>
          <span>THE FRONTIER AWAITS &nbsp;</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-page relative z-10 flex flex-col lg:flex-row gap-20 items-start w-full">
        
        {/* Left Sidebar */}
        <div className="lg:w-1/3 relative lg:sticky lg:top-40">
          <div className="absolute -left-6 md:-left-10 top-0 w-1 h-full bg-accent-light/10 rounded-full">
            <div className="scroll-progress-bar w-full h-full bg-accent-lime rounded-full origin-top" />
          </div>
          
          <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-6 font-bold">04 — WHY US</h2>
          <h3 className="left-title font-display text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[0.9] origin-left">
            Built for<br/>the Bold.
          </h3>
          <p className="mt-8 text-secondary-text text-lg max-w-sm">
            We partner with visionary brands who refuse to settle for ordinary. If you are looking for a safe, standard template, you are in the wrong place.
          </p>
        </div>

        {/* Right Side Scrub Text - Pinned */}
        <div className="lg:w-2/3" ref={textRef}>
          <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight uppercase flex flex-wrap gap-[0.2em]">
            {manifestoText.map((word, i) => (
              <span key={i} className="scrub-word inline-block opacity-15">
                {word}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUsSection;
