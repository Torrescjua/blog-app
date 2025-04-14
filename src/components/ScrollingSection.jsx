import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltedCard from './TiltedCard';

const testimonialsData = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    subtitle: "Cliente 1",
    title: "Excelente Servicio",
    description: "¡Increíble atención y resultados! La experiencia ha sido transformadora."
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    subtitle: "Cliente 2",
    title: "Muy Profesional",
    description: "Realmente superaron mis expectativas. La calidad y detalle son incomparables."
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    subtitle: "Cliente 3",
    title: "Recomendado",
    description: "La mejor decisión para impulsar nuestro proyecto. Todo funcionó a la perfección."
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    subtitle: "Cliente 1",
    title: "Excelente Servicio",
    description: "¡Increíble atención y resultados! La experiencia ha sido transformadora."
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    subtitle: "Cliente 2",
    title: "Muy Profesional",
    description: "Realmente superaron mis expectativas. La calidad y detalle son incomparables."
  },
  {
    id: 6,
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    subtitle: "Cliente 3",
    title: "Recomendado",
    description: "La mejor decisión para impulsar nuestro proyecto. Todo funcionó a la perfección."
  },
  // Puedes agregar más testimonios si lo deseas
];

const ScrollingSection = () => {
  // Referencia al contenedor de scroll horizontal
  const scrollRef = useRef(null);
  // Obtiene el progreso del scroll horizontal
  const { scrollXProgress } = useScroll({ container: scrollRef });
  // Mapea el progreso del scroll a un desplazamiento en X inverso para dar el efecto de "colgado"
  const containerX = useTransform(scrollXProgress, [0, 1], [0, -100]);

  return (
    <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold text-center mb-8"
      >
        Testimonios
      </motion.h2>
      
      {/* Contenedor con scroll horizontal */}
      <div 
        ref={scrollRef} 
        className="overflow-x-auto pb-8"
      >
        {/* Contenedor que se mueve en sentido inverso al scroll */}
        <motion.div 
          style={{ x: containerX }}
          className="flex gap-8"
        >
          {testimonialsData.map((item) => (
            <motion.div key={item.id} className="min-w-[300px]">
              <TiltedCard 
                image={item.image}
                subtitle={item.subtitle}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollingSection;
