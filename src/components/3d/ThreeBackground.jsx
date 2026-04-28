import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import GoldenDust from './GoldenDust';

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <GoldenDust />
        </Suspense>
      </Canvas>
    </div>
  );
}


