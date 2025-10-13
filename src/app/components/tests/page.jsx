'use client';

import React, { useState, useEffect } from 'react';

/**
 * Page de test pour valider la connexion à MongoDB via l'API /api/tests.
 */
export default function TestPage() {
  const [status, setStatus] = useState('LOADING');
  const [message, setMessage] = useState('Initialisation du test de connexion...');
  const [activityCount, setActivityCount] = useState(0);

  const runTest = async () => {
    setStatus('LOADING');
    setMessage('Envoi de la requête GET vers /api/tests...');

    try {
      // 1. Appel de la Route d'API de test
      const response = await fetch('/api/tests');
      
      const result = await response.json();

      // 2. Vérification de la réponse du serveur (API Route)
      if (response.ok && result.success) {
        // Succès
        setStatus('SUCCESS');
        setMessage(result.message);
        setActivityCount(result.activityCount);
      } else {
        // Échec côté serveur (Erreur de connexion BDD)
        setStatus('ERROR');
        setMessage(result.message || 'Erreur inconnue de l\'API.');
        console.error('Détails de l\'erreur serveur:', result.details);
      }

    } catch (error) {
      // Échec côté client (Problème réseau, URL invalide)
      setStatus('ERROR');
      setMessage(`Erreur réseau (Client) : ${error.message}.`);
      console.error('Erreur de requête Fetch:', error);
    }
  };

  useEffect(() => {
    runTest(); // Lance le test au chargement de la page
  }, []);

  // Définir les classes Tailwind en fonction du statut
  const statusClasses = {
    SUCCESS: 'bg-green-100 text-green-800 border-green-500',
    ERROR: 'bg-red-100 text-red-800 border-red-500',
    LOADING: 'bg-yellow-100 text-yellow-800 border-yellow-500 animate-pulse',
  };

  return (
    <div className="p-8 max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Page de Test MongoDB</h1>

      <div className={`p-6 rounded-xl shadow-lg border-l-4 ${statusClasses[status]}`}>
        <h2 className="text-xl font-semibold mb-3">Résultat du Test</h2>
        
        <p className="font-medium">{message}</p>
        
        {/* Affichage des détails si succès ou erreur */}
        {status === 'SUCCESS' && (
          <p className="mt-3 text-lg font-bold">
            ✅ Connexion réussie ! ({activityCount} activité(s) trouvée(s)).
          </p>
        )}
        
        {status === 'ERROR' && (
          <div className="mt-3">
            <p className="font-medium text-red-600 mb-1">
                Veuillez vérifier les logs de la console pour les détails du backend.
            </p>
            <p className="text-sm">
                Détail de l'erreur : {message}
            </p>
          </div>
        )}
      </div>

      <button 
        onClick={runTest} 
        disabled={status === 'LOADING'}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:bg-gray-400"
      >
        {status === 'LOADING' ? 'Test en cours...' : 'Relancer le Test de Connexion'}
      </button>
    </div>
  );
}
