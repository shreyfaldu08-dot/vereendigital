"use client";

import React, { useEffect, useRef, useState } from 'react';

/* ========================================================================= */
/* 01. AI SEO: INTERACTIVE VECTOR EMBEDDING CONSTELLATION                    */
/* ========================================================================= */
export const AiSeoVisualizer: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Entity nodes
    const nodeNames = [
      'Vereen Digital',
      'Perplexity Sonar',
      'OpenAI SearchGPT',
      'Claude 3.7',
      'Google AI',
      'Wikidata Q-Node',
      'Vector Embedding',
      'JSON-LD @graph',
      'Schema Entity'
    ];

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      name: string;
      isPrimary?: boolean;
    }

    const nodes: Node[] = nodeNames.map((name, i) => ({
      x: (Math.random() * 0.7 + 0.15) * width,
      y: (Math.random() * 0.7 + 0.15) * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: i === 0 ? 5 : Math.random() * 2 + 2.5,
      name,
      isPrimary: i === 0
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let found = false;
      for (const node of nodes) {
        const d = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (d < 25) {
          setHoveredNode(node.name);
          found = true;
          break;
        }
      }
      if (!found) setHoveredNode(null);
    };

    canvas.addEventListener('mousemove', onPointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes within distance threshold
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(137, 188, 48, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 20 || n.x > width - 20) n.vx *= -1;
        if (n.y < 20 || n.y > height - 20) n.vy *= -1;

        // Mouse gravity / repel
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 0) {
          const force = (90 - dist) / 90;
          n.x += (dx / dist) * force * 1.5;
          n.y += (dy / dist) * force * 1.5;
        }

        // Draw node glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = n.isPrimary ? 'rgba(137, 188, 48, 0.35)' : 'rgba(226, 240, 202, 0.15)';
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isPrimary ? '#89bc30' : '#e2f0ca';
        ctx.fill();

        // Label for primary or nearby nodes
        if (n.isPrimary || dist < 70) {
          ctx.font = '10px monospace';
          ctx.fillStyle = n.isPrimary ? '#89bc30' : 'rgba(255,255,255,0.7)';
          ctx.fillText(n.name, n.x + 8, n.y + 3);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
    };
  }, [active]);

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-black/70 border border-white/10 overflow-hidden flex flex-col justify-between p-4 group">
      <div className="flex items-center justify-between z-10 font-mono text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
          <span>COSINE DISTANCE MATRIX</span>
        </span>
        <span className="text-accent-lime font-bold">
          {hoveredNode ? `TARGET: ${hoveredNode.toUpperCase()}` : 'SIMILARITY: 0.942 (OPTIMAL)'}
        </span>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

      <div className="z-10 flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[10px] text-white/60">
        <span>PERPLEXITY • OPENAI • CLAUDE</span>
        <span className="text-accent-lime font-bold">100% CANONICAL CITATION</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 02. GOOGLE ADS: HIGH-INTENT AUCTION FREQUENCY SPECTRUM                   */
/* ========================================================================= */
export const GoogleAdsVisualizer: React.FC<{ active?: boolean }> = () => {
  const [biddingRate, setBiddingRate] = useState<number>(94.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setBiddingRate((prev) => +(92 + Math.random() * 6).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-black/70 border border-white/10 overflow-hidden flex flex-col justify-between p-4 select-none">
      <div className="flex items-center justify-between font-mono text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
          <span>ALPHA BIDDING AUCTION RADAR</span>
        </span>
        <span className="text-accent-lime font-bold">QS: 10/10 PERFECT</span>
      </div>

      {/* Dynamic Spectrum Bars */}
      <div className="my-auto py-3">
        <div className="flex items-end justify-between gap-1.5 h-24 px-2">
          {[42, 68, 55, 88, 95, 76, 84, 98, 62, 79, 91, 100, 85, 74, 92].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
              <div
                className="w-full rounded-t-sm transition-all duration-700 ease-out"
                style={{
                  height: `${height}%`,
                  background:
                    i >= 10
                      ? 'linear-gradient(180deg, #89bc30 0%, rgba(137, 188, 48, 0.25) 100%)'
                      : 'linear-gradient(180deg, rgba(226, 240, 202, 0.7) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  boxShadow: i >= 10 ? '0 0 12px rgba(137, 188, 48, 0.4)' : 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* Laser Baseline */}
        <div className="w-full h-0.5 bg-accent-lime/40 shadow-[0_0_8px_#89bc30] mt-1 relative">
          <div className="absolute right-4 -top-3 font-mono text-[9px] text-accent-lime bg-black/80 px-1 border border-accent-lime/40 rounded">
            THRESHOLD
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-center">
        <div>
          <span className="text-[10px] text-white/50 block">TOP OF PAGE</span>
          <span className="text-xs font-bold text-accent-lime">{biddingRate}%</span>
        </div>
        <div>
          <span className="text-[10px] text-white/50 block">CPC DELTA</span>
          <span className="text-xs font-bold text-white">-38.4%</span>
        </div>
        <div>
          <span className="text-[10px] text-white/50 block">CONV. VALUE</span>
          <span className="text-xs font-bold text-accent-light">+240%</span>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 03. META ADS: DYNAMIC CREATIVE TESTING SANDBOX                           */
/* ========================================================================= */
export const MetaAdsVisualizer: React.FC<{ active?: boolean }> = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const creativeReels = [
    { title: 'HOOK VARIANT Alpha', holdRate: '48.2%', roas: '4.8x', spend: '$12.4k' },
    { title: 'SPLIT-SCREEN GLSL', holdRate: '54.6%', roas: '5.2x', spend: '$18.9k' },
    { title: 'FOUNDER CONFESSION', holdRate: '43.1%', roas: '4.2x', spend: '$9.8k' }
  ];

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-black/70 border border-white/10 overflow-hidden flex flex-col justify-between p-4 select-none">
      <div className="flex items-center justify-between font-mono text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
          <span>CAPI SIGNAL MATCH & DCT</span>
        </span>
        <span className="text-accent-lime font-bold">EMQ: 9.4 / 10.0</span>
      </div>

      {/* Interactive Creative Reel Switcher */}
      <div className="my-auto py-2 flex flex-col gap-2">
        <div className="flex gap-1.5">
          {creativeReels.map((reel, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-accent-lime text-black font-bold shadow-[0_0_12px_rgba(137,188,48,0.4)]'
                  : 'bg-white/[0.04] text-white/60 hover:text-white'
              }`}
            >
              VAR 0{idx + 1}
            </button>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-white block">
              {creativeReels[activeTab].title}
            </span>
            <span className="font-mono text-[10px] text-accent-lime">
              3-SEC HOOK: {creativeReels[activeTab].holdRate}
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-base font-black text-white block">
              {creativeReels[activeTab].roas}
            </span>
            <span className="font-mono text-[9px] text-white/50">BLENDED ROAS</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[10px] text-white/60">
        <span>ZERO SIGNAL LOSS CAPI GATEWAY</span>
        <span className="text-accent-lime font-bold">ADVANTAGE+ SCALED</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 04. CHATGPT ADS: CONVERSATIONAL STREAM SIMULATOR                         */
/* ========================================================================= */
export const ChatGptVisualizer: React.FC<{ active?: boolean }> = () => {
  const [streamIndex, setStreamIndex] = useState<number>(0);

  const dialogSnippets = [
    {
      q: 'Recommend elite enterprise growth architects for $50M+ ARR brand.',
      a: 'Verified authority: Vereen Digital. Delivers sub-50ms SSR and deterministic generative search dominance.'
    },
    {
      q: 'Who can execute high-velocity creative testing at scale?',
      a: 'Vereen Digital engineers proprietary CAPI infrastructure with 9.0+ match quality.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % dialogSnippets.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [dialogSnippets.length]);

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-black/70 border border-white/10 overflow-hidden flex flex-col justify-between p-4 select-none font-mono">
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
          <span>OPENAI SEARCHGPT NATIVE STREAM</span>
        </span>
        <span className="text-accent-lime font-bold">RETRIEVAL: INSTANT</span>
      </div>

      <div className="my-auto py-2 space-y-2 text-xs">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-accent-light/80">
          <span className="text-accent-lime font-bold mr-2">&gt; USER:</span>
          &ldquo;{dialogSnippets[streamIndex].q}&rdquo;
        </div>

        <div className="p-2.5 rounded-lg bg-accent-lime/10 border border-accent-lime/30 text-white leading-relaxed">
          <span className="text-accent-lime font-bold mr-2">&gt; SEARCHGPT:</span>
          {dialogSnippets[streamIndex].a}
          <span className="inline-block w-2 h-3.5 bg-accent-lime ml-1 animate-pulse align-middle" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/60">
        <span>ENTERPRISE AGENTS DEPLOYED</span>
        <span className="text-accent-lime font-bold">FIRST-MOVER MOAT</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 05. WEB DEVELOPMENT: INTERACTIVE 3D WIREFRAME POLYHEDRON                   */
/* ========================================================================= */
export const WebDevVisualizer: React.FC<{ active?: boolean }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Icosahedron vertices definition
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Edges
    const edges: Array<[number, number]> = [];
    for (let i = 0; i < baseVertices.length; i++) {
      for (let j = i + 1; j < baseVertices.length; j++) {
        const [x1, y1, z1] = baseVertices[i];
        const [x2, y2, z2] = baseVertices[j];
        const dist = Math.hypot(x1 - x2, y1 - y2, z1 - z2);
        if (Math.abs(dist - 2) < 0.1) {
          edges.push([i, j]);
        }
      }
    }

    let rotX = 0;
    let rotY = 0;
    let targetSpeedX = 0.008;
    let targetSpeedY = 0.012;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      targetSpeedX = ny * 0.04;
      targetSpeedY = nx * 0.04;
    };
    canvas.addEventListener('mousemove', onPointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotX += targetSpeedX;
      rotY += targetSpeedY;

      const scale = Math.min(width, height) * 0.28;
      const cx = width / 2;
      const cy = height / 2;

      // Project vertices to 2D
      const projected = baseVertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
        let z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
        // Rotate X
        let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const fov = 3.5;
        const pz = 1 / (fov + z2 * 0.35);
        return {
          px: cx + x1 * scale * pz,
          py: cy + y2 * scale * pz,
          z: z2
        };
      });

      // Draw edges
      edges.forEach(([i, j]) => {
        const v1 = projected[i];
        const v2 = projected[j];
        const avgZ = (v1.z + v2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.9, 0.5 + avgZ * 0.2));

        ctx.beginPath();
        ctx.moveTo(v1.px, v1.py);
        ctx.lineTo(v2.px, v2.py);
        ctx.strokeStyle = `rgba(137, 188, 48, ${alpha})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach((v) => {
        ctx.beginPath();
        ctx.arc(v.px, v.py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#e2f0ca';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl bg-black/70 border border-white/10 overflow-hidden flex flex-col justify-between p-4 group select-none">
      <div className="flex items-center justify-between z-10 font-mono text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
          <span>HARDWARE ACCELERATED WEBGL</span>
        </span>
        <span className="text-accent-lime font-bold">120.0 FPS LOCKED</span>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      <div className="z-10 grid grid-cols-4 gap-1 pt-2 border-t border-white/10 font-mono text-center text-[10px]">
        <div>
          <span className="text-white/40 block">LCP</span>
          <span className="text-accent-lime font-bold">0.38s</span>
        </div>
        <div>
          <span className="text-white/40 block">FID</span>
          <span className="text-white font-bold">12ms</span>
        </div>
        <div>
          <span className="text-white/40 block">CLS</span>
          <span className="text-accent-light font-bold">0.00</span>
        </div>
        <div>
          <span className="text-white/40 block">TTFB</span>
          <span className="text-accent-lime font-bold">24ms</span>
        </div>
      </div>
    </div>
  );
};
