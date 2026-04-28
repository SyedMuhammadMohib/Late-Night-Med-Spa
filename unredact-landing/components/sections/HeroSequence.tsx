'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';
import { computeFrameState } from '@/lib/frameStates';
import { useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import { Terminal, Code2, ArrowRight } from 'lucide-react';

const CanvasPlayer = dynamic(() => import('@/components/canvas/CanvasPlayer'), {
  ssr: false,
});

interface CopyBeat {
  id: string;
  enter: number;
  show: [number, number];
  exit: number;
  align: 'left' | 'right' | 'center';
  content: React.ReactNode;
}

const BEATS: CopyBeat[] = [
  {
    id: 'hero',
    enter: 0,
    show: [0.04, 0.09],
    exit: 0.14,
    align: 'center',
    content: (
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="label-tag">Python Forensic Tool</div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]" style={{ fontFamily: 'var(--font-inter)' }}>
          <span className="text-gradient">What they hid.</span>
          <br />
          <span style={{ color: 'var(--white)' }}>Revealed.</span>
        </h1>
        <p style={{ color: 'var(--white-muted)', maxWidth: '520px', margin: '0 auto', fontSize: '18px', lineHeight: '1.65' }}>
          A Python forensic tool that recovers hidden text from weakly redacted PDFs — black-on-black text, unflattened overlays, and everything in between.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
          <MagneticButton
            href="https://github.com/oplumina/unredact.py"
            className="btn-primary"
          >
            <Terminal size={16} />
            Get Started — Free
          </MagneticButton>
          <MagneticButton
            href="https://github.com/oplumina/unredact.py"
            className="btn-outline"
          >
            <Code2 size={16} />
            View on GitHub
          </MagneticButton>
        </div>
      </div>
    ),
  },
  {
    id: 'problem',
    enter: 0.10,
    show: [0.17, 0.27],
    exit: 0.34,
    align: 'left',
    content: (
      <div className="max-w-md space-y-5">
        <div className="label-tag">The Problem</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
          Most redactions are an illusion.
        </h2>
        <p style={{ color: 'var(--white-muted)', fontSize: '17px', lineHeight: '1.7' }}>
          Black text on a black background. An image pasted over words. The data is still there — buried beneath a layer of false security. unredact.py finds it.
        </p>
      </div>
    ),
  },
  {
    id: 'detection',
    enter: 0.30,
    show: [0.38, 0.48],
    exit: 0.54,
    align: 'right',
    content: (
      <div className="max-w-md space-y-5">
        <div className="label-tag">Detection</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
          Precision detection. Zero guesswork.
        </h2>
        <ul className="space-y-3" style={{ color: 'var(--white-muted)', fontSize: '16px' }}>
          <li className="flex items-start gap-3">
            <span style={{ color: 'var(--cyan)', marginTop: '2px' }}>—</span>
            Brightness-based image analysis identifies fake redaction boxes
          </li>
          <li className="flex items-start gap-3">
            <span style={{ color: 'var(--cyan)', marginTop: '2px' }}>—</span>
            Digital text extraction bypasses visual-layer obfuscation
          </li>
          <li className="flex items-start gap-3">
            <span style={{ color: 'var(--cyan)', marginTop: '2px' }}>—</span>
            Works on single files or entire directories at once
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'recovery',
    enter: 0.50,
    show: [0.57, 0.67],
    exit: 0.74,
    align: 'left',
    content: (
      <div className="max-w-md space-y-5">
        <div className="label-tag">Recovery</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
          Every word.{' '}
          <span style={{ color: 'var(--red-reveal)' }}>Recovered.</span>
        </h2>
        <p style={{ color: 'var(--white-muted)', fontSize: '17px', lineHeight: '1.7' }}>
          Recovered text is recoloured red for instant identification. Nothing is missed. Nothing is rewritten. The document is rebuilt with only the truth.
        </p>
      </div>
    ),
  },
  {
    id: 'cta',
    enter: 0.82,
    show: [0.88, 0.96],
    exit: 1.0,
    align: 'center',
    content: (
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="label-tag">Batch Processing</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
          Process once.{' '}
          <span className="text-gradient-indigo">Audit everything.</span>
        </h2>
        <p style={{ color: 'var(--white-muted)', fontSize: '17px' }}>
          Batch process entire PDF directories with a single command.
          MIT licensed. Open source. No data leaves your machine.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <MagneticButton
            href="https://github.com/oplumina/unredact.py"
            className="btn-primary"
          >
            <Terminal size={16} />
            pip install via GitHub
          </MagneticButton>
          <MagneticButton
            href="https://github.com/oplumina/unredact.py#readme"
            className="btn-outline"
          >
            See docs
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
        <p className="font-mono text-xs" style={{ color: 'var(--white-dim)' }}>
          Built on PyMuPDF. Works on Windows, macOS, Linux.
        </p>
      </div>
    ),
  },
];

interface BeatOverlayProps {
  beat: CopyBeat;
  scrollYProgress: MotionValue<number>;
}

function BeatOverlay({ beat, scrollYProgress }: BeatOverlayProps) {
  const opacity = useTransform(
    scrollYProgress,
    [beat.enter, beat.show[0], beat.show[1], beat.exit],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [beat.enter, beat.show[0], beat.show[1], beat.exit],
    [20, 0, 0, -20]
  );

  const alignClass = {
    left: 'items-start justify-start pl-8 md:pl-16 lg:pl-24',
    right: 'items-end justify-end pr-8 md:pr-16 lg:pr-24',
    center: 'items-center justify-center px-6',
  }[beat.align];

  return (
    <motion.div
      style={{ opacity, y, willChange: 'transform, opacity' }}
      className={`absolute inset-0 flex ${alignClass} items-center pointer-events-none`}
    >
      <div className="pointer-events-auto">
        {beat.content}
      </div>
    </motion.div>
  );
}

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameState, setFrameState] = useState(computeFrameState(0));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setFrameState(computeFrameState(v));
  });

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{ height: '500vh', position: 'relative' }}
    >
      {/* Sticky viewport container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Canvas fills full viewport */}
        <CanvasPlayer frameState={frameState} />

        {/* Copy overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {BEATS.map((beat) => (
            <BeatOverlay
              key={beat.id}
              beat={beat}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Scroll indicator (fades out quickly) */}
        <motion.div
          style={{
            opacity: scrollIndicatorOpacity,
            willChange: 'opacity',
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="label-tag" style={{ color: 'var(--white-dim)' }}>Scroll to reveal</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-indigo-500/60 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
