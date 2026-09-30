const fs = require('fs');
const path = require('path');

const files = {
  'src/App.tsx': `import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import MetricsSection from './sections/MetricsSection';
import CaseStudiesSection from './sections/CaseStudiesSection';
import ServicesSection from './sections/ServicesSection';
import WhyUsSection from './sections/WhyUsSection';
import ProcessSection from './sections/ProcessSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-primary-bg min-h-screen text-primary-text font-sans cursor-none selection:bg-accent-lime selection:text-dark-text">
      <CustomCursor />
      <Navigation />
      <main className="overflow-hidden">
        <HeroSection />
        <MetricsSection />
        <CaseStudiesSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
`,
  'src/components/CustomCursor.tsx': `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      // Smooth following
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      gsap.set(cursor, {
        x: cursorX - 10,
        y: cursorY - 10
      });
      requestAnimationFrame(render);
    };
    render();

    // Hover effect for links and buttons
    const addHover = () => gsap.to(cursor, { scale: 3, backgroundColor: 'transparent', border: '1px solid #D6FF4F', duration: 0.3 });
    const removeHover = () => gsap.to(cursor, { scale: 1, backgroundColor: '#D6FF4F', border: 'none', duration: 0.3 });

    const interactables = document.querySelectorAll('a, button, input, textarea, select');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 bg-accent-lime rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
};

export default CustomCursor;
`,
  'src/sections/HeroSection.tsx': `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.from('.hero-word', {
        y: 200,
        rotationZ: 10,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });

      // Scroll Parallax & Mask
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        }
      });

      tl.to(textRef.current, {
        scale: 15,
        opacity: 0,
        ease: 'power3.in',
      }, 0)
      .to(videoRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power2.inOut',
      }, 0);
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary-bg">
      {/* Background Visual that gets revealed */}
      <div 
        ref={videoRef}
        className="absolute inset-0 z-0 bg-[#0c1015]"
        style={{ clipPath: 'polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)' }}
      >
        <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #738BFF 0%, transparent 60%)', filter: 'blur(100px)' }} />
      </div>

      <div className="z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 ref={textRef} className="font-display text-[12vw] font-bold leading-[0.85] tracking-tighter uppercase text-center flex flex-wrap justify-center mix-blend-difference">
          <div className="overflow-hidden"><span className="block hero-word px-2">Digital</span></div>
          <div className="overflow-hidden"><span className="block hero-word px-2 text-accent-lime">Frontier</span></div>
        </h1>
      </div>
      
      <div className="absolute bottom-10 left-page font-mono text-xs uppercase tracking-widest text-secondary-text">
        Scroll to Explore
      </div>
    </section>
  );
};

export default HeroSection;
`,
  'src/sections/MetricsSection.tsx': `import React, { useRef, useEffect } from 'react';
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
          end: () => \`+=\${scrollRef.current?.offsetWidth}\`
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
`,
  'src/sections/CaseStudiesSection.tsx': `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CaseStudiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.case-card');
      
      cards.forEach((card: any, i) => {
        gsap.to(card, {
          yPercent: -20 * i,
          scale: 1 - (0.05 * i),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-32 bg-primary-bg relative z-10">
      <div className="px-page max-w-7xl mx-auto">
        <h2 className="font-display text-[8vw] font-bold uppercase tracking-tight mb-32 leading-none">
          Selected<br/>Archives
        </h2>
        
        <div className="relative flex flex-col items-center gap-[50vh]">
          {/* Card 1 */}
          <div className="case-card sticky top-32 w-full aspect-video bg-[#15171A] rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col justify-end p-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at top right, #D6FF4F 0%, transparent 60%)'}} />
            <div className="relative z-20">
              <p className="font-mono text-accent-lime mb-4">01 — FINTECH</p>
              <h3 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Nexus Platform</h3>
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase text-sm hover:bg-accent-lime transition-colors">View Case</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="case-card sticky top-40 w-full aspect-video bg-[#1a1c23] rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col justify-end p-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at top right, #738BFF 0%, transparent 60%)'}} />
            <div className="relative z-20">
              <p className="font-mono text-accent-blue mb-4">02 — HEALTHCARE</p>
              <h3 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Aura Health OS</h3>
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase text-sm hover:bg-accent-blue transition-colors">View Case</button>
            </div>
          </div>
          
          {/* Spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
`,
  'src/sections/WhyUsSection.tsx': `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyUsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        }
      });

      tl.to('.manifesto-text', {
        scale: 25,
        opacity: 0,
        stagger: 0.5,
        ease: 'power2.inOut',
        transformOrigin: 'center center'
      })
      .from('.manifesto-bg', {
        backgroundColor: '#D6FF4F',
        duration: 2
      }, 0);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="h-screen bg-accent-lime text-dark-text relative overflow-hidden manifesto-bg flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.8] mix-blend-difference text-[#F3F1EB]">
          <div className="manifesto-text text-[15vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">GOOD</div>
          <div className="manifesto-text text-[15vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">TECH</div>
          <div className="manifesto-text text-[15vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">SHOULD</div>
          <div className="manifesto-text text-[15vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">FEEL</div>
          <div className="manifesto-text text-[10vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0 text-dark-text mix-blend-normal">EFFORTLESS.</div>
        </h2>
      </div>
    </section>
  );
};

export default WhyUsSection;
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), content);
}
console.log('Site files upgraded to Awwwards level successfully.');
