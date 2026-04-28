'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DocumentMeshProps {
  scrollProgress: number;
  pageCount?: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function DocumentMesh({ scrollProgress, pageCount = 50 }: DocumentMeshProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pageData = useMemo(() => {
    return Array.from({ length: pageCount }, () => ({
      // Initial stacked position
      baseX: 0,
      baseY: 0,
      baseZ: 0,
      // Drifted-apart position
      driftX: (Math.random() - 0.5) * 7,
      driftY: (Math.random() - 0.5) * 7,
      driftZ: (Math.random() - 0.5) * 5,
      // Rotation variation
      rotX: (Math.random() - 0.5) * 0.5,
      rotY: (Math.random() - 0.5) * 0.5,
      rotZ: (Math.random() - 0.5) * 0.2,
      // Initial stagger Y
      stackY: (Math.random() - 0.5) * 0.08,
    }));
  }, [pageCount]);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1.4, 1.82, 1, 1);
    return g;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf1f0ff),
      transparent: true,
      opacity: 0.08,
      roughness: 0.1,
      metalness: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    if (!meshRef.current) return;

    // scrollProgress 0–0.4: drift apart
    // scrollProgress 0.4–0.6: peak spread
    // scrollProgress 0.6–1.0: reassemble
    const spread = scrollProgress < 0.5
      ? scrollProgress * 2 // 0–1 as scroll goes 0–0.5
      : (1 - scrollProgress) * 2; // 1–0 as scroll goes 0.5–1

    const eased = 1 - Math.pow(1 - Math.min(1, spread), 2);

    pageData.forEach((page, i) => {
      const x = lerp(page.baseX, page.driftX, eased);
      const y = lerp(page.baseY + page.stackY, page.driftY, eased);
      const z = lerp(page.baseZ, page.driftZ, eased);

      dummy.position.set(x, y, z);
      dummy.rotation.x = lerp(0, page.rotX, eased);
      dummy.rotation.y = lerp(0, page.rotY, eased);
      dummy.rotation.z = lerp(0, page.rotZ, eased);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update emissive based on scroll
    const emissiveIntensity = eased * 0.15;
    (material as THREE.MeshPhysicalMaterial).emissive = new THREE.Color(
      scrollProgress > 0.6 ? 0x22d3ee : 0x6366f1
    );
    (material as THREE.MeshPhysicalMaterial).emissiveIntensity = emissiveIntensity;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, pageCount]}
      frustumCulled={false}
    />
  );
}
