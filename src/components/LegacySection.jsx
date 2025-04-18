import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from "../utils/motion";

// Íconos de ejemplo, puedes reemplazarlos por los que desees
import { GiMountainCave } from 'react-icons/gi';   // Patrimonio Natural
import { GiGreekTemple } from 'react-icons/gi';   // Cultural Material Inmueble
import { FaPaintBrush } from 'react-icons/fa';    // Cultural Material Mueble
import { FaTheaterMasks } from 'react-icons/fa';  // Cultural Inmaterial

const LegacySection = () => {
  // Definimos nuestro estado para manejar el modal
  const [showModal, setShowModal] = useState(false);
  const [selectedPatrimony, setSelectedPatrimony] = useState(null);

  // Maneja la apertura del modal
  const handleOpenModal = (index) => {
    setSelectedPatrimony(services[index]);
    setShowModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatrimony(null);
  };

  // Información de los 4 tipos de patrimonio
  const services = [
    {
      icon: <GiMountainCave className="w-8 h-8 text-green-600" />,
      title: "Patrimonio Natural",
      description: "Recursos y espacios naturales (ríos, montañas, reservas) que representan la riqueza medioambiental de Florida.",
      link: "#patrimonio-natural",
      details: `Incluye elementos como bosques, ríos, montañas y fauna local. 
                Su conservación garantiza la diversidad biológica, el equilibrio 
                ecológico y el disfrute de futuras generaciones.`
    },
    {
      icon: <GiGreekTemple className="w-8 h-8 text-yellow-600" />,
      title: "Cultural Material Inmueble",
      description: "Construcciones y monumentos de valor histórico o artístico, como edificaciones, haciendas o capillas.",
      link: "#material-inmueble",
      details: `Este tipo de patrimonio abarca edificaciones de relevancia 
                histórica, arquitectónica y cultural (por ejemplo, haciendas, 
                iglesias y monumentos) que se asocian directamente con la memoria 
                colectiva y la identidad local.`
    },
    {
      icon: <FaPaintBrush className="w-8 h-8 text-pink-500" />,
      title: "Cultural Material Mueble",
      description: "Objetos artísticos o históricos (pinturas, esculturas, artesanías) que representan la identidad de la región.",
      link: "#material-mueble",
      details: `Son piezas portátiles o trasladables, como obras de arte, 
                artesanías, documentos y colecciones. Representan la expresión 
                creativa y el legado material de la comunidad local.`
    },
    {
      icon: <FaTheaterMasks className="w-8 h-8 text-purple-500" />,
      title: "Cultural Inmaterial",
      description: "Tradiciones, expresiones artísticas y conocimientos transmitidos de generación en generación.",
      link: "#inmaterial",
      details: `Incluye festivales, rituales, gastronomía, música, danzas y 
                otras manifestaciones culturales que unen a la comunidad, 
                reflejando sus creencias e historia compartida.`
    }
  ];

  return (
    <section className="py-5 container mx-auto px-2 sm:px-6 lg:px-8">
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24"
      >
        {/* Header */}
        <motion.div 
          variants={fadeIn('right', 0.2)}
          className="md:w-1/3"
        >
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-3xl md:text-4xl font-bold mb-6 md:w-4/5"
          >
            Tipos de Patrimonio en Florida
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.2)}
            className="text-gray-600 text-lg mb-4 md:w-4/5"
          >
            Explora la diversidad cultural y natural que define la riqueza patrimonial de la región, y descubre cómo cada tipo contribuye a su identidad.
          </motion.p>
          <motion.div 
            variants={fadeIn('up', 0.2)}
            className="space-y-3"
          >
            <motion.div 
              variants={fadeIn('right', 0.2)}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-1)]"></div>
              </div>
              <span className="text-gray-600">Protege el legado natural</span>
            </motion.div>
            <motion.div 
              variants={fadeIn('right', 0.2)}
              className="flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-1)]"></div>
              </div>
              <span className="text-gray-600">Conserva la memoria cultural</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={fadeIn('left', 0.2)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', 0.2 * (index + 1))}
              whileHover={{ scale: 1.05 }}
              className="bg-white max-w-72 cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleOpenModal(index)}
            >
              <motion.div 
                variants={fadeIn('down', 0.2 * (index + 1))}
                className="mb-4"
              >
                {service.icon}
              </motion.div>
              <motion.h3 
                variants={textVariant(0.2)}
                className="text-xl font-semibold mb-2"
              >
                {service.title}
              </motion.h3>
              <motion.p 
                variants={fadeIn('up', 0.2 * (index + 1))}
                className="text-gray-600 mb-4"
              >
                {service.description}
              </motion.p>
              {/* Botón para abrir el modal */}
              <motion.button 
                variants={fadeIn('up', 0.2 * (index + 1))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenModal(index)}
                className="text-[var(--color-1)] font-medium hover:text-green-900 transition-colors"
              >
                APRENDE MÁS
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal emergente */}
      {showModal && selectedPatrimony && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
            className="bg-white p-6 rounded shadow-xl max-w-md w-full relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-xl"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-1)]">
              {selectedPatrimony.title}
            </h3>
            <p className="text-gray-700 mb-6">
              {selectedPatrimony.details}
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-[var(--color-1)] text-white px-6 py-2 rounded-lg hover:bg-green-900 transition-colors"
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default LegacySection;
