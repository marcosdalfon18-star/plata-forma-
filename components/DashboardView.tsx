import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type Employee, EmployeeStatus, type UserPlan } from '../types';

const COLORS = {
  [EmployeeStatus.Active]: '#90BE6D', // Muted green
  [EmployeeStatus.Vacation]: '#F9C74F', // Muted yellow
  [EmployeeStatus.Inactive]: '#94a3b8', // Muted gray/inactive (slate-400)
};

interface DashboardViewProps {
  employees: Employee[];
  onEmployeeStatusChange: (employeeId: number, newStatus: EmployeeStatus) => void;
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
}

const EmployeeStatusWidget: React.FC<{ employees: Employee[]}> = ({ employees }) => {
  const totalEmployees = employees.length;

  // Data for the legend, always includes all statuses for consistency
  const statusData = useMemo(() => {
    const counts: Record<EmployeeStatus, number> = {
      [EmployeeStatus.Active]: 0,
      [EmployeeStatus.Vacation]: 0,
      [EmployeeStatus.Inactive]: 0,
    };

    for (const employee of employees) {
      // Ensure we only count valid statuses present in our initial counts object
      if (counts.hasOwnProperty(employee.status)) {
        counts[employee.status]++;
      }
    }

    return (Object.keys(counts) as EmployeeStatus[]).map(status => ({
      name: status,
      value: counts[status],
    }));
  }, [employees]);

  // Data for the pie chart, should only include entries with a value > 0 to avoid rendering empty slices
  const chartData = useMemo(() => statusData.filter(d => d.value > 0), [statusData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Situación Actual de la Plantilla</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData} // Use filtered data for the chart
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} empleado(s) (${totalEmployees > 0 ? ((value / totalEmployees) * 100).toFixed(0) : 0}%)`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center md:text-left">
            <div className="mb-4">
                <p className="text-4xl font-bold text-[#4A5A5B]">{totalEmployees}</p>
                <p className="text-slate-500">Empleados Totales</p>
            </div>
            {/* Use the full statusData for the legend to show all categories */}
            {statusData.map(item => (
                <div key={item.name} className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[item.name] }}></span>
                    <span className="text-slate-700">{item.name}:</span>
                    <span className="font-semibold text-slate-800">{item.value}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const EmployeeListWidget: React.FC<Pick<DashboardViewProps, 'employees' | 'onEmployeeStatusChange'>> = ({ employees, onEmployeeStatusChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Gestionar Estado de Empleados</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {employees.map(employee => (
                    <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <img src={employee.avatarUrl} alt={employee.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium text-slate-800">{employee.name}</p>
                                <p className="text-sm text-slate-500">{employee.status}</p>
                            </div>
                        </div>
                        <select
                            value={employee.status}
                            onChange={(e) => onEmployeeStatusChange(employee.id, e.target.value as EmployeeStatus)}
                            className="bg-blue-50 border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
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


const DashboardView: React.FC<DashboardViewProps> = ({ employees, onEmployeeStatusChange, userPlan, setUserPlan }) => {
  const planDetails: Record<UserPlan, { name: string; description: string }> = {
    plan_basico: { name: "Básico", description: "Funcionalidades esenciales." },
    plan_profesional: { name: "Profesional", description: "Módulos de comunicación e informes." },
    plan_premium: { name: "Premium", description: "Acceso completo y funcionalidades IA." },
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-800">Inicio - Capital Humano</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <EmployeeStatusWidget employees={employees} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Simulador de Plan</h3>
            <p className="text-slate-500 mb-4">Cambie el plan para ver cómo se adapta la plataforma.</p>
            <div className="space-y-2">
              {(['plan_basico', 'plan_profesional', 'plan_premium'] as UserPlan[]).map(plan => (
                <button
                  key={plan}
                  onClick={() => setUserPlan(plan)}
                  className={`w-full text-left p-3 rounded-md border-2 transition-all ${userPlan === plan ? 'bg-blue-100 border-blue-600 shadow-inner' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                >
                  <p className={`font-semibold ${userPlan === plan ? 'text-blue-700' : 'text-slate-800'}`}>{planDetails[plan].name}</p>
                  <p className="text-sm text-slate-500">{planDetails[plan].description}</p>
                </button>
              ))}
            </div>
        </div>
      </div>
      <div>
        <EmployeeListWidget employees={employees} onEmployeeStatusChange={onEmployeeStatusChange} />
      </div>
    </div>
  );
};

export default DashboardView;