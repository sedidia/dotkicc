// src/app/collections/[_id]/page.js
import { getCollections } from '../../../lib/mongodb'; // Ajustez le chemin si nécessaire
import Link from 'next/link';

/**
 * Fonction utilitaire pour récupérer TOUTES les collections et trouver l'activité spécifique.
 * Cette approche est moins performante que de filtrer directement à la source (API ou DB),
 * mais elle répond à votre demande d'utiliser getCollections().
 * * @param {string} activiteId - L'identifiant (_id) de l'activité à rechercher.
 * @returns {Promise<object | null>} L'objet activité trouvée ou null.
 */
async function findActiviteById(activiteId) {
    
    try {
        // 1. Récupérer toutes les collections
        const allCollections = await getCollections();
        
        
        // 2. Trouver la collection 'activites' dans le tableau des collections
        const activitesCollection = allCollections.find(
            collection => collection.name === 'activites'
        );


        if (!activitesCollection || !activitesCollection.data) {
            console.error('Collection "activites" introuvable ou vide.');
            return null;
        }

        // 3. Rechercher l'activité par son _id dans les données de la collection
        const activite = activitesCollection.data.find(
            // item._id.toString() garantit que l'ObjectId est converti en string
            // Cela suppose que si item._id n'est pas une string, il a une méthode .toString()
            item => String(item._id) === String(activiteId) 
        );
        
        return activite || null;

    } catch (error) {
        console.error(`Erreur lors de la récupération ou du filtrage de l'activité ${activiteId}:`, error);
        return null;
    }
}

// =========================================================
// 1. Fonction SEO: Génération dynamique des métadonnées
// =========================================================
export async function generateMetadata({ params }) {
    const activiteId = params.id;
    
    // Utilisation de la nouvelle fonction de recherche
    const activite = await findActiviteById(activiteId);
    
    if (!activite) {
        return {
            title: 'Activité Introuvable - 404',
            description: 'La page que vous cherchez n\'existe pas.',
        };
    }

    // Utilisation des données réelles pour un excellent SEO
    const descriptionText = activite.description || `Détails de l'activité ${activite.titre || activite.name}.`;
    
    return {
        title: activite.titre || activite.name, 
        
        // Limiter la description pour le meta tag
        description: descriptionText.substring(0, 155) + (descriptionText.length > 155 ? '...' : ''),
        
        openGraph: {
            title: activite.titre || activite.name,
            description: descriptionText,
            url: `https://dotkicc.vercel.app//collections/${activiteId}`,
            // images: activite.image,
        },
    };
}


// =========================================================
// 2. Composant de la Page (Affichage de l'activité)
// =========================================================
export default async function ActiviteDetailsPage({ params }) {
    const activiteId = params.id;

    // Utilisation de la nouvelle fonction de recherche
    const activite = await findActiviteById(activiteId);

    if (!activite) {
        // Gérer l'activité non trouvée
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Activité non trouvée 😔</h1>
                <p>Désolé, l'activité avec l'identifiant **{activiteId}** n'existe pas.</p>
            </div>
        );
    }

    // Affichage des détails de l'activité
    return (
        // <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        //     <h1>{activite.titre || activite.name}</h1>
        //     <p style={{ color: '#555' }}>ID: {activite._id = activite._id.toString()}</p>
            
        //     <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
        //         **Description :** {activite.description || 'Description non fournie.'}
        //     </p>
            
        // </div>
        <div className="p-5 max-w-4xl mx-auto md:p-10">
            {/* Titre Principal */}
            
            <Link className="mt-4 text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition duration-150" href={`/collections/`}>
                  Activites
            </Link>

            <div className="w-full h-48 bg-gray-200 overflow-hidden">
                            {/* Si l'image existe, on l'affiche */}
                            {activite.laphoto ? (
                              <img 
                                  src={activite.laphoto} 
                                  alt={activite.titre} 
                                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  [Image de la collection]
                              </div>
                            )}
                          </div>
                          
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-2">
                {activite.titre || activite.name}
            </h1>

            {/* Section Description */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Description :</h2>
                <p className="text-lg leading-relaxed text-gray-800">
                    {activite.description || 'Description non fournie.'}
                </p>
            </div>

            
            {/* Ajoutez ici d'autres détails (localisation, date, etc.) */}
            
        </div>
    );
}