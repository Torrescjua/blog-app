import React from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

function MapWithFlags() {
    return (
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 py-20 mt-20"
        >
          <div className="w-full h-[70vh] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
            {/* Aquí iría tu mapa real, esto es solo un placeholder */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Mapa de Rutas Turísticas
              {/* Integrar aquí Google Maps, Mapbox u otra librería de mapas */}
            </div>
          </div>
        </motion.div>
      );
}

export default MapWithFlags;
