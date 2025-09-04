import React, { useState, useEffect } from 'react';
import { type ViewType, type UserPlan } from '../types';
import { COMPANY_NAME } from '../constants';
import { hasAccessToView } from '../features';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import MarketingIcon from './icons/MarketingIcon';
import ShieldIcon from './icons/ShieldIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import ReportsIcon from './icons/ReportsIcon';
import LockIcon from './icons/LockIcon';
import BrainIcon from './icons/BrainIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  userPlan: UserPlan;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems: { view: ViewType, label: string, icon: JSX.Element }[] = [
    { view: 'inicio', label: 'Inicio', icon: <HomeIcon /> },
    { view: 'informes', label: 'Informes', icon: <ReportsIcon /> },
    { view: 'marketing', label: 'Marketing', icon: <MarketingIcon /> },
    { view: 'agentesIA', label: 'Agentes IA', icon: <BrainIcon /> },
    { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
    { view: 'cybersecurity', label: 'Ciberseguridad', icon: <ShieldIcon /> },
];

const humanCapitalNavItems: { view: ViewType, label: string }[] = [
    { view: 'orgChart', label: 'Organigrama' },
    { view: 'jobAnalysis', label: 'Análisis de Puestos' },
    { view: 'companyManual', label: 'Manual de Empresa' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, userPlan, isOpen, setIsOpen }) => {
  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setIsOpen(false);
  };

  const humanCapitalViews: ViewType[] = ['orgChart', 'jobAnalysis', 'companyManual'];
  const isHumanCapitalActive = humanCapitalViews.includes(currentView);

  const [isHumanCapitalOpen, setIsHumanCapitalOpen] = useState(isHumanCapitalActive);

  useEffect(() => {
    if (isHumanCapitalActive) {
      setIsHumanCapitalOpen(true);
    }
  }, [isHumanCapitalActive]);

  const hasAccessToHumanCapital = humanCapitalViews.some(view => hasAccessToView(userPlan, view));

  return (
    <div className={`w-64 bg-white text-gray-800 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#4A5A5B]">{COMPANY_NAME}</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {/* Inicio */}
          <li className="relative group">
            <button
              onClick={() => handleNavigation('inicio')}
              className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
                currentView === 'inicio'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-800'
              }`}
            >
              <span className="mr-3"><HomeIcon /></span>
              <span className="font-medium">Inicio</span>
            </button>
          </li>
          
          {/* Gestión del Capital Humano Group */}
          <li className="relative group">
            <button
              onClick={() => hasAccessToHumanCapital && setIsHumanCapitalOpen(!isHumanCapitalOpen)}
              disabled={!hasAccessToHumanCapital}
              className={`flex items-center justify-between w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
                isHumanCapitalActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : hasAccessToHumanCapital
                  ? 'text-gray-600 hover:bg-blue-100 hover:text-blue-800'
                  : 'text-gray-400 bg-gray-100 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3"><UsersIcon /></span>
                <span className="font-medium">Gestión Capital Humano</span>
              </div>
              {hasAccessToHumanCapital ? (
                <ChevronDownIcon className={`transition-transform duration-300 ${isHumanCapitalOpen ? 'rotate-180' : ''}`} />
              ) : (
                <LockIcon />
              )}
            </button>
            {!hasAccessToHumanCapital && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Necesita un plan superior
              </div>
            )}
            
            {isHumanCapitalOpen && hasAccessToHumanCapital && (
              <ul className="pl-8 pt-1 pb-1 transition-all duration-500">
                {humanCapitalNavItems.map(item => {
                  const hasAccess = hasAccessToView(userPlan, item.view);
                  if (!hasAccess) return null;
                  const isActive = currentView === item.view;
                  return (
                    <li key={item.view}>
                      <button
                        onClick={() => handleNavigation(item.view)}
                        className={`w-full text-left px-3 py-2 my-0.5 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'font-semibold text-blue-700 bg-blue-50'
                            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {/* Other Nav Items */}
          {navItems.slice(1).map(item => {
            const hasAccess = hasAccessToView(userPlan, item.view);
            const isActive = currentView === item.view;

            return (
              <li key={item.view} className="relative group">
                <button
                  onClick={() => hasAccess && handleNavigation(item.view)}
                  disabled={!hasAccess}
                  className={`flex items-center justify-between w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : hasAccess
                      ? 'text-gray-600 hover:bg-blue-100 hover:text-blue-800'
                      : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {!hasAccess && <LockIcon />}
                </button>
                {!hasAccess && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    Necesita un plan superior
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-800 font-semibold">Plataforma Digital</p>
            <p className="text-xs text-blue-700 mt-1">&copy; 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;