import React from 'react';

const CybersecurityView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Ciberseguridad</h2>
      <p className="text-gray-600">
        Acceda a protocolos de seguridad y buenas prácticas adaptadas a su negocio para proteger
        la información y los activos digitales de la empresa, asegurando la continuidad y la
        confianza en sus operaciones.
      </p>
      <div className="mt-8 text-center">
        <div className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-full">
          Módulo Próximamente
        </div>
      </div>
    </div>
  );
};

export default CybersecurityView;