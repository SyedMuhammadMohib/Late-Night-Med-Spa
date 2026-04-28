import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroBg from '../assets/hero_bg.png';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Smooth parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      style={{ 
        height: '100vh', 
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Parallax Background */}
      <motion.div 
        className="gpu-accelerated"
        style={{
          position: 'absolute',
          top: -50,
          left: -50,
          right: -50,
          bottom: -50,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
          opacity,
          zIndex: 0
        }}
      >
        {/* Dark overlay for contrast */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.4) 100%)'
        }} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '800px' }}
        >


          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
            lineHeight: 1.05, 
            marginBottom: '1.5rem',
          }}>
            Late Night.<br />
            <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Luxury Care.</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
            color: 'var(--text-secondary)', 
            marginBottom: '3.5rem',
            maxWidth: '550px',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            Welcome to Late Night Med Spa. Premiere Aesthetic Treatments 7-Days a Week with Extended & Evening Hours & 38+ services to choose from.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <motion.a 
              href="https://booking.mangomint.com/latenightmedspachicago"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Consultation
            </motion.a>
            <motion.a 
              href="#specials"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Specials
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

