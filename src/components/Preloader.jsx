import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Collect all heavy images to preload
    const imagesToPreload = [
      ...servicesData.map(s => s.image),
      "/assets/lgbtq.jpg",
      "/assets/38+services.jpg",
      "/assets/ultimateConvenience.jpg",
      "/assets/Award Winning.jpg"
    ].filter(Boolean);

    const preloadImages = () => {
      const promises = imagesToPreload.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Resolve anyway to avoid blocking forever on a bad image
        });
      });
      return Promise.all(promises);
    };

    let minTimeElapsed = false;
    let assetsLoaded = false;
    let minTimer;

    const hideLoader = () => {
      setLoading(false);
    };

    const checkAndHide = () => {
      if (assetsLoaded && minTimeElapsed) {
        hideLoader();
      }
    };

    minTimer = setTimeout(() => {
      minTimeElapsed = true;
      checkAndHide();
    }, 1500); // Wait at least 1.5s for the cinematic effect

    // Wait for window.onload AND our explicit image preloads
    const handleLoad = async () => {
      await preloadImages();
      assetsLoaded = true;
      checkAndHide();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback in case load event takes too long
    const fallbackTimer = setTimeout(hideLoader, 8000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Awwwards style bezier easing
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#030305',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-accent)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img src="/favicon.png" alt="LNMS Logo" style={{ width: '80px', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(212, 197, 176, 0.2))' }} />
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '0.1em', fontWeight: 300 }}>
              LATE NIGHT <span style={{ fontStyle: 'italic' }}>MED SPA</span>
            </h1>
            
            <motion.div 
              style={{ width: '200px', height: '1px', background: 'rgba(212, 197, 176, 0.2)', marginTop: '2rem', position: 'relative', overflow: 'hidden' }}
            >
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{ position: 'absolute', inset: 0, background: 'var(--text-accent)' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
