import React, { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

function TiltedCard({
  image = "https://via.placeholder.com/250",
  subtitle = "Colombia",
  title = "Unidad VI",
  description = "Aquí puedes mostrar la información detallada relacionada con la tarjeta. Por ejemplo, describir el contenido histórico, cultural o cualquier dato de interés que desees.",
  hoverEffect = true
}) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  // Abre y cierra el modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Cierra el modal con la tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showModal]);

  // Cierra el modal al hacer clic fuera
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
  }, [showModal]);

  return (
    <div className="flex flex-col items-center">
      {/* Tarjeta sin inclinación, con hover effect al contenedor */}
      <div
        onClick={handleOpenModal}
        onKeyDown={(e) => e.key === 'Enter' && handleOpenModal()}
        role="button"
        tabIndex={0}
        className="w-64 relative cursor-pointer overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
      >
        {/* Sección superior: Imagen en marco con margen interno */}
        <div className="relative w-full aspect-square overflow-hidden p-2">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
            whileHover={hoverEffect ? { scale: 1.05 } : {}}
          />
          {/* Subtítulo en la esquina superior izquierda */}
          <p className="absolute top-4 left-4 text-white text-sm font-bold drop-shadow">
            {subtitle}
          </p>
          {/* Icono de info */}
          <div className="absolute bottom-4 right-4 bg-white/80 rounded-full p-1 text-gray-800 hover:bg-white">
            <Info size={18} />
          </div>
        </div>

        {/* Sección inferior: Título */}
        <div className="bg-white w-full p-4 shadow-md">
          <h3 className="font-bold text-gray-800 text-lg text-center">
            {title}
          </h3>
        </div>
      </div>

      {/* Modal emergente */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <motion.div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-xl max-w-sm w-full relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
            
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            
            <div className="mb-6">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-700">{description}</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors flex items-center gap-2"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default TiltedCard;
