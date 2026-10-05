"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: 'What types of projects do you work on?', a: 'We specialize in complex web applications, digital platforms, enterprise SaaS products, and comprehensive digital transformations. We focus on projects where engineering excellence and premium design are critical requirements.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on complexity. A typical MVP or v1 product takes 3-4 months, while enterprise digital transformations can span 6-12 months. We provide clear timeline estimates during the discovery phase.' },
  { q: 'Can you work with an existing development team?', a: 'Yes. We frequently embed with client teams, operating as a specialized unit to accelerate development, introduce new technologies, or handle specific product verticals while integrating seamlessly with your workflows.' },
  { q: 'How do you determine project pricing?', a: 'We offer engagement models based on project scope. For well-defined scopes, we provide fixed-price proposals. For ongoing product development, we offer dedicated team retainers. We focus on delivering outsized value rather than competing on lowest cost.' },
  { q: 'Do you offer ongoing maintenance and support?', a: 'Absolutely. We believe software is a living system. We offer SLA-backed support and maintenance retainers to ensure your product remains secure, performant, and aligned with user needs post-launch.' }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-accent-light text-[#090A0C]">
      <div className="px-page max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-none tracking-tight sticky top-32 text-[#090A0C]">
              Questions <br />Worth <br /><span className="text-accent-lime">Asking.</span>
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-[#090A0C]/20">
              {faqs.map((faq, i) => (
                <div key={i} className={`border-b border-[#090A0C]/20 transition-all duration-500 ${openIndex === i ? 'bg-accent-lime px-8 rounded-2xl my-4 shadow-[0_10px_40px_rgba(137,188,48,0.4)] border-transparent' : 'py-2'}`}>
                  <button
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <h3 className={`font-display text-xl md:text-2xl font-bold pr-8 text-[#090A0C]`}>{faq.q}</h3>
                    <div className={`flex-shrink-0 transition-transform duration-300 text-[#090A0C] ${openIndex === i ? 'rotate-180' : ''}`}>
                      {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-[#090A0C]/80 text-lg leading-relaxed pr-12 font-sans font-medium">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
