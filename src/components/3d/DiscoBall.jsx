import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, useGLTF } from '@react-three/drei';

export default function DiscoBall(props) {
  const groupRef = useRef();
  const { scene } = useGLTF('/free_realistic_disco_ball.glb');

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const name = child.name.toLowerCase();
          // Hide backgrounds, planes, or chains so only the ball is visible
          if (name.includes('background') || name.includes('bg') || name.includes('plane') || name.includes('room') || name.includes('chain')) {
            child.visible = false;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group {...props}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={groupRef} scale={1}>
          <primitive object={scene} />
        </group>
      </Float>

      {/* Realistic reflections from a preset environment plus colorful lightformers */}
      <Environment preset="city">
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer form="rect" intensity={5} position={[0, 5, -10]} scale={[20, 20, 1]} color="#ff00ff" />
          <Lightformer form="rect" intensity={5} position={[-10, 5, 0]} scale={[20, 20, 1]} color="#00ffff" />
          <Lightformer form="rect" intensity={5} position={[10, 5, 0]} scale={[20, 20, 1]} color="#ffff00" />
          <Lightformer form="circle" intensity={5} position={[0, -5, 10]} scale={[20, 1, 1]} />
        </group>
      </Environment>

      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#ff00ff" />
    </group>
  );
}
