import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../utils/map-icons';

function MapWithFlags() {
  // Coordenadas aproximadas de Valle de Florida, Colombia
  const position = [3.3232, -76.2327]; // Ajusta estas coordenadas con las exactas de Valle de Florida
  
  // Efecto para asegurar que el mapa tenga un z-index bajo
  useEffect(() => {
    // Aplicar estilos específicos al mapa después de que se haya montado
    const mapElements = document.querySelectorAll('.leaflet-container');
    mapElements.forEach(element => {
      element.style.zIndex = '10';
    });
  }, []);
  
  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-20 mt-20"
    >
      <div 
        className="w-full h-[70vh] bg-gray-200 rounded-xl shadow-lg overflow-hidden"
        style={{ position: 'relative', zIndex: 10 }} // z-index bajo para el contenedor del mapa
      >
        {/* Implementación con React Leaflet */}
        <MapContainer 
          center={position} 
          zoom={13} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', zIndex: 5 }} // z-index bajo para el mapa
          className="z-10" // Clase con z-index bajo
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Valle de Florida, Colombia <br /> Destino turístico.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
}

export default MapWithFlags;