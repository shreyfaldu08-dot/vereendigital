import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MetricsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const metrics = gsap.utils.toArray('.metric-panel');
      
      gsap.to(scrollRef.current, {
        xPercent: -100 * (metrics.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollRef.current?.offsetWidth}`
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-light-bg text-dark-text overflow-hidden flex items-center">
      <div ref={scrollRef} className="flex h-full w-[300vw]">
        
        {/* Panel 1 */}
        <div className="metric-panel w-screen h-full flex flex-col justify-center px-page shrink-0">
          <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-dark-text">
            $40<span className="text-accent-blue">M+</span>
          </h2>
          <div className="w-1/2 h-px bg-dark-text/20 my-8"></div>
          <p className="text-2xl md:text-4xl font-serif max-w-2xl text-dark-text/80">
            Revenue generated for our partners through digital product innovation and engineering.
          </p>
        </div>

        {/* Panel 2 */}
        <div className="metric-panel w-screen h-full flex flex-col justify-center px-page shrink-0">
           <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-dark-text">
            120<span className="text-accent-lime">+</span>
          </h2>
          <div className="w-1/2 h-px bg-dark-text/20 my-8"></div>
          <p className="text-2xl md:text-4xl font-serif max-w-2xl text-dark-text/80">
            Projects Delivered with unmatched precision and creativity.
          </p>
        </div>

        {/* Panel 3 */}
        <div className="metric-panel w-screen h-full flex flex-col justify-center px-page shrink-0">
           <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-dark-text">
            98<span className="text-accent-blue">%</span>
          </h2>
          <div className="w-1/2 h-px bg-dark-text/20 my-8"></div>
          <p className="text-2xl md:text-4xl font-serif max-w-2xl text-dark-text/80">
            Client Retention over 12 Years of Excellence. We build partnerships, not just software.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MetricsSection;
