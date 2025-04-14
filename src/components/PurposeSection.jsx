
const PurposeSection = () => {
  const features = [
    {
        icon: "🏛️",
        title: "Valoración del Patrimonio",
        description:
            "Realizamos un inventario de la riqueza natural y cultural de Florida, destacando sus ríos, montañas, haciendas y tradiciones que conforman su identidad histórica y artística.",
    },
    {
        icon: "🌱",
        title: "Turismo Cultural Sostenible",
        description:
          "Proponemos estrategias de difusión que impulsen la economía local, con la comunidad como protagonista, promoviendo un turismo inclusivo y responsable.",
    }
  ];

  return (
    <section id="about" className="w-full bg-[var(--color-10)]/10 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div 
          className="grid md:grid-cols-3 grid-cols-1 gap-8"
        >
          <div>
            <div 
              className="text-sm text-[color-10] font-medium mb-2"
            >
              NUESTRO PROPÓSITO
            </div>
            <h2 
              className="text-3xl md:w-4/5 md:text-4xl font-bold text-gray-900"
            >
              Potenciamos el patrimonio de Florida, Valle del Cauca
            </h2>
          </div>

          <div 
            className="col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4"
              >
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-lg"
                >
                  {feature.icon}
                </div>
                <div >
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-gray-600"
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;

