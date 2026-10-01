import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mouseTrackerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleBgRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // Creative minimalist particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.35 + 0.15,
      color: Math.random() > 0.45 ? '#89bc30' : '#F0EFEA',
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;

    const onPointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 160 && dist > 0) {
          const force = (160 - dist) / 160;
          p.x += (dx / dist) * force * 1.4;
          p.y += (dy / dist) * force * 1.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
    };
  }, []);

  // Smooth 3D tilt tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > 80 || !mouseTrackerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(mouseTrackerRef.current, {
        rotateY: nx * 9,
        rotateX: -ny * 9,
        x: nx * 22,
        y: ny * 14,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleScroll = () => {
      if (window.scrollY > 60 && mouseTrackerRef.current) {
        gsap.to(mouseTrackerRef.current, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master Timeline for Hero -> Horizontal Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Hero Out & Circle Expand
      tl.fromTo(textRef.current,
        {
          scale: 1,
          rotationZ: 0,
          y: 0,
          autoAlpha: 1,
        },
        {
          scale: 4,
          rotationZ: -6,
          y: -80,
          autoAlpha: 0,
          ease: 'power1.in',
          duration: 1,
          immediateRender: false,
        },
        0
      )
      .fromTo(circleBgRef.current,
        {
          scale: 1,
        },
        {
          scale: 30,
          ease: 'power2.inOut',
          duration: 1,
          immediateRender: false,
        },
        0
      )
      
      // 2. Metrics Wrapper reveal (fades in as circle expands)
      .fromTo('.metrics-wrapper',
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power1.in',
        },
        0.8
      )
      
      // 3. Horizontal Scroll - Slides in from the right
      .fromTo(scrollRef.current, 
        { x: '100vw' },
        { 
          x: '-200vw',
          ease: "none",
          duration: 3,
        }, 
        1
      )

      // 4. Parallax Giant Background Text
      .fromTo(bgTextRef.current,
        { x: '20vw' },
        {
          x: '-80vw',
          ease: "none",
          duration: 3,
        },
        1
      );
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-primary-bg select-none">
      
      {/* Interactive Minimalist Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* The Faded Circle & Minimalist 3D Geometric Orbitals (Dead-Center) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ perspective: '1000px' }}>
        
        {/* Outer Minimalist Orbital Ring */}
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full border border-accent-lime/10 pointer-events-none animate-[spin_40s_linear_infinite]"
          style={{ borderStyle: 'dashed' }}
        />

        {/* Inner Minimalist Orbital Ring */}
        <div 
          className="absolute w-[30vw] h-[30vw] rounded-full border border-white/5 pointer-events-none animate-[spin_25s_linear_infinite_reverse]"
        />

        {/* Soft breathing aura */}
        <div 
          className="absolute w-[32vw] h-[32vw] rounded-full opacity-20 animate-pulse pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(137, 188, 48, 0.2) 0%, transparent 70%)',
            animationDuration: '4s'
          }}
        />

        {/* The Central Faded Circle (Expands on Scroll) */}
        <div 
          ref={circleBgRef} 
          style={{ 
            width: '20vw', 
            height: '20vw', 
            background: 'radial-gradient(circle, #e2f0ca 0%, transparent 70%)', 
            borderRadius: '9999px',
            willChange: 'transform'
          }} 
        />
      </div>

      {/* Hero Typography with Smooth 3D Mouse Tracking */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
        <div ref={textRef} className="flex flex-col items-center text-center" style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}>
          
          <h1 ref={mouseTrackerRef} className="font-display font-bold leading-[0.85] tracking-tighter uppercase text-center flex flex-col items-center pointer-events-auto cursor-default" style={{ transformStyle: 'preserve-3d' }}>
            <span className="text-[13vw] sm:text-[14vw] text-light-bg leading-[0.85] tracking-tighter block font-black drop-shadow-sm">
              DIGITAL
            </span>
            <span className="text-[13vw] sm:text-[14vw] text-accent-lime leading-[0.85] tracking-tighter block font-black drop-shadow-[0_0_35px_rgba(137,188,48,0.22)]">
              FRONTIER
            </span>
          </h1>

        </div>
      </div>

      <div className="absolute bottom-10 left-page font-mono text-xs uppercase tracking-widest text-secondary-text z-10 pointer-events-none">
        Scroll to Explore
      </div>

      {/* Horizontal Scroll Metrics */}
      <div className="metrics-wrapper absolute inset-0 z-20 pointer-events-none overflow-hidden shadow-[inset_0_0_200px_rgba(0,0,0,0.15)] invisible opacity-0">
        
        {/* Background elements */}
        <div className="metrics-bg-layer absolute inset-0 z-0 pointer-events-none">
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

        <div 
          ref={scrollRef} 
          className="relative z-10 flex h-full w-[300vw] text-dark-text pointer-events-auto"
          style={{ transform: 'translateX(100vw)', willChange: 'transform' }}
        >
          
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
      
    </section>
  );
};

export default HeroSection;
