import React, { useState } from 'react';
import { PremiumButton } from '../components/PremiumButton';

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <section id="contact" className="py-32 md:py-48 bg-[#050608] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-accent-lime/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="px-page w-full max-w-[90rem] mx-auto relative z-10">
        
        <div className="mb-20">
          <h2 className="font-mono text-sm tracking-widest text-accent-lime mb-4 font-bold uppercase text-center">08 — Initiate</h2>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center space-y-10 py-32 animate-in fade-in duration-1000">
            <div className="w-32 h-32 bg-accent-lime rounded-full flex items-center justify-center mb-4 shadow-[0_0_100px_rgba(137, 188, 48,0.5)]">
              <svg className="w-16 h-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight">Transmission Received.</h3>
            <p className="text-secondary-text text-2xl md:text-3xl max-w-2xl mx-auto font-serif italic">
              Our team has been notified. We will review your inquiry and initiate contact within 24 hours.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="mt-12 px-10 py-4 border border-accent-light/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-mono uppercase tracking-widest text-sm">
              Send Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <h3 className="font-display text-[7vw] md:text-[5vw] lg:text-[4vw] font-bold text-accent-light/40 leading-[1.4] md:leading-[1.6] tracking-tight">
              Hello, my name is <br className="md:hidden" />
              <input required type="text" placeholder="Your Name" className="inline-block bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[200px] md:w-[350px] lg:w-[400px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all placeholder:text-accent-light/10 mx-2 md:mx-6 pb-2" /> 
              <br className="hidden lg:block" />and I represent <br className="md:hidden" />
              <input required type="text" placeholder="Company" className="inline-block bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[200px] md:w-[350px] lg:w-[400px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all placeholder:text-accent-light/10 mx-2 md:mx-6 pb-2" />. 
              <br className="hidden lg:block" />We are looking for a world-class team to help us with <br className="md:hidden" />
              <div className="inline-block relative mx-2 md:mx-6">
                <select className="appearance-none bg-transparent border-b-2 border-accent-light/20 text-accent-lime outline-none w-[280px] md:w-[450px] lg:w-[500px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all pb-2 cursor-pointer relative z-10">
                  <option value="engineering" className="bg-[#090A0C] text-lg">Product Engineering</option>
                  <option value="design" className="bg-[#090A0C] text-lg">UI/UX Design</option>
                  <option value="ai" className="bg-[#090A0C] text-lg">Workflow AI</option>
                  <option value="cloud" className="bg-[#090A0C] text-lg">Cloud Infrastructure</option>
                </select>
              </div>. 
              <br className="hidden lg:block" />We have a budget of roughly <br className="md:hidden" />
              <div className="inline-block relative mx-2 md:mx-6">
                <select className="appearance-none bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[220px] md:w-[350px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all pb-2 cursor-pointer relative z-10">
                  <option value="50k" className="bg-[#090A0C] text-lg">$50k - $100k</option>
                  <option value="100k" className="bg-[#090A0C] text-lg">$100k - $250k</option>
                  <option value="250k+" className="bg-[#090A0C] text-lg">$250k+</option>
                </select>
              </div>. 
              <br className="hidden lg:block" />You can reach me at <br className="md:hidden" />
              <input required type="email" placeholder="Email Address" className="inline-block bg-transparent border-b-2 border-accent-light/20 text-white outline-none w-[250px] md:w-[500px] lg:w-[600px] text-center focus:border-accent-lime focus:bg-accent-light/5 transition-all placeholder:text-accent-light/10 mx-2 md:mx-6 pb-2" /> 
              <br className="hidden lg:block" />to get the conversation started.
            </h3>
            
            <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex gap-8 font-mono text-sm text-secondary-text">
                <a href="mailto:hello@frontier.agency" className="hover:text-accent-lime transition-colors">hello@frontier.agency</a>
                <span className="hidden md:block">/</span>
                <span className="hidden md:block">San Francisco, CA</span>
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
  );
};

export default ContactSection;
