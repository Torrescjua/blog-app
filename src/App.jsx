import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FrontPage from './components/frontPage';
import Footer from './components/Footer';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeatureSection';
import LegacySection from './components/LegacySection';
import ScrollingSection from './components/ScrollingSection';

import myLocalImage from './assets/icono_logo.webp';

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fondo con gradiente usando tus variables de color */}
      <div className="absolute -top-28 -left-0 w-full h-[500px] bg-gradient-to-tr from-[var(--color-1)]/20 to-[var(--color-10)]/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <FrontPage />
        <PurposeSection />
        <FeaturesSection />
        <LegacySection />
        <TiltedCard 
          image={myLocalImage}
          subtitle="Colombia"
          title="Unidad VI"
          description="Esta es la información detallada de la Unidad VI, destacando su relevancia histórica y cultural en la región."
        />
        {/* <ScrollingSection /> */}
        <Footer />
      </div>
    </main>
  );
}

export default App;
