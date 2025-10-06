import React from 'react';
import { type UserPlan, type Employee } from '../types';
import OrgChartView from './OrgChartView';


interface JobAnalysisViewProps {
    userPlan: UserPlan;
    employees: Employee[];
}

const JobAnalysisView: React.FC<JobAnalysisViewProps> = ({ userPlan, employees }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Análisis y Descripción de Puestos</h2>
        <p className="text-gray-600">
          Navegue por el organigrama para ver los perfiles de puesto y las responsabilidades clave.
          Haga clic en un empleado para abrir los detalles.
        </p>
      </div>
      
      {/* Re-utilizamos el organigrama como la interfaz principal para esta vista */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <OrgChartView employees={employees} userPlan={userPlan} />
      </div>
    </div>
  );
};

export default JobAnalysisView;