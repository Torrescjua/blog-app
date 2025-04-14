import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/icono_logo.webp';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#about", label: "Nuestro Propósito" },
    { href: "#Payr", label: "Pratimonio Local" },
    { href: "#cMap", label: "Rutas" },
    { href: "#testimonials", label: "Testimonios" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--color-2)] backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      {/* Contenedor principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo (alineado a la izquierda) */}
        <div className="flex items-center h-full space-x-2 overflow-hidden">
          <img
            src={logo}
            alt="Raíces de Florida"
            className="h-auto max-h-full object-contain"
          />
        </div>

        {/* Botón del menú móvil */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6 text-[var(--color-1)]" />
          ) : (
            <HiMenu className="h-6 w-6 text-[var(--color-1)]" />
          )}
        </button>

        {/* Menú de navegación para pantallas grandes */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`
                text-sm font-medium relative 
                after:absolute after:bottom-0 after:left-0 
                after:h-0.5 after:w-0 hover:after:w-full after:bg-[var(--color-1)] after:transition-all
                ${activeLink === link.href 
                  ? 'text-[var(--color-1)] after:w-full' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`
                  block text-sm font-medium py-2 
                  ${activeLink === link.href 
                    ? 'text-[var(--color-1)]' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
