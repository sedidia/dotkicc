'use client'; // Indispensable si vous êtes dans l'App Router

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Lock, User, CheckCircle, X  } from 'lucide-react';


// -------------------------------------------------------------------------
// Composant TOAST de Succès
// -------------------------------------------------------------------------

/**
 * Affiche un message de succès flottant, masqué automatiquement.
 * @param {object} props
 * @param {string} props.message - Le message à afficher.
 * @param {function} props.onClose - Fonction appelée pour fermer le Toast.
 */
const SuccessToast = ({ message, onClose }) => {
    
    // Fermeture automatique après 4 secondes
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000); 
            // Nettoyage : annuler le timer si le composant est démonté ou si le message change
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        // Conteneur fixe, positionné en haut à droite (top-6 right-6)
        <div 
            className="fixed top-6 right-6 z-[1000] max-w-sm w-full bg-white shadow-xl rounded-lg pointer-events-auto 
                       transform transition-all duration-500 ease-in-out"
        >
            <div className="p-4 flex items-center">
                {/* Icône de Succès */}
                <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500" />
                
                <div className="ml-3 flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-gray-900">Succès !</p>
                    <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                
                {/* Bouton de Fermeture Manuelle */}
                <div className="ml-4 flex-shrink-0 flex">
                    <button
                        onClick={onClose}
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">Fermer</span>
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function UploadPage({message, onClose}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const [adminConnected, setAdminConnected] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [checkUser, setCheckUser] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleLogin = () => {
    const foundUser = users.find(user => user.username === username && user.password === password );  
    setCheckUser(true)
    if(foundUser){
      setAdminConnected(true)
      setUserFound(true)
    } else {
      setAdminConnected(false)
      setUserFound(false)
    }
      
  }

  const handleFileChange = (e) => {
    // Stocke le fichier sélectionné
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('Envoi en cours...');

    if (!file || !title || !date || !description) {
      setSuccessMessage('Veuillez remplir tous les champs et sélectionner une photo.');
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

      // setSuccessMessage(`Succès! Réponse: ${response.data.successMessage}`);
      // console.log('Réponse de l\'API:', response.data);

      setFile(null);
      setTitle('');
      setDate('');
      setDescription('');

      // TOAST
      setTimeout(() => {    
        // setVerificationResult({
        //     success: true,
        //     message: `Activité enregistrée avec sussès !`,
        // });
                              
        // --- Déclenche le Toast de Succès au lieu de l'affichage permanent ---
        setSuccessMessage(`Activité enregistrée avec sussès !`);
      })
      // TOAST
      
    } catch (error) {
      // Échec : Aucun utilisateur correspondant
      // setVerificationResult({
      //   success: false,
      //   message: "Utilisateur non enregistré ou mot de passe incorrect.",
      // });

      console.error('Erreur d\'envoi:', error.response ? error.response.data : error.successMessage);
      setSuccessMessage(`Échec de l'envoi: 'Erreur réseau.'}`);
    }
  };
  
  
  useEffect(() => {
    // toast message
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); 
      // Nettoyage : annuler le timer si le composant est démonté ou si le message change
      return () => clearTimeout(timer);
    }
    // toast message


    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/collections');
        const datas = await response.json();        
        console.log(datas.collections.find(collection => collection.name === 'users').data); // Accédez à la propriété collections
        setUsers(datas.collections.find(collection => collection.name === "users").data) 
      } catch (error) {
        console.error('Erreur lors de la récupération des collections:', error);
      }
    };
  
    fetchUsers();
  }, [message, onClose]);
  // if (!message) return null;

  return (
    <div className="max-w-md mx-auto p-4 mt-0">
      {/* 1. TOAST DE SUCCÈS (Positionné de manière fixe) */}
            <SuccessToast 
                message={successMessage} 
                onClose={() => setSuccessMessage(null)} 
            />
      
      <nav className="sticky top-0 z-50 bg-white shadow-md mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link key="+" href="/" className="text-gray-600 hover:text-indigo-700 font-semibold transition duration-200 py-2 px-3 no-underline">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  DOT KICC
                </span>
              </div>
              </Link>
              {/* Desktop Menu */}
              <div className="md:flex space-x-8">
                <Link key="+" href="/collections" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">
                  Activités
                </Link>
              </div>
            </div>
        </div>
      </nav>


      {adminConnected ?
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">NOUVELLE ACTIVITE</h1>
        {/* <p className="text-lg text-gray-600 mb-8">Veuillez vous connecter</p> */}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Champ titre activité */}
          <div className="sm:col-span-4 mb-4">
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l&apos;activité
            </label>
            <div className="relative">
              <input
                id='titre'
                type="text" 
                placeholder="Titre" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Champ date activité */}
          <div className="sm:col-span-4 mb-4">
            <label htmlFor="ladate" className="block text-sm font-medium text-gray-700 mb-1">
              Date de l&apos;activité
            </label>
            <div className="relative">
              <input 
                id='ladate'
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <input type="file"
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
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150">
            Créer l&apos;activité
          </button>
          <p className="mt-4 text-gray-600">{successMessage}</p>
        </form>

        {successMessage != null ?
        <div className="p-6 bg-green-50 border border-green-300 rounded-lg text-green-800 text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-3" />
          <p className="font-semibold text-lg">ACTIVITE CREEE</p>
          <p className="text-sm">{successMessage}</p>
        </div>
        :""}

      </div>
      :
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">CONNEXION</h1>
        <p className="text-lg text-gray-600 mb-8">Veuillez vous connecter</p>
        

        {/* Champ Username */}
        <div className="sm:col-span-4 mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Nom d&apos;utilisateur
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="user1"
              required
            />
          </div>
        </div>


        {/* Champ Password */}
        <div className="sm:col-span-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="pass1"
              required
            />
          </div>
        </div>

        {/* successMessage */}
        <div className="sm:col-span-4 mt-2">
          {checkUser ?
          userFound ? "true - user found" : <p className='text-red'>Echec lors de la connexion - utilisateur introuvable.</p>
          :
          ""}
        </div>

        <div className="sm:col-span-4 mt-2">
          <button onClick={handleLogin} type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150">
            Se connecter
          </button>
        </div>
      </div>
      }



    </div>
  );
}