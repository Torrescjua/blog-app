import React, { useState } from 'react';
import logo from '../assets/logo_bg_blanco.webp';

function TiltedCard({
  image = logo,
  subtitle = "Colombia",
  title = "Unidad VI",
  description = "Aquí puedes mostrar la información detallada relacionada con la tarjeta. Por ejemplo, describir el contenido histórico, cultural o cualquier dato de interés que desees."
}) {
  const [showModal, setShowModal] = useState(false);

  // Maneja la apertura/cierre del modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex flex-col items-center">
      {/* Tarjeta sin inclinación */}
      <div
        onClick={handleOpenModal}
        className="w-64 relative cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        {/* Sección superior: Imagen en cuadrado con margen interno */}
        <div className="relative w-full aspect-square overflow-hidden p-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Subtítulo en la esquina superior izquierda */}
          <p className="absolute top-2 left-2 text-white text-sm font-semibold drop-shadow">
            {subtitle}
          </p>
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
          <div className="bg-white p-6 rounded shadow-xl max-w-sm w-full relative">
            <h2 className="text-xl font-bold mb-4">Información</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <button
              onClick={handleCloseModal}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiltedCard;
