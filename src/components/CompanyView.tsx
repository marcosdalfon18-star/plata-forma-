import React, { useState } from 'react';
import { type Company, type Employee, EmployeeStatus, type JobPosition, type Plan } from '../types';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import UserPlusIcon from './icons/UserPlusIcon';
import PencilIcon from './icons/PencilIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import EmployeeStatusChart from './EmployeeStatusChart';
import CompanyInfoSidebar from './CompanyInfoSidebar';
import AddJobPositionModal from './AddJobPositionModal';
import BriefcasePlusIcon from './icons/BriefcasePlusIcon';

interface CompanyViewProps {
    company: Company;
    employees: Employee[];
    onAddEmployee: (employee: Omit<Employee, 'id' | 'avatarUrl' | 'managerId'>) => void;
    onUpdateEmployee: (employee: Employee) => void;
    onBulkAction: (action: string, employeeIds: number[]) => void;
    jobPositions: JobPosition[];
    plans: Plan[];
    onAddJobPosition: (position: Omit<JobPosition, 'id' | 'companyId'>) => void;
}

const statusColors: Record<EmployeeStatus, string> = {
    [EmployeeStatus.Active]: 'bg-green-100 text-green-800',
    [EmployeeStatus.Vacation]: 'bg-yellow-100 text-yellow-800',
    [EmployeeStatus.Inactive]: 'bg-slate-100 text-slate-800',
};

const CompanyView: React.FC<CompanyViewProps> = ({ company, employees, onAddEmployee, onUpdateEmployee, jobPositions, onBulkAction, plans, onAddJobPosition }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
    const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedEmployees(employees.map(emp => emp.id));
        } else {
            setSelectedEmployees([]);
        }
    };

    const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (e.target.checked) {
            setSelectedEmployees(prev => [...prev, id]);
        } else {
            setSelectedEmployees(prev => prev.filter(empId => empId !== id));
        }
    };

    const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id' | 'avatarUrl' | 'managerId' | 'companyId'>) => {
        onAddEmployee({ ...newEmployeeData, companyId: company.id });
        setIsAddModalOpen(false);
    };
    
    const handleAddJobPosition = (newPositionData: Omit<JobPosition, 'id' | 'companyId'>) => {
        onAddJobPosition(newPositionData);
        setIsAddPositionModalOpen(false);
    };

    const handleUpdateEmployee = (updatedEmployee: Employee) => {
        onUpdateEmployee(updatedEmployee);
        setEditingEmployee(null);
    }

    const handleBulkActionClick = (action: string) => {
        onBulkAction(action, selectedEmployees);
        setSelectedEmployees([]);
        setIsBulkActionsOpen(false);
    }

    const isAllSelected = selectedEmployees.length === employees.length && employees.length > 0;

    return (
        <>
            <AddEmployeeModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddEmployee={handleAddEmployee}
                jobPositions={jobPositions}
            />
            <EditEmployeeModal
                employee={editingEmployee}
                isOpen={!!editingEmployee}
                onClose={() => setEditingEmployee(null)}
                onUpdateEmployee={handleUpdateEmployee}
                jobPositions={jobPositions}
            />
            <AddJobPositionModal 
                isOpen={isAddPositionModalOpen}
                onClose={() => setIsAddPositionModalOpen(false)}
                onAddPosition={handleAddJobPosition}
            />
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Panel de {company.name}</h2>
                    <p className="text-gray-600 mt-1">Bienvenido a su centro de gestión de capital humano.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <EmployeeStatusChart employees={employees} />

                        {/* Employee List */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                                <div className="flex items-center gap-4 flex-wrap">
                                     <h3 className="text-xl font-semibold text-slate-800">Gestión de Empleados</h3>
                                     {selectedEmployees.length > 0 && (
                                        <div className="relative">
                                            <button 
                                                onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
                                                className="flex items-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors"
                                            >
                                                <span>Acciones ({selectedEmployees.length})</span>
                                                <ChevronDownIcon className={`transition-transform duration-200 ${isBulkActionsOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isBulkActionsOpen && (
                                                <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                                                    <button onClick={() => handleBulkActionClick('Change Status')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Cambiar Estado</button>
                                                    <button onClick={() => handleBulkActionClick('Assign to Project')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Asignar a Proyecto</button>
                                                    <button onClick={() => handleBulkActionClick('Delete Selected')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Eliminar</button>
                                                </div>
                                            )}
                                        </div>
                                     )}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                        onClick={() => setIsAddPositionModalOpen(true)}
                                        className="flex items-center gap-2 bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
                                    >
                                        <BriefcasePlusIcon />
                                        Añadir Puesto
                                    </button>
                                    <button
                                        onClick={() => setIsAddModalOpen(true)}
                                        className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        <UserPlusIcon />
                                        Añadir Empleado
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="p-3 w-4">
                                                <input 
                                                    type="checkbox"
                                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                    checked={isAllSelected}
                                                    onChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="p-3 font-semibold text-slate-600">Nombre</th>
                                            <th className="p-3 font-semibold text-slate-600">Puesto</th>
                                            <th className="p-3 font-semibold text-slate-600">Estado</th>
                                            <th className="p-3 font-semibold text-slate-600">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map(employee => (
                                            <tr key={employee.id} className={`border-b transition-colors ${selectedEmployees.includes(employee.id) ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                                                <td className="p-3">
                                                    <input 
                                                        type="checkbox"
                                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                        checked={selectedEmployees.includes(employee.id)}
                                                        onChange={(e) => handleSelectOne(e, employee.id)}
                                                    />
                                                </td>
                                                <td className="p-3 flex items-center gap-3">
                                                    <img src={employee.avatarUrl} alt={employee.name} className="w-10 h-10 rounded-full" />
                                                    <span className="font-medium text-slate-800">{employee.name}</span>
                                                </td>
                                                <td className="p-3 text-slate-600">{jobPositions.find(p => p.id === employee.positionId)?.title || employee.positionId}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[employee.status]}`}>
                                                        {employee.status}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <button 
                                                        onClick={() => setEditingEmployee(employee)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                                        aria-label={`Editar ${employee.name}`}
                                                    >
                                                        <PencilIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <CompanyInfoSidebar company={company} plans={plans} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyView;
