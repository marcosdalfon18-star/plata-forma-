import React, { useState } from 'react';
import { type User } from '../types';
import Logo from './icons/Logo';

interface LoginPageProps {
  onLogin: (user: User) => void;
  users: User[];
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, users }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(String(users[0]?.id || ''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = users.find(u => u.id === parseInt(selectedUserId));
    if (selectedUser) {
      onLogin(selectedUser);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4b2489?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center">
        
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-20 flex flex-col items-center lg:items-start">
          <Logo className="h-24 w-24 mb-6" />
          <h1 className="text-6xl font-bold text-white mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>Talento Sostenible</h1>
          <p className="mt-2 text-xl text-slate-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.6)'}}>
            Impulsando el crecimiento de PYMES con soluciones a medida.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Acceso a la Plataforma</h2>
            <p className="text-center text-slate-500 mb-6 text-sm">Seleccione un rol para simular el ingreso.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="user-select" className="block text-sm font-medium text-slate-700">
                  Iniciar sesión como
                </label>
                <select
                  id="user-select"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
