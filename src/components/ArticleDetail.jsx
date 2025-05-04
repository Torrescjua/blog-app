import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

const ArticleDetail = ({ 
  article, 
  isOpen, 
  onClose,
  fullContent = null // Aquí podemos recibir contenido completo o cargarlo dinámicamente
}) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  
  // Efecto para manejar el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll en el body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll cuando se cierra
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Efecto para escuchar clics fuera del modal para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Manejar tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Función para formatear la fecha (ejemplo)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6 bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modal principal */}
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 500 }}
          >
            {/* Header con imagen de fondo */}
            <div 
              className="relative h-64 md:h-72 bg-cover bg-center rounded-t-xl"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${article.image})` 
              }}
            >
              {/* Botones de navegación */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors text-white"
                  aria-label="Volver"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors text-white"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Información del artículo */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm mb-2 opacity-90">{article.subtitle}</p>
                <h1 className="text-2xl md:text-3xl font-bold">{article.title}</h1>
                {article.date && (
                  <p className="text-sm mt-2 opacity-80">{formatDate(article.date)}</p>
                )}
              </div>
            </div>
            
            {/* Contenido del artículo con scroll */}
            <div
              ref={contentRef}
              className="p-6 md:p-8 overflow-y-auto flex-grow"
              style={{ 
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {/* Si tenemos contenido completo lo mostramos, de lo contrario mostramos la descripción */}
              {fullContent ? (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: fullContent }}
                />
              ) : (
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">{article.description}</p>
                  
                  {/* Contenido de ejemplo para demostración, se debe reemplazar con el contenido real */}
                  {article.longDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: article.longDescription }} />
                  ) : (
                    <div className="space-y-4 py-4">
                      <p>
                        Este es un contenido de ejemplo que se mostraría si no hay un contenido 
                        completo proporcionado. En un caso real, aquí iría el texto completo 
                        del artículo que podría cargarse dinámicamente.
                      </p>
                      <p>
                        En una implementación completa, este contenido se podría cargar de forma
                        dinámica desde una API o desde tu sistema de gestión de contenidos cuando
                        el componente se monte.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer con información adicional o botones de acción */}
            <div className="border-t border-gray-200 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {article.author && `Por ${article.author}`}
              </div>
              
              <div className="flex gap-3">
                {article.url && (
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Fuente original
                  </a>
                )}
                
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleDetail;