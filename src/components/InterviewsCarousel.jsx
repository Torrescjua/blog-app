import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, MapPin, Calendar, Star, User } from "lucide-react";

import {interviewsData} from '../data/interviewsData'

const InterviewsCarousel = ({
  interviews = interviewsData,
  title = "Voces de la comunidad",
  subtitle = "Percepción del patrimonio natural y cultural de Florida"
}) => {
  
  if (!interviews || interviews.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Vista responsiva
  const [view, setView] = useState({
    desktop: typeof window !== "undefined" && window.innerWidth >= 1024,
    tablet:
      typeof window !== "undefined" &&
      window.innerWidth >= 640 &&
      window.innerWidth < 1024,
    mobile: typeof window !== "undefined" && window.innerWidth < 640
  });

  useEffect(() => {
    const handleResize = () => {
      setView({
        desktop: window.innerWidth >= 1024,
        tablet: window.innerWidth >= 640 && window.innerWidth < 1024,
        mobile: window.innerWidth < 640
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCount = () => {
    if (view.desktop) return 3;
    if (view.tablet) return 2;
    return 1;
  };

  const visibleCount = getVisibleCount();

  // Navegación segura
  const totalPages = Math.max(interviews.length - visibleCount + 1, 1);

  const next = () => {
    if (interviews.length <= visibleCount) return; // nada que mover
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    if (interviews.length <= visibleCount) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Variantes animación mejorada con efecto de corrido
  const slideVariants = {
    enter: (dir) => ({ 
      x: dir > 0 ? 500 : -500, 
      opacity: 0,
      scale: 0.9
    }),
    center: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4, ease: "easeOut" }
      }
    },
    exit: (dir) => ({ 
      x: dir < 0 ? 500 : -500, 
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.2, ease: "easeIn" }
      }
    })
  };

  // Renderizar indicador de potencial turístico
  const renderTourismPotential = (rating) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center mt-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Potencial turístico:</span>
        <div className="flex">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} mr-1`} 
            />
          ))}
        </div>
      </div>
    );
  };

  // Renderizar etiqueta de clasificación
  const renderClassificationTag = (classification) => {
    if (!classification) return null;
    
    let color = "bg-blue-100 text-blue-800";
    let icon = null;
    
    if (classification.toLowerCase().includes("natural")) {
      color = "bg-green-100 text-green-800";
    } else if (classification.toLowerCase().includes("inmaterial")) {
      color = "bg-purple-100 text-purple-800";
    } else if (classification.toLowerCase().includes("material")) {
      color = "bg-amber-100 text-amber-800";
    }
    
    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} mb-2`}>
        {classification}
      </div>
    );
  };

  // Renderizar etiqueta de sector
  const renderSectorTag = (sector) => {
    if (!sector) return null;
    
    let color = "bg-gray-100 text-gray-800";
    
    if (sector.toLowerCase().includes("educativo")) {
      color = "bg-blue-50 text-blue-700";
    } else if (sector.toLowerCase().includes("cultural")) {
      color = "bg-purple-50 text-purple-700";
    } else if (sector.toLowerCase().includes("municipal")) {
      color = "bg-amber-50 text-amber-700";
    } else if (sector.toLowerCase().includes("hotelero")) {
      color = "bg-teal-50 text-teal-700";
    }
    
    return (
      <div className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${color}`}>
        <User size={10} className="mr-1" />
        {sector}
      </div>
    );
  };

  const visibleInterviews = interviews.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section id="testimonials" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-title)" }}
          >
            {title}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Carrusel con botones de navegación en posiciones fijas */}
        <div className="relative">
          {/* Contenedor para el carrusel y los botones */}
          <div className="relative h-full">
            {/* Botones de navegación en posiciones fijas */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
              <div className="relative h-full max-w-6xl mx-auto">
                {/* Flecha izquierda - posición fija */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 pointer-events-auto">
                  <button
                    onClick={prev}
                    disabled={interviews.length <= visibleCount}
                    className={`bg-white rounded-full p-2 shadow-lg focus:outline-none transform transition-transform duration-300 ${
                      interviews.length <= visibleCount
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 hover:scale-110"
                    }`}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>
                </div>
                
                {/* Flecha derecha - posición fija */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 pointer-events-auto">
                  <button
                    onClick={next}
                    disabled={interviews.length <= visibleCount}
                    className={`bg-white rounded-full p-2 shadow-lg focus:outline-none transform transition-transform duration-300 ${
                      interviews.length <= visibleCount
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50 hover:scale-110"
                    }`}
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjetas */}
            <div className="overflow-hidden px-10"> {/* Añadimos padding para dejar espacio a los botones */}
              <div className="flex gap-6">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  {visibleInterviews.map((item, idx) => (
                    <motion.div
                      key={item.id ?? idx}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className={`${
                        visibleCount === 3 ? "sm:w-1/3" : visibleCount === 2 ? "sm:w-1/2" : "w-full"
                      } w-full flex-shrink-0`}
                    >
                      <div className="bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden h-full relative" 
                           style={{ fontFamily: "var(--font-body)" }}>
                        
                        {/* Banner superior con clasificación */}
                        <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-100">
                          <div className="flex items-center">
                            <Quote size={16} className="text-[var(--color-main)] rotate-180 mr-2" />
                            {renderClassificationTag(item.classification)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.date && (
                              <div className="flex items-center">
                                <Calendar size={12} className="mr-1" />
                                <span>{item.date}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Contenido principal */}
                        <div className="p-6">
                          <div className="mb-6">
                            <p className="text-gray-700 italic mb-4">"{item.definition}"</p>
                            
                            {item.sites && (
                              <div className="mt-3">
                                <p className="font-semibold text-gray-900 text-sm">Sitios de interés patrimonial:</p>
                                <p className="text-gray-700 text-sm">{item.sites}</p>
                              </div>
                            )}
                            
                            {item.route && (
                              <div className="mt-3">
                                <p className="font-semibold text-gray-900 text-sm">Ruta turística sugerida:</p>
                                <p className="text-gray-700 text-sm">{item.route}</p>
                              </div>
                            )}
                            
                            {renderTourismPotential(item.tourismPotential)}
                            
                            {item.value && (
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                                  {item.value}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Información del autor */}
                          <div className="border-t border-gray-100 pt-4 mt-2">
                            <div className="flex items-center">
                              <div
                                className="mr-3 bg-[var(--color-main)] text-white rounded-full w-10 h-10 flex items-center justify-center uppercase text-sm font-bold"
                                style={{ fontFamily: "var(--font-title)" }}
                              >
                                {item.author
                                  ?.split(" ")
                                  .slice(0, 2)
                                  .map((n) => n?.[0] || "")
                                  .join("")}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h4
                                    className="font-medium text-gray-900"
                                    style={{ fontFamily: "var(--font-title)" }}
                                  >
                                    {item.author}
                                  </h4>
                                  {item.age && <span className="text-gray-500 text-xs ml-2">{item.age} años</span>}
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                  {item.location && (
                                    <div className="flex items-center text-xs text-gray-600">
                                      <MapPin size={10} className="mr-1" />
                                      <span>{item.location}</span>
                                      {item.yearsInFlorida && (
                                        <span className="ml-1 text-gray-500">
                                          ({typeof item.yearsInFlorida === 'number' ? `${item.yearsInFlorida} años en Florida` : item.yearsInFlorida})
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  {item.sector && (
                                    <div className="mt-1">
                                      {renderSectorTag(item.sector)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-8">
          {Array(totalPages)
            .fill(0)
            .map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`mx-1 w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
                  currentIndex === i 
                    ? "bg-[var(--color-main)] scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a item ${i + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default InterviewsCarousel;