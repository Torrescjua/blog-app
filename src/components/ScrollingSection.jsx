import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import TiltedCard from './TiltedCard'; // Importación del componente TiltedCard

const ScrollingSection = ({ 
  testimonials = [], 
  title = "Testimonios de Clientes",
  // Los estilos se obtienen de las variables CSS globales
}) => {
  // Referencias
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const prevScrollX = useRef(0);
  const direction = useRef(0); // 1: derecha, -1: izquierda, 0: sin movimiento
  
  // Tracking del scroll
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  // Crea un efecto de movimiento más suave
  const smoothScrollProgress = useSpring(scrollXProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const currentScrollX = scrollRef.current.scrollLeft;
      
      // Determinar dirección del scroll
      if (currentScrollX > prevScrollX.current) {
        direction.current = 1; // derecha
      } else if (currentScrollX < prevScrollX.current) {
        direction.current = -1; // izquierda
      }
      
      prevScrollX.current = currentScrollX;
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Variantes para la animación de las tarjetas individuales
  const cardVariants = {
    initial: (i) => ({
      rotateZ: i % 2 === 0 ? -2 : 2, // Alternancia de inclinación inicial
      y: 0
    }),
    animate: (i) => ({
      rotateZ: [
        i % 2 === 0 ? -2 : 2, // Posición inicial alternada
        i % 2 === 0 ? -5 : 5, // Rotación máxima al mover
        i % 2 === 0 ? -2 : 2  // Vuelta a posición original
      ],
      y: [0, -5, 0], // Efecto de rebote sutil
      transition: {
        rotateZ: { duration: 0.5, ease: "easeOut" },
        y: { duration: 0.5, ease: "easeOut" }
      }
    })
  };

  return (
    <section id="testimonials" className="py-16 px-4 bg-[var(--color-10)]/10" >
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
              className="flex gap-8 px-4 py-8 min-w-max"
            >
              {testimonials.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="relative flex flex-col items-center"
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.3 }}
                  animate={direction.current !== 0 ? "animate" : "initial"}
                >
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
                  
                  {/* La tarjeta */}
                  <div className="w-64 shadow-lg">
                    <TiltedCard 
                      image={item.image}
                      subtitle={item.subtitle}
                      title={item.title}
                      description={item.description}
                      tiltDegree={0} // Desactivamos el tilt del componente interno
                      hoverEffect={false} // Desactivamos el efecto hover del componente
                      // Pasamos los colores como props si TiltedCard los acepta
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos CSS para ocultar la barra de scroll */}
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