import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PremiumButton } from '../components/PremiumButton';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nexus Platform",
    category: "01 — FINTECH",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
    color: "#89bc30"
  },
  {
    title: "Aura Health OS",
    category: "02 — HEALTHCARE",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    color: "#e2f0ca"
  },
  {
    title: "Vortex Engine",
    category: "03 — WEB3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    color: "#89bc30"
  },
  {
    title: "Lumina Studio",
    category: "04 — E-COMMERCE",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    color: "#e2f0ca"
  }
];

const CaseStudiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Extended to accommodate 4 panels smoothly
          scrub: 1,
          pin: true,
        }
      });
      
      panels.forEach((panel: any, i) => {
        if (i === 0) return; // First panel is already visible
        
        const image = panel.querySelector('.project-image');
        
        tl.fromTo(panel,
          { clipPath: 'inset(100% 0% 0% 0%)' }, // Start clipped to the very bottom line
          { clipPath: 'inset(0% 0% 0% 0%)', ease: "power2.inOut", duration: 1 } // Wipe upwards
        )
        // Strong Parallax on the image inside the wiping panel
        .fromTo(image,
          { scale: 1.4, yPercent: 20 },
          { scale: 1, yPercent: 0, ease: "power2.inOut", duration: 1 },
          "<"
        )
        // Scale down and fade out the PREVIOUS panel, giving a massive sense of 3D depth
        .to(panels[i - 1], 
          { scale: 0.85, opacity: 0.3, ease: "power2.inOut", duration: 1 }, 
          "<"
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="relative h-screen w-full bg-primary-bg overflow-hidden">
      
      {/* Pinned Section Header */}
      <div className="absolute top-10 left-page z-50 pointer-events-none mix-blend-difference">
        <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">
          Selected<br/>Archives
        </h2>
      </div>

      {/* Pinned Fullscreen Gallery */}
      <div className="relative w-full h-full">
        {projects.map((project, i) => (
          <div 
            key={i} 
            className="project-panel absolute inset-0 w-full h-full flex flex-col justify-end p-page will-change-transform"
            style={{ zIndex: i + 1 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-primary-bg">
              <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover project-image will-change-transform"
              />
            </div>
            
            {/* Content Overlay */}
            <div className="relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between pb-10">
              <div className="pointer-events-none">
                <p className="font-mono mb-4 text-sm tracking-widest font-bold" style={{ color: project.color }}>
                  {project.category}
                </p>
                <h3 className="font-display text-[8vw] leading-[0.8] font-bold text-white uppercase tracking-tighter">
                  {project.title}
                </h3>
              </div>
              <PremiumButton 
                text="EXPLORE CASE"
                color={project.color}
                className="mt-8 md:mt-0 px-10 py-5 pointer-events-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
