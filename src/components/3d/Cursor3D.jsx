import { useState, useEffect } from 'react';

export default function Cursor3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide custom cursor on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 99999
    }}>
      <div style={{
        position: 'absolute',
        top: mousePosition.y - 12,
        left: mousePosition.x - 12,
        width: '24px',
        height: '24px',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L13.88 8.12L22 10L13.88 11.88L12 20L10.12 11.88L2 10L10.12 8.12L12 0Z" fill="#d4c5b0" />
          <path d="M19 15L19.78 18.22L23 19L19.78 19.78L19 23L18.22 19.78L15 19L18.22 18.22L19 15Z" fill="#d4c5b0" />
          <path d="M5 15L5.78 18.22L9 19L5.78 19.78L5 23L4.22 19.78L1 19L4.22 18.22L5 15Z" fill="#d4c5b0" />
        </svg>
      </div>
    </div>
  );
}
