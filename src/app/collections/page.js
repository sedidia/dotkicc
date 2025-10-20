"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import Footer from '../components/footer';

function Activites() {
  const [activites, setActivites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (e) => {
    setIsLoading(true);
  }


  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await fetch('/api/collections');
        const datas = await response.json();        
        console.log(datas.collections.find(collection => collection.name === 'activites').data); // Accédez à la propriété collections
        setActivites(datas.collections.find(collection => collection.name === 'activites').data); // Accédez à la propriété collections
      } catch (error) {
        console.error('Erreur lors de la récupération des collections:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchActivites();
  }, []);

  return (
    <div>
      <div  className="py-20 bg-white">
        <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Collections</h1>
          <div>
            <h1>Activités de l entreprise</h1>
            {isLoading ?
            <Loader></Loader>
            :
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activites.map((activite, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-t-8 border-yellow-500 flex flex-col hover:shadow-2xl transition duration-300">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{activite.titre}</h3>
                </div>
                <p className="text-gray-600 flex-grow">{activite.description}</p>
                <Link onClick={() => handleNavigate(activite._id)} className="mt-4 text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition duration-150" href={`/collections/${activite._id}`}>
                  Voir les détails
                </Link>
              </div>
              ))}
            </div>
            }
          </div>

        </div>
      </div>
          <Footer></Footer>
    </div>
  );
}

export default Activites;