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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
        
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-16">
          <h1 className="text-5xl font-bold text-indigo-600">Talento Sostenible</h1>
          <p className="mt-4 text-xl text-gray-600">
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
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
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