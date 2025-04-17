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
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      
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
    
    requestAnimationFrame(() => {
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
    });
  };

  // Expandir/contraer tarjeta con animación
  const toggleExpand = (item) => {
    // Si ya hay una tarjeta expandida y es la misma que queremos cerrar
    if (expandedItem && expandedItem.id === item.id) {
      setIsClosing(true);
      
      setTimeout(() => {
        setExpandedItem(null);
        setIsClosing(false);
        requestAnimationFrame(() => maintainScrollPosition(item.id));
      }, 300);
    } else {
      // Establecemos la nueva tarjeta expandida
      setExpandedItem(item);
      setIsClosing(false);
      
      requestAnimationFrame(() => maintainScrollPosition(item.id));
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
        i % 2 === 0 ? -4 : 4,
        i % 2 === 0 ? -2 : 2
      ],
      y: [0, -4, 0],
      transition: {
        rotateZ: { duration: 0.3, ease: "easeInOut" },
        y: { duration: 0.3, ease: "easeInOut" }
      }
    }),
    expanded: {
      rotateZ: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Componente para la tarjeta expandida
  const ExpandedCard = ({ item }) => {
    // Ref para el contenedor de texto
    const textContentRef = useRef(null);

    // Ajuste de padding para dispositivos móviles
    const contentPadding = isMobile ? "pb-8" : "";

    return (
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden origin-center"
        initial={{ 
          width: '16rem',  // Comienza con el tamaño original
          opacity: 0.95,
          scaleX: 1,
          scaleY: 1,
          height: "auto", // Altura automática inicial
          rotateZ: item.id % 2 === 0 ? -2 : 2  // Mantiene la rotación inicial de la tarjeta
        }}
        animate={{ 
          width: isMobile ? '16rem' : '42rem', 
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          height: "auto", // Mantiene altura automática en estado expandido también
          rotateZ: 0  // Endereza la tarjeta al expandirse
        }}
        exit={{ 
          width: '16rem',
          rotateZ: item.id % 2 === 0 ? -2 : 2,  // Vuelve a la rotación original al cerrarse
          scaleY: 0.95,
          opacity: 0.9,
          transition: { 
            duration: 0.3, 
            ease: "easeInOut" 
          }
        }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.4
        }}
        ref={expandedCardRef}
        style={{ 
          willChange: 'transform, width, opacity',
          transformOrigin: 'center top',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          maxHeight: isMobile ? "30rem" : "24rem" // Incrementado para móvil
        }}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-stretch relative`}>
          {/* Imagen con animación y margen añadido */}
          <motion.div 
            className={`${isMobile ? "w-full h-56" : "w-64 h-full"} p-2`} // Añadido padding para crear espacio
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ 
              background: "var(--color-10)/5", // Fondo sutil para la sección de la imagen
            }}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover rounded-md shadow-sm" // Añadido rounded y shadow
              loading="lazy"
            />
          </motion.div>
          
          {/* Contenido con animación - Mejorado para scroll completo en móviles */}
          <motion.div 
            ref={textContentRef}
            className={`flex-1 p-6 ${contentPadding} flex flex-col overflow-y-auto`}
            style={{ 
              maxHeight: isMobile ? "20rem" : "24rem", // Altura ajustada
              WebkitOverflowScrolling: "touch", // Mejora el scroll en iOS
              overscrollBehavior: "contain" // Previene scroll chaining
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <button
              onClick={() => toggleExpand(item)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200/20"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            
            <motion.p 
              className="text-sm mb-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              {item.subtitle}
            </motion.p>
            
            <motion.h3 
              className="text-xl font-bold mb-3"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.2 }}
            >
              {item.title}
            </motion.h3>
            
            <motion.div
              className="mb-6" // Asegura espacio después del texto
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <p>{item.description}</p>
              {/* Div invisible para asegurar espacio de scroll en móviles */}
              {isMobile && <div className="h-4"></div>}
            </motion.div>
          </motion.div>
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
          transition={{ duration: 0.4 }}
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
              transition={{ 
                repeat: Infinity, 
                duration: 1, 
                repeatType: "reverse" 
              }}
              className="w-6 h-6 flex items-center justify-center"
              style={{ 
                color: 'var(--color-1)',
                willChange: 'transform'
              }}
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
          
          {/* Contenedor con scroll horizontal - Configuración mejorada para permitir scroll vertical */}
          <div 
            ref={scrollRef} 
            className="overflow-x-auto pb-12 pt-4 hide-scrollbar"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              touchAction: 'pan-x', // Permitimos el scroll horizontal pero no bloqueamos el vertical
              overscrollBehaviorX: 'contain' // Contiene el overscroll horizontal
            }}
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
                          duration: 0.4, 
                          ease: "easeInOut" 
                        }}
                        style={{ 
                          willChange: 'transform',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                        layout={false}
                      >
                        {/* La tarjeta original manteniendo su estilo */}
                        <div className="w-64 shadow-lg">
                          <TiltedCard 
                            image={item.image}
                            subtitle={item.subtitle}
                            title={item.title}
                            description={item.description}
                            tiltDegree={item.id % 2 === 0 ? -2 : 2}
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