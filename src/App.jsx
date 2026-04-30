import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeBackground from './components/3d/ThreeBackground';
import Cursor3D from './components/3d/Cursor3D';
import Chatbot from './components/Chatbot';
import SmoothScroller from './components/SmoothScroller';
import BarbaTransition from './components/BarbaTransition';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';

// A small component to ensure scroll to top on navigation since Barba/Lenis are active
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <Preloader />
      <ScrollToTop />
      <BarbaTransition>
        <SmoothScroller>
          <ThreeBackground />
          <Cursor3D />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          </Routes>
          
          <Footer />
          <Chatbot />
        </SmoothScroller>
      </BarbaTransition>
    </Router>
  );
}

export default App;
