import React from 'react'
import logo from '../assets/logo_bg_blanco.webp'

const FrontPage = () => {
  return (
    <section
      id="home"
      className="pt-12 pb-12 min-h-screen w-full bg-gradient-to-r from-[var(--color-2)] to-[var(--color-5)]"
    >
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Column */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-1)]">
            Descubre la magia de Florida, Valle del Cauca
          </h1>
          <p className="text-base md:text-lg max-w-xl text-[var(--color-3)]">
            Un lugar donde tradiciones, naturaleza y cultura se entrelazan para crear un destino único.
            Vive la esencia cultural, explora sus paisajes y sumérgete en una experiencia inolvidable.
          </p>
        </div>

        {/* Right Column - Imagen representativa */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 pl-0 md:pl-12 flex justify-center">
          <div className="relative">
            <img
              src={logo}
              alt="Paisaje de Florida, Valle del Cauca"
              className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300 shadow-2xl max-w-sm"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default FrontPage
