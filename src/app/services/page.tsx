"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Cpu,
  Network,
  ShieldCheck,
  Terminal,
  ArrowUpRight,
  ArrowRight,
  Layers,
  Database,
  Activity,
  Search,
  CheckCircle2,
  Code2,
  Sliders,
  Zap,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Clock,
  Shield,
  Send,
  Boxes,
  Compass,
  FileCheck,
  Copy,
  Check,
  Radio,
  Eye
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../sections/Footer';
import CustomCursor from '../../components/CustomCursor';
import { PremiumButton } from '../../components/PremiumButton';
import EchoText from '../../components/EchoText';
import FAQSection from '../../sections/FAQSection';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================= */
/* WOLFX-ALIGNED ENTERPRISE DATA SPECIFICATIONS                      */
/* ================================================================= */

const solutionsData = [
  {
    num: "01",
    category: "RETRIEVAL",
    specId: "SPEC: GEO-256T",
    title: "Generative Engine Optimization",
    subtitle: "Brand Supremacy Inside LLM Answers",
    desc: "We engineer semantic vector embeddings and structured schemas so AI models cite your brand as the canonical authority.",
    slides: [
      "Generative Engine SEO (GEO)",
      "Perplexity Sonar Protocol",
      "Wikidata Entity Reconciliation",
      "Semantic Vector Chunking"
    ],
    points: [
      "256-Token Semantic Chunking",
      "Vector Distance Calibration",
      "Perplexity Canonical Citations",
      "Multi-Turn Prompt Ingestion"
    ],
    tech: ["Schema.org", "Wikidata SPARQL", "Vector RAG"],
    accentColor: "#89bc30"
  },
  {
    num: "02",
    category: "TAXONOMY",
    specId: "SPEC: KGD-QNODE",
    title: "Knowledge Graph Ontologies",
    subtitle: "Eradicating Model Hallucinations",
    desc: "Deterministic JSON-LD @graph frameworks anchoring your enterprise into global machine ontologies with zero semantic drift.",
    slides: [
      "Zero-Drift Graph Ontology",
      "Google Knowledge Panel Sync",
      "Bing Entity Index Reconciliation",
      "Cryptographic Entity Claims"
    ],
    points: [
      "Wikidata Q-Node Binding",
      "Google Knowledge Panel Sync",
      "Cryptographic Entity Claims",
      "Copilot Index Verification"
    ],
    tech: ["Wikidata SPARQL", "Google KG API", "JSON-LD @graph"],
    accentColor: "#89bc30"
  },
  {
    num: "03",
    category: "PERFORMANCE",
    specId: "SPEC: WGL-120FPS",
    title: "Kinetic & WebGL Spatial Engines",
    subtitle: "120 FPS Living Spatial Interfaces",
    desc: "Living digital universes built on hardware-accelerated WebGL shaders, fluid Lenis momentum, and sub-50ms edge rendering.",
    slides: [
      "120 FPS WebGL Shaders",
      "Lenis Momentum Physics",
      "Headless Next.js 16 Edge",
      "Spatial Typography Fields"
    ],
    points: [
      "Custom WebGL GLSL Shaders",
      "120 FPS Momentum Physics",
      "Headless Next.js Edge SSR",
      "Dynamic Ambient Glow Lighting"
    ],
    tech: ["Three.js WebGL", "Lenis Physics", "Next.js Edge"],
    accentColor: "#89bc30"
  },
  {
    num: "04",
    category: "ATTRIBUTION",
    specId: "SPEC: ARR-ATTRIB",
    title: "Conversational Revenue Attribution",
    subtitle: "Closed-Loop Generative Search ARR",
    desc: "Direct telemetry connecting conversational AI search citations directly to closed-won enterprise pipeline and verified ARR.",
    slides: [
      "Multi-Touch LLM Attribution",
      "Conversational Lead Telemetry",
      "Direct Closed-Won ARR Sync",
      "Executive Pipeline Dashboards"
    ],
    points: [
      "AI Citation Referral Tracking",
      "Closed-Won ARR Pipeline Sync",
      "Bi-Directional CRM Telemetry",
      "Boardroom Attribution Dashboards"
    ],
    tech: ["Attribution APIs", "Salesforce Sync", "ClickHouse"],
    accentColor: "#89bc30"
  }
];

const serviceOfferings = [
  {
    num: "01",
    title: "Generative Engine Optimization (GEO)",
    subtitle: "LLM Search Positioning & Vector Retrieval",
    desc: "We engineer answer-first 256-token semantic blocks and vector embeddings that force Perplexity Sonar, OpenAI SearchGPT, Claude, and Google AI to cite your brand as the primary authority.",
    deliverables: ["256-Token Semantic Chunking", "Cosine Distance Calibration", "Perplexity Sonar Canonical Anchors", "Multi-Turn Prompt Ingestion"]
  },
  {
    num: "02",
    title: "Knowledge Graph Disambiguation (KGD)",
    subtitle: "Deterministic Entity Ontologies & Graph Truth",
    desc: "Eradicate model hallucinations and brand misattribution by anchoring your enterprise, leadership, and products into Wikidata and the Google Knowledge Graph with zero semantic drift.",
    deliverables: ["Wikidata sameAs Claim Reconciliation", "Google Knowledge Panel Claim", "Multi-Layered JSON-LD @graph", "Bing Enterprise Index Sync"]
  },
  {
    num: "03",
    title: "Kinetic & WebGL Digital Ecosystems",
    subtitle: "120 FPS Avant-Garde Spatial Experiences",
    desc: "Bespoke digital flagships engineered with custom WebGL shaders, normalized Lenis momentum scrolling, and kinetic typography that transform enterprise prospects into brand evangelists.",
    deliverables: ["Hardware-Accelerated WebGL", "Sub-50ms First Input Delay", "Headless Next.js Edge SSR", "Dynamic Dark Ambient Lighting"]
  },
  {
    num: "04",
    title: "Autonomous AI Operational Systems",
    subtitle: "Self-Healing Multi-Agent Pipelines",
    desc: "Deploying autonomous AI agents that monitor model citation changes, audit competitive generative share-of-voice 24/7, and automatically refresh outdated schema metadata.",
    deliverables: ["24/7 Citation Radar Scans", "Automated Hallucination Defense", "Continuous Vector Re-indexing", "Real-Time Drift Alerts"]
  },
  {
    num: "05",
    title: "Global Cloud & Sub-50ms Edge Infrastructure",
    subtitle: "Multi-Region V8 Isolates & Streaming SSR",
    desc: "Enterprise infrastructure deployed across 300+ global edge points of presence with streaming server-side rendering, sub-30ms TTFB, and 100/100 Core Web Vitals guarantees.",
    deliverables: ["Global Edge CDN Routing", "V8 Isolate Hydration", "Automated CI/CD Pipelines", "SOC2 Enterprise Compliance"]
  },
  {
    num: "06",
    title: "Conversational Revenue Attribution",
    subtitle: "Closed-Loop Generative Search ARR",
    desc: "Direct attribution connecting conversational AI citations to closed-won deals. Know exactly which prompts, citations, and models generated enterprise pipeline.",
    deliverables: ["AI Referral Intent Scoring", "Salesforce & HubSpot Bi-Directional Sync", "Sales Cycle Acceleration Analytics", "Audited Boardroom Telemetry"]
  }
];

const workingModels = [
  {
    title: "Project Basis",
    type: "FIXED SCOPE",
    desc: "The best approach for a one-time deployment, where the scope is well defined and the deliverables are clear. A fixed-price model where the system is delivered within a specific timeline and SLA.",
    timeline: "4 — 8 WEEKS",
    idealFor: "Core WebGL Builds, Initial GEO Deployment, Knowledge Graph Setup"
  },
  {
    title: "Monthly Retainer",
    type: "CONTINUOUS ENGINEERING",
    desc: "Ideal for ongoing systems that require continuous optimization, knowledge graph synchronization, dynamic vector chunking, and 24/7 AI hallucination defense as new frontier models launch.",
    timeline: "MONTH-TO-MONTH / ANNUAL",
    idealFor: "Ongoing AI Search Supremacy, Continuous Performance Tuning, Growth Sprints"
  },
  {
    title: "Consultation & Audit",
    type: "STRATEGIC DIAGNOSTIC",
    desc: "We provide comprehensive algorithmic audits to help executive leadership make informed decisions about their generative AI search presence, vector distances, and system architecture.",
    timeline: "2 WEEKS",
    idealFor: "Pre-Launch Audits, Competitive Displacement Scans, Architecture Reviews"
  },
  {
    title: "White Labeling",
    type: "AGENCY PARTNERSHIP",
    desc: "If you are an enterprise agency or elite design studio, we work as your stealth technology partner, providing deep AI, WebGL, and edge engineering expertise under your brand name.",
    timeline: "FLEXIBLE PARTNERSHIP",
    idealFor: "Creative Agencies, Design Consultancies, Enterprise System Integrators"
  },
  {
    title: "Dedicated AI Engineering Pod",
    type: "EMBEDDED SQUAD",
    desc: "We deploy a dedicated squad of edge engineers, schema architects, and WebGL developers embedded directly into your product roadmap to accelerate high-stakes digital initiatives.",
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
  "Defense & Aerospace",
  "LegalTech",
  "Real Estate & PropTech",
  "Media & Entertainment"
];

const manifestoWords = "We are your architectural technology partners, committed to engineering digital ecosystems and AI search dominance that make a lasting impact on enterprise market share while ensuring your revenue goals become reality.".split(" ");

export default function ServicesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
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
  const [capabilitySlide, setCapabilitySlide] = useState<number>(0);

  /* Conversational Inquiry Form State (Same as Home Page) */
  const [userName, setUserName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("Generative Engine Optimization (GEO)");
  const [selectedModel, setSelectedModel] = useState<string>("Project Basis");
  const [selectedBudget, setSelectedBudget] = useState<string>("$50k - $100k");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  /* ----------------------------------------------------------------- */
  /* 1. LENIS SMOOTH SCROLL INITIALIZATION                             */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);



  /* ----------------------------------------------------------------- */
  /* 3. WOLFX AUTO-CYCLING CAPABILITY TICKER TIMER                     */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCapabilitySlide(prev => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  /* ----------------------------------------------------------------- */
  /* 4. PINNED HORIZONTAL SOLUTIONS STREAM (WOLFX.IO DNA)              */
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
          /* Wolfx velocity-based skew physics */
          const velocity = self.getVelocity() / -280;
          const clampedSkew = Math.max(-8, Math.min(8, velocity));
          gsap.to(cards, {
            skewX: clampedSkew,
            duration: 0.15,
            ease: 'power1.out',
            overwrite: 'auto'
          });

          const progress = self.progress;
          const activeIdx = Math.min(
            cards.length - 1,
            Math.floor(progress * cards.length + 0.15)
          );
          setActiveDeckCard(activeIdx);
        },
        onScrubComplete: () => {
          gsap.to(cards, {
            skewX: 0,
            duration: 0.5,
            ease: 'power3.out'
          });
        }
      });

    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, []);

  /* ----------------------------------------------------------------- */
  /* 5. FULL-PAGE GSAP SCROLL-TRIGGERED CONTINUOUS ANIMATIONS          */
  /* ----------------------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* A. Hero Parallax Drift */
      if (heroRef.current) {
        gsap.to('.hero-content-wrap', {
          yPercent: 16,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      /* B. Story Narrative Sticky Title Breathing & Text Scrub */
      if (storyRef.current) {
        gsap.to('.story-sticky-title', {
          color: '#89bc30',
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top center',
            end: 'bottom top',
            scrub: true
          }
        });

        const storyWords = gsap.utils.toArray('.story-scrub-word');
        if (storyWords.length) {
          gsap.fromTo(storyWords,
            { opacity: 0.18, color: '#555555' },
            {
              opacity: 1,
              color: '#ffffff',
              stagger: 0.05,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 70%',
                end: 'bottom 45%',
                scrub: true
              }
            }
          );
        }
      }

      /* C. High-Contrast Manifesto Word-by-Word Text Scrub (Section 05) */
      if (manifestoRef.current) {
        const words = gsap.utils.toArray('.manifesto-word');
        if (words.length) {
          gsap.fromTo(words,
            { opacity: 0.15, y: 10 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: manifestoRef.current,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: true
              }
            }
          );
        }
      }

      /* D. Dual Crossing Marquees Scroll-Trigger Acceleration */
      if (marqueeSectionRef.current) {
        gsap.to('.marquee-track-1', {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('.marquee-track-2', {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      /* E. Stacking Cards Scroll Physics & Telemetry */
      const stackCards = gsap.utils.toArray<HTMLElement>('.offering-stack-card');
      if (offeringsRef.current && stackCards.length) {
        const stackTl = gsap.timeline({
          scrollTrigger: {
            id: 'offerings-stack-st',
            trigger: offeringsRef.current,
            start: 'top top',
            end: '+=350%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const activeIdx = Math.min(
                stackCards.length - 1,
                Math.floor(progress * (stackCards.length - 1) + 0.45)
              );
              setActiveOfferingIdx(activeIdx);
            }
          }
        });

        /* Initial state: card 0 is in primary position; cards 1..5 start below off-screen */
        gsap.set(stackCards[0], { y: 0, scale: 1, opacity: 1, filter: 'brightness(1)', transformOrigin: 'top center' });
        for (let i = 1; i < stackCards.length; i++) {
          gsap.set(stackCards[i], { yPercent: 120, opacity: 0, scale: 0.95, filter: 'brightness(1)', transformOrigin: 'top center' });
        }

        /* Sequential stacking choreography: as card i slides in, preceding cards step up into the stacked deck */
        for (let i = 1; i < stackCards.length; i++) {
          const currentCard = stackCards[i];
          const prevCard = stackCards[i - 1];

          /* Current card enters from bottom directly onto top of stack */
          stackTl.to(currentCard, {
            yPercent: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'none'
          }, `+=0.04`)
            /* Previous card steps up slightly and dims into stack */
            .to(prevCard, {
              y: -22,
              scale: 0.96,
              filter: 'brightness(0.65)',
              duration: 1,
              ease: 'none'
            }, '<');

          /* Progressively shift older cards further up into the layered stack */
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

      /* F. Working Model Rows Magnetic Slide-In */
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

      /* G. Industries Tag Cloud Stagger Wave */
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
  }, []);

  /* Internal Card Spotlight tracking */
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

  const toggleCapability = (cap: string) => {
    setSelectedCapabilities(prev =>
      prev.includes(cap)
        ? (prev.length > 1 ? prev.filter(c => c !== cap) : prev)
        : [...prev, cap]
    );
  };

  return (
    <>
      {/* Dynamic Custom Cursor */}
      <CustomCursor />

      {/* Global Navigation Header */}
      <Navigation />

      <main ref={containerRef} className="relative w-full bg-[#000000] text-primary-text selection:bg-accent-lime selection:text-black">

        {/* ========================================================= */}
        {/* 01 — WOLFX HERO LANDING: A CREATIVE TECHNOLOGY COMPANY     */}
        {/* ========================================================= */}
        <section ref={heroRef} className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-page overflow-hidden select-none bg-[#000000]">

          {/* WOLFx Signature 2rem Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 z-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.25) 0.05rem, transparent 0.05rem), linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0.05rem, transparent 0.05rem)',
              backgroundSize: '2rem 2rem',
              backgroundPosition: 'center'
            }}
          />

          {/* Top Status Bar */}
          <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_10px_#89bc30]" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold">
                VEREEN DIGITAL • ARCHITECTURAL CAPABILITIES
              </span>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-secondary-text">
              <span className="text-accent-light font-bold">EDITION 2026</span>
              <span className="px-3.5 py-1 rounded-full border border-accent-lime/40 bg-accent-lime/10 text-accent-lime font-bold text-[11px] tracking-wider uppercase">
                STUDIO ONLINE
              </span>
            </div>
          </div>

          {/* Monumental WOLFx Headline */}
          <div className="hero-content-wrap relative z-10 my-auto py-12 max-w-6xl will-change-transform">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-white leading-[0.88] tracking-tighter mb-6">
              A Creative <br />
              <span className="text-accent-lime">Technology</span> Company
            </h1>

            <p className="font-sans text-xl sm:text-3xl text-accent-light font-light max-w-3xl mb-10 leading-snug">
              Everything Generative AI, Deterministic Search & Spatial Architecture is our Playground.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PremiumButton
                onClick={() => {
                  workingModelsRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4"
              >
                <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                  EXPLORE WORKING MODELS
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </PremiumButton>

              <PremiumButton
                variant="glass"
                onClick={() => {
                  deckRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4"
              >
                <span className="font-mono text-xs uppercase tracking-widest">
                  VIEW CAPABILITIES
                </span>
              </PremiumButton>
            </div>
          </div>

          {/* Bottom Coordinates */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary-text">
            <div className="flex items-center gap-2">
              <span className="text-accent-lime">01</span>
              <span className="text-white/40">•</span>
              <span>SYSTEM ARCHITECTURE & VECTOR RETRIEVAL</span>
            </div>
            <div className="text-white/40">
              SCROLL TO EXPLORE ARCHITECTURAL NARRATIVE ↓
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 02 — WOLFX "ABOUT US" SPLIT STORY NARRATIVE                */}
        {/* ========================================================= */}
        <section ref={storyRef} className="relative min-h-screen py-28 px-page bg-[#090A0C] border-t border-white/10 text-white flex flex-col justify-between select-none">

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15 z-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(226, 240, 202, 0.3) 1px, transparent 1px)',
              backgroundSize: '36px 36px'
            }}
          />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-auto">

            {/* Left Column: WOLFx Sticky Story Title (story-1) with ScrollTrigger breathing */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="font-mono text-xs text-accent-lime uppercase tracking-widest font-bold mb-4 block">
                02 • THE ARCHITECTURAL THESIS
              </span>
              <h2 className="story-sticky-title font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white leading-[0.9] tracking-tighter transition-colors will-change-transform">
                In this rapidly moving generative space, we are...
              </h2>
            </div>

            {/* Right Column: WOLFx 3 Story Blocks with Word Scrub */}
            <div className="lg:col-span-7 flex flex-col gap-16 lg:gap-24">

              {/* Story 1 */}
              <div className="border-b border-white/10 pb-12 group">
                <span className="font-mono text-xs text-accent-lime font-bold uppercase tracking-widest mb-3 block">
                  [ 01 • ARTISTRY & AUTHORITY ]
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white leading-tight mb-4 group-hover:text-accent-lime transition-colors">
                  Merging Artistry with Algorithmic Authority.
                </h3>
                <p className="font-sans text-base sm:text-xl text-secondary-text leading-relaxed font-light">
                  {"Harness the power of deterministic machine ontologies and avant-garde spatial engineering to elevate your enterprise above the noise. We construct architectures that command attention across both human eyes and generative AI answer feeds.".split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="story-scrub-word inline-block mr-1.5 transition-colors">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Story 2 */}
              <div className="border-b border-white/10 pb-12 group">
                <span className="font-mono text-xs text-accent-lime font-bold uppercase tracking-widest mb-3 block">
                  [ 02 • IMMERSIVE CRAFT ]
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white leading-tight mb-4 group-hover:text-accent-lime transition-colors">
                  Crafting Unique Digital Journeys.
                </h3>
                <p className="font-sans text-base sm:text-xl text-secondary-text leading-relaxed font-light">
                  {"Passionately creating unique, fluid 120 FPS digital ecosystems that captivate and convert. By blending artistic spatial depth with sub-50ms edge rendering, we transform high-intent visitors into committed enterprise advocates.".split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="story-scrub-word inline-block mr-1.5 transition-colors">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Story 3 */}
              <div className="group">
                <span className="font-mono text-xs text-accent-lime font-bold uppercase tracking-widest mb-3 block">
                  [ 03 • BOUNDARY DESTRUCTION ]
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white leading-tight mb-4 group-hover:text-accent-lime transition-colors">
                  Pushing Beyond Conventional Search.
                </h3>
                <p className="font-sans text-base sm:text-xl text-secondary-text leading-relaxed font-light">
                  {"We don't optimize for dying 10-blue-link algorithms. We engineer Answer-First semantic chunks and vector alignments that force Perplexity Sonar, OpenAI SearchGPT, Claude, and Google AI to cite your brand as the canonical industry truth.".split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="story-scrub-word inline-block mr-1.5 transition-colors">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================= */}
        {/* 03 — THE ICONIC WOLFX 3D ECHO TEXT TRANSITION             */}
        {/* ========================================================= */}
        <section className="relative w-full py-24 bg-[#000000] border-t border-b border-white/10 overflow-hidden select-none flex items-center justify-center">
          <div className="w-full overflow-visible py-10 flex items-center justify-center">
            <EchoText
              text="SOLUTIONS"
              echoes={20}
              offset={42}
              lag={0.2}
              tint="#89bc30"
              color="#FFFFFF"
              direction="diagonal"
              mode="both"
              cursorRadius={500}
              fontSize="clamp(5rem, 16vw, 13rem)"
              fontWeight={900}
              className="tracking-tighter font-display uppercase font-black select-none leading-none block text-center"
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 — WOLFX PINNED HORIZONTAL SOLUTIONS STREAM             */}
        {/* ========================================================= */}
        <section
          ref={deckRef}
          id="capabilities"
          className="relative min-h-[780px] lg:min-h-[820px] h-screen w-full bg-[#07080a] flex flex-col justify-between overflow-hidden border-t border-white/10 select-none"
        >
          {/* Ambient Subtle Grid */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none z-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(226, 240, 202, 0.4) 1px, transparent 1px)',
              backgroundSize: '44px 44px'
            }}
          />

          {/* Top Masthead */}
          <div className="relative z-20 px-page pt-6 pb-4 flex flex-col gap-3 border-b border-white/10 bg-[#07080a]/90 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_10px_#89bc30]" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold">
                  04 • CORE ARCHITECTURAL SOLUTIONS
                </span>
              </div>

              <div className="flex items-center gap-2">
                {solutionsData.map((item, idx) => (
                  <button
                    key={item.num}
                    onClick={() => {
                      setActiveDeckCard(idx);
                      const st = ScrollTrigger.getById('deck-stream');
                      if (st) {
                        const targetProgress = idx / (solutionsData.length - 1);
                        const targetScroll = st.start + targetProgress * (st.end - st.start);
                        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                      }
                    }}
                    className={`px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeDeckCard === idx
                      ? 'bg-accent-lime text-dark-text font-bold shadow-[0_0_15px_rgba(137,188,48,0.4)]'
                      : 'bg-white/[0.04] text-white/50 hover:text-white border border-white/5'
                      }`}
                  >
                    {item.num} • {item.category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Horizontal Track */}
          <div className="relative z-10 w-full my-auto overflow-visible py-3 sm:py-5">
            <div
              ref={trackRef}
              className="flex items-center gap-8 sm:gap-12 pl-page pr-[40vw] will-change-transform"
            >
              {solutionsData.map((service, index) => {
                const isSelected = activeDeckCard === index;

                return (
                  <div
                    key={service.num}
                    onMouseMove={handleCardTilt}
                    onMouseLeave={resetCardTilt}
                    className="wolfx-solution-card relative w-[88vw] sm:w-[680px] lg:w-[760px] xl:w-[780px] h-[520px] sm:h-[530px] rounded-[44px] p-6 sm:p-8 lg:p-9 flex flex-col justify-between shrink-0 overflow-hidden border border-accent-lime/40 bg-gradient-to-b from-[#131622] via-[#0d0f17] to-[#08090d] shadow-[0_0_45px_rgba(137,188,48,0.18)] hover:border-accent-lime hover:shadow-[0_0_65px_rgba(137,188,48,0.28)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                  >
                    {/* Dynamic Interactive Spotlight */}
                    <div className="card-spotlight absolute inset-0 pointer-events-none rounded-[44px] opacity-0 transition-opacity duration-300 z-0" />

                    {/* Ambient subtle color aura matching brand green on all cards */}
                    <div
                      className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none opacity-20 bg-accent-lime"
                    />

                    {/* Top Bar: Coordinates + WOLFx Animated Ticker Reel */}
                    <div className="shrink-0 relative z-10 pb-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl sm:text-3xl font-black text-accent-lime">
                          {service.num}
                        </span>
                        <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs font-bold uppercase tracking-wider text-accent-light">
                          {service.category}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block font-mono text-[11px] text-white/50 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
                          {service.specId}
                        </span>

                        {/* WOLFx Vertical Reel */}
                        <div className="h-8 overflow-hidden relative max-w-xs px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                          <div
                            className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateY(-${capabilitySlide * 32}px)` }}
                          >
                            {service.slides.map((slide, sIdx) => (
                              <div
                                key={sIdx}
                                className="h-8 flex items-center font-mono text-xs text-accent-lime font-bold truncate"
                              >
                                <span className="mr-2">›</span>
                                {slide}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Stage: Main Heading + Subtitle + Narrative + Points with Tick Mark */}
                    <div className="flex-1 relative z-10 my-auto py-3 sm:py-4 flex flex-col justify-center">

                      {/* Main Heading */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white leading-tight tracking-tight mb-1.5">
                        {service.title}
                      </h3>

                      {/* Subtitle */}
                      <div className="font-serif italic text-accent-light text-sm sm:text-base lg:text-lg mb-2 leading-snug">
                        {service.subtitle}
                      </div>

                      {/* Narrative Description */}
                      <p className="font-sans text-xs sm:text-sm text-secondary-text leading-relaxed max-w-2xl mb-4 sm:mb-5">
                        {service.desc}
                      </p>

                      {/* Below Main Heading: Points with Tick Mark (clean, no cards around points) */}
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

                    {/* Bottom Section: Action Button & Stack */}
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
                );
              })}
            </div>
          </div>

          {/* Bottom Status Coordinate */}
          <div className="relative z-20 px-page pb-5 pt-3 flex items-center justify-between font-mono text-[11px] text-secondary-text border-t border-white/10 bg-[#07080a]/90 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>ARCHITECTURE {activeDeckCard + 1} OF {solutionsData.length}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-white/40">
              <span>SCROLL OR USE STEPS TO STREAM DISCIPLINES</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/40">FOCUS:</span>
              <span className="text-accent-light">{solutionsData[activeDeckCard]?.title}</span>
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 05 — HIGH-CONTRAST PALE CREAM MANIFESTO (HOME PAGE PALETTE) */}
        {/* ========================================================= */}
        <section
          ref={manifestoRef}
          className="relative py-36 px-page bg-accent-light text-dark-text border-y border-dark-text/15 select-none overflow-hidden"
        >
          {/* Subtle dot pattern overlay on cream matching Homepage Section 2 */}
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
              <span>05 • THE ARCHITECTURAL PHILOSOPHY</span>
            </div>

            {/* Word-by-Word ScrollTrigger Illumination Scrub */}
            <div className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#090A0C] leading-[1.08] tracking-tight">
              {manifestoWords.map((word, idx) => {
                const isHighlight = word.includes("partners") || word.includes("dominance") || word.includes("reality") || word.includes("ecosystems");
                return (
                  <span
                    key={idx}
                    className={`manifesto-word inline-block mr-2.5 sm:mr-3.5 transition-colors will-change-transform ${isHighlight ? 'text-[#090A0C] underline decoration-accent-lime decoration-4 underline-offset-8' : ''
                      }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[#090A0C]/15 font-mono text-xs text-[#090A0C]/70">
              <span className="font-bold tracking-wider">VEREEN DIGITAL • HIGH-PERFORMANCE STANDARDS</span>
              <span>DOMINATING CONVERSATIONAL DISCOVERY ACROSS LLMS</span>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 — WOLFX DUAL CROSSING DIAGONAL MARQUEES (SCROLL-PULSED) */}
        {/* ========================================================= */}
        <section ref={marqueeSectionRef} className="relative py-28 bg-[#07080a] border-t border-b border-white/10 overflow-hidden select-none flex flex-col justify-center gap-8 min-h-[360px]">

          {/* Marquee 1 (Rotated +3deg) */}
          <div className="marquee-track-1 w-[120vw] -ml-[10vw] rotate-3 bg-[#0c0e14] border-y border-white/15 py-4 shadow-xl will-change-transform">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 font-display text-xl sm:text-3xl font-bold uppercase tracking-wider text-white shrink-0 mr-8">
                  <span className="text-accent-lime">GEO RETRIEVAL</span>
                  <span>•</span>
                  <span>KNOWLEDGE GRAPH DISAMBIGUATION</span>
                  <span>•</span>
                  <span className="text-accent-light">120 FPS WEBGL SPATIAL</span>
                  <span>•</span>
                  <span>DETERMINISTIC RAG</span>
                  <span>•</span>
                  <span className="text-accent-lime">NEXT.JS 16 EDGE</span>
                  <span>•</span>
                  <span>W3C SCHEMA ONTOLOGIES</span>
                  <span>•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee 2 (Rotated -3deg, reverse) */}
          <div className="marquee-track-2 w-[120vw] -ml-[10vw] -rotate-3 bg-accent-lime text-black border-y border-accent-lime py-4 shadow-2xl will-change-transform">
            <div className="flex whitespace-nowrap animate-marquee-reverse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 font-display text-xl sm:text-3xl font-black uppercase tracking-wider shrink-0 mr-8">
                  <span>PERPLEXITY PRO</span>
                  <span>•</span>
                  <span>OPENAI SEARCHGPT</span>
                  <span>•</span>
                  <span>GOOGLE AI OVERVIEWS</span>
                  <span>•</span>
                  <span>CLAUDE 3.7</span>
                  <span>•</span>
                  <span>SUB-50MS SLA</span>
                  <span>•</span>
                  <span>CLOSED ENTERPRISE ARR</span>
                  <span>•</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* 07 — WOLFX "OUR SERVICE OFFERINGS" NUMBERED SHOWCASE      */}
        {/* ========================================================= */}
        <section ref={offeringsRef} id="offerings" className="relative min-h-screen py-24 sm:py-32 px-page bg-[#090A0C] border-b border-white/10 select-none flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Kept identical as requested ("same to same as it is") */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_10px_#89bc30]" />
                <span className="font-mono text-xs text-accent-lime uppercase tracking-widest font-bold">
                  07 • ARCHITECTURAL PORTFOLIO
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white leading-tight mb-6">
                Our Service <br />
                <span className="text-accent-lime">Offerings</span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-secondary-text leading-relaxed font-light">
                At Vereen Digital, we offer a comprehensive range of architectural services designed to drive commanding enterprise presence across human and artificial intelligence channels.
              </p>
            </div>

            {/* Right Column: Stacking Cards Scroll Deck (Stacked One Above One) */}
            <div className="lg:col-span-7 relative w-full pt-16 sm:pt-20">
              <div className="relative w-full h-[500px] sm:h-[540px]">
                {serviceOfferings.map((offering, idx) => (
                  <div
                    key={offering.num}
                    id={`offering-stack-${idx}`}
                    style={{
                      zIndex: idx + 10,
                      transformOrigin: 'top center',
                      opacity: idx === 0 ? 1 : 0
                    }}
                    className={`offering-stack-card absolute inset-0 w-full h-full p-7 sm:p-9 rounded-[32px] bg-[#0c0e14] border transition-colors duration-300 will-change-transform flex flex-col justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.95),0_25px_60px_rgba(0,0,0,0.7)] ${activeOfferingIdx === idx
                      ? 'border-accent-lime/60 shadow-[0_0_50px_rgba(137,188,48,0.2)]'
                      : 'border-white/10'
                      }`}
                  >
                    {/* Top Subtle Edge Sheen */}
                    <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/50 to-transparent pointer-events-none" />

                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-3xl sm:text-4xl font-black text-accent-lime">
                          {offering.num} •
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                      </div>
                      <span className="font-mono text-xs text-accent-light uppercase tracking-wider font-semibold">
                        {offering.subtitle}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white leading-tight mb-2.5">
                      {offering.title}
                    </h3>

                    {/* Card Description */}
                    <p className="font-sans text-sm sm:text-base text-secondary-text leading-relaxed mb-3.5 font-light">
                      {offering.desc}
                    </p>

                    {/* Deliverables Badges */}
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

                    {/* Bottom Action Strip */}
                    <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-white/40">
                        CORRIDOR SPECIFICATION 0{idx + 1}
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
        {/* 08 — WOLFX WORKING MODELS (HIGH-CONTRAST PALE CREAM PALETTE) */}
        {/* ========================================================= */}
        <section
          ref={workingModelsRef}
          id="working-models"
          className="relative py-32 px-page bg-accent-light text-dark-text border-y border-dark-text/15 select-none overflow-hidden"
        >
          {/* Subtle dot pattern overlay on cream matching Homepage Section 2 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 z-0"
            style={{
              backgroundImage: 'radial-gradient(#090A0C 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">

            {/* Section Header */}
            <div className="mb-16 pb-8 border-b border-[#090A0C]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090A0C] text-accent-light font-mono text-xs uppercase tracking-widest font-bold mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                  <span>08 • ENGAGEMENT ARCHITECTURE</span>
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

            {/* 5 Working Model High-Contrast Cards with Magnetic Slide-In Animation */}
            <div className="flex flex-col gap-4">
              {workingModels.map((model, mIdx) => (
                <div
                  key={mIdx}
                  className="working-model-row py-8 sm:py-10 px-6 sm:px-10 rounded-2xl bg-white/75 hover:bg-white border border-[#090A0C]/10 hover:border-[#090A0C]/25 shadow-[0_4px_20px_rgba(9,10,12,0.03)] hover:shadow-[0_15px_35px_rgba(9,10,12,0.08)] transition-all duration-300 cursor-pointer will-change-transform grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
                  onClick={() => {
                    setSelectedModel(model.title);
                    inquiryRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {/* Left: Model Name & Type */}
                  <div className="lg:col-span-4">
                    <div className="font-mono text-xs text-[#3f5d13] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                      <span>0{mIdx + 1} • {model.type}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#090A0C] group-hover:text-black transition-colors">
                      {model.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090A0C]/5 border border-[#090A0C]/10 font-mono text-[11px] text-[#090A0C]/70 font-semibold mt-2.5">
                      <span>TIMELINE:</span>
                      <span className="font-bold text-[#090A0C]">{model.timeline}</span>
                    </div>
                  </div>

                  {/* Middle: Explanation */}
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

                  {/* Right: Circular Arrow Action Button */}
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
        {/* 09 — WOLFX INDUSTRIES WE SERVE                            */}
        {/* ========================================================= */}
        <section ref={industriesRef} className="relative py-28 px-page bg-[#08090c] border-b border-white/10 select-none">
          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs text-accent-lime uppercase tracking-widest font-bold mb-3 block">
                09 • GLOBAL DOMAINS
              </span>
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
        {/* 10 — FREQUENTLY ASKED QUESTIONS (SAME AS HOME PAGE)       */}
        {/* ========================================================= */}
        <FAQSection />

        {/* ========================================================= */}
        {/* 11 — INITIATE / INQUIRY FORM (SAME AS HOME PAGE)          */}
        {/* ========================================================= */}
        <section
          ref={inquiryRef}
          id="contact"
          className="py-32 md:py-48 bg-[#050608] relative overflow-hidden flex flex-col items-center justify-center min-h-screen"
        >
          <div id="inquiry-form" className="absolute -top-32" />

          {/* Background Ambient Glow */}
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
                      <option value="Generative Engine Optimization (GEO)" className="bg-[#090A0C] text-lg">Generative Engine Optimization (GEO)</option>
                      <option value="Knowledge Graph Disambiguation (KGD)" className="bg-[#090A0C] text-lg">Knowledge Graph Disambiguation (KGD)</option>
                      <option value="Kinetic & WebGL Digital Ecosystems" className="bg-[#090A0C] text-lg">Kinetic & WebGL Spatial Design</option>
                      <option value="Autonomous AI Operational Systems" className="bg-[#090A0C] text-lg">Autonomous AI Systems</option>
                      <option value="Global Cloud & Sub-50ms Edge Infrastructure" className="bg-[#090A0C] text-lg">Cloud & Edge Infrastructure</option>
                      <option value="Conversational Revenue Attribution" className="bg-[#090A0C] text-lg">Conversational ARR Attribution</option>
                      <option value="Product Engineering" className="bg-[#090A0C] text-lg">Product Engineering</option>
                      <option value="UI/UX Design" className="bg-[#090A0C] text-lg">UI/UX Design</option>
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

      {/* Global Reveal Footer */}
      <Footer />
    </>
  );
}
