import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`gpu-accelerated ${isScrolled ? 'glass-panel' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isScrolled ? '1rem 5vw' : '1.5rem 5vw',
          transition: 'padding 0.4s ease, background 0.4s ease',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isScrolled ? 'var(--bg-glass)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <img src="/favicon.png" alt="LNMS Logo" style={{ width: '45px', height: 'auto', objectFit: 'contain' }} />
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            LATE NIGHT <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>MED SPA</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden-mobile" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['services', 'specials', 'reviews', 'contact'].map((id) => (
            <a 
              key={id}
              href={`#${id}`} 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', transition: 'color 0.3s' }} 
              onMouseEnter={(e) => e.target.style.color = 'var(--text-accent)'} 
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              {id}
            </a>
          ))}
          
          <a href="https://www.instagram.com/latenightmedspachicago" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s', display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <MagneticWrapper>
            <a href="https://booking.mangomint.com/latenightmedspachicago" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem' }}>
              Book Now
            </a>
          </MagneticWrapper>
        </div>

        {/* Mobile Hamburger */}
        <div className="show-mobile" style={{ display: 'none', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--bg-primary)',
              zIndex: 101,
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
              <X size={32} style={{ color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
              {['services', 'specials', 'experience', 'reviews', 'contact'].map((id) => (
                <a 
                  key={id}
                  href={`#${id}`} 
                  style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textTransform: 'capitalize' }} 
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {id === 'experience' ? 'Experience' : id === 'specials' ? 'Monthly Specials' : id}
                </a>
              ))}
              <a href="https://www.instagram.com/latenightmedspachicago" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              
              <a href="https://booking.mangomint.com/latenightmedspachicago" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                Book Online Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
