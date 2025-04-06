import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/icono_logo.webp';

const Footer = () => {
  const footerLinks = {
/*     about: [
      { name: 'Quiénes Somos', href: '#' },
      { name: 'Nuestra Misión', href: '#' },
      { name: 'Visión', href: '#' },
      { name: 'Valores', href: '#' },
    ], */
    discover: [
      { name: 'Rutas', href: '#' },
      { name: 'Eventos', href: '#' },
      { name: 'Testimonios', href: '#' },
    ],
    info: [
      { name: 'FAQ', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Términos de Uso', href: '#' },
    ],
    contact: [
      { name: 'Email', href: '#' },
      { name: 'WhatsApp', href: '#' },
/*       { name: 'Soporte 24h', href: '#' }, */
    ],
  };

  return (
    <footer className="bg-[var(--color-2)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-4 mb-6">
              {/* Contenedor para limitar el tamaño del logo */}
              <div className="max-w-[120px]">
                <img
                  src={logo}
                  alt="Raíces de Florida"
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-[var(--color-3)]">
                Vive una experiencia única donde historia, cultura y naturaleza se
                fusionan en el corazón del Valle del Cauca. Descubre la esencia de Florida.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[var(--color-5)] rounded-full flex items-center justify-center text-[var(--color-1)] hover:bg-[var(--color-1)] hover:text-white transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[var(--color-5)] rounded-full flex items-center justify-center text-[var(--color-1)] hover:bg-[var(--color-1)] hover:text-white transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[var(--color-5)] rounded-full flex items-center justify-center text-[var(--color-1)] hover:bg-[var(--color-1)] hover:text-white transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="text-lg font-medium mb-4 text-[var(--color-1)]">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-[var(--color-3)] hover:text-[var(--color-1)] transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--color-3)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-3)] text-sm">
              Copyright © {new Date().getFullYear()} Raíces de Florida
            </p>
            <p className="text-[var(--color-3)] text-sm">
              Creado por ...
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
