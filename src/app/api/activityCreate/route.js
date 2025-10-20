// app/api/upload/route.js

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises'; // Pour écrire le fichier sur le disque
import path from 'path'; // Pour manipuler les chemins de fichiers

// Assurez-vous que ce chemin est correct pour l'importation de votre fonction MongoDB
import { createActivite } from '../../../lib/mongodb'; 

// Le chemin de base pour le stockage des images publiques
const UPLOAD_DIR = '/images/activites/'; 

export async function POST(request) {
  try {
    // 1. Lire le corps de la requête comme FormData
    const formData = await request.formData();

    // 2. Récupérer les champs
    const photoFile = formData.get('laphoto');
    const titre = formData.get('titre');
    const ladate = formData.get('ladate');
    const description = formData.get('description');

    // Validation des données et de la photo
    if (!photoFile || !(photoFile instanceof Blob) || !titre || !ladate || !description) {
      return NextResponse.json({ error: 'Données manquantes ou photo invalide.' }, { status: 400 });
    }
    
    // 3. Traitement et stockage du fichier image
    const arrayBuffer = await photoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Générer un nom de fichier unique pour éviter les conflits
    const uniqueFileName = `${Date.now()}-${photoFile.name.replace(/\s/g, '_')}`;
    
    // Chemin absolu pour l'écriture du fichier sur le serveur
    const filePath = path.join(process.cwd(), 'public', UPLOAD_DIR, uniqueFileName);
    
    // Chemin relatif/public à enregistrer dans la base de données
    const photoPath = UPLOAD_DIR + uniqueFileName; 

    // Écrire le fichier sur le disque dans /public/images/activites/
    await writeFile(filePath, buffer);

    // 4. Préparation des données pour la base de données
    const newActiviteData = {
      titre,
      ladate,
      description,
      laphoto: photoPath, // On stocke le chemin public de l'image
      createdAt: new Date(),
    };

    // 5. Insertion dans MongoDB
    const result = await createActivite(newActiviteData);

    // 6. Réponse de succès
    return NextResponse.json({ 
      message: 'Activité créée avec succès', 
      _id: result.insertedId,
      path: photoPath,
      data: newActiviteData
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur de traitement/MongoDB:', error);
    return NextResponse.json({ error: 'Échec de l\'opération.', details: error.message }, { status: 500 });
  }
}