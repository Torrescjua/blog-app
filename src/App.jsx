import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FrontPage from './components/frontPage';
import Footer from './components/Footer';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeatureSection';
import LegacySection from './components/LegacySection';
import ScrollingSection from './components/ScrollingSection';
import InterviewsCarousel from './components/InterviewsCarousel'

import {testimonialData} from './data/testimonialData'

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-0 w-full h-[500px] bg-gradient-to-tr from-[var(--color-1)]/20 to-[var(--color-10)]/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <FrontPage />
        <PurposeSection />
        <FeaturesSection />
        <LegacySection />
        <ScrollingSection 
          testimonials={testimonialData} 
          title="Patrimonio Natural"
        />
        <ScrollingSection 
          testimonials={testimonialData} 
          title="Cultural Material Inmueble"
        />
        <ScrollingSection 
          testimonials={testimonialData} 
          title="Cultural Material Mueble"
        />
        <ScrollingSection 
          testimonials={testimonialData} 
          title="Cultural Inmaterial"
        />
        <InterviewsCarousel />
        <Footer />
      </div>
    </main>
  );
}

export default App;
