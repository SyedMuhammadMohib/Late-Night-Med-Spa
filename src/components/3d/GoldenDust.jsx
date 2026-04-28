import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GoldenDust({ count = 2000 }) {
  const points = useRef();

  // Generate particle positions and colors
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Luxury color palette: warm golds, champagnes, soft whites
    const colorPalette = [
      new THREE.Color('#d4c5b0'), // Accent Gold
      new THREE.Color('#fdfdfc'), // Soft White
      new THREE.Color('#8c7e6c'), // Darker Gold
    ];

    for (let i = 0; i < count; i++) {
      // Scatter particles in a large volume
      positions[i * 3] = (Math.random() - 0.5) * 40;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z

      // Assign random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  // Animation logic
  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow, elegant rotation of the entire particle field
    points.current.rotation.y = time * 0.02;
    points.current.rotation.x = time * 0.01;

    // Subtle breathing effect on scale
    const scale = 1 + Math.sin(time * 0.5) * 0.05;
    points.current.scale.set(scale, scale, scale);

    // Mouse parallax effect
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.05;
    points.current.rotation.x += (-mouseY - points.current.rotation.x) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
