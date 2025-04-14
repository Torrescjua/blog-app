import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";
import logo from '../assets/icono_logo.webp';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#about", label: "Nuestro Propósito" },
    { href: "#legacy", label: "Pratimonio Local" },
    { href: "#cMap", label: "Rutas" },
    { href: "#testimonials", label: "Testimonios" },
  ];

  return (
    <motion.nav 
      variants={fadeIn('down', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bg-[var(--color-2)] backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo (alineado a la izquierda) */}
        <motion.div 
          variants={fadeIn('right', 0.3)}
          className="flex items-center h-full space-x-2 overflow-hidden cursor-pointer"
        >
          <img
            src={logo}
            alt="Raíces de Florida"
            className="h-auto max-h-full object-contain"
          />
        </motion.div>
        
        {/* Botón del menú móvil */}
        <motion.button 
          variants={fadeIn('left', 0.3)}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6 text-[var(--color-1)]" />
          ) : (
            <HiMenu className="h-6 w-6 text-[var(--color-1)]" />
          )}
        </motion.button>

        {/* Navigation Links - Desktop */}
        <motion.div 
          variants={fadeIn('down', 0.3)}
          className="hidden md:flex space-x-10"
        >
          {navLinks.map((link, index) => (
            <motion.a 
              key={index}
              variants={fadeIn('down', 0.1 * (index + 1))}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[var(--color-1)] after:transition-all
                ${activeLink === link.href ? 'text-[var(--color-1)] after:w-full' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-white border-t border-gray-100 py-4"
        >
          <motion.div 
            variants={fadeIn('down', 0.3)}
            className="container mx-auto px-4 space-y-4"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                variants={fadeIn('right', 0.1 * (index + 1))}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`block text-sm font-medium py-2 
                  ${activeLink === link.href ? 'text-[var(--color-1)]' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
