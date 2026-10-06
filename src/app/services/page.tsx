"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Search,
  Zap,
  Share2,
  MessageSquare,
  Globe,
  Sparkles,
  MoveDown
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../sections/Footer';
import CustomCursor from '../../components/CustomCursor';
import { PremiumButton } from '../../components/PremiumButton';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================= */
/* 5 AUTONOMOUS DISCIPLINES SPECIFICATION (EDITORIAL HIGH-END DNA)   */
/* ================================================================= */

interface ServiceDossier {
  num: string;
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  href: string;
  metric: string;
  specId: string;
  image: string;
  statNumber: string;
  statLabel: string;
  deliverables: string[];
  theme: 'dark' | 'cream';
  bgClass: string;
  textClass: string;
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const SERVICES_DOSSIER: ServiceDossier[] = [
  {
    num: "01",
    id: "ai-seo",
    name: "AI SEO",
    category: "01 — GEO & VECTOR RETRIEVAL",
    badge: "LLM CITATION RETRIEVAL",
    tagline: "Engineered vector embeddings and structured schemas that force Perplexity, SearchGPT, and Claude to cite your enterprise as canonical truth.",
    href: "/services/ai-seo",
    metric: "100% LLM CITATION RETRIEVAL",
    specId: "SPEC: GEO-256T",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    statNumber: "100%",
    statLabel: "Canonical Citation Retrieval",
    deliverables: [
      "256-Token Semantic Chunking",
      "Perplexity Sonar Protocol",
      "Wikidata Q-Node Reconciliation",
      "Zero-Drift JSON-LD @graph"
    ],
    theme: 'dark',
    bgClass: 'bg-[#090A0C]',
    textClass: 'text-white',
    accentColor: '#e2f0ca',
    icon: Search
  },
  {
    num: "02",
    id: "google-ads",
    name: "Google Ads",
    category: "02 — HIGH-INTENT ACQUISITION",
    badge: "ALGORITHMIC BIDDING",
    tagline: "Hyper-segmented search ad architectures engineered to isolate commercial intent and feed Google AI with verified first-party CRM pipeline data.",
    href: "/services/google-ads",
    metric: "30-50% LOWER CPCS",
    specId: "SPEC: GADS-ALPHA",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    statNumber: "10/10",
    statLabel: "Quality Score Benchmark",
    deliverables: [
      "Single-Theme Ad Grouping",
      "First-Party Conversion Signals",
      "Negative Keyword Defense Shield",
      "Sub-50ms Landing Page Speeds"
    ],
    theme: 'cream',
    bgClass: 'bg-accent-light',
    textClass: 'text-[#090A0C]',
    accentColor: '#090A0C',
    icon: Zap
  },
  {
    num: "03",
    id: "meta-ads",
    name: "Meta Ads",
    category: "03 — PAID SOCIAL SCALING",
    badge: "CREATIVE AS TARGETING",
    tagline: "A scientific testing framework that screens 10-20 creative hypotheses weekly, backed by server-to-server Conversions API and Advantage+ broad scaling.",
    href: "/services/meta-ads",
    metric: "9.0+ EVENT MATCH QUALITY",
    specId: "SPEC: META-CAPI",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    statNumber: "9.2/10",
    statLabel: "CAPI Event Match Quality",
    deliverables: [
      "Dynamic Creative Testing (DCT)",
      "Zero iOS Signal Loss CAPI Gateway",
      "Broad Audience Liquidity Structure",
      "Interactive Presell Advertorials"
    ],
    theme: 'dark',
    bgClass: 'bg-[#090A0C]',
    textClass: 'text-white',
    accentColor: '#e2f0ca',
    icon: Share2
  },
  {
    num: "04",
    id: "chatgpt-ads",
    name: "ChatGPT Ads",
    category: "04 — CONVERSATIONAL INGESTION",
    badge: "EMERGING AI MEDIA",
    tagline: "Pioneer native conversational ad formats inside OpenAI SearchGPT. Deploy custom enterprise GPT agents that diagnose prospect pain points and book sales calls 24/7.",
    href: "/services/chatgpt-ads",
    metric: "FIRST-MOVER BRAND MOATS",
    specId: "SPEC: CHAT-NATIVE",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    statNumber: "24/7",
    statLabel: "Autonomous Conversational Pipeline",
    deliverables: [
      "SearchGPT Sponsored Retrievals",
      "Branded Enterprise GPT Agents",
      "Buyer Prompt Journey Mapping",
      "Conversational Pipeline Attribution"
    ],
    theme: 'cream',
    bgClass: 'bg-accent-light',
    textClass: 'text-[#090A0C]',
    accentColor: '#090A0C',
    icon: MessageSquare
  },
  {
    num: "05",
    id: "web-development",
    name: "Web Development",
    category: "05 — 120 FPS SPATIAL WEB",
    badge: "SUB-50MS EDGE SSR",
    tagline: "Living digital flagships built on hardware-accelerated WebGL GLSL shaders, normalized Lenis momentum, and streaming SSR on multi-region V8 isolates.",
    href: "/services/web-development",
    metric: "SUB-50MS GLOBAL TTFB",
    specId: "SPEC: WGL-120FPS",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2655&auto=format&fit=crop",
    statNumber: "120 FPS",
    statLabel: "Normalized Lenis Spatial Physics",
    deliverables: [
      "Custom WebGL 3D Spatial Shaders",
      "Headless Next.js 16 Edge Architecture",
      "120 FPS Normalized Lenis Physics",
      "100/100 Core Web Vitals Guaranteed"
    ],
    theme: 'dark',
    bgClass: 'bg-[#090A0C]',
    textClass: 'text-white',
    accentColor: '#e2f0ca',
    icon: Globe
  }
];

const WORKING_MODELS = [
  {
    num: "01",
    type: "FIXED SCOPE",
    title: "Project Basis",
    timeline: "4 — 8 WEEKS",
    desc: "Fixed-price end-to-end architecture deployment with well-defined deliverables and guaranteed SLAs.",
    idealFor: "Core WebGL Builds, Initial GEO Setup, Flagship Launches"
  },
  {
    num: "02",
    type: "CONTINUOUS ENGINEERING",
    title: "Monthly Retainer",
    timeline: "MONTH-TO-MONTH",
    desc: "Dedicated ongoing optimization, dynamic algorithmic tuning, and continuous creative testing.",
    idealFor: "AI Search Supremacy, Paid Media Scaling, Performance Tuning"
  },
  {
    num: "03",
    type: "STRATEGIC DIAGNOSTIC",
    title: "Consultation & Audit",
    timeline: "2 WEEKS",
    desc: "Comprehensive diagnostic scan covering vector distances, ad funnels, and infrastructure bottlenecks.",
    idealFor: "Pre-Launch Audits, Competitor Scans, Executive Reviews"
  },
  {
    num: "04",
    type: "EMBEDDED SQUAD",
    title: "Dedicated Pod",
    timeline: "QUARTERLY / ANNUAL",
    desc: "Dedicated squad of schema architects, creative engineers, and media buyers embedded into your roadmap.",
    idealFor: "Enterprise Scaleups, Fast-Moving Tech Unicorns, Global Brands"
  }
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroMouseTrackerRef = useRef<HTMLHeadingElement>(null);

  /* Dimensional Clip-Path Showcase Refs */
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const transitionSectionRef = useRef<HTMLDivElement>(null);
  const workingModelsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [activePanelIdx, setActivePanelIdx] = useState<number>(0);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("All Services Overview");
  const [selectedBudget, setSelectedBudget] = useState<string>("$50k - $100k");

  /* ----------------------------------------------------------------- */
  /* 1. LENIS SMOOTH MOMENTUM SCROLLING                                */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  /* ----------------------------------------------------------------- */
  /* 2. HERO INTERACTIVE PARTICLE CANVAS                               */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const canvas = heroCanvasRef.current;
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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const pColors = ['#89bc30', '#e2f0ca', '#ffffff'];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.45 + 0.15,
        color: pColors[Math.floor(Math.random() * pColors.length)]
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const onPointerMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
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

  /* ----------------------------------------------------------------- */
  /* 2B. HERO 3D MOUSE TRACKING TILT                                   */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > 80 || !heroMouseTrackerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(heroMouseTrackerRef.current, {
        rotateY: nx * 9,
        rotateX: -ny * 9,
        x: nx * 20,
        y: ny * 12,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ----------------------------------------------------------------- */
  /* 3. PINNED 5-LAYER DIMENSIONAL CLIP-PATH PARALLAX WIPES            */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = showcaseContainerRef.current;
      const panels = gsap.utils.toArray<HTMLElement>('.service-depth-panel');
      if (!container || !panels.length) return;

      const totalPanels = panels.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalPanels * 120}%`, // 5 dynamic scroll layers
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const currentIdx = Math.min(
              Math.floor(self.progress * totalPanels),
              totalPanels - 1
            );
            setActivePanelIdx(currentIdx);
          }
        }
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger || null;

      panels.forEach((panel, i) => {
        if (i === 0) return; // First layer is visible by default

        const content = panel.querySelector('.panel-inner-content');
        const prevPanel = panels[i - 1];

        // 1. Wipe current panel up from bottom line
        tl.fromTo(panel,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }
        )
          // 2. Parallax zoom entry on inner content
          .fromTo(content,
            { yPercent: 12, scale: 1.05 },
            { yPercent: 0, scale: 1, ease: 'power2.inOut', duration: 1 },
            '<'
          )
          // 3. Scale down previous panel into 3D background with depth
          .to(prevPanel,
            { scale: 0.86, opacity: 0.2, ease: 'power2.inOut', duration: 1 },
            '<'
          );
      });

      /* Kinetic Capability Stream Acceleration in Section 03 */
      if (transitionSectionRef.current) {
        gsap.to('.overview-track-1', {
          x: '-=320',
          ease: 'none',
          scrollTrigger: {
            trigger: transitionSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to('.overview-track-2', {
          x: '+=320',
          ease: 'none',
          scrollTrigger: {
            trigger: transitionSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      /* Working Model Rows Magnetic Slide-In */
      const modelRows = gsap.utils.toArray<HTMLElement>('.working-model-row');
      modelRows.forEach((row) => {
        gsap.fromTo(row,
          { x: -35, opacity: 0.25 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              end: 'top 65%',
              scrub: 0.5
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* Smooth scroll jump directly to any of the 5 layers */
  const scrollToLayer = (index: number) => {
    const st = scrollTriggerInstanceRef.current;
    if (!st) return;
    const progress = index / (SERVICES_DOSSIER.length - 1);
    const targetScroll = st.start + progress * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <CustomCursor />
      <Navigation />

      <main ref={containerRef} className="relative w-full bg-[#000000] text-primary-text selection:bg-accent-lime selection:text-black">

        {/* ========================================================= */}
        {/* 01 — HERO LANDING (DARK OBSIDIAN '#090A0C')               */}
        {/* ========================================================= */}
        <section ref={heroRef} className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-primary-bg select-none flex flex-col justify-between pt-24 pb-10 px-page">

          {/* Interactive Particle Canvas */}
          <canvas
            ref={heroCanvasRef}
            className="absolute inset-0 pointer-events-none z-0 opacity-80"
          />

          {/* Minimalist 3D Geometric Orbitals */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ perspective: '1000px' }}>
            <div
              className="absolute w-[44vw] h-[44vw] rounded-full border border-accent-lime/10 pointer-events-none animate-[spin_40s_linear_infinite]"
              style={{ borderStyle: 'dashed' }}
            />
            <div
              className="absolute w-[32vw] h-[32vw] rounded-full border border-white/5 pointer-events-none animate-[spin_25s_linear_infinite_reverse]"
            />
            <div
              className="absolute w-[36vw] h-[36vw] rounded-full opacity-20 animate-pulse pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(137, 188, 48, 0.22) 0%, transparent 70%)',
                animationDuration: '4s'
              }}
            />
            <div
              style={{
                width: '20vw',
                height: '20vw',
                background: 'radial-gradient(circle, #e2f0ca 0%, transparent 70%)',
                borderRadius: '9999px',
              }}
            />
          </div>

          {/* Hero Monumental Typography with 3D Mouse Tracking */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full" style={{ perspective: '1200px' }}>
            <div ref={heroTextRef} className="flex flex-col items-center text-center" style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-accent-lime font-mono text-xs uppercase tracking-widest font-bold mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_8px_#89bc30]" />
                <span>01 — 5 DIMENSIONAL ARCHITECTURES</span>
              </div>

              <h1
                ref={heroMouseTrackerRef}
                className="font-display font-bold leading-[0.85] tracking-tighter uppercase text-center flex flex-col items-center pointer-events-auto cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="text-[12vw] sm:text-[14vw] text-light-bg leading-[0.85] tracking-tighter block font-black drop-shadow-sm">
                  OUR
                </span>
                <span className="text-[12vw] sm:text-[14vw] text-accent-lime leading-[0.85] tracking-tighter block font-black drop-shadow-[0_0_35px_rgba(137,188,48,0.22)]">
                  SERVICES
                </span>
              </h1>

              <p className="mt-6 sm:mt-8 font-sans text-base sm:text-xl text-accent-light/80 font-light max-w-2xl mx-auto leading-relaxed">
                5 integrated disciplines engineered to dominate generative AI search, performance media, and spatial web flagships.
              </p>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
                <PremiumButton
                  onClick={() => {
                    showcaseContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4"
                >
                  <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2.5">
                    ENTER 5 DIMENSIONS
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </PremiumButton>

                <PremiumButton
                  variant="glass"
                  onClick={() => {
                    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4"
                >
                  <span className="font-mono text-xs uppercase tracking-widest">
                    START A PROJECT
                  </span>
                </PremiumButton>
              </div>

            </div>
          </div>

          {/* Bottom Coordinate Bar */}
          <div className="relative z-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary-text">
            <div className="flex items-center gap-2">
              <span className="text-accent-lime">00</span>
              <span className="text-white/40">•</span>
              <span>ALL SERVICES OVERVIEW & ARCHITECTURAL SPECTRUM</span>
            </div>
            <div className="text-white/40 flex items-center gap-2">
              <span>SCROLL TO DIVE THROUGH LAYERS</span>
              <MoveDown size={13} className="animate-bounce" />
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 02 — PINNED 5-LAYER DIMENSIONAL CLIP-PATH PARALLAX WIPES                  */}
        {/* (EXACT HOMEPAGE CASE STUDIES DNA WITH ALTERNATING DARK & CREAM PALETTE)   */}
        {/* ========================================================================= */}
        <section
          ref={showcaseContainerRef}
          id="services-showcase"
          className="relative h-screen w-full bg-[#090A0C] overflow-hidden select-none border-t border-white/10"
        >
          {/* Floating Sticky Cybernetic HUD */}
          <div className="absolute top-8 left-page right-page z-50 pointer-events-none flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-accent-light font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse shadow-[0_0_8px_#e2f0ca]" />
                <span>01 — ARCHITECTURAL ARCHIVES</span>
              </div>
            </div>

            {/* Quick Step Indicator Pills */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {SERVICES_DOSSIER.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => scrollToLayer(idx)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase transition-all cursor-pointer backdrop-blur-md ${activePanelIdx === idx
                      ? 'bg-accent-light text-[#090A0C] shadow-[0_0_15px_rgba(226,240,202,0.4)]'
                      : 'bg-black/40 text-white/60 hover:text-white border border-white/15'
                    }`}
                >
                  {s.num}
                </button>
              ))}
            </div>
          </div>

          {/* THE 5 FULL-SCREEN DIMENSIONAL PANELS */}
          <div className="relative w-full h-full">
            {SERVICES_DOSSIER.map((service, idx) => {
              const isCream = service.theme === 'cream';

              return (
                <div
                  key={service.id}
                  className={`service-depth-panel absolute inset-0 w-full h-full flex items-center justify-center p-page will-change-transform ${service.bgClass
                    }`}
                  style={{ zIndex: idx + 10 }}
                >
                  {/* Subtle Dot Pattern on Cream Panels */}
                  {isCream && (
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none z-0"
                      style={{
                        backgroundImage: 'radial-gradient(#090A0C 1.5px, transparent 1.5px)',
                        backgroundSize: '32px 32px'
                      }}
                    />
                  )}

                  {/* Subtle Ethereal Radial Ambient on Dark Panels */}
                  {!isCream && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none" />
                  )}

                  {/* Panel Content Container with Parallax Zoom Entry */}
                  <div className="panel-inner-content relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center will-change-transform pt-12">

                    {/* Left Column: Monumental Split Typography & Specs */}
                    <div className="lg:col-span-6 flex flex-col justify-center">

                      {/* Top Category Tag & Spec ID */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-sm tracking-widest font-bold" style={{ color: service.accentColor }}>
                          {service.category}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${isCream
                            ? 'bg-[#090A0C]/10 text-[#090A0C] border border-[#090A0C]/15'
                            : 'bg-white/10 text-white/80 border border-white/15'
                          }`}>
                          {service.specId}
                        </span>
                      </div>

                      {/* Monumental Display Heading (Exact Case Studies Scale) */}
                      <h3 className={`font-display text-[9vw] lg:text-[7vw] leading-[0.85] font-black uppercase tracking-tighter mb-6 ${service.textClass
                        }`}>
                        {service.name}
                      </h3>

                      {/* Punchy Concise Value Proposition */}
                      <p className={`text-base sm:text-xl font-sans leading-relaxed mb-8 max-w-xl font-light ${isCream ? 'text-[#090A0C]/80' : 'text-white/70'
                        }`}>
                        {service.tagline}
                      </p>

                      {/* Deliverables Checklist Chips */}
                      <div className="grid grid-cols-2 gap-2.5 mb-8 max-w-lg">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${isCream
                                ? 'bg-[#090A0C]/10 border-[#090A0C]/20'
                                : 'bg-white/10 border-white/20'
                              }`}>
                              <Check size={10} className={`stroke-[3] ${isCream ? 'text-[#090A0C]' : 'text-accent-light'}`} />
                            </div>
                            <span className={`font-mono text-xs font-medium truncate ${isCream ? 'text-[#090A0C]/90' : 'text-white/85'
                              }`}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action strip */}
                      <div className="flex items-center gap-4">
                        <a
                          href={service.href}
                          className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md group cursor-pointer ${isCream
                              ? 'bg-[#090A0C] text-accent-light hover:bg-[#15171A] hover:text-white shadow-[0_4px_20px_rgba(9,10,12,0.15)]'
                              : 'bg-accent-light text-[#090A0C] hover:bg-white hover:text-black shadow-[0_4px_25px_rgba(226,240,202,0.25)]'
                            }`}
                        >
                          <span>ENTER {service.name.toUpperCase()} PORTAL</span>
                          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        <span className={`font-mono text-xs font-bold ${isCream ? 'text-[#090A0C]' : 'text-accent-light'
                          }`}>
                          {service.metric}
                        </span>
                      </div>

                    </div>

                    {/* Right Column: Clean Simple Image (No Content / No Overlays) */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                      <div className={`relative rounded-[36px] overflow-hidden border shadow-2xl transition-all duration-500 group select-none ${isCream
                          ? 'border-[#090A0C]/15 shadow-[0_20px_50px_rgba(9,10,12,0.12)] bg-white'
                          : 'border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#121520]'
                        }`}>

                        {/* High-Resolution Clean Image */}
                        <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[460px] overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ========================================================= */}
        {/* 03 — DUAL KINETIC CAPABILITY STREAM (DARK OBSIDIAN)       */}
        {/* ========================================================= */}
        <section
          ref={transitionSectionRef}
          className="relative w-full py-16 sm:py-20 bg-[#090A0C] border-t border-b border-white/10 overflow-hidden select-none flex flex-col justify-center gap-5 sm:gap-6"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[220px] bg-white/[0.03] blur-[130px] rounded-full pointer-events-none" />

          {/* Eyebrow */}
          <div className="max-w-7xl mx-auto w-full px-page flex items-center justify-between font-mono text-xs text-white/40 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse shadow-[0_0_8px_#e2f0ca]" />
              <span className="text-accent-light font-bold uppercase tracking-wider">02 — ARCHITECTURAL SPECTRUM</span>
            </div>
            <span className="hidden sm:inline text-white/30 tracking-wider">CONTINUOUS 120 FPS STREAM</span>
          </div>

          {/* Track 1: Solid High-Contrast Typography moving Left */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="overview-track-1 flex whitespace-nowrap will-change-transform animate-marquee hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center shrink-0">
                  {SERVICES_DOSSIER.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-6 sm:gap-10 mr-6 sm:mr-10">
                      <span className={`font-display text-4xl sm:text-6xl font-black uppercase tracking-tight transition-colors ${sIdx % 2 === 0 ? 'text-white' : 'text-accent-light'
                        }`}>
                        {s.name}
                      </span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent-light shadow-[0_0_10px_#e2f0ca]" />
                      <span className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white/70">
                        {s.category}
                      </span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/40" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Outlined Typography moving Right with Matching Solid Fill */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="overview-track-2 flex whitespace-nowrap will-change-transform animate-marquee-reverse hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center shrink-0">
                  {SERVICES_DOSSIER.map((s, sIdx) => {
                    const strokeColor = sIdx % 2 === 0 ? '#FFFFFF' : '#e2f0ca';
                    return (
                      <div key={sIdx} className="flex items-center gap-6 sm:gap-10 mr-6 sm:mr-10">
                        <span
                          className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-all duration-300 hover:brightness-110"
                          style={{
                            color: strokeColor,
                            WebkitTextFillColor: strokeColor,
                            WebkitTextStroke: `1.5px ${strokeColor}`
                          }}
                        >
                          {s.metric}
                        </span>
                        <span
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                          style={{
                            backgroundColor: strokeColor,
                            boxShadow: strokeColor === '#e2f0ca' ? '0 0 10px #e2f0ca' : 'none'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 — WORKING MODELS (SIGNATURE LUXURY CREAM '#e2f0ca')     */}
        {/* ========================================================= */}
        <section
          ref={workingModelsRef}
          id="working-models"
          className="relative py-28 sm:py-32 px-page bg-accent-light text-dark-text border-y border-dark-text/15 select-none overflow-hidden"
        >
          {/* Subtle Dot Pattern Overlay on Cream */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 z-0"
            style={{
              backgroundImage: 'radial-gradient(#090A0C 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="mb-14 pb-8 border-b border-[#090A0C]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090A0C] text-accent-light font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                  <span>03 — ENGAGEMENT ARCHITECTURE</span>
                </div>
                <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#090A0C] leading-[0.9] tracking-tighter">
                  Working Models, <br />
                  <span className="text-[#3f5d13] underline decoration-accent-lime decoration-4 underline-offset-8">Tailored to You</span>
                </h2>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#090A0C]/80 max-w-md font-normal leading-relaxed">
                Choose the exact engagement framework that matches your organization&apos;s deployment velocity, technical team, and enterprise goals.
              </p>
            </div>

            {/* 4 Working Model High-Contrast Cards with Magnetic Slide-In Animation */}
            <div className="flex flex-col gap-4">
              {WORKING_MODELS.map((model, mIdx) => (
                <div
                  key={mIdx}
                  className="working-model-row py-7 sm:py-8 px-6 sm:px-10 rounded-2xl bg-white/80 hover:bg-white border border-[#090A0C]/10 hover:border-[#090A0C]/25 shadow-[0_4px_20px_rgba(9,10,12,0.03)] hover:shadow-[0_15px_35px_rgba(9,10,12,0.08)] transition-all duration-300 cursor-pointer will-change-transform grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
                  onClick={() => {
                    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="lg:col-span-4">
                    <div className="font-mono text-xs text-[#3f5d13] font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                      <span>0{mIdx + 1} — {model.type}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#090A0C] group-hover:text-black transition-colors">
                      {model.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090A0C]/5 border border-[#090A0C]/10 font-mono text-[11px] text-[#090A0C]/70 font-semibold mt-2">
                      <span>TIMELINE:</span>
                      <span className="font-bold text-[#090A0C]">{model.timeline}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="font-sans text-sm sm:text-base text-[#090A0C]/80 leading-relaxed mb-2 font-normal">
                      {model.desc}
                    </p>
                    <div className="font-mono text-xs font-bold text-[#2d430c] flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-accent-lime/30 text-[#253909] text-[10px] uppercase tracking-wider">
                        IDEAL FOR
                      </span>
                      <span className="text-[#090A0C]/90 font-medium">{model.idealFor}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex justify-start lg:justify-end">
                    <div className="w-12 h-12 rounded-full bg-[#090A0C] text-accent-light group-hover:bg-accent-lime group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(137,188,48,0.4)]">
                      <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 — INITIATE / PROJECT INQUIRY FORM                      */}
        {/* ========================================================= */}
        <section
          ref={contactRef}
          id="contact"
          className="py-32 md:py-48 bg-[#050608] relative overflow-hidden flex flex-col items-center justify-center min-h-screen"
        >
          <div id="inquiry-form" className="absolute -top-32" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-accent-lime/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="px-page w-full max-w-[90rem] mx-auto relative z-10">
            <div className="mb-20">
              <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-4 font-bold uppercase text-center">
                04 — Initiate
              </h2>
            </div>

            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-10 py-32 animate-in fade-in duration-1000">
                <div className="w-32 h-32 bg-accent-lime rounded-full flex items-center justify-center mb-4 shadow-[0_0_100px_rgba(137,188,48,0.5)]">
                  <svg className="w-16 h-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight">
                  Message Received.
                </h3>
                <p className="text-secondary-text text-2xl md:text-3xl max-w-2xl mx-auto font-serif italic">
                  The Vereen Digital team has been notified. We will review your inquiry and reach out within 24 hours.
                </p>
                <PremiumButton
                  onClick={() => setFormSubmitted(false)}
                  className="mt-12 px-10 py-4"
                  text="SEND ANOTHER REQUEST"
                />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTimeout(() => setFormSubmitted(true), 800);
                }}
                className="w-full"
              >
                <h3 className="font-display text-[7vw] md:text-[5vw] lg:text-[4vw] font-bold text-accent-light/40 leading-[1.4] md:leading-[1.6] tracking-tight">
                  Hello, my name is <br className="md:hidden" />
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="inline-block bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[200px] md:w-[350px] lg:w-[400px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all placeholder:text-accent-light/10 mx-2 md:mx-6 pb-2"
                  />
                  <br className="hidden lg:block" />and I represent <br className="md:hidden" />
                  <input
                    required
                    type="text"
                    placeholder="Company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="inline-block bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[200px] md:w-[350px] lg:w-[400px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all placeholder:text-accent-light/10 mx-2 md:mx-6 pb-2"
                  />.
                  <br className="hidden lg:block" />We are looking for a world-class team to help us with <br className="md:hidden" />
                  <div className="inline-block relative mx-2 md:mx-6">
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="appearance-none bg-transparent border-b-2 border-accent-light/20 text-accent-lime outline-none w-[280px] md:w-[500px] lg:w-[620px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all pb-2 cursor-pointer relative z-10"
                    >
                      <option value="All Services Overview" className="bg-[#090A0C] text-lg">All Services Overview</option>
                      <option value="AI SEO (GEO & Vector Retrieval)" className="bg-[#090A0C] text-lg">AI SEO (GEO & Vector Retrieval)</option>
                      <option value="Google Ads (High-Intent Acquisition)" className="bg-[#090A0C] text-lg">Google Ads (High-Intent Acquisition)</option>
                      <option value="Meta Ads (Paid Social Scaling)" className="bg-[#090A0C] text-lg">Meta Ads (Paid Social Scaling)</option>
                      <option value="ChatGPT Ads (Conversational Ingestion)" className="bg-[#090A0C] text-lg">ChatGPT Ads (Conversational Ingestion)</option>
                      <option value="Web Development (120 FPS Spatial Web)" className="bg-[#090A0C] text-lg">Web Development (120 FPS Spatial Web)</option>
                    </select>
                  </div>.
                  <br className="hidden lg:block" />We have a budget of roughly <br className="md:hidden" />
                  <div className="inline-block relative mx-2 md:mx-6">
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="appearance-none bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[220px] md:w-[350px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all pb-2 cursor-pointer relative z-10"
                    >
                      <option value="$50k - $100k" className="bg-[#090A0C] text-lg">$50k - $100k</option>
                      <option value="$100k - $250k" className="bg-[#090A0C] text-lg">$100k - $250k</option>
                      <option value="$250k+" className="bg-[#090A0C] text-lg">$250k+</option>
                    </select>
                  </div>.
                  <br className="hidden lg:block" />You can reach me at <br className="md:hidden" />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="inline-block bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[250px] md:w-[500px] lg:w-[600px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all placeholder:text-accent-light/10 mx-2 md:mx-6 pb-2"
                  />
                  <br className="hidden lg:block" />to get the conversation started.
                </h3>

                <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex gap-8 font-mono text-sm text-secondary-text">
                    <a href="mailto:hello@vereendigital.com" className="hover:text-accent-lime transition-colors">
                      hello@vereendigital.com
                    </a>
                    <span className="hidden md:block">/</span>
                    <span className="hidden md:block">India</span>
                  </div>

                  <PremiumButton
                    type="submit"
                    text="SUBMIT INQUIRY"
                    className="px-8 md:px-12 py-4 md:py-5 font-bold uppercase text-sm md:text-base w-full md:w-auto"
                  />
                </div>
              </form>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
