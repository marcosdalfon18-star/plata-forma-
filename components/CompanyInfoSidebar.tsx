import React from 'react';
import { type Company, type Plan } from '../types';

interface CompanyInfoSidebarProps {
    company: Company;
    plans: Plan[];
}

const CompanyInfoSidebar: React.FC<CompanyInfoSidebarProps> = ({ company, plans }) => {
    const planDetails = plans.find(p => p.id === company.planId);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Company Info Section */}
            <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Información de la Empresa</h3>
                <div className="space-y-3 text-slate-700">
                    <div>
                        <p className="text-sm text-slate-500">Email de Contacto</p>
                        <p className="font-medium">{company.contact}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Dirección</p>
                        <p className="font-medium">{company.address}</p>
                    </div>
                </div>
            </div>

            {/* Plan Details Section */}
            {planDetails && (
                <div className="pt-4">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Detalles del Plan</h3>
                     <div className="space-y-3 text-slate-700">
                        <div>
                            <p className="text-sm text-slate-500">Plan Actual</p>
                            <p className="font-bold text-2xl text-blue-700">{planDetails.name}</p>
                        </div>
                        <div>
                             <p className="text-sm text-slate-500">Descripción</p>
                            <p className="font-medium">{planDetails.description}</p>
                        </div>
                         <div>
                             <p className="text-sm text-slate-500">Precio Mensual</p>
                            <p className="font-medium">${planDetails.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyInfoSidebar;