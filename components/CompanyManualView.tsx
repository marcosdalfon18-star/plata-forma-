import React from 'react';

const CompanyManualView: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Manual de Empresa</h2>
      <p className="text-gray-600">
        Aquí encontrará la cultura, visión, misión, políticas y normativas de la empresa. Un recurso
        centralizado para alinear a todo el equipo con los valores y procedimientos de la organización.
      </p>
      <div className="mt-8 text-center">
        <div className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-full">
          Módulo Próximamente
        </div>
      </div>
    </div>
  );
};

export default CompanyManualView;