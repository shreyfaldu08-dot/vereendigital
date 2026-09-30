"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import CaseStudiesSection from '../sections/CaseStudiesSection';
import ServicesSection from '../sections/ServicesSection';
import WhyUsSection from '../sections/WhyUsSection';
import ProcessSection from '../sections/ProcessSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <CaseStudiesSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
