import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

import { GiGreekTemple } from 'react-icons/gi';
import { FaHorse } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";

const PurposeSection = () => {
  const features = [
    {
      icon: <GiGreekTemple className="w-8 h-8 text-blue-600" />,
      title: "Valor Histórico",
      description:
        "Un bien posee valor histórico cuando se constituye en documento o testimonio para la reconstrucción de la historia, así como para el conocimiento científico, técnico o artístico. Es la asociación directa del bien con épocas, procesos, eventos y prácticas políticas, económicas, sociales y culturales, además de grupos y personas de especial importancia a nivel mundial, nacional, regional o local."
    },
    {
      icon: <FaPalette className="w-8 h-8 text-red-600" />,
      title: "Valor Estético",
      description:
        "Un bien posee valor estético cuando se reconocen en éste atributos de calidad artística o de diseño que reflejan una idea creativa en su composición, en la técnica de elaboración, o en las huellas de utilización dejadas por el paso del tiempo. Este valor se relaciona con la apreciación de las características formales y físicas del bien y con su materialidad."
    },
    {
      icon: <FaHorse className="w-8 h-8 text-yellow-600" />,
      title: "Valor Simbólico",
      description:
        "Un bien posee valor simbólico cuando manifiesta modos de ver y sentir el mundo, actuando como un fuerte elemento de identificación y cohesión social. Mantiene, renueva y actualiza deseos, emociones e ideales que conectan tiempos y espacios, vinculando el bien con procesos, prácticas o eventos significativos para la memoria y el desarrollo de la comunidad."
    }
  ];

  return (
    <motion.section
      id="legacy"
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl font-bold mb-4"
        >
          Descubre los Valores del Patrimonio Local
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600"
        >
          Cada bien cultural posee dimensiones que enriquecen nuestra historia y fortalecen la identidad de la comunidad. Conoce los valores que lo hacen único: histórico, estético y simbólico.
        </motion.p>
      </motion.div>
      
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.3 * (index + 1))}
            className="flex flex-col items-center p-6"
          >
            <motion.div 
              variants={fadeIn('down', 0.4 * (index + 1))}
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center" 
              style={{ 
                backgroundColor: index === 0 ? '#F1EFFD' : 
                                 index === 1 ? '#FFE7E7' : 
                                 '#FFF3E4'
              }}
            >
              <motion.div 
                variants={fadeIn('up', 0.5 * (index + 1))}
                className="text-3xl"
              >
                {feature.icon}
              </motion.div>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.3)}
              className="text-2xl font-medium mb-3"
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.6 * (index + 1))}
              className="text-gray-500 text-center"
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PurposeSection;
