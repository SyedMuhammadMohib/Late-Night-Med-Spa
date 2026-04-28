'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function CountUp({ to, duration = 2, suffix = '', className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { duration: duration * 1000 });

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    return springVal.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      }
    });
  }, [springVal, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
