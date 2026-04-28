'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, ScanSearch, Unlock } from 'lucide-react';
import FadeInWhenVisible from '@/components/ui/FadeInWhenVisible';

const STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'Input',
    description:
      'Point unredact.py at any PDF — a single file or an entire folder of documents. No configuration required.',
    color: '#6366F1',
  },
  {
    number: '02',
    icon: ScanSearch,
    title: 'Analyze',
    description:
      'The tool scans for image-based redaction boxes via brightness detection and extracts all digital text from beneath color layers.',
    color: '#22D3EE',
  },
  {
    number: '03',
    icon: Unlock,
    title: 'Recover',
    description:
      'A clean PDF is generated with all hidden text recovered, optionally highlighted red for immediate visual audit.',
    color: '#F43F5E',
  },
];

export default function HowItWorks() {
  const lineRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <section id="how-it-works" className="relative py-32 px-6" style={{ background: 'var(--deep)' }}>
      <div className="max-w-[1200px] mx-auto" ref={sectionRef}>
        <FadeInWhenVisible>
          <div className="text-center mb-20 space-y-4">
            <div className="label-tag">Process</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
              How it works.
            </h2>
            <p className="max-w-lg mx-auto" style={{ color: 'var(--white-muted)', fontSize: '17px' }}>
              Three steps from redacted to recovered. No guesswork. No data leaves your machine.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[16.67%] right-[16.67%] h-px">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 1" preserveAspectRatio="none">
              <motion.path
                d="M 0 0.5 L 100 0.5"
                stroke="rgba(99,102,241,0.35)"
                strokeWidth="1"
                strokeDasharray="6 4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeInWhenVisible key={step.number} delay={i * 0.15 + 0.3}>
                  <div className="flex flex-col items-center text-center lg:items-center gap-6">
                    {/* Icon circle */}
                    <div className="relative">
                      <div
                        className="w-[104px] h-[104px] rounded-full flex items-center justify-center relative z-10"
                        style={{
                          background: `radial-gradient(circle at center, ${step.color}20, ${step.color}08)`,
                          border: `1px solid ${step.color}40`,
                          boxShadow: `0 0 40px ${step.color}18`,
                        }}
                      >
                        <Icon size={36} style={{ color: step.color }} strokeWidth={1.5} />
                      </div>
                      {/* Step number badge */}
                      <div
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-medium"
                        style={{
                          background: step.color,
                          color: '#fff',
                        }}
                      >
                        {step.number}
                      </div>
                    </div>

                    <div className="space-y-3 max-w-xs">
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: 'var(--white)' }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ color: 'var(--white-muted)', fontSize: '15px', lineHeight: '1.65' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
