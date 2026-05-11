'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    // Smooth movement animation
    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      glow.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;

      requestAnimationFrame(animate);
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      style={{
        background:
          'radial-gradient(circle, rgba(4, 150, 105, 0.22) 0%, rgba(4, 150, 105, 0.10) 35%, rgba(4, 150, 105, 0.03) 60%, transparent 75%)',
        filter: 'blur(60px)',
        willChange: 'transform',
      }}
    />
  );
}