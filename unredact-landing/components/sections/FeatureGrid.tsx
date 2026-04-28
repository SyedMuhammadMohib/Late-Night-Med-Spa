'use client';

import { motion } from 'framer-motion';
import { Eye, Layers, Highlighter, FolderOpen } from 'lucide-react';
import FadeInWhenVisible from '@/components/ui/FadeInWhenVisible';
import { useState, useRef } from 'react';

const CARDS = [
  {
    icon: Eye,
    title: 'Text Recovery',
    description:
      'Extracts digital text hidden beneath black redaction layers — color manipulation without altering document structure. Every character surfaced.',
    accent: '#6366F1',
  },
  {
    icon: Layers,
    title: 'Smart Box Removal',
    description:
      'Detects image-based redaction boxes by brightness threshold analysis. Non-flattened overlays are identified and cleanly removed.',
    accent: '#22D3EE',
  },
  {
    icon: Highlighter,
    title: 'Red Highlighting',
    description:
      'Recovered text is optionally re-rendered in red (#F43F5E) for immediate visual audit. Toggle on or off via the --hl flag.',
    accent: '#F43F5E',
  },
  {
    icon: FolderOpen,
    title: 'Batch Processing',
    description:
      'Process a single PDF or an entire directory. One command. Every file audited. Every hidden word surfaced.',
    accent: '#818CF8',
  },
];

interface CardProps {
  card: typeof CARDS[0];
  index: number;
}

function FeatureCard({ card, index }: CardProps) {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setTiltX(x);
    setTiltY(y);
  };

  const Icon = card.icon;

  return (
    <FadeInWhenVisible delay={index * 0.1}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTiltX(0); setTiltY(0); setHovered(false); }}
        animate={{
          rotateY: tiltX,
          rotateX: tiltY,
          translateY: hovered ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          willChange: 'transform',
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        className="glass-card p-8 h-full relative overflow-hidden"
        data-cursor-expand="true"
      >
        {/* Top accent border */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
        />

        {/* Hover glow */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${card.accent}10 0%, transparent 60%)`,
              opacity: 1,
            }}
          />
        )}

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
          style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}30` }}
        >
          <Icon size={20} style={{ color: card.accent }} />
        </div>

        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--white)', fontFamily: 'var(--font-inter)' }}
        >
          {card.title}
        </h3>
        <p
          style={{ color: 'var(--white-muted)', fontSize: '15px', lineHeight: '1.65' }}
        >
          {card.description}
        </p>
      </motion.div>
    </FadeInWhenVisible>
  );
}

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-32 px-6" style={{ background: 'var(--deep)' }}>
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <FadeInWhenVisible>
          <div className="text-center mb-16 space-y-4">
            <div className="label-tag">Capabilities</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
              Built for forensic precision.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--white-muted)', fontSize: '17px' }}>
              Every feature engineered to surface hidden content — with zero modification to the original document.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
