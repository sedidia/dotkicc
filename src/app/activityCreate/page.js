'use client'; // Indispensable si vous êtes dans l'App Router

import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Uploader Photo et Données</h1>
      <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="file" accept="image/*" onChange={handleFileChange} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Envoyer</button>
      <p style={{ marginTop: '10px' }}>{message}</p>
    </form>
  );
}