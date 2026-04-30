import React from 'react';
import Hero from '../components/Hero';
import TrustAuthority from '../components/TrustAuthority';
import Specials from '../components/Specials';
import Services from '../components/Services';
import BotoxParty from '../components/BotoxParty';
import PremiumExperience from '../components/PremiumExperience';
import Reviews from '../components/Reviews';
import ConversionFlow from '../components/ConversionFlow';
import StickyCTA from '../components/StickyCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustAuthority />
      <Specials />
      <Services />
      <BotoxParty />
      <PremiumExperience />
      <Reviews />
      <ConversionFlow />
      <StickyCTA />
    </main>
  );
}
