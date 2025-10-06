import React, { useMemo, useState } from 'react';
import { type Employee, EmployeeStatus, type UserPlan, type Activity, type Company, type Plan, ActivityType } from '../types';
// FIX: Changed to a named import to resolve the "no default export" error.
import { BuildingOfficePlusIcon } from './icons/BuildingOfficePlusIcon';
import SearchIcon from './icons/SearchIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import DocumentCurrencyIcon from './icons/DocumentCurrencyIcon';
import UserPlusIcon from './icons/UserPlusIcon';
import PencilIcon from './icons/PencilIcon';
import BriefcasePlusIcon from './icons/BriefcasePlusIcon';

const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const ExclamationCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
const MegaphoneIconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v1a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM8 18a2 2 0 114 0H8z" /></svg>;
const BriefcaseIconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 2a1 1 0 00-1 1v1h12V7a1 1 0 00-1-1H5z" clipRule="evenodd" /></svg>;
const DocumentCurrencyIconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-7 4h7m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const UserPlusIconDashboard = () => <div className="text-sky-500"><UserPlusIcon /></div>;
const PencilIconDashboard = () => <div className="text-amber-500"><PencilIcon /></div>;
const BriefcasePlusIconDashboard = () => <div className="text-indigo-500"><BriefcasePlusIcon /></div>;



interface DashboardViewProps {
  companies: Company[];
  employees: Employee[];
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
  activities: Activity[];
  onShowAddCompanyModal: () => void;
  plans: Plan[];
  onSelectCompany: (company: Company) => void;
}

const KpiCard: React.FC<{ title: string; value: string | number; children?: React.ReactNode }> = ({ title, value, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
        <div>
            <p className="text-slate-500">{title}</p>
            <p className="text-4xl font-bold text-slate-800">{value}</p>
        </div>
        {children && <div className="mt-4">{children}</div>}
    </div>
);

interface CompanyListWidgetProps {
    companies: Company[];
    onShowAddCompanyModal: () => void;
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterPlan: UserPlan | 'all';
    onFilterChange: (plan: UserPlan | 'all') => void;
    plans: Plan[];
    onSelectCompany: (company: Company) => void;
}

const CompanyListWidget: React.FC<CompanyListWidgetProps> = ({ companies, onShowAddCompanyModal, searchTerm, onSearchChange, filterPlan, onFilterChange, plans, onSelectCompany }) => {
    const planFilters = useMemo(() => [{ id: 'all' as const, name: 'Todos' }, ...plans], [plans]);
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-xl font-semibold text-slate-800">Empresas Cliente</h3>
                <button
                    onClick={onShowAddCompanyModal}
                    className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <BuildingOfficePlusIcon />
                    Añadir Empresa
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {planFilters.map(plan => (
                        <button
                            key={plan.id}
                            onClick={() => onFilterChange(plan.id)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                                filterPlan === plan.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {plan.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {companies.length > 0 ? companies.map(company => (
                    <div key={company.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <div>
                            <p className="font-medium text-slate-800">{company.name}</p>
                            <p className="text-sm text-slate-500">Plan: <span className="font-semibold capitalize">{plans.find(p => p.id === company.planId)?.name || 'N/A'}</span></p>
                        </div>
                         <button 
                            onClick={() => onSelectCompany(company)}
                            className="text-sm bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                            Gestionar
                        </button>
                    </div>
                )) : (
                    <div className="text-center py-10">
                        <p className="text-slate-500">No se encontraron empresas.</p>
                        <p className="text-sm text-slate-400 mt-1">Intente ajustar su búsqueda o filtros.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const AlertsWidget: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    const alerts = useMemo(() => {
        return employees.filter(e => e.status === EmployeeStatus.Inactive || e.status === EmployeeStatus.Vacation);
    }, [employees]);

    const getStatusIcon = (status: EmployeeStatus) => {
        switch (status) {
            case EmployeeStatus.Vacation: return <ExclamationCircleIcon />;
            case EmployeeStatus.Inactive: return <XCircleIcon />;
            default: return null;
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <BellIcon />
                <span>Alertas Globales</span>
            </h3>
            {alerts.length > 0 ? (
                <ul className="space-y-3">
                    {alerts.slice(0, 5).map(employee => (
                        <li key={employee.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-50">
                            {getStatusIcon(employee.status)}
                            <div>
                                <p className="text-sm font-medium text-slate-800">{employee.name}</p>
                                <p className="text-xs text-slate-600">Estado: {employee.status}</p>
                            </div>
                        </li>
                    ))}
                     {alerts.length > 5 && <li className="text-center text-sm text-slate-500 pt-2">y {alerts.length - 5} más...</li>}
                </ul>
            ) : (
                <p className="text-slate-500 text-center py-8">No hay alertas importantes.</p>
            )}
        </div>
    );
};

export const ActivityFeedWidget: React.FC<{ activities: Activity[], title?: string }> = ({ activities, title = "Actividad Reciente" }) => {
    const getActivityIcon = (type: Activity['type']) => {
        switch(type) {
            case ActivityType.StatusChange: return <ExclamationCircleIcon />;
            case ActivityType.NewCommunication: return <MegaphoneIconDashboard />;
            case ActivityType.PlanChange: return <CheckCircleIcon />;
            case ActivityType.SelectionRequest: return <BriefcaseIconDashboard />;
            case ActivityType.PayrollSent: return <DocumentCurrencyIconDashboard />;
            case ActivityType.NewEmployee: return <UserPlusIconDashboard />;
            case ActivityType.EmployeeUpdate: return <PencilIconDashboard />;
            case ActivityType.NewJobPosition: return <BriefcasePlusIconDashboard />;
            default: return <CheckCircleIcon />;
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <ClockIcon />
                <span>{title}</span>
            </h3>
            {activities.length > 0 ? (
                <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {activities.map(activity => (
                        <li key={activity.id} className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center">{getActivityIcon(activity.type)}</div>
                            <div>
                                <p className="text-sm text-slate-700">{activity.description}</p>
                                <p className="text-xs text-slate-400">{new Date(activity.timestamp).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500 text-center py-8">No hay actividad reciente.</p>
            )}
        </div>
    );
};

const DashboardView: React.FC<DashboardViewProps> = ({ companies, employees, userPlan, setUserPlan, activities, onShowAddCompanyModal, plans, onSelectCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<UserPlan | 'all'>('all');
  
  const currentPlanDetails = useMemo(() => plans.find(p => p.id === userPlan), [plans, userPlan]);

  const filteredCompanies = useMemo(() => {
      return companies
          .filter(company => filterPlan === 'all' || company.planId === filterPlan)
          .filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [companies, searchTerm, filterPlan]);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Dashboard Principal del Consultor</h2>
        <p className="text-gray-600 mt-1">Vista general de clientes, actividad y alertas.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <KpiCard title="Empresas Gestionadas" value={companies.length} />
                <KpiCard title="Total Empleados Monitoreados" value={employees.length} />
            </div>
            
            <CompanyListWidget 
                companies={filteredCompanies} 
                onShowAddCompanyModal={onShowAddCompanyModal}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                filterPlan={filterPlan}
                onFilterChange={setFilterPlan}
                plans={plans}
                onSelectCompany={onSelectCompany}
            />
        </div>
        
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Simulador de Plan</h3>
                <p className="text-slate-500 mb-4">Plan Actual: <span className="font-bold text-blue-700">{currentPlanDetails?.name || 'N/A'}</span></p>
                <div className="space-y-2">
                    {plans.map(plan => (
                        <button
                          key={plan.id}
                          onClick={() => setUserPlan(plan.id)}
                          className={`w-full text-left p-2 rounded-md border-2 text-sm transition-all ${userPlan === plan.id ? 'bg-blue-100 border-blue-600' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                        >
                          <p className={`font-semibold ${userPlan === plan.id ? 'text-blue-700' : 'text-slate-800'}`}>{plan.name}</p>
                           <p className="text-xs text-slate-500">{plan.description}</p>
                        </button>
                    ))}
                </div>
            </div>
            <AlertsWidget employees={employees} />
            <ActivityFeedWidget activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;