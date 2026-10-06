"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Check
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from '../sections/Footer';
import CustomCursor from './CustomCursor';
import { PremiumButton } from './PremiumButton';
import FAQSection from '../sections/FAQSection';
import { ServicePageConfig } from '../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

const defaultWorkingModels = [
  {
    title: "Project Basis",
    type: "FIXED SCOPE",
    desc: "The best approach for a one-time deployment, where the scope is well defined and the deliverables are clear. A fixed-price model where the system is delivered within a specific timeline and SLA.",
    timeline: "4 — 8 WEEKS",
    idealFor: "Core Builds, Initial Systems Deployment, Architecture Setup"
  },
  {
    title: "Monthly Retainer",
    type: "CONTINUOUS ENGINEERING",
    desc: "Ideal for ongoing systems that require continuous optimization, algorithmic synchronization, dynamic performance tuning, and 24/7 defense as market algorithms shift.",
    timeline: "MONTH-TO-MONTH / ANNUAL",
    idealFor: "Continuous Optimization, Performance Tuning, Scaling Sprints"
  },
  {
    title: "Consultation & Audit",
    type: "STRATEGIC DIAGNOSTIC",
    desc: "We provide comprehensive algorithmic audits to help executive leadership make informed decisions about their digital presence, conversion funnels, and system architecture.",
    timeline: "2 WEEKS",
    idealFor: "Pre-Launch Audits, Competitive Displacement Scans, Architecture Reviews"
  },
  {
    title: "White Labeling",
    type: "AGENCY PARTNERSHIP",
    desc: "If you are an enterprise agency or elite design studio, we work as your stealth technology partner, providing deep engineering and marketing expertise under your brand name.",
    timeline: "FLEXIBLE PARTNERSHIP",
    idealFor: "Creative Agencies, Design Consultancies, Enterprise System Integrators"
  },
  {
    title: "Dedicated Engineering Pod",
    type: "EMBEDDED SQUAD",
    desc: "We deploy a dedicated squad of domain engineers, creative architects, and performance specialists embedded directly into your product roadmap to accelerate high-stakes initiatives.",
    timeline: "QUARTERLY / LONG-TERM",
    idealFor: "Enterprise Scaleups, Fast-Moving Tech Unicorns, Global Enterprises"
  }
];

const industries = [
  "Enterprise SaaS",
  "FinTech & WealthTech",
  "AI & DeepTech",
  "Healthcare & Life Sciences",
  "Global E-Commerce",
  "Luxury & Hospitality",
  "Web3 & Decentralized Systems",
  "Industrial Logistics",
  "Venture Capital & Private Equity"
];

const manifestoParagraph = "We engineer digital ecosystems for visionaries who refuse ordinary standards. True market supremacy requires bold architectural audacity, deterministic precision, and living kinetic craft that turn visitors into devoted advocates.";

interface ServicePageTemplateProps {
  config: ServicePageConfig;
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroMouseTrackerRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const transitionSectionRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const marqueeSectionRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);
  const workingModelsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);

  const [activeDeckCard, setActiveDeckCard] = useState<number>(0);
  const [activeOfferingIdx, setActiveOfferingIdx] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<string>(config.offerings[0]?.title || config.name);
  const [selectedModel, setSelectedModel] = useState<string>("Project Basis");
  const [selectedBudget, setSelectedBudget] = useState<string>("$50k - $100k");
  const [userName, setUserName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const track1List = useMemo(() => config.tickerTrack1 || [
    config.name.toUpperCase(),
    config.solutions[0]?.category || 'PRECISION',
    config.solutions[1]?.title.toUpperCase() || 'ENTERPRISE ARCHITECTURE',
    config.solutions[2]?.category || '120 FPS KINETIC',
    'VEREEN DIGITAL'
  ], [config]);

  const track2List = useMemo(() => config.tickerTrack2 || [
    config.heroCoordinate.toUpperCase(),
    config.solutions[2]?.title.toUpperCase() || 'ZERO SEMANTIC DRIFT',
    config.solutions[3]?.title.toUpperCase() || 'CLOSED-WON PIPELINE',
    'UNRIVALED CRAFT'
  ], [config]);

  const manifestoWords = useMemo(() => manifestoParagraph.split(" "), []);

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
  /* 2. MINIMALIST HERO INTERACTIVE PARTICLE CANVAS                    */
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
        size: Math.random() * 1.8 + 0.8,
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

  /* ----------------------------------------------------------------- */
  /* 2B. HERO SMOOTH 3D MOUSE TRACKING TILT                            */
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
        x: nx * 22,
        y: ny * 14,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ----------------------------------------------------------------- */
  /* 3. PINNED HORIZONTAL SOLUTIONS STREAM                             */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = deckRef.current;
      const cards = gsap.utils.toArray<HTMLElement>('.wolfx-solution-card');
      if (!track || !section || !cards.length) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 140;

      ScrollTrigger.create({
        id: 'deck-stream',
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount() * 1.4}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none'
        }),
        onUpdate: (self) => {
          const velocity = self.getVelocity() / -280;
          const clampedSkew = Math.max(Math.min(velocity, 4), -4);
          gsap.to(cards, {
            skewX: clampedSkew,
            duration: 0.35,
            ease: 'power1.out',
            overwrite: 'auto'
          });

          const currentIdx = Math.min(
            Math.floor(self.progress * cards.length),
            cards.length - 1
          );
          setActiveDeckCard(currentIdx);
        }
      });

      /* Section 02 Story Words Scrub */
      gsap.utils.toArray<HTMLElement>('.story-scrub-word').forEach((word) => {
        gsap.fromTo(word,
          { opacity: 0.2, color: 'rgba(255,255,255,0.2)' },
          {
            opacity: 1,
            color: '#FFFFFF',
            scrollTrigger: {
              trigger: word,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.3
            }
          }
        );
      });

      /* Section 05 Manifesto Scrub */
      gsap.utils.toArray<HTMLElement>('.manifesto-word').forEach((word) => {
        gsap.fromTo(word,
          { opacity: 0.15, filter: 'blur(3px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scrollTrigger: {
              trigger: word,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.3
            }
          }
        );
      });

      /* Section 03 Kinetic Capability Stream Scroll Acceleration */
      if (transitionSectionRef.current) {
        gsap.to('.transition-track-1', {
          x: '-=300',
          ease: 'none',
          scrollTrigger: {
            trigger: transitionSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to('.transition-track-2', {
          x: '+=300',
          ease: 'none',
          scrollTrigger: {
            trigger: transitionSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      /* Section 06 Diagonal Marquees */
      if (marqueeSectionRef.current) {
        gsap.to('.marquee-track-1', {
          x: '-=350',
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to('.marquee-track-2', {
          x: '+=350',
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      /* Section 07 Stacking Cards Scroll Deck */
      const offeringsSection = offeringsRef.current;
      const stackCards = gsap.utils.toArray<HTMLElement>('.offering-stack-card');
      if (offeringsSection && stackCards.length > 1) {
        const stackTl = gsap.timeline({
          scrollTrigger: {
            trigger: offeringsSection,
            start: 'top top',
            end: `+=${stackCards.length * 750}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const activeIdx = Math.min(
                Math.floor(self.progress * stackCards.length),
                stackCards.length - 1
              );
              setActiveOfferingIdx(activeIdx);
            }
          }
        });

        for (let i = 1; i < stackCards.length; i++) {
          const currentCard = stackCards[i];
          const prevCard = stackCards[i - 1];

          gsap.set(currentCard, { y: 160, opacity: 0, scale: 0.94 });

          stackTl.to(currentCard, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'none'
          }, `+=0.04`)
            .to(prevCard, {
              y: -22,
              scale: 0.96,
              filter: 'brightness(0.65)',
              duration: 1,
              ease: 'none'
            }, '<');

          if (i >= 2) {
            stackTl.to(stackCards[i - 2], {
              y: -40,
              scale: 0.92,
              filter: 'brightness(0.4)',
              duration: 1,
              ease: 'none'
            }, '<');
          }
          if (i >= 3) {
            stackTl.to(stackCards[i - 3], {
              y: -56,
              scale: 0.88,
              filter: 'brightness(0.25)',
              duration: 1,
              ease: 'none'
            }, '<');
          }
          if (i >= 4) {
            stackTl.to(stackCards[i - 4], {
              y: -70,
              scale: 0.84,
              filter: 'brightness(0.15)',
              opacity: 0.2,
              duration: 1,
              ease: 'none'
            }, '<');
          }
          if (i >= 5) {
            stackTl.to(stackCards[i - 5], {
              y: -82,
              scale: 0.80,
              opacity: 0,
              duration: 1,
              ease: 'none'
            }, '<');
          }
        }
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

      /* Industries Tag Cloud Stagger Wave */
      if (industriesRef.current) {
        gsap.fromTo('.industry-tag',
          { scale: 0.82, opacity: 0.2 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.04,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: industriesRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.6
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [config]);

  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotlight = card.querySelector<HTMLElement>('.card-spotlight');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(137, 188, 48, 0.28), rgba(226, 240, 202, 0.08) 40%, transparent 70%)`;
      spotlight.style.opacity = '1';
    }
  };

  const resetCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const spotlight = card.querySelector<HTMLElement>('.card-spotlight');
    if (spotlight) {
      spotlight.style.opacity = '0';
    }
  };

  return (
    <>
      <CustomCursor />
      <Navigation />

      <main ref={containerRef} className="relative w-full bg-[#000000] text-primary-text selection:bg-accent-lime selection:text-black">

        {/* ========================================================= */}
        {/* 01 — HERO LANDING: CENTERED ORBITALS & CUSTOMIZED TITLE   */}
        {/* ========================================================= */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-primary-bg select-none flex flex-col justify-between pt-24 pb-10 px-page">

          {/* Interactive Minimalist Particle Canvas */}
          <canvas 
            ref={heroCanvasRef} 
            className="absolute inset-0 pointer-events-none z-0 opacity-80"
          />

          {/* Minimalist 3D Geometric Orbitals (Dead-Center) */}
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
                width: '22vw', 
                height: '22vw', 
                background: 'radial-gradient(circle, #e2f0ca 0%, transparent 70%)', 
                borderRadius: '9999px',
              }} 
            />
          </div>



          {/* Center Monumental Typography with Smooth 3D Mouse Tracking */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full" style={{ perspective: '1200px' }}>
            <div ref={heroTextRef} className="flex flex-col items-center text-center" style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}>
              
              <h1 
                ref={heroMouseTrackerRef} 
                className="font-display font-bold leading-[0.85] tracking-tighter uppercase text-center flex flex-col items-center pointer-events-auto cursor-default" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="text-[12vw] sm:text-[14vw] text-light-bg leading-[0.85] tracking-tighter block font-black drop-shadow-sm">
                  {config.titlePart1}
                </span>
                <span className="text-[12vw] sm:text-[14vw] text-accent-lime leading-[0.85] tracking-tighter block font-black drop-shadow-[0_0_35px_rgba(137,188,48,0.22)]">
                  {config.titlePart2}
                </span>
              </h1>

              <p className="mt-8 font-sans text-base sm:text-xl text-accent-light/80 font-light max-w-2xl mx-auto leading-relaxed">
                {config.heroTagline}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
                <PremiumButton
                  onClick={() => {
                    deckRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4"
                >
                  <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                    EXPLORE CAPABILITIES
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </PremiumButton>

                <PremiumButton
                  variant="glass"
                  onClick={() => {
                    workingModelsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4"
                >
                  <span className="font-mono text-xs uppercase tracking-widest">
                    WORKING MODELS
                  </span>
                </PremiumButton>
              </div>

            </div>
          </div>

          {/* Bottom Coordinates & Scroll Prompt */}
          <div className="relative z-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary-text">
            <div className="flex items-center gap-2">
              <span className="text-accent-lime">01</span>
              <span className="text-white/40">•</span>
              <span>{config.heroCoordinate}</span>
            </div>
            <div className="text-white/40 flex items-center gap-2">
              <span>SCROLL TO EXPLORE ARCHITECTURAL NARRATIVE</span>
              <span>↓</span>
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 02 — SPLIT STORY NARRATIVE                                */}
        {/* ========================================================= */}
        <section ref={storyRef} className="relative min-h-screen py-28 px-page bg-[#090A0C] border-t border-white/10 text-white flex flex-col justify-between select-none">
          <div
            className="absolute inset-0 pointer-events-none opacity-15 z-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(226, 240, 202, 0.3) 1px, transparent 1px)',
              backgroundSize: '36px 36px'
            }}
          />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-auto">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-6 font-bold uppercase">
                {config.thesisEyebrow}
              </h2>
              <h2 className="story-sticky-title font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white leading-[0.9] tracking-tighter transition-colors will-change-transform">
                {config.thesisHeadline}
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-16 lg:gap-24">
              {config.storyBlocks.map((block, bIdx) => (
                <div key={bIdx} className={`group ${bIdx < config.storyBlocks.length - 1 ? 'border-b border-white/10 pb-12' : ''}`}>
                  <span className="font-mono text-xs text-accent-lime font-bold uppercase tracking-widest mb-3 block">
                    {block.num} — {block.tag}
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white leading-tight mb-4 group-hover:text-accent-lime transition-colors">
                    {block.title}
                  </h3>
                  <p className="font-sans text-base sm:text-xl text-secondary-text leading-relaxed font-light">
                    {block.desc.split(" ").map((word, wIdx) => (
                      <span key={wIdx} className="story-scrub-word inline-block mr-1.5 transition-colors">
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 — MONUMENTAL KINETIC CAPABILITY STREAM                 */}
        {/* ========================================================= */}
        <section 
          ref={transitionSectionRef}
          className="relative w-full py-16 sm:py-24 bg-[#050608] border-t border-b border-white/10 overflow-hidden select-none flex flex-col justify-center gap-5 sm:gap-7"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[250px] bg-accent-lime/10 blur-[130px] rounded-full pointer-events-none" />

          {/* Section Eyebrow Header */}
          <div className="max-w-7xl mx-auto w-full px-page flex items-center justify-between font-mono text-xs text-white/40 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
              <span className="text-accent-lime font-bold uppercase tracking-wider">03 — CAPABILITY SPECTRUM</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/30 tracking-wider">
              <span>CONTINUOUS 120 FPS STREAM</span>
              <span>•</span>
              <span className="text-accent-light/60">{config.name}</span>
            </div>
          </div>

          {/* Track 1: Solid High-Contrast Typography moving Left */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="transition-track-1 flex whitespace-nowrap will-change-transform animate-marquee hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center shrink-0">
                  {track1List.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-6 sm:gap-10 mr-6 sm:mr-10">
                      <span className={`font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-colors ${
                        itemIdx === 0 ? 'text-white' : itemIdx % 2 === 1 ? 'text-accent-lime' : 'text-accent-light'
                      }`}>
                        {item}
                      </span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent-lime shadow-[0_0_10px_#89bc30]" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Outlined Wireframe Typography moving Right */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="transition-track-2 flex whitespace-nowrap will-change-transform animate-marquee-reverse hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center shrink-0">
                  {track2List.map((item, itemIdx) => {
                    const strokeColor = itemIdx % 2 === 0 ? '#FFFFFF' : '#89bc30';
                    return (
                      <div key={itemIdx} className="flex items-center gap-6 sm:gap-10 mr-6 sm:mr-10">
                        <span 
                          className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-all duration-300 hover:brightness-110"
                          style={{
                            color: strokeColor,
                            WebkitTextFillColor: strokeColor,
                            WebkitTextStroke: `1.5px ${strokeColor}`
                          }}
                        >
                          {item}
                        </span>
                        <span 
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                          style={{
                            backgroundColor: strokeColor,
                            boxShadow: strokeColor === '#89bc30' ? '0 0 10px #89bc30' : 'none'
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
        {/* 04 — PINNED HORIZONTAL SOLUTIONS STREAM                   */}
        {/* ========================================================= */}
        <section
          ref={deckRef}
          id="capabilities"
          className="relative min-h-[780px] lg:min-h-[820px] h-screen w-full bg-[#07080a] flex flex-col justify-between overflow-hidden border-t border-white/10 select-none"
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none z-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(226, 240, 202, 0.4) 1px, transparent 1px)',
              backgroundSize: '44px 44px'
            }}
          />

          <div className="relative z-10 w-full my-auto overflow-visible py-3 sm:py-5">
            <div
              ref={trackRef}
              className="flex items-center gap-8 sm:gap-12 pl-page pr-[40vw] will-change-transform"
            >
              {config.solutions.map((service, index) => (
                <div
                  key={service.num}
                  onMouseMove={handleCardTilt}
                  onMouseLeave={resetCardTilt}
                  className="wolfx-solution-card relative w-[88vw] sm:w-[680px] lg:w-[760px] xl:w-[780px] h-[520px] sm:h-[530px] rounded-[44px] p-6 sm:p-8 lg:p-9 flex flex-col justify-between shrink-0 overflow-hidden border border-accent-lime/40 bg-gradient-to-b from-[#131622] via-[#0d0f17] to-[#08090d] shadow-[0_0_45px_rgba(137,188,48,0.18)] hover:border-accent-lime hover:shadow-[0_0_65px_rgba(137,188,48,0.28)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                >
                  <div className="card-spotlight absolute inset-0 pointer-events-none rounded-[44px] opacity-0 transition-opacity duration-300 z-0" />

                  <div
                    className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none opacity-20 bg-accent-lime"
                  />

                  {/* Top Bar */}
                  <div className="shrink-0 relative z-10 pb-4 border-b border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-accent-lime">
                        {service.num}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                        {service.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 font-mono text-xs text-white/40 tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_8px_#89bc30]" />
                      <span className="hidden sm:inline">ARCHITECTURAL SPEC 0{index + 1}</span>
                      <span className="sm:hidden">SPEC 0{index + 1}</span>
                    </div>
                  </div>

                  {/* Middle Stage */}
                  <div className="flex-1 relative z-10 my-auto py-3 sm:py-4 flex flex-col justify-center">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white leading-tight tracking-tight mb-1.5">
                      {service.title}
                    </h3>

                    <div className="font-serif italic text-accent-light text-sm sm:text-base lg:text-lg mb-2 leading-snug">
                      {service.subtitle}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-secondary-text leading-relaxed max-w-2xl mb-4 sm:mb-5">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3 pt-1">
                      {service.points.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center gap-3 py-0.5 group cursor-default"
                        >
                          <div className="w-5 h-5 rounded-full bg-accent-lime/15 border border-accent-lime/40 flex items-center justify-center shrink-0 group-hover:bg-accent-lime group-hover:border-accent-lime transition-all shadow-[0_0_10px_rgba(137,188,48,0.2)]">
                            <Check size={12} className="text-accent-lime group-hover:text-black transition-colors stroke-[2.5]" />
                          </div>
                          <span className="font-mono text-xs sm:text-sm text-white/90 font-medium group-hover:text-accent-lime transition-colors">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="shrink-0 relative z-10 pt-3 pb-0.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/40">
                      <span>STACK:</span>
                      {service.tech.map((techItem, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-accent-light font-mono text-xs hover:border-accent-lime/40 transition-colors"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>

                    <PremiumButton
                      onClick={() => {
                        workingModelsRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 shrink-0"
                    >
                      <span className="font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                        CONFIGURE SPECIFICATION
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </PremiumButton>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Bottom Status Coordinate */}
          <div className="relative z-20 px-page pb-5 pt-3 flex items-center justify-between font-mono text-[11px] text-secondary-text border-t border-white/10 bg-[#07080a]/90 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>ARCHITECTURE {activeDeckCard + 1} OF {config.solutions.length}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-white/40">
              <span>SCROLL OR USE STEPS TO STREAM DISCIPLINES</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/40">FOCUS:</span>
              <span className="text-accent-light">{config.solutions[activeDeckCard]?.title}</span>
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 05 — MANIFESTO SECTION                                    */}
        {/* ========================================================= */}
        <section
          ref={manifestoRef}
          className="relative py-36 px-page bg-accent-light text-dark-text border-y border-dark-text/15 select-none overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-10 z-0"
            style={{
              backgroundImage: 'radial-gradient(#090A0C 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#090A0C] text-accent-light font-mono text-xs uppercase tracking-widest font-bold mb-10 shadow-md">
              <Sparkles size={13} className="text-accent-lime" />
              <span>05 — THE ARCHITECTURAL PHILOSOPHY</span>
            </div>

            <div className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#090A0C] leading-[1.08] tracking-tight">
              {manifestoWords.map((word, idx) => {
                const isHighlight = word.includes("visionaries") || word.includes("supremacy") || word.includes("precision") || word.includes("advocates");
                return (
                  <span
                    key={idx}
                    className={`manifesto-word inline-block mr-2.5 sm:mr-3.5 transition-colors will-change-transform ${isHighlight ? 'text-[#090A0C] underline decoration-accent-lime decoration-4 underline-offset-8' : ''}`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[#090A0C]/15 font-mono text-xs text-[#090A0C]/70">
              <span className="font-bold tracking-wider">VEREEN DIGITAL • HIGH-PERFORMANCE STANDARDS</span>
              <span>DOMINATING CONVERSATIONAL DISCOVERY ACROSS CHANNELS</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 — DUAL CROSSING MARQUEES                               */}
        {/* ========================================================= */}
        <section ref={marqueeSectionRef} className="relative py-28 bg-[#07080a] border-t border-b border-white/10 overflow-hidden select-none flex flex-col justify-center gap-8 min-h-[360px]">
          <div className="marquee-track-1 w-[120vw] -ml-[10vw] rotate-3 bg-[#0c0e14] border-y border-white/15 py-4 shadow-xl will-change-transform">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 font-display text-xl sm:text-3xl font-bold uppercase tracking-wider text-white shrink-0 mr-8">
                  <span className="text-accent-lime">{config.name.toUpperCase()}</span>
                  <span>•</span>
                  <span>ENTERPRISE STANDARDS</span>
                  <span>•</span>
                  <span className="text-accent-light">SUB-50MS EDGE SLA</span>
                  <span>•</span>
                  <span>MAXIMIZED CONVERSION</span>
                  <span>•</span>
                  <span className="text-accent-lime">100% PROVEN PIPELINE</span>
                  <span>•</span>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-track-2 w-[120vw] -ml-[10vw] -rotate-3 bg-accent-lime text-black border-y border-accent-lime py-4 shadow-2xl will-change-transform">
            <div className="flex whitespace-nowrap animate-marquee-reverse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 font-display text-xl sm:text-3xl font-black uppercase tracking-wider shrink-0 mr-8">
                  <span>UNRIVALED CRAFT</span>
                  <span>•</span>
                  <span>VERIFIED ROI</span>
                  <span>•</span>
                  <span>SCALABLE ARCHITECTURE</span>
                  <span>•</span>
                  <span>CLOSED-WON DEALS</span>
                  <span>•</span>
                  <span>ZERO DRIFT</span>
                  <span>•</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 07 — NUMBERED SHOWCASE STACKING CARDS                     */}
        {/* ========================================================= */}
        <section ref={offeringsRef} id="offerings" className="relative min-h-screen py-24 sm:py-32 px-page bg-[#090A0C] border-b border-white/10 select-none flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5">
              <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-6 font-bold uppercase">
                07 — ARCHITECTURAL PORTFOLIO
              </h2>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white leading-tight mb-6">
                {config.name} <br />
                <span className="text-accent-lime">Capabilities</span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-secondary-text leading-relaxed font-light">
                Every enterprise deployment is custom-engineered to give your organization an unfair, unassailable advantage.
              </p>
            </div>

            {/* Right Column: Stacking Cards */}
            <div className="lg:col-span-7 relative w-full pt-16 sm:pt-20">
              <div className="relative w-full h-[500px] sm:h-[540px]">
                {config.offerings.map((offering, idx) => (
                  <div
                    key={offering.num}
                    id={`offering-stack-${idx}`}
                    style={{
                      zIndex: idx + 10,
                      transformOrigin: 'top center',
                      opacity: idx === 0 ? 1 : 0
                    }}
                    className={`offering-stack-card absolute inset-0 w-full h-full p-7 sm:p-9 rounded-[32px] bg-[#0c0e14] border transition-colors duration-300 will-change-transform flex flex-col justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.95),0_25px_60px_rgba(0,0,0,0.7)] ${
                      activeOfferingIdx === idx
                        ? 'border-accent-lime/60 shadow-[0_0_50px_rgba(137,188,48,0.2)]'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/50 to-transparent pointer-events-none" />

                    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl sm:text-3xl font-black text-accent-lime">
                          {offering.num}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-accent-light/80 uppercase tracking-wider font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                        {offering.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white leading-tight mb-2.5">
                      {offering.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-secondary-text leading-relaxed mb-3.5 font-light">
                      {offering.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-3.5">
                      {offering.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-xs text-white/90 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shrink-0 shadow-[0_0_6px_#89bc30]" />
                          {deliv}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-white/40">
                        SPECIFICATION 0{idx + 1}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedService(offering.title);
                          inquiryRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="font-mono text-xs text-accent-lime font-bold uppercase tracking-wider hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>SELECT CAPABILITY</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 08 — WORKING MODELS                                       */}
        {/* ========================================================= */}
        <section
          ref={workingModelsRef}
          id="working-models"
          className="relative py-32 px-page bg-accent-light text-dark-text border-y border-dark-text/15 select-none overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-10 z-0"
            style={{
              backgroundImage: 'radial-gradient(#090A0C 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 pb-8 border-b border-[#090A0C]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090A0C] text-accent-light font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                  <span>08 — ENGAGEMENT ARCHITECTURE</span>
                </div>
                <h2 className="font-display text-4xl sm:text-7xl font-black uppercase text-[#090A0C] leading-[0.9] tracking-tighter">
                  Working Models, <br />
                  <span className="text-[#3f5d13] underline decoration-accent-lime decoration-4 underline-offset-8">Tailored to You</span>
                </h2>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#090A0C]/80 max-w-md font-normal leading-relaxed">
                Choose the exact engagement framework that matches your organization's deployment velocity, technical team, and enterprise goals.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {defaultWorkingModels.map((model, mIdx) => (
                <div
                  key={mIdx}
                  className="working-model-row py-8 sm:py-10 px-6 sm:px-10 rounded-2xl bg-white/75 hover:bg-white border border-[#090A0C]/10 hover:border-[#090A0C]/25 shadow-[0_4px_20px_rgba(9,10,12,0.03)] hover:shadow-[0_15px_35px_rgba(9,10,12,0.08)] transition-all duration-300 cursor-pointer will-change-transform grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
                  onClick={() => {
                    setSelectedModel(model.title);
                    inquiryRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="lg:col-span-4">
                    <div className="font-mono text-xs text-[#3f5d13] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                      <span>0{mIdx + 1} — {model.type}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#090A0C] group-hover:text-black transition-colors">
                      {model.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090A0C]/5 border border-[#090A0C]/10 font-mono text-[11px] text-[#090A0C]/70 font-semibold mt-2.5">
                      <span>TIMELINE:</span>
                      <span className="font-bold text-[#090A0C]">{model.timeline}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="font-sans text-sm sm:text-base text-[#090A0C]/80 leading-relaxed mb-3 font-normal">
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
                    <div className="w-14 h-14 rounded-full bg-[#090A0C] text-accent-light group-hover:bg-accent-lime group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_0_25px_rgba(137,188,48,0.5)]">
                      <ArrowUpRight size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 09 — INDUSTRIES WE EMPOWER                                */}
        {/* ========================================================= */}
        <section ref={industriesRef} className="relative py-28 px-page bg-[#08090c] border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-4 font-bold uppercase">
                09 — GLOBAL DOMAINS
              </h2>
              <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase text-white mb-4">
                Industries We Empower
              </h2>
              <p className="font-sans text-secondary-text text-base sm:text-lg font-light">
                Our architectural frameworks power market leaders across complex, high-stakes global sectors.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
              {industries.map((ind, iIdx) => (
                <div
                  key={iIdx}
                  className="industry-tag px-6 py-4 rounded-2xl bg-[#0c0e14] border border-white/10 hover:border-accent-lime/60 hover:bg-accent-lime/10 transition-all duration-300 text-white font-mono text-sm uppercase tracking-wider flex items-center gap-3 cursor-default will-change-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-lime" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10 — FAQ SECTION                                          */}
        {/* ========================================================= */}
        <FAQSection />

        {/* ========================================================= */}
        {/* 11 — INITIATE / INQUIRY FORM                              */}
        {/* ========================================================= */}
        <section
          ref={inquiryRef}
          id="contact"
          className="py-32 md:py-48 bg-[#050608] relative overflow-hidden flex flex-col items-center justify-center min-h-screen"
        >
          <div id="inquiry-form" className="absolute -top-32" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-accent-lime/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="px-page w-full max-w-[90rem] mx-auto relative z-10">
            <div className="mb-20">
              <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-4 font-bold uppercase text-center">
                10 — Initiate
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
                      <option value={config.name} className="bg-[#090A0C] text-lg">{config.name}</option>
                      {config.offerings.map((off) => (
                        <option key={off.num} value={off.title} className="bg-[#090A0C] text-lg">{off.title}</option>
                      ))}
                      <option value="Generative Engine Optimization (GEO)" className="bg-[#090A0C] text-lg">Generative Engine Optimization (GEO)</option>
                      <option value="Google Ads Acquisition" className="bg-[#090A0C] text-lg">Google Ads Acquisition</option>
                      <option value="Meta Ads Scale" className="bg-[#090A0C] text-lg">Meta Ads Scale</option>
                      <option value="ChatGPT Conversational Ads" className="bg-[#090A0C] text-lg">ChatGPT Conversational Ads</option>
                      <option value="Web Development & WebGL" className="bg-[#090A0C] text-lg">Web Development & WebGL</option>
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
};

export default ServicePageTemplate;
