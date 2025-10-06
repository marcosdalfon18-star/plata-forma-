import React, { useState, useEffect } from 'react';
import { type ViewType, type UserPlan, type User, type Company } from '../types';
import { COMPANY_NAME } from '../constants';
import { hasAccessToView } from '../features';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import ReportsIcon from './icons/ReportsIcon';
import LockIcon from './icons/LockIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import TagIcon from './icons/TagIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CubeTransparentIcon from './icons/CubeTransparentIcon';
import SitemapIcon from './icons/SitemapIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import MarketingIcon from './icons/MarketingIcon';
import ShieldIcon from './icons/ShieldIcon';
import BrainIcon from './icons/BrainIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import DocumentCurrencyIcon from './icons/DocumentCurrencyIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';


interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  userPlan: UserPlan;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: User | null;
  selectedCompany: Company | null;
  onBackToDashboard: () => void;
}

interface NavItem {
    view: ViewType;
    label: string;
    // FIX: Replaced JSX.Element with React.ReactNode to fix TypeScript error.
    icon: React.ReactNode;
}

interface NavGroup {
    label: string;
    // FIX: Replaced JSX.Element with React.ReactNode to fix TypeScript error.
    icon: React.ReactNode;
    // FIX: Replaced JSX.Element with React.ReactNode to fix TypeScript error.
    subItems: { view: ViewType; label: string, icon?: React.ReactNode }[];
}

type NavConfigItem = NavItem | NavGroup;

const navConfig: Record<User['role'], { title: string; items: NavConfigItem[] }> = {
    consultor: {
        title: 'Menú Global',
        items: [
            { view: 'inicio', label: 'Dashboard Global', icon: <HomeIcon /> },
            { view: 'planManagement', label: 'Gestión de Planes', icon: <TagIcon /> },
            {
                label: 'Gestión de Cliente',
                icon: <UsersIcon />,
                subItems: [
                    { view: 'orgChart', label: 'Organigrama', icon: <SitemapIcon /> },
                    { view: 'jobAnalysis', label: 'Análisis de Puestos', icon: <DocumentTextIcon /> },
                    { view: 'selectionProcesses', label: 'Procesos de Selección', icon: <BriefcaseIcon /> },
                    { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
                    { view: 'payrollManagement', label: 'Gestión de Nóminas', icon: <DocumentCurrencyIcon /> },
                ],
            },
            {
                label: 'Servicios Digitales',
                icon: <CubeTransparentIcon />,
                 subItems: [
                    { view: 'marketing', label: 'Marketing Estratégico', icon: <MarketingIcon /> },
                    { view: 'cybersecurity', label: 'Ciberseguridad', icon: <ShieldIcon /> },
                    { view: 'agentesIA', label: 'Agentes IA', icon: <BrainIcon /> },
                ],
            },
            { view: 'informes', label: 'Informes Globales', icon: <ReportsIcon /> },
        ],
    },
    empresa: {
        title: 'Mi Empresa',
        items: [
            { view: 'inicio', label: 'Dashboard', icon: <HomeIcon /> },
            {
                label: 'Gestión de Talento',
                icon: <UsersIcon />,
                subItems: [
                    { view: 'orgChart', label: 'Organigrama', icon: <SitemapIcon /> },
                    { view: 'jobAnalysis', label: 'Análisis de Puestos', icon: <DocumentTextIcon /> },
                    { view: 'companyManual', label: 'Manual de Empresa', icon: <BookOpenIcon /> },
                    { view: 'selectionProcesses', label: 'Procesos de Selección', icon: <BriefcaseIcon /> },
                    { view: 'payrollManagement', label: 'Gestión de Nóminas', icon: <DocumentCurrencyIcon /> },
                ],
            },
            { view: 'regulatoryCompliance', label: 'Comunicaciones', icon: <MegaphoneIcon /> },
            {
                label: 'Servicios Digitales',
                icon: <CubeTransparentIcon />,
                subItems: [
                    { view: 'marketing', label: 'Marketing Estratégico', icon: <MarketingIcon /> },
                    { view: 'cybersecurity', label: 'Ciberseguridad', icon: <ShieldIcon /> },
                    { view: 'agentesIA', label: 'Agentes IA', icon: <BrainIcon /> },
                ],
            },
            { view: 'informes', label: 'Informes', icon: <ReportsIcon /> },
        ],
    },
    empleado: {
        title: 'Portal',
        items: [
            { view: 'inicio', label: 'Inicio', icon: <HomeIcon /> },
            { view: 'jobAnalysis', label: 'Análisis de Puesto', icon: <UsersIcon /> },
            { view: 'companyManual', label: 'Manual de Empresa', icon: <BookOpenIcon /> },
        ],
    },
};

const NavButton: React.FC<{
    label: string;
    // FIX: Replaced JSX.Element with React.ReactNode to fix TypeScript error.
    icon: React.ReactNode;
    isActive: boolean;
    isDisabled?: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}> = ({ label, icon, isActive, isDisabled = false, onClick, children }) => (
    <li className="relative group">
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex items-center justify-between w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 ${
                isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDisabled
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-blue-100 hover:text-blue-800'
            }`}
        >
            <div className="flex items-center">
                <span className="mr-3">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
            {children}
        </button>
        {isDisabled && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {label === 'Gestión de Cliente' || label === 'Servicios Digitales' ? 'Seleccione una empresa para gestionar' : 'Necesita un plan superior'}
            </div>
        )}
    </li>
);

const SubNavButton: React.FC<{
    label: string;
    // FIX: Replaced JSX.Element with React.ReactNode to fix TypeScript error.
    icon?: React.ReactNode;
    isActive: boolean;
    isDisabled: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, isDisabled, onClick }) => (
    <li className="relative group/sub">
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`w-full text-left px-3 py-2 my-0.5 rounded-md text-sm transition-colors flex justify-between items-center ${
                isActive
                    ? 'font-semibold text-blue-700 bg-blue-50'
                    : isDisabled 
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'
            }`}
        >
            <span className="flex items-center gap-2">
                {icon}
                {label}
            </span>
            {isDisabled && <LockIcon />}
        </button>
        {isDisabled && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/sub:opacity-100 transition-opacity z-50">
                Necesita un plan superior
            </div>
        )}
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, userPlan, isOpen, setIsOpen, currentUser, selectedCompany, onBackToDashboard }) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!currentUser) return;
    const activeGroup = navConfig[currentUser.role].items.find(item => 
        'subItems' in item && item.subItems.some(sub => sub.view === currentView)
    ) as NavGroup | undefined;

    if (activeGroup) {
        setOpenGroups(prev => ({ ...prev, [activeGroup.label]: true }));
    }
  }, [currentView, currentUser]);
  
  // Reset open groups when consultant goes back to dashboard
  useEffect(() => {
      if(currentUser?.role === 'consultor' && !selectedCompany) {
          setOpenGroups({});
      }
  }, [selectedCompany, currentUser?.role]);

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    if (window.innerWidth < 768) {
        setIsOpen(false);
    }
  };

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenu = () => {
    if (!currentUser) return null;

    const { title, items } = navConfig[currentUser.role];

    return (
        <ul>
            <li className="px-4 py-3 text-gray-500 text-sm font-semibold uppercase">{selectedCompany ? 'Menú de Gestión' : title}</li>
            {currentUser.role === 'consultor' && selectedCompany && (
                 <li>
                    <button
                        onClick={onBackToDashboard}
                        className="flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-300 text-gray-600 hover:bg-blue-100 hover:text-blue-800"
                    >
                        <span className="mr-3"><ArrowLeftIcon /></span>
                        <span className="font-medium">Volver al Dashboard</span>
                    </button>
                </li>
            )}
            {items.map((item, index) => {
                const isConsultantManaging = currentUser.role === 'consultor';
                const isManagementGroup = 'subItems' in item && (item.label === 'Gestión de Cliente' || item.label === 'Servicios Digitales');

                let hasAccess;
                // FIX: Add type guard to check for 'view' property before accessing it.
                if (isConsultantManaging && 'view' in item && item.view === 'inicio') { // "Inicio" for consultant is always accessible
                    hasAccess = true;
                } else {
                    hasAccess = 'subItems' in item 
                    ? item.subItems.some(sub => hasAccessToView(currentUser.role, userPlan, sub.view))
                    : hasAccessToView(currentUser.role, userPlan, (item as NavItem).view);
                }

                const shouldHide = !hasAccess && currentUser.role === 'empleado';
                if (shouldHide) return null;

                if ('subItems' in item) {
                    const group = item as NavGroup;
                    const isActive = group.subItems.some(sub => sub.view === currentView);
                    const isGroupOpen = openGroups[group.label];
                    const isDisabledForConsultant = isConsultantManaging && isManagementGroup && !selectedCompany;
                    const isDisabledByPlan = !hasAccess && currentUser.role !== 'empleado';

                    const isDisabled = isDisabledForConsultant || isDisabledByPlan;
                    
                    return (
                        <div key={index}>
                            <NavButton
                                label={group.label}
                                icon={group.icon}
                                isActive={isActive && !!selectedCompany}
                                isDisabled={isDisabled}
                                onClick={() => !isDisabled && toggleGroup(group.label)}
                            >
                                {!isDisabled && <ChevronDownIcon className={`transition-transform duration-300 ${isGroupOpen ? 'rotate-180' : ''}`} />}
                                {isDisabled && <LockIcon />}
                            </NavButton>
                            {!isDisabled && isGroupOpen && (
                                <ul className="pl-8 pt-1 pb-1 transition-all duration-500">
                                    {group.subItems.map(subItem => {
                                        const subHasAccess = hasAccessToView(currentUser.role, userPlan, subItem.view);
                                        return (
                                            <SubNavButton
                                                key={subItem.view}
                                                label={subItem.label}
                                                icon={subItem.icon}
                                                isActive={currentView === subItem.view}
                                                isDisabled={!subHasAccess}
                                                onClick={() => subHasAccess && handleNavigation(subItem.view)}
                                            />
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                } else {
                    const navItem = item as NavItem;
                    const isDisabled = !hasAccessToView(currentUser.role, userPlan, navItem.view);
                     if (isDisabled && currentUser.role === 'empleado') return null;

                    return (
                        <NavButton
                            key={index}
                            label={navItem.label}
                            icon={navItem.icon}
                            isActive={currentView === navItem.view && ((isConsultantManaging && !selectedCompany && navItem.view !== 'inicio') ? false : true)}
                            isDisabled={isDisabled || (isConsultantManaging && navItem.view === 'inicio' && !!selectedCompany)}
                            onClick={() => !isDisabled && handleNavigation(navItem.view)}
                        />
                    );
                }
            })}
        </ul>
    );
  };
  
  return (
    <div className={`w-64 bg-white text-gray-800 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#4A5A5B]">{COMPANY_NAME}</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        {renderMenu()}
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