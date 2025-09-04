import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
        
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-16 flex flex-col items-center lg:items-start">
          <h1 className="text-6xl font-bold text-white mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>Talento Sostenible</h1>
          <p className="mt-2 text-xl text-slate-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.6)'}}>
            Impulsando el crecimiento de PYMES con soluciones a medida.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Acceso Consultora</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Usuario
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue="consultora@sostenible.com"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password"className="block text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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