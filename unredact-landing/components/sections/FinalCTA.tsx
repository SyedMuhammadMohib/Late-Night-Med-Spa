'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { Terminal, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  const headline = 'Nothing stays hidden.';
  const words = headline.split(' ');

  return (
    <section
      ref={ref}
      className="relative py-40 px-6 overflow-hidden flex items-center justify-center min-h-[85vh]"
      style={{ background: 'var(--black)' }}
    >
      {/* Large watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[clamp(80px,14vw,200px)] font-bold tracking-tighter whitespace-nowrap"
          style={{ color: 'var(--surface)', lineHeight: 1, userSelect: 'none' }}
        >
          unredact
        </span>
      </div>

      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)',
          transform: 'translate(-50%, -40%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Animated headline */}
        <h2
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-gradient leading-[1.0]"
          aria-label={headline}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: i * 0.12,
                duration: 0.65,
                ease: 'easeOut',
              }}
              style={{ display: 'inline-block', marginRight: '0.25em', willChange: 'transform' }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
          className="text-lg md:text-xl max-w-xl mx-auto"
          style={{ color: 'var(--white-muted)' }}
        >
          Install in under 60 seconds. Process PDFs instantly. MIT licensed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href="https://github.com/oplumina/unredact.py"
            className="btn-primary text-base px-8 py-4"
          >
            <Terminal size={17} />
            Get Started on GitHub
          </MagneticButton>
          <MagneticButton
            href="https://github.com/oplumina/unredact.py#readme"
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
            style={{ color: 'var(--white-dim)' } as React.CSSProperties}
          >
            Read the docs
            <ArrowRight size={14} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
