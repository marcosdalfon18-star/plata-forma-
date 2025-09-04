import React from 'react';
import { type ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onLogout: () => void;
}

const viewTitles: Record<ViewType, string> = {
  inicio: 'Inicio',
  orgChart: 'Organigrama',
  jobAnalysis: 'Análisis de Puestos',
  companyManual: 'Manual de Empresa',
  marketing: 'Marketing Estratégico',
  cybersecurity: 'Ciberseguridad',
  regulatoryCompliance: 'Comunicaciones Reglamentarias'
};

const Header: React.FC<HeaderProps> = ({ currentView, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">{viewTitles[currentView]}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium hidden md:block">Bienvenida, Consultora</span>
        <div className="relative">
          <button onClick={onLogout} className="flex items-center space-x-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;