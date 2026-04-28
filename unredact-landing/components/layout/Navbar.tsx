'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { Terminal, Menu, X, Code2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Docs', href: '#specs' },
  { label: 'GitHub', href: 'https://github.com/oplumina/unredact.py' },
];

const linkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i + 0.3, duration: 0.4, ease: 'easeOut' },
  }),
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 * i, duration: 0.35, ease: 'easeOut' },
  }),
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bg = useTransform(
    scrollY,
    [0, 60],
    ['rgba(3,3,10,0.0)', 'rgba(3,3,10,0.85)']
  );

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, willChange: 'background-color' }}
        className="fixed top-0 left-0 right-0 z-50 h-11 flex items-center backdrop-blur-md border-b border-white/[0.04]"
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#hero"
            className="flex items-baseline gap-0"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 500, color: 'var(--white)' }}
          >
            unredact
            <span style={{ color: 'var(--cyan)' }}>.py</span>
          </a>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                className="relative group transition-colors duration-200"
                style={{ fontSize: '13.5px', color: 'var(--white-muted)', fontWeight: 400 }}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
                <span className="absolute -bottom-px left-0 right-0 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </motion.a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
            >
              <MagneticButton
                href="https://github.com/oplumina/unredact.py"
                className="gradient-border flex items-center gap-2 px-4 py-[6px] rounded-lg text-[13px] font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-200"
                style={{ color: 'var(--white)' } as React.CSSProperties}
              >
                <Terminal size={13} />
                Get Started
              </MagneticButton>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X size={18} style={{ color: 'var(--white)' }} />
              : <Menu size={18} style={{ color: 'var(--white)' }} />
            }
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col pt-16 px-6 pb-8"
            style={{ background: 'rgba(3,3,10,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col gap-2 mt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={mobileItemVariants}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-lg font-medium border-b"
                  style={{ color: 'var(--white)', borderColor: 'var(--border)' }}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-8">
              <a
                href="https://github.com/oplumina/unredact.py"
                className="btn-primary w-full justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal size={15} />
                Get Started on GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
