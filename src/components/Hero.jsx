import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import anime from 'animejs';
import MagneticWrapper from './MagneticWrapper';

export default function Hero() {
  const ref = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Smooth parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Anime.js organic pulse effect on the primary button
    if (btnRef.current) {
      anime({
        targets: btnRef.current,
        scale: [1, 1.03, 1],
        boxShadow: [
          '0 0 0 rgba(212, 197, 176, 0)',
          '0 0 20px rgba(212, 197, 176, 0.4)',
          '0 0 0 rgba(212, 197, 176, 0)'
        ],
        duration: 3000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Force video playback on mobile devices
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

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
          y,
          opacity,
          zIndex: 0
        }}
      >
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/assets/MedSpa.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for contrast */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.4) 100%)'
        }} />
      </motion.div>



      <div className="container" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '800px', pointerEvents: 'auto' }}
        >


          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
            }}
            style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
              lineHeight: 1.05, 
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em' }}>
              <motion.span 
                variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } } }}
                style={{ display: 'inline-block' }}
              >
                Late Night.
              </motion.span>
            </div>
            <div style={{ overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em' }}>
              <motion.span 
                variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } } }}
                style={{ color: 'var(--text-accent)', fontStyle: 'italic', display: 'inline-block' }}
              >
                Luxury Care.
              </motion.span>
            </div>
          </motion.h1>

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
            <div ref={btnRef} style={{ display: 'inline-block' }}>
              <MagneticWrapper>
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
              </MagneticWrapper>
            </div>
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

