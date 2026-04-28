'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  y?: number;
}

const variants: Variants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

export default function FadeInWhenVisible({
  children,
  delay = 0,
  className = '',
  once = true,
  y = 24,
}: FadeInWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={y}
      variants={variants}
      transition={{ delay }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
