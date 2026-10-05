import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumButton } from './PremiumButton';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background styling threshold
      setScrolled(currentScrollY > 50);

      // Smart Header Logic: Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Work', 'Services', 'About', 'Process', 'Contact'];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary-bg/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'} ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="px-page flex justify-between items-center max-w-7xl mx-auto">
        <a href="#" className="flex items-center z-50 relative">
          <span className="font-display font-bold text-xl tracking-tight leading-none">
            Vereen<span className="text-accent-lime">Digital</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium hover:text-accent-lime transition-colors">
              {link}
            </a>
          ))}
          <PremiumButton
            text="START A PROJECT"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3"
          />
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-primary-bg z-40 flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-4xl font-display font-medium hover:text-accent-lime transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
