import React from 'react';

const MarketingView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Plan Estratégico de Marketing</h2>
      <p className="text-gray-600">
        Este módulo le proporcionará las herramientas y plantillas necesarias para definir su marca,
        identificar su mercado objetivo y crear estrategias de comunicación que impulsen el crecimiento
        de su negocio.
      </p>
      <div className="mt-8 text-center">
        <div className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-full">
          Módulo Próximamente
        </div>
      </div>
    </div>
  );
};

export default MarketingView;