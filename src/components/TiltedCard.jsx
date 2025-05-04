import React, { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function TiltedCard({
  image = "https://via.placeholder.com/250",
  subtitle = "Colombia",
  title = "Unidad VI",
  description = "Aquí puedes mostrar la información detallada relacionada con la tarjeta.",
  hoverEffect = true,
  tiltDegree = 0
}) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  
  // Utilizar useCallback para funciones de manejo para evitar re-renders innecesarios
  const handleOpenModal = React.useCallback(() => setShowModal(true), []);
  const handleCloseModal = React.useCallback(() => setShowModal(false), []);

  // Efecto para escuchar tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showModal, handleCloseModal]);

  // Efecto para clicks fuera del modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal, handleCloseModal]);

  // Variantes para animaciones de hover más suaves
  const cardVariants = {
    rest: {
      scale: 1,
      rotateZ: tiltDegree,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    hover: {
      scale: 1.05,
      rotateZ: tiltDegree / 2, // Reduce la rotación al hacer hover
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };
  
  // Variantes para la imagen
  const imageVariants = {
    rest: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    hover: { 
      scale: 1.08,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };

  // Variantes para el modal
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 25,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  };

  // Variantes para los elementos hijos del modal
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Tarjeta con optimizaciones de animación */}
      <motion.div
        initial="rest"
        whileHover={hoverEffect ? "hover" : "rest"}
        variants={cardVariants}
        onClick={handleOpenModal}
        onKeyDown={(e) => e.key === 'Enter' && handleOpenModal()}
        role="button"
        tabIndex={0}
        className="w-64 relative cursor-pointer overflow-hidden shadow-lg rounded-lg"
        style={{ 
          willChange: 'transform',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Sección superior: Imagen en marco con margen interno */}
        <div className="relative w-full aspect-square overflow-hidden p-2 bg-gray-50">
          <motion.div 
            className="w-full h-full rounded-md overflow-hidden"
            variants={imageVariants}
            style={{ 
              willChange: 'transform',
              transformOrigin: 'center center'
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </motion.div>
          
          {/* Subtítulo en la esquina superior izquierda */}
          <p className="absolute top-4 left-4 text-white text-sm font-bold drop-shadow">
            {subtitle}
          </p>
          
          {/* Icono de info */}
          <motion.div 
            className="absolute bottom-4 right-4 bg-white/80 rounded-full p-1 text-gray-800 hover:bg-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Info size={18} />
          </motion.div>
        </div>

        {/* Sección inferior: Título */}
        <div className="bg-white w-full p-4 shadow-md">
          <h3 className="font-bold text-gray-800 text-lg text-center">
            {title}
          </h3>
        </div>
      </motion.div>

      {/* Modal emergente con AnimatePresence para transiciones de entrada/salida */}
      <AnimatePresence mode="wait">
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <motion.div
              ref={modalRef}
              className="bg-white p-6 rounded shadow-xl max-w-sm w-full relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                variants={itemVariants}
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Cerrar modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
              
              <motion.div className="mb-4" variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{subtitle}</p>
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <motion.img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  loading="lazy"
                />
                <p className="text-gray-700">{description}</p>
              </motion.div>
              
              <motion.div 
                className="flex justify-end" 
                variants={itemVariants}
              >
                <motion.button
                  onClick={handleCloseModal}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cerrar
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utilizar React.memo para evitar renderizados innecesarios
export default React.memo(TiltedCard);