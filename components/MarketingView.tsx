import React from 'react';
import MarketingIcon from './icons/MarketingIcon';

const MarketingView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full mr-4">
          <MarketingIcon />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Plan Estratégico de Marketing</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Herramientas y plantillas para definir su marca, identificar su mercado objetivo y crear estrategias de comunicación que impulsen el crecimiento de su negocio.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Definición de Marca</h3>
            <p className="text-gray-600 text-sm">Utilice nuestras plantillas guiadas para construir una identidad de marca sólida y coherente.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Acceder a Plantillas</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Análisis de Mercado</h3>
            <p className="text-gray-600 text-sm">Herramientas para identificar su público objetivo y analizar a sus competidores clave.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Iniciar Análisis</button>
        </div>
         <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Estrategia de Contenidos</h3>
            <p className="text-gray-600 text-sm">Desarrolle un plan de comunicación efectivo para atraer y retener clientes.</p>
            <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">Crear Estrategia</button>
        </div>
      </div>

    </div>
  );
};

export default MarketingView;