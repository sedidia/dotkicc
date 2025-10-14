"use client";

import React, { useState, useEffect } from 'react';

function Activites() {
  const [activites, setActivites] = useState([]);


  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await fetch('/api/collections');
        const datas = await response.json();        
        setActivites(datas.collections.find(collection => collection.name === 'activites').data); // Accédez à la propriété collections
      } catch (error) {
        console.error('Erreur lors de la récupération des collections:', error);
      }
    };

    fetchActivites();
  }, []);

  return (
    <div>
      <h1>Collections</h1>
      <div>
    <h1>Activités de l'entreprise</h1>
    <ul>
      {activites.map((activite, index) => (
        <li key={index}>
          <h2>{activite.titre}</h2>
          <p>{activite.description}</p>
        </li>
      ))}
    </ul>
  </div>
    </div>
  );
}

export default Activites;