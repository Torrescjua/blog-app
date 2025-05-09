import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';
import Footer from './components/Footer';
import PurposeSection from './components/PurposeSection';
import FeaturesSection from './components/FeatureSection';
import LegacySection from './components/LegacySection';
import ScrollingSection from './components/ScrollingSection';
import InterviewsCarousel from './components/InterviewsCarousel';
import Map from './components/MapWithFlags';
import ArticleDetail from './components/ArticleDetail';

import { testimonialData } from './data/testimonialData';
import { patrimonioNatural, patrimonioMaterialInmueble } from './data/patrimonios';

export default function App() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);

  /* ───────── Callbacks ───────── */
  const handleCTAClick     = () => { setIsMapVisible(v => !v); window.scrollTo(0, 0); };
  const handleOpenArticle  = article => { setActiveArticle(article); window.scrollTo(0, 0); };
  const handleCloseArticle = () => setActiveArticle(null);

  /* ───────── Render ───────── */
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-0 w-full h-[500px] bg-gradient-to-tr from-[var(--color-1)]/20 to-[var(--color-10)]/20 rounded-full blur-[80px] -z-10"></div>

      {/* Navbar siempre visible */}
      <Navbar isMapVisible={isMapVisible} onCTAClick={handleCTAClick} />

      {/* Vista de artículo en “pantalla completa” */}
      {activeArticle ? (
        <ArticleDetail article={activeArticle} onClose={handleCloseArticle} />
      ) : (
        /* Contenido normal (mapa o secciones) */
        <>
          {isMapVisible ? (
            <Map />
          ) : (
            <>
              <FrontPage />
              <PurposeSection />
              <FeaturesSection />
              <LegacySection />
              <ScrollingSection
                testimonials={patrimonioNatural}
                title="Patrimonio Natural"
                onOpenArticle={handleOpenArticle}
              />
              <ScrollingSection
                testimonials={patrimonioMaterialInmueble}
                title="Cultural Material Inmueble"
                onOpenArticle={handleOpenArticle}
              />
              <ScrollingSection
                testimonials={testimonialData}
                title="Cultural Material Mueble"
                onOpenArticle={handleOpenArticle}
              />
              <ScrollingSection
                testimonials={testimonialData}
                title="Cultural Inmaterial"
                onOpenArticle={handleOpenArticle}
              />
              <InterviewsCarousel />
            </>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}
