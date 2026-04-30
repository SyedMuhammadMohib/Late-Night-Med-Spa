import { useEffect, useRef } from 'react';
import barba from '@barba/core';
import gsap from 'gsap';

export default function BarbaTransition({ children }) {
  const transitionLayerRef = useRef(null);

  useEffect(() => {
    // Initialize Barba.js
    // Note: Since this is a React SPA, Barba won't naturally navigate between pages
    // but we can initialize it to handle manual page-wipe transitions if needed.
    barba.init({
      preventRunning: true,
      transitions: [{
        name: 'luxury-wipe',
        leave(data) {
          return gsap.to(transitionLayerRef.current, {
            y: "0%",
            duration: 0.8,
            ease: "power3.inOut"
          });
        },
        enter(data) {
          return gsap.to(transitionLayerRef.current, {
            y: "-100%",
            duration: 0.8,
            delay: 0.2,
            ease: "power3.inOut"
          });
        }
      }]
    });

    // We create a custom event listener for anchor links to trigger the Barba transition manually
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        
        // Manually trigger the transition overlay
        gsap.to(transitionLayerRef.current, {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            // Scroll to the element while covered
            const element = document.querySelector(target.hash);
            if (element) {
              element.scrollIntoView({ behavior: 'instant' });
            }
            // Reveal
            gsap.to(transitionLayerRef.current, {
              y: "-100%",
              duration: 0.8,
              ease: "power3.inOut"
            });
          }
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      try {
        barba.destroy();
      } catch (e) {
        // Barba might throw if already destroyed
      }
    };
  }, []);

  return (
    <div data-barba="wrapper">
      <div 
        ref={transitionLayerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#0a0a0e', // Premium dark
          zIndex: 999999,
          transform: 'translateY(100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none' // Don't block clicks when hidden
        }}
      >
        <div style={{ color: 'var(--text-accent)', fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '0.2em' }}>
          LATE NIGHT MED SPA
        </div>
      </div>
      <div data-barba="container" data-barba-namespace="home">
        {children}
      </div>
    </div>
  );
}
