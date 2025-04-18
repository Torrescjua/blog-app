import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import logo from '../assets/icono_logo.webp';

const Navbar = ({ isMapVisible, onCTAClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  /* -------- enlaces -------- */
  const blogNavLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Nuestro Propósito' },
    { href: '#legacy', label: 'Patrimonio Local' },
    { href: '#testimonials', label: 'Testimonios' },
  ];

  const mapNavLinks = [
    { href: '#routes', label: 'Todas las Rutas' },
/*     { href: '#natural', label: 'Patrimonio Natural' },
    { href: '#cultural', label: 'Patrimonio Cultural' },
    { href: '#favorites', label: 'Mis Favoritos' }, */
  ];

  useEffect(() => {
    setActiveLink(isMapVisible ? '#routes' : '#home');
  }, [isMapVisible]);

  const navLinks = isMapVisible ? mapNavLinks : blogNavLinks;
  const buttonText = isMapVisible ? 'Ir al blog' : 'Rutas Turísticas';
  const buttonBg   = isMapVisible ? 'bg-[var(--color-10)]' : 'bg-[var(--color-1)]';

  return (
    <motion.nav
      variants={fadeIn('down', 0.2)}
      initial="hidden"
      animate="show"
      className="fixed top-0 left-0 right-0 bg-[var(--color-2)] backdrop-blur-sm z-50
                 border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20
                      flex items-center justify-between">
        {/* -------- logo -------- */}
        <motion.div
          variants={fadeIn('right', 0.3)}
          whileHover={{ scale: 0.85 }}
          className="flex items-center h-full cursor-pointer"
          onClick={() => window.location.reload()} 
        >
          <img
            src={logo}
            alt="Raíces de Florida"
            className="h-auto max-h-full object-contain"
          />
        </motion.div>

        {/* -------- botón móvil -------- */}
        <motion.button
          variants={fadeIn('left', 0.3)}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen
            ? <HiX  className="h-6 w-6 text-[var(--color-1)]" />
            : <HiMenu className="h-6 w-6 text-[var(--color-1)]" />
          }
        </motion.button>

        {/* -------- enlaces + CTA escritorio -------- */}
        <motion.div
          variants={fadeIn('down', 0.3)}
          className="hidden md:flex items-center space-x-10"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              variants={fadeIn('down', 0.1 * (i + 1))}
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
            >
              {link.label}
            </motion.a>
          ))}

          <motion.button
            variants={fadeIn('left', 0.3)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCTAClick}
            className={`
              ${buttonBg} text-[var(--color-2)]
              px-5 py-2.5 rounded-lg text-sm font-medium
              hover:opacity-90 transition-all shadow-md
            `}
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </div>

      {/* -------- menú móvil -------- */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-[var(--color-2)] border-t border-gray-100 py-4"
        >
          <motion.div
            variants={fadeIn('down', 0.3)}
            className="container mx-auto px-4 space-y-4"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                variants={fadeIn('right', 0.1 * (i + 1))}
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
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              variants={fadeIn('up', 0.4)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
