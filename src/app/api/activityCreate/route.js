import dbConnect from '../../../lib/mongodb';
import Activity from '../../../models/activity';
import { NextResponse } from 'next/server';

/**
 * Gère la requête POST (Création d'une nouvelle activité)
 * Endpoint: /api/activityCreate
 */
export async function POST(request) {
  try {
    // 1. Connexion à la base de données
    await dbConnect();
    
    // 2. Récupérer les données envoyées par le client (title et description)
    const body = await request.json();
    
    // 3. Créer un nouveau document Mongoose
    const newActivity = await Activity.create({
      title: body.title,
      description: body.description,
      // La date est gérée automatiquement par le schéma Mongoose
    });

    // 4. Réponse en cas de succès
    return NextResponse.json({
      success: true,
      data: newActivity,
      message: 'Activité enregistrée via activityCreate avec succès !',
    }, { status: 201 }); // Statut 201 = Créé

  } catch (error) {
    // 5. Gérer les erreurs (validation ou connexion)
    console.error('Erreur lors de l\'enregistrement de l\'activité (activityCreate):', error);
    
    let message = 'Erreur interne du serveur.';
    if (error.name === 'ValidationError') {
      message = 'Erreur de validation: Veuillez remplir tous les champs requis.';
    }

    return NextResponse.json({
      success: false,
      message: message,
      details: error.message
    }, { status: 500 });
  }
}

// Optionnel: Empêcher les requêtes GET sur cette route dédiée à la création
export async function GET() {
    return NextResponse.json({ message: "La méthode GET n'est pas supportée sur cette route." }, { status: 405 });
}
