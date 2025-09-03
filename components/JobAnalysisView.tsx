import React from 'react';

const JobAnalysisView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Análisis y Descripción de Puestos</h2>
      <p className="text-gray-600">
        En esta sección podrá encontrar los puestos de su empresa con sus análisis y descripciones de perfil,
        facilitando la gestión del talento y los procesos de selección.
      </p>
      <div className="mt-8 text-center">
        <div className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-full">
          Módulo Próximamente
        </div>
      </div>
    </div>
  );
};

export default JobAnalysisView;