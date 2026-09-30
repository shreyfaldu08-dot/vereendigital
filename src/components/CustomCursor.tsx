import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      // Smooth following
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      gsap.set(cursor, {
        x: cursorX - 10,
        y: cursorY - 10
      });
      requestAnimationFrame(render);
    };
    render();

    // Hover effect for links and buttons
    const addHover = () => gsap.to(cursor, { scale: 3, backgroundColor: 'transparent', border: '1px solid #89bc30', duration: 0.3 });
    const removeHover = () => gsap.to(cursor, { scale: 1, backgroundColor: '#89bc30', border: 'none', duration: 0.3 });

    const interactables = document.querySelectorAll('a, button, input, textarea, select');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 bg-accent-lime rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
};

export default CustomCursor;
