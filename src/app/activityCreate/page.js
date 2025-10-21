'use client'; // Indispensable si vous êtes dans l'App Router

import React, { useState } from 'react';
import axios from 'axios';
// import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    // Stocke le fichier sélectionné
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Envoi en cours...');

    if (!file || !title || !date || !description) {
      setMessage('Veuillez remplir tous les champs et sélectionner une photo.');
      return;
    }

    // 1. Création de l'objet FormData
    const formData = new FormData();
    
    // 2. Ajout de la photo
    // La clé 'laphoto' doit correspondre à la clé que vous lirez côté serveur
    formData.append('laphoto', file); 
    
    // 3. Ajout des autres champs de données
    formData.append('titre', title);
    formData.append('ladate', date);
    formData.append('description', description);

    try {
      // 4. Envoi de la requête POST avec Axios
      // IMPORTANT : Axios gère automatiquement le 'Content-Type: multipart/form-data' 
      // et la Boundary pour les requêtes avec FormData.
      const response = await axios.post('/api/activityCreate', formData);

      setMessage(`Succès! Réponse: ${response.data.message}`);
      console.log('Réponse de l\'API:', response.data);
      
    } catch (error) {
      console.error('Erreur d\'envoi:', error.response ? error.response.data : error.message);
      setMessage(`Échec de l'envoi: ${error.response ? error.response.data.error : 'Erreur réseau.'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <nav className="flex items-center mb-6">
        <Link 
          href="#" 
          className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150 mr-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Uploader Photo et Données</h1>
      </nav>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Titre" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          required 
          className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
        />
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150"
        >
          Envoyer
        </button>
        <p className="mt-4 text-gray-600">{message}</p>
      </form>
    </div>
  );
}