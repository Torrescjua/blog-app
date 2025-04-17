import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltedCard from './TiltedCard';
import { X } from 'lucide-react';

const ScrollingSection = ({ 
  testimonials = [], 
  title = "Testimonios de Clientes",
}) => {
  // Estado para controlar la tarjeta expandida
  const [expandedItem, setExpandedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  // Referencias para el scroll
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const expandedCardRef = useRef(null);
  const prevScrollX = useRef(0);
  const direction = useRef(0); // 1: derecha, -1: izquierda, 0: sin movimiento
  
  // Referencias para cada tarjeta por ID
  const cardRefs = useRef({});
  
  // Comprobar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Guardar la posición actual del scroll en cada cambio
  useEffect(() => {
    if (scrollRef.current) {
      const handleScroll = () => {
        // Determinar dirección del scroll para las animaciones
        const currentScrollX = scrollRef.current.scrollLeft;
        if (currentScrollX > prevScrollX.current) {
          direction.current = 1; // derecha
        } else if (currentScrollX < prevScrollX.current) {
          direction.current = -1; // izquierda
        }
        prevScrollX.current = currentScrollX;
      };
      
      const scrollElement = scrollRef.current;
      scrollElement.addEventListener('scroll', handleScroll);
      
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Función para obtener la referencia de una tarjeta
  const getCardRef = (id) => {
    if (!cardRefs.current[id]) {
      cardRefs.current[id] = React.createRef();
    }
    return cardRefs.current[id];
  };

  // Función para mantener la posición de scroll basada en el ID de la tarjeta
  const maintainScrollPosition = (id) => {
    if (!scrollRef.current) return;
    
    const cardRef = cardRefs.current[id];
    if (!cardRef || !cardRef.current) return;
    
    // Esperar a que los cambios de DOM se hayan aplicado
    setTimeout(() => {
      const card = cardRef.current;
      const scrollContainer = scrollRef.current;
      
      // Calculamos la posición de la tarjeta relativa al scroll container
      const cardLeft = card.offsetLeft;
      const containerWidth = scrollContainer.clientWidth;
      const cardWidth = card.offsetWidth;
      
      // Centramos la tarjeta en la pantalla
      const scrollTo = cardLeft - (containerWidth/2) + (cardWidth/2);
      
      // Aseguramos una transición suave
      scrollContainer.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }, 20);
  };

  // Expandir/contraer tarjeta con animación
  const toggleExpand = (item) => {
    // Si ya hay una tarjeta expandida y es la misma que queremos cerrar
    if (expandedItem && expandedItem.id === item.id) {
      setIsClosing(true);
      
      // Mantenemos la posición basada en el ID cuando cerramos
      setTimeout(() => {
        setExpandedItem(null);
        setIsClosing(false);
        // Esperamos a que la animación de cierre termine para mantener la posición
        setTimeout(() => maintainScrollPosition(item.id), 100);
      }, 300);
    } else {
      // Establecemos la nueva tarjeta expandida
      setExpandedItem(item);
      setIsClosing(false);
      
      // Mantenemos la posición basada en el ID cuando abrimos
      setTimeout(() => maintainScrollPosition(item.id), 100);
    }
  };

  // Variantes para la animación de las tarjetas individuales
  const cardVariants = {
    initial: (i) => ({
      rotateZ: i % 2 === 0 ? -2 : 2,
      y: 0
    }),
    animate: (i) => ({
      rotateZ: [
        i % 2 === 0 ? -2 : 2,
        i % 2 === 0 ? -5 : 5,
        i % 2 === 0 ? -2 : 2
      ],
      y: [0, -5, 0],
      transition: {
        rotateZ: { duration: 0.5, ease: "easeOut" },
        y: { duration: 0.5, ease: "easeOut" }
      }
    }),
    expanded: {
      rotateZ: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Componente para la tarjeta expandida
  const ExpandedCard = ({ item }) => {
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ width: '16rem', opacity: 0.7, scale: 0.9 }}
        animate={{ 
          width: isMobile ? '16rem' : '42rem', 
          opacity: 1,
          rotateZ: 0,
          scale: 1
        }}
        exit={{ 
          width: '16rem', 
          opacity: 0,
          scale: 0.9,
          transition: { 
            duration: 0.3, 
            ease: "easeOut" 
          }
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeOut"
        }}
        ref={expandedCardRef}
        variants={cardVariants}
        whileInView="expanded"
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-stretch relative`}>
          {/* Imagen */}
          <div className={isMobile ? "w-full h-56" : "w-64"}>
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Contenido */}
          <div className="flex-1 p-6 flex flex-col max-h-96 overflow-y-auto">
            <button
              onClick={() => toggleExpand(item)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200/20"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            
            <p className="text-sm mb-2">{item.subtitle}</p>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 px-4 bg-[var(--color-10)]/10">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
          style={{ color: 'var(--color-main)' }}
        >
          {title}
        </motion.h2>
        
        {/* Indicadores de scroll */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: 'var(--color-9)' }}>
              Desliza para ver más
            </span>
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-6 flex items-center justify-center"
              style={{ color: 'var(--color-1)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
        
        {/* Contenedor que simula la pared donde están "colgadas" las tarjetas */}
        <div className="relative">
          {/* Línea decorativa que simula donde están colgadas las tarjetas */}
          <div 
            className="absolute top-8 left-0 right-0 h-1"
            style={{ backgroundColor: 'var(--color-6)' }}
          ></div>
          
          {/* Contenedor con scroll horizontal */}
          <div 
            ref={scrollRef} 
            className="overflow-x-auto pb-12 pt-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Contenedor de tarjetas */}
            <div 
              ref={containerRef}
              className={`flex gap-8 px-4 py-8 min-w-max ${isMobile ? 'items-start' : ''}`}
            >
              {testimonials.map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative"
                  ref={getCardRef(item.id)}
                >
                  {/* Elementos decorativos (hilo y chincheta) siempre visibles */}
                  <div className="flex flex-col items-center">
                    {/* Elemento decorativo: "hilo" del que cuelga la tarjeta */}
                    <div 
                      className="w-px h-8 mb-1"
                      style={{ backgroundColor: 'var(--color-9)' }}
                    ></div>
                    
                    {/* Elemento decorativo: "chincheta" para sujetar la tarjeta */}
                    <div 
                      className="w-3 h-3 rounded-full mb-1 shadow-md"
                      style={{ backgroundColor: 'var(--color-3)' }}
                    ></div>
                  </div>
                  
                  {/* Para cada testimonio, mostramos solo una versión: la normal o la expandida */}
                  <AnimatePresence mode="wait">
                    {expandedItem && expandedItem.id === item.id && !isClosing ? (
                      <ExpandedCard item={item} />
                    ) : (
                      <motion.div 
                        className="cursor-pointer"
                        custom={index}
                        variants={cardVariants}
                        initial="initial"
                        animate={direction.current !== 0 ? "animate" : "initial"}
                        whileInView="animate"
                        viewport={{ once: false, amount: 0.3 }}
                        onClick={() => toggleExpand(item)}
                        transition={{ 
                          duration: 0.6, 
                          ease: "easeOut"
                        }}
                      >
                        {/* La tarjeta original manteniendo su estilo */}
                        <div className="w-64 shadow-lg">
                          <TiltedCard 
                            image={item.image}
                            subtitle={item.subtitle}
                            title={item.title}
                            description={item.description}
                            tiltDegree={0}
                            hoverEffect={false}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos CSS para ocultar la barra de scroll y ajustar contenido */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ScrollingSection;