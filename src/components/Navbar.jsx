import React, { useState } from 'react';
import logo from '../assets/icono_logo.webp'; // Asegúrate de que el logo esté importado correctamente

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg-logo backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      {/* Contenedor principal */}
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        
        {/* Logo alineado a la izquierda */}
        <div className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Raíces de Florida" 
            className="h-full md:h-16 lg:h-20 object-contain" 
          />
        </div>

        {/* Menú de navegación a la derecha */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-[#475c39] hover:text-gray-700">Inicio</a>
          <a href="#about" className="text-[#475c39] hover:text-gray-700">Sobre Nosotros</a>
          <a href="#contact" className="text-[#475c39] hover:text-gray-700">Contactar</a>
        </div>

        {/* Botón del menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-green-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white p-4`}
      >
        <a href="#home" className="block text-green-700 py-2 hover:text-gray-700">Inicio</a>
        <a href="#about" className="block text-green-700 py-2 hover:text-gray-700">Sobre Nosotros</a>
        <a href="#contact" className="block text-green-700 py-2 hover:text-gray-700">Contactar</a>
      </div>
    </nav>
  );
}

export default Navbar;
