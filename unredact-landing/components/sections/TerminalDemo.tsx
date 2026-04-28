'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import FadeInWhenVisible from '@/components/ui/FadeInWhenVisible';
import CountUp from '@/components/ui/CountUp';
import { Circle, Hash, FileSearch } from 'lucide-react';

const TERMINAL_LINES = [
  { type: 'command', text: '$ git clone https://github.com/oplumina/unredact.py' },
  { type: 'command', text: '$ cd unredact.py' },
  { type: 'command', text: '$ python -m venv venv && .\\venv\\Scripts\\Activate' },
  { type: 'command', text: '$ pip install -r .\\docs\\requirements.txt' },
  { type: 'output', text: 'Installing pymupdf==1.23.26...' },
  { type: 'success', text: 'Done.' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ python src/unredact.py -i ./classified.pdf -o ./output' },
  { type: 'blank', text: '' },
  { type: 'info', text: '[INFO] Scanning: classified.pdf' },
  { type: 'detect', text: '[DETECT] 14 redaction boxes identified (brightness < 30)' },
  { type: 'recover', text: '[RECOVER] 847 characters recovered from black-on-black text' },
  { type: 'write', text: '[WRITE] Output saved: ./output/classified_unredacted.pdf' },
  { type: 'blank', text: '' },
  { type: 'success', text: 'Process complete. 14 boxes removed. 847 characters revealed.' },
];

const LINE_COLORS: Record<string, string> = {
  command: 'rgba(241,240,255,0.9)',
  output: 'rgba(241,240,255,0.55)',
  success: '#22D3EE',
  info: 'rgba(241,240,255,0.6)',
  detect: '#F43F5E',
  recover: '#6366F1',
  write: '#818CF8',
  blank: 'transparent',
};

const STATS = [
  { value: 847, suffix: '', label: 'Characters Recovered', icon: Hash, color: '#22D3EE' },
  { value: 14, suffix: '', label: 'Boxes Removed', icon: FileSearch, color: '#6366F1' },
  { value: 1, suffix: '', label: 'Command', icon: Circle, color: '#F43F5E' },
];

export default function TerminalDemo() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inView = useInView(terminalRef, { once: true, margin: '0px 0px -100px 0px' });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i >= TERMINAL_LINES.length) {
        clearInterval(timer);
        return;
      }
      setVisibleLines(i + 1);
      i++;
    }, 100);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section className="relative py-32 px-6" style={{ background: 'var(--surface)' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <FadeInWhenVisible>
          <div className="text-center mb-16 space-y-4">
            <div className="label-tag">Live Demo</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
              One command. Every secret.
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Terminal window — 3 cols */}
          <div className="lg:col-span-3">
            <FadeInWhenVisible>
              <div ref={terminalRef} className="terminal-window">
                {/* Chrome bar */}
                <div className="terminal-chrome">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                  <span className="ml-auto font-mono text-xs" style={{ color: 'rgba(241,240,255,0.3)' }}>
                    unredact.py — zsh
                  </span>
                </div>

                {/* Body */}
                <div className="terminal-body min-h-[380px]">
                  {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="min-h-[1.7em]"
                      style={{ color: LINE_COLORS[line.type] }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  {inView && visibleLines < TERMINAL_LINES.length && (
                    <span className="cursor-blink" />
                  )}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Stats — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <FadeInWhenVisible key={stat.label} delay={i * 0.15}>
                  <div className="glass-card p-7 flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                    >
                      <Icon size={20} style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div
                        className="text-4xl font-bold tracking-tight"
                        style={{ color: stat.color, fontFamily: 'var(--font-inter)' }}
                      >
                        <CountUp to={stat.value} suffix={stat.suffix} />
                      </div>
                      <div style={{ color: 'var(--white-muted)', fontSize: '14px', marginTop: '2px' }}>
                        {stat.label}
                      </div>
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
