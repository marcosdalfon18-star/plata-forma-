import React from 'react';
import Logo from './icons/Logo';

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
          <Logo className="h-20 w-20 mb-4" />
          <h1 className="text-5xl font-bold text-white" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>Talento Sostenible</h1>
          <p className="mt-4 text-xl text-gray-200">
            La plataforma digital para impulsar la competitividad de las PYMES con soluciones accionables para el éxito.
          </p>
        </div>

        <div className="w-full max-w-md lg:w-1/2">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Correo Electrónico o Usuario
                </label>
                <input
                  className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                  id="email"
                  type="email"
                  placeholder="su@correo.com"
                  defaultValue="consultora@talentosostenible.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                  id="password"
                  type="password"
                  placeholder="******************"
                  defaultValue="password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
                  type="submit"
                >
                  Acceder
                </button>
              </div>
              <p className="text-center text-gray-500 text-sm mt-6">
                ¿No tiene una cuenta? <a href="#" className="font-bold text-indigo-600 hover:text-indigo-800">Regístrese</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;