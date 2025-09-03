import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type Employee, EmployeeStatus } from '../types';

const COLORS = {
  [EmployeeStatus.Active]: '#22C55E', // green-500
  [EmployeeStatus.Vacation]: '#F59E0B', // amber-500
  [EmployeeStatus.Inactive]: '#EF4444', // red-500
};

interface DashboardViewProps {
  employees: Employee[];
  onEmployeeStatusChange: (employeeId: number, newStatus: EmployeeStatus) => void;
}

const EmployeeStatusWidget: React.FC<{ employees: Employee[]}> = ({ employees }) => {
  const statusData = useMemo(() => {
    const counts = employees.reduce((acc, employee) => {
      acc[employee.status] = (acc[employee.status] || 0) + 1;
      return acc;
    }, {} as Record<EmployeeStatus, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [employees]);
  
  const totalEmployees = employees.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Situación Actual de la Plantilla</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as EmployeeStatus]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} empleado(s)`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center md:text-left">
            <div className="mb-4">
                <p className="text-4xl font-bold text-teal-600">{totalEmployees}</p>
                <p className="text-gray-500">Empleados Totales</p>
            </div>
            {statusData.map(item => (
                <div key={item.name} className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[item.name as EmployeeStatus] }}></span>
                    <span className="text-gray-700">{item.name}:</span>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const EmployeeListWidget: React.FC<DashboardViewProps> = ({ employees, onEmployeeStatusChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gestionar Estado de Empleados</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {employees.map(employee => (
                    <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <img src={employee.avatarUrl} alt={employee.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium text-gray-800">{employee.name}</p>
                                <p className="text-sm text-gray-500">{employee.status}</p>
                            </div>
                        </div>
                        <select
                            value={employee.status}
                            onChange={(e) => onEmployeeStatusChange(employee.id, e.target.value as EmployeeStatus)}
                            className="bg-gray-50 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 transition"
                        >
                            {Object.values(EmployeeStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};


const DashboardView: React.FC<DashboardViewProps> = ({ employees, onEmployeeStatusChange }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard de Capital Humano</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <EmployeeStatusWidget employees={employees} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Plan de Suscripción</h3>
            <p className="text-teal-600 font-bold text-2xl">Premium</p>
            <p className="text-gray-500 mt-2">Acceso completo a todas las funcionalidades.</p>
            <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors">Administrar Plan</button>
        </div>
      </div>
      <div>
        <EmployeeListWidget employees={employees} onEmployeeStatusChange={onEmployeeStatusChange} />
      </div>
    </div>
  );
};

export default DashboardView;