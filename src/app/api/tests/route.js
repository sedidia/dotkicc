import dbConnect from '../../../lib/mongodb';
import Activity from '../../../models/activity';
import { NextResponse } from 'next/server';

/**
 * Gère la requête GET pour tester la connexion MongoDB
 * Chemin : /api/tests
 */
export async function GET() {
  try {
    // 1. Tenter la connexion à la base de données
    await dbConnect();

    // 2. Tenter une opération simple (compter les documents)
    const count = await Activity.countDocuments({});

    // Si les deux étapes réussissent, retourner un succès
    return NextResponse.json({ 
      success: true, 
      message: "Connexion MongoDB réussie. Opération de comptage effectuée.",
      activityCount: count
    }, { status: 200 });

  } catch (error) {
    // Si une erreur survient (mauvaise URI, problème de Network Access, etc.)
    console.error('Erreur lors du test de connexion API:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Échec de la connexion MongoDB.", 
      details: error.message 
    }, { status: 500 });
  }
}