'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

const ThreeScene = dynamic(() => import('./ThreeSceneInner'), { ssr: false });

interface ThreeBackgroundProps {
  scrollProgress: number;
}

export default function ThreeBackground({ scrollProgress }: ThreeBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Suspense fallback={null}>
        <ThreeScene scrollProgress={scrollProgress} />
      </Suspense>
    </div>
  );
}
