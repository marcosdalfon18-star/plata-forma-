import React, { useState } from 'react';
import { type Communication } from '../types';

interface RegulatoryComplianceViewProps {
  communications: Communication[];
  onAddCommunication: (title: string, content: string) => void;
}

const CommunicationCard: React.FC<{ comm: Communication }> = ({ comm }) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{comm.title}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{new Date(comm.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Publicado por: {comm.author}</p>
            <p className="text-gray-700 whitespace-pre-wrap">{comm.content}</p>
        </div>
    );
};

const RegulatoryComplianceView: React.FC<RegulatoryComplianceViewProps> = ({ communications, onAddCommunication }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddCommunication(title, content);
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Comunicaciones Reglamentarias</h2>
          <p className="text-gray-600 mt-1">Un canal oficial para comunicados importantes de la empresa.</p>
        </div>
        <button
            onClick={() => setShowForm(!showForm)}
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
            {showForm ? 'Cancelar' : 'Nueva Comunicación'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Crear Nueva Comunicación</h3>
                <div>
                    <label htmlFor="comm-title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                        id="comm-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        placeholder="Ej: Actualización de Políticas"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comm-content" className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <textarea
                        id="comm-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        placeholder="Escriba aquí el mensaje para los empleados..."
                        required
                    />
                </div>
                <div className="text-right pt-2">
                    <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Publicar
                    </button>
                </div>
            </form>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Historial de Comunicaciones</h3>
        {communications.length > 0 ? (
            <div className="space-y-4">
                {communications.map(comm => <CommunicationCard key={comm.id} comm={comm} />)}
            </div>
        ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border-2 border-dashed">
                <p className="text-gray-500">No hay comunicaciones publicadas todavía.</p>
                <p className="text-sm text-gray-400 mt-1">Use el botón "Nueva Comunicación" para empezar.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RegulatoryComplianceView;