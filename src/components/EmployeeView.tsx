import React from 'react';
import { type User, type Company } from '../types';

interface EmployeeViewProps {
    user: User;
    company: Company;
}

const EmployeeView: React.FC<EmployeeViewProps> = ({ user, company }) => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-4xl font-bold text-slate-800">
                Bienvenido, {user.name}
            </h2>
            <p className="text-slate-600 mt-2 text-lg">
                Usted es parte del equipo de <span className="font-semibold text-blue-700">{company.name}</span>.
            </p>
            <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-semibold text-slate-800">Recursos Rápidos</h3>
                 <div className="mt-4 flex justify-center gap-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Ver Comunicaciones
                    </button>
                    <button className="bg-slate-200 text-slate-800 py-2 px-4 rounded-md hover:bg-slate-300 transition-colors">
                        Mi Perfil
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default EmployeeView;
