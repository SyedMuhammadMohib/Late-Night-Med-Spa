'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35 });

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleEnter = () => ringScale.set(2);
    const handleLeave = () => ringScale.set(1);

    window.addEventListener('mousemove', handleMove);

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor-expand]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [mouseX, mouseY, ringScale]);

  return (
    <>
      {/* Cyan dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#22D3EE] z-[9999] pointer-events-none mix-blend-difference"
      />
      {/* Indigo ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScaleSpring,
        }}
        className="fixed top-0 left-0 w-[32px] h-[32px] rounded-full border border-[#6366F1] z-[9998] pointer-events-none mix-blend-difference"
      />
    </>
  );
}
