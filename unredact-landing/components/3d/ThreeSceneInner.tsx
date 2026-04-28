'use client';

import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import DocumentMesh from './DocumentMesh';

interface ThreeSceneInnerProps {
  scrollProgress: number;
}

export default function ThreeSceneInner({ scrollProgress }: ThreeSceneInnerProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[5, 5, 5]} color="#6366F1" intensity={3} />
      <pointLight position={[-5, -5, 5]} color="#22D3EE" intensity={2} />

      <ParticleField count={3000} color="#6366F1" />
      <DocumentMesh scrollProgress={scrollProgress} pageCount={50} />
    </Canvas>
  );
}
