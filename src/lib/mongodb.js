import { MongoClient } from 'mongodb';

const uri="mongodb+srv://Vercel-Admin-drcdotkcclshi:lb1gPpaEViAVUwOI@drcdotkcclshi.chomezh.mongodb.net/drcdotkcclshi";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connecté à MongoDB');
    return client;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

async function getDatabase() {
  const client = await connectToDatabase();
  return client.db();
}


async function getCollections() {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();
  const result = [];

  for (const collection of collections) {
    const collectionData = await db.collection(collection.name).find().toArray();
    result.push({
      name: collection.name,
      data: collectionData,
    });
  }

  return result;
}

async function createActivite(data) {
  try {
    const db = await getDatabase();
    const activitesCollection = db.collection('activites');
    const result = await activitesCollection.insertOne(data);
    return result;
  } catch (error) {
    console.error('Erreur lors de la création de l\'activité:', error);
    throw error;
  }
}

export { getCollections, createActivite }; // Assurez-vous d'exporter getCollections