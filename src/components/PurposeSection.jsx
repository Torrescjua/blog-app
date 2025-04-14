import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

import { MdOutlineTurnedIn } from "react-icons/md";

const PurposeSection = () => {
  const features = [
    {
      icon: <MdOutlineTurnedIn className="w-8 h-8 text-[var(--color-10)]" />,
      title: "Valoración del Patrimonio",
      description:
        "Realizamos un inventario de la riqueza natural y cultural de Florida, destacando sus ríos, montañas, haciendas y tradiciones que conforman su identidad histórica y artística.",
    },
    {
      icon: <MdOutlineTurnedIn className="w-8 h-8 text-[var(--color-10)]" />,
      title: "Turismo Cultural Sostenible",
      description:
        "Proponemos estrategias de difusión que impulsen la economía local, con la comunidad como protagonista, promoviendo un turismo inclusivo y responsable.",
    },
  ];

  return (
    <motion.section
      id="about"
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
      className="w-full bg-[var(--color-10)]/10 py-16 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {/* Left Column: Título y subtítulo */}
          <motion.div variants={fadeIn('right', 0.3)}>
            <div className="text-sm text-[var(--color-10)] font-medium mb-2">
              NUESTRO PROPÓSITO
            </div>
            <motion.h2 
              variants={textVariant(0.3)}
              className="text-3xl md:w-4/5 md:text-4xl font-bold text-gray-900"
            >
              Potenciamos el patrimonio de Florida, Valle del Cauca
            </motion.h2>
          </motion.div>

          {/* Right Column: Características */}
          <motion.div 
            variants={fadeIn('left', 0.3)}
            className="col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 0.4 + index * 0.1)}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PurposeSection;
