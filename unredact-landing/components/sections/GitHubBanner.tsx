'use client';

import { Code2 } from 'lucide-react';
import FadeInWhenVisible from '@/components/ui/FadeInWhenVisible';
import MagneticButton from '@/components/ui/MagneticButton';

export default function GitHubBanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden noise-overlay" style={{ background: 'var(--surface-2)' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <FadeInWhenVisible>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* GitHub icon */}
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 60px rgba(99,102,241,0.1)',
                }}
              >
                <Code2 size={48} style={{ color: 'var(--white)' }} />
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 text-center lg:text-left space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--white)' }}>
                Open source. MIT licensed.
              </h2>
              <p className="text-lg" style={{ color: 'var(--white-muted)' }}>
                Audit PDFs. Verify redactions. Trust nothing.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <MagneticButton
                href="https://github.com/oplumina/unredact.py"
                className="gradient-border flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] whitespace-nowrap"
              >
                <Code2 size={15} />
                View on GitHub
              </MagneticButton>
              <MagneticButton
                href="https://github.com/oplumina/unredact.py"
                className="btn-outline whitespace-nowrap justify-center"
              >
                Clone Repository
              </MagneticButton>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
