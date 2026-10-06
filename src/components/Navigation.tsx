import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PremiumButton } from './PremiumButton';
import ServiceDropdownCard from './ServiceDropdownCard';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(true);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background styling threshold
      setScrolled(currentScrollY > 50);

      // Smart Header Logic: Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true);
        setIsServicesOpen(false);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterServices = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  const isServicesActive = pathname.startsWith('/services');

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary-bg/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'} ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="px-page flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="flex items-center z-50 relative">
          <span className="font-display font-bold text-xl tracking-tight leading-none">
            Vereen<span className="text-accent-lime">Digital</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-accent-lime font-bold' : 'text-primary-text hover:text-accent-lime'
            }`}
          >
            Home
          </a>

          {/* Services Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnterServices}
            onMouseLeave={handleMouseLeaveServices}
          >
            <a
              href="/services"
              onClick={(e) => {
                // If user clicks directly on desktop, toggle or navigate
              }}
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-1 ${
                isServicesActive ? 'text-accent-lime font-bold' : 'text-primary-text hover:text-accent-lime'
              }`}
            >
              <span>Services</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-accent-lime' : 'opacity-70'}`} 
              />
            </a>

            {/* Dropdown Container */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50"
                >
                  <ServiceDropdownCard onSelect={() => setIsServicesOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            className="fixed inset-0 bg-primary-bg z-40 flex flex-col justify-center items-center gap-6 px-6 overflow-y-auto pt-20 pb-12"
          >
            <a
              href="/"
              className={`text-3xl font-display font-medium transition-colors ${
                pathname === '/' ? 'text-accent-lime font-bold' : 'hover:text-accent-lime'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>

            {/* Mobile Services Accordion */}
            <div className="flex flex-col items-center w-full max-w-xs">
              <button
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className={`text-3xl font-display font-medium flex items-center gap-2 mb-3 ${
                  isServicesActive ? 'text-accent-lime font-bold' : 'hover:text-accent-lime'
                }`}
              >
                <span>Services</span>
                <ChevronDown size={22} className={`transition-transform ${mobileServicesExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesExpanded && (
                <div className="w-full flex justify-center py-2">
                  <ServiceDropdownCard onSelect={() => setIsOpen(false)} />
                </div>
              )}
            </div>

            <PremiumButton
              text="START A PROJECT"
              onClick={() => {
                setIsOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 mt-4"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;

