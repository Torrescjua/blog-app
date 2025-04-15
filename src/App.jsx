import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FrontPage from './components/frontPage';
import Footer from './components/Footer';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeatureSection';
import LegacySection from './components/LegacySection';
import ScrollingSection from './components/ScrollingSection';

import logo from './assets/logo_florida.webp'

const testimoniosData = [
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la "
  },
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico"
  },
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico"
  },
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico"
  },
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico"
  },
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico"
  },
  {
    id: 1,
    image: logo,
    subtitle: "Colombia",
    title: "Valle de Florida",
    description: "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico"
  },
  
  // ... más testimonios
];

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
        <ScrollingSection 
          testimonials={testimoniosData} 
          title="Patrimonio Natural"
        />
        <ScrollingSection 
          testimonials={testimoniosData} 
          title="Cultural Material Inmueble"
        />
        <ScrollingSection 
          testimonials={testimoniosData} 
          title="Cultural Material Mueble"
        />
                <ScrollingSection 
          testimonials={testimoniosData} 
          title="Cultural Inmaterial"
        />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}

export default App;
