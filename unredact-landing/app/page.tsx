'use client';

import { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSequence from '@/components/sections/HeroSequence';
import FeatureGrid from '@/components/sections/FeatureGrid';
import TerminalDemo from '@/components/sections/TerminalDemo';
import HowItWorks from '@/components/sections/HowItWorks';
import SpecsTable from '@/components/sections/SpecsTable';
import GitHubBanner from '@/components/sections/GitHubBanner';
import FinalCTA from '@/components/sections/FinalCTA';
import TerminalPlayground from '@/components/ui/TerminalPlayground';

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const ThreeBackground = dynamic(() => import('@/components/3d/ThreeBackground'), { ssr: false });

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollProgress(v);
  });

  return (
    <>
      <CustomCursor />
      <ThreeBackground scrollProgress={scrollProgress} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <HeroSequence />
          <FeatureGrid />
          <TerminalDemo />
          <HowItWorks />
          <TerminalPlayground />
          <SpecsTable />
          <GitHubBanner />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
