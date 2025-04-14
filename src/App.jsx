import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FrontPage from './components/frontPage';
import TiltedCard from './components/TiltedCard';
import Footer from './components/Footer';

function App() {
  return (
    <main>
      <Navbar />
      <div className="h-15"></div>
      <FrontPage />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-10">
{/*             <TiltedCard 
              image="https://turismovalledelcauca.com/wp-content/uploads/2020/01/foto-florida-municipio-turismo-valle-del-cauca-colombia4.jpg"
              title="Iglesia"
              description="Aquí se muestra información detallada sobre la Unidad VI, su contenido histórico y cultural."
            />
            <TiltedCard
              image="https://travel.valledelcauca.gov.co/storage/Clientes/Gobernacion/ValleCTravel/imagenes/contenidos/2181-Florida_Valle_del_Cauca_2E.jpg"
              title='Casas'
              description='Aquí se muestra información detallada sobre la Unidad VI, su contenido histórico y cultural.'
            /> */}
          </div>
        </div>
      <Footer/>
    </main>
  );
}

export default App;
