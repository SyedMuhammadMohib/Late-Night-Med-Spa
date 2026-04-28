import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustAuthority from './components/TrustAuthority';
import Specials from './components/Specials';
import Services from './components/Services';
import ConversionFlow from './components/ConversionFlow';
import PremiumExperience from './components/PremiumExperience';
import Reviews from './components/Reviews';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';
import ThreeBackground from './components/3d/ThreeBackground';
import Cursor3D from './components/3d/Cursor3D';
import BotoxParty from './components/BotoxParty';
function App() {
  return (
    <>
      <ThreeBackground />
      <Cursor3D />
      <Navbar />
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
      <Footer />
    </>
  );
}

export default App;


