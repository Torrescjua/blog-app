import React, { useState, useRef, useEffect, useCallback } from "react";
import { Info, X } from "lucide-react";

/**
 * TiltedCard (sin animaciones)
 * - Mantiene la inclinación estática determinada por `tiltDegree`.
 * - Contiene un modal informativo que se abre al hacer click y se cierra con click exterior o tecla ESC.
 */
export default function TiltedCard({
  image = "https://via.placeholder.com/250",
  subtitle = "Colombia",
  title = "Unidad VI",
  description = "Aquí puedes mostrar la información detallada relacionada con la tarjeta.",
  hoverEffect = true, // ya no se usa, pero se mantiene por compatibilidad de props
  tiltDegree = 0,
}) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showModal) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [showModal, handleCloseModal]);

  // Cerrar al hacer click fuera del modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal, handleCloseModal]);

  return (
    <div className="flex flex-col items-center">
      {/* Tarjeta principal */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpenModal}
        onKeyDown={(e) => e.key === "Enter" && handleOpenModal()}
        className="w-64 relative cursor-pointer overflow-hidden shadow-lg rounded-lg select-none"
        style={{
          transform: `rotateZ(${tiltDegree}deg)`,
          backfaceVisibility: "hidden",
        }}
      >
        {/* Imagen */}
        <div className="relative w-full aspect-square overflow-hidden p-2 bg-gray-50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />

          {/* Subtítulo */}
          <p className="absolute top-4 left-4 text-white text-sm font-bold drop-shadow">
            {subtitle}
          </p>

          {/* Icono info (decorativo) */}
          <div className="absolute bottom-4 right-4 bg-white/80 rounded-full p-1 text-gray-800">
            <Info size={18} />
          </div>
        </div>

        {/* Título debajo de la imagen */}
        <div className="bg-white w-full p-4 shadow-md">
          <h3 className="font-bold text-gray-800 text-lg text-center">{title}</h3>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm px-4">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-xl max-w-sm w-full relative"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1 text-gray-800">{title}</h2>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>

            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-md mb-4"
              loading="lazy"
            />
            <p className="text-gray-700 mb-6 whitespace-pre-line">{description}</p>

            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
