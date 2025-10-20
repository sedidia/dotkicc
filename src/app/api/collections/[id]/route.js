import { getCollections } from '../../../../lib/mongodb'; // Ajustez le chemin si nécessaire
import { ObjectId } from 'mongodb'; // Importez ObjectId pour la recherche par _id

// Fonction de gestionnaire GET pour la route /api/collections/[id]
export async function GET(request, { params }) {
  const activiteId = params._id; // Récupère l'ID dynamique de l'URL

  // 1. Validation de l'ID (facultatif mais recommandé si vous utilisez MongoDB ObjectId)
  if (!ObjectId.isValid(activiteId)) {
    return new Response(JSON.stringify({ message: 'ID d\'activité invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 2. Récupérer toutes les collections (ou une fonction optimisée pour une seule)
    // Nous supposons que getCollections() renvoie toutes les données
    const allCollections = await getCollections();
    
    // 3. Trouver la collection 'activites'
    const activitesCollection = allCollections.find(collection => collection.name === 'activites');
    
    if (!activitesCollection) {
        return new Response(JSON.stringify({ message: 'Collection "activites" introuvable' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 4. Rechercher l'activité par l'_id fourni dans l'URL
    const activite = activitesCollection.data.find(item => item._id === activiteId);

    if (!activite) {
      return new Response(JSON.stringify({ message: `Activité avec l'ID ${activiteId} non trouvée` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Renvoyer uniquement l'activité trouvée
    return new Response(JSON.stringify(activite), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(`Erreur lors de la récupération de l'activité ${activiteId}:`, error);
    return new Response(JSON.stringify({ message: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}