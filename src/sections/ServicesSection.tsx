import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layout, Cpu, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Engineering',
    desc: 'End-to-end development of scalable, high-performance web applications and digital platforms using modern tech stacks.',
    capabilities: ['React / Next.js', 'Node.js / Python', 'System Architecture'],
    color: '#89bc30',
    icon: <Code size={40} />
  },
  {
    id: '02',
    title: 'UI/UX Design',
    desc: 'Creating intuitive, engaging, and beautiful digital experiences that align with user needs and business goals.',
    capabilities: ['User Research', 'Design Systems', 'Interaction Design'],
    color: '#89bc30',
    icon: <Layout size={40} />
  },
  {
    id: '03',
    title: 'Workflow AI',
    desc: 'Integrating artificial intelligence and intelligent automation to streamline operations and unlock new capabilities.',
    capabilities: ['LLM Integration', 'Custom AI Agents', 'Process Automation'],
    color: '#89bc30',
    icon: <Cpu size={40} />
  },
  {
    id: '04',
    title: 'Cloud Infra',
    desc: 'Designing and managing robust, secure, and scalable cloud architectures on AWS, GCP, or Azure.',
    capabilities: ['DevOps', 'CI/CD Pipelines', 'Serverless'],
    color: '#89bc30',
    icon: <Cloud size={40} />
  }
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 sections
          scrub: 1,
          pin: true,
        }
      });

      const listItems = gsap.utils.toArray('.service-title');
      const details = gsap.utils.toArray('.service-detail');
      
      // Initialize states
      gsap.set(rightListRef.current, { y: "-10vh" }); // Centers the first 20vh item
      gsap.set(details, { opacity: 0, y: 50 });
      gsap.set(details[0], { opacity: 1, y: 0 });
      gsap.set(listItems, { color: 'rgba(137, 188, 48, 0.3)' }); // Faded brand green for inactive text
      gsap.set(listItems[0], { color: '#89bc30' });

      // Animate through each service
      services.forEach((_, i) => {
        if (i === 0) return; // First is already active

        // Animate out previous
        tl.to(details[i - 1], { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" })
          .to(listItems[i - 1], { color: 'rgba(137, 188, 48, 0.3)', duration: 0.5 }, "<");

        // Move the list up to center the i-th item
        tl.to(rightListRef.current, { y: `-${10 + i * 20}vh`, duration: 1, ease: "power2.inOut" }, "<");

        // Animate in current
        tl.fromTo(details[i], 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        )
        .to(listItems[i], { color: '#89bc30', duration: 0.5 }, "<");
        
        // Add a small pause/hold at the end of each section for smooth reading
        tl.to({}, { duration: 0.5 });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative h-screen w-full bg-accent-light overflow-hidden flex flex-col md:flex-row border-t border-[#090A0C]/10">
      
      <h2 className="absolute top-10 left-page font-mono text-sm font-bold uppercase tracking-widest text-[#090A0C]/40 z-30">03 — Capabilities</h2>

      {/* Left Side: Massive Scrolling Typography (Visible on md+) */}
      <div className="hidden md:block w-1/2 h-full relative z-10 pointer-events-none overflow-hidden">
        
        {/* Soft fading gradients to create a 'wheel' mask effect over light bg */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent-light to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-accent-light to-transparent z-10" />
        
        <div className="absolute top-[50vh] left-0 w-full" ref={rightListRef}>
          {services.map((service, i) => (
            <div 
              key={i} 
              className="service-title h-[20vh] flex items-center font-display text-[6vw] font-bold uppercase leading-[0.8] tracking-tighter whitespace-nowrap pl-page"
              style={{ color: 'rgba(137, 188, 48, 0.3)' }}
            >
              {service.title}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Side: Details & Data */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-page relative z-20">
        <div className="relative w-full max-w-md h-[60vh]">
          {services.map((service, i) => (
            <div key={i} className="service-detail absolute inset-0 flex flex-col justify-center">
              {/* Premium Icon Presentation */}
              <div className="relative mb-10 inline-flex items-center">
                <div 
                  className="absolute inset-0 blur-[20px] opacity-20 rounded-full scale-150"
                  style={{ backgroundColor: service.color }}
                />
                <div className="relative z-10" style={{ color: service.color }}>
                  {React.cloneElement(service.icon as React.ReactElement, { size: 56, strokeWidth: 1.5 })}
                </div>
              </div>
              
              <p className="font-mono text-sm tracking-widest mb-4 font-bold" style={{ color: service.color }}>{service.id} // {service.title}</p>
              <h3 className="font-display text-5xl font-bold text-[#090A0C] mb-6 leading-none tracking-tight">{service.title}</h3>
              <p className="text-[#090A0C]/70 text-lg leading-relaxed mb-10 font-sans">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                {service.capabilities.map((cap, capIndex) => (
                  <span key={capIndex} className="px-4 py-2 bg-[#090A0C]/5 border border-[#090A0C]/10 rounded-full text-xs font-mono text-[#090A0C] tracking-wide font-bold">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default ServicesSection;
