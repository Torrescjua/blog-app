import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import logo from '../assets/icono_logo.webp';

const Navbar = ({ isMapVisible, onCTAClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  // Enlaces para la vista de blog (normal)
  const blogNavLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Nuestro Propósito' },
    { href: '#legacy', label: 'Patrimonio Local' },
    { href: '#testimonials', label: 'Testimonios' },
  ];

  // Enlaces para la vista de mapa
  const mapNavLinks = [
/*     { href: '#routes', label: 'Todas las Rutas' },
    { href: '#natural', label: 'Patrimonio Natural' },
    { href: '#cultural', label: 'Patrimonio Cultural' },
    { href: '#favorites', label: 'Mis Favoritos' }, */
  ];

  // Reiniciar el enlace activo cuando cambiamos entre mapa y blog
  useEffect(() => {
    // Cuando cambiamos de vista, establecer el primer enlace como activo
    setActiveLink(isMapVisible ? '#routes' : '#home');
  }, [isMapVisible]);

  // Seleccionar navLinks según el estado actual
  const navLinks = isMapVisible ? mapNavLinks : blogNavLinks;

  // Cambia texto y color según estado
  const buttonText = isMapVisible ? 'Ir al blog' : 'Rutas Turísticas';
  const buttonBg = isMapVisible ? 'bg-[var(--color-10)]' : 'bg-[var(--color-1)]';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--color-2)] backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center h-full cursor-pointer">
          <img src={logo} alt="Raíces de Florida" className="h-auto max-h-full object-contain" />
        </div>

        {/* Botón móvil */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(open => !open)}
        >
          {isMenuOpen
            ? <HiX className="h-6 w-6 text-[var(--color-1)]" />
            : <HiMenu className="h-6 w-6 text-[var(--color-1)]" />
          }
        </button>

        {/* Enlaces y CTA escritorio */}
        <div className="hidden md:flex items-center space-x-10">
          {/* Enlaces de blog */}
          {!isMapVisible && blogNavLinks.map((link, i) => (
            <a
              key={`blog-${link.href}`}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`
                relative text-sm font-medium
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                after:bg-[var(--color-1)] after:transition-all
                ${activeLink === link.href
                  ? 'text-[var(--color-1)] after:w-full'
                  : 'text-gray-600 hover:text-gray-900'}
              `}
            >{link.label}</a>
          ))}
          
          {/* Enlaces de mapa */}
          {isMapVisible && mapNavLinks.map((link, i) => (
            <a
              key={`map-${link.href}`}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`
                relative text-sm font-medium
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                after:bg-[var(--color-1)] after:transition-all
                ${activeLink === link.href
                  ? 'text-[var(--color-1)] after:w-full'
                  : 'text-gray-600 hover:text-gray-900'}
              `}
            >{link.label}</a>
          ))}

          {/* CTA botón */}
          <button
            onClick={onCTAClick}
            className={`
              ${buttonBg} text-[var(--color-2)]
              px-5 py-2.5 rounded-lg text-sm font-medium
              hover:opacity-90 transition-all shadow-md
            `}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--color-2)] border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navLinks.map((link, i) => (
              <a
                key={`mobile-${link.href}`}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`
                  block text-sm font-medium py-2
                  ${activeLink === link.href
                    ? 'text-[var(--color-1)]'
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >{link.label}</a>
            ))}

            {/* CTA móvil */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onCTAClick();
              }}
              className={`
                w-full text-center
                ${buttonBg} text-[var(--color-2)]
                px-4 py-2.5 rounded-lg text-sm font-medium
                hover:opacity-90 transition-all shadow-md
              `}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;