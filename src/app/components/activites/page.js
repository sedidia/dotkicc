'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

export default function ActivityList() {
  // 1. L'état est initialisé de manière sécurisée à un tableau vide
  const [activities, setActivities] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/api/activites');
            const result = response.data; 

            // 2. Vérification stricte: la réponse doit être 'success' et 'data' doit être un tableau
            if (result.success && Array.isArray(result.data)) {
                setActivities(result.data);
            } else {
                // Si l'API retourne un succès mais pas un tableau (improbable mais sécurisé)
                setActivities([]); 
                setError(result.message || "La réponse de l'API n'est pas un tableau valide.");
            }

        } catch (e) {
            console.error("Erreur Axios complète:", e);
            // S'assurer que 'activities' est toujours un tableau même en cas d'échec de la requête
            setActivities([]); 
            
            const serverMessage = e.response?.data?.message || 'Erreur serveur non spécifiée.';
            setError(`Erreur de Connexion: ${serverMessage}`);
            
        } finally {
            setLoading(false);
        }
    };
    fetchActivities();
  }, []); 

  // --- Rendu du Composant ---

  if (loading) {
    return (
      <div className="text-center p-6 text-blue-600 font-semibold">
        <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-100 border-t-blue-600 rounded-full"></div>
        <p className="mt-2">Chargement des activités...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Erreur Réseau/API :</p>
        <p>{error}</p>
      </div>
    );
  }

  // 3. Vérification de l'existence avant d'accéder à length ou map
  // Cette ligne gère l'état 'pas de données trouvées'.
  if (!activities || activities.length === 0) { 
    return (
      <div className="p-6 bg-yellow-100 text-yellow-800 rounded-lg">
        Aucune activité trouvée ou problème de format de données.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Liste des {activities.length} Activités Enregistrées</h2>
      <ul className="space-y-4">
        {/* 4. Vérification finale du tableau avant le mapping */}
        {Array.isArray(activities) && activities.map((activity) => (
          <li key={activity._id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
            <h3 className="text-xl font-semibold text-blue-700">{activity.title}</h3>
            <p className="text-gray-600 mt-1">{activity.description}</p>
            <span className="text-xs text-gray-400 block mt-2">ID: {activity._id} | Créé le: {new Date(activity.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}