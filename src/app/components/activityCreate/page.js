'use client';

import React, { useState } from 'react';

export default function ActivityForm() {
  // État local pour les champs du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
  });
  const [status, setStatus] = useState(''); // 'SUCCESS', 'ERROR', 'LOADING'
  const [message, setMessage] = useState('');

  // Gère la mise à jour des champs (Two-way binding)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gère l'envoi du formulaire à la Route d'API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('LOADING');
    setMessage('Enregistrement en cours...');

    try {
      // Envoi de la requête POST à la nouvelle route /api/activities
      const response = await fetch('/api/activityCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Enregistrement réussi
        setStatus('SUCCESS');
        setMessage(result.message);
        // Réinitialiser le formulaire après succès
        setFormData({ titre: '', description: '' });
      } else {
        // Erreur côté serveur (ex: validation Mongoose)
        setStatus('ERROR');
        setMessage(result.message || 'Échec de l\'enregistrement. Vérifiez les données.');
      }

    } catch (error) {
      // Erreur réseau
      setStatus('ERROR');
      setMessage('Erreur réseau. Impossible de contacter le serveur.');
      console.error('Erreur Fetch:', error);
    }
  };

  // Classes Tailwind pour le feedback visuel
  const statusClasses = {
    SUCCESS: 'bg-green-500',
    ERROR: 'bg-red-500',
    LOADING: 'bg-yellow-500 animate-pulse',
    default: 'bg-blue-600 hover:bg-blue-700',
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Enregistrer une Nouvelle Activité</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Titre */}
        <div>
          <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre de l'Activité</label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Champ Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description Détaillée</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Message de Statut (Feedback à l'utilisateur) */}
        {message && (
          <div 
            className={`p-3 text-sm font-medium text-white rounded-md ${statusClasses[status] || 'bg-gray-500'}`}
          >
            {message}
          </div>
        )}

        {/* Bouton Enregistrer */}
        <button
          type="submit"
          disabled={status === 'LOADING'}
          className={`w-full py-2 px-4 border border-transparent rounded-md text-white font-semibold transition duration-300 shadow-md ${statusClasses[status] || statusClasses.default} disabled:bg-gray-400`}
        >
          {status === 'LOADING' ? 'Enregistrement...' : 'Enregistrer l\'Activité'}
        </button>
      </form>
    </div>
  );
}