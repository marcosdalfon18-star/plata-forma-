import React from 'react';
import { type ViewType } from '../types';
import { COMPANY_NAME } from '../constants';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import ChartPieIcon from './icons/ChartPieIcon';
import MarketingIcon from './icons/MarketingIcon';
import ShieldIcon from './icons/ShieldIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: <HomeIcon /> },
    { id: 'orgChart', label: 'Organigrama', icon: <UsersIcon /> },
    { id: 'jobAnalysis', label: 'Análisis de Puestos', icon: <DocumentTextIcon /> },
    { id: 'companyManual', label: 'Manual de Empresa', icon: <BookOpenIcon /> },
    { id: 'marketing', label: 'Marketing', icon: <MarketingIcon /> },
    { id: 'cybersecurity', label: 'Ciberseguridad', icon: <ShieldIcon /> },
  ];

  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <ChartPieIcon />
        <h1 className="text-2xl font-bold text-indigo-600 ml-2">{COMPANY_NAME}</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <p className="text-sm text-indigo-800 font-semibold">Plataforma Digital</p>
            <p className="text-xs text-indigo-600 mt-1">&copy; 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;