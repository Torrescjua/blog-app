import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import logo from '../assets/logo_bg_blanco.webp';

const FrontPage = () => {
  return (
    <motion.section 
      id="home"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
      className="pt-27 pb-16 min-h-screen w-full"
    >
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Column */}
        <motion.div 
          className="w-full md:w-1/2 space-y-8"
          variants={fadeIn('right', 0.2)}
        >
          <motion.h1 
            variants={textVariant(0.3)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-1)]"
          >
            Descubre la magia de Florida, Valle del Cauca
          </motion.h1>
          <motion.p 
            variants={fadeIn('up', 0.4)}
            className="text-base md:text-lg max-w-xl text-[var(--color-3)]"
          >
            Un lugar donde tradiciones, naturaleza y cultura se entrelazan para crear un destino único.
            Vive la esencia cultural, explora sus paisajes y sumérgete en una experiencia inolvidable.
          </motion.p>
        </motion.div>

        {/* Right Column - Imagen representativa */}
        <motion.div 
          className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12 flex justify-center"
          variants={fadeIn('left', 0.5)}
        >
          <div className="relative">
            <img
              src={logo}
              alt="Paisaje de Florida, Valle del Cauca"
              className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300 shadow-2xl max-w-sm"
            />
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default FrontPage;
